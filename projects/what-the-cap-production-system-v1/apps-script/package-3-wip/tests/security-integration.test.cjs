const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const dir=path.resolve(__dirname,'..'),ctx=vm.createContext({Date,Number,console});
for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.gs')).sort())vm.runInContext(fs.readFileSync(path.join(dir,file),'utf8'),ctx,{filename:file});
const W=ctx.WTC,now=new Date('2026-10-02T04:00:00Z'),aud='123456789-synthetic.apps.googleusercontent.com';
const digest=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
function props(){const values={};return {values,getProperties:()=>({...values}),getProperty:k=>values[k]||null,setProperty:(k,v)=>values[k]=v,deleteProperty:k=>delete values[k]};}
function lock(){let busy=false;return {tryLock(){if(busy)return false;busy=true;return true;},releaseLock(){busy=false;}};}
function claims(overrides={}){return {sub:'synthetic-owner-sub',aud,iss:'https://accounts.google.com',iat:now.getTime()/1000,exp:now.getTime()/1000+600,nonce:'nonce'.repeat(16),email:'whatthecapworldwide@gmail.com',email_verified:'true',...overrides};}
test('DEV Google verifier uses fixed Google POST body; never logs/puts credential in URL',()=>{
 let call;const verify=W.GoogleIdentity.create({environment:'DEV',clientId:aud},(url,options)=>{call={url,options};return {getResponseCode:()=>200,getContentText:()=>JSON.stringify(claims())};},()=>now);
 const result=verify('synthetic.jwt.signature');assert.equal(result.signatureVerified,true);assert.equal(result.sub,'synthetic-owner-sub');
 assert.equal(call.url,'https://oauth2.googleapis.com/tokeninfo');assert.equal(call.options.method,'post');assert.equal(call.options.followRedirects,false);assert.equal(call.options.payload.id_token,'synthetic.jwt.signature');
});
test('Google verifier denies production, HTTP failure, malformed result and bad audience/issuer/expiry/nonce/azp',()=>{
 assert.throws(()=>W.GoogleIdentity.create({environment:'PRODUCTION',clientId:aud},()=>{},()=>now),/AUTH_CONFIGURATION/);
 for(const change of [{aud:'evil'},{azp:'evil'},{iss:'evil'},{exp:0},{iat:now.getTime()/1000+200},{nonce:''},{sub:''}]){
 const verify=W.GoogleIdentity.create({environment:'DEV',clientId:aud},()=>({getResponseCode:()=>200,getContentText:()=>JSON.stringify(claims(change))}),()=>now);assert.throws(()=>verify('synthetic.jwt.signature'),/IDENTITY_DENIED/);}
 const verify=W.GoogleIdentity.create({environment:'DEV',clientId:aud},()=>({getResponseCode:()=>405}),()=>now);assert.throws(()=>verify('synthetic.jwt.signature'),/IDENTITY_DENIED/);
});
test('signed nonce binds exact action/input/key/audience and is durably single-use',()=>{
 const p=props(),integrity=W.RequestIntegrity.create(p,lock(),digest,()=>crypto.randomBytes(32).toString('hex'),()=>now);
 const input={QTY:1},nonce=integrity.issue('CONSUME',input,'request-001',aud),r={nonce,action:'CONSUME',input,idempotencyKey:'request-001'},c={nonce};
 for(const change of [{action:'ADJUST'},{input:{QTY:2}},{idempotencyKey:'other-key'}])assert.throws(()=>integrity.consume({...r,...change},c,aud),/REQUEST_INTEGRITY_DENIED/);
 assert.throws(()=>integrity.consume(r,{nonce:'forged'},aud),/REQUEST_INTEGRITY_DENIED/);
 assert.throws(()=>integrity.consume(r,c,'evil'),/REQUEST_INTEGRITY_DENIED/);
 assert.equal(integrity.consume(r,c,aud),true);assert.throws(()=>integrity.consume(r,c,aud),/REQUEST_INTEGRITY_DENIED/);
});
test('expired nonce and lock contention deny before mutation',()=>{
 const p=props();let time=now;const integrity=W.RequestIntegrity.create(p,lock(),digest,()=>crypto.randomBytes(32).toString('hex'),()=>time),nonce=integrity.issue('RELEASE',{},'request-001',aud);
 time=new Date(now.getTime()+300001);assert.throws(()=>integrity.consume({nonce,action:'RELEASE',input:{},idempotencyKey:'request-001'},{nonce},aud),/REQUEST_INTEGRITY_DENIED/);
 const held={tryLock:()=>false,releaseLock:()=>assert.fail('not held')},blocked=W.RequestIntegrity.create(p,held,digest,()=>'',()=>now);assert.throws(()=>blocked.issue('RELEASE',{},'request-002',aud),/LOCK_UNAVAILABLE/);
});
test('Owner binding requires verified subject, verified approved email and both actual Business sessions',()=>{
 const p=props(),owner='whatthecapworldwide@gmail.com',good={signatureVerified:true,emailVerified:true,email:owner,sub:'synthetic-owner-sub'};
 for(const bad of [{signatureVerified:false},{emailVerified:false},{email:'other@gmail.com'},{sub:''}])assert.throws(()=>W.ProtectedOwnerRegistry.bind(p,{...good,...bad},owner,owner,now),/OWNER_BINDING_DENIED/);
 assert.throws(()=>W.ProtectedOwnerRegistry.bind(p,good,'other@gmail.com',owner,now),/OWNER_BINDING_DENIED/);
 W.ProtectedOwnerRegistry.bind(p,good,owner,owner,now);
 const rows=JSON.parse(p.getProperty('ROLE_REGISTRY_JSON'));assert.equal(rows.length,1);assert.equal(rows[0].ROLE_CODE,'OWNER_ADMIN');assert.equal(rows[0].GOOGLE_SUB,good.sub);assert.equal(p.getProperty('POSTING_ENABLED'),'false');
 assert.equal(W.ProtectedOwnerRegistry.bind(p,good,owner,owner,now).alreadyBound,true);
 assert.throws(()=>W.ProtectedOwnerRegistry.bind(p,{...good,sub:'different'},owner,owner,now),/OWNER_REGISTRY_CONFLICT/);
});
test('durable audit failure freezes posting and records sanitized recovery evidence',()=>{
 const p=props();W.DevRuntime.auditFailure(p,'LOCK_UNAVAILABLE','COR-SYNTHETIC',now);
 assert.equal(p.getProperty('PACKAGE_3_FROZEN'),'LOCK_UNAVAILABLE');assert.equal(JSON.parse(p.getProperty('P3_AUDIT_FAILURE_COR-SYNTHETIC')).code,'LOCK_UNAVAILABLE');
});
test('reference enums reject TO_CONFIRM/inactive/duplicates and master FK absence',()=>{
 const headers='REF_TYPE|CODE|LABEL|ACTIVE_FLAG|SORT_ORDER|PARAM_VALUE|SENSITIVITY|EFFECTIVE_FROM|EFFECTIVE_TO|UPDATED_AT|UPDATED_BY'.split('|');
 let data=[['MOVEMENT_REASONS','TO_CONFIRM','',false],['MOVEMENT_TYPES','CONSUME','',true]];
 const sheet={getLastRow:()=>data.length+1,getRange:(r,c,n,w)=>({getValues:()=>r===1?[headers]:data.map(row=>headers.map((_,i)=>row[i]??''))})},refs=W.ReferenceAdapter.create({getSheetByName:()=>sheet},()=>now);
 assert.throws(()=>refs.enumCode('MOVEMENT_REASONS','TO_CONFIRM'),/ENUM_NOT_APPROVED/);assert.equal(refs.enumCode('MOVEMENT_TYPES','CONSUME').CODE,'CONSUME');
 data.push(data[1]);assert.throws(()=>refs.enumCode('MOVEMENT_TYPES','CONSUME'),/REFERENCE_DUPLICATE_ID/);
});
test('derived rebuild checks receipt/batch/event lineage and physical plus ATS history',()=>{
 const data={T_BATCHES:[{BATCH_ID:'B',SKU_ID:'S',RECEIPT_LINE_ID:'L',ECONOMIC_OWNER_ID:'P',ORIGINAL_QTY:10}],T_STOCK_RECEIPT_LINES:[{RECEIPT_LINE_ID:'L',RECEIPT_ID:'R',BATCH_ID:'B',SKU_ID:'S',ECONOMIC_OWNER_ID:'P',ACTUAL_QTY:10}],T_STOCK_RECEIPTS:[{RECEIPT_ID:'R',CHECK_STATUS:'VERIFIED'}],T_EVENTS:[{EVENT_ID:'E',RESULT_STATUS:'POSTED'}],T_INVENTORY_MOVEMENTS:[{MOVEMENT_ID:'M',BATCH_ID:'B',SKU_ID:'S',SOURCE_ENTITY_ID:'L',MOVEMENT_TYPE:'RECEIVE',TO_LOCATION_ID:'A',QTY:10,EVENT_ID:'E'}],T_STOCK_COMMITMENTS:[]},store={rows:name=>data[name]};
 assert.equal(W.InventoryProjection.rebuild(store)[0].ON_HAND,10);
 data.T_STOCK_COMMITMENTS.push({BATCH_ID:'B',SKU_ID:'S',LOCATION_ID:'A',QTY:11,STATUS:'ACTIVE',EVENT_ID:'E'});assert.throws(()=>W.InventoryProjection.rebuild(store),/INVENTORY_HISTORY_NEGATIVE/);data.T_STOCK_COMMITMENTS=[];
 data.T_EVENTS=[];assert.throws(()=>W.InventoryProjection.rebuild(store),/INVENTORY_LINEAGE_INVALID/);
});
test('DEV identity gate denies wrong workbook even if it says DEV',()=>{
 assert.throws(()=>W.DevRuntime.assertBook({getId:()=> 'legacy'}),/DEV_WORKBOOK_IDENTITY_DENIED/);
});
