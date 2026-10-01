// Business-editor-only DEV setup, NOT a caller-authenticated inventory posting endpoint.
// Requires BOTH active and effective Business identity; an execute-as-owner web app
// must not authorize a different/unknown caller through the effective identity alone.
// Adds frozen audit headers only when both tables are wholly empty; never edits records.
function package3DevAuditSetup() {
  if (Session.getEffectiveUser().getEmail() !== 'whatthecapworldwide@gmail.com' || Session.getActiveUser().getEmail() !== 'whatthecapworldwide@gmail.com') throw new Error('BUSINESS_EDITOR_REQUIRED');
  var book = SpreadsheetApp.openById('1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM');
  var meta = book.getSheetByName('SYS_META');
  if (!meta) throw new Error('ENVIRONMENT_NOT_VERIFIED');
  var rows = meta.getRange(1,1,meta.getLastRow(),2).getValues();
  var environment = rows.filter(function(r){return r[0] === 'ENVIRONMENT';});
  if (environment.length !== 1 || environment[0][1] !== 'DEV') throw new Error('ENVIRONMENT_NOT_VERIFIED');
  var names=['T_EVENTS','T_EXCEPTIONS'], lock=LockService.getScriptLock(), acquired=false;
  try {
    for(var attempt=0;attempt<3 && !acquired;attempt++) acquired=lock.tryLock(1000);
    if(!acquired) throw new Error('LOCK_UNAVAILABLE');
    var targets=names.map(function(name){
      var sheet=book.getSheetByName(name);
      if(!sheet)throw new Error('TABLE_MISSING');
      var headers=WTC.Schema[name], actual=sheet.getRange(1,1,1,headers.length).getValues()[0];
      if(JSON.stringify(actual)===JSON.stringify(headers))return {name:name,sheet:sheet,ready:true};
      if(sheet.getLastRow()!==0)throw new Error('AUDIT_TABLE_NOT_EMPTY');
      return {name:name,sheet:sheet,ready:false};
    });
    targets.forEach(function(t){
      if(!t.ready){t.sheet.getRange(1,1,1,WTC.Schema[t.name].length).setValues([WTC.Schema[t.name]]);t.sheet.setFrozenRows(1);}
    });
    SpreadsheetApp.flush();
    targets.forEach(function(t){
      if(JSON.stringify(t.sheet.getRange(1,1,1,WTC.Schema[t.name].length).getValues()[0])!==JSON.stringify(WTC.Schema[t.name]))throw new Error('AUDIT_HEADER_VERIFICATION_FAILED');
    });
    console.log('DEV audit header setup verified. No inventory records posted. Package 3 remains NOT ACCEPTED.');
  } finally {if(acquired)lock.releaseLock();}
}
