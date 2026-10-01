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
      DETECTED_BY: args.actorId || '',
      OWNER_PARTY_ID: args.ownerPartyId || '',
      NOTES: args.notes || '',
      STATUS: 'OPEN',
      RESOLUTION_CODE: '',
      RESOLUTION_AT: '',
      EVIDENCE_GROUP_ID: args.evidenceGroupId || '',
      CREATED_AT: new Date(),
      UPDATED_AT: new Date()
    };
  }
  return { buildException: buildException };
}());
