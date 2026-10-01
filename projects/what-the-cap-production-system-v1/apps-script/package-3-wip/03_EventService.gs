var WTC = WTC || {};
WTC.EventService = (function () {
  function buildEvent(args) {
    return {
      EVENT_ID: WTC.IdService.canonical('EVT'),
      EVENT_TYPE: args.eventType,
      EVENT_VERSION: 1,
      SOURCE_SYSTEM: 'WHATTHECAP_PACKAGE_3_DEV',
      ENTITY_TYPE: args.entityType,
      ENTITY_ID: args.entityId,
      CORRELATION_ID: args.correlationId || '',
      IDEMPOTENCY_KEY: args.idempotencyKey || '',
      ACTOR_TYPE: args.actorType || 'GOOGLE_USER',
      OCCURRED_AT: args.occurredAt || new Date(),
      RECORDED_AT: new Date(),
      ACTOR_ID: args.actorId || '',
      RESULT_STATUS: args.resultStatus || 'RECORDED',
      PAYLOAD_REF: args.payloadRef || ''
    };
  }
  return { buildEvent: buildEvent };
}());
