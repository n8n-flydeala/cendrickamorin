var WTC = WTC || {};
WTC.PostingService = (function () {
  // All dependencies are server-owned; public handlers must use DevRuntime.
  function execute(request, deps) {
    var actor, locked = false, correlation = WTC.IdService.canonical('COR');
    try {
      if (deps.config.environment !== 'DEV' || deps.config.postingEnabled !== true) throw new Error('POSTING_DISABLED');
      // Live runtime discards all client-provided trusted flags and validates its
      // one-use signed-nonce binding before returning an internal request.
      if(typeof deps.prepareRequest==='function') request=deps.prepareRequest(request);
      actor = WTC.SecurityService.role(WTC.SecurityService.caller(request, deps.config, deps.verifyToken, deps.now()), deps.registry(), deps.now());
      WTC.SecurityService.authorize(actor, request.action, deps.allowlist);
      WTC.ValidationService.requireValue('IDEMPOTENCY_KEY', request.idempotencyKey);
      for (var attempt = 0; attempt < 3 && !locked; attempt++) locked = deps.lock.tryLock(1000);
      if (!locked) throw new Error('LOCK_UNAVAILABLE');
      Object.keys(WTC.Schema).forEach(deps.store.verifySchema);
      if(typeof deps.verifyPreState==='function') deps.verifyPreState();
      var prior = deps.store.rows('T_EVENTS').filter(function (e) { return e.IDEMPOTENCY_KEY === request.idempotencyKey; });
      if (prior.length) {
        if (prior.length !== 1 || prior[0].ACTOR_ID !== actor.actorId || prior[0].EVENT_TYPE !== request.action || prior[0].PAYLOAD_REF !== deps.fingerprint(request.input)) throw new Error('IDEMPOTENCY_CONFLICT');
        return { replay: true, eventId: prior[0].EVENT_ID };
      }
      // Builder must reread authoritative rows under this lock, validate FKs/approved policy,
      // and return a complete single-workbook plan; it must never perform its own writes.
      var event = WTC.EventService.buildEvent({ eventType: request.action, entityType: 'INVENTORY', actorId: actor.actorId, correlationId: correlation, idempotencyKey: request.idempotencyKey, payloadRef: deps.fingerprint(request.input), resultStatus: 'POSTED' });
      event.EVENT_ID = WTC.IdService.unique('EVT', function(id) { return deps.store.rows('T_EVENTS').some(function(row) { return row.EVENT_ID === id; }); });
      var builder = deps.builders[request.action];
      if (typeof builder !== 'function') throw new Error('ACTION_NOT_IMPLEMENTED');
      var plan = builder(request.input, actor, deps.store, event);
      if (!Array.isArray(plan) || !plan.length) throw new Error('EMPTY_WRITE_PLAN');
      event.ENTITY_ID = plan[0].row[WTC.Schema[plan[0].table][0]];
      var ids = deps.store.commit(plan.concat([{ table: 'T_EVENTS', kind: 'insert', row: event }]));
      if(typeof deps.verifyInventory==='function') deps.verifyInventory();
      return { replay: false, eventId: event.EVENT_ID, ids: ids };
    } catch (err) {
      // Safe code only. Never include request, token, arbitrary exception text or private values.
      var code = /^[A-Z_]+(?::[A-Z_]+)?$/.test(err.message) ? err.message : 'UNCLASSIFIED_FAILURE';
      if (['WRITE_OUTCOME_UNKNOWN','POST_WRITE_VERIFICATION_FAILED','POST_WRITE_INVENTORY_FAILED'].indexOf(code) >= 0) deps.freeze(code);
      try {
        if (!locked) {
          for (var auditAttempt = 0; auditAttempt < 3 && !locked; auditAttempt++) locked = deps.lock.tryLock(1000);
        }
        if (!locked) throw new Error('LOCK_UNAVAILABLE');
        var exception = WTC.ExceptionService.buildException({ type: code, actorId: actor ? actor.actorId : '', entityType: 'INVENTORY_ACTION', notes: 'Correlation: ' + correlation });
        exception.EXCEPTION_ID = WTC.IdService.unique('EXC', function(id) { return deps.store.rows('T_EXCEPTIONS').some(function(row) { return row.EXCEPTION_ID === id; }); });
        deps.store.commit([{ table: 'T_EXCEPTIONS', kind: 'insert', row: exception }]);
      } catch (auditError) { deps.auditUnavailable(code, correlation); }
      throw new Error(code);
    } finally { if (locked) deps.lock.releaseLock(); }
  }
  return { execute: execute };
}());
