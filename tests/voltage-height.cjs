/* Topic 1 regression tests. Geometry/interaction contracts, not browser/device QA. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const context={window:{},console,Math};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../labs/modules/circuits.js'),'utf8'),context);
const m=context.window.RAON_MODELS[1],test=m._test;
const close=(a,b)=>assert(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const expected={single:[1,1.5,1.5,0],series11:[2,.75,.75,.75],series12:[3,.5,.5,1],parallel11:[.5,3,1.5,1.5],parallel12:[2/3,2.25,1.5,1.5]};
assert.equal(m.controls[0].options.length,5);
for(const [arrangement,[R,I,V1,V2]] of Object.entries(expected)){
  const v={arrangement,V:1.5,R:1},q=test.calculate(v),g=test.geometry(q),r=m.render(v,.5);
  close(q.eq,R);close(q.I,I);close(q.V1,V1);close(q.V2,V2);
  assert(g.hi.z>g.lo.z,'the front battery must raise potential');
  assert.equal(g.lo.y,112);assert.equal(g.hi.y,112);
  assert.equal(g.resistors.length,arrangement==='single'?1:2);
  for(const resistor of g.resistors){assert(resistor.a.z>resistor.b.z,'load must descend along conventional current');assert(resistor.a.y<0,'loads belong on the rear edge');close((resistor.a.z-resistor.b.z)/g.H,resistor.V/q.V);}
  if(q.parallel){close(q.I1+q.I2,q.I);close(g.resistors[0].a.z,g.resistors[1].a.z);close(g.resistors[0].b.z,g.resistors[1].b.z);assert.notEqual(g.resistors[0].a.y,g.resistors[1].a.y);}
  else close(g.resistors.reduce((sum,r)=>sum+r.a.z-r.b.z,0),g.H);
  assert(r.svg.includes('data-part="battery"')&&r.svg.includes('data-part="ground"')&&r.svg.includes('data-voltage-height="true"'));
  assert.notEqual(r.svg,m.render(v,1).svg,'moving positive-charge markers must advance');
}
// Independent annotations keep numerical result cards available when hidden.
const v={arrangement:'parallel12',V:1.5,R:1};m.reset();const baseline=m.render(v,.3);
test.setAnnotations({values:false,drops:true,current:true});const labelled=m.render(v,.3);assert.notEqual(labelled.svg,baseline.svg);assert.deepEqual(labelled.metrics,baseline.metrics);
// View changes leave the physical I/V/R solution unchanged, and reset is stable.
const view0=test.getView(),svg={setPointerCapture(){},releasePointerCapture(){}};let paints=0,prevented=0;
const event=(type,x,y,id=4)=>({type,clientX:x,clientY:y,pointerId:id,button:0,preventDefault(){prevented++;}});
m.onScenePointer(event('pointerdown',100,100),svg,()=>paints++);m.onScenePointer(event('pointermove',150,125),svg,()=>paints++);assert.notDeepEqual(test.getView(),view0);assert.equal(paints,1);
m.onScenePointer(event('pointercancel',150,125),svg,()=>paints++);const afterCancel=test.getView();m.onScenePointer(event('pointermove',200,200),svg,()=>paints++);assert.deepEqual(test.getView(),afterCancel);assert.equal(paints,1);
m.onSceneKeyDown({key:'ArrowLeft',preventDefault(){}},svg,()=>paints++);assert.equal(paints,2);assert.deepEqual(m.render(v,0).metrics,baseline.metrics);
m.onSceneKeyDown({key:'Home',preventDefault(){}},svg,()=>paints++);assert.deepEqual(test.getView(),view0);m.reset();assert.equal(m.render(v,.3).svg,baseline.svg);assert(prevented>0);
// Keep the physical geometry inside the diagram at all allowed values and views.
for(const key of ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']){for(let n=0;n<30;n++)m.onSceneKeyDown({key,preventDefault(){}},svg,()=>{});for(const V of [.5,1.5,6]){const q=test.calculate({...v,V}),g=test.geometry(q);m.render({...v,V},0);for(const p of [...g.ground,...g.leads.flat(),...g.rails.flat()]){const s=test.project(p);assert(s.x>=55&&s.x<=745&&s.y>=54&&s.y<=393,`clipped geometry at ${key}, ${V}: ${JSON.stringify(s)}`);}}}
m.reset();
console.log('PASS topic 1: five presets; I/V/R/KCL/KVL; upright source and descending rear resistors; parallel equal heights; annotation independence; pointer cancel, keyboard/reset and camera bounds.');
