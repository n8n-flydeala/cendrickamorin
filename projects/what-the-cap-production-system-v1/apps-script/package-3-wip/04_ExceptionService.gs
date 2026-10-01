var WTC = WTC || {};
WTC.ExceptionService = (function () {
  function buildException(args) {
    return {
      EXCEPTION_ID: WTC.IdService.canonical('EXC'),
      EXCEPTION_TYPE: args.type,
      RELATED_ENTITY_TYPE: args.entityType || '',
      RELATED_ENTITY_ID: args.entityId || '',
      SEVERITY: args.severity || 'ERROR',
      DETECTED_AT: new Date(),
      OWNER_PARTY_ID: args.ownerPartyId || '',
      NOTES: args.notes || '',
      STATUS: 'OPEN',
      RESOLUTION_AT: ''
    };
  }
  return { buildException: buildException };
}());
