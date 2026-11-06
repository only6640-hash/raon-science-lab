/* Topic 58 source-behavior regression. Deterministic input tests, not physical touch QA. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ctx={window:{},console,Math};vm.createContext(ctx);
for(const f of ['electronics','layout-electronics'])vm.runInContext(fs.readFileSync(path.join(root,`labs/modules/${f}.js`),'utf8'),ctx);
const model=ctx.window.RAON_MODELS[58],pins=[1,2,4,5,6,7,9,10],mapping={1:'e',2:'d',4:'c',5:'dp',6:'b',7:'a',9:'f',10:'g'};
const defaults=()=>Object.fromEntries(model.controls.map(c=>[c.key,c.value]));
const read=(r,label)=>r.metrics.find(m=>m.label===label).value;
assert.equal(model.controls.length,8,'each signal pin needs an independent control');
assert.deepEqual(model.controls.map(c=>c.key).join(','),pins.map(p=>'pin'+p).join(','));
for(let mask=0;mask<256;mask++){
  const values=defaults(),selected=pins.filter((p,i)=>{values['pin'+p]=(mask>>i)&1;return values['pin'+p];});
  const r=model.render(values,0),lit=new Set(selected.map(p=>mapping[p]));
  assert.equal(read(r,'연결한 핀'),selected.join(', ')||'미연결');
  assert.equal(read(r,'켜진 LED 수'),selected.length);
  for(const segment of Object.values(mapping))assert(r.svg.includes(`data-segment="${segment}" data-lit="${lit.has(segment)}"`));
  assert.equal((r.svg.match(/role="button"/g)||[]).length,16,'both diagrams expose all eight contacts');
  const nodes=[...r.svg.matchAll(/data-node="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(nodes).size,16,'focus identities must distinguish both diagrams');
  for(const p of pins)for(const surface of ['package','equivalent'])assert(r.svg.includes(`data-node="segment-${surface}-${p}" data-layout-key="pin${p}" data-segment-pin="${p}" aria-label="${surface==='package'?'패키지':'등가 회로'} ${p}번 핀 연결 전환" aria-pressed="${selected.includes(p)}"`));
  for(const p of [3,8])assert(!r.svg.includes(`data-layout-key="pin${p}"`),'common cathode is not a controllable signal');
  assert.equal((r.svg.match(/pointer-events="none"/g)||[]).length,selected.length*2,'supply wires must not block repeated clicks on connected pins');
  assert(!/NaN|Infinity|undefined/.test(JSON.stringify(r)));
}
// Reproduce real shell input updates: setInput -> input event -> render -> current values.
let values=defaults(),result=model.render(values),paints=0;
const inputs=Object.fromEntries(pins.map(pin=>['pin'+pin,{value:'0',dispatchEvent(event){assert.equal(event.type,'input');values['pin'+pin]=Number(this.value);result=model.render(values);paints++;}}]));
ctx.document={querySelector(selector){const match=selector.match(/data-key="([^"]+)"/);return match?inputs[match[1]]:null;}};
ctx.Event=class{constructor(type,options){this.type=type;this.bubbles=options.bubbles;}};
const target=(pin,surface='package')=>({closest(selector){return selector==='[data-layout-key]'&&pins.includes(pin)?{dataset:{layoutKey:'pin'+pin,node:`segment-${surface}-${pin}`}}:null;}});
const pointer=(pin,surface,extra={})=>model.onScenePointer({type:'pointerdown',target:target(pin,surface),button:0,isPrimary:true,preventDefault(){},...extra},null,()=>{});
const key=(pin,surface,key,extra={})=>model.onSceneKeyDown({key,target:target(pin,surface),preventDefault(){},...extra});
pointer(10,'package');pointer(1,'equivalent');assert.equal(read(result,'연결한 핀'),'1, 10');assert.equal(read(result,'켜진 조각'),'e, g');
pointer(1,'equivalent');assert.equal(read(result,'연결한 핀'),'10','second click removes only that pin');
key(1,'package','Enter');key(10,'equivalent',' ');assert.equal(read(result,'연결한 핀'),'1','both keyboard surfaces act on the same independent values');
key(5,'equivalent','Enter');assert.equal(read(result,'켜진 조각'),'e, dp');
const before=JSON.stringify(values),beforePaint=paints;
pointer(2,'package',{button:2});pointer(2,'package',{isPrimary:false});key(2,'package','Enter',{repeat:true});key(2,'package','Escape');pointer(3,'package');pointer(8,'package');
for(const activation of [' ','Enter']){let prevented=false;key(2,'equivalent',activation,{repeat:true,preventDefault(){prevented=true;}});assert(prevented,'repeated activation must suppress native default, especially Space scrolling');}
let unrelatedPrevented=false;key(3,'package',' ',{repeat:true,preventDefault(){unrelatedPrevented=true;}});assert(!unrelatedPrevented,'only interactive contacts consume repeated activation');
model.onScenePointer({type:'pointerup',target:target(2)},null,()=>{});model.onScenePointer({type:'pointercancel',target:target(2)},null,()=>{});
assert.equal(JSON.stringify(values),before);assert.equal(paints,beforePaint);
values=defaults();result=model.render(values);assert.equal(read(result,'켜진 LED 수'),0,'shell reset defaults clear every contact');
// Familiar combinations remain constructible, including the separately switched decimal point.
values={...defaults(),pin4:1,pin6:1};assert.equal(read(model.render(values),'켜진 조각'),'c, b');
values=Object.fromEntries(pins.map(p=>['pin'+p,p===5?0:1]));assert.equal(read(model.render(values),'켜진 LED 수'),7);
values.pin5=1;assert.equal(read(model.render(values),'켜진 LED 수'),8);
const html=fs.readFileSync(path.join(root,'electricity/index.html'),'utf8');
assert(html.includes('layout-electronics.js?v=topic58-contacts-v1'),'changed module needs a fresh deployed asset URL');
assert.equal((html.match(/layout-electronics\.js/g)||[]).length,1);
console.log('PASS topic 58: 256 contact combinations, both diagram inputs, repeated click, Enter/Space, repeat default suppression, secondary input filtering, shared cathodes, focus IDs, reset and asset version.');
