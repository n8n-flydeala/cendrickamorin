var WTC = WTC || {};
WTC.InventoryActions = (function () {
  function create(policy) {
    // Approved eligibility/enums/variance classification/approval decisions are dependencies,
    // not assumptions embedded in the inventory arithmetic. Missing policy => STOP.
    ['validateReferences','validateEnums','validateApproval','validateReceipt','receiptReference','now'].forEach(function (name) {
      if (!policy || typeof policy[name] !== 'function') throw new Error('POSTING_POLICY_NOT_CONFIGURED');
    });
    function find(store, table, id) {
      var pk = WTC.Schema[table][0], found = store.rows(table).filter(function (r) { return r[pk] === id; });
      if (found.length !== 1) throw new Error('FK_NOT_FOUND');
      return found[0];
    }
    function id(store, table, prefix) {
      return WTC.IdService.unique(prefix, function (value) {
        return store.rows(table).some(function (r) { return r[WTC.Schema[table][0]] === value; });
      });
    }
    function insert(table, row) { return { table: table, kind: 'insert', row: row }; }
    function balance(store, batch, location, commitments) {
      return { batchId: batch.BATCH_ID, skuId: batch.SKU_ID, locationId: location,
        movements: store.rows('T_INVENTORY_MOVEMENTS'), commitments: commitments || store.rows('T_STOCK_COMMITMENTS') };
    }
    function movement(input, actor, store, event, controlledReversal) {
      if (input.REVERSAL_OF_ID && controlledReversal !== true) throw new Error('CONTROLLED_REVERSAL_REQUIRED');
      var batch = find(store, 'T_BATCHES', input.BATCH_ID);
      if (batch.SKU_ID !== input.SKU_ID) throw new Error('BATCH_SKU_MISMATCH');
      policy.validateReferences(input, actor, store);
      policy.validateEnums(input);
      ['MOVEMENT_TYPE','BUSINESS_REASON_CODE','SOURCE_ENTITY_TYPE','SOURCE_ENTITY_ID'].forEach(function (key) { WTC.ValidationService.requireValue(key, input[key]); });
      var from = input.FROM_LOCATION_ID || '', to = input.TO_LOCATION_ID || '', type = input.MOVEMENT_TYPE;
      if (type === 'CONSUME' && (!from || to)) throw new Error('INVALID_DIRECTION');
      if (type === 'TRANSFER' && (!from || !to || from === to)) throw new Error('INVALID_DIRECTION');
      if (type === 'ADJUST') {
        if (!!from === !!to) throw new Error('INVALID_DIRECTION');
        policy.validateApproval(input, actor, store);
      }
      if (['CONSUME','TRANSFER','ADJUST'].indexOf(type) < 0) throw new Error('ACTION_DENIED');
      var row = WTC.InventoryService.buildMovement({
        MOVEMENT_ID: id(store, 'T_INVENTORY_MOVEMENTS', 'MOV'), BATCH_ID: batch.BATCH_ID, SKU_ID: batch.SKU_ID,
        FROM_LOCATION_ID: from, TO_LOCATION_ID: to, QTY: input.QTY, MOVEMENT_TYPE: type,
        BUSINESS_REASON_CODE: input.BUSINESS_REASON_CODE, SOURCE_ENTITY_TYPE: input.SOURCE_ENTITY_TYPE,
        SOURCE_ENTITY_ID: input.SOURCE_ENTITY_ID, APPROVAL_ID: input.APPROVAL_ID || '',
        REVERSAL_OF_ID: input.REVERSAL_OF_ID || '', NOTES: input.NOTES || '',
        POSTED_AT: policy.now(), POSTED_BY: actor.actorId, EVENT_ID: event.EVENT_ID
      }, [type]);
      [from,to].filter(Boolean).forEach(function (location) {
        WTC.InventoryService.assertNoNegative(Object.assign(balance(store, batch, location), { proposedMovement: row }));
      });
      return [insert('T_INVENTORY_MOVEMENTS', row)];
    }
    function receive(input, actor, store, event) {
      // This planner is verified receiving only. Unverified/variance intake must remain draft.
      policy.validateReferences(input, actor, store); policy.validateEnums(input); policy.validateReceipt(input, actor);
      ['SOURCE_PARTY_ID','ECONOMIC_OWNER_ID','SKU_ID','CONDITION_CODE','TO_LOCATION_ID','BUSINESS_REASON_CODE'].forEach(function (key) { WTC.ValidationService.requireValue(key, input[key]); });
      var qty = WTC.ValidationService.positiveQty('ACTUAL_QTY', input.ACTUAL_QTY);
      var expected = WTC.ValidationService.positiveQty('EXPECTED_QTY', input.EXPECTED_QTY);
      // Until an approved classified-variance posting path is configured, do not mark variance verified.
      if (qty !== expected) throw new Error('RECEIPT_VARIANCE_REQUIRES_REVIEW');
      var now = policy.now(), receiptId = id(store,'T_STOCK_RECEIPTS','RCV'), lineId = id(store,'T_STOCK_RECEIPT_LINES','RCVL'), batchId = id(store,'T_BATCHES','BAT');
      var receipt = { RECEIPT_ID: receiptId, RECEIPT_REF: policy.receiptReference(), SOURCE_PARTY_ID: input.SOURCE_PARTY_ID,
        RECEIVED_DATE: now, RECEIVED_BY: actor.actorId, EXPECTED_STATUS: input.EXPECTED_STATUS,
        CHECK_STATUS: 'VERIFIED', REFERENCE_TEXT: input.REFERENCE_TEXT || '', EVIDENCE_GROUP_ID: input.EVIDENCE_GROUP_ID || '',
        STATUS: input.RECEIPT_STATUS, CREATED_AT: now, CREATED_BY: actor.actorId, UPDATED_AT: now, UPDATED_BY: actor.actorId };
      WTC.ValidationService.requireValue('RECEIPT_REF', receipt.RECEIPT_REF);
      var line = { RECEIPT_LINE_ID: lineId, RECEIPT_ID: receiptId, SKU_ID: input.SKU_ID, EXPECTED_QTY: expected, ACTUAL_QTY: qty,
        CONDITION_CODE: input.CONDITION_CODE, ECONOMIC_OWNER_ID: input.ECONOMIC_OWNER_ID, AGREEMENT_REF_ID: input.AGREEMENT_REF_ID || '',
        VARIANCE_QTY: 0, VARIANCE_STATUS: 'MATCH', BATCH_ID: batchId, STATUS: input.LINE_STATUS, CREATED_AT: now, CREATED_BY: actor.actorId };
      var batch = { BATCH_ID: batchId, SKU_ID: input.SKU_ID, SOURCE_PARTY_ID: input.SOURCE_PARTY_ID, ECONOMIC_OWNER_ID: input.ECONOMIC_OWNER_ID,
        RECEIPT_LINE_ID: lineId, RECEIVED_AT: now, ORIGINAL_QTY: qty, CONDITION_CODE: input.CONDITION_CODE,
        AGREEMENT_REF_ID: input.AGREEMENT_REF_ID || '', STATUS: input.BATCH_STATUS, CREATED_AT: now, CREATED_BY: actor.actorId };
      ['RECEIPT_STATUS','LINE_STATUS','BATCH_STATUS','EXPECTED_STATUS'].forEach(function (key) { WTC.ValidationService.requireValue(key, input[key]); });
      var row = { MOVEMENT_ID: id(store,'T_INVENTORY_MOVEMENTS','MOV'), BATCH_ID: batchId, SKU_ID: input.SKU_ID,
        FROM_LOCATION_ID: '', TO_LOCATION_ID: input.TO_LOCATION_ID, QTY: qty, MOVEMENT_TYPE: 'RECEIVE',
        BUSINESS_REASON_CODE: input.BUSINESS_REASON_CODE, SOURCE_ENTITY_TYPE: 'RECEIPT_LINE', SOURCE_ENTITY_ID: lineId,
        APPROVAL_ID: '', REVERSAL_OF_ID: '', NOTES: '', POSTED_AT: now, POSTED_BY: actor.actorId, EVENT_ID: event.EVENT_ID };
      return [insert('T_STOCK_RECEIPTS',receipt),insert('T_STOCK_RECEIPT_LINES',line),insert('T_BATCHES',batch),insert('T_INVENTORY_MOVEMENTS',row)];
    }
    function commit(input, actor, store, event) {
      var batch = find(store,'T_BATCHES',input.BATCH_ID);
      if (batch.SKU_ID !== input.SKU_ID) throw new Error('BATCH_SKU_MISMATCH');
      policy.validateReferences(input,actor,store); policy.validateEnums(input);
      ['LOCATION_ID','COMMITMENT_TYPE','SOURCE_ENTITY_TYPE','SOURCE_ENTITY_ID'].forEach(function (key) { WTC.ValidationService.requireValue(key,input[key]); });
      WTC.InventoryService.assertCommitCapacity(Object.assign(balance(store,batch,input.LOCATION_ID),{qty:input.QTY}));
      var row = WTC.InventoryService.buildCommitment({ COMMITMENT_ID: id(store,'T_STOCK_COMMITMENTS','COM'), BATCH_ID: batch.BATCH_ID,
        SKU_ID: batch.SKU_ID, LOCATION_ID: input.LOCATION_ID, COMMITMENT_TYPE: input.COMMITMENT_TYPE,
        SOURCE_ENTITY_TYPE: input.SOURCE_ENTITY_TYPE, SOURCE_ENTITY_ID: input.SOURCE_ENTITY_ID, QTY: input.QTY,
        START_AT: policy.now(), EXPIRES_AT: input.EXPIRES_AT || '', STATUS: 'ACTIVE', RELEASED_AT: '', RELEASE_REASON: '',
        CREATED_AT: policy.now(), CREATED_BY: actor.actorId, EVENT_ID: event.EVENT_ID });
      if (row.EXPIRES_AT && (!Number.isFinite(new Date(row.EXPIRES_AT).getTime()) || new Date(row.EXPIRES_AT) <= row.START_AT)) throw new Error('INVALID_EXPIRY');
      return [insert('T_STOCK_COMMITMENTS',row)];
    }
    function release(input, actor, store, event) {
      var current = find(store,'T_STOCK_COMMITMENTS',input.COMMITMENT_ID);
      policy.validateReferences(current,actor,store);
      WTC.ValidationService.requireValue('RELEASE_REASON',input.RELEASE_REASON);
      var row = WTC.InventoryService.releaseCommitment(current,policy.now(),input.RELEASE_REASON);
      return [{table:'T_STOCK_COMMITMENTS',kind:'release',row:row}];
    }
    function reverse(input, actor, store, event) {
      var prior = find(store,'T_INVENTORY_MOVEMENTS',input.REVERSAL_OF_ID);
      if (store.rows('T_INVENTORY_MOVEMENTS').some(function (r) { return r.REVERSAL_OF_ID === prior.MOVEMENT_ID; })) throw new Error('ALREADY_REVERSED');
      if (prior.MOVEMENT_TYPE !== 'ADJUST') throw new Error('REVERSAL_TYPE_NOT_IMPLEMENTED');
      return movement(Object.assign({},input,{BATCH_ID:prior.BATCH_ID,SKU_ID:prior.SKU_ID,QTY:prior.QTY,MOVEMENT_TYPE:'ADJUST',FROM_LOCATION_ID:prior.TO_LOCATION_ID,TO_LOCATION_ID:prior.FROM_LOCATION_ID}),actor,store,event,true);
    }
    function consume(input,actor,store,event){
      if(!input.COMMITMENT_ID)return movement(Object.assign({},input,{MOVEMENT_TYPE:'CONSUME'}),actor,store,event);
      var hold=find(store,'T_STOCK_COMMITMENTS',input.COMMITMENT_ID);
      if(hold.STATUS!=='ACTIVE'||hold.BATCH_ID!==input.BATCH_ID||hold.SKU_ID!==input.SKU_ID||hold.LOCATION_ID!==input.FROM_LOCATION_ID)throw new Error('COMMITMENT_CONSUMPTION_MISMATCH');
      // Exact full-hold consumption only; partial-release policy is not inferred.
      if(WTC.ValidationService.positiveQty('QTY',input.QTY)!==WTC.ValidationService.positiveQty('QTY',hold.QTY))throw new Error('PARTIAL_COMMITMENT_CONSUMPTION_NOT_CONFIGURED');
      WTC.ValidationService.requireValue('RELEASE_REASON',input.RELEASE_REASON);policy.validateEnums(input);
      var released=WTC.InventoryService.releaseCommitment(hold,policy.now(),input.RELEASE_REASON);
      var proposedStore={rows:function(table){return table==='T_STOCK_COMMITMENTS'?store.rows(table).map(function(row){return row.COMMITMENT_ID===hold.COMMITMENT_ID?released:row;}):store.rows(table);}};
      var plan=movement(Object.assign({},input,{MOVEMENT_TYPE:'CONSUME'}),actor,proposedStore,event);
      return plan.concat([{table:'T_STOCK_COMMITMENTS',kind:'release',row:released}]);
    }
    function reconcile(input, actor, store, event) {
      if (typeof policy.expectedBalance !== 'function') throw new Error('RECONCILIATION_VIEW_NOT_CONFIGURED');
      var batch = find(store,'T_BATCHES',input.BATCH_ID);
      policy.validateReferences(input,actor,store);
      var check = WTC.ReconciliationService.inventoryCheck(Object.assign(balance(store,batch,input.LOCATION_ID),{
        expectedOnHand:policy.expectedBalance(batch,input.LOCATION_ID),actorId:actor.actorId
      }));
      check.CHECK_ID=id(store,'SYS_RECONCILIATION','CHK');
      var plan=[insert('SYS_RECONCILIATION',check)];
      if (check.STATUS === 'VARIANCE') {
        var exception=WTC.ExceptionService.buildException({type:'INVENTORY_RECONCILIATION_VARIANCE',entityType:'BATCH',entityId:batch.BATCH_ID,actorId:actor.actorId,notes:'Check: '+check.CHECK_ID});
        exception.EXCEPTION_ID=id(store,'T_EXCEPTIONS','EXC');plan.push(insert('T_EXCEPTIONS',exception));
      }
      return plan;
    }
    return { RECEIVE:receive, COMMIT:commit, RELEASE:release,
      CONSUME:consume,
      TRANSFER:function(i,a,s,e){return movement(Object.assign({},i,{MOVEMENT_TYPE:'TRANSFER'}),a,s,e);},
      ADJUST:function(i,a,s,e){return movement(Object.assign({},i,{MOVEMENT_TYPE:'ADJUST'}),a,s,e);}, REVERSE_ADJUST:reverse,RECONCILE:reconcile };
  }
  return { create:create };
}());
