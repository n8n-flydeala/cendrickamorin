var WTC = WTC || {};
WTC.DevConfiguration = (function () {
  // Standalone-project Script Properties only; never REF_CONFIG or a staff-bound script.
  // This does not assign any role, enable posting, or provision secrets.
  function read(properties) {
    function json(key) {
      var value = properties.getProperty(key);
      if (!value) throw new Error('AUTH_CONFIGURATION_MISSING');
      try { return JSON.parse(value); } catch (err) { throw new Error('AUTH_CONFIGURATION_INVALID'); }
    }
    var clientId = properties.getProperty('GIS_CLIENT_ID');
    var registry = json('ROLE_REGISTRY_JSON'), allowlist = json('PACKAGE_3_ACTION_ALLOWLIST_JSON');
    if (properties.getProperty('ENVIRONMENT') !== 'DEV' || !clientId || !Array.isArray(registry)) throw new Error('AUTH_CONFIGURATION_MISSING');
    var fields = 'ACTOR_ID|GOOGLE_SUB|EMAIL_DISPLAY|PARTY_ID|ROLE_CODE|ACTIVE_FLAG|EFFECTIVE_FROM|EFFECTIVE_TO|UPDATED_AT|UPDATED_BY'.split('|');
    registry.forEach(function (row) {
      if (fields.some(function (field) { return !Object.prototype.hasOwnProperty.call(row,field); })) throw new Error('ROLE_REGISTRY_INVALID');
    });
    return {clientId:clientId,environment:'DEV',postingEnabled:properties.getProperty('POSTING_ENABLED') === 'true' && !properties.getProperty('PACKAGE_3_FROZEN'),registry:registry,allowlist:allowlist};
  }
  function fingerprint(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('INVALID_ACTION_INPUT');
    function sorted(value) {
      if (Array.isArray(value)) return value.map(sorted);
      if (value && typeof value === 'object') {
        var result={};Object.keys(value).sort().forEach(function(key){result[key]=sorted(value[key]);});return result;
      }
      return value;
    }
    return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,JSON.stringify(sorted(input)),Utilities.Charset.UTF_8)
      .map(function(b){return ('0'+((b+256)%256).toString(16)).slice(-2);}).join('');
  }
  return {read:read,fingerprint:fingerprint};
}());
