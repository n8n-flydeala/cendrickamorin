var WTC=WTC||{};
WTC.SequenceAdapter=(function(){
  function create(book,api,actor,now){
    var headers='KEY|VALUE|VALUE_TYPE|SENSITIVITY|UPDATED_AT|UPDATED_BY'.split('|');
    function locate(key){
      var sheet=book.getSheetByName('SYS_META');
      if(!sheet||JSON.stringify(sheet.getRange(1,1,1,6).getValues()[0])!==JSON.stringify(headers))throw new Error('REFERENCE_SCHEMA_MISMATCH');
      var rows=sheet.getRange(2,1,sheet.getLastRow()-1,6).getValues(),matches=[];
      rows.forEach(function(r,i){if(r[0]===key)matches.push({row:i+2,value:r[1]});});
      if(matches.length!==1)throw new Error('REFERENCE_SEQUENCE_NOT_INITIALIZED');
      return {sheet:sheet,record:matches[0]};
    }
    function read(key){var value=locate(key).record.value;if(typeof value!=='number'||!Number.isSafeInteger(value)||value<0)throw new Error('INVALID_REFERENCE_SEQUENCE');return value;}
    function writeAndVerify(key,value){
      var found=locate(key);if(value!==read(key)+1)throw new Error('INVALID_REFERENCE_SEQUENCE');
      var cells=[key,value,'NUMBER','INTERNAL',now().toISOString(),actor()];
      var request={updateCells:{range:{sheetId:found.sheet.getSheetId(),startRowIndex:found.record.row-1,endRowIndex:found.record.row,startColumnIndex:0,endColumnIndex:6},rows:[{values:cells.map(function(v){return {userEnteredValue:typeof v==='number'?{numberValue:v}:{stringValue:v}};})}],fields:'userEnteredValue'}};
      try{api.Spreadsheets.batchUpdate({requests:[request]},book.getId());}catch(err){throw new Error('WRITE_OUTCOME_UNKNOWN');}
      if(read(key)!==value)throw new Error('POST_WRITE_VERIFICATION_FAILED');
    }
    return {read:read,writeAndVerify:writeAndVerify};
  }
  return {create:create};
}());
