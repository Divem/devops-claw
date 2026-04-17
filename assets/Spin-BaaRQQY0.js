import{$ as e,Dt as t,Fn as n,Nt as r,Ot as i,Q as a,Rt as o,Tt as s,Yt as c,_ as l,an as u,c as d,jt as f,l as p,rn as m,s as h,u as g,wn as _}from"./_plugin-vue_export-helper-BdtRH0g-.js";import{i as v}from"./Tag-DStZyTO4.js";function y(e){let{opacityDisabled:t,heightTiny:n,heightSmall:r,heightMedium:i,heightLarge:a,heightHuge:o,primaryColor:s,fontSize:c}=e;return{fontSize:c,textColor:s,sizeTiny:n,sizeSmall:r,sizeMedium:i,sizeLarge:a,sizeHuge:o,color:s,opacitySpinning:t}}var b={name:`Spin`,common:h,self:y},x=t([t(`@keyframes spin-rotate`,`
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
 `,[d()])]),i(`spin-body`,`
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
 `,[f(`rotate`,`
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
 `,[f(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),S={small:20,medium:18,large:16},C=m({name:`Spin`,props:Object.assign(Object.assign(Object.assign({},l.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),g),slots:Object,setup(t){let{mergedClsPrefixRef:i,inlineThemeDisabled:o}=e(t),u=l(`Spin`,`-spin`,x,b,t,i),d=c(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:i}=u.value,{opacitySpinning:a,color:o,textColor:c}=i,l=typeof e==`number`?s(e):i[r(`size`,e)];return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":l,"--n-color":o,"--n-text-color":c}}),f=o?a(`spin`,c(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),d,t):void 0,p=v(t,[`spinning`,`show`]),m=n(!1);return _(e=>{let n;if(p.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{m.value=!0},r),e(()=>{clearTimeout(n)});return}}m.value=p.value}),{mergedClsPrefix:i,active:m,mergedStrokeWidth:c(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return S[typeof n==`number`?`medium`:n]}),cssVars:o?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender}},render(){var e;let{$slots:t,mergedClsPrefix:n,description:r}=this,i=t.icon&&this.rotate,a=(r||t.description)&&u(`div`,{class:`${n}-spin-description`},r||t.description?.call(t)),s=t.icon?u(`div`,{class:[`${n}-spin-body`,this.themeClass]},u(`div`,{class:[`${n}-spin`,i&&`${n}-spin--rotate`],style:t.default?``:this.cssVars},t.icon()),a):u(`div`,{class:[`${n}-spin-body`,this.themeClass]},u(p,{clsPrefix:n,style:t.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${n}-spin`}),a);return(e=this.onRender)==null||e.call(this),t.default?u(`div`,{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},u(`div`,{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),u(o,{name:`fade-in-transition`},{default:()=>this.active?s:null})):s}});export{C as t};