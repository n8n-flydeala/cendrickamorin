var WTC = WTC || {};
WTC.AuditGuard = (function () {
  function assertAppendOnlyMutation(originalRow, proposedRow, immutableFields) {
    immutableFields.forEach(function (field) {
      var before = originalRow ? originalRow[field] : undefined;
      var after = proposedRow ? proposedRow[field] : undefined;
      if (before !== undefined && before !== '' && before !== after) {
        throw new Error('POSTED_FIELD_IMMUTABLE:' + field);
      }
    });
    return true;
  }
  return { assertAppendOnlyMutation: assertAppendOnlyMutation };
}());
