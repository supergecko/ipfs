(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/QS-tabs/QS-tabs"],{"10f3":function(t,e,n){"use strict";n.r(e);var i=n("beb5"),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=r.a},"39aa":function(t,e,n){},4203:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,Number(t.zIndex)),i=Number(t.zIndex);t.$mp.data=Object.assign({},{$root:{m0:n,m1:i}})},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},"82dd":function(t,e,n){"use strict";n.r(e);var i=n("4203"),r=n("10f3");for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);n("f24f");var a=n("2877"),u=Object(a["a"])(r["default"],i["a"],i["b"],!1,null,"af0c64b2",null);e["default"]=u.exports},beb5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t.getSystemInfoSync(),i=n.screenWidth,r={props:{tabs:{type:Array,default:function(){return[]}},current:{type:Number,default:0},height:{type:[String,Number],default:80},width:{type:[String,Number],default:250},fontSize:{type:[String,Number],default:30},duration:{type:[String,Number],default:.5},activeColor:{type:String,default:"#33cc33"},defaultColor:{type:String,default:"#888"},animationLineWidth:{type:[String,Number],default:20},line2Style:{type:String,default:"height: 8rpx;border-radius: 4rpx;"},animationMode:{type:String,default:"line1"},autoCenter:{type:Boolean,default:!0},autoCenterMode:{type:String,default:"component"},activeStyle:{type:String,default:"bottom:0;left:50%;transform: translate(-50%,-100%);height: 8rpx;border-radius:4rpx;"},defaultStyle:{type:String,default:"bottom:0;left:50%;transform: translate(-50%,-100%);height: 8rpx;border-radius:4rpx;"},backgroundColor:{type:String,default:"rgba(255,255,255,0)"},hasItemBackground:{type:Boolean,default:!1},itemBackgroundColor:{type:String,default:"rgba(255,255,255,0)"},itemBackgroundStyle:{type:String,default:""},zIndex:{type:[String,Number],default:99}},computed:{getCurrent:function(){return this.current>this.getTabs.length-1?this.getTabs.length-1:this.current},getTabs:function(){return this.tabs},getHeight:function(){return this.height},getWidth:function(){return this.width},getFontSize:function(){return this.fontSize},getDuration:function(){return this.duration},getBgColor:function(){var t=this.backgroundColor||"rgba(255,255,255,0)";return this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].backgroundColor||t},getItemBackgroundColor:function(){var t=this.itemBackgroundColor||"rgba(255,255,255,0)";return this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].itemBackgroundColor||t},getDurationStyle:function(){return"transition-duration: ".concat(this.getDuration,"s;")},getActiveColor:function(){var t;return t=this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].activeColor?this.getTabs[this.getCurrent].activeColor:this.activeColor,t},getDefaultColor:function(){var t;return t=this.getTabs[this.getCurrent]instanceof Object&&this.getTabs[this.getCurrent].defaultColor?this.getTabs[this.getCurrent].defaultColor:this.defaultColor,t},getActiveStyle:function(){return"width:".concat(this.animationLineWidth,"%;background-color:").concat(this.getActiveColor,";").concat(this.activeStyle)},getDefaultStyle:function(){return"width:0;background-color:".concat(this.getActiveColor,";").concat(this.defaultStyle)},getLinezIndex:function(){return"z-index: ".concat(Number(this.zIndex)+2,";")},getBoxStyle2:function(){if("line2"===this.animationMode){var t=Number(this.line2Width),e=this.width*(t/100),n=this.width*(this.getCurrent+1)-this.width/2-e/2;return"transform:translate(".concat(n,"rpx, -100%);width:").concat(e,"rpx;background-color: ").concat(this.getActiveColor,";").concat(this.line2Style)}},getItemBackgroundBoxStyle:function(){return"height: ".concat(this.getHeight,"rpx;\n\t\t\t\t\twidth: ").concat(this.getWidth,"rpx;\n\t\t\t\t\tz-index: ").concat(Number(this.zIndex)+1,";\n\t\t\t\t\ttransition-duration: ").concat(this.getDuration,"s;\n\t\t\t\t\ttransform: translateX(").concat(this.width*this.getCurrent,"rpx);")},getItemBackgroundStyle:function(){return"transition-duration: ".concat(this.getDuration,"s;\n\t\t\t\t\tbackground-color: ").concat(this.getItemBackgroundColor,";\n\t\t\t\t\tbox-shadow: 0 0 5rpx 5rpx ").concat(this.getItemBackgroundColor,";\n\t\t\t\t\t").concat(this.itemBackgroundStyle,";")}},watch:{current:function(t,e){this.change(t)}},data:function(){return{left:0,line2Width:this.animationLineWidth,setTimeoutFc:null,componentsWidth:0}},onReady:function(){var t=this;this.getQuery(function(){t.countScrollX()})},methods:{emit:function(t){this.$emit("change",t)},change:function(){var t=this;this.countScrollX(),"line2"===this.animationMode&&(this.line2Width=2,this.setTimeoutFc&&clearTimeout(this.setTimeoutFc),this.setTimeoutFc=setTimeout(function(){t.line2Width=t.animationLineWidth},1e3*this.getDuration*3/5))},getQuery:function(e){var n=this;try{var r=t.createSelectorQuery().in(this).select(".QS-segmented-control-scroll");r.fields({size:!0},function(t){t?(n.componentsWidth=t.width,e&&"function"===typeof e&&e(t)):n.retryGetQuery(e)}).exec()}catch(o){this.componentsWidth=i}},retryGetQuery:function(){var e=this;try{var n=t.createSelectorQuery().select(".QS-segmented-control-scroll");n.fields({size:!0},function(t){e.componentsWidth=t?t.width:i,cb&&"function"===typeof cb&&cb(t)}).exec()}catch(r){this.componentsWidth=i}},countScrollX:function(){if(this.autoCenter){var t,e=Number(this.width),n=e/750*i,r=n*(this.getCurrent+1)-n/2;t="window"===this.autoCenterMode?i:this.componentsWidth,this.left=r-t/2}}}};e.default=r}).call(this,n("6e42")["default"])},f24f:function(t,e,n){"use strict";var i=n("39aa"),r=n.n(i);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/QS-tabs/QS-tabs-create-component',
    {
        'components/QS-tabs/QS-tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("82dd"))
        })
    },
    [['components/QS-tabs/QS-tabs-create-component']]
]);
