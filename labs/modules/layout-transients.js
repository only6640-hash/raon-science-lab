/* Stateful switching experiments. Independent exact, piecewise-linear educational models.
   Time is slowed: 1 screen second = 10 ms of circuit time. SI units internally. */
(()=>{'use strict';
const M=window.RAON_MODELS, originals={},TAU=2*Math.PI;
const ink='#344f59',wire='#58717a',red='#d16460',blue='#398ebd',green='#439a80',gold='#c39847',paper='#f5f7f5';
const C=(key,label,min,max,step,value,unit='')=>({key,label,min,max,step,value,unit});
const S=(key,label,opts,value)=>({key,label,options:opts.map(([value,label])=>({value,label})),value});
const B=(key,label,value=0)=>S(key,label,[[0,'끄기'],[1,'켜기']],value);
const fmt=(n,d=2)=>Number(n).toFixed(d),clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),metric=(label,value,unit='')=>({label,value,unit});
const text=(x,y,s,size=17,color=ink,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="sans-serif" font-size="${size}" fill="${color}">${s}</text>`;
const line=(x,y,X,Y,col=wire,w=3)=>`<path d="M${x} ${y}L${X} ${Y}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
const path=(d,col=wire,w=3,fill='none')=>`<path d="${d}" fill="${fill}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const box=(x,y,w,h,fill=paper,stroke='#c5d1d4',r=8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const dot=(x,y,r=4,col=ink)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`;
const arrow=(x,y,X,Y,col=red,w=3)=>{let a=Math.atan2(Y-y,X-x),s=8;return line(x,y,X,Y,col,w)+path(`M${X-s*Math.cos(a-.5)} ${Y-s*Math.sin(a-.5)}L${X} ${Y}L${X-s*Math.cos(a+.5)} ${Y-s*Math.sin(a+.5)}`,col,w)};
const ground=(x,y)=>line(x,y,x,y+10)+line(x-17,y+10,x+17,y+10)+line(x-11,y+17,x+11,y+17)+line(x-5,y+24,x+5,y+24);
const resistor=(x,y,length=65,vertical=false,label='')=>`<g data-component="resistor" transform="translate(${x} ${y}) rotate(${vertical?90:0})">`+path(`M${-length/2} 0H-22L-18 -8L-10 8L-2 -8L6 8L14 -8L22 0H${length/2}`,ink,2.6)+'</g>'+ (label?text(x+(vertical?28:0),y+(vertical?4:-17),label,14):'');
const coil=(x,y,len=65,vertical=false,label='')=>`<g data-component="inductor" transform="translate(${x} ${y}) rotate(${vertical?90:0})">`+path(`M${-len/2} 0H${-len*.38} `+Array.from({length:5},()=>`q${len*.076} -17 ${len*.152} 0`).join(' ')+`H${len/2}`,gold,3)+'</g>'+(label?text(x+(vertical?26:0),y+(vertical?4:-22),label,14):'');
const cap=(x,y,vertical=true,charge=0,label='')=>`<g data-component="capacitor" transform="translate(${x} ${y}) rotate(${vertical?0:-90})">`+line(0,-32,0,-8)+line(-24,-8,24,-8,red,4)+line(-24,8,24,8,blue,4)+line(0,8,0,32)+(charge?Array.from({length:Math.min(5,Math.ceil(Math.abs(charge)*5))},(_,i)=>text(-20+i*10,-12,charge>0?'+':'−',10,red)+text(-20+i*10,22,charge>0?'−':'+',10,blue)).join(''):'')+'</g>'+(label?text(x+(vertical?38:0),y+(vertical?5:-32),label,14):'');
const cell=(x,y,vertical=true,plusTop=true,label='')=>`<g data-component="battery" data-orientation="${vertical?'vertical':'horizontal'}" transform="translate(${x} ${y}) rotate(${vertical?0:90})">`+box(-17,-39,34,78,'#d7e1e0',wire,5)+box(-17,plusTop?-39:16,34,23,'#d9b074',wire,3)+text(0,-16,plusTop?'+':'−',22)+text(0,29,plusTop?'−':'+',22)+line(0,-48,0,-39)+line(0,39,0,48)+'</g>'+(label?text(x+(vertical?36:0),y+(vertical?6:35),label,16):'');
const diode=(x,y,vertical=false,reverse=false,glow=0)=>`<g data-component="${glow>=0?'LED':'diode'}" transform="translate(${x} ${y}) rotate(${(vertical?90:0)+(reverse?180:0)})">`+(glow>0?dot(0,0,24,`rgba(237,173,64,${clamp(glow,0,1)*.65})`):'')+line(-30,0,-13,0)+path('M-13 -13L13 0L-13 13Z',ink,2,'#eadca5')+line(13,-15,13,15,ink,3)+line(13,0,30,0)+(glow>=0?arrow(-3,-17,10,-28,gold,2)+arrow(7,-14,20,-25,gold,2):'')+'</g>';
const lamp=(x,y,on=0,r=28)=>dot(x,y,r,on?`rgba(243,192,77,${.2+.6*clamp(on,0,1)})`:'#e5ebeb')+`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${wire}" stroke-width="3"/>`+path(`M${x-r*.5} ${y-r*.5}L${x+r*.5} ${y+r*.5}M${x-r*.5} ${y+r*.5}L${x+r*.5} ${y-r*.5}`,gold,2);
const button=(key,label,svg,set=null,extra='')=>`<g role="button" tabindex="0" data-node="${key}${set??''}" data-layout-key="${key}" ${set===null?'':`data-layout-set="${set}"`} aria-label="${label}" style="cursor:pointer;touch-action:none" ${extra}><title>${label}</title>${svg}</g>`;
const sw=(x,y,on,key,vertical=false,hold=false)=>button(key,hold?'누르는 동안 연결':'스위치 전환',`<g transform="translate(${x} ${y}) rotate(${vertical?90:0})">`+box(-34,-25,68,50,'#ffffff01','none')+dot(-23,0,4)+dot(23,0,4)+line(-23,0,23,on?0:-20,green,4)+'</g>',null,hold?'data-layout-hold="1"':'');
const plot=(x,y,w,h,fn,color=red,max=1)=>box(x,y,w,h,'#f8fbf9','#b7c8cb',2)+line(x,y+h*.5,x+w,y+h*.5,'#bdcbcd',1)+line(x,y,x,y+h,'#bdcbcd',1)+path(Array.from({length:151},(_,i)=>`${i?'L':'M'}${x+w*i/150} ${y+h*.5-h*.43*clamp(fn(i/150)/max,-1,1)}`).join(' '),color,2);
const trace=(x,y,w,h,fn,color=red,N=240)=>path(Array.from({length:N+1},(_,i)=>`${i?'L':'M'}${x+w*i/N} ${y-h*fn(i/N)}`).join(' '),color,2);
const panel=(key,svg)=>`<g data-layout-part="${key}">${svg}</g>`;
const bg=()=>box(0,0,800,450,paper,'none',0);
function controlsToDefault(controls,v){return Object.fromEntries(controls.map(c=>[c.key,v[c.key]??c.value]));}
function setInput(key,value){if(typeof document==='undefined')return;const el=document.querySelector(`#controls [data-key="${key}"]`);if(!el)return;el.value=String(value);el.dispatchEvent(new Event('input',{bubbles:true}));}
function install(id,controls,draw,opts={}){const old=M[id];originals[id]=old;let current={},drag=null,holding=null;const entry={...old,...opts,controls,layoutEvidence:opts.layoutEvidence||{status:'observed',source:old.sources[0]},render(values={},time=0){let v=controlsToDefault(controls,values);current=v;const t=Number.isFinite(time)?time:0;const base=old.render(v,t);const r=draw(v,t,base,old);return {...base,...r,svg:bg()+r.svg};},onScenePointer(event,svg,notify){let hit=event.target.closest?.('[data-layout-key]');const point=()=>{let b=svg.getBoundingClientRect();return{x:(event.clientX-b.left)*800/b.width,y:(event.clientY-b.top)*450/b.height}};if(event.type==='pointerdown'&&hit){event.preventDefault?.();const key=hit.dataset.layoutKey;if(hit.dataset.layoutDrag){drag={key,axis:hit.dataset.layoutDrag,min:+hit.dataset.dragMin,max:+hit.dataset.dragMax,start:+hit.dataset.dragStart,end:+hit.dataset.dragEnd};svg.setPointerCapture?.(event.pointerId);}else if(hit.dataset.layoutHold){holding=key;setInput(key,1);svg.setPointerCapture?.(event.pointerId);}else{const c=controls.find(c=>c.key===key);setInput(key,hit.dataset.layoutSet??(c?.options?c.options[(c.options.findIndex(o=>String(o.value)===String(current[key]))+1)%c.options.length].value:+current[key]?0:1));}}if(drag&&(event.type==='pointerdown'||event.type==='pointermove')){let p=point(),c=controls.find(c=>c.key===drag.key),val=drag.min+clamp((p[drag.axis]-drag.start)/(drag.end-drag.start),0,1)*(drag.max-drag.min);if(c?.step)val=Math.round(val/c.step)*c.step;setInput(drag.key,clamp(val,drag.min,drag.max));}if(['pointerup','pointercancel'].includes(event.type)){if(holding)setInput(holding,0);holding=null;drag=null;}},onSceneKeyDown(event){const hit=event.target.closest?.('[data-layout-key]');if(!hit)return;const key=hit.dataset.layoutKey,c=controls.find(c=>c.key===key);if([' ','Enter'].includes(event.key)){event.preventDefault();if(hit.dataset.layoutHold)setInput(key,+current[key]?0:1);else setInput(key,hit.dataset.layoutSet??(c?.options?c.options[(c.options.findIndex(o=>String(o.value)===String(current[key]))+1)%c.options.length].value:+current[key]?0:1));}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)&&!c.options){event.preventDefault();setInput(key,clamp(+current[key]+(['ArrowRight','ArrowDown'].includes(event.key)?1:-1)*c.step,c.min,c.max));}},...opts};M[id]=entry;return entry;}
const dragHit=(key,label,x,y,w,h,axis,min,max,start,end,art='')=>`<g data-layout-key="${key}" data-layout-drag="${axis}" data-drag-min="${min}" data-drag-max="${max}" data-drag-start="${start}" data-drag-end="${end}" data-node="${key}" role="slider" tabindex="0" aria-label="${label}" style="cursor:grab;touch-action:none">${box(x,y,w,h,'#ffffff01','none')}${art}</g>`;

