var WTC=WTC||{};
WTC.ProtectedOwnerRegistry=(function(){
  var actions=['RECEIVE','COMMIT','RELEASE','CONSUME','TRANSFER','ADJUST','REVERSE_ADJUST','RECONCILE'];
  function bind(properties,claims,activeEmail,effectiveEmail,now) {
    var owner='whatthecapworldwide@gmail.com';
    if(activeEmail!==owner||effectiveEmail!==owner||!claims||claims.signatureVerified!==true||claims.emailVerified!==true||claims.email!==owner||!claims.sub)throw new Error('OWNER_BINDING_DENIED');
    var existing=properties.getProperty('ROLE_REGISTRY_JSON');
    if(existing){
      var rows;try{rows=JSON.parse(existing);}catch(err){throw new Error('ROLE_REGISTRY_INVALID');}
      var matches=rows.filter(function(r){return r.GOOGLE_SUB===claims.sub&&r.EMAIL_DISPLAY===owner&&r.ROLE_CODE==='OWNER_ADMIN'&&r.ACTIVE_FLAG===true;});
      if(matches.length!==1||rows.length!==1)throw new Error('OWNER_REGISTRY_CONFLICT');
      return {bound:true,alreadyBound:true};
    }
    var actor=WTC.IdService.canonical('ACT'),time=now.toISOString();
    var row={ACTOR_ID:actor,GOOGLE_SUB:claims.sub,EMAIL_DISPLAY:owner,PARTY_ID:'',ROLE_CODE:'OWNER_ADMIN',ACTIVE_FLAG:true,EFFECTIVE_FROM:time,EFFECTIVE_TO:'',UPDATED_AT:time,UPDATED_BY:actor};
    properties.setProperty('ROLE_REGISTRY_JSON',JSON.stringify([row]));
    properties.setProperty('PACKAGE_3_ACTION_ALLOWLIST_JSON',JSON.stringify({OWNER_ADMIN:actions}));
    properties.setProperty('POSTING_ENABLED','false');
    if(properties.getProperty('ROLE_REGISTRY_JSON')!==JSON.stringify([row]))throw new Error('ROLE_REGISTRY_WRITE_FAILED');
    return {bound:true,alreadyBound:false};
  }
  return {bind:bind,actions:actions.slice()};
}());
