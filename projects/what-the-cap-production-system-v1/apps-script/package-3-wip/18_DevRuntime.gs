var WTC=WTC||{};
WTC.DevRuntime=(function(){
  var BOOK='1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM';
  function assertBook(book){
    if(book.getId()!==BOOK)throw new Error('DEV_WORKBOOK_IDENTITY_DENIED');
    var meta=book.getSheetByName('SYS_META');if(!meta)throw new Error('DEV_WORKBOOK_IDENTITY_DENIED');
    var values=meta.getRange(1,1,meta.getLastRow(),2).getValues();
    function exact(key,value){var hits=values.filter(function(r){return r[0]===key;});if(hits.length!==1||hits[0][1]!==value)throw new Error('DEV_WORKBOOK_IDENTITY_DENIED');}
    exact('ENVIRONMENT','DEV');exact('BUILD_SPEC_VERSION','BS-V1.0-FROZEN');exact('OPERATIONS_WORKBOOK_ID',BOOK);
  }
  function auditFailure(properties,code,correlation,now){
    properties.setProperty('PACKAGE_3_FROZEN',code);
    properties.setProperty('P3_AUDIT_FAILURE_'+correlation,JSON.stringify({code:code,correlation:correlation,at:now.toISOString()}));
  }
  function create(book,api,properties,lock,fetch,now) {
    assertBook(book);
    var config=WTC.DevConfiguration.read(properties),store=WTC.SheetsAdapter.create(book,api,now);
    var verify=WTC.GoogleIdentity.create(config,fetch,now);
    var integrity=WTC.RequestIntegrity.create(properties,lock,WTC.DevConfiguration.fingerprint,function(){return Utilities.getUuid()+Utilities.getUuid();},now);
    var policy;try{policy=JSON.parse(properties.getProperty('P3_APPROVED_POLICY_JSON'));}catch(err){throw new Error('POSTING_POLICY_NOT_CONFIGURED');}
    var projection=function(){return WTC.InventoryProjection.rebuild(store);},claims,acting;
    var sequence=WTC.SequenceAdapter.create(book,api,function(){if(!acting)throw new Error('ROLE_DENIED');return acting.actorId;},now);
    var reference=function(){return WTC.ReferenceService.next('RCV',now().getFullYear(),sequence,true);};
    function priorProjection(){var snapshot;try{snapshot=JSON.parse(properties.getProperty('P3_INVENTORY_PROJECTION'));}catch(err){throw new Error('RECONCILIATION_VIEW_NOT_CONFIGURED');}if(!Array.isArray(snapshot))throw new Error('RECONCILIATION_VIEW_NOT_CONFIGURED');return snapshot;}
    var refs=WTC.ReferenceAdapter.create(book,now);
    policy.readApproval=function(id){
      var row=refs.find('T_APPROVALS',id),approvedDigests;
      try{approvedDigests=JSON.parse(properties.getProperty('P3_APPROVAL_DIGESTS_JSON'));}catch(err){throw new Error('APPROVAL_REQUIRED');}
      if(!approvedDigests||approvedDigests[id]!==WTC.DevConfiguration.fingerprint(row))throw new Error('APPROVAL_REQUIRED');
      return row;
    };
    var builders=WTC.InventoryActions.create(WTC.FrozenInventoryPolicy.create(refs,policy,now,reference,priorProjection));
    return {store:store,config:config,now:now,lock:lock,registry:function(){return WTC.DevConfiguration.read(properties).registry;},allowlist:config.allowlist,builders:builders,
      fingerprint:WTC.DevConfiguration.fingerprint,
      prepareRequest:function(raw){
        assertBook(book);claims=verify(raw&&raw.credential);integrity.consume(raw,claims,config.clientId);
        acting=WTC.SecurityService.role({googleSub:claims.sub},WTC.DevConfiguration.read(properties).registry,now());
        return {credential:raw.credential,csrfVerified:true,action:raw.action,input:raw.input,idempotencyKey:raw.idempotencyKey};
      },verifyToken:function(){if(!claims)throw new Error('IDENTITY_DENIED');return claims;},
      freeze:function(code){properties.setProperty('PACKAGE_3_FROZEN',code);},
      auditUnavailable:function(code,correlation){auditFailure(properties,code,correlation,now());},
      verifyPreState:projection,
      verifyInventory:function(){try{
        var snapshot=JSON.stringify(projection());if(snapshot.length>8000)throw new Error('DERIVED_CAPACITY');
        properties.setProperty('P3_INVENTORY_PROJECTION',snapshot);
        if(properties.getProperty('P3_INVENTORY_PROJECTION')!==snapshot)throw new Error('DERIVED_WRITE');
      }catch(err){throw new Error('POST_WRITE_INVENTORY_FAILED');}}};
  }
  return {create:create,assertBook:assertBook,auditFailure:auditFailure};
}());
