var WTC = WTC || {};
WTC.ValidationService = (function () {
  function requireValue(name, value) {
    if (value === '' || value === null || value === undefined) throw new Error('REQUIRED:' + name);
    return value;
  }
  function positiveQty(name, value) {
    var n = Number(value);
    if (!isFinite(n) || n <= 0) throw new Error('INVALID_POSITIVE_QTY:' + name);
    return n;
  }
  function assertEnum(code, allowedCodes, field) {
    if (allowedCodes.indexOf(code) < 0) throw new Error('INVALID_ENUM:' + field + ':' + code);
  }
  function assertDistinctLocations(fromId, toId, movementType) {
    if (movementType === 'TRANSFER' && fromId && toId && fromId === toId) {
      throw new Error('TRANSFER_LOCATIONS_MUST_DIFFER');
    }
  }
  return {
    requireValue: requireValue,
    positiveQty: positiveQty,
    assertEnum: assertEnum,
    assertDistinctLocations: assertDistinctLocations
  };
}());
