const assert=require('node:assert/strict');
global.window={};require('./electronics.js');const models=window.RAON_MODELS;
const defaults=e=>Object.fromEntries(e.controls.map(c=>[c.key,c.value]));
const render=(id,v={},t=0)=>models[id].render({...defaults(models[id]),...v},t);
const val=(r,label)=>Number(r.metrics.find(m=>m.label===label).value);
assert.equal(Object.keys(models).length,28);
let count=0;for(const [id,e] of Object.entries(models)){let d=defaults(e);for(const [key,value] of [[null,null],...e.controls.flatMap(c=>(c.options?c.options.map(o=>o.value):[c.min,c.max]).map(v=>[c.key,v]))])for(const t of [0,1,100]){let r=e.render(key?{...d,[key]:value}:d,t);assert(!/NaN|Infinity|undefined/.test(r.svg),`invalid SVG ${id}`);assert(r.explanation&&r.question&&r.answer&&r.note);for(const m of r.metrics)assert(!/NaN|Infinity|undefined/.test(String(m.value)),`${id} metric`);count++;}}
assert(Math.abs(val(render(8,{R:10,C:100,elapsed:1}),'전압')/5-(1-Math.exp(-1)))<.002);
assert(Math.abs(val(render(17,{R:100,L:200,elapsed:2}),'LED 전류')/30-(1-Math.exp(-1)))<.002);
let zero=render(24,{mode:1,frequency:0});assert.equal(val(zero,'실효값'),0);assert.equal(val(zero,'관측 최대 크기'),0);
for(const id of [76]) {let total;for(const t of [0,.5,1,2,10]){let r=render(id,{},t),sum=val(r,'전기장 에너지')+val(r,'자기장 에너지');if(total===undefined)total=sum;assert(Math.abs(total-sum)<.03);}let r=render(id);assert.equal(val(r,id===76?'자기장 에너지':'전기장 에너지'),0);}
for(const mode of [0,1]) {let r=render(71,{mode,C:0,drop:0});assert(Math.abs(val(r,'평균 출력')-(mode?10:5)/Math.PI)<.02);assert(Math.abs(val(r,'출력 RMS')-(mode?5/Math.sqrt(2):2.5))<.005);}
let npn=render(77,{Ib:50,beta:100});assert.equal(val(npn,'이미터 전류'),5.05);
assert.equal(render(63,{logf:14.75}).metrics[2].value,'가시광선');
for(const topology of ['R','RC','RL','RLC'])assert(render(43,{topology}).svg);
assert.equal(val(render(62,{elapsed:0}),'C 에너지'),0);assert.equal(val(render(62,{elapsed:0}),'L 에너지'),0);
console.log(`PASS: ${count} renders plus RC/RL constants, LC conservation, rectifier means/RMS, DC limit, NPN current conservation, spectrum, and topologies.`);
// Regression checks from independent source audit.
let overlay=render(43,{topology:'R'}).svg;
let trace=color=>[...overlay.matchAll(/<path d="([^"]+)" fill="none" stroke="([^"]+)"/g)].filter(m=>m[2]===color&&m[1].split('L').length>100).map(m=>m[1]);
assert.equal(trace('#22d3ee')[0],trace('#f472b6')[0],'equal normalized waves must share axes');
let leakage=render(15,{voltage:-1}).metrics.find(m=>m.label==='전류');assert.equal(leakage.unit,'nA');assert(Math.abs(Number(leakage.value)+1)<.001);
for(const id of [76]){const f=1/(2*Math.PI*Math.sqrt(.04*.00004)),r=render(id,{},200/(4*f));assert(Math.abs(val(r,id===76?'전기장 에너지':'자기장 에너지'))<.01);}
assert.notEqual(render(17,{application:0}).svg,render(17,{application:1}).svg);
for(const id of [11,15,17,31,47,52,59,64,80])assert.notEqual(render(id).question,'조건 하나만 바꾸면 어떤 값이 먼저 달라질까요?');
console.log('PASS: matching overlay coordinates, reverse leakage, physical LC timing, switch paths, topic-specific questions.');

