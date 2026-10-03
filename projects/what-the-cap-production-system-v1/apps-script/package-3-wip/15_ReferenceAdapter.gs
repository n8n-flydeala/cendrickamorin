var WTC = WTC || {};
WTC.ReferenceAdapter = (function () {
  var schemas={
    REF_CONFIG:'REF_TYPE|CODE|LABEL|ACTIVE_FLAG|SORT_ORDER|PARAM_VALUE|SENSITIVITY|EFFECTIVE_FROM|EFFECTIVE_TO|UPDATED_AT|UPDATED_BY',
    T_PARTIES:'PARTY_ID|PARTY_TYPE|DISPLAY_NAME|LEGAL_NAME|PRIMARY_PHONE|PRIMARY_EMAIL|ADDRESS_TEXT|CITY|PROVINCE|COUNTRY',
    T_SKUS:'SKU_ID|PRODUCT_ID|SKU_CODE|VARIANT_NAME|SIZE|COLOR|BARCODE|DEFAULT_RETAIL_PRICE|STATUS|CREATED_AT|CREATED_BY|UPDATED_AT|UPDATED_BY',
    T_LOCATIONS:'LOCATION_ID|LOCATION_CODE|LOCATION_NAME|LOCATION_TYPE|IS_SELLABLE|IS_PHYSICAL|STATUS|CREATED_AT|CREATED_BY|UPDATED_AT|UPDATED_BY',
    T_APPROVALS:'APPROVAL_ID|ACTION_TYPE|RELATED_ENTITY_TYPE|RELATED_ENTITY_ID|REQUESTED_BY|REQUESTED_AT|DECISION|DECIDED_BY|DECIDED_AT|REASON|EVIDENCE_GROUP_ID|STATUS'
  };
  function create(book,now) {
    function rows(name) {
      if(!schemas[name]) throw new Error('REFERENCE_TABLE_DENIED');
      var sheet=book.getSheetByName(name),headers=schemas[name].split('|');
      if(!sheet||JSON.stringify(sheet.getRange(1,1,1,headers.length).getValues()[0])!==JSON.stringify(headers)) throw new Error('REFERENCE_SCHEMA_MISMATCH');
      if(sheet.getLastRow()<2) return [];
      var seen={};
      return sheet.getRange(2,1,sheet.getLastRow()-1,headers.length).getValues().reduce(function(out,values){
        if(!values[0]){if(values.some(function(v){return v!=='';}))throw new Error('REFERENCE_ORPHAN_ROW');return out;}
        var key=name==='REF_CONFIG'?values[0]+'|'+values[1]:values[0];
        if(seen[key])throw new Error('REFERENCE_DUPLICATE_ID');seen[key]=true;
        var row={};headers.forEach(function(h,i){row[h]=values[i];});out.push(row);return out;
      },[]);
    }
    function find(name,id) {
      var pk=schemas[name].split('|')[0],found=rows(name).filter(function(r){return r[pk]===id;});
      if(found.length!==1)throw new Error('FK_NOT_FOUND');return found[0];
    }
    function enumCode(type,code) {
      var found=rows('REF_CONFIG').filter(function(r){return r.REF_TYPE===type&&r.CODE===code&&r.CODE!=='TO_CONFIRM'&&r.ACTIVE_FLAG===true&&
        (!r.EFFECTIVE_FROM||new Date(r.EFFECTIVE_FROM).getTime()<=now().getTime())&&(!r.EFFECTIVE_TO||new Date(r.EFFECTIVE_TO).getTime()>now().getTime());});
      if(found.length!==1)throw new Error('ENUM_NOT_APPROVED');return found[0];
    }
    return {rows:rows,find:find,enumCode:enumCode};
  }
  return {create:create};
}());