const CLOCK_SCALE=.01;
const relax=(x,target,tau,dt)=>target+(x-target)*Math.exp(-dt/tau);
// Closed-form diode-region integration, including exact boundary crossing. No explicit-Euler instability.
function coilBranch(i,k,v,dt){
 const R=v.R,L=v.L*.001,rw=.05*R,rb=20*R,Vf=1.8;
 function region(i){
  const on=+v['s'+k],drive=on?1/R:0,source=k===0?3-Vf:3;
  let g=1/rb+drive,a=source*drive;
  const unloaded=(a-i)/g;
  const forward=on&&(k===1||k===3)&&unloaded>Vf;
  const reverse=(k===2||k===3)&&unloaded< -Vf;
  if(forward){g+=1/R;a+=Vf/R;}if(reverse){g+=1/R;a-=Vf/R;}
  return {g,a,voltage:(a-i)/g,forward,reverse,drive,source};
 }
 let remaining=dt;
 for(let step=0;step<6&&remaining>0;step++){
  const z=region(i),target=z.a/(1+rw*z.g),tau=L/(rw+1/z.g),next=relax(i,target,tau,remaining);
  // Boundaries in state coordinates computed before adding a conducting diode.
  const g0=1/rb+z.drive,a0=z.source*z.drive;
  const boundaries=[];
  if(+v['s'+k]&&(k===1||k===3))boundaries.push(a0-g0*Vf);
  if(k===2||k===3)boundaries.push(a0+g0*Vf);
  let duration=remaining;
  for(const boundary of boundaries){
   if((boundary-i)*(boundary-next)<0){const cross=-tau*Math.log((boundary-target)/(i-target));if(cross>1e-14&&cross<duration)duration=cross;}
  }
  i=relax(i,target,tau,duration);remaining-=duration;
  // Evaluate the side of the boundary reached by this trajectory without an impulsive state jump.
  if(remaining>0&&duration<1e-13)break;
  if(remaining>0){const tiny=Math.min(remaining,1e-12);const d=(target-i)/tau;i+=d*tiny;remaining-=tiny;}
 }
 const z=region(i),forward=k===0?(+v.s0?Math.max(0,(3-Vf-z.voltage)/R):0):z.forward?Math.max(0,(z.voltage-Vf)/R):0,reverse=z.reverse?Math.max(0,(-z.voltage-Vf)/R):0;
 return {i,voltage:z.voltage,forward,reverse};
}
function makeHistory(id){
 let state,last=null,previous=null,history=[];
 const reset=()=>{state={elapsed:0,i:[0,0,0,0],vc:[0,0,0]};last=null;previous=null;history=[];};reset();
 function advance(v,dt){
  state.elapsed+=dt;
  if(id===17)state.i=state.i.map((i,k)=>coilBranch(i,k,v,dt).i);
  if(id===39){const tau=v.R*v.C*1e-6;for(let k=0;k<3;k++){
   const held=+v['hold'+k];
   if(k===0){if(held)state.vc[k]=relax(state.vc[k],3,tau,dt);}
   else if(k===1){if(held&&+v.discharge)state.vc[k]=relax(state.vc[k],1.5,(v.R+50)*v.C*1e-6,dt);else if(held)state.vc[k]=relax(state.vc[k],3,(v.R+100)*v.C*1e-6,dt);else if(+v.discharge)state.vc[k]=relax(state.vc[k],0,(v.R+100)*v.C*1e-6,dt);}
   else state.vc[k]=relax(state.vc[k],held?1.5:0,held?tau/2:tau,dt);
  }}
  if(id===62){const supply=+v.switch?5:0;state.i[0]=relax(state.i[0],supply/v.R,v.L*.001/v.R,dt);state.vc[0]=relax(state.vc[0],supply,v.R*v.C*1e-6,dt);}
 }
 function sample(v){return {time:state.elapsed,il:state.i[0],ic:((+v.switch?5:0)-state.vc[0])/v.R};}
 return {reset,dispose(){last=null;previous=null;},update(v,t){
  if(last!==null&&t<last)reset();
  if(last!==null&&t>last&&previous&&+previous.run){const dt=Math.max(0,t-last)*CLOCK_SCALE*(previous.speed||1),steps=id===62?Math.min(120,Math.max(1,Math.ceil(dt/.0005))):1;for(let j=0;j<steps;j++){advance(previous,dt/steps);if(id===62)history.push(sample(previous));}}
  last=t;previous={...v};if(id===62){const s=sample(v),end=history.at(-1);if(!end||end.time!==s.time||end.ic!==s.ic||end.il!==s.il)history.push(s);history=history.filter(h=>h.time>=state.elapsed-.05).slice(-500);}
  return {...state,i:[...state.i],vc:[...state.vc]};
 },state:()=>({...state,i:[...state.i],vc:[...state.vc]}),history:()=>history.map(x=>({...x}))};
}
function historyPlot(x,y,w,h,history,key,elapsed,scale){
 const start=Math.max(0,elapsed-.05),points=history.filter(q=>q.time>=start);
 return box(x,y,w,h,'#f8fbf9','#b7c8cb',2)+line(x,y+h/2,x+w,y+h/2,'#bdcbcd',1)+line(x,y,x,y+h,'#bdcbcd',1)+(points.length?path(points.map((q,j)=>`${j?'L':'M'}${x+w*(q.time-start)/.05} ${y+h/2-h*.43*clamp(q[key]/scale,-1,1)}`).join(' '),red,2):'');
}
const live={17:makeHistory(17),39:makeHistory(39),62:makeHistory(62)};
// 17: four LED/inductor applications; lower switches and resistor remain spatially aligned.
install(17,[C('speed','관찰 속도',.1,3,.1,1),C('L','인덕턴스',10,1000,10,200,'mH'),C('R','저항',10,300,10,100,'Ω'),B('run','실행',1),...Array.from({length:4},(_,i)=>B('s'+i,`${i+1}번 회로 스위치`,1))],(v,t,r)=>{const state=live[17].update(v,t);let svg='',metrics=[metric('실행 상태',+v.run?'실행':'정지'),metric('회로 경과 시간',fmt(state.elapsed*1000,2),'ms')];for(let k=0;k<4;k++){let x=105+k*195,on=+v['s'+k],branch=coilBranch(state.i[k],k,v,0),forward=branch.forward*v.R/3,reverse=branch.reverse*v.R/3;let g=text(x,33,'+V',18,red)+line(x,43,x,75)+line(x,245,x,268)+sw(x,292,on,'s'+k,true)+line(x,315,x,335)+resistor(x,360,50,true)+line(x,385,x,389)+ground(x,389)+text(x,438,['직렬 L','LED ∥ L','L ∥ 역방향 LED','양방향 표시'][k],15);if(k===0)g+=diode(x,110,true,false,forward)+line(x,140,x,155)+coil(x,200,90,true)+line(x,75,x,80);else{let xs=k===3?[x-55,x,x+55]:[x-42,x+42];g+=line(xs[0],75,xs.at(-1),75)+line(xs[0],245,xs.at(-1),245);for(let j=0;j<xs.length;j++){let xx=xs[j],isCoil=k===1?j===1:k===2?j===0:j===1;g+=line(xx,75,xx,isCoil?120:130)+line(xx,isCoil?200:190,xx,245)+(isCoil?coil(xx,160,80,true):diode(xx,160,true,k===2||j===2,k===2||j===2?reverse:forward));}}svg+=panel(`LED-circuit-${k+1}`,g);metrics.push(metric(`${k+1}번 코일 전류`,fmt(state.i[k]*1000,3),'mA'),metric(`${k+1}번 정방향 LED`,fmt(forward*3/v.R*1000,3),'mA'));if(k>1)metrics.push(metric(`${k+1}번 역방향 LED`,fmt(reverse*3/v.R*1000,3),'mA'));}return {svg,metrics,question:'스위치를 열 때 반대 방향 LED가 켜지는 이유는?',answer:'코일이 기존 전류를 계속 흐르게 하면서 단자 전압이 반전되기 때문입니다.',explanation:'네 회로의 LED 방향과 코일의 위치를 나란히 비교합니다. 직렬 L의 지연, 닫을 때의 우회, 열 때의 역방향 점등을 비교할 수 있습니다.',note:'초기 코일 전류0. 스위치 전환에도 실제 전류를 이어서 계산합니다. 3V, LED 문턱1.8V·내부 저항R, 코일 권선 저항0.05R·병렬 손실 저항20R을 포함한 구간별 선형 모형입니다. 내부 손실은 기호에 생략되어 있으며 개방 시 무한 과전압 대신 유한 감쇠를 만듭니다. 밝기는 LED 전류에 비례합니다. 화면1초=회로10ms×관찰 속도. 실행을 끄면 상태가 유지됩니다.'};},{reset:live[17].reset,dispose:live[17].dispose,_transient:live[17]});
// 39: three simultaneous momentary capacitor applications.
install(39,[C('R','저항',10,300,10,100,'Ω'),C('C','전기 용량',10,1000,10,100,'μF'),B('run','실행',1),B('hold0','왼쪽 순간 스위치'),B('hold1','가운데 충전 스위치'),B('discharge','가운데 방전 스위치'),B('hold2','오른쪽 순간 스위치')],(v,t)=>{const state=live[39].update(v,t);let svg='',metrics=[metric('실행 상태',+v.run?'실행':'정지'),metric('회로 경과 시간',fmt(state.elapsed*1000,2),'ms')];for(let k=0;k<3;k++){let x=135+k*265,held=+v['hold'+k],q=state.vc[k]/3,bright=k<2?(held?1-q:0):q,discharge=0;if(k===1){const cv=state.vc[k],both=held&&+v.discharge,ic=both?(3-2*cv)/(2*v.R+100):held?(3-cv)/(v.R+100):+v.discharge?-cv/(v.R+100):0,A=cv+v.R*ic;bright=(held?(3-A)/100:0)*v.R/3;discharge=(+v.discharge?(held?A/100:-ic):0)*v.R/3;}let g=text(x,37,'+V',20,red)+line(x,48,x,75)+ground(x,374)+sw(x,344,held,'hold'+k,true,true)+line(x,367,x,374);if(k<2)g+=diode(x,105,true,false,bright)+line(x,135,x,150)+cap(x,182,true,q)+line(x,214,x,235)+resistor(x,268,66,true)+line(x,301,x,321);else g+=line(x-45,75,x+45,75)+line(x-45,75,x-45,105)+diode(x-45,135,true,false,bright)+line(x-45,165,x-45,200)+resistor(x-45,233,66,true)+line(x-45,266,x-45,310)+line(x+45,75,x+45,161)+cap(x+45,193,true,q)+line(x+45,225,x+45,310)+line(x-45,310,x+45,310)+line(x,310,x,321);if(k===1)g+=line(x,145,x+85,145)+line(x+85,145,x+85,180)+diode(x+85,210,true,false,discharge)+line(x+85,240,x+85,265)+sw(x+85,290,+v.discharge,'discharge',true,true)+line(x+85,313,x+85,320)+line(x,320,x+85,320)+text(x+85,257,'100 Ω 포함',10);if(k===1)g+=text(x-49,112,'100 Ω 포함',10);g+=text(x,425,['순간 점등 · 전하 보관','충전 / LED 방전','천천히 켜지고 꺼짐'][k],17);svg+=panel('capacitor-application-'+(k+1),g);metrics.push(metric(`${k+1}번 축전기 전압`,fmt(3*q),'V'),metric(`${k+1}번 LED 상대 밝기`,fmt(k===1?Math.max(bright,discharge):bright)),metric(`${k+1}번 LED 전류`,fmt(bright*3/v.R*1000,3),'mA'));if(k===1)metrics.push(metric('가운데 방전 LED 전류',fmt(discharge*3/v.R*1000,3),'mA'));}return {svg,metrics,explanation:'각 회로의 아래 스위치는 누르는 동안 연결됩니다. 가운데 오른쪽 스위치는 저장 전하를 LED 쪽으로 방전시키는 경로입니다. 세 가지 배치를 동시에 비교합니다.',question:'아래 스위치를 놓아도 축전기에 전하가 남을 수 있나요?',answer:'방전 경로가 끊기면 남을 수 있습니다. 가운데 회로의 옆 스위치를 닫으면 LED를 통해 방전됩니다.',note:'초기 전압0, 실제 저장 전하를 유지하는3V RC 모형. 왼쪽은 스위치를 놓으면 전하를 보관합니다. LED는 문턱0V의 정류 소자로 근사합니다. 가운데 두 LED 가지는 각각100Ω 제한 저항을 포함합니다. 두 스위치를 함께 누르면 유한한 두 LED 전류가 흐르며 축전기는1.5V로 수렴합니다. 충전 또는 방전τ=(R+100Ω)C, 동시 연결τ=(R+50Ω)C입니다. 오른쪽에는 생략된 전원·접점 내부저항R을 포함합니다. 부하R과 분압되어 최종1.5V, 충전τ=RC/2, 방전τ=RC입니다. 화면1초=회로10ms. 누르는 동안 연결, 키보드 Enter는 토글합니다.'};},{reset:live[39].reset,dispose:live[39].dispose,_transient:live[39]});
// 62: two corresponding loops with synchronized switch and separate current graphs above.
install(62,M[62].controls.filter(c=>c.key!=='elapsed'),(v,t,r)=>{const state=live[62].update(v,t),on=+v.switch,il=state.i[0],vc=state.vc[0],ic=((on?5:0)-vc)/v.R,history=live[62].history();let svg='';for(let k=0;k<2;k++){let x=45+k*400,y=225;const current=k?ic:il,fn=s=>{const at=Math.max(0,state.elapsed-.05)+s*.05;let h=history[0]||{il:0,ic:0};for(const q of history){if(q.time>at)break;h=q;}return at>state.elapsed?0:(k?h.ic:h.il)/(5/v.R)};let g=text(x+145,30,k?'커패시터 C':'인덕터 L',21)+historyPlot(x+10,55,305,110,history,k?'ic':'il',state.elapsed,5/v.R)+text(x+160,185,`전류 기록 · ${fmt(Math.max(0,state.elapsed*1000-50),1)} → ${fmt(Math.max(50,state.elapsed*1000),1)} ms`,15)+line(x+20,y,x+(k?78:60),y)+(k?cap(x+110,y,false,vc/5):coil(x+110,y,100))+line(x+(k?142:160),y,x+230,y)+dot(x+230,y,23,'#e5eceb')+`<circle cx="${x+230}" cy="${y}" r="23" fill="none" stroke="${wire}" stroke-width="2"/>`+text(x+230,y+6,'A',20)+line(x+253,y,x+290,y)+line(x+290,y,x+290,y+25)+resistor(x+290,y+65,80,true)+line(x+290,y+105,x+290,y+135)+line(x+290,y+135,x+210,y+135)+line(x+20,y,x+20,y+135)+line(x+20,y+135,x+65,y+135)+cell(x+110,y+135,false,false)+line(x+158,y+135,x+180,y+135)+button('switch','공통 스위치 전환',line(x+210,y+135,x+180,on?y+135:y+85)+dot(x+180,y+135,4)+dot(x+180,y+85,4)+box(x+165,y+65,65,95,'#ffffff01','none'))+line(x+20,y+85,x+180,y+85)+text(x+155,427,`${fmt(current*1000,2)} mA`,18,red);if(Math.abs(current)>1e-8)g+=arrow(x+(current>0?164:201),y-18,x+(current>0?201:164),y-18,red,2);svg+=panel(k?'RC-right':'RL-left',g);}return {...r,svg,metrics:[metric('실행 상태',+v.run?'실행':'정지'),metric('회로 경과 시간',fmt(state.elapsed*1000,2),'ms'),metric('C 전압',fmt(vc,3),'V'),metric('L 전류',fmt(il*1000,3),'mA'),metric('C 전류',fmt(ic*1000,3),'mA'),metric('C 에너지',fmt(.5*v.C*vc*vc),'μJ'),metric('L 에너지',fmt(.5*v.L*il*il*1000),'μJ')],explanation:'동시에 전원을 연결하면 코일 전류는 점차 증가하고 축전기 전류는 처음 크다가 줄어듭니다. 각 그래프가 바로 아래 회로의 전류를 나타냅니다.',note:'5V 이상적 RL/RC, 초기 저장 에너지0. 공통 스위치는 전원과 방전 귀환선을 선택합니다. 축전기 전압과 코일 전류를 전환 시점부터 이어서 계산하며 그래프는 실제 지나간 전류 기록입니다. 그래프 세로 기준±5/R A, 가로 최근50ms. 화면1초=회로10ms. 실행 해제는 현재 전압·전류·기록을 유지하며 다시 실행하면 이어집니다. 부품 값 변경 시 저장 상태는 연속이고 에너지 차이는 부품 조절의 일로 간주합니다.'};},{reset:live[62].reset,dispose:live[62].dispose,_transient:live[62]});
window.RAON_TRANSIENTS={ids:[17,39,62],coilBranch,clockScale:CLOCK_SCALE};
})();
