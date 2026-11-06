const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx={window:{},console,Math};vm.createContext(ctx);for(const file of ['electronics','layout-electronics','layout-transients'])vm.runInContext(fs.readFileSync(path.join(__dirname,`../labs/modules/${file}.js`),'utf8'),ctx);
const M=ctx.window.RAON_MODELS,approx=(a,b,t=1e-9)=>assert(Math.abs(a-b)<=t,`${a} != ${b}`),defaults=id=>Object.fromEntries(M[id].controls.map(c=>[c.key,c.value]));
function experiment(id,extra={}){const model=M[id],v={...defaults(id),...extra};model.reset();let t=0;const render=(dt=0,change={})=>{t+=dt;Object.assign(v,change);const r=model.render(v,t);assert(!/NaN|Infinity|undefined/.test(JSON.stringify(r)));return r;};render();return {v,render,state:()=>model._transient.state(),history:()=>model._transient.history()};}
// No instant assumed energy when first loaded disconnected.
for(const id of [17,39,62]){const x=experiment(id);assert(x.state().vc.every(v=>v===0));assert(x.state().i.every(v=>v===0));assert(!M[id].controls.some(c=>c.key==='elapsed'));}
let x=experiment(62,{switch:1,R:50,C:100,L:100});x.render(.2);approx(x.state().i[0],.1*(1-Math.exp(-1)));approx(x.state().vc[0],5*(1-Math.exp(-.4)));
let before=x.state(),h=JSON.stringify(x.history());x.render(0,{switch:0});approx(x.state().i[0],before.i[0]);approx(x.state().vc[0],before.vc[0]);x.render(.2);approx(x.state().i[0],before.i[0]*Math.exp(-1));approx(x.state().vc[0],before.vc[0]*Math.exp(-.4));
before=x.state();x.render(0,{run:0});h=JSON.stringify(x.history());x.render(100);assert.equal(JSON.stringify(x.state()),JSON.stringify(before));assert.equal(JSON.stringify(x.history()),h);x.render(0,{run:1});x.render(.1);assert(x.state().vc[0]<before.vc[0]);
// A partial charge survives arbitrary releases, and discharges from that actual state.
x=experiment(39,{hold0:1,hold1:1,hold2:1});x.render(.25);before=x.state();assert(before.vc[0]>0&&before.vc[0]<3);x.render(0,{hold0:0,hold1:0,hold2:0});approx(x.state().vc[0],before.vc[0]);x.render(1);approx(x.state().vc[0],before.vc[0]);approx(x.state().vc[1],before.vc[1]);assert(x.state().vc[2]<before.vc[2]);x.render(0,{discharge:1});before=x.state();x.render(.5);approx(x.state().vc[1],before.vc[1]*Math.exp(-.25));x.render(0,{hold1:1});before=x.state();x.render(.5);assert(x.state().vc[1]>before.vc[1]);
x=experiment(39,{hold2:1});x.render(100);approx(x.state().vc[2],1.5);
// Coils start from zero and retain current on release, including the reverse-LED decay path.
x=experiment(17);x.render(.2);before=x.state();for(const i of before.i)assert(i>0);x.render(0,{s0:0,s1:0,s2:0,s3:0});for(let k=0;k<4;k++)approx(x.state().i[k],before.i[k]);const branch=ctx.window.RAON_TRANSIENTS.coilBranch;assert(branch(before.i[2],2,x.v,0).reverse>0);x.render(.1);for(let k=0;k<4;k++)assert(x.state().i[k]<before.i[k]);
// Piecewise analytic integrator agrees across timestep subdivisions and satisfies KCL/KVL.
for(let k=0;k<4;k++)for(const R of [10,100,300])for(const L of [10,200,1000])for(const on of [0,1]){
 const v={R,L,s0:on,s1:on,s2:on,s3:on},start=on?0:.02;
 const whole=branch(start,k,v,.03);let tiny=start;for(let j=0;j<300;j++)tiny=branch(tiny,k,v,.0001).i;approx(whole.i,tiny,1e-8);
 assert(Number.isFinite(whole.i)&&whole.i>=0);assert(whole.forward>=0&&whole.reverse>=0);
 if(k>0){const source=on?(3-whole.voltage)/R:0;approx(source+whole.reverse,whole.i+whole.voltage/(20*R)+whole.forward,1e-9);}
}
// All switches, bounds, repeated toggles, pause and reset remain finite and passive when unpowered.
for(const id of [17,39,62])for(const extreme of ['min','max']){
 const v=defaults(id);for(const c of M[id].controls)if(!c.options)v[c.key]=c[extreme];const q=experiment(id,v);
 for(let j=0;j<60;j++){const changes={};for(const c of M[id].controls.filter(c=>c.options))changes[c.key]=j%2;const old=q.state();q.render(0,changes);assert.equal(JSON.stringify(q.state()),JSON.stringify(old));q.render(j===59?1e6:.017);const s=q.state();assert(s.i.every(i=>Number.isFinite(i)&&i>=0));assert(s.vc.every(v=>Number.isFinite(v)&&v>=0&&v<=5));}
 M[id].reset();assert.equal(M[id]._transient.state().elapsed,0);assert(M[id]._transient.state().vc.every(v=>v===0));assert(M[id]._transient.state().i.every(v=>v===0));
}
// Energy decreases on an unpowered interval; switching appends history without rewriting it.
x=experiment(62,{switch:1});x.render(.31);const prefix=JSON.stringify(x.history());before=x.state();x.render(0,{switch:0});assert.equal(JSON.stringify(x.history().slice(0,-1)),prefix);let energy=.5*x.v.L*.001*before.i[0]**2+.5*x.v.C*1e-6*before.vc[0]**2;for(let j=0;j<10;j++){x.render(.02);const st=x.state(),next=.5*x.v.L*.001*st.i[0]**2+.5*x.v.C*1e-6*st.vc[0]**2;assert(next<=energy);energy=next;}
// Re-rendering the same shell time is a true pause, and a clock rewind is a clean reset.
before=JSON.stringify(x.state());x.render();assert.equal(JSON.stringify(x.state()),before);M[62].render({...x.v,switch:0},-1);assert.equal(M[62]._transient.state().i[0],0);assert.equal(M[62]._transient.state().vc[0],0);
// Geometry remains three distinct activities, not substitute generic response graphs.
for(const [id,parts] of [[17,['LED-circuit-1','LED-circuit-2','LED-circuit-3','LED-circuit-4']],[39,['capacitor-application-1','capacitor-application-2','capacitor-application-3']],[62,['RL-left','RC-right']]]){const q=experiment(id),r=q.render();for(const p of parts)assert(r.svg.includes(`data-layout-part="${p}"`));}
console.log('PASS live switching history17/39/62: continuity, exact dynamics, diode-region KCL, timestep invariance, retention, pause/resume, reset, extreme bounds and preserved layouts.');
// Terminal geometry of the restored diagrams must match conducting branches.
const rc62=M[62].render(Object.fromEntries(M[62].controls.map(c=>[c.key,c.value])),0).svg;
assert(rc62.includes('M465 225L523 225')&&rc62.includes('M587 225L675 225'),'RC capacitor terminals must meet both leads');

x=experiment(39,{hold1:1,discharge:1});x.render(100);approx(x.state().vc[1],1.5);