for(const id of [79,80]){for(const component of ['L','C']){const base=val(render(id,{component,frequency:100}),'전류 RMS'),twice=val(render(id,{component,frequency:200}),'전류 RMS');assert(Math.abs(twice/base-(component==='L'?.5:2))<.001);}}
for(const application of [0,1,2]){const a=val(render(17,{application,elapsed:0}),'LED 전류'),b=val(render(17,{application,elapsed:500}),'LED 전류');assert(application===0?b>a:a>b);}
assert.equal(val(render(39,{application:0,switch:0}),'LED 전류'),0);assert.equal(val(render(39,{application:1,switch:1}),'LED 전류'),0);assert(val(render(39,{application:1,switch:0,elapsed:0}),'LED 전류')>0);
for(const gate of ['AND','OR','NOT'])for(const A of [0,1])for(const B of [0,1]){let r=render(9,{gate,A,B});assert(r.svg.includes('트랜지스터'));assert.equal(val(r,'출력 Y'),gate==='AND'?A&B:gate==='OR'?A|B:1-A);}
console.log('PASS: reference-aligned LED applications, L/C frequency response, transistor logic.');
for(const type of ['LPF','HPF']){const low=val(render(52,{type,frequency:10}),'전압 이득'),high=val(render(52,{type,frequency:1000}),'전압 이득');assert(type==='LPF'?low>high:high>low);}
assert(Math.abs(val(render(52,{type:'BPF',frequency:1/(2*Math.PI*Math.sqrt(.02*.00002))}),'전압 이득')-1)<1e-4);
assert.equal(val(render(8,{probe:'source'}),'선택 지점 측정 전압'),5);assert.equal(val(render(8,{probe:'switch',mode:0}),'선택 지점 측정 전압'),0);assert.equal(val(render(8,{probe:'switch',mode:1}),'선택 지점 측정 전압'),5);assert(val(render(8,{probe:'R',mode:1}),'선택 지점 측정 전압')<0);
assert.equal(val(render(31,{mode:2,Vin:6,duty:.5}),'이상적 출력'),-6);
assert(val(render(64,{mode:'shadow'}),'차단된 표시 광선')>0);
assert.equal(val(render(64,{mode:'magnetic',B:.1}),'스크린 편향'),-val(render(64,{mode:'magnetic',B:-.1}),'스크린 편향'));
// Browser hooks: explicit click only, denial fallback, stop-on-leave, pending request cleanup.
function fakeContainer(){const doc={createElement(tag){return{tagName:tag,textContent:'',events:{},addEventListener(k,fn){this.events[k]=fn;}}}};return{ownerDocument:doc,children:[],appendChild(x){this.children.push(x);}};}
(async()=>{let root=fakeContainer(),updates=0;models[8].mountControls(root,()=>updates++);root.children[0].events.click();let v={...defaults(models[8]),R:10,C:100};assert.equal(val(models[8].render(v,10),'측정 시각'),0);assert.equal(val(models[8].render(v,11),'측정 시각'),1);models[8].reset();assert.equal(val(models[8].render(v,12),'측정 시각'),1);
root.children[0].events.click();models[8].render(v,1);const autoSample=models[8].render(v,6),effective=models[8].effectiveValues(v,6);assert.equal(v.elapsed,1);assert.equal(effective.elapsed,5);assert.equal(effective.elapsed,val(autoSample,'측정 시각'));assert(models[8].snapshot()[0].value.startsWith('자동'));
const edited={...v,elapsed:3};assert.equal(val(models[8].render(edited,7),'측정 시각'),3);assert.equal(models[8].effectiveValues(edited,7),edited);assert(models[8].snapshot()[0].value.startsWith('수동'));models[8].reset();

let requests=0,stops=0,closes=0;const tracks={getTracks:()=>[{stop(){stops++;}}]};Object.defineProperty(global,'navigator',{configurable:true,value:{mediaDevices:{getUserMedia:async()=>{requests++;throw Error('denied');}}}});root=fakeContainer();models[11].mountControls(root,()=>updates++);assert.equal(requests,0);await root.children[1].events.click();assert.equal(requests,1);assert(root.children[0].textContent.includes('가상 진동'));
window.AudioContext=class{resume(){return Promise.resolve();}close(){closes++;return Promise.resolve();}createAnalyser(){return{fftSize:1024,getFloatTimeDomainData(a){a.fill(.2);}};}createMediaStreamSource(){return{connect(){}};}};navigator.mediaDevices.getUserMedia=async()=>{requests++;return tracks;};await root.children[1].events.click();assert(Math.abs(val(render(11),'마이크 입력 RMS')-.2)<.0001);models[11].dispose();assert.equal(stops,1);assert.equal(closes,1);
let finish;navigator.mediaDevices.getUserMedia=()=>new Promise(resolve=>finish=resolve);root=fakeContainer();models[11].mountControls(root,()=>{});let pending=root.children[1].events.click();models[11].dispose();finish(tracks);await pending;assert.equal(stops,2);assert(!render(11).metrics.some(m=>m.label==='마이크 입력 RMS'));
for(const action of ['reset','stop']){let done;navigator.mediaDevices.getUserMedia=()=>new Promise(resolve=>done=resolve);root=fakeContainer();models[11].mountControls(root,()=>{});const req=root.children[1].events.click(),before=stops;if(action==='reset')models[11].reset();else root.children[2].events.click();done(tracks);await req;assert.equal(stops,before+1);assert(!render(11).metrics.some(m=>m.label==='마이크 입력 RMS'));models[11].dispose();}
console.log('PASS: LPF/HPF/BPF, probes, automatic elapsed/reset, local mic explicit-consent/denial/disposal, CRT and inverting converter.');})().catch(e=>{console.error(e);process.exitCode=1;});
