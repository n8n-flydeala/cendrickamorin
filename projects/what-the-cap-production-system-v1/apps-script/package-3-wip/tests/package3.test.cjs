const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const directory = path.resolve(__dirname,'..');
const context = vm.createContext({console,Date,Number});
for (const filename of fs.readdirSync(directory).filter(f=>f.endsWith('.gs')).sort()) {
  vm.runInContext(fs.readFileSync(path.join(directory,filename),'utf8'),context,{filename});
}
const W = context.WTC;
const fixed = new Date('2026-10-01T06:00:00Z');
const clone = value => JSON.parse(JSON.stringify(value));
function memory() {
  const data = Object.fromEntries(Object.keys(W.Schema).map(k=>[k,[]]));
  let writes=0;
  return {data,get writes(){return writes;},verifySchema(){},rows:name=>clone(data[name]),commit(plan){
    const next=clone(data);
    for(const change of plan){
      const pk=W.Schema[change.table][0],id=change.row[pk],index=next[change.table].findIndex(r=>r[pk]===id);
      if(change.kind==='insert'){assert.equal(index,-1);next[change.table].push(clone(change.row));}
      else {assert.ok(index>=0);next[change.table][index]=clone(change.row);}
    }
    Object.assign(data,next);writes++;
    return plan.map(c=>c.row[W.Schema[c.table][0]]);
  }};
}
function fixture(store=memory()) {
  let busy=false,tries=0,released=0,freezes=[],audit=[];
  const policy={
    validateReferences(input){if(input.SKU_ID && input.SKU_ID!=='SKU-TEST')throw new Error('FK_NOT_FOUND');},
    validateEnums(){}, // synthetic test policy only; never exported as DEV role configuration
    validateApproval(input,actor){if(actor.roleCode!=='OWNER_TEST'||input.APPROVAL_ID!=='APR-TEST')throw new Error('APPROVAL_REQUIRED');},
    validateReceipt(){},receiptReference:()=> 'RCV-2026-000001',now:()=>fixed
  };
  const deps={config:{environment:'DEV',clientId:'public-test-audience',postingEnabled:true},now:()=>fixed,
    verifyToken:token=>{if(token!=='SYNTHETIC_VALID')throw new Error('invalid');return {signatureVerified:true,sub:'synthetic-owner',aud:'public-test-audience',iss:'https://accounts.google.com',exp:fixed.getTime()/1000+1000};},
    registry:()=>[{GOOGLE_SUB:'synthetic-owner',ACTOR_ID:'ACTOR-TEST',ROLE_CODE:'OWNER_TEST',ACTIVE_FLAG:true,EFFECTIVE_FROM:'2026-01-01'}],
    allowlist:{OWNER_TEST:['RECEIVE','COMMIT','RELEASE','CONSUME','TRANSFER','ADJUST','REVERSE_ADJUST']},
    lock:{tryLock(){tries++;if(busy)return false;busy=true;return true;},releaseLock(){busy=false;released++;}},
    store,builders:W.InventoryActions.create(policy),fingerprint:input=>JSON.stringify(input),freeze:code=>freezes.push(code),auditUnavailable:(code,id)=>audit.push({code,id})};
  return {deps,store,policy,freezes,audit,get tries(){return tries;},get released(){return released;},set busy(v){busy=v;},run(action,input,key){return W.PostingService.execute({credential:'SYNTHETIC_VALID',csrfVerified:true,action,input,idempotencyKey:key},deps);}};
}
function receive(f){f.run('RECEIVE',{SKU_ID:'SKU-TEST',SOURCE_PARTY_ID:'PTY-SOURCE',ECONOMIC_OWNER_ID:'PTY-OWNER',CONDITION_CODE:'TEST',TO_LOCATION_ID:'LOC-A',BUSINESS_REASON_CODE:'TEST_RECEIVE',ACTUAL_QTY:10,EXPECTED_QTY:10,EXPECTED_STATUS:'TEST',RECEIPT_STATUS:'TEST',LINE_STATUS:'TEST',BATCH_STATUS:'TEST'},'receive-one');return f.store.data.T_BATCHES[0].BATCH_ID;}
function movement(batch,location,qty){return {BATCH_ID:batch,SKU_ID:'SKU-TEST',FROM_LOCATION_ID:location,QTY:qty,BUSINESS_REASON_CODE:'TEST_REASON',SOURCE_ENTITY_TYPE:'DEV_QA',SOURCE_ENTITY_ID:'DEV-QA-ONE'};}
function args(f,batch,location){return {batchId:batch,skuId:'SKU-TEST',locationId:location,movements:f.store.rows('T_INVENTORY_MOVEMENTS'),commitments:f.store.rows('T_STOCK_COMMITMENTS')};}
test('exact full commitment consumption plans release plus movement atomically; partial/mismatched hold denied',()=>{
  const f=fixture(),batch=receive(f);
  f.run('COMMIT',{BATCH_ID:batch,SKU_ID:'SKU-TEST',LOCATION_ID:'LOC-A',QTY:10,COMMITMENT_TYPE:'TEST',SOURCE_ENTITY_TYPE:'DEV_QA',SOURCE_ENTITY_ID:'DEV-QA-ONE'},'hold-all');
  const hold=f.store.data.T_STOCK_COMMITMENTS[0],input={...movement(batch,'LOC-A',10),COMMITMENT_ID:hold.COMMITMENT_ID,RELEASE_REASON:'TEST_CONSUMPTION'};
  assert.throws(()=>f.run('CONSUME',{...input,QTY:5},'partial'),/PARTIAL_COMMITMENT_CONSUMPTION_NOT_CONFIGURED/);
  assert.throws(()=>f.run('CONSUME',{...input,FROM_LOCATION_ID:'LOC-B'},'mismatch'),/COMMITMENT_CONSUMPTION_MISMATCH/);
  const writes=f.store.writes;f.run('CONSUME',input,'consume-held');assert.equal(f.store.writes,writes+1);
  assert.equal(f.store.data.T_STOCK_COMMITMENTS[0].STATUS,'RELEASED');assert.equal(W.InventoryService.onHand(args(f,batch,'LOC-A')),0);assert.equal(W.InventoryService.availableToSell(args(f,batch,'LOC-A')),0);
});
test('receive10 / hold4 / release / consume3 / transfer2 / adjust / reverse / rebuild / audit',()=>{
  const f=fixture(),batch=receive(f);
  assert.equal(f.store.data.T_STOCK_RECEIPTS[0].CHECK_STATUS,'VERIFIED');
  assert.equal(f.store.data.T_BATCHES[0].RECEIPT_LINE_ID,f.store.data.T_STOCK_RECEIPT_LINES[0].RECEIPT_LINE_ID);
  assert.equal(W.InventoryService.onHand(args(f,batch,'LOC-A')),10);
  f.run('COMMIT',{BATCH_ID:batch,SKU_ID:'SKU-TEST',LOCATION_ID:'LOC-A',QTY:4,COMMITMENT_TYPE:'TEST',SOURCE_ENTITY_TYPE:'DEV_QA',SOURCE_ENTITY_ID:'DEV-QA-ONE'},'hold-one');
  assert.equal(W.InventoryService.availableToSell(args(f,batch,'LOC-A')),6);
  f.run('RELEASE',{COMMITMENT_ID:f.store.data.T_STOCK_COMMITMENTS[0].COMMITMENT_ID,RELEASE_REASON:'TEST_RELEASE'},'release-one');
  assert.equal(W.InventoryService.availableToSell(args(f,batch,'LOC-A')),10);
  f.run('CONSUME',movement(batch,'LOC-A',3),'consume-one');
  f.run('TRANSFER',{...movement(batch,'LOC-A',2),TO_LOCATION_ID:'LOC-B'},'transfer-one');
  const adjustment=movement(batch,'LOC-A',1);adjustment.APPROVAL_ID='APR-TEST';
  f.run('ADJUST',adjustment,'adjust-one');
  const original=f.store.data.T_INVENTORY_MOVEMENTS.at(-1),snapshot=clone(original);
  f.run('REVERSE_ADJUST',{REVERSAL_OF_ID:original.MOVEMENT_ID,APPROVAL_ID:'APR-TEST',BUSINESS_REASON_CODE:'TEST_REVERSAL',SOURCE_ENTITY_TYPE:'DEV_QA',SOURCE_ENTITY_ID:'DEV-QA-ONE'},'reverse-one');
  assert.deepEqual(f.store.data.T_INVENTORY_MOVEMENTS.find(r=>r.MOVEMENT_ID===original.MOVEMENT_ID),snapshot);
  assert.equal(W.InventoryService.onHand(args(f,batch,'LOC-A')),5);
  assert.equal(W.InventoryService.onHand(args(f,batch,'LOC-B')),2);
  assert.equal(f.store.data.T_EVENTS.length,7);
  assert.ok(f.store.data.T_EVENTS.every(e=>e.ACTOR_ID==='ACTOR-TEST' && e.CORRELATION_ID && e.IDEMPOTENCY_KEY));
  assert.equal(W.ReconciliationService.inventoryCheck({...args(f,batch,'LOC-A'),expectedOnHand:5}).STATUS,'PASS');
});
test('negative physical stock: no movement; persistent synthetic exception',()=>{
  const f=fixture(),batch=receive(f),before=f.store.data.T_INVENTORY_MOVEMENTS.length;
  assert.throws(()=>f.run('CONSUME',movement(batch,'LOC-A',11),'negative'),/NEGATIVE_ON_HAND_BLOCKED/);
  assert.equal(f.store.data.T_INVENTORY_MOVEMENTS.length,before);
  assert.equal(f.store.data.T_EXCEPTIONS.at(-1).EXCEPTION_TYPE,'NEGATIVE_ON_HAND_BLOCKED');
});
test('negative ATS denied while physical stock sufficient',()=>{
  const f=fixture(),batch=receive(f);
  f.run('COMMIT',{BATCH_ID:batch,SKU_ID:'SKU-TEST',LOCATION_ID:'LOC-A',QTY:9,COMMITMENT_TYPE:'TEST',SOURCE_ENTITY_TYPE:'DEV_QA',SOURCE_ENTITY_ID:'DEV-QA-ONE'},'hold');
  assert.throws(()=>f.run('CONSUME',movement(batch,'LOC-A',2),'consume'),/NEGATIVE_ATS_BLOCKED/);
});
test('two serialized last-unit attempts: one wins; one denied',()=>{
  const f=fixture(),batch=receive(f);f.run('CONSUME',movement(batch,'LOC-A',9),'consume');
  const hold={BATCH_ID:batch,SKU_ID:'SKU-TEST',LOCATION_ID:'LOC-A',QTY:1,COMMITMENT_TYPE:'TEST',SOURCE_ENTITY_TYPE:'DEV_QA',SOURCE_ENTITY_ID:'DEV-QA-ONE'};
  f.run('COMMIT',hold,'hold-first');
  assert.throws(()=>f.run('COMMIT',hold,'hold-second'),/COMMITMENT_EXCEEDS_AVAILABLE_STOCK/);
  assert.equal(f.store.data.T_STOCK_COMMITMENTS.length,1);
});
test('idempotent retry gives same event; changed input is conflict',()=>{
  const f=fixture(),batch=receive(f),input=movement(batch,'LOC-A',1);
  const first=f.run('CONSUME',input,'once'),count=f.store.data.T_INVENTORY_MOVEMENTS.length;
  const second=f.run('CONSUME',input,'once');assert.equal(second.eventId,first.eventId);assert.equal(second.replay,true);
  assert.equal(f.store.data.T_INVENTORY_MOVEMENTS.length,count);
  assert.throws(()=>f.run('CONSUME',{...input,QTY:2},'once'),/IDEMPOTENCY_CONFLICT/);
});
test('invalid caller and untrusted email/role cannot authorize',()=>{
  const f=fixture();assert.throws(()=>W.PostingService.execute({credential:'invalid',csrfVerified:true,role:'OWNER_TEST',email:'owner'},f.deps),/IDENTITY_DENIED/);
  assert.equal(f.store.data.T_EXCEPTIONS.length,1);assert.equal(f.store.data.T_EVENTS.length,0);
});
test('claims reject wrong signature/audience/issuer/expiry and missing CSRF',()=>{
  const cfg={environment:'DEV',clientId:'aud'},request={credential:'SYNTHETIC',csrfVerified:true},claims={signatureVerified:true,aud:'aud',iss:'accounts.google.com',sub:'subject',exp:fixed.getTime()/1000+60};
  for(const change of [{signatureVerified:false},{aud:'wrong'},{iss:'evil'},{exp:0},{sub:''}])assert.throws(()=>W.SecurityService.caller(request,cfg,()=>({...claims,...change}),fixed),/IDENTITY_DENIED/);
  assert.throws(()=>W.SecurityService.caller({...request,csrfVerified:false},cfg,()=>claims,fixed),/IDENTITY_DENIED/);
});
test('missing/expired/duplicate registry denies; unmapped Operations action denies',()=>{
  const identity={googleSub:'subject'},row={GOOGLE_SUB:'subject',ACTIVE_FLAG:true,EFFECTIVE_FROM:'2026-01-01',ACTOR_ID:'actor',ROLE_CODE:'OPS_TEST'};
  for(const registry of [[],[row,row],[{...row,ACTIVE_FLAG:false}],[{...row,EFFECTIVE_TO:'2026-02-01'}]])assert.throws(()=>W.SecurityService.role(identity,registry,fixed),/ROLE_DENIED/);
  const actor=W.SecurityService.role(identity,[row],fixed);
  assert.throws(()=>W.SecurityService.authorize(actor,'ADJUST',{OPS_TEST:['COMMIT','RELEASE']}),/ACTION_DENIED/);
});
test('lock blocked: bounded retries; no movement; audit failure explicitly surfaced',()=>{
  const f=fixture();f.busy=true;
  assert.throws(()=>f.run('COMMIT',{},'busy'),/LOCK_UNAVAILABLE/);assert.equal(f.tries,6);
  assert.equal(f.store.writes,0);assert.equal(f.audit.length,1);
});
test('posting disabled; malformed/missing policy cannot execute',()=>{
  const f=fixture();f.deps.config.postingEnabled=false;assert.throws(()=>f.run('RECEIVE',{},'x'),/POSTING_DISABLED/);
  assert.throws(()=>W.InventoryActions.create({}),/POSTING_POLICY_NOT_CONFIGURED/);
});
test('variance, broken FK and unapproved adjustment STOP without silently repairing',()=>{
  const f=fixture(),batch=receive(f);
  assert.throws(()=>f.run('TRANSFER',{...movement(batch,'LOC-A',1),TO_LOCATION_ID:'LOC-A'},'badtransfer'),/INVALID_DIRECTION/);
  assert.throws(()=>f.run('CONSUME',{...movement(batch,'LOC-A',1),SKU_ID:'OTHER'},'badsku'),/BATCH_SKU_MISMATCH/);
  assert.throws(()=>f.run('ADJUST',movement(batch,'LOC-A',1),'badadjust'),/APPROVAL_REQUIRED/);
  assert.equal(f.store.data.T_INVENTORY_MOVEMENTS.length,1);
});
test('expired active hold counted; invalid quantities/history fail; immutable blanks protected',()=>{
  for(const value of [true,null,[],{},'',0,-1,NaN,Infinity])assert.throws(()=>W.ValidationService.positiveQty('QTY',value));
  assert.equal(W.InventoryService.activeCommitted({batchId:'b',skuId:'s',locationId:'l',commitments:[{BATCH_ID:'b',SKU_ID:'s',LOCATION_ID:'l',STATUS:'ACTIVE',QTY:2,EXPIRES_AT:'2020-01-01'}]}),2);
  assert.equal(W.InventoryService.movementEffect({MOVEMENT_TYPE:'ADJUST',QTY:2,FROM_LOCATION_ID:'l'},'other'),0);
  assert.throws(()=>W.AuditGuard.assertAppendOnlyMutation({FIELD:''},{FIELD:'changed'},['FIELD']),/IMMUTABLE/);
  assert.throws(()=>W.ReconciliationService.inventoryCheck({expectedOnHand:NaN}),/INVALID_RECONCILIATION/);
});
test('ULID canonical prefix and collision limit',()=>{
  assert.match(W.IdService.unique('COM',()=>false),/^COM-[0-9A-HJKMNP-TV-Z]{26}$/);
  let calls=0;assert.throws(()=>W.IdService.unique('MOV',()=>{calls++;return true;}),/ID_COLLISION_LIMIT/);assert.equal(calls,3);
});
// Actual adapter tests use a fake GAS surface, separately from the plan-level memory store.
function fakeBook() {
  const grids=Object.fromEntries(Object.entries(W.Schema).map(([name,headers])=>[name,[Array.from(headers)]]));
  const names=Object.keys(grids);let apiCalls=0;
  const book={getId:()=> 'FAKE_BOOK',getSheetByName(name){if(!grids[name])return null;return {getSheetId:()=>names.indexOf(name),getLastRow:()=>grids[name].length,getMaxRows:()=>1000,getRange(row,col,count,width){return {getValues:()=>Array.from({length:count},(_,i)=>Array.from({length:width},(_,j)=>grids[name][row+i-1]?.[col+j-1]??''))};}};}};
  const api={Spreadsheets:{batchUpdate(body){apiCalls++;for(const request of body.requests){const r=request.updateCells,grid=grids[names[r.range.sheetId]];grid[r.range.startRowIndex]=r.rows[0].values.map(c=>c.userEnteredValue?Object.values(c.userEnteredValue)[0]:'');}}}};
  return {grids,book,api,get calls(){return apiCalls;}};
}
test('adapter detects missing audit schema before write',()=>{
  const fake=fakeBook();fake.grids.T_EVENTS=[[]];const store=W.SheetsAdapter.create(fake.book,fake.api);
  assert.throws(()=>store.commit([{table:'T_EVENTS',kind:'insert',row:{EVENT_ID:'event'}}]),/SCHEMA_MISMATCH/);assert.equal(fake.calls,0);
});
test('adapter atomic request + reread; literal formula-like text; append-only guard',()=>{
  const fake=fakeBook(),store=W.SheetsAdapter.create(fake.book,fake.api);
  store.commit([{table:'T_EVENTS',kind:'insert',row:{EVENT_ID:'event',PAYLOAD_REF:'=IMPORTDATA("invalid")'}}]);
  assert.equal(fake.calls,1);assert.equal(store.rows('T_EVENTS')[0].PAYLOAD_REF,'=IMPORTDATA("invalid")');
  assert.throws(()=>store.commit([{table:'T_EVENTS',kind:'update',row:{EVENT_ID:'event'}}]),/POSTED_HISTORY_IMMUTABLE/);
});
test('adapter verification mismatch and transport failure fail explicitly',()=>{
  const fake=fakeBook();fake.api.Spreadsheets.batchUpdate=()=>{};
  const store=W.SheetsAdapter.create(fake.book,fake.api);
  assert.throws(()=>store.commit([{table:'T_EVENTS',kind:'insert',row:{EVENT_ID:'event'}}]),/POST_WRITE_VERIFICATION_FAILED/);
  fake.api.Spreadsheets.batchUpdate=()=>{throw new Error('network');};
  assert.throws(()=>store.commit([{table:'T_EVENTS',kind:'insert',row:{EVENT_ID:'event'}}]),/WRITE_OUTCOME_UNKNOWN/);
});
test('uncertain result freezes runtime and releases lock; never blindly retried',()=>{
  const f=fixture(),batch=receive(f),original=f.store.commit;let calls=0;
  f.store.commit=plan=>{calls++;if(plan.some(p=>p.table==='T_INVENTORY_MOVEMENTS'))throw new Error('WRITE_OUTCOME_UNKNOWN');return original(plan);};
  assert.throws(()=>f.run('CONSUME',movement(batch,'LOC-A',1),'unknown'),/WRITE_OUTCOME_UNKNOWN/);
  assert.deepEqual(f.freezes,['WRITE_OUTCOME_UNKNOWN']);assert.equal(calls,2);assert.equal(f.released,2);
});
test('Apps Script pure diagnostic runs locally, without Sheets',()=>assert.equal(context.package3PureSmokeTest(),'PURE_SMOKE_PASS'));
test('reference sequence durable, locked, never reset; verification failures stop',()=>{
  let value=3;const sequence={read:()=>value,writeAndVerify:(_,next)=>{value=next;}};
  assert.equal(W.ReferenceService.next('RCV',2026,sequence,true),'RCV-2026-000004');
  assert.throws(()=>W.ReferenceService.next('RCV',2026,sequence,false),/REFERENCE_LOCK_REQUIRED/);
  assert.throws(()=>W.ReferenceService.next('RCV',2026,{read:()=>undefined},true),/NOT_INITIALIZED/);
  assert.throws(()=>W.ReferenceService.next('RCV',2026,{read:()=>4,writeAndVerify(){}},true),/POST_WRITE_VERIFICATION_FAILED/);
});
test('protected configuration requires explicit complete role registry and DEV',()=>{
  assert.throws(()=>W.DevConfiguration.read({getProperty:()=>null}),/AUTH_CONFIGURATION_MISSING/);
  const data={ENVIRONMENT:'DEV',GIS_CLIENT_ID:'public-test',ROLE_REGISTRY_JSON:'[]',PACKAGE_3_ACTION_ALLOWLIST_JSON:'{}',POSTING_ENABLED:'false'};
  assert.equal(W.DevConfiguration.read({getProperty:key=>data[key]}).postingEnabled,false);
  data.ROLE_REGISTRY_JSON='[{"ACTOR_ID":"x"}]';
  assert.throws(()=>W.DevConfiguration.read({getProperty:key=>data[key]}),/ROLE_REGISTRY_INVALID/);
});
test('reconciliation persists variance and exception, never changes stock to match',()=>{
  const f=fixture(),batch=receive(f),before=clone(f.store.data.T_INVENTORY_MOVEMENTS);
  f.policy.expectedBalance=()=>11;f.deps.builders=W.InventoryActions.create(f.policy);f.deps.allowlist.OWNER_TEST.push('RECONCILE');
  f.run('RECONCILE',{BATCH_ID:batch,SKU_ID:'SKU-TEST',LOCATION_ID:'LOC-A',expectedOnHand:10},'reconcile');
  assert.equal(f.store.data.SYS_RECONCILIATION[0].STATUS,'VARIANCE');
  assert.equal(f.store.data.SYS_RECONCILIATION[0].EXPECTED_VALUE,11);
  assert.equal(f.store.data.T_EXCEPTIONS.at(-1).EXCEPTION_TYPE,'INVENTORY_RECONCILIATION_VARIANCE');
  assert.deepEqual(f.store.data.T_INVENTORY_MOVEMENTS,before);
});
test('unclassified receiving variance and forged reversal reference blocked',()=>{
  const f=fixture(),batch=receive(f);
  assert.throws(()=>f.deps.builders.RECEIVE({SKU_ID:'SKU-TEST',SOURCE_PARTY_ID:'PTY',ECONOMIC_OWNER_ID:'OWNER',CONDITION_CODE:'TEST',TO_LOCATION_ID:'LOC-A',BUSINESS_REASON_CODE:'QA',ACTUAL_QTY:9,EXPECTED_QTY:10},{actorId:'ACTOR-TEST'},f.store,{EVENT_ID:'TEST-EVENT'}),/RECEIPT_VARIANCE_REQUIRES_REVIEW/);
  assert.throws(()=>f.run('ADJUST',{...movement(batch,'LOC-A',1),REVERSAL_OF_ID:'fake',APPROVAL_ID:'APR-TEST'},'forged'),/CONTROLLED_REVERSAL_REQUIRED/);
});
test('DEV header setup refuses non-Business executor and nonempty audit table',()=>{
  context.Session={getEffectiveUser:()=>({getEmail:()=> 'other@example.invalid'})};
  assert.throws(()=>context.package3DevAuditSetup(),/BUSINESS_EDITOR_REQUIRED/);
  const sheet={getLastRow:()=>2,getRange:()=>({getValues:()=>[['unexpected']]})};
  context.Session={getEffectiveUser:()=>({getEmail:()=> 'whatthecapworldwide@gmail.com'}),getActiveUser:()=>({getEmail:()=> 'whatthecapworldwide@gmail.com'})};
  context.SpreadsheetApp={openById:()=>({getSheetByName:name=>name==='SYS_META'?{getLastRow:()=>1,getRange:()=>({getValues:()=>[['ENVIRONMENT','DEV']]})}:sheet})};
  let released=false;context.LockService={getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{released=true;}})};
  assert.throws(()=>context.package3DevAuditSetup(),/AUDIT_TABLE_NOT_EMPTY/);assert.equal(released,true);
});
test('DEV header setup writes frozen headers only; rerun is a no-op',()=>{
  let writes=0;const targets={};
  for(const name of ['T_EVENTS','T_EXCEPTIONS']){
    let headers=[];targets[name]={getLastRow:()=>headers.length?1:0,setFrozenRows(){},getRange(_,__,___,width){return {getValues:()=>[headers.length?headers:Array(width).fill('')],setValues(rows){headers=Array.from(rows[0]);writes++;}};}};
  }
  context.Session={getEffectiveUser:()=>({getEmail:()=> 'whatthecapworldwide@gmail.com'}),getActiveUser:()=>({getEmail:()=> 'whatthecapworldwide@gmail.com'})};
  context.SpreadsheetApp={flush(){},openById:()=>({getSheetByName:name=>name==='SYS_META'?{getLastRow:()=>1,getRange:()=>({getValues:()=>[['ENVIRONMENT','DEV']]})}:targets[name]})};
  context.LockService={getScriptLock:()=>({tryLock:()=>true,releaseLock(){}})};
  context.package3DevAuditSetup();assert.equal(writes,2);
  context.package3DevAuditSetup();assert.equal(writes,2);
});
