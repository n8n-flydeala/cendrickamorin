function package3DevPreflight(){
  var owner='whatthecapworldwide@gmail.com';
  if(Session.getActiveUser().getEmail()!==owner||Session.getEffectiveUser().getEmail()!==owner)throw new Error('OWNER_SESSION_REQUIRED');
  var book=SpreadsheetApp.openById('1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM');WTC.DevRuntime.assertBook(book);
  var store=WTC.SheetsAdapter.create(book,{},function(){return new Date();}),counts={};
  Object.keys(WTC.Schema).forEach(function(table){store.verifySchema(table);counts[table]=store.rows(table).length;});
  var refs=WTC.ReferenceAdapter.create(book,function(){return new Date();}),masters={};
  ['T_SKUS','T_LOCATIONS','T_PARTIES'].forEach(function(table){masters[table]=refs.rows(table).length;});
  var p=PropertiesService.getScriptProperties(),result={environment:'DEV',canonicalCounts:counts,masterCounts:masters,
    gisClientConfigured:!!p.getProperty('GIS_CLIENT_ID'),roleRegistryConfigured:!!p.getProperty('ROLE_REGISTRY_JSON'),
    policyConfigured:!!p.getProperty('P3_APPROVED_POLICY_JSON'),postingEnabled:p.getProperty('POSTING_ENABLED')==='true',
    frozen:!!p.getProperty('PACKAGE_3_FROZEN'),accepted:false};
  console.log(JSON.stringify(result));return result;
}
