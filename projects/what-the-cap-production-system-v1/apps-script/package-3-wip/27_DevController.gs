// Public handlers accept untrusted data only; internal helpers end in _ so
// google.script.run cannot invoke them. No public handler accepts trusted flags.
function package3Services_(){
  var p=PropertiesService.getScriptProperties(),now=function(){return new Date();},lock=LockService.getScriptLock();
  if(p.getProperty('ENVIRONMENT')!=='DEV')throw new Error('DEV_CONFIGURATION_REQUIRED');
  var config={environment:'DEV',clientId:p.getProperty('GIS_CLIENT_ID')};
  var verify=WTC.GoogleIdentity.create(config,function(url,options){return UrlFetchApp.fetch(url,options);},now);
  return {properties:p,now:now,lock:lock,config:config,verify:verify,
    integrity:WTC.RequestIntegrity.create(p,lock,WTC.DevConfiguration.fingerprint,function(){return Utilities.getUuid()+Utilities.getUuid();},now)};
}
function package3SheetsApi_(){
  return {Spreadsheets:{batchUpdate:function(body,id){
    if(id!=='1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM')throw new Error('DEV_WORKBOOK_IDENTITY_DENIED');
    var response=UrlFetchApp.fetch('https://sheets.googleapis.com/v4/spreadsheets/'+id+':batchUpdate',{
      method:'post',contentType:'application/json',payload:JSON.stringify(body),followRedirects:false,muteHttpExceptions:true,
      headers:{Authorization:'Bearer '+ScriptApp.getOAuthToken()}});
    if(response.getResponseCode()!==200)throw new Error('WRITE_OUTCOME_UNKNOWN');
    return {};
  }}};
}
function package3SecurityFailure_(error){
  var p=PropertiesService.getScriptProperties(),code=/^[A-Z_]+$/.test(error.message)?error.message:'UNCLASSIFIED_FAILURE';
  var correlation=WTC.IdService.canonical('COR'),lock=LockService.getScriptLock(),held=false;
  try{
    for(var i=0;i<3&&!held;i++)held=lock.tryLock(1000);if(!held)throw new Error('LOCK_UNAVAILABLE');
    var book=SpreadsheetApp.openById('1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM');WTC.DevRuntime.assertBook(book);
    var store=WTC.SheetsAdapter.create(book,package3SheetsApi_(),function(){return new Date();});
    var row=WTC.ExceptionService.buildException({type:code,entityType:'INVENTORY_ACTION',notes:'Correlation: '+correlation});
    row.EXCEPTION_ID=WTC.IdService.unique('EXC',function(id){return store.rows('T_EXCEPTIONS').some(function(r){return r.EXCEPTION_ID===id;});});
    store.commit([{table:'T_EXCEPTIONS',kind:'insert',row:row}]);
  }catch(err){WTC.DevRuntime.auditFailure(p,code,correlation,new Date());}
  finally{if(held)lock.releaseLock();}
  return {ok:false,code:code,correlationId:correlation};
}
function package3IssueChallenge(action,input,key){
  try{var s=package3Services_();
    if(WTC.ProtectedOwnerRegistry.actions.concat(['BIND_OWNER']).indexOf(action)<0)throw new Error('ACTION_DENIED');
    if(typeof key!=='string'||key.length<8||key.length>128||JSON.stringify(input).length>16000)throw new Error('INVALID_ACTION_INPUT');
    return {nonce:s.integrity.issue(action,input,key,s.config.clientId),clientId:s.config.clientId};
  }catch(err){return package3SecurityFailure_(err);}
}
function package3BindOwner(request){
  var locked=false,s;
  try{s=package3Services_();
    if(!request||request.action!=='BIND_OWNER')throw new Error('ACTION_DENIED');
    var claims=s.verify(request.credential);s.integrity.consume(request,claims,s.config.clientId);
    for(var i=0;i<3&&!locked;i++)locked=s.lock.tryLock(1000);if(!locked)throw new Error('LOCK_UNAVAILABLE');
    var result=WTC.ProtectedOwnerRegistry.bind(s.properties,claims,Session.getActiveUser().getEmail(),Session.getEffectiveUser().getEmail(),s.now());
    return {ok:true,bound:result.bound,postingEnabled:false};
  }catch(err){if(locked){s.lock.releaseLock();locked=false;}return package3SecurityFailure_(err);}
  finally{if(locked)s.lock.releaseLock();}
}
function package3RunAction(request){
  var deps;
  try{var p=PropertiesService.getScriptProperties(),book=SpreadsheetApp.openById('1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM');
    deps=WTC.DevRuntime.create(book,package3SheetsApi_(),p,LockService.getScriptLock(),function(url,options){return UrlFetchApp.fetch(url,options);},function(){return new Date();});
    var result=WTC.PostingService.execute(request,deps);return {ok:true,result:result};
  }catch(err){return deps?{ok:false,code:/^[A-Z_]+(?::[A-Z_]+)?$/.test(err.message)?err.message:'UNCLASSIFIED_FAILURE'}:package3SecurityFailure_(err);}
}
