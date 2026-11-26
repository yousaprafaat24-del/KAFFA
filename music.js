const A={x:null,on:false,blocked:false,t:0,b:0,
P:[[[50,57,60,64],50],[[53,59,62,64],55],[[52,59,62,67],48],[[55,61,64,67],57]],
init(){if(this.x)return;const C=window.AudioContext||window.webkitAudioContext,x=this.x=new C({latencyHint:'playback'});x.onstatechange=()=>{this.blocked=this.on&&x.state!='running';this.ui();this.cb&&this.cb()};
 this.m=x.createGain();this.m.gain.value=0;const lp=x.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2000;
 const rv=x.createConvolver(),n=x.sampleRate*1.4|0,bf=x.createBuffer(1,n,x.sampleRate),d=bf.getChannelData(0),w=x.createGain();
 for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n)**3;rv.buffer=bf;w.gain.value=.45;
 this.m.connect(lp);this.m.connect(rv);rv.connect(w);w.connect(lp);lp.connect(x.destination);
 const nb=this.nb=x.createBuffer(1,x.sampleRate*.2|0,x.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1},
n(m,t,d,v){const x=this.x,o=x.createOscillator(),g=x.createGain();o.type='triangle';o.frequency.value=440*2**((m-69)/12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(this.m);o.start(t);o.stop(t+d+.05)},
tick(){const x=this.x;if(!this.on||!x)return;const B=.95;
 while(this.t<x.currentTime+2.5){const[ch,ba]=this.P[this.b>>2&3],be=this.b&3,t=this.t;
  if(be==0)ch.forEach((m,i)=>this.n(m,t+i*.035,3.4,.075));
  if(be==2&&Math.random()<.6)ch.slice(1).forEach((m,i)=>this.n(m,t+i*.03,2,.04));
  if(be%2==0)this.n(ba,t,1.7,.13);
  if(Math.random()<.45)this.n([72,74,76,79,81,84][Math.random()*6|0],t+(Math.random()<.5?0:B/2),2.4,.06);
  if(be%2==1){const s=x.createBufferSource(),f=x.createBiquadFilter(),g=x.createGain();s.buffer=this.nb;f.type='highpass';f.frequency.value=5000;g.gain.setValueAtTime(.03,t);g.gain.exponentialRampToValueAtTime(.001,t+.18);s.connect(f);f.connect(g);g.connect(this.m);s.start(t)}
  this.t+=B;this.b++}
 this.id=setTimeout(()=>this.tick(),500)},
async music(on){this.init();const x=this.x,g=this.m.gain;this.on=on;g.cancelScheduledValues(x.currentTime);g.setValueAtTime(g.value,x.currentTime);
 if(on){x.resume().catch(()=>{});await new Promise(r=>setTimeout(r,200));this.blocked=x.state!='running';this.t=x.currentTime+.1;clearTimeout(this.id);this.tick();g.linearRampToValueAtTime(.55,x.currentTime+3)}else{g.linearRampToValueAtTime(0,x.currentTime+.6);clearTimeout(this.id)}this.ui()},
fade(s){if(this.x&&this.m){const g=this.m.gain,t=this.x.currentTime;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(0,t+s)}},
async stop(){this.on=false;this.blocked=false;clearTimeout(this.id);const x=this.x;this.x=null;this.b=0;if(x)try{await x.close()}catch(e){}},
ui(){const m=$('#mu');if(!m)return;const p=this.on&&!this.blocked;m.setAttribute('aria-pressed',p);m.classList.toggle('on',p)}};
