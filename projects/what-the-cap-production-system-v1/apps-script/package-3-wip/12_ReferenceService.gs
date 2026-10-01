var WTC = WTC || {};
WTC.ReferenceService = (function () {
  // Called ONLY while the same ScriptLock used for posting is held. The supplied sequence
  // adapter must persist/reread SYS_META before returning, even if later posting fails.
  // Issued numbers are never recycled; gaps after a failed action are expected.
  function next(domain,year,sequence,lockHeld) {
    if (lockHeld !== true) throw new Error('REFERENCE_LOCK_REQUIRED');
    if (!/^[A-Z]+$/.test(domain) || !/^\d{4}$/.test(String(year))) throw new Error('INVALID_REFERENCE_DOMAIN');
    var key='SEQUENCE_'+domain+'_'+year, prior=sequence.read(key);
    if (prior === undefined || prior === null) throw new Error('REFERENCE_SEQUENCE_NOT_INITIALIZED');
    if (!Number.isSafeInteger(prior) || prior < 0 || prior >= 999999) throw new Error('INVALID_REFERENCE_SEQUENCE');
    var value=prior+1;
    sequence.writeAndVerify(key,value);
    if (sequence.read(key)!==value) throw new Error('REFERENCE_POST_WRITE_VERIFICATION_FAILED');
    return domain+'-'+year+'-'+('000000'+value).slice(-6);
  }
  return {next:next};
}());
