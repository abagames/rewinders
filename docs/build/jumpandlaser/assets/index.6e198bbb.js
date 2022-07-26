var ar=Object.defineProperty;var sr=(t,e,n)=>e in t?ar(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var N=(t,e,n)=>(sr(t,typeof e!="symbol"?e+"":e,n),n);const ur=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}};ur();function nn(t,e=0,n=1){return Math.max(e,Math.min(t,n))}function rn(t,e,n){const r=n-e,l=t-e;if(l>=0)return l%r+e;{let o=r+l%r+e;return o>=n&&(o-=r),o}}function It(t,e,n){return e<=t&&t<n}function $(t){return[...Array(t).keys()]}function Un(t,e){return $(t).map(n=>e(n))}function Hn(t,e){let n=[];for(let r=0,l=0;r<t.length;l++)e(t[r],l)?(n.push(t[r]),t.splice(r,1)):r++;return n}function hi(t){return[...t].reduce((e,[n,r])=>(e[n]=r,e),{})}function di(t){return Object.keys(t).map(e=>[e,t[e]])}function He(t){return t.x!=null&&t.y!=null}class F{constructor(e,n){N(this,"x",0);N(this,"y",0);this.set(e,n)}set(e=0,n=0){return He(e)?(this.x=e.x,this.y=e.y,this):(this.x=e,this.y=n,this)}add(e,n){return He(e)?(this.x+=e.x,this.y+=e.y,this):(this.x+=e,this.y+=n,this)}sub(e,n){return He(e)?(this.x-=e.x,this.y-=e.y,this):(this.x-=e,this.y-=n,this)}mul(e){return this.x*=e,this.y*=e,this}div(e){return this.x/=e,this.y/=e,this}clamp(e,n,r,l){return this.x=nn(this.x,e,n),this.y=nn(this.y,r,l),this}wrap(e,n,r,l){return this.x=rn(this.x,e,n),this.y=rn(this.y,r,l),this}addWithAngle(e,n){return this.x+=Math.cos(e)*n,this.y+=Math.sin(e)*n,this}swapXy(){const e=this.x;return this.x=this.y,this.y=e,this}normalize(){return this.div(this.length),this}rotate(e){if(e===0)return this;const n=this.x;return this.x=n*Math.cos(e)-this.y*Math.sin(e),this.y=n*Math.sin(e)+this.y*Math.cos(e),this}angleTo(e,n){return He(e)?Math.atan2(e.y-this.y,e.x-this.x):Math.atan2(n-this.y,e-this.x)}distanceTo(e,n){let r,l;return He(e)?(r=e.x-this.x,l=e.y-this.y):(r=e-this.x,l=n-this.y),Math.sqrt(r*r+l*l)}isInRect(e,n,r,l){return It(this.x,e,e+r)&&It(this.y,n,n+l)}equals(e){return this.x===e.x&&this.y===e.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const pi=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],cr="twrgybpclRGYBPCL";let $e;const fr=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function hr(t){const[e,n,r]=Yt(0,t);if($e=hi(pi.map((l,o)=>{if(o<1)return[l,{r:0,g:0,b:0,a:0}];if(o<9){const[d,v,x]=Yt(o-1,t);return[l,{r:d,g:v,b:x,a:1}]}const[s,h,g]=Yt(o-9+1,t);return[l,{r:Math.floor(t?s*.5:e-(e-s)*.5),g:Math.floor(t?h*.5:r-(r-h)*.5),b:Math.floor(t?g*.5:n-(n-g)*.5),a:1}]})),t){const l=$e.blue;$e.white={r:Math.floor(l.r*.15),g:Math.floor(l.g*.15),b:Math.floor(l.b*.15),a:1}}}function Yt(t,e){e&&(t===0?t=7:t===7&&(t=0));const n=fr[t];return[(n&16711680)>>16,(n&65280)>>8,n&255]}function At(t,e=1){const n=$e[t];return Math.floor(n.r*e)<<16|Math.floor(n.g*e)<<8|Math.floor(n.b*e)}function at(t,e=1){const n=$e[t],r=Math.floor(n.r*e),l=Math.floor(n.g*e),o=Math.floor(n.b*e);return n.a<1?`rgba(${r},${l},${o},${n.a})`:`rgb(${r},${l},${o})`}const dr=`
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
`;function pr(t,e){return new PIXI.Filter(void 0,dr,{width:t,height:e})}const we=new F;let E,oe,G,R=new F;const Vn=5;document.createElement("img");let D,je,et=1,ln="black",ee,gi,Pe=!1,k,mi;function gr(t,e,n,r,l,o,s){we.set(t),k=s,ln=n;const h=`
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
`,d=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=h,R.set(we),k.isUsingPixi){R.mul(Vn);const x=new PIXI.Application({width:R.x,height:R.y});if(E=x.view,G=new PIXI.Graphics,G.scale.x=G.scale.y=Vn,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,x.stage.addChild(G),G.filters=[],k.name==="crt"&&G.filters.push(mi=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),k.name==="pixel"&&G.filters.push(pr(R.x,R.y)),k.name==="pixel"||k.name==="shapeDark"){const M=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:k.name==="pixel"?1.5:1,brightness:k.name==="pixel"?1.5:1,blur:8});G.filters.push(M)}G.lineStyle(0),E.style.cssText=g}else E=document.createElement("canvas"),E.width=R.x,E.height=R.y,oe=E.getContext("2d"),oe.imageSmoothingEnabled=!1,E.style.cssText=g+d;document.body.appendChild(E);const v=()=>{const M=innerWidth/innerHeight,C=R.x/R.y,K=M<C,I=K?.95*innerWidth:.95*innerHeight*C,O=K?.95*innerWidth/C:.95*innerHeight;E.style.width=`${I}px`,E.style.height=`${O}px`};if(window.addEventListener("resize",v),v(),r){D=document.createElement("canvas");let x;l?(D.width=R.x,D.height=R.y,x=o):(R.x<=R.y*2?(D.width=R.y*2,D.height=R.y):(D.width=R.x,D.height=R.x/2),D.width>400&&(et=400/D.width,D.width=400,D.height*=et),x=Math.round(400/D.width)),je=D.getContext("2d"),je.fillStyle=e,gcc.setOptions({scale:x,capturingFps:60,isSmoothingEnabled:!1})}}function zt(){if(k.isUsingPixi){G.clear(),Pe=!1,_t(At(ln,k.isDarkColor?.15:1)),G.drawRect(0,0,we.x,we.y),Ot(),Pe=!1;return}oe.fillStyle=at(ln,k.isDarkColor?.15:1),oe.fillRect(0,0,we.x,we.y),oe.fillStyle=at(ee)}function ze(t){if(t===ee){k.isUsingPixi&&!Pe&&_t(At(ee));return}if(ee=t,k.isUsingPixi){Pe&&G.endFill(),_t(At(ee));return}oe.fillStyle=at(t)}function _t(t){Ot(),G.beginFill(t),Pe=!0}function Ot(){Pe&&(G.endFill(),Pe=!1)}function Fn(){gi=ee}function Dn(){ze(gi)}function tt(t,e,n,r){if(k.isUsingPixi){k.name==="shape"||k.name==="shapeDark"?G.drawRoundedRect(t,e,n,r,2):G.drawRect(t,e,n,r);return}oe.fillRect(t,e,n,r)}function mr(){mi.time+=.2}function yr(){if(je.fillRect(0,0,D.width,D.height),et===1)je.drawImage(E,(D.width-E.width)/2,(D.height-E.height)/2);else{const t=E.width*et,e=E.height*et;je.drawImage(E,(D.width-t)/2,(D.height-e)/2,t,e)}gcc.capture(D)}const Kn=[`
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

`];let qt,yi;function vr(){qt=[],yi=[]}function vi(t){let e={isColliding:{rect:{},text:{},char:{}}};return qt.forEach(n=>{Sr(t,n)&&(e={...e,...xr(n.collision.isColliding.rect),isColliding:{rect:{...e.isColliding.rect,...n.collision.isColliding.rect},text:{...e.isColliding.text,...n.collision.isColliding.text},char:{...e.isColliding.char,...n.collision.isColliding.char}}})}),e}function Sr(t,e){const n=e.pos.x-t.pos.x,r=e.pos.y-t.pos.y;return-e.size.x<n&&n<t.size.x&&-e.size.y<r&&r<t.size.y}function xr(t){if(t==null)return{};const e={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let n={};return di(t).forEach(([r,l])=>{const o=e[r];l&&o!=null&&(n[o]=!0)}),n}const Qe=6,Ye=1,w=Qe*Ye;let Si,In,on,an=!1,de,Ce,nt,Ct;const it={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function wr(){de=document.createElement("canvas"),de.width=de.height=w,Ce=de.getContext("2d"),nt=document.createElement("canvas"),Ct=nt.getContext("2d"),Si=Kn.map((t,e)=>({...sn(t),hitBox:Rt(String.fromCharCode(33+e),!1)})),In=Kn.map((t,e)=>({...sn(t),hitBox:Rt(String.fromCharCode(33+e),!0)})),on={}}function br(t,e){const n=e.charCodeAt(0)-33;t.forEach((r,l)=>{In[n+l]={...sn(r),hitBox:Rt(String.fromCharCode(33+n+l),!0)}})}function Cr(){an=!0}function Mr(t,e,n,r={}){const l=wi(r);e-=w/2*l.scale.x,n-=w/2*l.scale.y;const o=Math.floor(e);let s=t,h=o,g=Math.floor(n),d={isColliding:{rect:{},text:{},char:{}}};for(let v=0;v<s.length;v++){const x=s[v];if(x===`
`){h=o,g+=w*l.scale.y;continue}const M=xi(x,h,g,l);l.isCheckingCollision&&(d={isColliding:{rect:{...d.isColliding.rect,...M.isColliding.rect},text:{...d.isColliding.text,...M.isColliding.text},char:{...d.isColliding.char,...M.isColliding.char}}}),h+=w*l.scale.x}return d}function xi(t,e,n,r){const l=t.charCodeAt(0);if(l<32||l>126)return{isColliding:{rect:{},text:{},char:{}}};const o=wi(r);if(o.backgroundColor!=="transparent"&&(Fn(),ze(o.backgroundColor),tt(e,n,w*o.scale.x,w*o.scale.y),Dn()),l<=32)return{isColliding:{rect:{},text:{},char:{}}};const s=l-33,h=o.isCharacter?In[s]:Si[s],g=rn(o.rotation,0,4);if(o.color==="black"&&g===0&&o.mirror.x===1&&o.mirror.y===1&&(!k.isUsingPixi||o.scale.x===1&&o.scale.y===1))return Zt(h,e,n,o.scale,o.isCheckingCollision,!0);const d=JSON.stringify({c:t,options:o}),v=on[d];if(v!=null)return Zt(v,e,n,o.scale,o.isCheckingCollision,o.color!=="transparent");let x=!1;k.isUsingPixi&&(o.scale.x!==1||o.scale.y!==1)&&(nt.width=w*o.scale.x,nt.height=w*o.scale.y,Ct.imageSmoothingEnabled=!1,Ct.scale(o.scale.x,o.scale.y),Jn(Ct,g,o,h),x=!0),Ce.clearRect(0,0,w,w),Jn(Ce,g,o,h);const M=Rt(t,o.isCharacter);let C;if(an||k.isUsingPixi){const K=document.createElement("img");if(K.src=de.toDataURL(),k.isUsingPixi){const I=document.createElement("img");I.src=(x?nt:de).toDataURL(),C=PIXI.Texture.from(I)}an&&(on[d]={image:K,texture:C,hitBox:M})}return Zt({image:de,texture:C,hitBox:M},e,n,o.scale,o.isCheckingCollision,o.color!=="transparent")}function Jn(t,e,n,r){e===0&&n.mirror.x===1&&n.mirror.y===1?t.drawImage(r.image,0,0):(t.save(),t.translate(w/2,w/2),t.rotate(Math.PI/2*e),(n.mirror.x===-1||n.mirror.y===-1)&&t.scale(n.mirror.x,n.mirror.y),t.drawImage(r.image,-w/2,-w/2),t.restore()),n.color!=="black"&&(t.globalCompositeOperation="source-in",t.fillStyle=at(n.color==="transparent"?"black":n.color),t.fillRect(0,0,w,w),t.globalCompositeOperation="source-over")}function Zt(t,e,n,r,l,o){if(o&&(r.x===1&&r.y===1?Wn(t,e,n):Wn(t,e,n,w*r.x,w*r.y)),!l)return;const s={pos:{x:e+t.hitBox.pos.x*r.x,y:n+t.hitBox.pos.y*r.y},size:{x:t.hitBox.size.x*r.x,y:t.hitBox.size.y*r.y},collision:t.hitBox.collision},h=vi(s);return o&&qt.push(s),h}function Wn(t,e,n,r,l){if(k.isUsingPixi){Ot(),G.beginTextureFill({texture:t.texture,matrix:new PIXI.Matrix().translate(e,n)}),G.drawRect(e,n,r==null?w:r,l==null?w:l),_t(At(ee));return}r==null?oe.drawImage(t.image,e,n):oe.drawImage(t.image,e,n,r,l)}function sn(t,e=!0){Ce.clearRect(0,0,w,w);let n=t.split(`
`);e&&(n=n.slice(1,n.length-1));let r=0;n.forEach(g=>{r=Math.max(g.length,r)});const l=Math.max(Math.ceil((Qe-r)/2),0),o=n.length,s=Math.max(Math.ceil((Qe-o)/2),0);n.forEach((g,d)=>{if(!(d+s>=Qe))for(let v=0;v<Qe-l;v++){const x=g.charAt(v);let M=cr.indexOf(x);x!==""&&M>=1&&(Ce.fillStyle=at(pi[M]),Ce.fillRect((v+l)*Ye,(d+s)*Ye,Ye,Ye))}});const h=document.createElement("img");return h.src=de.toDataURL(),k.isUsingPixi?{image:h,texture:PIXI.Texture.from(h)}:{image:h}}function Rt(t,e){const n={pos:new F(w,w),size:new F,collision:{isColliding:{char:{},text:{}}}};e?n.collision.isColliding.char[t]=!0:n.collision.isColliding.text[t]=!0;const r=Ce.getImageData(0,0,w,w).data;let l=0;for(let o=0;o<w;o++)for(let s=0;s<w;s++)r[l+3]>0&&(s<n.pos.x&&(n.pos.x=s),o<n.pos.y&&(n.pos.y=o)),l+=4;l=0;for(let o=0;o<w;o++)for(let s=0;s<w;s++)r[l+3]>0&&(s>n.pos.x+n.size.x-1&&(n.size.x=s-n.pos.x+1),o>n.pos.y+n.size.y-1&&(n.size.y=o-n.pos.y+1)),l+=4;return n}function wi(t){let e={...it,...t};return t.scale!=null&&(e.scale={...it.scale,...t.scale}),t.mirror!=null&&(e.mirror={...it.mirror,...t.mirror}),e}let rt=!1,An=!1,bi=!1;const Pr=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let Ci;const Lr={onKeyDown:void 0};let $t,un=!1,cn=!1,fn=!1,hn={},dn={},pn={};function kr(t){$t={...Lr,...t},Ci=hi(Pr.map(e=>[e,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",e=>{un=cn=!0,hn[e.code]=dn[e.code]=!0,$t.onKeyDown!=null&&$t.onKeyDown(),(e.code==="AltLeft"||e.code==="AltRight"||e.code==="ArrowRight"||e.code==="ArrowDown"||e.code==="ArrowLeft"||e.code==="ArrowUp")&&e.preventDefault()}),document.addEventListener("keyup",e=>{un=!1,fn=!0,hn[e.code]=!1,pn[e.code]=!0})}function Fr(){An=!rt&&cn,bi=rt&&fn,cn=fn=!1,rt=un,di(Ci).forEach(([t,e])=>{e.isJustPressed=!e.isPressed&&dn[t],e.isJustReleased=e.isPressed&&pn[t],e.isPressed=!!hn[t]}),dn={},pn={}}function Dr(){An=!1,rt=!0}class Ut{constructor(e=null){N(this,"x");N(this,"y");N(this,"z");N(this,"w");this.setSeed(e)}get(e=1,n){return n==null&&(n=e,e=0),this.next()/4294967295*(n-e)+e}getInt(e,n){n==null&&(n=e,e=0);const r=Math.floor(e),l=Math.floor(n);return l===r?r:this.next()%(l-r)+r}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,n=123456789,r=362436069,l=521288629,o=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=n>>>0,this.y=r>>>0,this.z=l>>>0;for(let s=0;s<o;s++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}const Mt=new F;let he=!1,Gt=!1,gn=!1,Ir={isDebugMode:!1,anchor:new F,padding:new F,onPointerDownOrUp:void 0},U,j,B;const Ve=new Ut,xe=new F,re=new F;let lt=!1,st=new F,_n=!1,mn=!1,yn=!1;function Ar(t,e,n){B={...Ir,...n},U=t,j=new F(e.x+B.padding.x*2,e.y+B.padding.y*2),st.set(U.offsetLeft+U.clientWidth*(.5-B.anchor.x),U.offsetTop+U.clientWidth*(.5-B.anchor.y)),B.isDebugMode&&xe.set(U.offsetLeft+U.clientWidth*(.5-B.anchor.x),U.offsetTop+U.clientWidth*(.5-B.anchor.y)),document.addEventListener("mousedown",r=>{Xn(r.pageX,r.pageY)}),document.addEventListener("touchstart",r=>{Xn(r.touches[0].pageX,r.touches[0].pageY)}),document.addEventListener("mousemove",r=>{Qn(r.pageX,r.pageY)}),document.addEventListener("touchmove",r=>{r.preventDefault(),Qn(r.touches[0].pageX,r.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",r=>{Yn()}),document.addEventListener("touchend",r=>{r.preventDefault(),r.target.click(),Yn()},{passive:!1})}function _r(){Gr(st.x,st.y,Mt),B.isDebugMode&&!Mt.isInRect(0,0,j.x,j.y)?(Tr(),Mt.set(xe),Gt=!he&&lt,gn=he&&!lt,he=lt):(Gt=!he&&mn,gn=he&&yn,he=_n),mn=yn=!1}function Rr(){Gt=!1,he=!0}function Gr(t,e,n){U!=null&&(n.x=Math.round(((t-U.offsetLeft)/U.clientWidth+B.anchor.x)*j.x-B.padding.x),n.y=Math.round(((e-U.offsetTop)/U.clientHeight+B.anchor.y)*j.y-B.padding.y))}function Tr(){re.length>0?(xe.add(re),!It(xe.x,-j.x*.1,j.x*1.1)&&xe.x*re.x>0&&(re.x*=-1),!It(xe.y,-j.y*.1,j.y*1.1)&&xe.y*re.y>0&&(re.y*=-1),Ve.get()<.05&&re.set(0)):Ve.get()<.1&&(re.set(0),re.addWithAngle(Ve.get(Math.PI*2),(j.x+j.y)*Ve.get(.01,.03))),Ve.get()<.05&&(lt=!lt)}function Xn(t,e){st.set(t,e),_n=mn=!0,B.onPointerDownOrUp!=null&&B.onPointerDownOrUp()}function Qn(t,e){st.set(t,e)}function Yn(t){_n=!1,yn=!0,B.onPointerDownOrUp!=null&&B.onPointerDownOrUp()}let pt=new F,ke=!1,ue=!1,gt=!1;function Nr(t){kr({onKeyDown:t}),Ar(E,we,{onPointerDownOrUp:t,anchor:new F(.5,.5)})}function Er(){Fr(),_r(),pt=Mt,ke=rt||he,ue=An||Gt,gt=bi||gn}function Br(){Dr(),Rr()}function Ht(t){pt.set(t.pos),ke=t.isPressed,ue=t.isJustPressed,gt=t.isJustReleased}var zr={exports:{}},Mi={Note:"Note",Rest:"Rest",Octave:"Octave",OctaveShift:"OctaveShift",NoteLength:"NoteLength",NoteVelocity:"NoteVelocity",NoteQuantize:"NoteQuantize",Tempo:"Tempo",InfiniteLoop:"InfiniteLoop",LoopBegin:"LoopBegin",LoopExit:"LoopExit",LoopEnd:"LoopEnd"},Or={tempo:120,octave:4,length:4,velocity:100,quantize:75,loopCount:2},qr=function(){function t(e,n){for(var r=0;r<n.length;r++){var l=n[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function Ur(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Hr=function(){function t(e){Ur(this,t),this.source=e,this.index=0}return qr(t,[{key:"hasNext",value:function(){return this.index<this.source.length}},{key:"peek",value:function(){return this.source.charAt(this.index)||""}},{key:"next",value:function(){return this.source.charAt(this.index++)||""}},{key:"forward",value:function(){for(;this.hasNext()&&this.match(/\s/);)this.index+=1}},{key:"match",value:function(n){return n instanceof RegExp?n.test(this.peek()):this.peek()===n}},{key:"expect",value:function(n){this.match(n)||this.throwUnexpectedToken(),this.index+=1}},{key:"scan",value:function(n){var r=this.source.substr(this.index),l=null;if(n instanceof RegExp){var o=n.exec(r);o&&o.index===0&&(l=o[0])}else r.substr(0,n.length)===n&&(l=n);return l&&(this.index+=l.length),l}},{key:"throwUnexpectedToken",value:function(){var n=this.peek()||"ILLEGAL";throw new SyntaxError("Unexpected token: "+n)}}]),t}(),Vr=Hr,Kr=function(){function t(e,n){for(var r=0;r<n.length;r++){var l=n[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function Jr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var W=Mi,Wr=Vr,Xr={c:0,d:2,e:4,f:5,g:7,a:9,b:11},Qr=function(){function t(e){Jr(this,t),this.scanner=new Wr(e)}return Kr(t,[{key:"parse",value:function(){var n=this,r=[];return this._readUntil(";",function(){r=r.concat(n.advance())}),r}},{key:"advance",value:function(){switch(this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":return this.readNote();case"[":return this.readChord();case"r":return this.readRest();case"o":return this.readOctave();case">":return this.readOctaveShift(1);case"<":return this.readOctaveShift(-1);case"l":return this.readNoteLength();case"q":return this.readNoteQuantize();case"v":return this.readNoteVelocity();case"t":return this.readTempo();case"$":return this.readInfiniteLoop();case"/":return this.readLoop()}this.scanner.throwUnexpectedToken()}},{key:"readNote",value:function(){return{type:W.Note,noteNumbers:[this._readNoteNumber(0)],noteLength:this._readLength()}}},{key:"readChord",value:function(){var n=this;this.scanner.expect("[");var r=[],l=0;return this._readUntil("]",function(){switch(n.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":r.push(n._readNoteNumber(l));break;case">":n.scanner.next(),l+=12;break;case"<":n.scanner.next(),l-=12;break;default:n.scanner.throwUnexpectedToken()}}),this.scanner.expect("]"),{type:W.Note,noteNumbers:r,noteLength:this._readLength()}}},{key:"readRest",value:function(){return this.scanner.expect("r"),{type:W.Rest,noteLength:this._readLength()}}},{key:"readOctave",value:function(){return this.scanner.expect("o"),{type:W.Octave,value:this._readArgument(/\d+/)}}},{key:"readOctaveShift",value:function(n){return this.scanner.expect(/<|>/),{type:W.OctaveShift,direction:n|0,value:this._readArgument(/\d+/)}}},{key:"readNoteLength",value:function(){return this.scanner.expect("l"),{type:W.NoteLength,noteLength:this._readLength()}}},{key:"readNoteQuantize",value:function(){return this.scanner.expect("q"),{type:W.NoteQuantize,value:this._readArgument(/\d+/)}}},{key:"readNoteVelocity",value:function(){return this.scanner.expect("v"),{type:W.NoteVelocity,value:this._readArgument(/\d+/)}}},{key:"readTempo",value:function(){return this.scanner.expect("t"),{type:W.Tempo,value:this._readArgument(/\d+(\.\d+)?/)}}},{key:"readInfiniteLoop",value:function(){return this.scanner.expect("$"),{type:W.InfiniteLoop}}},{key:"readLoop",value:function(){var n=this;this.scanner.expect("/"),this.scanner.expect(":");var r={type:W.LoopBegin},l={type:W.LoopEnd},o=[];return o=o.concat(r),this._readUntil(/[|:]/,function(){o=o.concat(n.advance())}),o=o.concat(this._readLoopExit()),this.scanner.expect(":"),this.scanner.expect("/"),r.value=this._readArgument(/\d+/)||null,o=o.concat(l),o}},{key:"_readUntil",value:function(n,r){for(;this.scanner.hasNext()&&(this.scanner.forward(),!(!this.scanner.hasNext()||this.scanner.match(n)));)r()}},{key:"_readArgument",value:function(n){var r=this.scanner.scan(n);return r!==null?+r:null}},{key:"_readNoteNumber",value:function(n){var r=Xr[this.scanner.next()];return r+this._readAccidental()+n}},{key:"_readAccidental",value:function(){return this.scanner.match("+")?1*this.scanner.scan(/\++/).length:this.scanner.match("-")?-1*this.scanner.scan(/\-+/).length:0}},{key:"_readDot",value:function(){for(var n=(this.scanner.scan(/\.+/)||"").length,r=new Array(n),l=0;l<n;l++)r[l]=0;return r}},{key:"_readLength",value:function(){var n=[];n=n.concat(this._readArgument(/\d+/)),n=n.concat(this._readDot());var r=this._readTie();return r&&(n=n.concat(r)),n}},{key:"_readTie",value:function(){return this.scanner.forward(),this.scanner.match("^")?(this.scanner.next(),this._readLength()):null}},{key:"_readLoopExit",value:function(){var n=this,r=[];if(this.scanner.match("|")){this.scanner.next();var l={type:W.LoopExit};r=r.concat(l),this._readUntil(":",function(){r=r.concat(n.advance())})}return r}}]),t}(),Yr=Qr,Zr=function(){function t(e,n){for(var r=0;r<n.length;r++){var l=n[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function $r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var q=Mi,X=Or,jr=Yr,el=typeof Symbol<"u"?Symbol.iterator:"@@iterator",tl=function(){function t(e){$r(this,t),this.source=e,this._commands=new jr(e).parse(),this._commandIndex=0,this._processedTime=0,this._iterator=null,this._octave=X.octave,this._noteLength=[X.length],this._velocity=X.velocity,this._quantize=X.quantize,this._tempo=X.tempo,this._infiniteLoopIndex=-1,this._loopStack=[],this._done=!1}return Zr(t,[{key:"hasNext",value:function(){return this._commandIndex<this._commands.length}},{key:"next",value:function(){if(this._done)return{done:!0,value:null};if(this._iterator){var n=this._iterator.next();if(!n.done)return n}var r=this._forward(!0);if(Zn(r))this._iterator=this[r.type](r);else return this._done=!0,{done:!1,value:{type:"end",time:this._processedTime}};return this.next()}},{key:el,value:function(){return this}},{key:"_forward",value:function(n){for(;this.hasNext()&&!Zn(this._commands[this._commandIndex]);){var r=this._commands[this._commandIndex++];this[r.type](r)}return n&&!this.hasNext()&&this._infiniteLoopIndex!==-1?(this._commandIndex=this._infiniteLoopIndex,this._forward(!1)):this._commands[this._commandIndex++]||{}}},{key:"_calcDuration",value:function(n){var r=this;n[0]===null&&(n=this._noteLength.concat(n.slice(1)));var l=null,o=0;return n=n.map(function(s){switch(s){case null:s=l;break;case 0:s=o*=2;break;default:l=o=s;break}var h=s!==null?s:X.length;return 60/r._tempo*(4/h)}),n.reduce(function(s,h){return s+h},0)}},{key:"_calcNoteNumber",value:function(n){return n+this._octave*12+12}},{key:q.Note,value:function(n){var r=this,l="note",o=this._processedTime,s=this._calcDuration(n.noteLength),h=n.noteNumbers.map(function(v){return r._calcNoteNumber(v)}),g=this._quantize,d=this._velocity;return this._processedTime=this._processedTime+s,nl(h.map(function(v){return{type:l,time:o,duration:s,noteNumber:v,velocity:d,quantize:g}}))}},{key:q.Rest,value:function(n){var r=this._calcDuration(n.noteLength);this._processedTime=this._processedTime+r}},{key:q.Octave,value:function(n){this._octave=n.value!==null?n.value:X.octave}},{key:q.OctaveShift,value:function(n){var r=n.value!==null?n.value:1;this._octave+=r*n.direction}},{key:q.NoteLength,value:function(n){var r=n.noteLength.map(function(l){return l!==null?l:X.length});this._noteLength=r}},{key:q.NoteVelocity,value:function(n){this._velocity=n.value!==null?n.value:X.velocity}},{key:q.NoteQuantize,value:function(n){this._quantize=n.value!==null?n.value:X.quantize}},{key:q.Tempo,value:function(n){this._tempo=n.value!==null?n.value:X.tempo}},{key:q.InfiniteLoop,value:function(){this._infiniteLoopIndex=this._commandIndex}},{key:q.LoopBegin,value:function(n){var r=n.value!==null?n.value:X.loopCount,l=this._commandIndex,o=-1;this._loopStack.push({loopCount:r,loopTopIndex:l,loopOutIndex:o})}},{key:q.LoopExit,value:function(){var n=this._loopStack[this._loopStack.length-1],r=this._commandIndex;n.loopCount<=1&&n.loopOutIndex!==-1&&(r=n.loopOutIndex),this._commandIndex=r}},{key:q.LoopEnd,value:function(){var n=this._loopStack[this._loopStack.length-1],r=this._commandIndex;n.loopOutIndex===-1&&(n.loopOutIndex=this._commandIndex),n.loopCount-=1,0<n.loopCount?r=n.loopTopIndex:this._loopStack.pop(),this._commandIndex=r}}]),t}();function nl(t){var e=0;return{next:function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}}}}function Zn(t){return t.type===q.Note||t.type===q.Rest}var il=tl;(function(t){t.exports=il})(zr);var ut={};(function(t){var e=+Math.PI*2,n=16,r=1,l=Math.sin,o=Math.pow,s=Math.abs,h=1e-6,g=window.AudioContext||window.webkitAudioContext;t.SampleRate=0,t.Sec=0,t.SetSampleRate=function(i){t.SampleRate=i|0,t.Sec=i|0},t.SetSampleRate(er()),t.Live=function(){var i={};return i._generate=function(a){var u=new M(a,t.DefaultModules),f=Ue(u.getSamplesLeft());return u.generate(f),f},i},t.Module={},t.G={};var d=t.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function v(i,a){return i.stage-a.stage}t.InitDefaultParams=x;function x(i,a){for(var u=0;u<a.length;u+=1){var f=a[u],p=i[f.name]||{};xt(f.params,function(m,y){typeof p[y]>"u"&&(p[y]=m.D)}),i[f.name]=p}}t.Processor=M;function M(i,a){i=i||{},a=a||t.DefaultModules,typeof i=="function"?i=i():i=JSON.parse(JSON.stringify(i)),this.finished=!1,this.state={SampleRate:i.SampleRate||t.SampleRate},a=a.slice(),a.sort(v),this.modules=a,x(i,a);for(var u=0;u<this.modules.length;u+=1){var f=this.modules[u];this.modules[u].setup(this.state,i[f.name])}}M.prototype={generate:function(i){for(var a=0;a<i.length;a+=1)i[a]=0;if(!this.finished){for(var u=this.state,f=i.length|0,a=0;a<this.modules.length;a+=1){var p=this.modules[a],m=p.process(u,i.subarray(0,f))|0;f=Math.min(f,m)}f<i.length&&(this.finished=!0);for(var a=f;a<i.length;a++)i[a]=0}},getSamplesLeft:function(){for(var i=0,a=0;a<this.state.envelopes.length;a+=1)i+=this.state.envelopes[a].N;return i===0&&(i=3*this.state.SampleRate),i}},t.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:d.PhaseSpeed,setup:function(i,a){var u=i.SampleRate;i.phaseParams=a,i.phaseSpeed=a.Start*e/u,i.phaseSpeedMax=a.Max*e/u,i.phaseSpeedMin=a.Min*e/u,i.phaseSpeedMin=Math.min(i.phaseSpeedMin,i.phaseSpeed),i.phaseSpeedMax=Math.max(i.phaseSpeedMax,i.phaseSpeed),i.phaseSlide=1+o(a.Slide,3)*64/u,i.phaseDeltaSlide=o(a.DeltaSlide,3)/(u*1e3),i.repeatTime=0,i.repeatLimit=1/0,a.RepeatSpeed>0&&(i.repeatLimit=a.RepeatSpeed*u),i.arpeggiatorTime=0,i.arpeggiatorLimit=a.ChangeSpeed*u,a.ChangeAmount==0&&(i.arpeggiatorLimit=1/0),i.arpeggiatorMod=1+a.ChangeAmount/12},process:function(i,a){for(var u=+i.phaseSpeed,f=+i.phaseSpeedMin,p=+i.phaseSpeedMax,m=+i.phaseSlide,y=+i.phaseDeltaSlide,P=i.repeatTime,S=i.repeatLimit,A=i.arpeggiatorTime,_=i.arpeggiatorLimit,J=i.arpeggiatorMod,T=0;T<a.length;T++){if(m+=y,u*=m,u=u<f?f:u>p?p:u,P>S)return this.setup(i,i.phaseParams),T+this.process(i,a.subarray(T))-1;P++,A>_&&(u*=J,A=0,_=1/0),A++,a[T]+=u}return i.repeatTime=P,i.arpeggiatorTime=A,i.arpeggiatorLimit=_,i.phaseSpeed=u,i.phaseSlide=m,a.length}},t.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:d.PhaseSpeedMod,setup:function(i,a){var u=i.SampleRate;i.vibratoPhase=0,i.vibratoDepth=a.Depth,i.vibratoPhaseSpeed=a.Frequency*e/u,i.vibratoPhaseSpeedSlide=1+o(a.FrequencySlide,3)*3/u,i.vibratoDepthSlide=a.DepthSlide/u},process:function(i,a){var u=+i.vibratoPhase,f=+i.vibratoDepth,p=+i.vibratoPhaseSpeed,m=+i.vibratoPhaseSpeedSlide,y=+i.vibratoDepthSlide;if(f==0&&y<=0)return a.length;for(var P=0;P<a.length;P++)u+=p,u>e&&(u-=e),a[P]+=a[P]*l(u)*f,p*=m,f+=y,f=nr(f);return i.vibratoPhase=u,i.vibratoDepth=f,i.vibratoPhaseSpeed=p,a.length}},t.Module.Generator={name:"Generator",params:{Func:{C:t.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:d.Generator,setup:function(i,a){i.generatorPhase=0,typeof a.Func=="string"?i.generator=t.G[a.Func]:i.generator=a.Func,typeof i.generator=="object"&&(i.generator=i.generator.create()),St(typeof i.generator=="function","generator must be a function"),i.generatorA=a.A,i.generatorASlide=a.ASlide,i.generatorB=a.B,i.generatorBSlide=a.BSlide},process:function(i,a){return i.generator(i,a)}};var C=1<<16;t.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:d.Generator,setup:function(i,a){i.guitarA=a.A,i.guitarB=a.B,i.guitarC=a.C,i.guitarBuffer=Ue(C),i.guitarHead=0;for(var u=i.guitarBuffer,f=0;f<u.length;f++)u[f]=Ie()*2-1},process:function(i,a){for(var u=C,f=u-1,p=+i.guitarA,m=+i.guitarB,y=+i.guitarC,P=p+m+y,S=i.guitarHead,A=i.guitarBuffer,_=0;_<a.length;_++){var J=e/a[_]|0;J=J>u?u:J;var T=S-J+u&f;A[S]=(A[T-0+u&f]*p+A[T-1+u&f]*m+A[T-2+u&f]*y)/P,a[_]=A[S],S=S+1&f}return i.guitarHead=S,a.length}},t.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:d.SampleMod+0,setup:function(i,a){i.FilterEnabled=a.HP>h||a.LP<1-h,i.LPEnabled=a.LP<1-h,i.LP=o(a.LP,3)/10,i.LPSlide=1+a.LPSlide*100/i.SampleRate,i.LPPos=0,i.LPPosSlide=0,i.LPDamping=5/(1+o(a.LPResonance,2)*20)*(.01+a.LP),i.LPDamping=1-Math.min(i.LPDamping,.8),i.HP=o(a.HP,2)/10,i.HPPos=0,i.HPSlide=1+a.HPSlide*100/i.SampleRate},enabled:function(i){return i.FilterEnabled},process:function(i,a){if(!this.enabled(i))return a.length;for(var u=+i.LP,f=+i.LPPos,p=+i.LPPosSlide,m=+i.LPSlide,y=+i.LPDamping,P=+i.LPEnabled,S=+i.HP,A=+i.HPPos,_=+i.HPSlide,J=0;J<a.length;J++){(S>h||S<-h)&&(S*=_,S=S<h?h:S>.1?.1:S);var T=f;u*=m,u=u<0?u=0:u>.1?.1:u;var ge=a[J];P?(p+=(ge-f)*u,p*=y):(f=ge,p=0),f+=p,A+=f-T,A*=1-S,a[J]=A}return i.LPPos=f,i.LPPosSlide=p,i.LP=u,i.HP=S,i.HPPos=A,a.length}};var K=1<<10;t.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:d.SampleMod+1,setup:function(i,a){i.phaserBuffer=Ue(K),i.phaserPos=0,i.phaserOffset=o(a.Offset,2)*(K-4),i.phaserOffsetSlide=o(a.Sweep,3)*4e3/i.SampleRate},enabled:function(i){return s(i.phaserOffsetSlide)>h||s(i.phaserOffset)>h},process:function(i,a){if(!this.enabled(i))return a.length;for(var u=K,f=u-1,p=i.phaserBuffer,m=i.phaserPos|0,y=+i.phaserOffset,P=+i.phaserOffsetSlide,S=0;S<a.length;S++){y+=P,y<0&&(y=-y,P=-P),y>f&&(y=f,P=0),p[m]=a[S];var A=m-(y|0)+u&f;a[S]+=p[A],m=m+1&f|0}return i.phaserPos=m,i.phaserOffset=y,a.length}},t.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:d.Volume,setup:function(i,a){var u=i.SampleRate,f=a.Master,p=f*(1+a.Punch);i.envelopes=[{S:0,E:f,N:a.Attack*u|0},{S:p,E:f,N:a.Sustain*u|0},{S:f,E:0,N:a.Decay*u|0}];for(var m=0;m<i.envelopes.length;m+=1){var y=i.envelopes[m];y.G=(y.E-y.S)/y.N}},process:function(i,a){for(var u=0;i.envelopes.length>0&&u<a.length;){for(var f=i.envelopes[0],p=f.S,m=f.G,y=Math.min(a.length-u,f.N)|0,P=u+y|0;u<P;u+=1)a[u]*=p,p+=m,p=tr(p,0,10);f.S=p,f.N-=y,f.N<=0&&i.envelopes.shift()}return u}},t.DefaultModules=[t.Module.Frequency,t.Module.Vibrato,t.Module.Generator,t.Module.Filter,t.Module.Phaser,t.Module.Volume],t.DefaultModules.sort(v),t.EmptyParams=I;function I(){return xt(t.Module,function(){return{}})}t._RemoveEmptyParams=O;function O(i){for(var a in i)On(i[a]).length==0&&delete i[a]}t.Preset={Reset:function(){return I()},Coin:function(){var i=I();return i.Frequency.Start=c(880,660),i.Volume.Sustain=c(.1),i.Volume.Decay=c(.4,.1),i.Volume.Punch=c(.3,.3),c()<.5&&(i.Frequency.ChangeSpeed=c(.15,.1),i.Frequency.ChangeAmount=c(8,4)),O(i),i},Laser:function(){var i=I();return i.Generator.Func=qe(["square","saw","sine"]),c()<.33?(i.Frequency.Start=c(880,440),i.Frequency.Min=c(.1),i.Frequency.Slide=c(.3,-.8)):(i.Frequency.Start=c(1200,440),i.Frequency.Min=i.Frequency.Start-c(880,440),i.Frequency.Min<110&&(i.Frequency.Min=110),i.Frequency.Slide=c(.3,-1)),c()<.5?(i.Generator.A=c(.5),i.Generator.ASlide=c(.2)):(i.Generator.A=c(.5,.4),i.Generator.ASlide=c(.7)),i.Volume.Sustain=c(.2,.1),i.Volume.Decay=c(.4),c()<.5&&(i.Volume.Punch=c(.3)),c()<.33&&(i.Phaser.Offset=c(.2),i.Phaser.Sweep=c(.2)),c()<.5&&(i.Filter.HP=c(.3)),O(i),i},Explosion:function(){var i=I();return i.Generator.Func="noise",c()<.5?(i.Frequency.Start=c(440,40),i.Frequency.Slide=c(.4,-.1)):(i.Frequency.Start=c(1600,220),i.Frequency.Slide=c(-.2,-.2)),c()<.2&&(i.Frequency.Slide=0),c()<.3&&(i.Frequency.RepeatSpeed=c(.5,.3)),i.Volume.Sustain=c(.3,.1),i.Volume.Decay=c(.5),i.Volume.Punch=c(.6,.2),c()<.5&&(i.Phaser.Offset=c(.9,-.3),i.Phaser.Sweep=c(-.3)),c()<.33&&(i.Frequency.ChangeSpeed=c(.3,.6),i.Frequency.ChangeAmount=c(24,-12)),O(i),i},Powerup:function(){var i=I();return c()<.5?i.Generator.Func="saw":i.Generator.A=c(.6),i.Frequency.Start=c(220,440),c()<.5?(i.Frequency.Slide=c(.5,.2),i.Frequency.RepeatSpeed=c(.4,.4)):(i.Frequency.Slide=c(.2,.05),c()<.5&&(i.Vibrato.Depth=c(.6,.1),i.Vibrato.Frequency=c(30,10))),i.Volume.Sustain=c(.4),i.Volume.Decay=c(.4,.1),O(i),i},Hit:function(){var i=I();return i.Generator.Func=qe(["square","saw","noise"]),i.Generator.A=c(.6),i.Generator.ASlide=c(1,-.5),i.Frequency.Start=c(880,220),i.Frequency.Slide=-c(.4,.3),i.Volume.Sustain=c(.1),i.Volume.Decay=c(.2,.1),c()<.5&&(i.Filter.HP=c(.3)),O(i),i},Jump:function(){var i=I();return i.Generator.Func="square",i.Generator.A=c(.6),i.Frequency.Start=c(330,330),i.Frequency.Slide=c(.4,.2),i.Volume.Sustain=c(.3,.1),i.Volume.Decay=c(.2,.1),c()<.5&&(i.Filter.HP=c(.3)),c()<.3&&(i.Filter.LP=c(-.6,1)),O(i),i},Select:function(){var i=I();return i.Generator.Func=qe(["square","saw"]),i.Generator.A=c(.6),i.Frequency.Start=c(660,220),i.Volume.Sustain=c(.1,.1),i.Volume.Decay=c(.2),i.Filter.HP=.2,O(i),i},Lucky:function(){var i=I();return xt(i,function(a,u){var f=t.Module[u].params;xt(f,function(p,m){if(p.C){var y=On(p.C);a[m]=y[y.length*Ie()|0]}else a[m]=Ie()*(p.H-p.L)+p.L})}),i.Volume.Master=.4,i.Filter={},O(i),i},Synth:function(){var i=I();return i.Generator.Func=qe(["square","saw"]),i.Frequency.Start=qe([340,240,170]),i.Volume.Attack=c()>.6?c(.5):0,i.Volume.Sustain=c(1),i.Volume.Punch=c(1),i.Volume.Decay=c(.9)+.1,i.Generator.A=c(1),c()<.25&&(i.Filter.HP=c(1)),c()<.25&&(i.Filter.LP=c(1)),O(i),i},Tone:function(){var i=I();return i.Generator.Func="square",i.Frequency.Start=261.6,i.Volume.Sustain=.6441,O(i),i},Click:function(){var i=c()>.5?t.Preset.Hit():t.Preset.Explosion();return c()<.5&&(i.Frequency.Slide=-.5+c(1)),c()<.5&&(i.Volume.Sustain*=c(.4)+.2,i.Volume.Decay*=c(.4)+.2),i.Frequency.Start=c(1200,440),O(i),i}},t.G.unoise=pe("sample = Math.random();"),t.G.sine=pe("sample = Math.sin(phase);"),t.G.saw=pe("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),t.G.triangle=pe("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),t.G.square=pe("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),t.G.synth=pe("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"),t.G.noise=pe("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),t.G.string={create:function(){for(var i=65536,a=i-1,u=Ue(i),f=0;f<u.length;f++)u[f]=Ie()*2-1;var p=0;return function(m,y){for(var P=Math.PI*2,S=+m.generatorA,A=+m.generatorASlide,_=+m.generatorB,J=+m.generatorBSlide,T=u,ge=0;ge<y.length;ge++){var rr=y[ge],lr=P/rr|0;S+=A,_+=J,S=S<0?0:S>1?1:S,_=_<0?0:_>1?1:_;var Qt=p-lr+i&a,or=(T[Qt-0+i&a]*1+T[Qt-1+i&a]*S+T[Qt-2+i&a]*_)/(1+S+_);T[p]=or,y[ge]=T[p],p=p+1&a}return m.generatorA=S,m.generatorB=_,y.length}}};function pe(i){return new Function("$","block",`var TAU = Math.PI * 2;
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
`)}t.CreateAudio=$i;function $i(i){typeof Float32Array<"u"&&St(i instanceof Float32Array,"data must be an Float32Array");var a=r*n>>3,u=t.SampleRate*a,f=ir(8+36+i.length*2),p=0;function m(P){for(var S=0;S<P.length;S+=1)f[p]=P.charCodeAt(S),p++}function y(P,S){S<=0||(f[p]=P&255,p++,y(P>>8,S-1))}return m("RIFF"),y(36+i.length*2,4),m("WAVEfmt "),y(16,4),y(1,2),y(r,2),y(t.SampleRate,4),y(u,4),y(a,2),y(n,2),m("data"),y(i.length*2,4),zn(f.subarray(p),i),new Audio("data:audio/wav;base64,"+ji(f))}t.DownloadAsFile=function(i){St(i instanceof Audio,"input must be an Audio object"),document.location.href=i.src},t.Util={},t.Util.CopyFToU8=zn;function zn(i,a){St(i.length/2==a.length,"the target buffer must be twice as large as the iinput");for(var u=0,f=0;f<a.length;f++){var p=+a[f],m=p*32767|0;m=m<-32768?-32768:32767<m?32767:m,m+=m<0?65536:0,i[u]=m&255,u++,i[u]=m>>8,u++}}function ji(i){for(var a=32768,u="",f=0;f<i.length;f+=a){var p=Math.min(f+a,i.length);u+=String.fromCharCode.apply(null,i.subarray(f,p))}return btoa(u)}function er(){return typeof g<"u"?new g().sampleRate:44100}function St(i,a){if(!i)throw new Error(a)}function tr(i,a,u){return i=+i,a=+a,u=+u,i<a?+a:i>u?+u:+i}function nr(i){return i=+i,i<0?0:i>1?1:+i}function xt(i,a){var u={};for(var f in i)i.hasOwnProperty(f)&&(u[f]=a(i[f],f));return u}function c(i,a){var u=Ie();return i!==void 0&&(u*=i),a!==void 0&&(u+=a),u}function qe(i){return i[i.length*Ie()|0]}function On(i){var a=[];for(var u in i)a.push(u);return a}t._createFloatArray=Ue;function Ue(i){if(typeof Float32Array>"u")for(var a=new Array(i),u=0;u<a.length;u++)a[u]=0;return new Float32Array(i)}function ir(i){if(typeof Uint8Array>"u")for(var a=new Array(i),u=0;u<a.length;u++)a[u]=0;return new Uint8Array(i)}var qn=Math.random;t.setRandomFunc=function(i){qn=i};function Ie(){return qn()}})(ut={});let z,vn,Vt,Sn,Pi,$n=!1;function rl(t=void 0){z=t==null?new(window.AudioContext||window.webkitAudioContext):t,Li(),ol(),al()}function ll(){$n||($n=!0,sl())}function Li(t=120){vn=t,Vt=60/vn}function ol(t=8){Sn=t>0?4/t:void 0}function al(t=.1){Pi=t}function Kt(t){if(Sn==null)return t;const e=Vt*Sn;return e>0?Math.ceil(t/e)*e:t}function sl(){const t=z.createBufferSource();t.start=t.start||t.noteOn,t.start()}class ul{constructor(e=null){N(this,"x");N(this,"y");N(this,"z");N(this,"w");this.setSeed(e)}get(e=1,n){return n==null&&(n=e,e=0),this.next()/4294967295*(n-e)+e}getInt(e,n){n==null&&(n=e,e=0);const r=Math.floor(e),l=Math.floor(n);return l===r?r:this.next()%(l-r)+r}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,n=123456789,r=362436069,l=521288629,o=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=n>>>0,this.y=r>>>0,this.z=l>>>0;for(let s=0;s<o;s++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}function mt(t,e){let n=[];for(let r=0;r<t;r++)n.push(e(r));return n}function ki(t){return 440*Math.pow(2,(t-69)/12)}function Fi(t){let e=0;const n=t.length;for(let r=0;r<n;r++){const l=t.charCodeAt(r);e=(e<<5)-e+l,e|=0}return e}const Di=["coin","laser","explosion","powerUp","hit","jump","select","random","synth","tone","click"],cl={coin:"Coin",laser:"Laser",explosion:"Explosion",powerUp:"Powerup",hit:"Hit",jump:"Jump",select:"Select",random:"Lucky",synth:"Synth",tone:"Tone",click:"Click"},ct=new ul;let Rn,Ii;function fl(){Ii=ut.Live(),Rn=[],ut.setRandomFunc(()=>ct.get())}function hl(t){ml(t)}function dl(){const t=z.currentTime;Rn.forEach(e=>{yl(e,t)})}function Ai(t=void 0,e=void 0,n=2,r=.5,l=void 0,o=1,s=1){e!=null&&ct.setSeed(e);const h=ut.Preset[cl[t!=null?t:Di[ct.getInt(8)]]],g=mt(n,()=>{const d=h();return l!=null&&d.Frequency.Start!=null&&(d.Frequency.Start=l),d.Volume.Attack!=null&&(d.Volume.Attack*=o),d.Volume.Sustain!=null&&(d.Volume.Sustain*=s),d});return pl(t,g,r)}function pl(t,e,n){const r=e.map(o=>{const s=Ii._generate(o),h=z.createBuffer(1,s.length,ut.SampleRate);var g=h.getChannelData(0);return g.set(s),h}),l=z.createGain();return l.gain.value=n*Pi*Ri,l.connect(z.destination),{type:t,params:e,volume:n,buffers:r,bufferSourceNodes:void 0,gainNode:l,isPlaying:!1,playedTime:void 0}}function gl(t){Rn.push(t)}function ml(t){t.isPlaying=!0}function yl(t,e){if(!t.isPlaying)return;t.isPlaying=!1;const n=Kt(e);(t.playedTime==null||n>t.playedTime)&&(wn(t,n),t.playedTime=n)}let xn,_i,Ri=1;function vl(t=.01,e=.9,n=.15){xn=t,_i=e,Ri=n}function wn(t,e,n=void 0){t.bufferSourceNodes=[],t.buffers.forEach(r=>{const l=z.createBufferSource();if(l.buffer=r,n!=null&&l.playbackRate!=null){const o=Math.pow(2,.08333333333333333);l.playbackRate.value=Math.pow(o,n)}if(l.connect(t.gainNode),xn!=null){const o=z.createDelay();o.delayTime.value=xn,l.connect(o),o.connect(t.gainNode);const s=z.createGain();s.gain.value=_i,o.connect(s),s.connect(o)}l.start=l.start||l.noteOn,l.start(e),t.bufferSourceNodes.push(l)})}function bn(t,e=void 0){t.bufferSourceNodes!=null&&(t.bufferSourceNodes.forEach(n=>{e==null?n.stop():n.stop(e)}),t.bufferSourceNodes=void 0)}function Sl(t,e,n,r){return{mml:t,sequence:e,soundEffect:n,noteIndex:0,endStep:-1,visualizer:r}}function xl(t,e,n){const r=e.sequence.notes[e.noteIndex];r!=null&&((e.soundEffect.type==="synth"||e.soundEffect.type==="tone")&&e.endStep===t.notesStepsIndex&&bn(e.soundEffect,n),r.quantizedStartStep===t.notesStepsIndex&&((e.soundEffect.type==="synth"||e.soundEffect.type==="tone")&&bn(e.soundEffect),e.soundEffect.isDrum?wn(e.soundEffect,n):wn(e.soundEffect,n,r.pitch-69),e.visualizer!=null&&e.visualizer.redraw(r),e.endStep=r.quantizedEndStep,e.endStep>=t.notesStepsCount&&(e.endStep-=t.notesStepsCount),e.noteIndex++,e.noteIndex>=e.sequence.notes.length&&(e.noteIndex=0)))}let Be=[];function wl(){kl(),Be=[]}function bl(t,e,n=1){t.forEach(l=>{l.noteIndex=0});const r={parts:t,notesStepsCount:e,notesStepsIndex:void 0,noteInterval:void 0,nextNotesTime:void 0,speedRatio:n,isPlaying:!1,isLooping:!1};return Gi(r),r}function Gi(t){const e=Vt/4/t.speedRatio;t.notesStepsIndex=0,t.noteInterval=e,t.nextNotesTime=Kt(z.currentTime)-e}function Cl(t){Be.push(t)}function Ml(t){Be=Be.filter(e=>e!==t)}function Pl(){Be.forEach(t=>{Fl(t)})}function Ll(t,e=!1){t.isLooping=e,Gi(t),t.isPlaying=!0}function Ti(t){t.isPlaying=!1,t.parts.forEach(e=>{bn(e.soundEffect)})}function kl(){Be.forEach(t=>{Ti(t)})}function Fl(t){if(!t.isPlaying)return;const e=z.currentTime;e<t.nextNotesTime||(t.nextNotesTime+=t.noteInterval,t.nextNotesTime<e-Vt&&(t.nextNotesTime=Kt(e)),t.parts.forEach(n=>{xl(t,n,t.nextNotesTime)}),t.notesStepsIndex++,t.notesStepsIndex>=t.notesStepsCount&&(t.isLooping?t.notesStepsIndex=0:t.isPlaying=!1))}const Dl={c:"coin",l:"laser",e:"explosion",p:"powerUp",h:"hit",j:"jump",s:"select",u:"random",r:"random"},L=ct;let Ni=1;function Il(t){Ni=t}function Al(t,e,n,r,l,o,s){L.setSeed(Ni+Fi(t)),El(),Pt=null;let h=L.select(o);const g=mt(l,()=>{const d=Math.floor(Math.abs(L.get()+L.get()-1)*3),v=Math.floor((L.get()+L.get()-1)*10),x=Math.abs(L.get()+L.get()-1),M=L.get()<.25;M||(h=L.select(o));const C=L.get()<.5,K=L.get()<.5,I=L.get()<.9;return Rl(n,h,e,.7,d,v,x,M,C,K,I,void 0,s)});return _l(g,.5/r)}function _l(t,e){const n=t.map(r=>{const l=[];return r.notes.forEach((o,s)=>{o!=null&&l.push({pitch:o+69,quantizedStartStep:s*2})}),Sl(void 0,{notes:l},r.soundEffect)});return bl(n,t[0].notes.length*2,e)}let Pt;function Rl(t=32,e,n=60,r=1,l=0,o=0,s=1,h=!1,g=!1,d=!1,v=!1,x=null,M=.1){const C=Ol(e,ki(n),r,M);if(Pt!=null&&h)C.noteRatios=Pt.noteRatios;else{const K=x!=null?Nl(t,x):Gl(t);C.noteRatios=Bl(K,g?0:-1,1,s,v)}return C.notes=zl(C.noteRatios,l,o,d),Pt=C,C}function Gl(t){let e=mt(t,()=>!1),n=4;for(;n<=t;)e=Tl(e,n),n*=2;return e}function Tl(t,e){let n=mt(e,()=>!1);const r=Math.floor(Math.abs(L.get()+L.get()-1)*4);for(let l=0;l<r;l++)n[L.getInt(e-1)]=!0;return t.map((l,o)=>n[o%e]?!l:l)}function Nl(t,e){return mt(t,()=>L.get()>=e)}const Ei=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],jt=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let Ee;function El(){Ee=L.select(jt).map((e,n)=>[L.get()<.7?e[0]:jt[L.getInt(jt.length)][n][0],L.get()<.7?e[1]:L.getInt(Ei.length)])}function Bl(t,e,n,r,l){let o=L.get(),s=L.get(-.5,.5),g=t.length/Ee.length,d=[];return t.forEach((v,x)=>{let M=Math.floor(x/g),C=x%g;if(l&&M===Math.floor(Ee.length/2)){d.push(d[C]),d[C]!=null&&(o=d[C]);return}if(!v){d.push(null);return}d.push(o),s+=L.get(-.25,.25),o+=s*r,(L.get()<.2||o<=e||o>=n)&&(o-=s*2,s*=-1)}),d}function zl(t,e,n,r){let o=t.length/Ee.length;return t.map((s,h)=>{if(s==null)return null;let g=Math.floor(h/o),d=Ee[g][0],v=Ei[Ee[g][1]],x=s;r&&(x=Math.floor(x*2)/2);let M=Math.floor(x),C=Math.floor((x-M)*v.length);for(C+=e+L.getInt(-n,n+1);C>=v.length;)C-=v.length,M++;for(;C<0;)C+=v.length,M--;return d+M*12+v[C]})}function Ol(t,e,n,r){return{noteRatios:void 0,notes:void 0,soundEffect:Ai(t,void 0,1,r,e,n,n)}}let Cn,Tt,te,Bi,Ze,ft=!1,jn;function ql(){Tt=z.createGain(),Jt(),Tt.connect(z.destination)}async function Ul(t){if(ft&&zi(),t===jn){ei();return}jn=t;const n=await(await fetch(t)).arrayBuffer();z.decodeAudioData(n,function(r){Cn=r;const l=60/vn*4;Bi=Math.floor(Cn.duration/l)*l,ei()},function(r){throw r})}function Jt(t=1){Tt.gain.value=t}function ei(){Ze=Kt(z.currentTime),ft=!0,Oi()}function zi(){!ft||(ft=!1,te.stop())}function Oi(){!ft||z.currentTime<Ze-1||(te!=null&&te.stop(Ze),te=z.createBufferSource(),te.buffer=Cn,te.connect(Tt),te.start=te.start||te.noteOn,te.start(Ze),Ze+=Bi)}const ti=ct;let Nt,be;function qi(t="0",e=2,n,r=1){Hl(Dl[t[0]],{seed:Nt+Fi(t),numberOfSounds:e,pitch:n,volume:r})}function Ui(t="0",e=69-24,n=32,r=.25,l=4,o=["laser","select","hit","hit"],s=1){be=Al(t,e,n,r,l,o,s),Cl(be),Ll(be,!0)}function Hi(){be!=null&&(Ti(be),Ml(be),be=void 0)}let Lt;function Hl(t=void 0,e){const n={seed:void 0,numberOfSounds:2,volume:1,pitch:void 0,...e},r=`${t}_${JSON.stringify(n)}`;if(Lt[r]==null){t==null&&(ti.setSeed(n.seed),t=Di[ti.getInt(8)]);const l=Ai(t,n.seed==null?Nt:n.seed,n.numberOfSounds,n.volume,n.pitch==null?void 0:ki(n.pitch));gl(l),Lt[r]=l}hl(Lt[r])}function Vl(){Pl(),dl(),Oi()}function Kl(t=1,e=void 0){Wl(t),rl(e),ql(),Jl()}function Jl(){wl(),fl(),Lt={}}function Wl(t=1){Nt=t,Il(Nt)}let ni,Vi;const Ki=68,en=1e3/Ki;let Ke=0;const Xl={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let Q,ii=10;function Ql(t,e,n){ni=t,Vi=e,Q={...Xl,...n},hr(Q.theme.isDarkColor),gr(Q.viewSize,Q.bodyBackground,Q.viewBackground,Q.isCapturing,Q.isCapturingGameCanvasOnly,Q.captureCanvasScale,Q.theme),Nr(Q.isSoundEnabled?ll:()=>{}),wr(),ni(),Ji()}function Ji(){requestAnimationFrame(Ji);const t=window.performance.now();t<Ke-Ki/12||(Ke+=en,(Ke<t||Ke>t+en*2)&&(Ke=t+en),Q.isSoundEnabled&&Vl(),Er(),Vi(),Q.isCapturing&&yr(),ii--,ii===0&&Cr())}class Yl{constructor(e){N(this,"size",new F);N(this,"letterGrid");N(this,"colorGrid");N(this,"backgroundColorGrid");N(this,"rotationGrid");N(this,"characterGrid");this.size.set(e),this.letterGrid=$(this.size.x).map(()=>$(this.size.y).map(()=>{})),this.colorGrid=$(this.size.x).map(()=>$(this.size.y).map(()=>{})),this.backgroundColorGrid=$(this.size.x).map(()=>$(this.size.y).map(()=>{})),this.rotationGrid=$(this.size.x).map(()=>$(this.size.y).map(()=>{})),this.characterGrid=$(this.size.x).map(()=>$(this.size.y).map(()=>{}))}print(e,n,r,l={}){const o={...it,...l};let s=Math.floor(n),h=Math.floor(r);const g=s;for(let d=0;d<e.length;d++){const v=e[d];if(v===`
`){s=g,h++;continue}if(s<0||s>=this.size.x||h<0||h>=this.size.y){s++;continue}this.letterGrid[s][h]=v,this.colorGrid[s][h]=o.color,this.backgroundColorGrid[s][h]=o.backgroundColor,this.rotationGrid[s][h]=o.rotation,this.characterGrid[s][h]=o.isCharacter,s++}}getCharAt(e,n){if(e<0||e>=this.size.x||n<0||n>=this.size.y)return;const r=Math.floor(e),l=Math.floor(n),o=this.letterGrid[r][l],s=this.colorGrid[r][l],h=this.backgroundColorGrid[r][l],g=this.rotationGrid[r][l],d=this.characterGrid[r][l];return{char:o,options:{color:s,backgroundColor:h,rotation:g,isCharacter:d}}}setCharAt(e,n,r,l){if(e<0||e>=this.size.x||n<0||n>=this.size.y)return;const o={...it,...l},s=Math.floor(e),h=Math.floor(n);this.letterGrid[s][h]=r,this.colorGrid[s][h]=o.color,this.backgroundColorGrid[s][h]=o.backgroundColor,this.rotationGrid[s][h]=o.rotation,this.characterGrid[s][h]=o.isCharacter}draw(){for(let e=0;e<this.size.x;e++)for(let n=0;n<this.size.y;n++){const r=this.letterGrid[e][n];if(r==null)continue;const l=this.colorGrid[e][n],o=this.backgroundColorGrid[e][n],s=this.rotationGrid[e][n],h=this.characterGrid[e][n];xi(r,e*w,n*w,{color:l,backgroundColor:o,rotation:s,isCharacter:h})}}clear(){for(let e=0;e<this.size.x;e++)for(let n=0;n<this.size.y;n++)this.letterGrid[e][n]=this.colorGrid[e][n]=this.backgroundColorGrid[e][n]=this.rotationGrid[e][n]=this.characterGrid[e][n]=void 0}scrollUp(){for(let n=0;n<this.size.x;n++)for(let r=1;r<this.size.y;r++)this.letterGrid[n][r-1]=this.letterGrid[n][r],this.colorGrid[n][r-1]=this.colorGrid[n][r],this.backgroundColorGrid[n][r-1]=this.backgroundColorGrid[n][r],this.rotationGrid[n][r-1]=this.rotationGrid[n][r],this.characterGrid[n][r-1]=this.characterGrid[n][r];const e=this.size.y-1;for(let n=0;n<this.size.x;n++)this.letterGrid[n][e]=this.colorGrid[n][e]=this.backgroundColorGrid[n][e]=this.rotationGrid[n][e]=this.characterGrid[n][e]=void 0}getState(){return{charGrid:this.letterGrid.map(e=>[].concat(e)),colorGrid:this.colorGrid.map(e=>[].concat(e)),backgroundColorGrid:this.backgroundColorGrid.map(e=>[].concat(e)),rotationGrid:this.rotationGrid.map(e=>[].concat(e)),symbolGrid:this.characterGrid.map(e=>[].concat(e))}}setState(e){this.letterGrid=e.charGrid.map(n=>[].concat(n)),this.colorGrid=e.colorGrid.map(n=>[].concat(n)),this.backgroundColorGrid=e.backgroundColorGrid.map(n=>[].concat(n)),this.rotationGrid=e.rotationGrid.map(n=>[].concat(n)),this.characterGrid=e.symbolGrid.map(n=>[].concat(n))}}let Et;const wt=new Ut;function Gn(){Et=[]}function ri(t,e=16,n=1,r=0,l=Math.PI*2){if(e<1){if(wt.get()>e)return;e=1}for(let o=0;o<e;o++){const s=r+wt.get(l)-l/2,h={pos:new F(t),vel:new F(n*wt.get(.5,1),0).rotate(s),color:ee,ticks:nn(wt.get(10,20)*Math.sqrt(Math.abs(n)),10,60)};Et.push(h)}}function Bt(){Fn(),Et=Et.filter(t=>(t.ticks--,t.ticks<0?!1:(t.pos.add(t.vel),t.vel.mul(.98),ze(t.color),tt(Math.floor(t.pos.x),Math.floor(t.pos.y),1,1),!0))),Dn()}function Ae(t,e,n,r){return Zl(!1,t,e,n,r)}function Zl(t,e,n,r,l){if(typeof e=="number"){if(typeof n=="number")return typeof r=="number"?l==null?_e(t,e,n,r,r):_e(t,e,n,r,l):_e(t,e,n,r.x,r.y);throw"invalid params"}else if(typeof n=="number"){if(r==null)return _e(t,e.x,e.y,n,n);if(typeof r=="number")return _e(t,e.x,e.y,n,r);throw"invalid params"}else return _e(t,e.x,e.y,n.x,n.y)}function _e(t,e,n,r,l,o=!1,s=!0){let h=s;(k.name==="shape"||k.name==="shapeDark")&&h&&ee!=="transparent"&&(t?tt(e-r/2,n-l/2,r,l):tt(e,n,r,l),h=!1);let g=t?{x:Math.floor(e-r/2),y:Math.floor(n-l/2)}:{x:Math.floor(e),y:Math.floor(n)};const d={x:Math.trunc(r),y:Math.trunc(l)};if(d.x===0||d.y===0)return{isColliding:{rect:{},text:{},char:{}}};d.x<0&&(g.x+=d.x,d.x*=-1),d.y<0&&(g.y+=d.y,d.y*=-1);const v={pos:g,size:d,collision:{isColliding:{rect:{}}}};v.collision.isColliding.rect[ee]=!0;const x=vi(v);return ee!=="transparent"&&((o?yi:qt).push(v),h&&tt(g.x,g.y,d.x,d.y)),x}let ie,ot,ae,Tn;const $l=60*10;function jl(t){ie={randomSeed:t,inputs:[]}}function eo(t){ie.inputs.push(t)}function Wi(){return ie!=null}function to(t){ot=0,t.setSeed(ie.randomSeed)}function no(){ot>=ie.inputs.length||(Ht(ie.inputs[ot]),ot++)}function io(){ae=[]}function ro(t,e,n){ae.push({randomState:n.getState(),gameState:cloneDeep(t),baseState:cloneDeep(e)}),ae.length>$l&&ae.shift()}function lo(t){const e=ae.pop(),n=e.randomState;return t.setSeed(n.w,n.x,n.y,n.z,0),Tn={pos:new F(pt),isPressed:ke,isJustPressed:ue,isJustReleased:gt},Ht(ie.inputs.pop()),e}function oo(t){const e=ae[ae.length-1],n=e.randomState;return t.setSeed(n.w,n.x,n.y,n.z,0),Tn={pos:new F(pt),isPressed:ke,isJustPressed:ue,isJustReleased:gt},Ht(ie.inputs[ie.inputs.length-1]),e}function ao(){Ht(Tn)}function so(){return ae.length===0}function uo(){const t=ot-1;if(!(t>=ie.inputs.length))return ae[t]}const Re=Math.PI,me=Math.sqrt;let H=0,Y=0,se,ce=!1;function Z(t=1,e){return Me.get(t,e)}function li(t=2,e){return Me.getInt(t,e)}function Xi(t="GAME OVER"){kn=t,Po()}function co(t,e,n){if(ce||(Y+=t,e==null))return;const r=`${t>=1?"+":""}${Math.floor(t)}`;let l=new F;typeof e=="number"?l.set(e,n):l.set(e),l.x-=r.length*w/2,l.y-=w/2,dt.push({str:r,pos:l,vy:-2,ticks:30})}function Je(t){ze(t)}function oi(t,e,n,r,l,o){let s=new F;typeof t=="number"?(s.set(t,e),ri(s,n,r,l,o)):(s.set(t),ri(s,e,n,r,l))}function ve(t,e){return new F(t,e)}function We(t){!Oe&&!Le&&De&&qi(po[t])}function fo(t){if(Oe){const e=oo(Me),n=e.baseState;return Y=n.score,H=n.ticks,cloneDeep(e.gameState)}else if(Le){const e=lo(Me),n=e.baseState;return Y=n.score,H=n.ticks,e.gameState}else{if(ce)return uo().gameState;Fe==="inGame"&&ro(t,{score:Y,ticks:H},Me)}return t}function ho(){Le||Oe||(!ce&&Xt?Fo():Xi())}const po={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r"},ai={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!0,isReplayEnabled:!1,isRewindEnabled:!0,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,recordingScoreInterval:100,viewSize:{x:100,y:100},seed:0,theme:"simple"},go=new Ut,Me=new Ut;let Fe,mo={title:Mo,inGame:Co,gameOver:Lo,rewind:Do},V,Mn=0,Qi,kt=!0,Ft=0,Se,yt,Yi,Wt,vt,Xt,ht,Pn,De,Nn,ne,dt,Oe=!1,Le=!1,Ln,kn,yo,Dt;const vo=300;function So(t){const e=window;e.update=t.update,e.title=t.title,e.description=t.description,e.characters=t.characters,e.options=t.options,xo()}function xo(){let t;typeof options<"u"&&options!=null?t={...ai,...options}:t=ai;const e={name:t.theme,isUsingPixi:!1,isDarkColor:!1};t.theme!=="simple"&&t.theme!=="dark"&&(e.isUsingPixi=!0),(t.theme==="pixel"||t.theme==="shapeDark"||t.theme==="crt"||t.theme==="dark")&&(e.isDarkColor=!0),Se={viewSize:{x:100,y:100},bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:t.isSoundEnabled},Ft=t.seed,Se.isCapturing=t.isCapturing,Se.isCapturingGameCanvasOnly=t.isCapturingGameCanvasOnly,Se.captureCanvasScale=t.captureCanvasScale,Se.viewSize=t.viewSize,yt=t.isPlayingBgm,Yi=t.isShowingScore,Wt=t.isShowingTime,vt=t.isReplayEnabled,Xt=t.isRewindEnabled,ht=t.isDrawingParticleFront,Pn=t.isDrawingScoreFront,De=t.isSoundEnabled,Nn=t.recordingScoreInterval,t.isMinifying&&_o(),Ql(wo,bo,Se)}function wo(){typeof description<"u"&&description!=null&&description.trim().length>0&&(kt=!1,Ft+=ci(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(kt=!1,document.title=title,Ft+=ci(title)),typeof characters<"u"&&characters!=null&&br(characters,"a"),De&&Kl(Ft);const t=Se.viewSize;ne={x:Math.floor(t.x/6),y:Math.floor(t.y/6)},V=new Yl(ne),ze("black"),kt?(En(),H=0):Zi()}function bo(){const t=Y,e=se;bt=Y;const n=bt;vr(),mo[Fe](),k.isUsingPixi&&(Ot(),k.name==="crt"&&mr()),H++,ce?(Y=t,se=e):bt!==n&&(Y=bt)}function En(){Fe="inGame",H=-1,Gn(),Y=0,se=0,Dt=Nn,dt=[],yt&&De&&Ui(),Jt(1);const t=go.getInt(999999999);Me.setSeed(t),(vt||Xt)&&(jl(t),io(),ce=!1)}function Co(){V.clear(),zt(),ht||Bt(),Pn||ui(),(vt||Xt)&&eo({pos:ve(pt),isPressed:ke,isJustPressed:ue,isJustReleased:gt}),update(),ht&&Bt(),Pn&&ui(),Y>=Dt&&(Ao(se,Dt),Dt+=Nn),Bn(),V.draw(),Wt&&se!=null&&se++}function Zi(){Fe="title",H=-1,Gn(),V.clear(),zt(),Wi()&&(to(Me),ce=!0)}function Mo(){if(ue){En();return}if(zt(),vt&&Wi()&&(no(),ht||Bt(),update(),ht&&Bt()),H===0&&(Bn(),typeof title<"u"&&title!=null&&V.print(title,Math.floor(ne.x-title.length)/2,Math.ceil(ne.y*.2))),(H===30||H==40)&&typeof description<"u"&&description!=null){let t=0;description.split(`
`).forEach(n=>{n.length>t&&(t=n.length)});const e=Math.floor((ne.x-t)/2);description.split(`
`).forEach((n,r)=>{V.print(n,e,Math.floor(ne.y/2)+r)})}V.draw()}function Po(){Fe="gameOver",ce||Br(),H=-1,Oe=Le=!1,ko(),yt&&De&&Hi(),zi()}function Lo(){(ce||H>20)&&ue?En():H===(vt?120:300)&&!kt&&Zi()}function ko(){ce||(V.print(kn,Math.floor((ne.x-kn.length)/2),Math.floor(ne.y/2)),V.draw())}function Fo(){Fe="rewind",Oe=!0,Ln=0,yt&&De&&Hi(),Jt(.3)}function Do(){V.clear(),zt(),update(),Bn(),ao(),Le?(so()||!ke)&&Io():ue?(Le=!0,Oe=!1):(Ln++,Ln>vo&&Xi()),V.draw(),Wt&&se!=null&&se++}function Io(){Le=!1,Fe="inGame",Gn(),dt=[],yt&&De&&Ui(),Jt(1)}function Bn(){if(Yi&&(Y>0&&V.print(`${Math.floor(Y)}`,0,0),Mn>0)){const t=`${Mn}`;V.print(t,ne.x-t.length,0)}Wt&&(si(se,0,1),si(Qi,ne.x-8,1))}function si(t,e,n){if(t==null)return;let r=Math.floor(t*100/50);r>=100*60*100&&(r-=100*60*100);const l=tn(Math.floor(r/6e3),2)+"'"+tn(Math.floor(r%6e3/100),2)+'"'+tn(Math.floor(r%100),2);V.print(l,e,n)}function tn(t,e){return("0000"+t).slice(-e)}function Ao(t,e){qi("select_recording_time",2,82),Qi=t,Mn=e}function ui(){Fn(),ze("black"),dt=dt.filter(t=>(Mr(t.str,t.pos.x,t.pos.y),t.pos.y+=t.vy,t.vy*=.9,t.ticks--,t.ticks>0)),Dn()}function ci(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);e=(e<<5)-e+r,e|=0}return e}function _o(){fetch(yo).then(t=>t.text()).then(t=>{const e=Terser.minify(t+"update();",{toplevel:!0}).code,n="function(){",r=e.indexOf(n),l="options={",o=e.indexOf(l);let s=e;if(r>=0)s=e.substring(e.indexOf(n)+n.length,e.length-4);else if(o>=0){let h=1,g;for(let d=o+l.length;d<e.length;d++){const v=e.charAt(d);if(v==="{")h++;else if(v==="}"&&(h--,h===0)){g=d+2;break}}h===0&&(s=e.substring(g))}Ro.forEach(([h,g])=>{s=s.split(h).join(g)}),console.log(s),console.log(`${s.length} letters`)})}let bt,Ro=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];const Go="JUMP AND LASER",To=`
[Tap]
 Jump / Double jump / Descent
[Hold]
 Rewind
`,No=[],le=90,fi=2;let b,ye,Ge,Te,Ne,fe,Xe;function Eo(){({player:b,enemies:ye,nextEnemyTicks:Ge,nextWallTicks:Te,nextCloudTicks:Ne,floorX:fe,diff:Xe}=fo({player:b,enemies:ye,nextEnemyTicks:Ge,nextWallTicks:Te,nextCloudTicks:Ne,floorX:fe,diff:Xe})),H||(Li(140),vl(),Ul("bgm.mp3"),b={pos:ve(30,50),vy:0,jumpCount:9,isOnFloor:!1,multiplier:1,shots:[],nextShotTicks:0},ye=[],Ge=0,Te=Z(300,400),Ne=Z(400,500),fe=0,Xe=1),Xe+=1/(60*60);const t=me(me(Xe));if(Je("light_black"),Ae(fe,le,210,9),Ae(fe+212,le,210,9),fe-=t,fe<-209&&(fe+=212),b.isOnFloor||(b.vy+=(ke?.2:.4)*t,b.pos.y+=b.vy,b.pos.y>le&&(We("hit"),b.pos.y=le,b.isOnFloor=!0,b.jumpCount=0,b.multiplier=1),b.nextShotTicks--,b.nextShotTicks<0&&(b.shots.push(ve(b.pos.x+2,b.pos.y+9)),b.nextShotTicks+=Z(4,9))),ue&&(b.jumpCount===fi?(We("laser"),b.vy+=9*me(t)):b.jumpCount<fi&&(We("jump"),b.vy=-4*me(t),b.isOnFloor=!1),b.jumpCount++),Je("cyan"),Ae(b.pos,6,-6),b.isOnFloor||(Je("light_blue"),Ae(b.pos.x+2,b.pos.y,2,le-b.pos.y)),Je("purple"),Hn(b.shots,e=>{if(e.y>le)return oi(b.pos.x+3,le,3,3,-Re/2,Re/7),!0;Ae(e,2,-9),e.y+=6}),Ge--,Te--,Ne--,Ge<0){const e=-Z(1,2)*t;ye.push({pos:ve(200,le),vx:e}),Ge=Z(30,60)/me(t)}if(Te<0){const e=-Z(1,2)*t,n=li(3,6);Un(n,r=>{ye.push({pos:ve(200,le-r*6),vx:e})}),Te=Z(100,600)/me(t)}if(Ne<0){const e=-Z(1,2)*t,n=li(3,6),r=ve(206,Z(40,80));let l=Z(Re*2);Un(n,()=>{ye.push({pos:ve(r).addWithAngle(l,n),vx:e}),l+=Re*2/n}),Ne=Z(100,600)/me(t)}Je("red"),Hn(ye,e=>{e.pos.x+=e.vx;const n=Ae(e.pos,6,-6).isColliding.rect;return n.light_blue?(We("coin"),co(b.multiplier,e.pos.x+b.multiplier*2,e.pos.y),oi(e.pos.x+2,e.pos.y,3,2,-Re/2,Re),b.multiplier++,!0):(n.cyan&&(We("explosion"),ho()),e.pos.x<-6)})}So({update:Eo,title:Go,description:To,characters:No,options:{theme:"shapeDark",viewSize:{x:200,y:100},isDrawingScoreFront:!0,seed:10}});
