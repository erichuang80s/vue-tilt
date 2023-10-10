var VueTilt=function(l){"use strict";class n{constructor(e,i={}){if(!(e instanceof Node))throw"Can't initialize VanillaTilt because "+e+" is not a Node.";this.width=null,this.height=null,this.clientWidth=null,this.clientHeight=null,this.left=null,this.top=null,this.gammazero=null,this.betazero=null,this.lastgammazero=null,this.lastbetazero=null,this.transitionTimeout=null,this.updateCall=null,this.event=null,this.updateBind=this.update.bind(this),this.resetBind=this.reset.bind(this),this.element=e,this.settings=this.extendSettings(i),this.reverse=this.settings.reverse?-1:1,this.resetToStart=n.isSettingTrue(this.settings["reset-to-start"]),this.glare=n.isSettingTrue(this.settings.glare),this.glarePrerender=n.isSettingTrue(this.settings["glare-prerender"]),this.fullPageListening=n.isSettingTrue(this.settings["full-page-listening"]),this.gyroscope=n.isSettingTrue(this.settings.gyroscope),this.gyroscopeSamples=this.settings.gyroscopeSamples,this.elementListener=this.getElementListener(),this.glare&&this.prepareGlare(),this.fullPageListening&&this.updateClientSize(),this.addEventListeners(),this.reset(),this.resetToStart===!1&&(this.settings.startX=0,this.settings.startY=0)}static isSettingTrue(e){return e===""||e===!0||e===1}getElementListener(){if(this.fullPageListening)return window.document;if(typeof this.settings["mouse-event-element"]=="string"){const e=document.querySelector(this.settings["mouse-event-element"]);if(e)return e}return this.settings["mouse-event-element"]instanceof Node?this.settings["mouse-event-element"]:this.element}addEventListeners(){this.onMouseEnterBind=this.onMouseEnter.bind(this),this.onMouseMoveBind=this.onMouseMove.bind(this),this.onMouseLeaveBind=this.onMouseLeave.bind(this),this.onWindowResizeBind=this.onWindowResize.bind(this),this.onDeviceOrientationBind=this.onDeviceOrientation.bind(this),this.elementListener.addEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.addEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),(this.glare||this.fullPageListening)&&window.addEventListener("resize",this.onWindowResizeBind),this.gyroscope&&window.addEventListener("deviceorientation",this.onDeviceOrientationBind)}removeEventListeners(){this.elementListener.removeEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.removeEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.removeEventListener("mousemove",this.onMouseMoveBind),this.gyroscope&&window.removeEventListener("deviceorientation",this.onDeviceOrientationBind),(this.glare||this.fullPageListening)&&window.removeEventListener("resize",this.onWindowResizeBind)}destroy(){clearTimeout(this.transitionTimeout),this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.element.style.willChange="",this.element.style.transition="",this.element.style.transform="",this.resetGlare(),this.removeEventListeners(),this.element.vanillaTilt=null,delete this.element.vanillaTilt,this.element=null}onDeviceOrientation(e){if(e.gamma===null||e.beta===null)return;this.updateElementPosition(),this.gyroscopeSamples>0&&(this.lastgammazero=this.gammazero,this.lastbetazero=this.betazero,this.gammazero===null?(this.gammazero=e.gamma,this.betazero=e.beta):(this.gammazero=(e.gamma+this.lastgammazero)/2,this.betazero=(e.beta+this.lastbetazero)/2),this.gyroscopeSamples-=1);const i=this.settings.gyroscopeMaxAngleX-this.settings.gyroscopeMinAngleX,t=this.settings.gyroscopeMaxAngleY-this.settings.gyroscopeMinAngleY,s=i/this.width,r=t/this.height,o=e.gamma-(this.settings.gyroscopeMinAngleX+this.gammazero),g=e.beta-(this.settings.gyroscopeMinAngleY+this.betazero),u=o/s,d=g/r;this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event={clientX:u+this.left,clientY:d+this.top},this.updateCall=requestAnimationFrame(this.updateBind)}onMouseEnter(){this.updateElementPosition(),this.element.style.willChange="transform",this.setTransition()}onMouseMove(e){this.updateCall!==null&&cancelAnimationFrame(this.updateCall),this.event=e,this.updateCall=requestAnimationFrame(this.updateBind)}onMouseLeave(){this.setTransition(),this.settings.reset&&requestAnimationFrame(this.resetBind)}reset(){this.onMouseEnter(),this.fullPageListening?this.event={clientX:(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.clientWidth,clientY:(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.clientHeight}:this.event={clientX:this.left+(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.width,clientY:this.top+(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.height};let e=this.settings.scale;this.settings.scale=1,this.update(),this.settings.scale=e,this.resetGlare()}resetGlare(){this.glare&&(this.glareElement.style.transform="rotate(180deg) translate(-50%, -50%)",this.glareElement.style.opacity="0")}getValues(){let e,i;this.fullPageListening?(e=this.event.clientX/this.clientWidth,i=this.event.clientY/this.clientHeight):(e=(this.event.clientX-this.left)/this.width,i=(this.event.clientY-this.top)/this.height),e=Math.min(Math.max(e,0),1),i=Math.min(Math.max(i,0),1);let t=(this.reverse*(this.settings.max-e*this.settings.max*2)).toFixed(2),s=(this.reverse*(i*this.settings.max*2-this.settings.max)).toFixed(2),r=Math.atan2(this.event.clientX-(this.left+this.width/2),-(this.event.clientY-(this.top+this.height/2)))*(180/Math.PI);return{tiltX:t,tiltY:s,percentageX:e*100,percentageY:i*100,angle:r}}updateElementPosition(){let e=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=e.left,this.top=e.top}update(){let e=this.getValues();this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX("+(this.settings.axis==="x"?0:e.tiltY)+"deg) rotateY("+(this.settings.axis==="y"?0:e.tiltX)+"deg) scale3d("+this.settings.scale+", "+this.settings.scale+", "+this.settings.scale+")",this.glare&&(this.glareElement.style.transform=`rotate(${e.angle}deg) translate(-50%, -50%)`,this.glareElement.style.opacity=`${e.percentageY*this.settings["max-glare"]/100}`),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:e})),this.updateCall=null}prepareGlare(){if(!this.glarePrerender){const e=document.createElement("div");e.classList.add("js-tilt-glare");const i=document.createElement("div");i.classList.add("js-tilt-glare-inner"),e.appendChild(i),this.element.appendChild(e)}this.glareElementWrapper=this.element.querySelector(".js-tilt-glare"),this.glareElement=this.element.querySelector(".js-tilt-glare-inner"),!this.glarePrerender&&(Object.assign(this.glareElementWrapper.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden","pointer-events":"none","border-radius":"inherit"}),Object.assign(this.glareElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"}),this.updateGlareSize())}updateGlareSize(){if(this.glare){const e=(this.element.offsetWidth>this.element.offsetHeight?this.element.offsetWidth:this.element.offsetHeight)*2;Object.assign(this.glareElement.style,{width:`${e}px`,height:`${e}px`})}}updateClientSize(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}onWindowResize(){this.updateGlareSize(),this.updateClientSize()}setTransition(){clearTimeout(this.transitionTimeout),this.element.style.transition=this.settings.speed+"ms "+this.settings.easing,this.glare&&(this.glareElement.style.transition=`opacity ${this.settings.speed}ms ${this.settings.easing}`),this.transitionTimeout=setTimeout(()=>{this.element.style.transition="",this.glare&&(this.glareElement.style.transition="")},this.settings.speed)}extendSettings(e){let i={reverse:!1,max:15,startX:0,startY:0,perspective:1e3,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:300,transition:!0,axis:null,glare:!1,"max-glare":1,"glare-prerender":!1,"full-page-listening":!1,"mouse-event-element":null,reset:!0,"reset-to-start":!0,gyroscope:!0,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX:45,gyroscopeMinAngleY:-45,gyroscopeMaxAngleY:45,gyroscopeSamples:10},t={};for(var s in i)if(s in e)t[s]=e[s];else if(this.element.hasAttribute("data-tilt-"+s)){let r=this.element.getAttribute("data-tilt-"+s);try{t[s]=JSON.parse(r)}catch{t[s]=r}}else t[s]=i[s];return t}static init(e,i){e instanceof Node&&(e=[e]),e instanceof NodeList&&(e=[].slice.call(e)),e instanceof Array&&e.forEach(t=>{"vanillaTilt"in t||(t.vanillaTilt=new n(t,i))})}}typeof document<"u"&&(window.VanillaTilt=n,n.init(document.querySelectorAll("[data-tilt]")));const h=l.defineComponent({name:"VueTilt",props:{speed:{type:Number,default:300},max:{type:Number,default:15},startX:{type:Number,default:0},startY:{type:Number,default:0},perspective:{type:Number,default:1e3},scale:{type:Number,default:1},"max-glare":Number,axis:{type:Object,default:()=>null},"mouse-event-elemen":{type:Object,default:()=>null},easing:{type:String,default:"cubic-bezier(.03,.98,.52,.99)"},transition:{type:Boolean,default:!0},reset:{type:Boolean,default:!0},"reset-to-start":{type:Boolean,default:!0},reverse:Boolean,glare:Boolean,gyroscope:{type:Boolean,default:!0},"full-page-listenin":Boolean,gyroscopeMinAngleX:{type:Number,default:-45},gyroscopeMaxAngleX:{type:Number,default:45},gyroscopeMinAngleY:{type:Number,default:-45},gyroscopeMaxAngleY:{type:Number,default:45},gyroscopeSamples:{type:Number,default:10}},emits:["tiltChange"],setup(a,{slots:e,emit:i}){const t=l.ref();return l.onMounted(()=>{n.init(t.value,a),t.value.addEventListener("tiltChange",s=>i("tiltChange",s))}),l.onBeforeUnmount(()=>t.value.vanillaTilt.destroy()),l.watch(a,()=>{console.log(a),t.value.vanillaTilt.settings=t.value.vanillaTilt.extendSettings(a),t.value.vanillaTilt.reset()},!0),()=>[l.h("div",{ref:s=>t.value=s},e)]}});return{install(a,e){a.component((e==null?void 0:e.name)||h.name,h)}}}(Vue);
