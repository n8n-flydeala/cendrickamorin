function doGet(){
  var p=PropertiesService.getScriptProperties(),owner='whatthecapworldwide@gmail.com';
  // Editor-only DEV test deployment; no Production endpoint is authorized.
  if(p.getProperty('ENVIRONMENT')!=='DEV'||p.getProperty('DEV_WEB_ENABLED')!=='true'||
     Session.getActiveUser().getEmail()!==owner||Session.getEffectiveUser().getEmail()!==owner)return HtmlService.createHtmlOutput('DEV access denied.');
  return HtmlService.createHtmlOutput('<!doctype html><html><head><meta charset="utf-8"><title>Package 3 DEV identity test</title><script src="https://accounts.google.com/gsi/client" async defer></script></head><body>'+
    '<h1>Package 3 DEV — Owner identity verification</h1><p>No inventory posting is enabled by this screen.</p><button id="start">Prepare Google sign-in</button><div id="signin"></div><pre id="status"></pre>'+
    '<script>const status=document.getElementById("status");document.getElementById("start").onclick=()=>{const input={},key=crypto.randomUUID();'+
    'google.script.run.withFailureHandler(()=>{status.textContent="Request failed; no success confirmed.";}).withSuccessHandler(c=>{if(c.ok===false){status.textContent=c.code;return;}'+
    'google.accounts.id.initialize({client_id:c.clientId,nonce:c.nonce,auto_select:false,callback:r=>{google.script.run.withFailureHandler(()=>{status.textContent="Identity test failed.";}).withSuccessHandler(x=>{status.textContent=JSON.stringify(x);}).package3BindOwner({action:"BIND_OWNER",input:input,idempotencyKey:key,nonce:c.nonce,credential:r.credential});}});'+
    'google.accounts.id.renderButton(document.getElementById("signin"),{theme:"outline",size:"large"});status.textContent="Select the approved Business account.";}).package3IssueChallenge("BIND_OWNER",input,key);};</script></body></html>');
}
