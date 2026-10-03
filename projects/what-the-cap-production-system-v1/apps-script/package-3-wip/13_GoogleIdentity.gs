var WTC = WTC || {};
WTC.GoogleIdentity = (function () {
  // Google's tokeninfo validator is deliberately DEV-only. Production requires a
  // separately reviewed local signature verifier/library; do not promote this gate.
  function create(config, fetch, now) {
    if (config.environment !== 'DEV' || !/^[0-9]+-[a-z0-9]+\.apps\.googleusercontent\.com$/.test(config.clientId || '')) throw new Error('AUTH_CONFIGURATION_MISSING');
    return function (credential) {
      if (typeof credential !== 'string' || credential.length > 8192 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(credential)) throw new Error('IDENTITY_DENIED');
      var response, claims;
      try {
        // Credential goes only to Google's verifier in a POST body, never a URL/log.
        response = fetch('https://oauth2.googleapis.com/tokeninfo', {method:'post',payload:{id_token:credential},followRedirects:false,muteHttpExceptions:true});
        if (response.getResponseCode() !== 200) throw new Error('INVALID');
        claims = JSON.parse(response.getContentText());
      } catch (err) { throw new Error('IDENTITY_DENIED'); }
      var seconds = Math.floor(now().getTime()/1000);
      if (!claims || claims.aud !== config.clientId || (claims.azp && claims.azp !== config.clientId) ||
          ['accounts.google.com','https://accounts.google.com'].indexOf(claims.iss)<0 ||
          !/^\d+$/.test(String(claims.exp)) || Number(claims.exp)<=seconds ||
          !/^\d+$/.test(String(claims.iat)) || Number(claims.iat)>seconds+60 ||
          typeof claims.sub !== 'string' || !claims.sub || typeof claims.nonce !== 'string' || !claims.nonce) throw new Error('IDENTITY_DENIED');
      // Only a successful trusted Google validator response earns this internal flag.
      return {signatureVerified:true,sub:claims.sub,aud:claims.aud,iss:claims.iss,exp:Number(claims.exp),
        nonce:claims.nonce,email:claims.email,emailVerified:claims.email_verified===true || claims.email_verified==='true'};
    };
  }
  return {create:create};
}());
