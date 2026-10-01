var WTC = WTC || {};
WTC.EventService = (function () {
  function buildEvent(args) {
    return {
      EVENT_ID: WTC.IdService.canonical('EVT'),
      EVENT_TYPE: args.eventType,
      ENTITY_TYPE: args.entityType,
      ENTITY_ID: args.entityId,
      CORRELATION_ID: args.correlationId || '',
      OCCURRED_AT: args.occurredAt || new Date(),
      RECORDED_AT: new Date(),
      ACTOR_ID: args.actorId || '',
      RESULT_STATUS: args.resultStatus || 'RECORDED',
      PAYLOAD_REF: args.payloadRef || ''
    };
  }
  return { buildEvent: buildEvent };
}());
