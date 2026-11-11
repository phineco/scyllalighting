import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';

// Uses only local mock data. No real enquiries or external services are contacted.
let confirmed = true;
let received;
const backend = createServer(async (req,res) => {
  let body='';
  for await (const part of req) body += part;
  received=JSON.parse(body);
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({success:confirmed}));
});
backend.listen(0,'127.0.0.1');
await once(backend,'listening');
const backendPort=backend.address().port;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3107'],{
  env:{...process.env,INQUIRY_API_URL:'http://127.0.0.1:'+backendPort,INQUIRY_API_TOKEN:''},stdio:['ignore','pipe','pipe']
});
let log='';
server.stdout.on('data',chunk=>{log+=chunk});
server.stderr.on('data',chunk=>{log+=chunk});
const base='http://127.0.0.1:3107';
const data={name:'Integration test',email:'test@example.com',market:'Kazakhstan',message:'Local contract check',locale:'en',consent:'yes',product:'flood'};
async function post(body,headers={}){return fetch(base+'/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});}
try {
  let ready=false;
  for(let i=0;i<120;i++){
    if(server.exitCode!==null)throw new Error(log);
    try{if((await fetch(base+'/en')).ok){ready=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,250));
  }
  assert.ok(ready,'Production server should start');
  for(const locale of ['en','zh-CN'])for(const path of ['','products','manufacturing','oem-odm','about','contact','privacy']){
    const response=await fetch(base+'/'+locale+(path?'/'+path:''));
    assert.equal(response.status,200,path);
    const html=await response.text();
    assert.ok(html.includes('lang="'+locale+'"'));
    assert.ok(!/世林|shilin|machinery100|excavator/i.test(html));
  }
  for(const path of ['/en/unknown','/fr','/en/products/invalid'])assert.equal((await fetch(base+path)).status,404);
  assert.equal((await post({...data,email:'invalid'})).status,400);
  assert.equal((await post({...data,name:123})).status,400);
  assert.equal((await post(null)).status,400);
  assert.equal((await post({...data,website:'spam'})).status,400);
  assert.equal((await post({...data,consent:''})).status,400);
  assert.equal((await post(data,{origin:'https://untrusted.example'})).status,403);
  confirmed=false;
  assert.equal((await post(data)).status,502,'Unconfirmed upstream must never produce success');
  confirmed=true;
  const success=await post(data);
  assert.equal(success.status,201);
  assert.equal((await success.json()).success,true);
  assert.equal(received.source,'scylla-lighting');
  assert.equal(received.product,'flood');
  assert.equal(received.market,'Kazakhstan');
  console.log('PASS: 14 production pages, locale HTML, public term scan, real 404s, validation, origin check and confirmed enquiry delivery contract.');
} catch(error){console.error(log);throw error} finally {
  server.kill('SIGTERM');
  await new Promise(resolve=>backend.close(resolve));
}
