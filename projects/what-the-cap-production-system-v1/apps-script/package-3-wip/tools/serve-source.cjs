// Exposes only this folder's numbered source modules for controlled editor upload.
// No credential/config files, directories, or arbitrary paths can be served.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
http.createServer((req,res)=>{
  if(req.url!=='/source'){res.writeHead(404);res.end();return;}
  const code=fs.readdirSync(root).filter(f=>/^\d\d_.+\.gs$/.test(f)).sort().map(f=>'// SOURCE: '+f+'\n'+fs.readFileSync(path.join(root,f),'utf8')).join('\n');
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
  res.end('<!doctype html><title>Package 3 source upload</title><pre id="source">'+code.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')+'</pre>');
}).listen(8874,'127.0.0.1',()=>console.log('Package 3 source-only upload server: http://127.0.0.1:8874/source'));
