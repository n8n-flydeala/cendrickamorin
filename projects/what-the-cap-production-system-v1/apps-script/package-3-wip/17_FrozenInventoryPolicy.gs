var WTC=WTC||{};
WTC.FrozenInventoryPolicy=(function(){
  // Every unresolved status/eligibility decision stays a protected approved
  // configuration dependency. No TEST values are installed into REF_CONFIG.
  function create(refs,approved,now,reference,projection) {
    if(!approved||!approved.enumTypes||!approved.eligibleStatuses||!approved.sourceTables)throw new Error('POSTING_POLICY_NOT_CONFIGURED');
    function enums(input) {
      Object.keys(approved.enumTypes).forEach(function(field){if(input[field])refs.enumCode(approved.enumTypes[field],input[field]);});
      if(input.MOVEMENT_TYPE)refs.enumCode('MOVEMENT_TYPES',input.MOVEMENT_TYPE);
      if(input.BUSINESS_REASON_CODE)refs.enumCode('MOVEMENT_REASONS',input.BUSINESS_REASON_CODE);
    }
    function eligible(table,row){var statuses=approved.eligibleStatuses[table];if(!Array.isArray(statuses)||statuses.indexOf(row.STATUS)<0)throw new Error('ENTITY_NOT_ELIGIBLE');}
    function references(input,actor,store) {
      if(input.SKU_ID)eligible('T_SKUS',refs.find('T_SKUS',input.SKU_ID));
      ['SOURCE_PARTY_ID','ECONOMIC_OWNER_ID'].forEach(function(field){if(input[field])refs.find('T_PARTIES',input[field]);});
      ['LOCATION_ID','FROM_LOCATION_ID','TO_LOCATION_ID'].forEach(function(field){if(input[field]){
        var location=refs.find('T_LOCATIONS',input[field]);eligible('T_LOCATIONS',location);refs.enumCode('LOCATION_TYPES',location.LOCATION_TYPE);
        if(location.IS_PHYSICAL!==true)throw new Error('LOCATION_NOT_ELIGIBLE');
      }});
      if(input.AGREEMENT_REF_ID)throw new Error('PRIVATE_AGREEMENT_DEPENDENCY_NOT_CONFIGURED');
      if(input.SOURCE_ENTITY_TYPE){
        var table=approved.sourceTables[input.SOURCE_ENTITY_TYPE];
        if(!table||!WTC.Schema[table])throw new Error('SOURCE_ENTITY_NOT_APPROVED');
        var pk=WTC.Schema[table][0];if(store.rows(table).filter(function(r){return r[pk]===input.SOURCE_ENTITY_ID;}).length!==1)throw new Error('SOURCE_ENTITY_NOT_FOUND');
      }
      if(input.BATCH_ID){var batches=store.rows('T_BATCHES').filter(function(b){return b.BATCH_ID===input.BATCH_ID;});if(batches.length!==1)throw new Error('FK_NOT_FOUND');eligible('T_BATCHES',batches[0]);}
    }
    function approval(input,actor,store){
      if(actor.roleCode!=='OWNER_ADMIN'||!input.APPROVAL_ID||typeof approved.readApproval!=='function')throw new Error('APPROVAL_REQUIRED');
      var decision=approved.readApproval(input.APPROVAL_ID);
      if(!decision||decision.DECISION!=='APPROVED'||decision.ACTION_TYPE!=='INVENTORY_ADJUSTMENT'||decision.RELATED_ENTITY_TYPE!=='BATCH'||decision.RELATED_ENTITY_ID!==input.BATCH_ID||decision.DECIDED_BY!==actor.actorId||!decision.DECIDED_AT||!decision.REASON)throw new Error('APPROVAL_REQUIRED');
      eligible('T_APPROVALS',decision);
      refs.enumCode('APPROVAL_ACTIONS',decision.ACTION_TYPE);
    }
    return {validateReferences:references,validateEnums:enums,validateApproval:approval,
      validateReceipt:function(input){if(!approved.verifiedReceiptStatuses||approved.verifiedReceiptStatuses.indexOf(input.RECEIPT_STATUS)<0)throw new Error('RECEIPT_STATUS_NOT_APPROVED');},
      receiptReference:reference,now:now,expectedBalance:function(batch,location){var found=projection().filter(function(r){return r.BATCH_ID===batch.BATCH_ID&&r.LOCATION_ID===location;});if(found.length!==1)throw new Error('RECONCILIATION_VIEW_NOT_CONFIGURED');return found[0].ON_HAND;}};
  }
  return {create:create};
}());
