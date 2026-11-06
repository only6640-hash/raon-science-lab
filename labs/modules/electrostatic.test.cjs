'use strict';
const assert = require('node:assert/strict');
global.window = {};
require('./electrostatic.js');
const M = window.RAON_MODELS;
const ids = [12,13,19,23,25,26,28,40,41,42,45,54,55,56,69,72,73,74,78];
function metrics(id,v={}) { return Object.fromEntries(M[id].render(v,0).metrics.map(m=>[m.label,m.value])); }
function n(id,v,label) { return Number(metrics(id,v)[label]); }
let renders=0;
for(const id of ids){const m=M[id];assert(m,`Missing ${id}`);const defaults=Object.fromEntries(m.controls.map(c=>[c.key,c.value]));const cases=[defaults];for(const c of m.controls){for(const value of c.options?c.options.map(o=>o.value):[c.min,c.max])cases.push({...defaults,[c.key]:value});}for(const values of cases)for(const time of [0,5]){const r=m.render(values,time);assert(r.svg.length>100);assert(!/\b(NaN|Infinity|undefined)\b/.test(r.svg),`Nonfinite ${id}`);assert(r.explanation&&r.question&&r.answer&&r.note);assert(Array.isArray(r.metrics));for(const metric of r.metrics)assert(!/NaN|Infinity|undefined/.test(String(metric.value)));assert.equal(r.svg,m.render(values,time).svg,`Not deterministic ${id}`);renders++;}}
// Geometry and conservation, not just finite-output smoke tests.
assert.equal(n(25,{angle:180},'분자 쌍극자'),0);
assert(Math.abs(n(25,{angle:104.5},'분자 쌍극자')-1.85)<.02);
assert(Math.abs(n(23,{gap:8},'정전용량')/n(23,{gap:4},'정전용량')-.5)<.001);
assert(n(12,{er:6,connection:'battery'},'전하량')>n(12,{er:3,connection:'battery'},'전하량'));
assert.equal(n(12,{er:6,connection:'isolated'},'전하량'),n(12,{er:3,connection:'isolated'},'전하량'));
assert(n(40,{er:6,connection:'isolated'},'에너지')<n(40,{er:3,connection:'isolated'},'에너지'));
for(const sign of ['positive','negative'])for(const net of [-6,-2,0,2,6]){const r=metrics(54,{net,sign,strength:4,distance:20});assert(Math.abs(Number(r['머리 전하'])+Number(r['금속박 전하 합'])-net)<1e-9);}
assert(n(54,{net:2,sign:'positive',strength:4,distance:20},'금속박 전하 합')>n(54,{net:2,strength:0,distance:20},'금속박 전하 합'));
assert(n(54,{net:-2,sign:'negative',strength:4,distance:20},'금속박 전하 합')<n(54,{net:-2,strength:0,distance:20},'금속박 전하 합'));
assert(n(69,{q1:3,q2:-3,px:0,py:.3},'P의 전기장')>0);
assert.equal(n(69,{q1:3,q2:3,px:0,py:0},'P의 전기장'),0);
assert.equal(metrics(45,{pressure:0})['상태'],'비접촉');
assert.equal(n(45,{pressure:60,x:50,supply:4},'가로 측정 전압'),2);
assert.equal(n(45,{pressure:100,x:50,supply:4},'가로 측정 전압'),2);
assert(n(13,{height:0},'최대 변화')>n(13,{height:20},'최대 변화'));
assert(n(41,{material:'copper'},'전류')>n(41,{material:'glass'},'전류'));
assert.equal(metrics(28,{sign:'positive'})['운동 경향'],'막대 쪽으로');
assert.equal(metrics(28,{sign:'negative'})['운동 경향'],'막대 쪽으로');
assert.equal(metrics(28,{strength:0})['운동 경향'],'정지');
assert(n(26,{probe:95},'한쪽 면의 국소 밀도')>n(26,{probe:0},'한쪽 면의 국소 밀도'));
assert(M[74].render({}).svg.includes('도체 · 자유전자')&&M[74].render({}).svg.includes('부도체 · 결합 전하'));
assert(n(78,{mode:'comparison',material:'semi',temperature:700},'전도띠 바닥 점유율')>n(78,{mode:'comparison',material:'semi',temperature:300},'전도띠 바닥 점유율'));
assert(n(78,{mode:'comparison',material:'semi',gap:.2},'전도띠 바닥 점유율')>n(78,{mode:'comparison',material:'semi',gap:2},'전도띠 바닥 점유율'));
console.log(`PASS: ${ids.length} electrostatic/material models; ${renders} deterministic boundary renders; conservation, polarity, inverse laws, energy, sensing and band regressions.`);
// References 55 and 56 are circuit potentials, not point-charge/uniform-field tasks.
for(const id of [55,56]) {
 const names=id===55?['A','B','C','D','E','F']:['A','B','C','D'];
 const cases=id===55?[{switch:'closed'},{switch:'open'}]:[{topology:'series'},{topology:'parallel'}];
 for(const config of cases) for(const a of names) for(const b of names){
  const read=n(id,{...config,positive:a,negative:b},'전압계');
  const swapped=n(id,{...config,positive:b,negative:a},'전압계');
  assert(Math.abs(read+swapped)<1e-10,`Meter polarity ${id} ${a}/${b}`);
  if(a===b)assert.equal(read,0);
 }
 for(const config of cases)for(const voltage of [0,12,24])for(const r1 of [1,20,100])for(const r2 of [1,40,100]){
  assert.equal(n(id,{...config,voltage,r1,r2},'한 바퀴 전위 변화 합'),0);
 }
}
assert.equal(n(55,{positive:'A',negative:'B'},'전압계'),0);
assert.equal(n(55,{positive:'C',negative:'D'},'전압계'),0);
assert.equal(n(55,{positive:'E',negative:'F'},'전압계'),0);
assert.equal(n(55,{voltage:12,r1:20,r2:40,positive:'B',negative:'C'},'전압계'),4);
assert.equal(n(55,{voltage:12,r1:20,r2:40,positive:'D',negative:'E'},'전압계'),8);
assert.equal(n(55,{switch:'open',positive:'C',negative:'D'},'전압계'),12);
assert.equal(n(55,{switch:'open'},'회로 전류'),0);
assert.equal(n(55,{switch:'open'},'R₁ 전압 강하'),0);
assert.equal(n(55,{switch:'open'},'R₂ 전압 강하'),0);
assert.equal(n(56,{topology:'series'},'R₁ 양단 전압'),4);
assert.equal(n(56,{topology:'series'},'R₂ 양단 전압'),8);
assert.equal(n(56,{topology:'parallel',r1:100},'R₂ 양단 전압'),12);
assert.equal(n(56,{topology:'parallel',r1:1},'R₂ 양단 전압'),12);
assert.equal(n(56,{topology:'parallel',positive:'A',negative:'B'},'전압계'),0);
assert.equal(n(56,{topology:'series'},'R₁ 전류'),n(56,{topology:'series'},'R₂ 전류'));
assert(Math.abs(n(56,{topology:'parallel'},'전원 전류')-n(56,{topology:'parallel'},'R₁ 전류')-n(56,{topology:'parallel'},'R₂ 전류'))<1e-10);
console.log('PASS: circuit reference corrections; all probe pairs/sign swaps/identical terminals, wire/open-gap readings, KVL, series division, parallel voltage and current conservation.');

