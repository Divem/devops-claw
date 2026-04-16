import{Cn as e,Dn as t,Dt as n,Fn as r,Ft as i,Ln as a,Mt as o,Ot as s,Rn as c,Vt as l,Wt as u,Yn as d,an as f,b as p,bt as m,cn as h,cr as g,d as _,dr as v,er as y,ft as b,gn as x,gt as S,ht as C,in as w,jt as T,l as E,ln as D,nt as O,qt as k,rt as A,s as j,sn as M,tn as N,un as P,x as F,zn as I,zt as L}from"./_plugin-vue_export-helper-1acTymw5.js";import{a as R,d as z,f as B,i as V,o as ee,r as te,s as ne}from"./Tag-DEqc-WPA.js";import{t as re}from"./use-keyboard-Ybb3pQqZ.js";function ie(e,t,n){if(!t)return e;let r=g(e.value),i=null;return y(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}function H(e){return t=>{t?e.value=t.$el:e.value=null}}var U=r({name:`ChevronRight`,render(){return a(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},a(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),ae={padding:`4px 0`,optionIconSizeSmall:`14px`,optionIconSizeMedium:`16px`,optionIconSizeLarge:`16px`,optionIconSizeHuge:`18px`,optionSuffixWidthSmall:`14px`,optionSuffixWidthMedium:`14px`,optionSuffixWidthLarge:`16px`,optionSuffixWidthHuge:`16px`,optionIconSuffixWidthSmall:`32px`,optionIconSuffixWidthMedium:`32px`,optionIconSuffixWidthLarge:`36px`,optionIconSuffixWidthHuge:`36px`,optionPrefixWidthSmall:`14px`,optionPrefixWidthMedium:`14px`,optionPrefixWidthLarge:`16px`,optionPrefixWidthHuge:`16px`,optionIconPrefixWidthSmall:`36px`,optionIconPrefixWidthMedium:`36px`,optionIconPrefixWidthLarge:`40px`,optionIconPrefixWidthHuge:`40px`};function oe(e){let{primaryColor:t,textColor2:n,dividerColor:r,hoverColor:i,popoverColor:a,invertedColor:o,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,heightSmall:f,heightMedium:p,heightLarge:m,heightHuge:h,textColor3:g,opacityDisabled:_}=e;return Object.assign(Object.assign({},ae),{optionHeightSmall:f,optionHeightMedium:p,optionHeightLarge:m,optionHeightHuge:h,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,optionTextColor:n,optionTextColorHover:n,optionTextColorActive:t,optionTextColorChildActive:t,color:a,dividerColor:r,suffixColor:n,prefixColor:n,optionColorHover:i,optionColorActive:k(t,{alpha:.1}),groupHeaderTextColor:g,optionTextColorInverted:`#BBB`,optionTextColorHoverInverted:`#FFF`,optionTextColorActiveInverted:`#FFF`,optionTextColorChildActiveInverted:`#FFF`,colorInverted:o,dividerColorInverted:`#BBB`,suffixColorInverted:`#BBB`,prefixColorInverted:`#BBB`,optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:`#AAA`,optionOpacityDisabled:_})}var W=p({name:`Dropdown`,common:_,peers:{Popover:ee},self:oe}),G=L(`n-dropdown-menu`),K=L(`n-dropdown`),q=L(`n-dropdown-option`),J=r({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return a(`div`,{class:`${this.clsPrefix}-dropdown-divider`})}}),se=r({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=c(G),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=c(K);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:o}=this,{rawNode:s}=this.tmNode,c=a(`div`,Object.assign({class:`${e}-dropdown-option`},r?.(s)),a(`div`,{class:`${e}-dropdown-option-body ${e}-dropdown-option-body--group`},a(`div`,{"data-dropdown-option":!0,class:[`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`]},z(s.icon)),a(`div`,{class:`${e}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(s):z(s.title??s[this.labelField])),a(`div`,{class:[`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return o?o({node:c,option:s}):c}});function ce(e){let{textColorBase:t,opacity1:n,opacity2:r,opacity3:i,opacity4:a,opacity5:o}=e;return{color:t,opacity1Depth:n,opacity2Depth:r,opacity3Depth:i,opacity4Depth:a,opacity5Depth:o}}var le={name:`Icon`,common:_,self:ce},ue=f(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[h(`color-transition`,{transition:`color .3s var(--n-bezier)`}),h(`depth`,{color:`var(--n-color)`},[w(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),w(`svg`,{height:`1em`,width:`1em`})]),Y=r({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:Object.assign(Object.assign({},F.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=A(e),i=F(`Icon`,`-icon`,ue,le,e,n),a=t(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?O(`icon`,t(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:n,mergedStyle:t(()=>{let{size:t,color:n}=e;return{fontSize:S(t),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:o}=this;return e?.$options?._n_icon__&&C(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),a(`i`,I(this.$attrs,{role:`img`,class:[`${n}-icon`,o,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?a(r):this.$slots)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function de(e){return e.type===`group`}function Z(e){return e.type===`divider`}function fe(e){return e.type===`render`}var Q=r({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=c(K),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:l,mergedShowRef:f,renderLabelRef:p,renderIconRef:m,labelFieldRef:h,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=n,x=c(q,null),S=c(G),C=c(T),w=t(()=>e.tmNode.rawNode),E=t(()=>{let{value:t}=_;return X(e.tmNode.rawNode,t)}),D=t(()=>{let{disabled:t}=e.tmNode;return t}),O=ie(t(()=>{if(!E.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:s}=r,{value:c}=i,{value:l}=a,{value:u}=o;return s===null?c===null?l===null?!1:u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,t(()=>i.value===null&&!l.value)),k=t(()=>!!x?.enteringSubmenuRef.value),A=g(!1);d(q,{enteringSubmenuRef:A});function j(){A.value=!0}function M(){A.value=!1}function P(){let{parentKey:t,tmNode:n}=e;n.disabled||f.value&&(a.value=t,i.value=null,r.value=n.key)}function F(){let{tmNode:t}=e;t.disabled||f.value&&r.value!==t.key&&P()}function I(t){if(e.tmNode.disabled||!f.value)return;let{relatedTarget:n}=t;n&&!N({target:n},`dropdownOption`)&&!N({target:n},`scrollbarRail`)&&(r.value=null)}function L(){let{value:t}=E,{tmNode:r}=e;f.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:h,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:l,mergedShowSubmenu:t(()=>O.value&&!k.value),rawNode:w,hasSubmenu:E,pending:u(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:u(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r===-1?!1:r<t.length-1}),active:u(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r===-1?!1:r===t.length-1}),mergedDisabled:D,renderOption:v,nodeProps:y,handleClick:L,handleMouseMove:F,handleMouseEnter:P,handleMouseLeave:I,handleSubmenuBeforeEnter:j,handleSubmenuAfterEnter:M}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:o,siblingHasSubmenu:c,renderLabel:l,renderIcon:u,renderOption:d,nodeProps:f,props:p,scrollable:h}=this,g=null;if(r){let e=this.menuProps?.call(this,t,t.children);g=a($,Object.assign({},e,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}let _={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},v=f?.(t),y=a(`div`,Object.assign({class:[`${i}-dropdown-option`,v?.class],"data-dropdown-option":!0},v),a(`div`,I(_,p),[a(`div`,{class:[`${i}-dropdown-option-body__prefix`,o&&`${i}-dropdown-option-body__prefix--show-icon`]},[u?u(t):z(t.icon)]),a(`div`,{"data-dropdown-option":!0,class:`${i}-dropdown-option-body__label`},l?l(t):z(t[this.labelField]??t.title)),a(`div`,{"data-dropdown-option":!0,class:[`${i}-dropdown-option-body__suffix`,c&&`${i}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?a(Y,null,{default:()=>a(U,null)}):null)]),this.hasSubmenu?a(s,null,{default:()=>[a(n,null,{default:()=>a(`div`,{class:`${i}-dropdown-offset-container`},a(m,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>a(`div`,{class:`${i}-dropdown-menu-wrapper`},e?a(x,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g}):g)}))})]}):null);return d?d({node:y,option:t}):y}}),pe=r({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:r}=this,{children:i}=t;return a(e,null,a(se,{clsPrefix:r,tmNode:t,key:t.key}),i?.map(e=>{let{rawNode:t}=e;return t.show===!1?null:Z(t)?a(J,{clsPrefix:r,key:e.key}):e.isGroup?(C(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):a(Q,{clsPrefix:r,tmNode:e,parentKey:n,key:e.key})}))}}),me=r({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return a(`div`,t,[e?.()])}}),$=r({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=c(K);d(G,{showIconRef:t(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:t(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let a=g(null);return d(o,null),d(i,null),d(T,a),{bodyRef:a}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,r=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:fe(i)?a(me,{tmNode:r,key:r.key}):Z(i)?a(J,{clsPrefix:t,key:r.key}):de(i)?a(pe,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key}):a(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n})});return a(`div`,{class:[`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`],ref:`bodyRef`},n?a(E,{contentClass:`${t}-dropdown-menu__content`},{default:()=>r}):r,this.showArrow?R({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),he=f(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[j(),f(`dropdown-option`,`
 position: relative;
 `,[w(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[w(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),f(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[w(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),D(`disabled`,[h(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[M(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),w(`&::before`,`background-color: var(--n-option-color-hover);`)]),h(`active`,`
 color: var(--n-option-text-color-active);
 `,[M(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),w(`&::before`,`background-color: var(--n-option-color-active);`)]),h(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[M(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),h(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),h(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[M(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[h(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),M(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[h(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),f(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),M(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),M(`suffix`,`
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
 `,[h(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),f(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),f(`dropdown-menu`,`pointer-events: all;`)]),f(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),f(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),f(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),w(`>`,[f(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),D(`scrollable`,`
 padding: var(--n-padding);
 `),h(`scrollable`,[M(`content`,`
 padding: var(--n-padding);
 `)])]),ge={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},_e=Object.keys(V),ve=r({name:`Dropdown`,inheritAttrs:!1,props:Object.assign(Object.assign(Object.assign({},V),ge),F.props),setup(e){let n=g(!1),r=l(v(e,`show`),n),i=t(()=>{let{keyField:t,childrenField:n}=e;return ne(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),a=t(()=>i.value.treeNodes),o=g(null),s=g(null),c=g(null),f=t(()=>o.value??s.value??c.value??null),p=t(()=>i.value.getPath(f.value).keyPath),m=t(()=>i.value.getPath(e.value).keyPath),h=u(()=>e.keyboard&&r.value);re({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:I},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:L},Escape:k}},h);let{mergedClsPrefixRef:_,inlineThemeDisabled:x,mergedComponentPropsRef:S}=A(e),C=t(()=>e.size||S?.value?.Dropdown?.size||`medium`),w=F(`Dropdown`,`-dropdown`,he,W,e,_);d(K,{labelFieldRef:v(e,`labelField`),childrenFieldRef:v(e,`childrenField`),renderLabelRef:v(e,`renderLabel`),renderIconRef:v(e,`renderIcon`),hoverKeyRef:o,keyboardKeyRef:s,lastToggledSubmenuKeyRef:c,pendingKeyPathRef:p,activeKeyPathRef:m,animatedRef:v(e,`animated`),mergedShowRef:r,nodePropsRef:v(e,`nodeProps`),renderOptionRef:v(e,`renderOption`),menuPropsRef:v(e,`menuProps`),doSelect:T,doUpdateShow:E}),y(r,t=>{!e.animated&&!t&&D()});function T(t,n){let{onSelect:r}=e;r&&b(r,t,n)}function E(t){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&b(r,t),i&&b(i,t),n.value=t}function D(){o.value=null,s.value=null,c.value=null}function k(){E(!1)}function j(){z(`left`)}function M(){z(`right`)}function N(){z(`up`)}function I(){z(`down`)}function L(){let e=R();e?.isLeaf&&r.value&&(T(e.key,e.rawNode),E(!1))}function R(){let{value:e}=i,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function z(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=i,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=R();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent();break}n&&(r=n.key)}}r!==null&&(o.value=null,s.value=r)}let B=t(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[P(`optionIconSuffixWidth`,n)]:l,[P(`optionSuffixWidth`,n)]:u,[P(`optionIconPrefixWidth`,n)]:d,[P(`optionPrefixWidth`,n)]:f,[P(`fontSize`,n)]:p,[P(`optionHeight`,n)]:m,[P(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),V=x?O(`dropdown`,t(()=>`${C.value[0]}${e.inverted?`i`:``}`),B,e):void 0;return{mergedClsPrefix:_,mergedTheme:w,mergedSize:C,tmNodes:a,mergedShow:r,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:E,cssVars:x?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let e=(e,t,n,r,i)=>{var o;let{mergedClsPrefix:s,menuProps:c}=this;(o=this.onRender)==null||o.call(this);let l=c?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},u={ref:H(t),class:[e,`${s}-dropdown`,`${s}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:s,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return a($,I(this.$attrs,u,l))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return a(te,Object.assign({},B(this.$props,_e),n),{trigger:()=>{var e;return(e=this.$slots).default?.call(e)}})}});export{H as a,U as i,Y as n,W as r,ve as t};