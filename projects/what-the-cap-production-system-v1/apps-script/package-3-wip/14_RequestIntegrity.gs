var WTC = WTC || {};
WTC.RequestIntegrity = (function () {
  // Challenge binds GIS's signed nonce to the exact action/input/idempotency key.
  // Protected durable state + ScriptLock makes each challenge consumable once.
  function create(properties, lock, digest, random, now) {
    function locked(fn) {
      var held=false;
      for(var i=0;i<3&&!held;i++) held=lock.tryLock(1000);
      if(!held) throw new Error('LOCK_UNAVAILABLE');
      try{return fn();}finally{lock.releaseLock();}
    }
    function issue(action,input,key,audience) {
      if(typeof action!=='string'||!key||!audience) throw new Error('INVALID_ACTION_INPUT');
      return locked(function(){
        var prefix='P3_NONCE_',all=properties.getProperties(),live=0;
        Object.keys(all).filter(function(k){return k.indexOf(prefix)===0;}).forEach(function(k){
          var value;try{value=JSON.parse(all[k]);}catch(err){throw new Error('NONCE_STATE_INVALID');}
          if(value.expires<=now().getTime()) properties.deleteProperty(k); else live++;
        });
        if(live>=100) throw new Error('NONCE_CAPACITY_REACHED');
        var nonce=random(),name=prefix+digest({nonce:nonce});
        if(typeof nonce!=='string'||nonce.length<32||properties.getProperty(name)) throw new Error('NONCE_GENERATION_FAILED');
        properties.setProperty(name,JSON.stringify({action:action,fingerprint:digest(input),key:key,audience:audience,expires:now().getTime()+300000}));
        return nonce;
      });
    }
    function consume(request,claims,audience) {
      return locked(function(){
        if(!request||typeof request.nonce!=='string'||!claims||claims.nonce!==request.nonce) throw new Error('REQUEST_INTEGRITY_DENIED');
        var name='P3_NONCE_'+digest({nonce:request.nonce}),value;
        try{value=JSON.parse(properties.getProperty(name));}catch(err){throw new Error('REQUEST_INTEGRITY_DENIED');}
        if(!value||value.expires<=now().getTime()||value.audience!==audience||value.action!==request.action||
           value.key!==request.idempotencyKey||value.fingerprint!==digest(request.input)) throw new Error('REQUEST_INTEGRITY_DENIED');
        properties.deleteProperty(name);
        if(properties.getProperty(name)) throw new Error('NONCE_STATE_INVALID');
        return true;
      });
    }
    return {issue:issue,consume:consume};
  }
  return {create:create};
}());
