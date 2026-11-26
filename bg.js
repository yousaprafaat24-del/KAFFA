window.startBg=sig=>{let alive=1;const cv=$('#bg'),c=cv.getContext('2d'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches,LITE=innerWidth<760||(navigator.hardwareConcurrency||8)<=4,rnd=Math.random;
const mk=(w,h,f)=>{const s=document.createElement('canvas');s.width=w;s.height=h;f(s.getContext('2d'));return s};
const bean=mk(200,200,x=>{x.translate(100,100);x.rotate(.5);const g=x.createRadialGradient(-14,-22,6,0,0,76);g.addColorStop(0,'#3f5a45');g.addColorStop(.6,'#2a4434');g.addColorStop(1,'#12281f');x.fillStyle=g;x.beginPath();x.ellipse(0,0,50,72,0,0,7);x.fill();x.lineCap='round';x.strokeStyle='#0b1a14';x.lineWidth=7;x.beginPath();x.moveTo(0,-62);x.bezierCurveTo(26,-26,-26,20,0,62);x.stroke();x.strokeStyle='rgba(212,189,122,.2)';x.lineWidth=2;x.beginPath();x.ellipse(0,0,47,69,0,-2.6,-1.3);x.stroke()});
const soft=r=>mk(200,200,x=>{x.globalAlpha=.13;for(let i=0;i<9;i++){const a=i*2.4,d=r*(i%3)/2;x.drawImage(bean,Math.cos(a)*d,Math.sin(a)*d)}});
const mid=soft(5),far=soft(14),puff=mk(64,64,x=>{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(242,234,213,.06)');g.addColorStop(1,'rgba(242,234,213,0)');x.fillStyle=g;x.fillRect(0,0,64,64)});
let W,H,D,B=[],P=[],R=[],px=-9e3,py=-9e3,prog=0,lv=0,sv=0,ps=scrollY,T=0,lastR=-9,t0=performance.now(),last=t0;
function size(){D=Math.min(devicePixelRatio||1,LITE?1:1.75);W=cv.width=innerWidth*D;H=cv.height=innerHeight*D;lv=H*.1;B=[...Array(LITE?12:28)].map(()=>{const z=rnd();return{x:rnd()*W,y:rnd()*H,z,a:rnd()*6,va:(rnd()-.5)*.5,vx:0,vy:0,s:(z>.85?150:z<.25?44:44+z*60)*D*(.8+rnd()*.4),sp:z<.25||z>.85?far:z<.5?mid:bean,al:z<.25?.5:z>.85?.3:.7}}).sort((a,b)=>a.z-b.z)}
function bn(near,dt){for(const b of B){if((b.z>.85)!==near)continue;const dx=b.x-px,dy=b.y-py,d=Math.hypot(dx,dy),rr=170*D;if(d<rr&&d>1){const f=(1-d/rr)*900*D*dt;b.vx+=dx/d*f;b.vy+=dy/d*f}
 b.x+=(b.vx+Math.sin(T*.5+b.a)*8*D)*dt;b.y+=(b.vy-(8+b.z*22)*D)*dt-sv*D*(.3+b.z*.7);b.vx*=.96;b.vy*=.96;b.a+=b.va*dt;const m=b.s;
 if(b.y<-m){b.y=H+m;b.x=rnd()*W}else if(b.y>H+m*2)b.y=-m;if(b.x<-m)b.x=W+m;if(b.x>W+m)b.x=-m;
 c.globalAlpha=b.al;c.save();c.translate(b.x,b.y);c.rotate(b.a);c.drawImage(b.sp,-b.s/2,-b.s/2,b.s,b.s);c.restore()}c.globalAlpha=1}
function draw(now){const dt=Math.min((now-last)/1000,.05);last=now;T+=dt;const mx=document.body.scrollHeight-innerHeight;prog=mx>0?scrollY/mx:0;sv+=((scrollY-ps)-sv)*.2;ps=scrollY;
 const HM=document.documentElement.dataset.pg=='home';lv+=((HM?H*(.1+prog*.5):-H*.2)-lv)*(RM?1:.05);const y0=H-lv,hero=HM?Math.max(0,1-prog*8):0,sx=W/2;c.clearRect(0,0,W,H);
 let g=c.createRadialGradient(W*.8,0,0,W*.8,0,H*.9);g.addColorStop(0,'rgba(173,147,69,.16)');g.addColorStop(1,'rgba(173,147,69,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
 bn(false,dt);
 if(!RM&&hero>0&&P.length<(LITE?16:34)&&rnd()<.35)P.push({x:sx+(rnd()-.5)*60*D,y:y0,r:(40+rnd()*50)*D,l:0,p:rnd()*6});
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.l+=dt/6;p.y-=(50+p.r*.3)*dt;p.x+=Math.sin(T*.9+p.p)*18*D*dt;if(p.l>1){P.splice(i,1);continue}c.globalAlpha=Math.sin(p.l*3.14)*hero;const s=p.r*(1+p.l*2);c.drawImage(puff,p.x-s,p.y-s,s*2,s*2)}c.globalAlpha=1;
 const gr=RM?1:Math.min(1,Math.max(0,(now-t0-500)/1700)),sa=hero>0?Math.max(0,1-prog*7):0;
 if(sa>0&&gr>0){const len=y0*(1-Math.pow(1-gr,3));c.globalAlpha=sa;c.lineCap='round';c.lineWidth=7*D;c.strokeStyle='#3a3822';c.beginPath();for(let y=0;y<=len;y+=20*D){const x=sx+Math.sin(y/D*.012+T*3)*3*D*(y/y0);y?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.lineWidth=2*D;c.strokeStyle='rgba(212,189,122,.22)';c.stroke();c.globalAlpha=1;if(!RM&&gr>=1&&T-lastR>1.6){R.push({x:sx,t:0});lastR=T}}
 c.beginPath();c.moveTo(0,H);const st=24*D;for(let x=0;x<=W+st;x+=st){let y=y0+Math.sin(x/D*.012+T*1.1)*5*D+Math.sin(x/D*.027-T*.7)*3*D;for(const r of R){const d=Math.abs(x-r.x)/D;y+=14*D*Math.exp(-r.t*.9-d/260)*Math.sin(d*.05-r.t*5)}c.lineTo(x,y)}c.lineTo(W+st,H);c.closePath();
 g=c.createLinearGradient(0,y0,0,H);g.addColorStop(0,'rgba(24,40,28,.8)');g.addColorStop(1,'rgba(8,20,15,.92)');c.fillStyle=g;c.fill();c.strokeStyle='rgba(212,189,122,.28)';c.lineWidth=2*D;c.stroke();
 R=R.filter(r=>(r.t+=dt)<4);bn(true,dt)}
size();addEventListener('resize',()=>{clearTimeout(size.t);size.t=setTimeout(size,200)},{signal:sig});
addEventListener('pointermove',e=>{px=e.clientX*D;py=e.clientY*D},{passive:true,signal:sig});addEventListener('pointerleave',()=>px=-9e3,{signal:sig});
window.K={rip:x=>R.push({x:x*D,t:0}),burst:()=>B.forEach(b=>{b.vy-=(80+rnd()*200)*D*(.4+b.z);b.vx+=(rnd()-.5)*160*D})};
if(RM){draw(t0+16);addEventListener('scroll',()=>requestAnimationFrame(draw),{passive:true,signal:sig})}else{let lt=0;const loop=n=>{if(!alive)return;if(!LITE||n-lt>30){lt=n;draw(n)}requestAnimationFrame(loop)};requestAnimationFrame(loop)}return()=>{alive=0}};