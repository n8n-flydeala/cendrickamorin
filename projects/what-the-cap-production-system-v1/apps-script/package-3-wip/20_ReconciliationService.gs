var WTC = WTC || {};
WTC.ReconciliationService = (function () {
  function inventoryCheck(args) {
    if (typeof args.expectedOnHand !== 'number' || !Number.isFinite(args.expectedOnHand)) throw new Error('INVALID_RECONCILIATION_EXPECTATION');
    var actual = WTC.InventoryService.onHand({
      batchId: args.batchId,
      skuId: args.skuId,
      locationId: args.locationId,
      movements: args.movements,
      commitments: args.commitments || []
    });
    var variance = Number(args.expectedOnHand) - actual;
    return {
      CHECK_ID: WTC.IdService.canonical('CHK'),
      CHECK_TYPE: 'INVENTORY_DERIVED_BALANCE',
      SCOPE: args.batchId + '|' + args.skuId + '|' + args.locationId,
      EXPECTED_VALUE: Number(args.expectedOnHand),
      ACTUAL_VALUE: actual,
      VARIANCE: variance,
      RELATED_ENTITY_TYPE: 'BATCH',
      RELATED_ENTITY_ID: args.batchId,
      SEVERITY: variance === 0 ? 'INFO' : 'ERROR',
      STATUS: variance === 0 ? 'PASS' : 'VARIANCE',
      CHECKED_AT: new Date(),
      CHECKED_BY: args.actorId || ''
    };
  }
  return { inventoryCheck: inventoryCheck };
}());
