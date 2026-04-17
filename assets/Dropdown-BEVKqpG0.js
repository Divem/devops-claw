import{$ as e,At as t,Cn as n,Dt as r,Fn as i,Gt as a,Mt as o,Nt as s,Ot as c,Q as l,Rt as u,Yt as d,_ as f,an as p,cn as m,g as h,gt as g,jt as _,rn as v,s as y,sn as b,st as x,ut as S,vn as C,vt as w,yt as T,zn as E}from"./_plugin-vue_export-helper-BdtRH0g-.js";import{A as D,_ as O,b as k,g as A,m as j,o as M,p as N,r as P,s as F,t as I,w as L}from"./fade-in-scale-up.cssr-BLGcyaqm.js";import{a as ee,c as R,i as z,l as B,n as V,r as te,t as ne}from"./Popover-BumYDjd9.js";import{t as re}from"./use-keyboard-CMhA2Jfa.js";function ie(e,t,r){if(!t)return e;let a=i(e.value),o=null;return n(e,e=>{o!==null&&window.clearTimeout(o),e===!0?r&&!r.value?a.value=!0:o=window.setTimeout(()=>{a.value=!0},t):a.value=!1}),a}function H(e){return t=>{t?e.value=t.$el:e.value=null}}var U=v({name:`ChevronRight`,render(){return p(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},p(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),ae={padding:`4px 0`,optionIconSizeSmall:`14px`,optionIconSizeMedium:`16px`,optionIconSizeLarge:`16px`,optionIconSizeHuge:`18px`,optionSuffixWidthSmall:`14px`,optionSuffixWidthMedium:`14px`,optionSuffixWidthLarge:`16px`,optionSuffixWidthHuge:`16px`,optionIconSuffixWidthSmall:`32px`,optionIconSuffixWidthMedium:`32px`,optionIconSuffixWidthLarge:`36px`,optionIconSuffixWidthHuge:`36px`,optionPrefixWidthSmall:`14px`,optionPrefixWidthMedium:`14px`,optionPrefixWidthLarge:`16px`,optionPrefixWidthHuge:`16px`,optionIconPrefixWidthSmall:`36px`,optionIconPrefixWidthMedium:`36px`,optionIconPrefixWidthLarge:`40px`,optionIconPrefixWidthHuge:`40px`};function oe(e){let{primaryColor:t,textColor2:n,dividerColor:r,hoverColor:i,popoverColor:a,invertedColor:o,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,heightSmall:f,heightMedium:p,heightLarge:m,heightHuge:h,textColor3:g,opacityDisabled:_}=e;return Object.assign(Object.assign({},ae),{optionHeightSmall:f,optionHeightMedium:p,optionHeightLarge:m,optionHeightHuge:h,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,optionTextColor:n,optionTextColorHover:n,optionTextColorActive:t,optionTextColorChildActive:t,color:a,dividerColor:r,suffixColor:n,prefixColor:n,optionColorHover:i,optionColorActive:T(t,{alpha:.1}),groupHeaderTextColor:g,optionTextColorInverted:`#BBB`,optionTextColorHoverInverted:`#FFF`,optionTextColorActiveInverted:`#FFF`,optionTextColorChildActiveInverted:`#FFF`,colorInverted:o,dividerColorInverted:`#BBB`,suffixColorInverted:`#BBB`,prefixColorInverted:`#BBB`,optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:`#AAA`,optionOpacityDisabled:_})}var W=h({name:`Dropdown`,common:y,peers:{Popover:z},self:oe}),G=g(`n-dropdown-menu`),K=g(`n-dropdown`),q=g(`n-dropdown-option`),J=v({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return p(`div`,{class:`${this.clsPrefix}-dropdown-divider`})}}),se=v({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=b(G),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=b(K);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:a}=this,{rawNode:o}=this.tmNode,s=p(`div`,Object.assign({class:`${e}-dropdown-option`},r?.(o)),p(`div`,{class:`${e}-dropdown-option-body ${e}-dropdown-option-body--group`},p(`div`,{"data-dropdown-option":!0,class:[`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`]},R(o.icon)),p(`div`,{class:`${e}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(o):R(o.title??o[this.labelField])),p(`div`,{class:[`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return a?a({node:s,option:o}):s}});function ce(e){let{textColorBase:t,opacity1:n,opacity2:r,opacity3:i,opacity4:a,opacity5:o}=e;return{color:t,opacity1Depth:n,opacity2Depth:r,opacity3Depth:i,opacity4Depth:a,opacity5Depth:o}}var le={name:`Icon`,common:y,self:ce},ue=c(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[_(`color-transition`,{transition:`color .3s var(--n-bezier)`}),_(`depth`,{color:`var(--n-color)`},[r(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),r(`svg`,{height:`1em`,width:`1em`})]),Y=v({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:Object.assign(Object.assign({},f.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=e(t),i=f(`Icon`,`-icon`,ue,le,t,n),a=d(()=>{let{depth:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(e!==void 0){let{color:t,[`opacity${e}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":t,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?l(`icon`,d(()=>`${t.depth||`d`}`),a,t):void 0;return{mergedClsPrefix:n,mergedStyle:d(()=>{let{size:e,color:n}=t;return{fontSize:M(e),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&S(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),p(`i`,m(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?p(r):this.$slots)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function de(e){return e.type===`group`}function Z(e){return e.type===`divider`}function fe(e){return e.type===`render`}var Q=v({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=b(K),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:f,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:g,menuPropsRef:_}=t,v=b(q,null),y=b(G),x=b(A),S=d(()=>e.tmNode.rawNode),T=d(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),E=d(()=>{let{disabled:t}=e.tmNode;return t}),O=ie(d(()=>{if(!T.value)return!1;let{key:t,disabled:i}=e.tmNode;if(i)return!1;let{value:s}=n,{value:c}=r,{value:l}=a,{value:u}=o;return s===null?c===null?l===null?!1:u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,d(()=>r.value===null&&!c.value)),k=d(()=>!!v?.enteringSubmenuRef.value),j=i(!1);C(q,{enteringSubmenuRef:j});function M(){j.value=!0}function N(){j.value=!1}function P(){let{parentKey:t,tmNode:i}=e;i.disabled||l.value&&(a.value=t,r.value=null,n.value=i.key)}function F(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&P()}function I(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!D({target:r},`dropdownOption`)&&!D({target:r},`scrollbarRail`)&&(n.value=null)}function L(){let{value:n}=T,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:u,renderIcon:f,siblingHasIcon:y.showIconRef,siblingHasSubmenu:y.hasSubmenuRef,menuProps:_,popoverBody:x,animated:c,mergedShowSubmenu:d(()=>O.value&&!k.value),rawNode:S,hasSubmenu:T,pending:w(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:w(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r===-1?!1:r<t.length-1}),active:w(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r===-1?!1:r===t.length-1}),mergedDisabled:E,renderOption:h,nodeProps:g,handleClick:L,handleMouseMove:F,handleMouseEnter:P,handleMouseLeave:I,handleSubmenuBeforeEnter:M,handleSubmenuAfterEnter:N}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:r,siblingHasIcon:i,siblingHasSubmenu:a,renderLabel:o,renderIcon:s,renderOption:c,nodeProps:l,props:d,scrollable:f}=this,h=null;if(n){let e=this.menuProps?.call(this,t,t.children);h=p($,Object.assign({},e,{clsPrefix:r,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}let g={class:[`${r}-dropdown-option-body`,this.pending&&`${r}-dropdown-option-body--pending`,this.active&&`${r}-dropdown-option-body--active`,this.childActive&&`${r}-dropdown-option-body--child-active`,this.mergedDisabled&&`${r}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},_=l?.(t),v=p(`div`,Object.assign({class:[`${r}-dropdown-option`,_?.class],"data-dropdown-option":!0},_),p(`div`,m(g,d),[p(`div`,{class:[`${r}-dropdown-option-body__prefix`,i&&`${r}-dropdown-option-body__prefix--show-icon`]},[s?s(t):R(t.icon)]),p(`div`,{"data-dropdown-option":!0,class:`${r}-dropdown-option-body__label`},o?o(t):R(t[this.labelField]??t.title)),p(`div`,{"data-dropdown-option":!0,class:[`${r}-dropdown-option-body__suffix`,a&&`${r}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?p(Y,null,{default:()=>p(U,null)}):null)]),this.hasSubmenu?p(j,null,{default:()=>[p(N,null,{default:()=>p(`div`,{class:`${r}-dropdown-offset-container`},p(F,{show:this.mergedShowSubmenu,placement:this.placement,to:f&&this.popoverBody||void 0,teleportDisabled:!f},{default:()=>p(`div`,{class:`${r}-dropdown-menu-wrapper`},e?p(u,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>h}):h)}))})]}):null);return c?c({node:v,option:t}):v}}),pe=v({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:r}=e;return p(a,null,p(se,{clsPrefix:n,tmNode:e,key:e.key}),r?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Z(r)?p(J,{clsPrefix:n,key:e.key}):e.isGroup?(S(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):p(Q,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key})}))}}),me=v({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return p(`div`,t,[e?.()])}}),$=v({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=b(K);C(G,{showIconRef:d(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:d(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=i(null);return C(O,null),C(k,null),C(A,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,r=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:fe(i)?p(me,{tmNode:r,key:r.key}):Z(i)?p(J,{clsPrefix:t,key:r.key}):de(i)?p(pe,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key}):p(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n})});return p(`div`,{class:[`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`],ref:`bodyRef`},n?p(P,{contentClass:`${t}-dropdown-menu__content`},{default:()=>r}):r,this.showArrow?te({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),he=c(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[I(),c(`dropdown-option`,`
 position: relative;
 `,[r(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[r(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),c(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[r(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),o(`disabled`,[_(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[t(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),r(`&::before`,`background-color: var(--n-option-color-hover);`)]),_(`active`,`
 color: var(--n-option-text-color-active);
 `,[t(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),r(`&::before`,`background-color: var(--n-option-color-active);`)]),_(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[t(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),_(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),_(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[t(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[_(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),t(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[_(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),c(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),t(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),t(`suffix`,`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[_(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),c(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),c(`dropdown-menu`,`pointer-events: all;`)]),c(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),c(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),c(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),r(`>`,[c(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),o(`scrollable`,`
 padding: var(--n-padding);
 `),_(`scrollable`,[t(`content`,`
 padding: var(--n-padding);
 `)])]),ge={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},_e=Object.keys(V),ve=v({name:`Dropdown`,inheritAttrs:!1,props:Object.assign(Object.assign(Object.assign({},V),ge),f.props),setup(t){let r=i(!1),a=L(E(t,`show`),r),o=d(()=>{let{keyField:e,childrenField:n}=t;return ee(t.options,{getKey(t){return t[e]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),c=d(()=>o.value.treeNodes),u=i(null),p=i(null),m=i(null),h=d(()=>u.value??p.value??m.value??null),g=d(()=>o.value.getPath(h.value).keyPath),_=d(()=>o.value.getPath(t.value).keyPath),v=w(()=>t.keyboard&&a.value);re({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},v);let{mergedClsPrefixRef:y,inlineThemeDisabled:b,mergedComponentPropsRef:S}=e(t),T=d(()=>t.size||S?.value?.Dropdown?.size||`medium`),D=f(`Dropdown`,`-dropdown`,he,W,t,y);C(K,{labelFieldRef:E(t,`labelField`),childrenFieldRef:E(t,`childrenField`),renderLabelRef:E(t,`renderLabel`),renderIconRef:E(t,`renderIcon`),hoverKeyRef:u,keyboardKeyRef:p,lastToggledSubmenuKeyRef:m,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:E(t,`animated`),mergedShowRef:a,nodePropsRef:E(t,`nodeProps`),renderOptionRef:E(t,`renderOption`),menuPropsRef:E(t,`menuProps`),doSelect:O,doUpdateShow:k}),n(a,e=>{!t.animated&&!e&&A()});function O(e,n){let{onSelect:r}=t;r&&x(r,e,n)}function k(e){let{"onUpdate:show":n,onUpdateShow:i}=t;n&&x(n,e),i&&x(i,e),r.value=e}function A(){u.value=null,p.value=null,m.value=null}function j(){k(!1)}function M(){z(`left`)}function N(){z(`right`)}function P(){z(`up`)}function F(){z(`down`)}function I(){let e=R();e?.isLeaf&&a.value&&(O(e.key,e.rawNode),k(!1))}function R(){let{value:e}=o,{value:t}=h;return!e||t===null?null:e.getNode(t)??null}function z(e){let{value:t}=h,{value:{getFirstAvailableNode:n}}=o,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=R();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent();break}n&&(r=n.key)}}r!==null&&(u.value=null,p.value=r)}let B=d(()=>{let{inverted:e}=t,n=T.value,{common:{cubicBezierEaseInOut:r},self:i}=D.value,{padding:a,dividerColor:o,borderRadius:c,optionOpacityDisabled:l,[s(`optionIconSuffixWidth`,n)]:u,[s(`optionSuffixWidth`,n)]:d,[s(`optionIconPrefixWidth`,n)]:f,[s(`optionPrefixWidth`,n)]:p,[s(`fontSize`,n)]:m,[s(`optionHeight`,n)]:h,[s(`optionIconSize`,n)]:g}=i,_={"--n-bezier":r,"--n-font-size":m,"--n-padding":a,"--n-border-radius":c,"--n-option-height":h,"--n-option-prefix-width":p,"--n-option-icon-prefix-width":f,"--n-option-suffix-width":d,"--n-option-icon-suffix-width":u,"--n-option-icon-size":g,"--n-divider-color":o,"--n-option-opacity-disabled":l};return e?(_[`--n-color`]=i.colorInverted,_[`--n-option-color-hover`]=i.optionColorHoverInverted,_[`--n-option-color-active`]=i.optionColorActiveInverted,_[`--n-option-text-color`]=i.optionTextColorInverted,_[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,_[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,_[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,_[`--n-prefix-color`]=i.prefixColorInverted,_[`--n-suffix-color`]=i.suffixColorInverted,_[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(_[`--n-color`]=i.color,_[`--n-option-color-hover`]=i.optionColorHover,_[`--n-option-color-active`]=i.optionColorActive,_[`--n-option-text-color`]=i.optionTextColor,_[`--n-option-text-color-hover`]=i.optionTextColorHover,_[`--n-option-text-color-active`]=i.optionTextColorActive,_[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,_[`--n-prefix-color`]=i.prefixColor,_[`--n-suffix-color`]=i.suffixColor,_[`--n-group-header-text-color`]=i.groupHeaderTextColor),_}),V=b?l(`dropdown`,d(()=>`${T.value[0]}${t.inverted?`i`:``}`),B,t):void 0;return{mergedClsPrefix:y,mergedTheme:D,mergedSize:T,tmNodes:c,mergedShow:a,handleAfterLeave:()=>{t.animated&&A()},doUpdateShow:k,cssVars:b?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let e=(e,t,n,r,i)=>{var a;let{mergedClsPrefix:o,menuProps:s}=this;(a=this.onRender)==null||a.call(this);let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:H(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return p($,m(this.$attrs,l,c))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return p(ne,Object.assign({},B(this.$props,_e),n),{trigger:()=>{var e;return(e=this.$slots).default?.call(e)}})}});export{H as a,U as i,Y as n,W as r,ve as t};