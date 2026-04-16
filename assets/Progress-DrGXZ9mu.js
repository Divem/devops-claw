import{Dn as e,Fn as t,Ln as n,an as r,cn as i,d as a,gt as o,in as s,nt as c,pn as l,rt as u,un as d,x as f,y as p}from"./_plugin-vue_export-helper-1acTymw5.js";import{c as m,d as h,l as g,u as _}from"./index-CSBbtB8E.js";function v(e){let{infoColor:t,successColor:n,warningColor:r,errorColor:i,textColor2:a,progressRailColor:o,fontSize:s,fontWeight:c}=e;return{fontSize:s,fontSizeCircle:`28px`,fontWeightCircle:c,railColor:o,railHeight:`8px`,iconSizeCircle:`36px`,iconSizeLine:`18px`,iconColor:t,iconColorInfo:t,iconColorSuccess:n,iconColorWarning:r,iconColorError:i,textColorCircle:a,textColorLineInner:`rgb(255, 255, 255)`,textColorLineOuter:a,fillColor:t,fillColorInfo:t,fillColorSuccess:n,fillColorWarning:r,fillColorError:i,lineBgProcessing:`linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)`}}var y={name:`Progress`,common:a,self:v},b={success:n(g,null),error:n(h,null),warning:n(m,null),info:n(_,null)},x=t({name:`ProgressCircle`,props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:[String,Object],railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(t,{slots:r}){let i=e(()=>{let e=`gradient`,{fillColor:n}=t;return typeof n==`object`?`${e}-${l(JSON.stringify(n))}`:e});function a(e,n,r,a){let{gapDegree:o,viewBoxWidth:s,strokeWidth:c}=t,l=50+c/2,u=`M ${l},${l} m 0,50
      a 50,50 0 1 1 0,-100
      a 50,50 0 1 1 0,100`,d=Math.PI*2*50;return{pathString:u,pathStyle:{stroke:a===`rail`?r:typeof t.fillColor==`object`?`url(#${i.value})`:r,strokeDasharray:`${Math.min(e,100)/100*(d-o)}px ${s*8}px`,strokeDashoffset:`-${o/2}px`,transformOrigin:n?`center`:void 0,transform:n?`rotate(${n}deg)`:void 0}}}let o=()=>{let e=typeof t.fillColor==`object`,r=e?t.fillColor.stops[0]:``,a=e?t.fillColor.stops[1]:``;return e&&n(`defs`,null,n(`linearGradient`,{id:i.value,x1:`0%`,y1:`100%`,x2:`100%`,y2:`0%`},n(`stop`,{offset:`0%`,"stop-color":r}),n(`stop`,{offset:`100%`,"stop-color":a})))};return()=>{let{fillColor:e,railColor:i,strokeWidth:s,offsetDegree:c,status:l,percentage:u,showIndicator:d,indicatorTextColor:f,unit:m,gapOffsetDegree:h,clsPrefix:g}=t,{pathString:_,pathStyle:v}=a(100,0,i,`rail`),{pathString:y,pathStyle:x}=a(u,c,e,`fill`),S=100+s;return n(`div`,{class:`${g}-progress-content`,role:`none`},n(`div`,{class:`${g}-progress-graph`,"aria-hidden":!0},n(`div`,{class:`${g}-progress-graph-circle`,style:{transform:h?`rotate(${h}deg)`:void 0}},n(`svg`,{viewBox:`0 0 ${S} ${S}`},o(),n(`g`,null,n(`path`,{class:`${g}-progress-graph-circle-rail`,d:_,"stroke-width":s,"stroke-linecap":`round`,fill:`none`,style:v})),n(`g`,null,n(`path`,{class:[`${g}-progress-graph-circle-fill`,u===0&&`${g}-progress-graph-circle-fill--empty`],d:y,"stroke-width":s,"stroke-linecap":`round`,fill:`none`,style:x}))))),d?n(`div`,null,r.default?n(`div`,{class:`${g}-progress-custom-content`,role:`none`},r.default()):l===`default`?n(`div`,{class:`${g}-progress-text`,style:{color:f},role:`none`},n(`span`,{class:`${g}-progress-text__percentage`},u),n(`span`,{class:`${g}-progress-text__unit`},m)):n(`div`,{class:`${g}-progress-icon`,"aria-hidden":!0},n(p,{clsPrefix:g},{default:()=>b[l]}))):null)}}}),S={success:n(g,null),error:n(h,null),warning:n(m,null),info:n(_,null)},C=t({name:`ProgressLine`,props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:[String,Object],status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:`%`},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(t,{slots:r}){let i=e(()=>o(t.height)),a=e(()=>typeof t.fillColor==`object`?`linear-gradient(to right, ${t.fillColor?.stops[0]} , ${t.fillColor?.stops[1]})`:t.fillColor),s=e(()=>t.railBorderRadius===void 0?t.height===void 0?``:o(t.height,{c:.5}):o(t.railBorderRadius)),c=e(()=>t.fillBorderRadius===void 0?t.railBorderRadius===void 0?t.height===void 0?``:o(t.height,{c:.5}):o(t.railBorderRadius):o(t.fillBorderRadius));return()=>{let{indicatorPlacement:e,railColor:o,railStyle:l,percentage:u,unit:d,indicatorTextColor:f,status:m,showIndicator:h,processing:g,clsPrefix:_}=t;return n(`div`,{class:`${_}-progress-content`,role:`none`},n(`div`,{class:`${_}-progress-graph`,"aria-hidden":!0},n(`div`,{class:[`${_}-progress-graph-line`,{[`${_}-progress-graph-line--indicator-${e}`]:!0}]},n(`div`,{class:`${_}-progress-graph-line-rail`,style:[{backgroundColor:o,height:i.value,borderRadius:s.value},l]},n(`div`,{class:[`${_}-progress-graph-line-fill`,g&&`${_}-progress-graph-line-fill--processing`],style:{maxWidth:`${t.percentage}%`,background:a.value,height:i.value,lineHeight:i.value,borderRadius:c.value}},e===`inside`?n(`div`,{class:`${_}-progress-graph-line-indicator`,style:{color:f}},r.default?r.default():`${u}${d}`):null)))),h&&e===`outside`?n(`div`,null,r.default?n(`div`,{class:`${_}-progress-custom-content`,style:{color:f},role:`none`},r.default()):m===`default`?n(`div`,{role:`none`,class:`${_}-progress-icon ${_}-progress-icon--as-text`,style:{color:f}},u,d):n(`div`,{class:`${_}-progress-icon`,"aria-hidden":!0},n(p,{clsPrefix:_},{default:()=>S[m]}))):null)}}});function w(e,t,n=100){return`m ${n/2} ${n/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}var T=t({name:`ProgressMultipleCircle`,props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(t,{slots:r}){let i=e(()=>t.percentage.map((e,n)=>`${Math.PI*e/100*(t.viewBoxWidth/2-t.strokeWidth/2*(1+2*n)-t.circleGap*n)*2}, ${t.viewBoxWidth*8}`)),a=(e,r)=>{let i=t.fillColor[r],a=typeof i==`object`?i.stops[0]:``,o=typeof i==`object`?i.stops[1]:``;return typeof t.fillColor[r]==`object`&&n(`linearGradient`,{id:`gradient-${r}`,x1:`100%`,y1:`0%`,x2:`0%`,y2:`100%`},n(`stop`,{offset:`0%`,"stop-color":a}),n(`stop`,{offset:`100%`,"stop-color":o}))};return()=>{let{viewBoxWidth:e,strokeWidth:o,circleGap:s,showIndicator:c,fillColor:l,railColor:u,railStyle:d,percentage:f,clsPrefix:p}=t;return n(`div`,{class:`${p}-progress-content`,role:`none`},n(`div`,{class:`${p}-progress-graph`,"aria-hidden":!0},n(`div`,{class:`${p}-progress-graph-circle`},n(`svg`,{viewBox:`0 0 ${e} ${e}`},n(`defs`,null,f.map((e,t)=>a(e,t))),f.map((t,r)=>n(`g`,{key:r},n(`path`,{class:`${p}-progress-graph-circle-rail`,d:w(e/2-o/2*(1+2*r)-s*r,o,e),"stroke-width":o,"stroke-linecap":`round`,fill:`none`,style:[{strokeDashoffset:0,stroke:u[r]},d[r]]}),n(`path`,{class:[`${p}-progress-graph-circle-fill`,t===0&&`${p}-progress-graph-circle-fill--empty`],d:w(e/2-o/2*(1+2*r)-s*r,o,e),"stroke-width":o,"stroke-linecap":`round`,fill:`none`,style:{strokeDasharray:i.value[r],strokeDashoffset:0,stroke:typeof l[r]==`object`?`url(#gradient-${r})`:l[r]}})))))),c&&r.default?n(`div`,null,n(`div`,{class:`${p}-progress-text`},r.default())):null)}}}),E=s([r(`progress`,{display:`inline-block`},[r(`progress-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),i(`line`,`
 width: 100%;
 display: block;
 `,[r(`progress-content`,`
 display: flex;
 align-items: center;
 `,[r(`progress-graph`,{flex:1})]),r(`progress-custom-content`,{marginLeft:`14px`}),r(`progress-icon`,`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[i(`as-text`,`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),i(`circle, dashboard`,{width:`120px`},[r(`progress-custom-content`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),r(`progress-text`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `),r(`progress-icon`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),i(`multiple-circle`,`
 width: 200px;
 color: inherit;
 `,[r(`progress-text`,`
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]),r(`progress-content`,{position:`relative`}),r(`progress-graph`,{position:`relative`},[r(`progress-graph-circle`,[s(`svg`,{verticalAlign:`bottom`}),r(`progress-graph-circle-fill`,`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[i(`empty`,{opacity:0})]),r(`progress-graph-circle-rail`,`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),r(`progress-graph-line`,[i(`indicator-inside`,[r(`progress-graph-line-rail`,`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[r(`progress-graph-line-fill`,`
 height: inherit;
 border-radius: 10px;
 `),r(`progress-graph-line-indicator`,`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),i(`indicator-inside-label`,`
 height: 16px;
 display: flex;
 align-items: center;
 `,[r(`progress-graph-line-rail`,`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),r(`progress-graph-line-indicator`,`
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),r(`progress-graph-line-rail`,`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[r(`progress-graph-line-fill`,`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[i(`processing`,[s(`&::after`,`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),s(`@keyframes progress-processing-animation`,`
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]),D=t({name:`Progress`,props:Object.assign(Object.assign({},f.props),{processing:Boolean,type:{type:String,default:`line`},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:`default`},railColor:[String,Array],railStyle:[String,Array],color:[String,Array,Object],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:`%`},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:`outside`},indicatorPlacement:{type:String,default:`outside`},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number}),setup(t){let n=e(()=>t.indicatorPlacement||t.indicatorPosition),r=e(()=>{if(t.gapDegree||t.gapDegree===0)return t.gapDegree;if(t.type===`dashboard`)return 75}),{mergedClsPrefixRef:i,inlineThemeDisabled:a}=u(t),o=f(`Progress`,`-progress`,E,y,t,i),s=e(()=>{let{status:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontSize:r,fontSizeCircle:i,railColor:a,railHeight:s,iconSizeCircle:c,iconSizeLine:l,textColorCircle:u,textColorLineInner:f,textColorLineOuter:p,lineBgProcessing:m,fontWeightCircle:h,[d(`iconColor`,e)]:g,[d(`fillColor`,e)]:_}}=o.value;return{"--n-bezier":n,"--n-fill-color":_,"--n-font-size":r,"--n-font-size-circle":i,"--n-font-weight-circle":h,"--n-icon-color":g,"--n-icon-size-circle":c,"--n-icon-size-line":l,"--n-line-bg-processing":m,"--n-rail-color":a,"--n-rail-height":s,"--n-text-color-circle":u,"--n-text-color-line-inner":f,"--n-text-color-line-outer":p}}),l=a?c(`progress`,e(()=>t.status[0]),s,t):void 0;return{mergedClsPrefix:i,mergedIndicatorPlacement:n,gapDeg:r,cssVars:a?void 0:s,themeClass:l?.themeClass,onRender:l?.onRender}},render(){let{type:e,cssVars:t,indicatorTextColor:r,showIndicator:i,status:a,railColor:o,railStyle:s,color:c,percentage:l,viewBoxWidth:u,strokeWidth:d,mergedIndicatorPlacement:f,unit:p,borderRadius:m,fillBorderRadius:h,height:g,processing:_,circleGap:v,mergedClsPrefix:y,gapDeg:b,gapOffsetDegree:S,themeClass:w,$slots:E,onRender:D}=this;return D?.(),n(`div`,{class:[w,`${y}-progress`,`${y}-progress--${e}`,`${y}-progress--${a}`],style:t,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":l,role:e===`circle`||e===`line`||e===`dashboard`?`progressbar`:`none`},e===`circle`||e===`dashboard`?n(x,{clsPrefix:y,status:a,showIndicator:i,indicatorTextColor:r,railColor:o,fillColor:c,railStyle:s,offsetDegree:this.offsetDegree,percentage:l,viewBoxWidth:u,strokeWidth:d,gapDegree:b===void 0?e===`dashboard`?75:0:b,gapOffsetDegree:S,unit:p},E):e===`line`?n(C,{clsPrefix:y,status:a,showIndicator:i,indicatorTextColor:r,railColor:o,fillColor:c,railStyle:s,percentage:l,processing:_,indicatorPlacement:f,unit:p,fillBorderRadius:h,railBorderRadius:m,height:g},E):e===`multiple-circle`?n(T,{clsPrefix:y,strokeWidth:d,railColor:o,fillColor:c,railStyle:s,viewBoxWidth:u,percentage:l,showIndicator:i,circleGap:v},E):null)}});export{y as n,D as t};