var WTC = WTC || {};
WTC.InventoryService = (function () {
  function movementEffect(row, locationId) {
    var qty = Number(row.QTY || 0);
    switch (row.MOVEMENT_TYPE) {
      case 'RECEIVE':
      case 'RETURN':
        return row.TO_LOCATION_ID === locationId ? qty : 0;
      case 'CONSUME':
        return row.FROM_LOCATION_ID === locationId ? -qty : 0;
      case 'TRANSFER':
      case 'RECOVER_RECLASSIFY':
        return (row.TO_LOCATION_ID === locationId ? qty : 0) -
               (row.FROM_LOCATION_ID === locationId ? qty : 0);
      case 'ADJUST':
        if (row.TO_LOCATION_ID === locationId && !row.FROM_LOCATION_ID) return qty;
        if (row.FROM_LOCATION_ID === locationId && !row.TO_LOCATION_ID) return -qty;
        throw new Error('ADJUST_REQUIRES_EXACT_DIRECTION');
      case 'COMMIT':
      case 'RELEASE':
        return 0;
      default:
        throw new Error('UNSUPPORTED_MOVEMENT_TYPE:' + row.MOVEMENT_TYPE);
    }
  }

  function onHand(args) {
    return args.movements
      .filter(function (r) { return r.BATCH_ID === args.batchId && r.SKU_ID === args.skuId; })
      .reduce(function (sum, r) { return sum + movementEffect(r, args.locationId); }, 0);
  }

  function activeCommitted(args) {
    var asOf = args.asOf || new Date();
    return args.commitments
      .filter(function (r) {
        return r.BATCH_ID === args.batchId &&
               r.SKU_ID === args.skuId &&
               r.LOCATION_ID === args.locationId &&
               String(r.STATUS || '').toUpperCase() === 'ACTIVE' &&
               (!r.EXPIRES_AT || new Date(r.EXPIRES_AT) > asOf);
      })
      .reduce(function (sum, r) { return sum + Number(r.QTY || 0); }, 0);
  }

  function availableToSell(args) {
    return onHand(args) - activeCommitted(args);
  }

  function assertCommitCapacity(args) {
    var requested = WTC.ValidationService.positiveQty('QTY', args.qty);
    var ats = availableToSell(args);
    if (requested > ats) throw new Error('COMMITMENT_EXCEEDS_AVAILABLE_STOCK');
    return ats;
  }

  function assertNoNegative(args) {
    var nextMovements = args.movements.concat([args.proposedMovement]);
    var oh = onHand({
      batchId: args.batchId, skuId: args.skuId, locationId: args.locationId,
      movements: nextMovements, commitments: args.commitments
    });
    if (oh < 0) throw new Error('NEGATIVE_ON_HAND_BLOCKED');
    var ats = oh - activeCommitted({
      batchId: args.batchId, skuId: args.skuId, locationId: args.locationId,
      movements: nextMovements, commitments: args.commitments
    });
    if (ats < 0) throw new Error('NEGATIVE_ATS_BLOCKED');
    return { onHand: oh, availableToSell: ats };
  }

  function buildMovement(input, allowedMovementTypes) {
    var type = WTC.ValidationService.requireValue('MOVEMENT_TYPE', input.MOVEMENT_TYPE);
    WTC.ValidationService.assertEnum(type, allowedMovementTypes, 'MOVEMENT_TYPE');
    WTC.ValidationService.positiveQty('QTY', input.QTY);
    WTC.ValidationService.assertDistinctLocations(input.FROM_LOCATION_ID, input.TO_LOCATION_ID, type);
    var row = Object.assign({}, input);
    row.MOVEMENT_ID = row.MOVEMENT_ID || WTC.IdService.canonical('MOV');
    row.QTY = Number(row.QTY);
    row.POSTED_AT = row.POSTED_AT || new Date();
    return row;
  }

  function buildCommitment(input) {
    WTC.ValidationService.requireValue('SKU_ID', input.SKU_ID);
    WTC.ValidationService.requireValue('BATCH_ID', input.BATCH_ID);
    WTC.ValidationService.requireValue('LOCATION_ID', input.LOCATION_ID);
    WTC.ValidationService.positiveQty('QTY', input.QTY);
    var row = Object.assign({}, input);
    row.COMMITMENT_ID = row.COMMITMENT_ID || WTC.IdService.canonical('CMT');
    row.QTY = Number(row.QTY);
    row.START_AT = row.START_AT || new Date();
    row.STATUS = row.STATUS || 'ACTIVE';
    return row;
  }

  function releaseCommitment(existing, releasedAt, releaseReason) {
    if (!existing || String(existing.STATUS || '').toUpperCase() !== 'ACTIVE') {
      throw new Error('COMMITMENT_NOT_ACTIVE');
    }
    var row = Object.assign({}, existing);
    row.STATUS = 'RELEASED';
    row.RELEASED_AT = releasedAt || new Date();
    row.RELEASE_REASON = releaseReason || '';
    return row;
  }

  return {
    movementEffect: movementEffect,
    onHand: onHand,
    activeCommitted: activeCommitted,
    availableToSell: availableToSell,
    assertCommitCapacity: assertCommitCapacity,
    assertNoNegative: assertNoNegative,
    buildMovement: buildMovement,
    buildCommitment: buildCommitment,
    releaseCommitment: releaseCommitment
  };
}());
