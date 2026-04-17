import{$ as e,At as t,Cn as n,Dt as r,Fn as i,Ft as a,Nt as o,Ot as s,Pt as c,Q as l,Yt as u,_ as d,an as f,bt as p,dt as m,fn as h,ft as g,gt as _,it as v,mn as y,ot as b,rn as x,s as S,sn as C,wn as w}from"./_plugin-vue_export-helper-BdtRH0g-.js";import{n as T}from"./Tag-DStZyTO4.js";import{n as E,t as D}from"./utils-IxMup_Ja.js";function O(e){let{borderRadius:t,avatarColor:n,cardColor:r,fontSize:i,heightTiny:a,heightSmall:o,heightMedium:s,heightLarge:c,heightHuge:l,modalColor:u,popoverColor:d}=e;return{borderRadius:t,fontSize:i,border:`2px solid ${r}`,heightTiny:a,heightSmall:o,heightMedium:s,heightLarge:c,heightHuge:l,color:p(r,n),colorModal:p(u,n),colorPopover:p(d,n)}}var k={name:`Avatar`,common:S,self:O},A=_(`n-avatar-group`),j=s(`avatar`,`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[c(r(`&`,`--n-merged-color: var(--n-color-modal);`)),a(r(`&`,`--n-merged-color: var(--n-color-popover);`)),r(`img`,`
 width: 100%;
 height: 100%;
 `),t(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),s(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),t(`text`,`line-height: 1.25`)]),M=x({name:`Avatar`,props:Object.assign(Object.assign({},d.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),slots:Object,setup(t){let{mergedClsPrefixRef:r,inlineThemeDisabled:a}=e(t),s=i(!1),c=null,f=i(null),p=i(null),g=()=>{let{value:e}=f;if(e&&(c===null||c!==e.innerHTML)){c=e.innerHTML;let{value:t}=p;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},_=C(A,null),v=u(()=>{let{size:e}=t;if(e)return e;let{size:n}=_||{};return n||`medium`}),b=d(`Avatar`,`-avatar`,j,k,t,r),x=C(T,null),S=u(()=>{if(_)return!0;let{round:e,circle:n}=t;return e!==void 0||n!==void 0?e||n:x?x.roundRef.value:!1}),E=u(()=>_?!0:t.bordered||!1),O=u(()=>{let e=v.value,n=S.value,r=E.value,{color:i}=t,{self:{borderRadius:a,fontSize:s,color:c,border:l,colorModal:u,colorPopover:d},common:{cubicBezierEaseInOut:f}}=b.value,p;return p=typeof e==`number`?`${e}px`:b.value.self[o(`height`,e)],{"--n-font-size":s,"--n-border":r?l:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||c,"--n-color-modal":i||u,"--n-color-popover":i||d,"--n-bezier":f,"--n-merged-size":`var(--n-avatar-size-override, ${p})`}}),M=a?l(`avatar`,u(()=>{let e=v.value,n=S.value,r=E.value,{color:i}=t,a=``;return e&&(typeof e==`number`?a+=`a${e}`:a+=e[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=m(i)),a}),O,t):void 0,N=i(!t.lazy);y(()=>{if(t.lazy&&t.intersectionObserverOptions){let e,n=w(()=>{e?.(),e=void 0,t.lazy&&(e=D(p.value,t.intersectionObserverOptions,N))});h(()=>{n(),e?.()})}}),n(()=>t.src||t.imgProps?.src,()=>{s.value=!1});let P=i(!t.lazy);return{textRef:f,selfRef:p,mergedRoundRef:S,mergedClsPrefix:r,fitTextTransform:g,cssVars:a?void 0:O,themeClass:M?.themeClass,onRender:M?.onRender,hasLoadError:s,shouldStartLoading:N,loaded:P,mergedOnError:e=>{if(!N.value)return;s.value=!0;let{onError:n,imgProps:{onError:r}={}}=t;n?.(e),r?.(e)},mergedOnLoad:e=>{let{onLoad:n,imgProps:{onLoad:r}={}}=t;n?.(e),r?.(e),P.value=!0}}},render(){var e;let{$slots:t,src:n,mergedClsPrefix:r,lazy:i,onRender:a,loaded:o,hasLoadError:s,imgProps:c={}}=this;a?.();let l,u=!o&&!s&&(this.renderPlaceholder?this.renderPlaceholder():(e=this.$slots).placeholder?.call(e));return l=this.hasLoadError?this.renderFallback?this.renderFallback():v(t.fallback,()=>[f(`img`,{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):b(t.default,e=>{if(e)return f(g,{onResize:this.fitTextTransform},{default:()=>f(`span`,{ref:`textRef`,class:`${r}-avatar__text`},e)});if(n||c.src){let e=this.src||c.src;return f(`img`,Object.assign(Object.assign({},c),{loading:E&&!this.intersectionObserverOptions&&i?`lazy`:`eager`,src:i&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[c.style||``,{objectFit:this.objectFit},u?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]}))}}),f(`span`,{ref:`selfRef`,class:[`${r}-avatar`,this.themeClass],style:this.cssVars},l,i&&u)}});export{M as t};