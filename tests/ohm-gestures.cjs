/* Topic 21 direct input regressions. This is not physical touch-device certification. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ctx={window:{},Math,console};vm.createContext(ctx);
for(const file of ['circuits','circuit-editor','layout-circuits'])vm.runInContext(fs.readFileSync(path.join(root,'labs/modules/'+file+'.js'),'utf8'),ctx);
const m=ctx.window.RAON_MODELS[21],defaults=()=>Object.fromEntries(m.controls.map(c=>[c.key,c.value])),metric=(r,label)=>+r.metrics.find(x=>x.label===label).value;
assert.deepEqual(JSON.parse(JSON.stringify(m.controls[0])),{key:'cells',label:'전지 수',min:1,max:5,step:1,value:3,unit:''});
const lamp=(cells,R)=>+m.render({cells,R},0).svg.match(/<circle cx="710" cy="300" r="30"[^>]+fill-opacity="([^"]+)"/)[1];
assert(lamp(3,10)<lamp(4,10));assert(lamp(4,10)<lamp(5,10));assert(lamp(5,10)>lamp(5,15));
let cases=0;
for(let cells=1;cells<=5;cells++)for(let R=10;R<=50;R+=5)for(const t of [0,.7,20]){
 const r=m.render({cells,R},t);cases++;
 assert.equal(metric(r,'전압'),1.5*cells);assert.equal(metric(r,'저항'),R);assert(Math.abs(metric(r,'전류')-1.5*cells/R)<=.0005+1e-12);
 assert.equal((r.svg.match(/data-ohm-control=/g)||[]).length,2);assert(r.svg.includes(`aria-valuenow="${cells}"`));assert(r.svg.includes(`aria-valuenow="${R}"`));
 assert(r.svg.includes(`data-resistance-length="${10+R}"`));assert(r.svg.includes(`y="${330-50*cells}" width="155" height="${50*cells}"`));
 assert.equal((r.svg.match(/<rect x="480"/g)||[]).length,cells*2);
 assert(!/NaN|Infinity|undefined/.test(JSON.stringify(r)));
 for(const [,dimension]of r.svg.matchAll(/(?:width|height)="(-?[0-9.]+)"/g))assert(+dimension>=0);
 assert(r.svg.includes('M70 65V335H280V315H310'),'tank outline retained');
 assert(r.svg.includes('cx="710" cy="300" r="30"'),'lamp position retained');
 assert(r.svg.includes('M710 365L500 365'),'return path retained');
}
let values,render,paints=0,prevented=0,focused=0;const captures=new Set();
const inputs=Object.fromEntries(['cells','R'].map(k=>[k,{value:'',dispatchEvent(e){assert.equal(e.type,'input');values[k]=+this.value;render=m.render(values,0);paints++;}}]));
ctx.document={querySelector(s){const key=s.match(/data-key="([^"]+)"/)?.[1];return inputs[key];}};
ctx.Event=class{constructor(type,options){this.type=type;this.bubbles=options.bubbles;}};
const svg={getBoundingClientRect:()=>({left:100,top:60,width:400,height:225}),setPointerCapture:id=>captures.add(id),hasPointerCapture:id=>captures.has(id),releasePointerCapture:id=>captures.delete(id)};
const target=key=>({closest:selector=>selector==='[data-ohm-control]'?{dataset:{ohmControl:key},focus(){focused++;}}:null});
const pointer=(type,key,x,y,extra={})=>m.onScenePointer({type,target:target(key),clientX:100+x/2,clientY:60+y/2,pointerId:7,isPrimary:true,button:0,preventDefault(){prevented++;},...extra},svg,()=>{});
const keyboard=(key,eventKey,extra={})=>m.onSceneKeyDown({key:eventKey,target:target(key),preventDefault(){prevented++;},...extra});
const reset=()=>{m.reset();values=defaults();for(const k of Object.keys(inputs))inputs[k].value=String(values[k]);render=m.render(values,0);};
reset();pointer('pointerdown','cells',150,180);assert.equal(captures.size,1);assert.equal(values.cells,3,'no jump when grabbing tank');
pointer('pointermove','cells',150,80);assert.equal(values.cells,5);assert.equal(values.R,20);assert.equal(metric(render,'전류'),.375);
pointer('pointerup','cells',150,80);assert.equal(captures.size,0);
pointer('pointermove','cells',150,280);assert.equal(values.cells,5,'released movement has no effect');
pointer('pointerdown','cells',150,80);pointer('pointermove','cells',150,280);assert.equal(values.cells,1);pointer('pointerup','cells',150,280);
pointer('pointerdown','R',260,310);pointer('pointermove','R',290,310);assert.equal(values.R,50);assert.equal(values.cells,1);pointer('pointerup','R',290,310);
pointer('pointerdown','R',290,310);pointer('pointermove','R',250,310);assert.equal(values.R,10);pointer('pointerup','R',250,310);
reset();pointer('pointerdown','cells',150,180);pointer('pointermove','cells',150,80,{pointerId:8});assert.equal(values.cells,3,'foreign pointer cannot move drag');pointer('pointerup','cells',150,80,{pointerId:8});assert.equal(captures.size,1);
pointer('pointercancel','cells',150,80,{pointerId:8});assert.equal(captures.size,1,'foreign pointer cancellation is ignored');
pointer('pointermove','cells',150,80);assert.equal(values.cells,5);pointer('pointercancel','cells',150,80);assert.equal(values.cells,3,'cancel restores initial value');assert.equal(captures.size,0);
pointer('pointerdown','R',260,310);pointer('pointermove','R',290,310);keyboard('R','Escape');assert.equal(values.R,20);assert.equal(captures.size,0);
for(const extra of [{button:2},{isPrimary:false}]){pointer('pointerdown','cells',150,180,extra);pointer('pointermove','cells',150,80);assert.equal(values.cells,3);assert.equal(captures.size,0);}
pointer('pointerdown','no-such-control',150,180);assert.equal(captures.size,0);
keyboard('cells','ArrowUp');assert.equal(values.cells,4);keyboard('cells','ArrowDown');assert.equal(values.cells,3);
keyboard('cells','End');assert.equal(values.cells,5);keyboard('cells','ArrowUp',{repeat:true});assert.equal(values.cells,5);keyboard('cells','Home');assert.equal(values.cells,1);
keyboard('R','ArrowRight');assert.equal(values.R,25);keyboard('R','ArrowLeft');assert.equal(values.R,20);keyboard('R','End');assert.equal(values.R,50);keyboard('R','Home');assert.equal(values.R,10);
const count=paints,before=prevented;keyboard('R','Enter');keyboard('cells','ArrowRight');keyboard('cells','x');assert.equal(paints,count);assert.equal(prevented,before,'unhandled keys retain default behavior');
pointer('pointerdown','cells',150,280);pointer('pointermove','cells',150,80);reset();assert.equal(values.cells,3);assert.equal(captures.size,0);pointer('pointermove','cells',150,80);assert.equal(values.cells,3,'reset ends active drag');
pointer('pointerdown','R',260,310);m.dispose();pointer('pointermove','R',290,310);assert.equal(values.R,20);assert.equal(captures.size,0);
// Actual screen-CTM inversion, including translated, scaled and letterboxed SVGs.
reset();const oldBounds=svg.getBoundingClientRect;
svg.getScreenCTM=()=>({a:.4,b:0,c:0,d:.4,e:100,f:90});
const native=(type,clientX,clientY)=>m.onScenePointer({type,target:target('cells'),pointerId:9,button:0,isPrimary:true,clientX,clientY,preventDefault(){}},svg,()=>{});
native('pointerdown',160,162);native('pointermove',160,122);assert.equal(values.cells,5);native('pointerup',160,122);
// The optional fallback also respects xMidYMid meet rather than stretching the coordinates.
delete svg.getScreenCTM;reset();svg.getBoundingClientRect=()=>({left:100,top:60,width:400,height:400});
native('pointerdown',175,237.5);native('pointermove',175,187.5);assert.equal(values.cells,5);native('pointerup',175,187.5);
reset();svg.getBoundingClientRect=()=>({left:0,top:0,width:1440,height:450});
const wide=(type,x)=>m.onScenePointer({type,target:target('R'),pointerId:11,button:0,isPrimary:true,clientX:x,clientY:310,preventDefault(){}},svg,()=>{});
wide('pointerdown',580);wide('pointermove',600);assert.equal(values.R,40,'wide horizontal letterboxing preserves scale');wide('pointerup',600);
svg.getScreenCTM=()=>({a:0,b:0,c:0,d:0,e:0,f:0});wide('pointerdown',580);assert.equal(captures.size,0,'singular screen transform does not start drag');delete svg.getScreenCTM;
svg.getBoundingClientRect=oldBounds;reset();
assert(focused>0);assert(prevented>0);
assert(fs.readFileSync(path.join(root,'electricity/index.html'),'utf8').includes('layout-circuits.js?v=topic21-drag-v1'));
console.log(`PASS topic21: ${cases} render cases; independent water/resistance drag, scaled coordinates, capture, pointer filtering, cancel/Escape, keyboard bounds, Reset/dispose and asset version.`);
