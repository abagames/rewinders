var ir=Object.defineProperty;var rr=(t,e,n)=>e in t?ir(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var N=(t,e,n)=>(rr(t,typeof e!="symbol"?e+"":e,n),n);const lr=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}};lr();function Dt(t,e=0,n=1){return Math.max(e,Math.min(t,n))}function en(t,e,n){const r=n-e,l=t-e;if(l>=0)return l%r+e;{let o=r+l%r+e;return o>=n&&(o-=r),o}}function At(t,e,n){return e<=t&&t<n}function j(t){return[...Array(t).keys()]}function or(t,e){let n=[];for(let r=0,l=0;r<t.length;l++)e(t[r],l)?(n.push(t[r]),t.splice(r,1)):r++;return n}function oi(t){return[...t].reduce((e,[n,r])=>(e[n]=r,e),{})}function ai(t){return Object.keys(t).map(e=>[e,t[e]])}function qe(t){return t.x!=null&&t.y!=null}class k{constructor(e,n){N(this,"x",0);N(this,"y",0);this.set(e,n)}set(e=0,n=0){return qe(e)?(this.x=e.x,this.y=e.y,this):(this.x=e,this.y=n,this)}add(e,n){return qe(e)?(this.x+=e.x,this.y+=e.y,this):(this.x+=e,this.y+=n,this)}sub(e,n){return qe(e)?(this.x-=e.x,this.y-=e.y,this):(this.x-=e,this.y-=n,this)}mul(e){return this.x*=e,this.y*=e,this}div(e){return this.x/=e,this.y/=e,this}clamp(e,n,r,l){return this.x=Dt(this.x,e,n),this.y=Dt(this.y,r,l),this}wrap(e,n,r,l){return this.x=en(this.x,e,n),this.y=en(this.y,r,l),this}addWithAngle(e,n){return this.x+=Math.cos(e)*n,this.y+=Math.sin(e)*n,this}swapXy(){const e=this.x;return this.x=this.y,this.y=e,this}normalize(){return this.div(this.length),this}rotate(e){if(e===0)return this;const n=this.x;return this.x=n*Math.cos(e)-this.y*Math.sin(e),this.y=n*Math.sin(e)+this.y*Math.cos(e),this}angleTo(e,n){return qe(e)?Math.atan2(e.y-this.y,e.x-this.x):Math.atan2(n-this.y,e-this.x)}distanceTo(e,n){let r,l;return qe(e)?(r=e.x-this.x,l=e.y-this.y):(r=e-this.x,l=n-this.y),Math.sqrt(r*r+l*l)}isInRect(e,n,r,l){return At(this.x,e,e+r)&&At(this.y,n,n+l)}equals(e){return this.x===e.x&&this.y===e.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const si=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],ar="twrgybpclRGYBPCL";let Qe;const sr=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function ur(t){const[e,n,r]=Jt(0,t);if(Qe=oi(si.map((l,o)=>{if(o<1)return[l,{r:0,g:0,b:0,a:0}];if(o<9){const[h,y,S]=Jt(o-1,t);return[l,{r:h,g:y,b:S,a:1}]}const[s,f,g]=Jt(o-9+1,t);return[l,{r:Math.floor(t?s*.5:e-(e-s)*.5),g:Math.floor(t?f*.5:r-(r-f)*.5),b:Math.floor(t?g*.5:n-(n-g)*.5),a:1}]})),t){const l=Qe.blue;Qe.white={r:Math.floor(l.r*.15),g:Math.floor(l.g*.15),b:Math.floor(l.b*.15),a:1}}}function Jt(t,e){e&&(t===0?t=7:t===7&&(t=0));const n=sr[t];return[(n&16711680)>>16,(n&65280)>>8,n&255]}function rt(t,e=1){const n=Qe[t];return Math.floor(n.r*e)<<16|Math.floor(n.g*e)<<8|Math.floor(n.b*e)}function lt(t,e=1){const n=Qe[t],r=Math.floor(n.r*e),l=Math.floor(n.g*e),o=Math.floor(n.b*e);return n.a<1?`rgba(${r},${l},${o},${n.a})`:`rgb(${r},${l},${o})`}const cr=`
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float width;
uniform float height;

float gridValue(vec2 uv, float res) {
  vec2 grid = fract(uv * res);
  return (step(res, grid.x) * step(res, grid.y));
}

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);  
  vec2 grid_uv = vTextureCoord.xy * vec2(width, height);
  float v = gridValue(grid_uv, 0.2);
  gl_FragColor.rgba = color * v;
}
`;function fr(t,e){return new PIXI.Filter(void 0,cr,{width:t,height:e})}const Se=new k;let E,le,F,_=new k;const On=5;document.createElement("img");let D,Ye,Ze=1,tn="black",Y,ui,be=!1,M,ci;function dr(t,e,n,r,l,o,s){Se.set(t),M=s,tn=n;const f=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${e};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${e};
color: #888;
`,g=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,h=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=f,_.set(Se),M.isUsingPixi){_.mul(On);const S=new PIXI.Application({width:_.x,height:_.y});if(E=S.view,F=new PIXI.Graphics,F.scale.x=F.scale.y=On,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,S.stage.addChild(F),F.filters=[],M.name==="crt"&&F.filters.push(ci=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),M.name==="pixel"&&F.filters.push(fr(_.x,_.y)),M.name==="pixel"||M.name==="shapeDark"){const C=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:M.name==="pixel"?1.5:1,brightness:M.name==="pixel"?1.5:1,blur:8});F.filters.push(C)}F.lineStyle(0),E.style.cssText=g}else E=document.createElement("canvas"),E.width=_.x,E.height=_.y,le=E.getContext("2d"),le.imageSmoothingEnabled=!1,E.style.cssText=g+h;document.body.appendChild(E);const y=()=>{const C=innerWidth/innerHeight,b=_.x/_.y,K=C<b,A=K?.95*innerWidth:.95*innerHeight*b,O=K?.95*innerWidth/b:.95*innerHeight;E.style.width=`${A}px`,E.style.height=`${O}px`};if(window.addEventListener("resize",y),y(),r){D=document.createElement("canvas");let S;l?(D.width=_.x,D.height=_.y,S=o):(_.x<=_.y*2?(D.width=_.y*2,D.height=_.y):(D.width=_.x,D.height=_.x/2),D.width>400&&(Ze=400/D.width,D.width=400,D.height*=Ze),S=Math.round(400/D.width)),Ye=D.getContext("2d"),Ye.fillStyle=e,gcc.setOptions({scale:S,capturingFps:60,isSmoothingEnabled:!1})}}function Et(){if(M.isUsingPixi){F.clear(),be=!1,ot(rt(tn,M.isDarkColor?.15:1)),F.drawRect(0,0,Se.x,Se.y),ht(),be=!1;return}le.fillStyle=lt(tn,M.isDarkColor?.15:1),le.fillRect(0,0,Se.x,Se.y),le.fillStyle=lt(Y)}function Ge(t){if(t===Y){M.isUsingPixi&&!be&&ot(rt(Y));return}if(Y=t,M.isUsingPixi){be&&F.endFill(),ot(rt(Y));return}le.fillStyle=lt(t)}function ot(t){ht(),F.beginFill(t),be=!0}function ht(){be&&(F.endFill(),be=!1)}function Pn(){ui=Y}function Fn(){Ge(ui)}function $e(t,e,n,r){if(M.isUsingPixi){M.name==="shape"||M.name==="shapeDark"?F.drawRoundedRect(t,e,n,r,2):F.drawRect(t,e,n,r);return}le.fillRect(t,e,n,r)}function hr(t,e,n,r,l){const o=rt(Y);ot(o),F.drawCircle(t,e,l*.5),F.drawCircle(n,r,l*.5),ht(),F.lineStyle(l,o),F.moveTo(t,e),F.lineTo(n,r),F.lineStyle(0)}function pr(){ci.time+=.2}function gr(){if(Ye.fillRect(0,0,D.width,D.height),Ze===1)Ye.drawImage(E,(D.width-E.width)/2,(D.height-E.height)/2);else{const t=E.width*Ze,e=E.height*Ze;Ye.drawImage(E,(D.width-t)/2,(D.height-e)/2,t,e)}gcc.capture(D)}const qn=[`
l
l
l

l
`,`
l l
l l



`,`
 l l
lllll
 l l
lllll
 l l
`,`
 lll
l l
 lll
  l l
 lll
`,`
l   l
l  l
  l
 l  l
l   l
`,`
 l
l l
 ll l
l  l
 ll l
`,`
l
l



`,`
 l
l
l
l
 l
`,`
l
 l
 l
 l
l
`,`
  l
l l l
 lll
l l l
  l
`,`
  l
  l
lllll
  l
  l
`,`



 l
l
`,`


lllll


`,`




l
`,`
    l
   l
  l
 l
l
`,`
 lll
l  ll
l l l
ll  l
 lll
`,`
 ll
l l
  l
  l
lllll
`,`
 lll
l   l
  ll
 l
lllll
`,`
 lll
l   l
  ll
l   l
 lll
`,`
  ll
 l l
l  l
lllll
   l
`,`
lllll
l
llll
    l
llll
`,`
 lll
l
llll
l   l
 lll
`,`
lllll
l   l
   l
  l
 l
`,`
 lll
l   l
 lll
l   l
 lll
`,`
 lll
l   l
 llll
    l
 lll
`,`

l

l

`,`

 l

 l
l
`,`
   ll
 ll
l
 ll
   ll
`,`

lllll

lllll

`,`
ll
  ll
    l
  ll
ll
`,`
 lll
l   l
  ll

  l
`,`
 lll
l   l
l lll
l
 lll
`,`
 lll
l   l
lllll
l   l
l   l
`,`
llll
l   l
llll
l   l
llll
`,`
 lll
l   l
l
l   l
 lll
`,`
llll
l   l
l   l
l   l
llll
`,`
lllll
l
llll
l
lllll
`,`
lllll
l
llll
l
l
`,`
 lll
l
l  ll
l   l
 lll
`,`
l   l
l   l
lllll
l   l
l   l
`,`
lllll
  l
  l
  l
lllll
`,`
  lll
   l
   l
l  l
 ll
`,`
l   l
l  l
lll
l  l
l   l
`,`
l
l
l
l
lllll
`,`
l   l
ll ll
l l l
l   l
l   l
`,`
l   l
ll  l
l l l
l  ll
l   l
`,`
 lll
l   l
l   l
l   l
 lll
`,`
llll
l   l
llll
l
l
`,`
 lll
l   l
l   l
l  ll
 llll
`,`
llll
l   l
llll
l   l
l   l
`,`
 llll
l
 lll
    l
llll
`,`
lllll
  l
  l
  l
  l
`,`
l   l
l   l
l   l
l   l
 lll
`,`
l   l
l   l
l   l
 l l
  l
`,`
l   l
l l l
l l l
l l l
 l l
`,`
l   l
 l l
  l
 l l
l   l
`,`
l   l
 l l
  l
  l
  l
`,`
lllll
   l
  l
 l
lllll
`,`
  ll
  l
  l
  l
  ll
`,`
l
 l
  l
   l
    l
`,`
 ll
  l
  l
  l
 ll
`,`
  l
 l l



`,`




lllll
`,`
 l
  l



`,`

 lll
l  l
l  l
 lll
`,`
l
l
lll
l  l
lll
`,`

 lll
l  
l
 lll
`,`
   l
   l
 lll
l  l
 lll
`,`

 ll
l ll
ll
 ll
`,`
  l
 l 
lll
 l
 l
`,`
 ll
l  l
 lll
   l
 ll
`,`
l
l
ll
l l
l l
`,`

l

l
l
`,`
 l

 l
 l
l
`,`
l
l
l l
ll
l l
`,`
ll
 l
 l
 l
lll
`,`

llll
l l l
l l l
l   l
`,`

lll
l  l
l  l
l  l
`,`

 ll
l  l
l  l
 ll
`,`

lll
l  l
lll
l
`,`

 lll
l  l
 lll
   l
`,`

l ll
ll
l
l
`,`

 lll
ll
  ll
lll
`,`

 l
lll
 l
  l
`,`

l  l
l  l
l  l
 lll
`,`

l  l
l  l
 ll
 ll
`,`

l   l
l l l
l l l
 l l
`,`

l  l
 ll
 ll
l  l
`,`

l  l
 ll
 l
l
`,`

llll
  l
 l
llll
`,`
 ll
 l
l
 l
 ll
`,`
l
l
l
l
l
`,`
ll
 l
  l
 l
ll
`,`

 l
l l l
   l

`];let Re,It;function mr(){Re=[],It=[]}function yr(){Re=Re.concat(It),It=[]}function fi(t){let e={isColliding:{rect:{},text:{},char:{}}};return Re.forEach(n=>{vr(t,n)&&(e={...e,...di(n.collision.isColliding.rect),isColliding:{rect:{...e.isColliding.rect,...n.collision.isColliding.rect},text:{...e.isColliding.text,...n.collision.isColliding.text},char:{...e.isColliding.char,...n.collision.isColliding.char}}})}),e}function vr(t,e){const n=e.pos.x-t.pos.x,r=e.pos.y-t.pos.y;return-e.size.x<n&&n<t.size.x&&-e.size.y<r&&r<t.size.y}function di(t){if(t==null)return{};const e={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let n={};return ai(t).forEach(([r,l])=>{const o=e[r];l&&o!=null&&(n[o]=!0)}),n}const Je=6,We=1,w=Je*We;let hi,kn,nn,rn=!1,fe,we,je,wt;const et={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function Sr(){fe=document.createElement("canvas"),fe.width=fe.height=w,we=fe.getContext("2d"),je=document.createElement("canvas"),wt=je.getContext("2d"),hi=qn.map((t,e)=>({...ln(t),hitBox:Rt(String.fromCharCode(33+e),!1)})),kn=qn.map((t,e)=>({...ln(t),hitBox:Rt(String.fromCharCode(33+e),!0)})),nn={}}function xr(t,e){const n=e.charCodeAt(0)-33;t.forEach((r,l)=>{kn[n+l]={...ln(r),hitBox:Rt(String.fromCharCode(33+n+l),!0)}})}function wr(){rn=!0}function br(t,e,n,r={}){const l=gi(r);e-=w/2*l.scale.x,n-=w/2*l.scale.y;const o=Math.floor(e);let s=t,f=o,g=Math.floor(n),h={isColliding:{rect:{},text:{},char:{}}};for(let y=0;y<s.length;y++){const S=s[y];if(S===`
`){f=o,g+=w*l.scale.y;continue}const C=pi(S,f,g,l);l.isCheckingCollision&&(h={isColliding:{rect:{...h.isColliding.rect,...C.isColliding.rect},text:{...h.isColliding.text,...C.isColliding.text},char:{...h.isColliding.char,...C.isColliding.char}}}),f+=w*l.scale.x}return h}function pi(t,e,n,r){const l=t.charCodeAt(0);if(l<32||l>126)return{isColliding:{rect:{},text:{},char:{}}};const o=gi(r);if(o.backgroundColor!=="transparent"&&(Pn(),Ge(o.backgroundColor),$e(e,n,w*o.scale.x,w*o.scale.y),Fn()),l<=32)return{isColliding:{rect:{},text:{},char:{}}};const s=l-33,f=o.isCharacter?kn[s]:hi[s],g=en(o.rotation,0,4);if(o.color==="black"&&g===0&&o.mirror.x===1&&o.mirror.y===1&&(!M.isUsingPixi||o.scale.x===1&&o.scale.y===1))return Wt(f,e,n,o.scale,o.isCheckingCollision,!0);const h=JSON.stringify({c:t,options:o}),y=nn[h];if(y!=null)return Wt(y,e,n,o.scale,o.isCheckingCollision,o.color!=="transparent");let S=!1;M.isUsingPixi&&(o.scale.x!==1||o.scale.y!==1)&&(je.width=w*o.scale.x,je.height=w*o.scale.y,wt.imageSmoothingEnabled=!1,wt.scale(o.scale.x,o.scale.y),Vn(wt,g,o,f),S=!0),we.clearRect(0,0,w,w),Vn(we,g,o,f);const C=Rt(t,o.isCharacter);let b;if(rn||M.isUsingPixi){const K=document.createElement("img");if(K.src=fe.toDataURL(),M.isUsingPixi){const A=document.createElement("img");A.src=(S?je:fe).toDataURL(),b=PIXI.Texture.from(A)}rn&&(nn[h]={image:K,texture:b,hitBox:C})}return Wt({image:fe,texture:b,hitBox:C},e,n,o.scale,o.isCheckingCollision,o.color!=="transparent")}function Vn(t,e,n,r){e===0&&n.mirror.x===1&&n.mirror.y===1?t.drawImage(r.image,0,0):(t.save(),t.translate(w/2,w/2),t.rotate(Math.PI/2*e),(n.mirror.x===-1||n.mirror.y===-1)&&t.scale(n.mirror.x,n.mirror.y),t.drawImage(r.image,-w/2,-w/2),t.restore()),n.color!=="black"&&(t.globalCompositeOperation="source-in",t.fillStyle=lt(n.color==="transparent"?"black":n.color),t.fillRect(0,0,w,w),t.globalCompositeOperation="source-over")}function Wt(t,e,n,r,l,o){if(o&&(r.x===1&&r.y===1?Un(t,e,n):Un(t,e,n,w*r.x,w*r.y)),!l)return;const s={pos:{x:e+t.hitBox.pos.x*r.x,y:n+t.hitBox.pos.y*r.y},size:{x:t.hitBox.size.x*r.x,y:t.hitBox.size.y*r.y},collision:t.hitBox.collision},f=fi(s);return o&&Re.push(s),f}function Un(t,e,n,r,l){if(M.isUsingPixi){ht(),F.beginTextureFill({texture:t.texture,matrix:new PIXI.Matrix().translate(e,n)}),F.drawRect(e,n,r==null?w:r,l==null?w:l),ot(rt(Y));return}r==null?le.drawImage(t.image,e,n):le.drawImage(t.image,e,n,r,l)}function ln(t,e=!0){we.clearRect(0,0,w,w);let n=t.split(`
`);e&&(n=n.slice(1,n.length-1));let r=0;n.forEach(g=>{r=Math.max(g.length,r)});const l=Math.max(Math.ceil((Je-r)/2),0),o=n.length,s=Math.max(Math.ceil((Je-o)/2),0);n.forEach((g,h)=>{if(!(h+s>=Je))for(let y=0;y<Je-l;y++){const S=g.charAt(y);let C=ar.indexOf(S);S!==""&&C>=1&&(we.fillStyle=lt(si[C]),we.fillRect((y+l)*We,(h+s)*We,We,We))}});const f=document.createElement("img");return f.src=fe.toDataURL(),M.isUsingPixi?{image:f,texture:PIXI.Texture.from(f)}:{image:f}}function Rt(t,e){const n={pos:new k(w,w),size:new k,collision:{isColliding:{char:{},text:{}}}};e?n.collision.isColliding.char[t]=!0:n.collision.isColliding.text[t]=!0;const r=we.getImageData(0,0,w,w).data;let l=0;for(let o=0;o<w;o++)for(let s=0;s<w;s++)r[l+3]>0&&(s<n.pos.x&&(n.pos.x=s),o<n.pos.y&&(n.pos.y=o)),l+=4;l=0;for(let o=0;o<w;o++)for(let s=0;s<w;s++)r[l+3]>0&&(s>n.pos.x+n.size.x-1&&(n.size.x=s-n.pos.x+1),o>n.pos.y+n.size.y-1&&(n.size.y=o-n.pos.y+1)),l+=4;return n}function gi(t){let e={...et,...t};return t.scale!=null&&(e.scale={...et.scale,...t.scale}),t.mirror!=null&&(e.mirror={...et.mirror,...t.mirror}),e}let tt=!1,Dn=!1,mi=!1;const Cr=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let yi;const Mr={onKeyDown:void 0};let Xt,on=!1,an=!1,sn=!1,un={},cn={},fn={};function Lr(t){Xt={...Mr,...t},yi=oi(Cr.map(e=>[e,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",e=>{on=an=!0,un[e.code]=cn[e.code]=!0,Xt.onKeyDown!=null&&Xt.onKeyDown(),(e.code==="AltLeft"||e.code==="AltRight"||e.code==="ArrowRight"||e.code==="ArrowDown"||e.code==="ArrowLeft"||e.code==="ArrowUp")&&e.preventDefault()}),document.addEventListener("keyup",e=>{on=!1,sn=!0,un[e.code]=!1,fn[e.code]=!0})}function Pr(){Dn=!tt&&an,mi=tt&&sn,an=sn=!1,tt=on,ai(yi).forEach(([t,e])=>{e.isJustPressed=!e.isPressed&&cn[t],e.isJustReleased=e.isPressed&&fn[t],e.isPressed=!!un[t]}),cn={},fn={}}function Fr(){Dn=!1,tt=!0}class Bt{constructor(e=null){N(this,"x");N(this,"y");N(this,"z");N(this,"w");this.setSeed(e)}get(e=1,n){return n==null&&(n=e,e=0),this.next()/4294967295*(n-e)+e}getInt(e,n){n==null&&(n=e,e=0);const r=Math.floor(e),l=Math.floor(n);return l===r?r:this.next()%(l-r)+r}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,n=123456789,r=362436069,l=521288629,o=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=n>>>0,this.y=r>>>0,this.z=l>>>0;for(let s=0;s<o;s++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}const bt=new k;let ue=!1,_t=!1,dn=!1,kr={isDebugMode:!1,anchor:new k,padding:new k,onPointerDownOrUp:void 0},V,$,B;const Ve=new Bt,ve=new k,re=new k;let nt=!1,at=new k,An=!1,hn=!1,pn=!1;function Dr(t,e,n){B={...kr,...n},V=t,$=new k(e.x+B.padding.x*2,e.y+B.padding.y*2),at.set(V.offsetLeft+V.clientWidth*(.5-B.anchor.x),V.offsetTop+V.clientWidth*(.5-B.anchor.y)),B.isDebugMode&&ve.set(V.offsetLeft+V.clientWidth*(.5-B.anchor.x),V.offsetTop+V.clientWidth*(.5-B.anchor.y)),document.addEventListener("mousedown",r=>{Hn(r.pageX,r.pageY)}),document.addEventListener("touchstart",r=>{Hn(r.touches[0].pageX,r.touches[0].pageY)}),document.addEventListener("mousemove",r=>{Kn(r.pageX,r.pageY)}),document.addEventListener("touchmove",r=>{r.preventDefault(),Kn(r.touches[0].pageX,r.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",r=>{Jn()}),document.addEventListener("touchend",r=>{r.preventDefault(),r.target.click(),Jn()},{passive:!1})}function Ar(){Rr(at.x,at.y,bt),B.isDebugMode&&!bt.isInRect(0,0,$.x,$.y)?(_r(),bt.set(ve),_t=!ue&&nt,dn=ue&&!nt,ue=nt):(_t=!ue&&hn,dn=ue&&pn,ue=An),hn=pn=!1}function Ir(){_t=!1,ue=!0}function Rr(t,e,n){V!=null&&(n.x=Math.round(((t-V.offsetLeft)/V.clientWidth+B.anchor.x)*$.x-B.padding.x),n.y=Math.round(((e-V.offsetTop)/V.clientHeight+B.anchor.y)*$.y-B.padding.y))}function _r(){re.length>0?(ve.add(re),!At(ve.x,-$.x*.1,$.x*1.1)&&ve.x*re.x>0&&(re.x*=-1),!At(ve.y,-$.y*.1,$.y*1.1)&&ve.y*re.y>0&&(re.y*=-1),Ve.get()<.05&&re.set(0)):Ve.get()<.1&&(re.set(0),re.addWithAngle(Ve.get(Math.PI*2),($.x+$.y)*Ve.get(.01,.03))),Ve.get()<.05&&(nt=!nt)}function Hn(t,e){at.set(t,e),An=hn=!0,B.onPointerDownOrUp!=null&&B.onPointerDownOrUp()}function Kn(t,e){at.set(t,e)}function Jn(t){An=!1,pn=!0,B.onPointerDownOrUp!=null&&B.onPointerDownOrUp()}let Te=new k,Ne=!1,de=!1,Ee=!1;function Gr(t){Lr({onKeyDown:t}),Dr(E,Se,{onPointerDownOrUp:t,anchor:new k(.5,.5)})}function Tr(){Pr(),Ar(),Te=bt,Ne=tt||ue,de=Dn||_t,Ee=mi||dn}function Nr(){Fr(),Ir()}function zt(t){Te.set(t.pos),Ne=t.isPressed,de=t.isJustPressed,Ee=t.isJustReleased}var Er={exports:{}},vi={Note:"Note",Rest:"Rest",Octave:"Octave",OctaveShift:"OctaveShift",NoteLength:"NoteLength",NoteVelocity:"NoteVelocity",NoteQuantize:"NoteQuantize",Tempo:"Tempo",InfiniteLoop:"InfiniteLoop",LoopBegin:"LoopBegin",LoopExit:"LoopExit",LoopEnd:"LoopEnd"},Br={tempo:120,octave:4,length:4,velocity:100,quantize:75,loopCount:2},zr=function(){function t(e,n){for(var r=0;r<n.length;r++){var l=n[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function Or(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var qr=function(){function t(e){Or(this,t),this.source=e,this.index=0}return zr(t,[{key:"hasNext",value:function(){return this.index<this.source.length}},{key:"peek",value:function(){return this.source.charAt(this.index)||""}},{key:"next",value:function(){return this.source.charAt(this.index++)||""}},{key:"forward",value:function(){for(;this.hasNext()&&this.match(/\s/);)this.index+=1}},{key:"match",value:function(n){return n instanceof RegExp?n.test(this.peek()):this.peek()===n}},{key:"expect",value:function(n){this.match(n)||this.throwUnexpectedToken(),this.index+=1}},{key:"scan",value:function(n){var r=this.source.substr(this.index),l=null;if(n instanceof RegExp){var o=n.exec(r);o&&o.index===0&&(l=o[0])}else r.substr(0,n.length)===n&&(l=n);return l&&(this.index+=l.length),l}},{key:"throwUnexpectedToken",value:function(){var n=this.peek()||"ILLEGAL";throw new SyntaxError("Unexpected token: "+n)}}]),t}(),Vr=qr,Ur=function(){function t(e,n){for(var r=0;r<n.length;r++){var l=n[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function Hr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var W=vi,Kr=Vr,Jr={c:0,d:2,e:4,f:5,g:7,a:9,b:11},Wr=function(){function t(e){Hr(this,t),this.scanner=new Kr(e)}return Ur(t,[{key:"parse",value:function(){var n=this,r=[];return this._readUntil(";",function(){r=r.concat(n.advance())}),r}},{key:"advance",value:function(){switch(this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":return this.readNote();case"[":return this.readChord();case"r":return this.readRest();case"o":return this.readOctave();case">":return this.readOctaveShift(1);case"<":return this.readOctaveShift(-1);case"l":return this.readNoteLength();case"q":return this.readNoteQuantize();case"v":return this.readNoteVelocity();case"t":return this.readTempo();case"$":return this.readInfiniteLoop();case"/":return this.readLoop()}this.scanner.throwUnexpectedToken()}},{key:"readNote",value:function(){return{type:W.Note,noteNumbers:[this._readNoteNumber(0)],noteLength:this._readLength()}}},{key:"readChord",value:function(){var n=this;this.scanner.expect("[");var r=[],l=0;return this._readUntil("]",function(){switch(n.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":r.push(n._readNoteNumber(l));break;case">":n.scanner.next(),l+=12;break;case"<":n.scanner.next(),l-=12;break;default:n.scanner.throwUnexpectedToken()}}),this.scanner.expect("]"),{type:W.Note,noteNumbers:r,noteLength:this._readLength()}}},{key:"readRest",value:function(){return this.scanner.expect("r"),{type:W.Rest,noteLength:this._readLength()}}},{key:"readOctave",value:function(){return this.scanner.expect("o"),{type:W.Octave,value:this._readArgument(/\d+/)}}},{key:"readOctaveShift",value:function(n){return this.scanner.expect(/<|>/),{type:W.OctaveShift,direction:n|0,value:this._readArgument(/\d+/)}}},{key:"readNoteLength",value:function(){return this.scanner.expect("l"),{type:W.NoteLength,noteLength:this._readLength()}}},{key:"readNoteQuantize",value:function(){return this.scanner.expect("q"),{type:W.NoteQuantize,value:this._readArgument(/\d+/)}}},{key:"readNoteVelocity",value:function(){return this.scanner.expect("v"),{type:W.NoteVelocity,value:this._readArgument(/\d+/)}}},{key:"readTempo",value:function(){return this.scanner.expect("t"),{type:W.Tempo,value:this._readArgument(/\d+(\.\d+)?/)}}},{key:"readInfiniteLoop",value:function(){return this.scanner.expect("$"),{type:W.InfiniteLoop}}},{key:"readLoop",value:function(){var n=this;this.scanner.expect("/"),this.scanner.expect(":");var r={type:W.LoopBegin},l={type:W.LoopEnd},o=[];return o=o.concat(r),this._readUntil(/[|:]/,function(){o=o.concat(n.advance())}),o=o.concat(this._readLoopExit()),this.scanner.expect(":"),this.scanner.expect("/"),r.value=this._readArgument(/\d+/)||null,o=o.concat(l),o}},{key:"_readUntil",value:function(n,r){for(;this.scanner.hasNext()&&(this.scanner.forward(),!(!this.scanner.hasNext()||this.scanner.match(n)));)r()}},{key:"_readArgument",value:function(n){var r=this.scanner.scan(n);return r!==null?+r:null}},{key:"_readNoteNumber",value:function(n){var r=Jr[this.scanner.next()];return r+this._readAccidental()+n}},{key:"_readAccidental",value:function(){return this.scanner.match("+")?1*this.scanner.scan(/\++/).length:this.scanner.match("-")?-1*this.scanner.scan(/\-+/).length:0}},{key:"_readDot",value:function(){for(var n=(this.scanner.scan(/\.+/)||"").length,r=new Array(n),l=0;l<n;l++)r[l]=0;return r}},{key:"_readLength",value:function(){var n=[];n=n.concat(this._readArgument(/\d+/)),n=n.concat(this._readDot());var r=this._readTie();return r&&(n=n.concat(r)),n}},{key:"_readTie",value:function(){return this.scanner.forward(),this.scanner.match("^")?(this.scanner.next(),this._readLength()):null}},{key:"_readLoopExit",value:function(){var n=this,r=[];if(this.scanner.match("|")){this.scanner.next();var l={type:W.LoopExit};r=r.concat(l),this._readUntil(":",function(){r=r.concat(n.advance())})}return r}}]),t}(),Xr=Wr,Qr=function(){function t(e,n){for(var r=0;r<n.length;r++){var l=n[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function Yr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var q=vi,X=Br,Zr=Xr,$r=typeof Symbol<"u"?Symbol.iterator:"@@iterator",jr=function(){function t(e){Yr(this,t),this.source=e,this._commands=new Zr(e).parse(),this._commandIndex=0,this._processedTime=0,this._iterator=null,this._octave=X.octave,this._noteLength=[X.length],this._velocity=X.velocity,this._quantize=X.quantize,this._tempo=X.tempo,this._infiniteLoopIndex=-1,this._loopStack=[],this._done=!1}return Qr(t,[{key:"hasNext",value:function(){return this._commandIndex<this._commands.length}},{key:"next",value:function(){if(this._done)return{done:!0,value:null};if(this._iterator){var n=this._iterator.next();if(!n.done)return n}var r=this._forward(!0);if(Wn(r))this._iterator=this[r.type](r);else return this._done=!0,{done:!1,value:{type:"end",time:this._processedTime}};return this.next()}},{key:$r,value:function(){return this}},{key:"_forward",value:function(n){for(;this.hasNext()&&!Wn(this._commands[this._commandIndex]);){var r=this._commands[this._commandIndex++];this[r.type](r)}return n&&!this.hasNext()&&this._infiniteLoopIndex!==-1?(this._commandIndex=this._infiniteLoopIndex,this._forward(!1)):this._commands[this._commandIndex++]||{}}},{key:"_calcDuration",value:function(n){var r=this;n[0]===null&&(n=this._noteLength.concat(n.slice(1)));var l=null,o=0;return n=n.map(function(s){switch(s){case null:s=l;break;case 0:s=o*=2;break;default:l=o=s;break}var f=s!==null?s:X.length;return 60/r._tempo*(4/f)}),n.reduce(function(s,f){return s+f},0)}},{key:"_calcNoteNumber",value:function(n){return n+this._octave*12+12}},{key:q.Note,value:function(n){var r=this,l="note",o=this._processedTime,s=this._calcDuration(n.noteLength),f=n.noteNumbers.map(function(y){return r._calcNoteNumber(y)}),g=this._quantize,h=this._velocity;return this._processedTime=this._processedTime+s,el(f.map(function(y){return{type:l,time:o,duration:s,noteNumber:y,velocity:h,quantize:g}}))}},{key:q.Rest,value:function(n){var r=this._calcDuration(n.noteLength);this._processedTime=this._processedTime+r}},{key:q.Octave,value:function(n){this._octave=n.value!==null?n.value:X.octave}},{key:q.OctaveShift,value:function(n){var r=n.value!==null?n.value:1;this._octave+=r*n.direction}},{key:q.NoteLength,value:function(n){var r=n.noteLength.map(function(l){return l!==null?l:X.length});this._noteLength=r}},{key:q.NoteVelocity,value:function(n){this._velocity=n.value!==null?n.value:X.velocity}},{key:q.NoteQuantize,value:function(n){this._quantize=n.value!==null?n.value:X.quantize}},{key:q.Tempo,value:function(n){this._tempo=n.value!==null?n.value:X.tempo}},{key:q.InfiniteLoop,value:function(){this._infiniteLoopIndex=this._commandIndex}},{key:q.LoopBegin,value:function(n){var r=n.value!==null?n.value:X.loopCount,l=this._commandIndex,o=-1;this._loopStack.push({loopCount:r,loopTopIndex:l,loopOutIndex:o})}},{key:q.LoopExit,value:function(){var n=this._loopStack[this._loopStack.length-1],r=this._commandIndex;n.loopCount<=1&&n.loopOutIndex!==-1&&(r=n.loopOutIndex),this._commandIndex=r}},{key:q.LoopEnd,value:function(){var n=this._loopStack[this._loopStack.length-1],r=this._commandIndex;n.loopOutIndex===-1&&(n.loopOutIndex=this._commandIndex),n.loopCount-=1,0<n.loopCount?r=n.loopTopIndex:this._loopStack.pop(),this._commandIndex=r}}]),t}();function el(t){var e=0;return{next:function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}}}}function Wn(t){return t.type===q.Note||t.type===q.Rest}var tl=jr;(function(t){t.exports=tl})(Er);var st={};(function(t){var e=+Math.PI*2,n=16,r=1,l=Math.sin,o=Math.pow,s=Math.abs,f=1e-6,g=window.AudioContext||window.webkitAudioContext;t.SampleRate=0,t.Sec=0,t.SetSampleRate=function(i){t.SampleRate=i|0,t.Sec=i|0},t.SetSampleRate(Yi()),t.Live=function(){var i={};return i._generate=function(a){var u=new C(a,t.DefaultModules),d=Oe(u.getSamplesLeft());return u.generate(d),d},i},t.Module={},t.G={};var h=t.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function y(i,a){return i.stage-a.stage}t.InitDefaultParams=S;function S(i,a){for(var u=0;u<a.length;u+=1){var d=a[u],p=i[d.name]||{};vt(d.params,function(m,v){typeof p[v]>"u"&&(p[v]=m.D)}),i[d.name]=p}}t.Processor=C;function C(i,a){i=i||{},a=a||t.DefaultModules,typeof i=="function"?i=i():i=JSON.parse(JSON.stringify(i)),this.finished=!1,this.state={SampleRate:i.SampleRate||t.SampleRate},a=a.slice(),a.sort(y),this.modules=a,S(i,a);for(var u=0;u<this.modules.length;u+=1){var d=this.modules[u];this.modules[u].setup(this.state,i[d.name])}}C.prototype={generate:function(i){for(var a=0;a<i.length;a+=1)i[a]=0;if(!this.finished){for(var u=this.state,d=i.length|0,a=0;a<this.modules.length;a+=1){var p=this.modules[a],m=p.process(u,i.subarray(0,d))|0;d=Math.min(d,m)}d<i.length&&(this.finished=!0);for(var a=d;a<i.length;a++)i[a]=0}},getSamplesLeft:function(){for(var i=0,a=0;a<this.state.envelopes.length;a+=1)i+=this.state.envelopes[a].N;return i===0&&(i=3*this.state.SampleRate),i}},t.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:h.PhaseSpeed,setup:function(i,a){var u=i.SampleRate;i.phaseParams=a,i.phaseSpeed=a.Start*e/u,i.phaseSpeedMax=a.Max*e/u,i.phaseSpeedMin=a.Min*e/u,i.phaseSpeedMin=Math.min(i.phaseSpeedMin,i.phaseSpeed),i.phaseSpeedMax=Math.max(i.phaseSpeedMax,i.phaseSpeed),i.phaseSlide=1+o(a.Slide,3)*64/u,i.phaseDeltaSlide=o(a.DeltaSlide,3)/(u*1e3),i.repeatTime=0,i.repeatLimit=1/0,a.RepeatSpeed>0&&(i.repeatLimit=a.RepeatSpeed*u),i.arpeggiatorTime=0,i.arpeggiatorLimit=a.ChangeSpeed*u,a.ChangeAmount==0&&(i.arpeggiatorLimit=1/0),i.arpeggiatorMod=1+a.ChangeAmount/12},process:function(i,a){for(var u=+i.phaseSpeed,d=+i.phaseSpeedMin,p=+i.phaseSpeedMax,m=+i.phaseSlide,v=+i.phaseDeltaSlide,L=i.repeatTime,x=i.repeatLimit,I=i.arpeggiatorTime,R=i.arpeggiatorLimit,J=i.arpeggiatorMod,T=0;T<a.length;T++){if(m+=v,u*=m,u=u<d?d:u>p?p:u,L>x)return this.setup(i,i.phaseParams),T+this.process(i,a.subarray(T))-1;L++,I>R&&(u*=J,I=0,R=1/0),I++,a[T]+=u}return i.repeatTime=L,i.arpeggiatorTime=I,i.arpeggiatorLimit=R,i.phaseSpeed=u,i.phaseSlide=m,a.length}},t.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:h.PhaseSpeedMod,setup:function(i,a){var u=i.SampleRate;i.vibratoPhase=0,i.vibratoDepth=a.Depth,i.vibratoPhaseSpeed=a.Frequency*e/u,i.vibratoPhaseSpeedSlide=1+o(a.FrequencySlide,3)*3/u,i.vibratoDepthSlide=a.DepthSlide/u},process:function(i,a){var u=+i.vibratoPhase,d=+i.vibratoDepth,p=+i.vibratoPhaseSpeed,m=+i.vibratoPhaseSpeedSlide,v=+i.vibratoDepthSlide;if(d==0&&v<=0)return a.length;for(var L=0;L<a.length;L++)u+=p,u>e&&(u-=e),a[L]+=a[L]*l(u)*d,p*=m,d+=v,d=$i(d);return i.vibratoPhase=u,i.vibratoDepth=d,i.vibratoPhaseSpeed=p,a.length}},t.Module.Generator={name:"Generator",params:{Func:{C:t.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:h.Generator,setup:function(i,a){i.generatorPhase=0,typeof a.Func=="string"?i.generator=t.G[a.Func]:i.generator=a.Func,typeof i.generator=="object"&&(i.generator=i.generator.create()),yt(typeof i.generator=="function","generator must be a function"),i.generatorA=a.A,i.generatorASlide=a.ASlide,i.generatorB=a.B,i.generatorBSlide=a.BSlide},process:function(i,a){return i.generator(i,a)}};var b=1<<16;t.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:h.Generator,setup:function(i,a){i.guitarA=a.A,i.guitarB=a.B,i.guitarC=a.C,i.guitarBuffer=Oe(b),i.guitarHead=0;for(var u=i.guitarBuffer,d=0;d<u.length;d++)u[d]=Pe()*2-1},process:function(i,a){for(var u=b,d=u-1,p=+i.guitarA,m=+i.guitarB,v=+i.guitarC,L=p+m+v,x=i.guitarHead,I=i.guitarBuffer,R=0;R<a.length;R++){var J=e/a[R]|0;J=J>u?u:J;var T=x-J+u&d;I[x]=(I[T-0+u&d]*p+I[T-1+u&d]*m+I[T-2+u&d]*v)/L,a[R]=I[x],x=x+1&d}return i.guitarHead=x,a.length}},t.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:h.SampleMod+0,setup:function(i,a){i.FilterEnabled=a.HP>f||a.LP<1-f,i.LPEnabled=a.LP<1-f,i.LP=o(a.LP,3)/10,i.LPSlide=1+a.LPSlide*100/i.SampleRate,i.LPPos=0,i.LPPosSlide=0,i.LPDamping=5/(1+o(a.LPResonance,2)*20)*(.01+a.LP),i.LPDamping=1-Math.min(i.LPDamping,.8),i.HP=o(a.HP,2)/10,i.HPPos=0,i.HPSlide=1+a.HPSlide*100/i.SampleRate},enabled:function(i){return i.FilterEnabled},process:function(i,a){if(!this.enabled(i))return a.length;for(var u=+i.LP,d=+i.LPPos,p=+i.LPPosSlide,m=+i.LPSlide,v=+i.LPDamping,L=+i.LPEnabled,x=+i.HP,I=+i.HPPos,R=+i.HPSlide,J=0;J<a.length;J++){(x>f||x<-f)&&(x*=R,x=x<f?f:x>.1?.1:x);var T=d;u*=m,u=u<0?u=0:u>.1?.1:u;var pe=a[J];L?(p+=(pe-d)*u,p*=v):(d=pe,p=0),d+=p,I+=d-T,I*=1-x,a[J]=I}return i.LPPos=d,i.LPPosSlide=p,i.LP=u,i.HP=x,i.HPPos=I,a.length}};var K=1<<10;t.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:h.SampleMod+1,setup:function(i,a){i.phaserBuffer=Oe(K),i.phaserPos=0,i.phaserOffset=o(a.Offset,2)*(K-4),i.phaserOffsetSlide=o(a.Sweep,3)*4e3/i.SampleRate},enabled:function(i){return s(i.phaserOffsetSlide)>f||s(i.phaserOffset)>f},process:function(i,a){if(!this.enabled(i))return a.length;for(var u=K,d=u-1,p=i.phaserBuffer,m=i.phaserPos|0,v=+i.phaserOffset,L=+i.phaserOffsetSlide,x=0;x<a.length;x++){v+=L,v<0&&(v=-v,L=-L),v>d&&(v=d,L=0),p[m]=a[x];var I=m-(v|0)+u&d;a[x]+=p[I],m=m+1&d|0}return i.phaserPos=m,i.phaserOffset=v,a.length}},t.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:h.Volume,setup:function(i,a){var u=i.SampleRate,d=a.Master,p=d*(1+a.Punch);i.envelopes=[{S:0,E:d,N:a.Attack*u|0},{S:p,E:d,N:a.Sustain*u|0},{S:d,E:0,N:a.Decay*u|0}];for(var m=0;m<i.envelopes.length;m+=1){var v=i.envelopes[m];v.G=(v.E-v.S)/v.N}},process:function(i,a){for(var u=0;i.envelopes.length>0&&u<a.length;){for(var d=i.envelopes[0],p=d.S,m=d.G,v=Math.min(a.length-u,d.N)|0,L=u+v|0;u<L;u+=1)a[u]*=p,p+=m,p=Zi(p,0,10);d.S=p,d.N-=v,d.N<=0&&i.envelopes.shift()}return u}},t.DefaultModules=[t.Module.Frequency,t.Module.Vibrato,t.Module.Generator,t.Module.Filter,t.Module.Phaser,t.Module.Volume],t.DefaultModules.sort(y),t.EmptyParams=A;function A(){return vt(t.Module,function(){return{}})}t._RemoveEmptyParams=O;function O(i){for(var a in i)Bn(i[a]).length==0&&delete i[a]}t.Preset={Reset:function(){return A()},Coin:function(){var i=A();return i.Frequency.Start=c(880,660),i.Volume.Sustain=c(.1),i.Volume.Decay=c(.4,.1),i.Volume.Punch=c(.3,.3),c()<.5&&(i.Frequency.ChangeSpeed=c(.15,.1),i.Frequency.ChangeAmount=c(8,4)),O(i),i},Laser:function(){var i=A();return i.Generator.Func=ze(["square","saw","sine"]),c()<.33?(i.Frequency.Start=c(880,440),i.Frequency.Min=c(.1),i.Frequency.Slide=c(.3,-.8)):(i.Frequency.Start=c(1200,440),i.Frequency.Min=i.Frequency.Start-c(880,440),i.Frequency.Min<110&&(i.Frequency.Min=110),i.Frequency.Slide=c(.3,-1)),c()<.5?(i.Generator.A=c(.5),i.Generator.ASlide=c(.2)):(i.Generator.A=c(.5,.4),i.Generator.ASlide=c(.7)),i.Volume.Sustain=c(.2,.1),i.Volume.Decay=c(.4),c()<.5&&(i.Volume.Punch=c(.3)),c()<.33&&(i.Phaser.Offset=c(.2),i.Phaser.Sweep=c(.2)),c()<.5&&(i.Filter.HP=c(.3)),O(i),i},Explosion:function(){var i=A();return i.Generator.Func="noise",c()<.5?(i.Frequency.Start=c(440,40),i.Frequency.Slide=c(.4,-.1)):(i.Frequency.Start=c(1600,220),i.Frequency.Slide=c(-.2,-.2)),c()<.2&&(i.Frequency.Slide=0),c()<.3&&(i.Frequency.RepeatSpeed=c(.5,.3)),i.Volume.Sustain=c(.3,.1),i.Volume.Decay=c(.5),i.Volume.Punch=c(.6,.2),c()<.5&&(i.Phaser.Offset=c(.9,-.3),i.Phaser.Sweep=c(-.3)),c()<.33&&(i.Frequency.ChangeSpeed=c(.3,.6),i.Frequency.ChangeAmount=c(24,-12)),O(i),i},Powerup:function(){var i=A();return c()<.5?i.Generator.Func="saw":i.Generator.A=c(.6),i.Frequency.Start=c(220,440),c()<.5?(i.Frequency.Slide=c(.5,.2),i.Frequency.RepeatSpeed=c(.4,.4)):(i.Frequency.Slide=c(.2,.05),c()<.5&&(i.Vibrato.Depth=c(.6,.1),i.Vibrato.Frequency=c(30,10))),i.Volume.Sustain=c(.4),i.Volume.Decay=c(.4,.1),O(i),i},Hit:function(){var i=A();return i.Generator.Func=ze(["square","saw","noise"]),i.Generator.A=c(.6),i.Generator.ASlide=c(1,-.5),i.Frequency.Start=c(880,220),i.Frequency.Slide=-c(.4,.3),i.Volume.Sustain=c(.1),i.Volume.Decay=c(.2,.1),c()<.5&&(i.Filter.HP=c(.3)),O(i),i},Jump:function(){var i=A();return i.Generator.Func="square",i.Generator.A=c(.6),i.Frequency.Start=c(330,330),i.Frequency.Slide=c(.4,.2),i.Volume.Sustain=c(.3,.1),i.Volume.Decay=c(.2,.1),c()<.5&&(i.Filter.HP=c(.3)),c()<.3&&(i.Filter.LP=c(-.6,1)),O(i),i},Select:function(){var i=A();return i.Generator.Func=ze(["square","saw"]),i.Generator.A=c(.6),i.Frequency.Start=c(660,220),i.Volume.Sustain=c(.1,.1),i.Volume.Decay=c(.2),i.Filter.HP=.2,O(i),i},Lucky:function(){var i=A();return vt(i,function(a,u){var d=t.Module[u].params;vt(d,function(p,m){if(p.C){var v=Bn(p.C);a[m]=v[v.length*Pe()|0]}else a[m]=Pe()*(p.H-p.L)+p.L})}),i.Volume.Master=.4,i.Filter={},O(i),i},Synth:function(){var i=A();return i.Generator.Func=ze(["square","saw"]),i.Frequency.Start=ze([340,240,170]),i.Volume.Attack=c()>.6?c(.5):0,i.Volume.Sustain=c(1),i.Volume.Punch=c(1),i.Volume.Decay=c(.9)+.1,i.Generator.A=c(1),c()<.25&&(i.Filter.HP=c(1)),c()<.25&&(i.Filter.LP=c(1)),O(i),i},Tone:function(){var i=A();return i.Generator.Func="square",i.Frequency.Start=261.6,i.Volume.Sustain=.6441,O(i),i},Click:function(){var i=c()>.5?t.Preset.Hit():t.Preset.Explosion();return c()<.5&&(i.Frequency.Slide=-.5+c(1)),c()<.5&&(i.Volume.Sustain*=c(.4)+.2,i.Volume.Decay*=c(.4)+.2),i.Frequency.Start=c(1200,440),O(i),i}},t.G.unoise=he("sample = Math.random();"),t.G.sine=he("sample = Math.sin(phase);"),t.G.saw=he("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),t.G.triangle=he("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),t.G.square=he("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),t.G.synth=he("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"),t.G.noise=he("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),t.G.string={create:function(){for(var i=65536,a=i-1,u=Oe(i),d=0;d<u.length;d++)u[d]=Pe()*2-1;var p=0;return function(m,v){for(var L=Math.PI*2,x=+m.generatorA,I=+m.generatorASlide,R=+m.generatorB,J=+m.generatorBSlide,T=u,pe=0;pe<v.length;pe++){var er=v[pe],tr=L/er|0;x+=I,R+=J,x=x<0?0:x>1?1:x,R=R<0?0:R>1?1:R;var Kt=p-tr+i&a,nr=(T[Kt-0+i&a]*1+T[Kt-1+i&a]*x+T[Kt-2+i&a]*R)/(1+x+R);T[p]=nr,v[pe]=T[p],p=p+1&a}return m.generatorA=x,m.generatorB=R,v.length}}};function he(i){return new Function("$","block",`var TAU = Math.PI * 2;
var sample;
var phase = +$.generatorPhase,
	A = +$.generatorA, ASlide = +$.generatorASlide,
	B = +$.generatorB, BSlide = +$.generatorBSlide;

for(var i = 0; i < block.length; i++){
	var phaseSpeed = block[i];
	phase += phaseSpeed;
	if(phase > TAU){ phase -= TAU };
	A += ASlide; B += BSlide;
   A = A < 0 ? 0 : A > 1 ? 1 : A;
   B = B < 0 ? 0 : B > 1 ? 1 : B;
`+i+`	block[i] = sample;
}

$.generatorPhase = phase;
$.generatorA = A;
$.generatorB = B;
return block.length;
`)}t.CreateAudio=Xi;function Xi(i){typeof Float32Array<"u"&&yt(i instanceof Float32Array,"data must be an Float32Array");var a=r*n>>3,u=t.SampleRate*a,d=ji(8+36+i.length*2),p=0;function m(L){for(var x=0;x<L.length;x+=1)d[p]=L.charCodeAt(x),p++}function v(L,x){x<=0||(d[p]=L&255,p++,v(L>>8,x-1))}return m("RIFF"),v(36+i.length*2,4),m("WAVEfmt "),v(16,4),v(1,2),v(r,2),v(t.SampleRate,4),v(u,4),v(a,2),v(n,2),m("data"),v(i.length*2,4),En(d.subarray(p),i),new Audio("data:audio/wav;base64,"+Qi(d))}t.DownloadAsFile=function(i){yt(i instanceof Audio,"input must be an Audio object"),document.location.href=i.src},t.Util={},t.Util.CopyFToU8=En;function En(i,a){yt(i.length/2==a.length,"the target buffer must be twice as large as the iinput");for(var u=0,d=0;d<a.length;d++){var p=+a[d],m=p*32767|0;m=m<-32768?-32768:32767<m?32767:m,m+=m<0?65536:0,i[u]=m&255,u++,i[u]=m>>8,u++}}function Qi(i){for(var a=32768,u="",d=0;d<i.length;d+=a){var p=Math.min(d+a,i.length);u+=String.fromCharCode.apply(null,i.subarray(d,p))}return btoa(u)}function Yi(){return typeof g<"u"?new g().sampleRate:44100}function yt(i,a){if(!i)throw new Error(a)}function Zi(i,a,u){return i=+i,a=+a,u=+u,i<a?+a:i>u?+u:+i}function $i(i){return i=+i,i<0?0:i>1?1:+i}function vt(i,a){var u={};for(var d in i)i.hasOwnProperty(d)&&(u[d]=a(i[d],d));return u}function c(i,a){var u=Pe();return i!==void 0&&(u*=i),a!==void 0&&(u+=a),u}function ze(i){return i[i.length*Pe()|0]}function Bn(i){var a=[];for(var u in i)a.push(u);return a}t._createFloatArray=Oe;function Oe(i){if(typeof Float32Array>"u")for(var a=new Array(i),u=0;u<a.length;u++)a[u]=0;return new Float32Array(i)}function ji(i){if(typeof Uint8Array>"u")for(var a=new Array(i),u=0;u<a.length;u++)a[u]=0;return new Uint8Array(i)}var zn=Math.random;t.setRandomFunc=function(i){zn=i};function Pe(){return zn()}})(st={});let z,gn,Ot,mn,Si,Xn=!1;function nl(t=void 0){z=t==null?new(window.AudioContext||window.webkitAudioContext):t,xi(),rl(),ll()}function il(){Xn||(Xn=!0,ol())}function xi(t=120){gn=t,Ot=60/gn}function rl(t=8){mn=t>0?4/t:void 0}function ll(t=.1){Si=t}function qt(t){if(mn==null)return t;const e=Ot*mn;return e>0?Math.ceil(t/e)*e:t}function ol(){const t=z.createBufferSource();t.start=t.start||t.noteOn,t.start()}class al{constructor(e=null){N(this,"x");N(this,"y");N(this,"z");N(this,"w");this.setSeed(e)}get(e=1,n){return n==null&&(n=e,e=0),this.next()/4294967295*(n-e)+e}getInt(e,n){n==null&&(n=e,e=0);const r=Math.floor(e),l=Math.floor(n);return l===r?r:this.next()%(l-r)+r}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,n=123456789,r=362436069,l=521288629,o=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=n>>>0,this.y=r>>>0,this.z=l>>>0;for(let s=0;s<o;s++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}function pt(t,e){let n=[];for(let r=0;r<t;r++)n.push(e(r));return n}function wi(t){return 440*Math.pow(2,(t-69)/12)}function bi(t){let e=0;const n=t.length;for(let r=0;r<n;r++){const l=t.charCodeAt(r);e=(e<<5)-e+l,e|=0}return e}const Ci=["coin","laser","explosion","powerUp","hit","jump","select","random","synth","tone","click"],sl={coin:"Coin",laser:"Laser",explosion:"Explosion",powerUp:"Powerup",hit:"Hit",jump:"Jump",select:"Select",random:"Lucky",synth:"Synth",tone:"Tone",click:"Click"},ut=new al;let In,Mi;function ul(){Mi=st.Live(),In=[],st.setRandomFunc(()=>ut.get())}function cl(t){pl(t)}function fl(){const t=z.currentTime;In.forEach(e=>{gl(e,t)})}function Li(t=void 0,e=void 0,n=2,r=.5,l=void 0,o=1,s=1){e!=null&&ut.setSeed(e);const f=st.Preset[sl[t!=null?t:Ci[ut.getInt(8)]]],g=pt(n,()=>{const h=f();return l!=null&&h.Frequency.Start!=null&&(h.Frequency.Start=l),h.Volume.Attack!=null&&(h.Volume.Attack*=o),h.Volume.Sustain!=null&&(h.Volume.Sustain*=s),h});return dl(t,g,r)}function dl(t,e,n){const r=e.map(o=>{const s=Mi._generate(o),f=z.createBuffer(1,s.length,st.SampleRate);var g=f.getChannelData(0);return g.set(s),f}),l=z.createGain();return l.gain.value=n*Si*Fi,l.connect(z.destination),{type:t,params:e,volume:n,buffers:r,bufferSourceNodes:void 0,gainNode:l,isPlaying:!1,playedTime:void 0}}function hl(t){In.push(t)}function pl(t){t.isPlaying=!0}function gl(t,e){if(!t.isPlaying)return;t.isPlaying=!1;const n=qt(e);(t.playedTime==null||n>t.playedTime)&&(vn(t,n),t.playedTime=n)}let yn,Pi,Fi=1;function ml(t=.01,e=.9,n=.15){yn=t,Pi=e,Fi=n}function vn(t,e,n=void 0){t.bufferSourceNodes=[],t.buffers.forEach(r=>{const l=z.createBufferSource();if(l.buffer=r,n!=null&&l.playbackRate!=null){const o=Math.pow(2,.08333333333333333);l.playbackRate.value=Math.pow(o,n)}if(l.connect(t.gainNode),yn!=null){const o=z.createDelay();o.delayTime.value=yn,l.connect(o),o.connect(t.gainNode);const s=z.createGain();s.gain.value=Pi,o.connect(s),s.connect(o)}l.start=l.start||l.noteOn,l.start(e),t.bufferSourceNodes.push(l)})}function Sn(t,e=void 0){t.bufferSourceNodes!=null&&(t.bufferSourceNodes.forEach(n=>{e==null?n.stop():n.stop(e)}),t.bufferSourceNodes=void 0)}function yl(t,e,n,r){return{mml:t,sequence:e,soundEffect:n,noteIndex:0,endStep:-1,visualizer:r}}function vl(t,e,n){const r=e.sequence.notes[e.noteIndex];r!=null&&((e.soundEffect.type==="synth"||e.soundEffect.type==="tone")&&e.endStep===t.notesStepsIndex&&Sn(e.soundEffect,n),r.quantizedStartStep===t.notesStepsIndex&&((e.soundEffect.type==="synth"||e.soundEffect.type==="tone")&&Sn(e.soundEffect),e.soundEffect.isDrum?vn(e.soundEffect,n):vn(e.soundEffect,n,r.pitch-69),e.visualizer!=null&&e.visualizer.redraw(r),e.endStep=r.quantizedEndStep,e.endStep>=t.notesStepsCount&&(e.endStep-=t.notesStepsCount),e.noteIndex++,e.noteIndex>=e.sequence.notes.length&&(e.noteIndex=0)))}let _e=[];function Sl(){Ll(),_e=[]}function xl(t,e,n=1){t.forEach(l=>{l.noteIndex=0});const r={parts:t,notesStepsCount:e,notesStepsIndex:void 0,noteInterval:void 0,nextNotesTime:void 0,speedRatio:n,isPlaying:!1,isLooping:!1};return ki(r),r}function ki(t){const e=Ot/4/t.speedRatio;t.notesStepsIndex=0,t.noteInterval=e,t.nextNotesTime=qt(z.currentTime)-e}function wl(t){_e.push(t)}function bl(t){_e=_e.filter(e=>e!==t)}function Cl(){_e.forEach(t=>{Pl(t)})}function Ml(t,e=!1){t.isLooping=e,ki(t),t.isPlaying=!0}function Di(t){t.isPlaying=!1,t.parts.forEach(e=>{Sn(e.soundEffect)})}function Ll(){_e.forEach(t=>{Di(t)})}function Pl(t){if(!t.isPlaying)return;const e=z.currentTime;e<t.nextNotesTime||(t.nextNotesTime+=t.noteInterval,t.nextNotesTime<e-Ot&&(t.nextNotesTime=qt(e)),t.parts.forEach(n=>{vl(t,n,t.nextNotesTime)}),t.notesStepsIndex++,t.notesStepsIndex>=t.notesStepsCount&&(t.isLooping?t.notesStepsIndex=0:t.isPlaying=!1))}const Fl={c:"coin",l:"laser",e:"explosion",p:"powerUp",h:"hit",j:"jump",s:"select",u:"random",r:"random"},P=ut;let Ai=1;function kl(t){Ai=t}function Dl(t,e,n,r,l,o,s){P.setSeed(Ai+bi(t)),Tl(),Ct=null;let f=P.select(o);const g=pt(l,()=>{const h=Math.floor(Math.abs(P.get()+P.get()-1)*3),y=Math.floor((P.get()+P.get()-1)*10),S=Math.abs(P.get()+P.get()-1),C=P.get()<.25;C||(f=P.select(o));const b=P.get()<.5,K=P.get()<.5,A=P.get()<.9;return Il(n,f,e,.7,h,y,S,C,b,K,A,void 0,s)});return Al(g,.5/r)}function Al(t,e){const n=t.map(r=>{const l=[];return r.notes.forEach((o,s)=>{o!=null&&l.push({pitch:o+69,quantizedStartStep:s*2})}),yl(void 0,{notes:l},r.soundEffect)});return xl(n,t[0].notes.length*2,e)}let Ct;function Il(t=32,e,n=60,r=1,l=0,o=0,s=1,f=!1,g=!1,h=!1,y=!1,S=null,C=.1){const b=Bl(e,wi(n),r,C);if(Ct!=null&&f)b.noteRatios=Ct.noteRatios;else{const K=S!=null?Gl(t,S):Rl(t);b.noteRatios=Nl(K,g?0:-1,1,s,y)}return b.notes=El(b.noteRatios,l,o,h),Ct=b,b}function Rl(t){let e=pt(t,()=>!1),n=4;for(;n<=t;)e=_l(e,n),n*=2;return e}function _l(t,e){let n=pt(e,()=>!1);const r=Math.floor(Math.abs(P.get()+P.get()-1)*4);for(let l=0;l<r;l++)n[P.getInt(e-1)]=!0;return t.map((l,o)=>n[o%e]?!l:l)}function Gl(t,e){return pt(t,()=>P.get()>=e)}const Ii=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],Qt=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let Ae;function Tl(){Ae=P.select(Qt).map((e,n)=>[P.get()<.7?e[0]:Qt[P.getInt(Qt.length)][n][0],P.get()<.7?e[1]:P.getInt(Ii.length)])}function Nl(t,e,n,r,l){let o=P.get(),s=P.get(-.5,.5),g=t.length/Ae.length,h=[];return t.forEach((y,S)=>{let C=Math.floor(S/g),b=S%g;if(l&&C===Math.floor(Ae.length/2)){h.push(h[b]),h[b]!=null&&(o=h[b]);return}if(!y){h.push(null);return}h.push(o),s+=P.get(-.25,.25),o+=s*r,(P.get()<.2||o<=e||o>=n)&&(o-=s*2,s*=-1)}),h}function El(t,e,n,r){let o=t.length/Ae.length;return t.map((s,f)=>{if(s==null)return null;let g=Math.floor(f/o),h=Ae[g][0],y=Ii[Ae[g][1]],S=s;r&&(S=Math.floor(S*2)/2);let C=Math.floor(S),b=Math.floor((S-C)*y.length);for(b+=e+P.getInt(-n,n+1);b>=y.length;)b-=y.length,C++;for(;b<0;)b+=y.length,C--;return h+C*12+y[b]})}function Bl(t,e,n,r){return{noteRatios:void 0,notes:void 0,soundEffect:Li(t,void 0,1,r,e,n,n)}}let xn,Gt,te,Ri,Xe,ct=!1,Qn;function zl(){Gt=z.createGain(),Vt(),Gt.connect(z.destination)}async function Ol(t){if(ct&&_i(),t===Qn){Yn();return}Qn=t;const n=await(await fetch(t)).arrayBuffer();z.decodeAudioData(n,function(r){xn=r;const l=60/gn*4;Ri=Math.floor(xn.duration/l)*l,Yn()},function(r){throw r})}function Vt(t=1){Gt.gain.value=t}function Yn(){Xe=qt(z.currentTime),ct=!0,Gi()}function _i(){!ct||(ct=!1,te.stop())}function Gi(){!ct||z.currentTime<Xe-1||(te!=null&&te.stop(Xe),te=z.createBufferSource(),te.buffer=xn,te.connect(Gt),te.start=te.start||te.noteOn,te.start(Xe),Xe+=Ri)}const Zn=ut;let Tt,xe;function Ti(t="0",e=2,n,r=1){ql(Fl[t[0]],{seed:Tt+bi(t),numberOfSounds:e,pitch:n,volume:r})}function Ni(t="0",e=69-24,n=32,r=.25,l=4,o=["laser","select","hit","hit"],s=1){xe=Dl(t,e,n,r,l,o,s),wl(xe),Ml(xe,!0)}function Ei(){xe!=null&&(Di(xe),bl(xe),xe=void 0)}let Mt;function ql(t=void 0,e){const n={seed:void 0,numberOfSounds:2,volume:1,pitch:void 0,...e},r=`${t}_${JSON.stringify(n)}`;if(Mt[r]==null){t==null&&(Zn.setSeed(n.seed),t=Ci[Zn.getInt(8)]);const l=Li(t,n.seed==null?Tt:n.seed,n.numberOfSounds,n.volume,n.pitch==null?void 0:wi(n.pitch));hl(l),Mt[r]=l}cl(Mt[r])}function Vl(){Cl(),fl(),Gi()}function Ul(t=1,e=void 0){Kl(t),nl(e),zl(),Hl()}function Hl(){Sl(),ul(),Mt={}}function Kl(t=1){Tt=t,kl(Tt)}let $n,Bi;const zi=68,Yt=1e3/zi;let Ue=0;const Jl={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let Q,jn=10;function Wl(t,e,n){$n=t,Bi=e,Q={...Jl,...n},ur(Q.theme.isDarkColor),dr(Q.viewSize,Q.bodyBackground,Q.viewBackground,Q.isCapturing,Q.isCapturingGameCanvasOnly,Q.captureCanvasScale,Q.theme),Gr(Q.isSoundEnabled?il:()=>{}),Sr(),$n(),Oi()}function Oi(){requestAnimationFrame(Oi);const t=window.performance.now();t<Ue-zi/12||(Ue+=Yt,(Ue<t||Ue>t+Yt*2)&&(Ue=t+Yt),Q.isSoundEnabled&&Vl(),Tr(),Bi(),Q.isCapturing&&gr(),jn--,jn===0&&wr())}class Xl{constructor(e){N(this,"size",new k);N(this,"letterGrid");N(this,"colorGrid");N(this,"backgroundColorGrid");N(this,"rotationGrid");N(this,"characterGrid");this.size.set(e),this.letterGrid=j(this.size.x).map(()=>j(this.size.y).map(()=>{})),this.colorGrid=j(this.size.x).map(()=>j(this.size.y).map(()=>{})),this.backgroundColorGrid=j(this.size.x).map(()=>j(this.size.y).map(()=>{})),this.rotationGrid=j(this.size.x).map(()=>j(this.size.y).map(()=>{})),this.characterGrid=j(this.size.x).map(()=>j(this.size.y).map(()=>{}))}print(e,n,r,l={}){const o={...et,...l};let s=Math.floor(n),f=Math.floor(r);const g=s;for(let h=0;h<e.length;h++){const y=e[h];if(y===`
`){s=g,f++;continue}if(s<0||s>=this.size.x||f<0||f>=this.size.y){s++;continue}this.letterGrid[s][f]=y,this.colorGrid[s][f]=o.color,this.backgroundColorGrid[s][f]=o.backgroundColor,this.rotationGrid[s][f]=o.rotation,this.characterGrid[s][f]=o.isCharacter,s++}}getCharAt(e,n){if(e<0||e>=this.size.x||n<0||n>=this.size.y)return;const r=Math.floor(e),l=Math.floor(n),o=this.letterGrid[r][l],s=this.colorGrid[r][l],f=this.backgroundColorGrid[r][l],g=this.rotationGrid[r][l],h=this.characterGrid[r][l];return{char:o,options:{color:s,backgroundColor:f,rotation:g,isCharacter:h}}}setCharAt(e,n,r,l){if(e<0||e>=this.size.x||n<0||n>=this.size.y)return;const o={...et,...l},s=Math.floor(e),f=Math.floor(n);this.letterGrid[s][f]=r,this.colorGrid[s][f]=o.color,this.backgroundColorGrid[s][f]=o.backgroundColor,this.rotationGrid[s][f]=o.rotation,this.characterGrid[s][f]=o.isCharacter}draw(){for(let e=0;e<this.size.x;e++)for(let n=0;n<this.size.y;n++){const r=this.letterGrid[e][n];if(r==null)continue;const l=this.colorGrid[e][n],o=this.backgroundColorGrid[e][n],s=this.rotationGrid[e][n],f=this.characterGrid[e][n];pi(r,e*w,n*w,{color:l,backgroundColor:o,rotation:s,isCharacter:f})}}clear(){for(let e=0;e<this.size.x;e++)for(let n=0;n<this.size.y;n++)this.letterGrid[e][n]=this.colorGrid[e][n]=this.backgroundColorGrid[e][n]=this.rotationGrid[e][n]=this.characterGrid[e][n]=void 0}scrollUp(){for(let n=0;n<this.size.x;n++)for(let r=1;r<this.size.y;r++)this.letterGrid[n][r-1]=this.letterGrid[n][r],this.colorGrid[n][r-1]=this.colorGrid[n][r],this.backgroundColorGrid[n][r-1]=this.backgroundColorGrid[n][r],this.rotationGrid[n][r-1]=this.rotationGrid[n][r],this.characterGrid[n][r-1]=this.characterGrid[n][r];const e=this.size.y-1;for(let n=0;n<this.size.x;n++)this.letterGrid[n][e]=this.colorGrid[n][e]=this.backgroundColorGrid[n][e]=this.rotationGrid[n][e]=this.characterGrid[n][e]=void 0}getState(){return{charGrid:this.letterGrid.map(e=>[].concat(e)),colorGrid:this.colorGrid.map(e=>[].concat(e)),backgroundColorGrid:this.backgroundColorGrid.map(e=>[].concat(e)),rotationGrid:this.rotationGrid.map(e=>[].concat(e)),symbolGrid:this.characterGrid.map(e=>[].concat(e))}}setState(e){this.letterGrid=e.charGrid.map(n=>[].concat(n)),this.colorGrid=e.colorGrid.map(n=>[].concat(n)),this.backgroundColorGrid=e.backgroundColorGrid.map(n=>[].concat(n)),this.rotationGrid=e.rotationGrid.map(n=>[].concat(n)),this.characterGrid=e.symbolGrid.map(n=>[].concat(n))}}let wn;new Bt;function Rn(){wn=[]}function Nt(){Pn(),wn=wn.filter(t=>(t.ticks--,t.ticks<0?!1:(t.pos.add(t.vel),t.vel.mul(.98),Ge(t.color),$e(Math.floor(t.pos.x),Math.floor(t.pos.y),1,1),!0))),Fn()}function Ql(t,e,n,r){return qi(!1,t,e,n,r)}function ei(t,e,n,r){return qi(!0,t,e,n,r)}function ti(t,e,n,r,l=.5,o=.5){typeof t!="number"&&(o=l,l=r,r=n,n=e,e=t.y,t=t.x);const s=new k(n).rotate(l),f=new k(t-s.x*o,e-s.y*o);return Vi(f,s,r)}function Yl(t,e,n=3,r=3,l=3){const o=new k,s=new k;if(typeof t=="number")if(typeof e=="number")typeof n=="number"?(o.set(t,e),s.set(n,r)):(o.set(t,e),s.set(n),l=r);else throw"invalid params";else if(typeof e=="number")if(typeof n=="number")o.set(t),s.set(e,n),l=r;else throw"invalid params";else if(typeof n=="number")o.set(t),s.set(e),l=n;else throw"invalid params";return Vi(o,s.sub(o),l)}function qi(t,e,n,r,l){if(typeof e=="number"){if(typeof n=="number")return typeof r=="number"?l==null?me(t,e,n,r,r):me(t,e,n,r,l):me(t,e,n,r.x,r.y);throw"invalid params"}else if(typeof n=="number"){if(r==null)return me(t,e.x,e.y,n,n);if(typeof r=="number")return me(t,e.x,e.y,n,r);throw"invalid params"}else return me(t,e.x,e.y,n.x,n.y)}function Vi(t,e,n,r=!1){let l=!0;(M.name==="shape"||M.name==="shapeDark")&&(Y!=="transparent"&&hr(t.x,t.y,t.x+e.x,t.y+e.y,n),l=!1);const o=Math.floor(Dt(n,3,10)),s=Math.abs(e.x),f=Math.abs(e.y),g=Dt(Math.ceil(s>f?s/o:f/o)+1,3,99);e.div(g-1);let h={isColliding:{rect:{},text:{},char:{}}};for(let y=0;y<g;y++){const S=me(!0,t.x,t.y,n,n,!0,l);h={...h,...di(S.isColliding.rect),isColliding:{rect:{...h.isColliding.rect,...S.isColliding.rect},text:{...h.isColliding.text,...S.isColliding.text},char:{...h.isColliding.char,...S.isColliding.char}}},t.add(e)}return r||yr(),h}function me(t,e,n,r,l,o=!1,s=!0){let f=s;(M.name==="shape"||M.name==="shapeDark")&&f&&Y!=="transparent"&&(t?$e(e-r/2,n-l/2,r,l):$e(e,n,r,l),f=!1);let g=t?{x:Math.floor(e-r/2),y:Math.floor(n-l/2)}:{x:Math.floor(e),y:Math.floor(n)};const h={x:Math.trunc(r),y:Math.trunc(l)};if(h.x===0||h.y===0)return{isColliding:{rect:{},text:{},char:{}}};h.x<0&&(g.x+=h.x,h.x*=-1),h.y<0&&(g.y+=h.y,h.y*=-1);const y={pos:g,size:h,collision:{isColliding:{rect:{}}}};y.collision.isColliding.rect[Y]=!0;const S=fi(y);return Y!=="transparent"&&((o?It:Re).push(y),f&&$e(g.x,g.y,h.x,h.y)),S}let ie,it,oe,_n;const Zl=60*10;function $l(t){ie={randomSeed:t,inputs:[]}}function jl(t){ie.inputs.push(t)}function Ui(){return ie!=null}function eo(t){it=0,t.setSeed(ie.randomSeed)}function to(){it>=ie.inputs.length||(zt(ie.inputs[it]),it++)}function no(){oe=[]}function io(t,e,n){oe.push({randomState:n.getState(),gameState:cloneDeep(t),baseState:cloneDeep(e)}),oe.length>Zl&&oe.shift()}function ro(t){const e=oe.pop(),n=e.randomState;return t.setSeed(n.w,n.x,n.y,n.z,0),_n={pos:new k(Te),isPressed:Ne,isJustPressed:de,isJustReleased:Ee},zt(ie.inputs.pop()),e}function lo(t){const e=oe[oe.length-1],n=e.randomState;return t.setSeed(n.w,n.x,n.y,n.z,0),_n={pos:new k(Te),isPressed:Ne,isJustPressed:de,isJustReleased:Ee},zt(ie.inputs[ie.inputs.length-1]),e}function oo(){zt(_n)}function ao(){return oe.length===0}function so(){const t=it-1;if(!(t>=ie.inputs.length))return oe[t]}const Lt=Math.PI,Fe=Math.sqrt;let U=0,Z=0,ae,se=!1;function St(t=1,e){return Ie.get(t,e)}function Hi(t="GAME OVER"){Ln=t,Mo()}function uo(t,e,n){if(se||(Z+=t,e==null))return;const r=`${t>=1?"+":""}${Math.floor(t)}`;let l=new k;typeof e=="number"?l.set(e,n):l.set(e),l.x-=r.length*w/2,l.y-=w/2,dt.push({str:r,pos:l,vy:-2,ticks:30})}function He(t){Ge(t)}function ce(t,e){return new k(t,e)}function Zt(t){!Be&&!Ce&&Le&&Ti(ho[t])}function co(t){if(Be){const e=lo(Ie),n=e.baseState;return Z=n.score,U=n.ticks,cloneDeep(e.gameState)}else if(Ce){const e=ro(Ie),n=e.baseState;return Z=n.score,U=n.ticks,e.gameState}else{if(se)return so().gameState;Me==="inGame"&&io(t,{score:Z,ticks:U},Ie)}return t}function fo(){Ce||Be||(!se&&Ht?Fo():Hi())}const ho={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r"},ni={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!0,isReplayEnabled:!1,isRewindEnabled:!0,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,recordingScoreInterval:100,viewSize:{x:100,y:100},seed:0,theme:"simple"},po=new Bt,Ie=new Bt;let Me,go={title:Co,inGame:bo,gameOver:Lo,rewind:ko},H,bn=0,Ki,Pt=!0,Ft=0,ye,gt,Ji,Ut,mt,Ht,ft,Cn,Le,Gn,ne,dt,Be=!1,Ce=!1,Mn,Ln,mo,kt;const yo=300;function vo(t){const e=window;e.update=t.update,e.title=t.title,e.description=t.description,e.characters=t.characters,e.options=t.options,So()}function So(){let t;typeof options<"u"&&options!=null?t={...ni,...options}:t=ni;const e={name:t.theme,isUsingPixi:!1,isDarkColor:!1};t.theme!=="simple"&&t.theme!=="dark"&&(e.isUsingPixi=!0),(t.theme==="pixel"||t.theme==="shapeDark"||t.theme==="crt"||t.theme==="dark")&&(e.isDarkColor=!0),ye={viewSize:{x:100,y:100},bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:t.isSoundEnabled},Ft=t.seed,ye.isCapturing=t.isCapturing,ye.isCapturingGameCanvasOnly=t.isCapturingGameCanvasOnly,ye.captureCanvasScale=t.captureCanvasScale,ye.viewSize=t.viewSize,gt=t.isPlayingBgm,Ji=t.isShowingScore,Ut=t.isShowingTime,mt=t.isReplayEnabled,Ht=t.isRewindEnabled,ft=t.isDrawingParticleFront,Cn=t.isDrawingScoreFront,Le=t.isSoundEnabled,Gn=t.recordingScoreInterval,t.isMinifying&&Io(),Wl(xo,wo,ye)}function xo(){typeof description<"u"&&description!=null&&description.trim().length>0&&(Pt=!1,Ft+=li(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(Pt=!1,document.title=title,Ft+=li(title)),typeof characters<"u"&&characters!=null&&xr(characters,"a"),Le&&Ul(Ft);const t=ye.viewSize;ne={x:Math.floor(t.x/6),y:Math.floor(t.y/6)},H=new Xl(ne),Ge("black"),Pt?(Tn(),U=0):Wi()}function wo(){const t=Z,e=ae;xt=Z;const n=xt;mr(),go[Me](),M.isUsingPixi&&(ht(),M.name==="crt"&&pr()),U++,se?(Z=t,ae=e):xt!==n&&(Z=xt)}function Tn(){Me="inGame",U=-1,Rn(),Z=0,ae=0,kt=Gn,dt=[],gt&&Le&&Ni(),Vt(1);const t=po.getInt(999999999);Ie.setSeed(t),(mt||Ht)&&($l(t),no(),se=!1)}function bo(){H.clear(),Et(),ft||Nt(),Cn||ri(),(mt||Ht)&&jl({pos:ce(Te),isPressed:Ne,isJustPressed:de,isJustReleased:Ee}),update(),ft&&Nt(),Cn&&ri(),Z>=kt&&(Ao(ae,kt),kt+=Gn),Nn(),H.draw(),Ut&&ae!=null&&ae++}function Wi(){Me="title",U=-1,Rn(),H.clear(),Et(),Ui()&&(eo(Ie),se=!0)}function Co(){if(de){Tn();return}if(Et(),mt&&Ui()&&(to(),ft||Nt(),update(),ft&&Nt()),U===0&&(Nn(),typeof title<"u"&&title!=null&&H.print(title,Math.floor(ne.x-title.length)/2,Math.ceil(ne.y*.2))),(U===30||U==40)&&typeof description<"u"&&description!=null){let t=0;description.split(`
`).forEach(n=>{n.length>t&&(t=n.length)});const e=Math.floor((ne.x-t)/2);description.split(`
`).forEach((n,r)=>{H.print(n,e,Math.floor(ne.y/2)+r)})}H.draw()}function Mo(){Me="gameOver",se||Nr(),U=-1,Be=Ce=!1,Po(),gt&&Le&&Ei(),_i()}function Lo(){(se||U>20)&&de?Tn():U===(mt?120:300)&&!Pt&&Wi()}function Po(){se||(H.print(Ln,Math.floor((ne.x-Ln.length)/2),Math.floor(ne.y/2)),H.draw())}function Fo(){Me="rewind",Be=!0,Mn=0,gt&&Le&&Ei(),Vt(.3)}function ko(){H.clear(),Et(),update(),Nn(),oo(),Ce?(ao()||!Ne)&&Do():de?(Ce=!0,Be=!1):(Mn++,Mn>yo&&Hi()),H.draw(),Ut&&ae!=null&&ae++}function Do(){Ce=!1,Me="inGame",Rn(),dt=[],gt&&Le&&Ni(),Vt(1)}function Nn(){if(Ji&&(Z>0&&H.print(`${Math.floor(Z)}`,0,0),bn>0)){const t=`${bn}`;H.print(t,ne.x-t.length,0)}Ut&&(ii(ae,0,1),ii(Ki,ne.x-8,1))}function ii(t,e,n){if(t==null)return;let r=Math.floor(t*100/50);r>=100*60*100&&(r-=100*60*100);const l=$t(Math.floor(r/6e3),2)+"'"+$t(Math.floor(r%6e3/100),2)+'"'+$t(Math.floor(r%100),2);H.print(l,e,n)}function $t(t,e){return("0000"+t).slice(-e)}function Ao(t,e){Ti("select_recording_time",2,82),Ki=t,bn=e}function ri(){Pn(),Ge("black"),dt=dt.filter(t=>(br(t.str,t.pos.x,t.pos.y),t.pos.y+=t.vy,t.vy*=.9,t.ticks--,t.ticks>0)),Fn()}function li(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);e=(e<<5)-e+r,e|=0}return e}function Io(){fetch(mo).then(t=>t.text()).then(t=>{const e=Terser.minify(t+"update();",{toplevel:!0}).code,n="function(){",r=e.indexOf(n),l="options={",o=e.indexOf(l);let s=e;if(r>=0)s=e.substring(e.indexOf(n)+n.length,e.length-4);else if(o>=0){let f=1,g;for(let h=o+l.length;h<e.length;h++){const y=e.charAt(h);if(y==="{")f++;else if(y==="}"&&(f--,f===0)){g=h+2;break}}f===0&&(s=e.substring(g))}Ro.forEach(([f,g])=>{s=s.split(f).join(g)}),console.log(s),console.log(`${s.length} letters`)})}let xt,Ro=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];const _o="BOMB RAIN",Go=`
[Hold]
 Aim / Rewind
[Release]
 Fire missile
`,To=[];let ge,ke,G,ee,De;function jt(){G={pos:ce(60,90),angle:-Lt/2,angleVel:1,speed:0}}let Ke;function No(){({bombs:ge,nextBombTicks:ke,missile:G,turretAngle:ee,multiplier:De,diff:Ke}=co({bombs:ge,nextBombTicks:ke,missile:G,turretAngle:ee,multiplier:De,diff:Ke})),U||(xi(120),ml(),Ol("bgm.mp3"),ge=[],ke=0,jt(),ee=-Lt/2,De=1,Ke=1),Ke+=1/(60*60);const t=Fe(Ke);if(He("light_black"),Ql(0,90,120,9),G.speed===0&&(ee=ce(60,90).angleTo(Te),ee>Lt/2?ee=-Lt:ee>0&&(ee=0),He("blue"),Yl(60,90,ce(50,90).addWithAngle(ee,99),2)),ke--,ke<0){const e=ce(St(20,100),-3),n=ce(St(30,90),90);ge.push({pos:e,vel:n.sub(e).normalize().mul(St(1,2)*Fe(t)*.1),radius:0,radiusVel:0}),ke=St(10,30)/t}He("red"),ge.forEach(e=>{e.radius!==0&&ei(e.pos,e.radius,e.radius)}),He("purple"),or(ge,e=>{if(e.pos.add(e.vel),e.radius!==0){if(e.vel.mul(1-.02*Fe(t)),e.radius+=e.radiusVel,e.radius<0)return!0;e.radiusVel>0&&e.radius>20&&(e.radiusVel*=-1)}else{const n=ei(e.pos,6,6).isColliding.rect;n.red&&(Zt("explosion"),e.radius=1,e.radiusVel=Fe(t),uo(De,e.pos),De++),n.light_black&&(Zt("lucky"),fo())}}),He("cyan"),G.speed===0?(G.angle=ee,ti(G.pos,5,3,G.angle,0),Ee&&(Zt("select"),G.speed=Fe(t)*3,De=1)):(G.pos.addWithAngle(G.angle,G.speed),ti(G.pos,5,3,G.angle,0).isColliding.rect.purple?(ge.push({pos:ce(G.pos),vel:ce().addWithAngle(G.angle,G.speed*.3),radius:9,radiusVel:-Fe(t)*.3}),jt()):G.pos.isInRect(-9,-9,118,118)||jt())}vo({update:No,title:_o,description:Go,characters:To,options:{theme:"shapeDark",viewSize:{x:120,y:100},isDrawingScoreFront:!0,seed:2}});
