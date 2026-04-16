import{Dn as e,Fn as t,Gn as n,Jt as r,Ln as i,Rn as a,Un as o,_t as s,an as c,cr as l,d as u,dn as d,dt as f,er as p,fn as m,in as h,lt as g,nt as _,rt as v,sn as y,tr as b,un as x,vt as S,x as C,zt as w}from"./_plugin-vue_export-helper-1acTymw5.js";import{n as T}from"./Tag-DEqc-WPA.js";import{n as E,t as D}from"./utils-DPjHlao6.js";function O(e){let{borderRadius:t,avatarColor:n,cardColor:i,fontSize:a,heightTiny:o,heightSmall:s,heightMedium:c,heightLarge:l,heightHuge:u,modalColor:d,popoverColor:f}=e;return{borderRadius:t,fontSize:a,border:`2px solid ${i}`,heightTiny:o,heightSmall:s,heightMedium:c,heightLarge:l,heightHuge:u,color:r(i,n),colorModal:r(d,n),colorPopover:r(f,n)}}var k={name:`Avatar`,common:u,self:O},A=w(`n-avatar-group`),j=c(`avatar`,`
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
`,[d(h(`&`,`--n-merged-color: var(--n-color-modal);`)),m(h(`&`,`--n-merged-color: var(--n-color-popover);`)),h(`img`,`
 width: 100%;
 height: 100%;
 `),y(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),c(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),y(`text`,`line-height: 1.25`)]),M=t({name:`Avatar`,props:Object.assign(Object.assign({},C.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),slots:Object,setup(t){let{mergedClsPrefixRef:r,inlineThemeDisabled:i}=v(t),c=l(!1),u=null,d=l(null),f=l(null),m=()=>{let{value:e}=d;if(e&&(u===null||u!==e.innerHTML)){u=e.innerHTML;let{value:t}=f;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},h=a(A,null),g=e(()=>{let{size:e}=t;if(e)return e;let{size:n}=h||{};return n||`medium`}),y=C(`Avatar`,`-avatar`,j,k,t,r),S=a(T,null),w=e(()=>{if(h)return!0;let{round:e,circle:n}=t;return e!==void 0||n!==void 0?e||n:S?S.roundRef.value:!1}),E=e(()=>h?!0:t.bordered||!1),O=e(()=>{let e=g.value,n=w.value,r=E.value,{color:i}=t,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:u},common:{cubicBezierEaseInOut:d}}=y.value,f;return f=typeof e==`number`?`${e}px`:y.value.self[x(`height`,e)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||u,"--n-bezier":d,"--n-merged-size":`var(--n-avatar-size-override, ${f})`}}),M=i?_(`avatar`,e(()=>{let e=g.value,n=w.value,r=E.value,{color:i}=t,a=``;return e&&(typeof e==`number`?a+=`a${e}`:a+=e[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=s(i)),a}),O,t):void 0,N=l(!t.lazy);n(()=>{if(t.lazy&&t.intersectionObserverOptions){let e,n=b(()=>{e?.(),e=void 0,t.lazy&&(e=D(f.value,t.intersectionObserverOptions,N))});o(()=>{n(),e?.()})}}),p(()=>t.src||t.imgProps?.src,()=>{c.value=!1});let P=l(!t.lazy);return{textRef:d,selfRef:f,mergedRoundRef:w,mergedClsPrefix:r,fitTextTransform:m,cssVars:i?void 0:O,themeClass:M?.themeClass,onRender:M?.onRender,hasLoadError:c,shouldStartLoading:N,loaded:P,mergedOnError:e=>{if(!N.value)return;c.value=!0;let{onError:n,imgProps:{onError:r}={}}=t;n?.(e),r?.(e)},mergedOnLoad:e=>{let{onLoad:n,imgProps:{onLoad:r}={}}=t;n?.(e),r?.(e),P.value=!0}}},render(){var e;let{$slots:t,src:n,mergedClsPrefix:r,lazy:a,onRender:o,loaded:s,hasLoadError:c,imgProps:l={}}=this;o?.();let u,d=!s&&!c&&(this.renderPlaceholder?this.renderPlaceholder():(e=this.$slots).placeholder?.call(e));return u=this.hasLoadError?this.renderFallback?this.renderFallback():g(t.fallback,()=>[i(`img`,{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):f(t.default,e=>{if(e)return i(S,{onResize:this.fitTextTransform},{default:()=>i(`span`,{ref:`textRef`,class:`${r}-avatar__text`},e)});if(n||l.src){let e=this.src||l.src;return i(`img`,Object.assign(Object.assign({},l),{loading:E&&!this.intersectionObserverOptions&&a?`lazy`:`eager`,src:a&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[l.style||``,{objectFit:this.objectFit},d?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]}))}}),i(`span`,{ref:`selfRef`,class:[`${r}-avatar`,this.themeClass],style:this.cssVars},u,a&&d)}});export{M as t};