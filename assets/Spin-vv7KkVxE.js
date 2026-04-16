import{$t as e,Dn as t,Fn as n,Ln as r,an as i,cn as a,cr as o,d as s,f as c,gn as l,in as u,m as d,nt as f,p,rt as m,tr as h,un as g,x as _}from"./_plugin-vue_export-helper-1acTymw5.js";import{g as v}from"./Tag-DEqc-WPA.js";function y(e){let{opacityDisabled:t,heightTiny:n,heightSmall:r,heightMedium:i,heightLarge:a,heightHuge:o,primaryColor:s,fontSize:c}=e;return{fontSize:c,textColor:s,sizeTiny:n,sizeSmall:r,sizeMedium:i,sizeLarge:a,sizeHuge:o,color:s,opacitySpinning:t}}var b={name:`Spin`,common:s,self:y},x=u([u(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),i(`spin-container`,`
 position: relative;
 `,[i(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[c()])]),i(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),i(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[a(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),i(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),i(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[a(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),S={small:20,medium:18,large:16},C=n({name:`Spin`,props:Object.assign(Object.assign(Object.assign({},_.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),d),slots:Object,setup(n){let{mergedClsPrefixRef:r,inlineThemeDisabled:i}=m(n),a=_(`Spin`,`-spin`,x,b,n,r),s=t(()=>{let{size:t}=n,{common:{cubicBezierEaseInOut:r},self:i}=a.value,{opacitySpinning:o,color:s,textColor:c}=i,l=typeof t==`number`?e(t):i[g(`size`,t)];return{"--n-bezier":r,"--n-opacity-spinning":o,"--n-size":l,"--n-color":s,"--n-text-color":c}}),c=i?f(`spin`,t(()=>{let{size:e}=n;return typeof e==`number`?String(e):e[0]}),s,n):void 0,l=v(n,[`spinning`,`show`]),u=o(!1);return h(e=>{let t;if(l.value){let{delay:r}=n;if(r){t=window.setTimeout(()=>{u.value=!0},r),e(()=>{clearTimeout(t)});return}}u.value=l.value}),{mergedClsPrefix:r,active:u,mergedStrokeWidth:t(()=>{let{strokeWidth:e}=n;if(e!==void 0)return e;let{size:t}=n;return S[typeof t==`number`?`medium`:t]}),cssVars:i?void 0:s,themeClass:c?.themeClass,onRender:c?.onRender}},render(){var e;let{$slots:t,mergedClsPrefix:n,description:i}=this,a=t.icon&&this.rotate,o=(i||t.description)&&r(`div`,{class:`${n}-spin-description`},i||t.description?.call(t)),s=t.icon?r(`div`,{class:[`${n}-spin-body`,this.themeClass]},r(`div`,{class:[`${n}-spin`,a&&`${n}-spin--rotate`],style:t.default?``:this.cssVars},t.icon()),o):r(`div`,{class:[`${n}-spin-body`,this.themeClass]},r(p,{clsPrefix:n,style:t.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${n}-spin`}),o);return(e=this.onRender)==null||e.call(this),t.default?r(`div`,{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},r(`div`,{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),r(l,{name:`fade-in-transition`},{default:()=>this.active?s:null})):s}});export{C as t};