assert.equal(n(69,{q1:0,q2:0,distance:.8,px:.4,py:0},'P의 전위'),0);
assert.equal(n(69,{q1:0,q2:0,distance:.8,px:.4,py:0},'P의 전기장'),0);
assert(Number.isFinite(n(69,{q1:0,q2:3,distance:.8,px:-.4,py:0},'P의 전위')));
for(const topology of ['series','parallel'])for(const voltage of [0,6,12])for(const r1 of [5,20,100])for(const r2 of [5,40,100])for(const duration of [1,4,10]){
 const v={topology,voltage,r1,r2,duration},m=metrics(72,v),incoming=Number(m['들어오는 전류']),a=Number(m['전구 1 전류']),b=Number(m['전구 2 전류']);
 assert.equal(incoming,Number(m['나가는 전류']));
 assert.equal(m['들어온 전하량'],m['나간 전하량']);
 assert.equal(Number(m['회로에 쌓인 전하량']),0);
 if(topology==='series'){assert.equal(incoming,a);assert.equal(a,b);assert.equal(m['들어온 전하량'],m['전구마다 통과한 전하량']);}
 else {assert(Math.abs(incoming-a-b)<=.001001);assert.equal(m['들어온 전하량'],m['두 갈래 통과 전하량 합']);}
}
assert(n(72,{topology:'parallel',r1:10},'전구 1 전류')>n(72,{topology:'parallel',r1:50},'전구 1 전류'));
assert.equal(n(72,{topology:'parallel',r1:10},'전구 2 전류'),n(72,{topology:'parallel',r1:50},'전구 2 전류'));
assert.equal(n(72,{duration:8},'들어온 전하량'),2*n(72,{duration:4},'들어온 전하량'));
assert.notEqual(M[72].render({},0).svg,M[72].render({},.3).svg);
console.log('PASS: current continuity 72; series equality, junction current sum, charge throughput, zero accumulation, control response and moving equal-charge packets.');

for(const stage of ['rub','wall','cat','discharge'])for(const rubs of [0,6,10])for(const humidity of [0,30,100])for(const elapsed of [0,10,60]){
 const m=metrics(42,{stage,rubs,humidity,elapsed});
 assert(Math.abs(Number(m['고양이 털 전하'])+Number(m['풍선 전하'])+Number(m['주변으로 이동한 전하']))<.001001);
 assert.equal(Number(m['전체 전하']),0);
 assert(Number(m['풍선 전하'])<=0);
 assert(Number(m['고양이 털 전하'])>=0);
}
assert(metrics(42,{stage:'wall',rubs:6,elapsed:0})['관찰 결과'].includes('끌림'));
assert(metrics(42,{stage:'discharge',elapsed:60})['관찰 결과'].includes('떨어짐'));
assert(Math.abs(n(42,{stage:'wall',elapsed:20,humidity:100},'풍선 전하'))<Math.abs(n(42,{stage:'wall',elapsed:20,humidity:0},'풍선 전하')));
assert.equal(n(78,{mode:'formation',atoms:1},'한 띠의 폭'),0);
assert(n(78,{mode:'formation',atoms:8,spacing:1},'한 띠의 폭')>n(78,{mode:'formation',atoms:8,spacing:5},'한 띠의 폭'));
assert.equal(n(78,{mode:'formation',atoms:12},'준위당 갈라진 상태 수'),12);
assert(n(78,{mode:'formation',atoms:12,spacing:2},'한 띠의 폭')>n(78,{mode:'formation',atoms:2,spacing:2},'한 띠의 폭'));
console.log('PASS: balloon rubbing, polarized-wall attraction, discharge/fall and charge accounting; isolated atomic levels, N-state splitting and spacing-dependent band broadening.');
