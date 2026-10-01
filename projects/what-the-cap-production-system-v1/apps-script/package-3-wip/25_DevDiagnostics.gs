// Safe editor-run test: pure arithmetic only; no authorization scopes, Sheets reads or writes.
function package3PureSmokeTest() {
  var receive = {BATCH_ID:'DEV-BATCH',SKU_ID:'DEV-SKU',TO_LOCATION_ID:'DEV-A',QTY:10,MOVEMENT_TYPE:'RECEIVE'};
  var args = {batchId:'DEV-BATCH',skuId:'DEV-SKU',locationId:'DEV-A',movements:[receive],commitments:[]};
  if (WTC.InventoryService.onHand(args) !== 10) throw new Error('SMOKE_RECEIVE_FAILED');
  args.commitments = [{BATCH_ID:'DEV-BATCH',SKU_ID:'DEV-SKU',LOCATION_ID:'DEV-A',QTY:4,STATUS:'ACTIVE'}];
  if (WTC.InventoryService.availableToSell(args) !== 6) throw new Error('SMOKE_COMMIT_FAILED');
  args.commitments[0] = WTC.InventoryService.releaseCommitment(args.commitments[0],new Date(),'DEV_QA');
  if (WTC.InventoryService.availableToSell(args) !== 10) throw new Error('SMOKE_RELEASE_FAILED');
  var blocked = false;
  try { WTC.InventoryService.assertNoNegative(Object.assign({},args,{proposedMovement:{BATCH_ID:'DEV-BATCH',SKU_ID:'DEV-SKU',FROM_LOCATION_ID:'DEV-A',QTY:11,MOVEMENT_TYPE:'CONSUME'}})); }
  catch (err) { blocked = err.message === 'NEGATIVE_ON_HAND_BLOCKED'; }
  if (!blocked) throw new Error('SMOKE_NEGATIVE_GUARD_FAILED');
  console.log('Package 3 pure smoke PASS; no live posting performed; NOT acceptance evidence.');
  return 'PURE_SMOKE_PASS';
}
