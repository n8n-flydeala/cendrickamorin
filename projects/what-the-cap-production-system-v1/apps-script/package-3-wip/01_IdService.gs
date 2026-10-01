var WTC = WTC || {};
WTC.IdService = (function () {
  var ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  function encodeTime(ms, len) {
    var out = '';
    for (var i = 0; i < len; i++) {
      out = ALPHABET[ms % 32] + out;
      ms = Math.floor(ms / 32);
    }
    return out;
  }
  function randomPart(len) {
    var out = '';
    for (var i = 0; i < len; i++) out += ALPHABET[Math.floor(Math.random() * 32)];
    return out;
  }
  function ulid() { return encodeTime(Date.now(), 10) + randomPart(16); }
  function canonical(prefix) {
    if (!prefix || !/^[A-Z0-9_]+$/.test(prefix)) throw new Error('INVALID_ID_PREFIX');
    return prefix + '-' + ulid();
  }
  function unique(prefix, exists) {
    if (typeof exists !== 'function') throw new Error('ID_LOOKUP_REQUIRED');
    for (var attempt = 0; attempt < 3; attempt++) {
      var id = canonical(prefix);
      if (!exists(id)) return id;
    }
    throw new Error('ID_COLLISION_LIMIT');
  }
  return { canonical: canonical, ulid: ulid, unique: unique };
}());
