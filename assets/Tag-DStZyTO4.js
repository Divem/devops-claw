import{$ as e,At as t,Dt as n,Fn as r,Mt as i,Nt as a,Ot as o,Q as s,Yt as c,_ as l,an as u,b as d,dt as f,gt as p,h as m,jt as h,ot as g,p as _,rn as v,s as y,st as b,v as x,vn as S,wt as C,yt as w,zn as T}from"./_plugin-vue_export-helper-BdtRH0g-.js";function E(e,t){return c(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var D=_(`close`,()=>u(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},u(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},u(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},u(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`}))))),O=o(`base-close`,`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[h(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),n(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),i(`disabled`,[n(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),n(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),n(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),n(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),n(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),h(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),h(`round`,[n(`&::before`,`
 border-radius: 50%;
 `)])]),k=v({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return x(`-base-close`,O,T(e,`clsPrefix`)),()=>{let{clsPrefix:t,disabled:n,absolute:r,round:i,isButtonTag:a}=e;return u(a?`button`:`div`,{type:a?`button`:void 0,tabindex:n||!e.focusable?-1:0,"aria-disabled":n,"aria-label":`close`,role:a?void 0:`button`,disabled:n,class:[`${t}-base-close`,r&&`${t}-base-close--absolute`,n&&`${t}-base-close--disabled`,i&&`${t}-base-close--round`],onMousedown:t=>{e.focusable||t.preventDefault()},onClick:e.onClick},u(m,{clsPrefix:t},{default:()=>u(D,null)}))}}}),A={closeIconSizeTiny:`12px`,closeIconSizeSmall:`12px`,closeIconSizeMedium:`14px`,closeIconSizeLarge:`14px`,closeSizeTiny:`16px`,closeSizeSmall:`16px`,closeSizeMedium:`18px`,closeSizeLarge:`18px`,padding:`0 7px`,closeMargin:`0 0 0 4px`};function j(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:j}=e;return Object.assign(Object.assign({},A),{closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:T,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${w(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:w(i,{alpha:.12}),colorBorderedPrimary:w(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:w(i,{alpha:.12}),closeColorPressedPrimary:w(i,{alpha:.18}),borderInfo:`1px solid ${w(a,{alpha:.3})}`,textColorInfo:a,colorInfo:w(a,{alpha:.12}),colorBorderedInfo:w(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:w(a,{alpha:.12}),closeColorPressedInfo:w(a,{alpha:.18}),borderSuccess:`1px solid ${w(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:w(o,{alpha:.12}),colorBorderedSuccess:w(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:w(o,{alpha:.12}),closeColorPressedSuccess:w(o,{alpha:.18}),borderWarning:`1px solid ${w(s,{alpha:.35})}`,textColorWarning:s,colorWarning:w(s,{alpha:.15}),colorBorderedWarning:w(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:w(s,{alpha:.12}),closeColorPressedWarning:w(s,{alpha:.18}),borderError:`1px solid ${w(c,{alpha:.23})}`,textColorError:c,colorError:w(c,{alpha:.1}),colorBorderedError:w(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:w(c,{alpha:.12}),closeColorPressedError:w(c,{alpha:.18})})}var M={name:`Tag`,common:y,self:j},N={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},P=o(`tag`,`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[h(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),t(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),t(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),t(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),t(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),h(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[t(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),t(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),h(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),h(`icon, avatar`,[h(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),h(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),h(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[i(`disabled`,[n(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[i(`checked`,`color: var(--n-text-color-hover-checkable);`)]),n(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[i(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),h(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[i(`disabled`,[n(`&:hover`,`background-color: var(--n-color-checked-hover);`),n(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),F=Object.assign(Object.assign(Object.assign({},l.props),N),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),I=p(`n-tag`),L=v({name:`Tag`,props:F,slots:Object,setup(t){let n=r(null),{mergedBorderedRef:i,mergedClsPrefixRef:o,inlineThemeDisabled:u,mergedRtlRef:p,mergedComponentPropsRef:m}=e(t),h=c(()=>t.size||m?.value?.Tag?.size||`medium`),g=l(`Tag`,`-tag`,P,M,t,o);S(I,{roundRef:T(t,`round`)});function _(){if(!t.disabled&&t.checkable){let{checked:e,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=t;r&&r(!e),i&&i(!e),n&&n(!e)}}function v(e){if(t.triggerClickOnClose||e.stopPropagation(),!t.disabled){let{onClose:n}=t;n&&b(n,e)}}let y={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},x=d(`Tag`,p,o),w=c(()=>{let{type:e,color:{color:n,textColor:r}={}}=t,o=h.value,{common:{cubicBezierEaseInOut:s},self:{padding:c,closeMargin:l,borderRadius:u,opacityDisabled:d,textColorCheckable:f,textColorHoverCheckable:p,textColorPressedCheckable:m,textColorChecked:_,colorCheckable:v,colorHoverCheckable:y,colorPressedCheckable:b,colorChecked:x,colorCheckedHover:S,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[a(`colorBordered`,e)]:D,[a(`closeSize`,o)]:O,[a(`closeIconSize`,o)]:k,[a(`fontSize`,o)]:A,[a(`height`,o)]:j,[a(`color`,e)]:M,[a(`textColor`,e)]:N,[a(`border`,e)]:P,[a(`closeIconColor`,e)]:F,[a(`closeIconColorHover`,e)]:I,[a(`closeIconColorPressed`,e)]:L,[a(`closeColorHover`,e)]:R,[a(`closeColorPressed`,e)]:z}}=g.value,B=C(l);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":s,"--n-border-radius":u,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(i.value?D:M),"--n-color-checkable":v,"--n-color-checked":x,"--n-color-checked-hover":S,"--n-color-checked-pressed":w,"--n-color-hover-checkable":y,"--n-color-pressed-checkable":b,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":d,"--n-padding":c,"--n-text-color":r||N,"--n-text-color-checkable":f,"--n-text-color-checked":_,"--n-text-color-hover-checkable":p,"--n-text-color-pressed-checkable":m}}),E=u?s(`tag`,c(()=>{let e=``,{type:n,color:{color:r,textColor:a}={}}=t;return e+=n[0],e+=h.value[0],r&&(e+=`a${f(r)}`),a&&(e+=`b${f(a)}`),i.value&&(e+=`c`),e}),w,t):void 0;return Object.assign(Object.assign({},y),{rtlEnabled:x,mergedClsPrefix:o,contentRef:n,mergedBordered:i,handleClick:_,handleCloseClick:v,cssVars:u?void 0:w,themeClass:E?.themeClass,onRender:E?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let c=g(s.avatar,e=>e&&u(`div`,{class:`${t}-tag__avatar`},e)),l=g(s.icon,e=>e&&u(`div`,{class:`${t}-tag__icon`},e));return u(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:c,[`${t}-tag--icon`]:l,[`${t}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},l||c,u(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&r?u(k,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?u(`div`,{class:`${t}-tag__border`,style:{borderColor:i}}):null)}});export{E as i,I as n,k as r,L as t};