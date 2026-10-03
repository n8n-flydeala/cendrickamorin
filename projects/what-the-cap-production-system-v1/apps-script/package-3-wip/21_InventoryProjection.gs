var WTC = WTC || {};
WTC.InventoryProjection = (function(){
  // Derived memory projection only; authoritative registers are never repaired.
  function rebuild(store) {
    var batches=store.rows('T_BATCHES'),movements=store.rows('T_INVENTORY_MOVEMENTS'),holds=store.rows('T_STOCK_COMMITMENTS'),events=store.rows('T_EVENTS');
    var lines=store.rows('T_STOCK_RECEIPT_LINES'),receipts=store.rows('T_STOCK_RECEIPTS'),keys={};
    function one(rows,key,id){var hits=rows.filter(function(r){return r[key]===id;});if(hits.length!==1)throw new Error('INVENTORY_LINEAGE_INVALID');return hits[0];}
    batches.forEach(function(b){
      var line=one(lines,'RECEIPT_LINE_ID',b.RECEIPT_LINE_ID),receipt=one(receipts,'RECEIPT_ID',line.RECEIPT_ID);
      if(line.BATCH_ID!==b.BATCH_ID||line.SKU_ID!==b.SKU_ID||line.ECONOMIC_OWNER_ID!==b.ECONOMIC_OWNER_ID||receipt.CHECK_STATUS!=='VERIFIED'||Number(line.ACTUAL_QTY)!==Number(b.ORIGINAL_QTY))throw new Error('INVENTORY_LINEAGE_INVALID');
      var received=movements.filter(function(m){return m.BATCH_ID===b.BATCH_ID&&m.MOVEMENT_TYPE==='RECEIVE'&&m.SOURCE_ENTITY_ID===line.RECEIPT_LINE_ID;});
      if(received.length!==1||Number(received[0].QTY)!==Number(b.ORIGINAL_QTY))throw new Error('INVENTORY_LINEAGE_INVALID');
    });
    movements.concat(holds).forEach(function(r){
      var batch=one(batches,'BATCH_ID',r.BATCH_ID);if(batch.SKU_ID!==r.SKU_ID)throw new Error('BATCH_SKU_MISMATCH');
      var event=one(events,'EVENT_ID',r.EVENT_ID);if(event.RESULT_STATUS!=='POSTED')throw new Error('INVENTORY_EVENT_INVALID');
      [r.FROM_LOCATION_ID,r.TO_LOCATION_ID,r.LOCATION_ID].filter(Boolean).forEach(function(l){keys[r.BATCH_ID+'|'+l]={batch:batch,location:l};});
    });
    return Object.keys(keys).sort().map(function(key){var item=keys[key],args={batchId:item.batch.BATCH_ID,skuId:item.batch.SKU_ID,locationId:item.location,movements:movements,commitments:holds};
      var oh=WTC.InventoryService.onHand(args),held=WTC.InventoryService.activeCommitted(args);if(oh<0||oh-held<0)throw new Error('INVENTORY_HISTORY_NEGATIVE');
      return {BATCH_ID:args.batchId,SKU_ID:args.skuId,LOCATION_ID:args.locationId,ON_HAND:oh,COMMITTED:held,ATS:oh-held};});
  }
  return {rebuild:rebuild};
}());
