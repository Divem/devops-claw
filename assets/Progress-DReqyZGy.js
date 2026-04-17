import{$ as e,Dt as t,Lt as n,Nt as r,Ot as i,Q as a,Yt as o,_ as s,an as c,h as l,jt as u,rn as d,s as f}from"./_plugin-vue_export-helper-BdtRH0g-.js";import{o as p}from"./fade-in-scale-up.cssr-BLGcyaqm.js";import{_ as m,g as h,v as g,y as _}from"./index-CFa8BeMl.js";function v(e){let{infoColor:t,successColor:n,warningColor:r,errorColor:i,textColor2:a,progressRailColor:o,fontSize:s,fontWeight:c}=e;return{fontSize:s,fontSizeCircle:`28px`,fontWeightCircle:c,railColor:o,railHeight:`8px`,iconSizeCircle:`36px`,iconSizeLine:`18px`,iconColor:t,iconColorInfo:t,iconColorSuccess:n,iconColorWarning:r,iconColorError:i,textColorCircle:a,textColorLineInner:`rgb(255, 255, 255)`,textColorLineOuter:a,fillColor:t,fillColorInfo:t,fillColorSuccess:n,fillColorWarning:r,fillColorError:i,lineBgProcessing:`linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)`}}var y={name:`Progress`,common:f,self:v},b={success:c(m,null),error:c(_,null),warning:c(h,null),info:c(g,null)},x=d({name:`ProgressCircle`,props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:[String,Object],railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:t}){let r=o(()=>{let t=`gradient`,{fillColor:r}=e;return typeof r==`object`?`${t}-${n(JSON.stringify(r))}`:t});function i(t,n,i,a){let{gapDegree:o,viewBoxWidth:s,strokeWidth:c}=e,l=50+c/2,u=`M ${l},${l} m 0,50
      a 50,50 0 1 1 0,-100
      a 50,50 0 1 1 0,100`,d=Math.PI*2*50;return{pathString:u,pathStyle:{stroke:a===`rail`?i:typeof e.fillColor==`object`?`url(#${r.value})`:i,strokeDasharray:`${Math.min(t,100)/100*(d-o)}px ${s*8}px`,strokeDashoffset:`-${o/2}px`,transformOrigin:n?`center`:void 0,transform:n?`rotate(${n}deg)`:void 0}}}let a=()=>{let t=typeof e.fillColor==`object`,n=t?e.fillColor.stops[0]:``,i=t?e.fillColor.stops[1]:``;return t&&c(`defs`,null,c(`linearGradient`,{id:r.value,x1:`0%`,y1:`100%`,x2:`100%`,y2:`0%`},c(`stop`,{offset:`0%`,"stop-color":n}),c(`stop`,{offset:`100%`,"stop-color":i})))};return()=>{let{fillColor:n,railColor:r,strokeWidth:o,offsetDegree:s,status:u,percentage:d,showIndicator:f,indicatorTextColor:p,unit:m,gapOffsetDegree:h,clsPrefix:g}=e,{pathString:_,pathStyle:v}=i(100,0,r,`rail`),{pathString:y,pathStyle:x}=i(d,s,n,`fill`),S=100+o;return c(`div`,{class:`${g}-progress-content`,role:`none`},c(`div`,{class:`${g}-progress-graph`,"aria-hidden":!0},c(`div`,{class:`${g}-progress-graph-circle`,style:{transform:h?`rotate(${h}deg)`:void 0}},c(`svg`,{viewBox:`0 0 ${S} ${S}`},a(),c(`g`,null,c(`path`,{class:`${g}-progress-graph-circle-rail`,d:_,"stroke-width":o,"stroke-linecap":`round`,fill:`none`,style:v})),c(`g`,null,c(`path`,{class:[`${g}-progress-graph-circle-fill`,d===0&&`${g}-progress-graph-circle-fill--empty`],d:y,"stroke-width":o,"stroke-linecap":`round`,fill:`none`,style:x}))))),f?c(`div`,null,t.default?c(`div`,{class:`${g}-progress-custom-content`,role:`none`},t.default()):u===`default`?c(`div`,{class:`${g}-progress-text`,style:{color:p},role:`none`},c(`span`,{class:`${g}-progress-text__percentage`},d),c(`span`,{class:`${g}-progress-text__unit`},m)):c(`div`,{class:`${g}-progress-icon`,"aria-hidden":!0},c(l,{clsPrefix:g},{default:()=>b[u]}))):null)}}}),S={success:c(m,null),error:c(_,null),warning:c(h,null),info:c(g,null)},C=d({name:`ProgressLine`,props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:[String,Object],status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:`%`},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(e,{slots:t}){let n=o(()=>p(e.height)),r=o(()=>typeof e.fillColor==`object`?`linear-gradient(to right, ${e.fillColor?.stops[0]} , ${e.fillColor?.stops[1]})`:e.fillColor),i=o(()=>e.railBorderRadius===void 0?e.height===void 0?``:p(e.height,{c:.5}):p(e.railBorderRadius)),a=o(()=>e.fillBorderRadius===void 0?e.railBorderRadius===void 0?e.height===void 0?``:p(e.height,{c:.5}):p(e.railBorderRadius):p(e.fillBorderRadius));return()=>{let{indicatorPlacement:o,railColor:s,railStyle:u,percentage:d,unit:f,indicatorTextColor:p,status:m,showIndicator:h,processing:g,clsPrefix:_}=e;return c(`div`,{class:`${_}-progress-content`,role:`none`},c(`div`,{class:`${_}-progress-graph`,"aria-hidden":!0},c(`div`,{class:[`${_}-progress-graph-line`,{[`${_}-progress-graph-line--indicator-${o}`]:!0}]},c(`div`,{class:`${_}-progress-graph-line-rail`,style:[{backgroundColor:s,height:n.value,borderRadius:i.value},u]},c(`div`,{class:[`${_}-progress-graph-line-fill`,g&&`${_}-progress-graph-line-fill--processing`],style:{maxWidth:`${e.percentage}%`,background:r.value,height:n.value,lineHeight:n.value,borderRadius:a.value}},o===`inside`?c(`div`,{class:`${_}-progress-graph-line-indicator`,style:{color:p}},t.default?t.default():`${d}${f}`):null)))),h&&o===`outside`?c(`div`,null,t.default?c(`div`,{class:`${_}-progress-custom-content`,style:{color:p},role:`none`},t.default()):m===`default`?c(`div`,{role:`none`,class:`${_}-progress-icon ${_}-progress-icon--as-text`,style:{color:p}},d,f):c(`div`,{class:`${_}-progress-icon`,"aria-hidden":!0},c(l,{clsPrefix:_},{default:()=>S[m]}))):null)}}});function w(e,t,n=100){return`m ${n/2} ${n/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}var T=d({name:`ProgressMultipleCircle`,props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:t}){let n=o(()=>e.percentage.map((t,n)=>`${Math.PI*t/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*n)-e.circleGap*n)*2}, ${e.viewBoxWidth*8}`)),r=(t,n)=>{let r=e.fillColor[n],i=typeof r==`object`?r.stops[0]:``,a=typeof r==`object`?r.stops[1]:``;return typeof e.fillColor[n]==`object`&&c(`linearGradient`,{id:`gradient-${n}`,x1:`100%`,y1:`0%`,x2:`0%`,y2:`100%`},c(`stop`,{offset:`0%`,"stop-color":i}),c(`stop`,{offset:`100%`,"stop-color":a}))};return()=>{let{viewBoxWidth:i,strokeWidth:a,circleGap:o,showIndicator:s,fillColor:l,railColor:u,railStyle:d,percentage:f,clsPrefix:p}=e;return c(`div`,{class:`${p}-progress-content`,role:`none`},c(`div`,{class:`${p}-progress-graph`,"aria-hidden":!0},c(`div`,{class:`${p}-progress-graph-circle`},c(`svg`,{viewBox:`0 0 ${i} ${i}`},c(`defs`,null,f.map((e,t)=>r(e,t))),f.map((e,t)=>c(`g`,{key:t},c(`path`,{class:`${p}-progress-graph-circle-rail`,d:w(i/2-a/2*(1+2*t)-o*t,a,i),"stroke-width":a,"stroke-linecap":`round`,fill:`none`,style:[{strokeDashoffset:0,stroke:u[t]},d[t]]}),c(`path`,{class:[`${p}-progress-graph-circle-fill`,e===0&&`${p}-progress-graph-circle-fill--empty`],d:w(i/2-a/2*(1+2*t)-o*t,a,i),"stroke-width":a,"stroke-linecap":`round`,fill:`none`,style:{strokeDasharray:n.value[t],strokeDashoffset:0,stroke:typeof l[t]==`object`?`url(#gradient-${t})`:l[t]}})))))),s&&t.default?c(`div`,null,c(`div`,{class:`${p}-progress-text`},t.default())):null)}}}),E=t([i(`progress`,{display:`inline-block`},[i(`progress-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),u(`line`,`
 width: 100%;
 display: block;
 `,[i(`progress-content`,`
 display: flex;
 align-items: center;
 `,[i(`progress-graph`,{flex:1})]),i(`progress-custom-content`,{marginLeft:`14px`}),i(`progress-icon`,`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[u(`as-text`,`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),u(`circle, dashboard`,{width:`120px`},[i(`progress-custom-content`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),i(`progress-text`,`
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
 `),i(`progress-icon`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),u(`multiple-circle`,`
 width: 200px;
 color: inherit;
 `,[i(`progress-text`,`
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
 `)]),i(`progress-content`,{position:`relative`}),i(`progress-graph`,{position:`relative`},[i(`progress-graph-circle`,[t(`svg`,{verticalAlign:`bottom`}),i(`progress-graph-circle-fill`,`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[u(`empty`,{opacity:0})]),i(`progress-graph-circle-rail`,`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),i(`progress-graph-line`,[u(`indicator-inside`,[i(`progress-graph-line-rail`,`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[i(`progress-graph-line-fill`,`
 height: inherit;
 border-radius: 10px;
 `),i(`progress-graph-line-indicator`,`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),u(`indicator-inside-label`,`
 height: 16px;
 display: flex;
 align-items: center;
 `,[i(`progress-graph-line-rail`,`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),i(`progress-graph-line-indicator`,`
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
 `)]),i(`progress-graph-line-rail`,`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[i(`progress-graph-line-fill`,`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[u(`processing`,[t(`&::after`,`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),t(`@keyframes progress-processing-animation`,`
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
 `)]),D=d({name:`Progress`,props:Object.assign(Object.assign({},s.props),{processing:Boolean,type:{type:String,default:`line`},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:`default`},railColor:[String,Array],railStyle:[String,Array],color:[String,Array,Object],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:`%`},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:`outside`},indicatorPlacement:{type:String,default:`outside`},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number}),setup(t){let n=o(()=>t.indicatorPlacement||t.indicatorPosition),i=o(()=>{if(t.gapDegree||t.gapDegree===0)return t.gapDegree;if(t.type===`dashboard`)return 75}),{mergedClsPrefixRef:c,inlineThemeDisabled:l}=e(t),u=s(`Progress`,`-progress`,E,y,t,c),d=o(()=>{let{status:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontSize:i,fontSizeCircle:a,railColor:o,railHeight:s,iconSizeCircle:c,iconSizeLine:l,textColorCircle:d,textColorLineInner:f,textColorLineOuter:p,lineBgProcessing:m,fontWeightCircle:h,[r(`iconColor`,e)]:g,[r(`fillColor`,e)]:_}}=u.value;return{"--n-bezier":n,"--n-fill-color":_,"--n-font-size":i,"--n-font-size-circle":a,"--n-font-weight-circle":h,"--n-icon-color":g,"--n-icon-size-circle":c,"--n-icon-size-line":l,"--n-line-bg-processing":m,"--n-rail-color":o,"--n-rail-height":s,"--n-text-color-circle":d,"--n-text-color-line-inner":f,"--n-text-color-line-outer":p}}),f=l?a(`progress`,o(()=>t.status[0]),d,t):void 0;return{mergedClsPrefix:c,mergedIndicatorPlacement:n,gapDeg:i,cssVars:l?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender}},render(){let{type:e,cssVars:t,indicatorTextColor:n,showIndicator:r,status:i,railColor:a,railStyle:o,color:s,percentage:l,viewBoxWidth:u,strokeWidth:d,mergedIndicatorPlacement:f,unit:p,borderRadius:m,fillBorderRadius:h,height:g,processing:_,circleGap:v,mergedClsPrefix:y,gapDeg:b,gapOffsetDegree:S,themeClass:w,$slots:E,onRender:D}=this;return D?.(),c(`div`,{class:[w,`${y}-progress`,`${y}-progress--${e}`,`${y}-progress--${i}`],style:t,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":l,role:e===`circle`||e===`line`||e===`dashboard`?`progressbar`:`none`},e===`circle`||e===`dashboard`?c(x,{clsPrefix:y,status:i,showIndicator:r,indicatorTextColor:n,railColor:a,fillColor:s,railStyle:o,offsetDegree:this.offsetDegree,percentage:l,viewBoxWidth:u,strokeWidth:d,gapDegree:b===void 0?e===`dashboard`?75:0:b,gapOffsetDegree:S,unit:p},E):e===`line`?c(C,{clsPrefix:y,status:i,showIndicator:r,indicatorTextColor:n,railColor:a,fillColor:s,railStyle:o,percentage:l,processing:_,indicatorPlacement:f,unit:p,fillBorderRadius:h,railBorderRadius:m,height:g},E):e===`multiple-circle`?c(T,{clsPrefix:y,strokeWidth:d,railColor:a,fillColor:s,railStyle:o,viewBoxWidth:u,percentage:l,showIndicator:r,circleGap:v},E):null)}});export{y as n,D as t};