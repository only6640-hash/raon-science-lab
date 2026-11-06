'use strict';
const assert=require('node:assert/strict');global.window={};require('./magnetic.js');const M=window.RAON_MODELS;
const ids=[2,3,4,5,6,7,20,27,29,30,33,34,36,48,49,50,61,65,67,68,70,75,81];
assert.deepEqual(Object.keys(M).map(Number).sort((a,b)=>a-b),ids);
function values(id,over={}){return {...Object.fromEntries(M[id].controls.map(c=>[c.key,c.value])),...over};}
function render(id,over={},t=0){return M[id].render(values(id,over),t);}
function num(id,label,over={},t=0){return Number(render(id,over,t).metrics.find(m=>m.label===label).value);}
let count=0;for(const id of ids){const m=M[id];assert(m.title&&m.description&&m.sources.length);for(const kind of ['value','min','max'])for(const t of [0,.25,1,10000]){const v=Object.fromEntries(m.controls.map(c=>[c.key,c[kind]]));const r=m.render(v,t);for(const key of ['svg','metrics','explanation','question','answer','note'])assert(r[key],`${id} missing ${key}`);assert(!/NaN|Infinity|undefined/.test(JSON.stringify(r)),`${id} nonfinite`);count++;}}
assert.equal(num(75,'자기장 크기',{I:5,r:8}),12.5);
assert.equal(num(75,'자기장 크기',{I:0}),0);
assert(!render(75,{I:0,earth:0}).svg.includes('<path'));
assert(render(75,{I:0,earth:25}).svg.includes('x1="435" y1="242" x2="435" y2="208"'));
assert.equal(render(75,{I:5}).metrics[1].value,'반시계 방향');
assert.equal(render(75,{I:-5}).metrics[1].value,'시계 방향');
assert.equal(num(5,'유도 전압',{v:0}),0);
assert.equal(num(5,'유도 전압',{x:0}),0);
assert.equal(num(7,'유도 기전력',{v:0}),0);
assert.equal(num(65,'순간 전압',{},0),0);
assert(num(65,'순간 전압',{},.25)>0);
assert.equal(num(50,'2차 전압',{Vp:120,Np:200,Ns:100}),60);
assert.equal(num(50,'부하 전력',{Vp:120,Np:200,Ns:100,R:60}),60);
assert.equal(num(50,'2차 전압',{dc:1}),0);
assert.equal(num(70,'실제 평형각',{I:0}),0);
assert.equal(num(68,'기울어진 각',{I:0}),0);
assert.equal(render(61,{magnet:0}).metrics[2].value,'분리되지 않음');
assert.equal(render(61,{magnet:1}).metrics[0].value,'롤러를 따라 이동 후 낙하');
assert.equal(num(36,'북쪽에서 편향각',{I:0}),0);
assert.equal(num(67,'회전력',{angle:270,commutator:0}),-96);
assert.equal(num(67,'회전력',{angle:270,commutator:1}),96);
console.log(`${ids.length} magnetic models; ${count} boundary/time render checks; physics assertions passed.`);
for(const id of ids){const m=M[id];for(const c of m.controls){let mid=(c.min+c.max)/2;const r=render(id,{[c.key]:mid},.5);assert(!/NaN|Infinity|undefined/.test(JSON.stringify(r)),`${id}.${c.key} midpoint invalid`);}}
assert(!M[20].controls.some(c=>c.key==='N'));
assert(!M[48].controls.some(c=>c.key==='commutator'));
assert.notEqual(render(29,{z:-60}).svg,render(29,{z:60}).svg);
for(const pole of [0,1])for(const velocity of [-.5,0,.5]){const r=render(7,{pole,v:velocity});const current=Number(r.metrics[2].value);assert.equal(Math.sign(current),velocity===0?0:Math.sign(velocity)*(pole?-1:1));assert(r.svg.includes(current>0?'전류: 반시계':current<0?'전류: 시계':'유도 전류 없음'));}
assert(Math.abs(num(7,'유도 전류',{strength:2})-2*num(7,'유도 전류',{strength:1}))<.011);
assert.equal(num(3,'자기력 크기',{I:0}),0);
for(const angle of [0,180])assert.equal(num(3,'자기력 크기',{angle}),0);
assert.equal(num(3,'화면 밖 방향 힘',{I:2,B:.4,L:20,angle:90}),-.16);
assert.equal(num(3,'화면 밖 방향 힘',{I:-2,B:.4,L:20,angle:90}),.16);
assert.equal(num(3,'화면 밖 방향 힘',{I:2,B:-.4,L:20,angle:90}),.16);
for(const I of [-2,0,2])for(const B of [-.4,0,.4]){let tau=num(49,'회전력',{I,B});assert.equal(Math.sign(tau),Math.sign(I*B)||0);assert.equal(num(49,'회전력',{I,B,contact:0}),0);}
assert.equal(num(49,'회전력',{I:2,B:.4,R:5}),.96);
assert(render(49).svg.includes('전지'));
assert.equal(num(33,'자화 M',{phase:0}),0);
for(const H of [-500,500]){assert.equal(num(33,'현재 외부장',{phase:2,H}),0);assert.equal(Math.sign(num(33,'자화 M',{phase:2,H})),Math.sign(H));assert(Math.abs(num(33,'자화 M',{phase:2,H}))<Math.abs(num(33,'자화 M',{phase:1,H})));}
assert(num(33,'자화 M',{phase:2,soft:1})>num(33,'자화 M',{phase:2,soft:0}));
assert.equal(num(81,'연결된 못',{chain:1,remove:0}),5);
assert.equal(num(81,'연결된 못',{chain:1,remove:3}),2);
assert.equal(num(81,'연결된 못',{chain:1,remove:1}),0);
assert.equal(num(81,'연결된 못',{chain:1,material:1}),0);
console.log('Wire-force signs, moving-magnet Lenz signs, battery-wire motor, remanence, end-roller separation and nail-chain assertions passed.');
// Geometry and sign regression checks: wire ABOVE compass; generator normal-angle projection.
let oer=render(36,{I:4,r:4});assert(oer.svg.includes('cx="400" cy="100" r="22"'));assert(oer.svg.includes('x1="400" y1="260" x2="440" y2="260"'));assert(num(36,'북쪽에서 편향각',{I:4})>0);assert(num(36,'북쪽에서 편향각',{I:-4})<0);
assert(render(36,{I:-4,r:4}).svg.includes('x1="400" y1="260" x2="360" y2="260"'));
for(const phase of [0,90,180,270]){let gen=render(65,{phase},0);const flux=Number(gen.metrics[2].value),emf=Number(gen.metrics[0].value);if(phase===0){assert.equal(flux,4);assert.equal(emf,0);assert(gen.svg.includes('M 400 140 L 400 140 L 400 305'));}if(phase===90){assert.equal(flux,0);assert(emf>0);assert(gen.svg.includes('M 290 140 L 510 140 L 510 305'));}if(phase===180){assert.equal(flux,-4);assert.equal(emf,0);}if(phase===270){assert.equal(flux,0);assert(emf<0);}}
console.log('Oersted vector geometry/polarity and generator 0/90/180/270-degree phase checks passed.');
// Induced dipoles must reverse with the external pole; both polarities still attract.
for(const flip of [0,1]){let r=render(81,{flip});let arrows=[...r.svg.matchAll(/<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)" stroke="#f26769"/g)];assert.equal(arrows.length,6);for(const a of arrows)assert(flip?Number(a[3])>Number(a[1]):Number(a[3])<Number(a[1]));assert.equal(r.metrics[1].value,'자석 쪽');}
// Parse rendered magnetopause and sample both cubic segments to ensure no Earth intersection.
for(const n of [1,5,20])for(const v of [200,400,1000]){let r=render(30,{n,v}),d=r.svg.match(/<path d="([^"]+)"/)[1],q=d.match(/-?\d+(?:\.\d+)?/g).map(Number);assert.equal(q.length,14);let P=n*1e6*1.6726e-27*(v*1e3)**2,R=10*(P/1.33808e-9)**(-1/6);assert(Math.abs(q[6]-(430-17*R))<1e-9);assert(q[6]<385);for(let seg=0;seg<2;seg++){let p=seg===0?q.slice(0,8):q.slice(6,14);for(let i=0;i<=100;i++){let t=i/100,u=1-t,x=u**3*p[0]+3*u*u*t*p[2]+3*u*t*t*p[4]+t**3*p[6],y=u**3*p[1]+3*u*u*t*p[3]+3*u*t*t*p[5]+t**3*p[7];assert(Math.hypot(x-430,y-225)>45,'magnetopause must remain outside Earth');}}}
console.log('Nail dipole polarity and magnetopause geometry checks passed.');
// Compass tangent must match the dipole field at its actual (isotropic-scale) drawn position.
for(const angle of [0,30,45,90,135,180,225,270,315])for(const distance of [1.5,2,3]){let r=render(2,{angle,distance}),cs=[...r.svg.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="24"/g)],c=cs[0],dx=Number(c[1])-400,dy=Number(c[2])-235,r2=dx*dx+dy*dy;assert(Math.abs(Math.sqrt(r2)-50*distance)<1e-9);let ar=[...r.svg.matchAll(/<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)" stroke="#f26769"/g)].at(-1),ax=Number(ar[3])-Number(ar[1]),ay=Number(ar[4])-Number(ar[2]),bx=3*dx*dx/r2-1,by=3*dx*dy/r2;assert(Math.abs(ax*by-ay*bx)<1e-8);assert(ax*bx+ay*by>0);}
console.log('Dipole compass drawn-position vector agreement passed.');

// Compass direction is tangent to the wire field when the Earth field is disabled.
for(const angle of [0,45,90,180,270])for(const I of [-4,4]){const r=render(75,{angle,I,earth:0}),a=angle*Math.PI/180,arr=[...r.svg.matchAll(/<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)" stroke="#f26769"/g)].at(-1),dx=+arr[3]-arr[1],dy=+arr[4]-arr[2];assert(dx*(-I*Math.sin(a))+dy*(-I*Math.cos(a))>0);assert(Math.abs(dx*Math.cos(a)-dy*Math.sin(a))<1e-8);}
console.log('Movable wire-compass tangent assertions passed.');
