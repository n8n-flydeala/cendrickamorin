var WTC = WTC || {};
WTC.SecurityService = (function () {
  function deny(code) { throw new Error(code); }
  // Transport supplies a server-verified CSRF/nonce result; two client strings are insufficient.
  // verifier must verify the signature, not just decode a JWT. No credential is returned/logged.
  function caller(request, config, verifier, now) {
    if (config.environment !== 'DEV' || !config.clientId) deny('AUTH_CONFIGURATION_MISSING');
    if (!request || request.csrfVerified !== true || !request.credential) deny('IDENTITY_DENIED');
    var claims;
    try { claims = verifier(request.credential); } catch (err) { deny('IDENTITY_DENIED'); }
    var seconds = Math.floor((now || new Date()).getTime() / 1000);
    if (!claims || claims.signatureVerified !== true || claims.aud !== config.clientId ||
        ['accounts.google.com', 'https://accounts.google.com'].indexOf(claims.iss) < 0 ||
        !Number.isFinite(Number(claims.exp)) || Number(claims.exp) <= seconds ||
        !claims.sub || typeof claims.sub !== 'string') deny('IDENTITY_DENIED');
    return { googleSub: claims.sub };
  }
  function role(identity, registry, now) {
    var time = (now || new Date()).getTime();
    var matches = registry.filter(function (row) {
      return row.GOOGLE_SUB === identity.googleSub && row.ACTIVE_FLAG === true &&
        Number.isFinite(new Date(row.EFFECTIVE_FROM).getTime()) && new Date(row.EFFECTIVE_FROM).getTime() <= time &&
        (!row.EFFECTIVE_TO || (Number.isFinite(new Date(row.EFFECTIVE_TO).getTime()) && new Date(row.EFFECTIVE_TO).getTime() > time));
    });
    if (matches.length !== 1 || !matches[0].ACTOR_ID || !matches[0].ROLE_CODE) deny('ROLE_DENIED');
    return { actorId: matches[0].ACTOR_ID, googleSub: identity.googleSub, roleCode: matches[0].ROLE_CODE };
  }
  function authorize(actor, action, approvedAllowlist) {
    var actions = approvedAllowlist && approvedAllowlist[actor.roleCode];
    if (!Array.isArray(actions) || actions.indexOf(action) < 0) deny('ACTION_DENIED');
    return actor;
  }
  return { caller: caller, role: role, authorize: authorize };
}());
