(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-addBTC"],{"04e0":function(t,e,n){"use strict";n.r(e);var a=n("93dd"),i=n("f6fc");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("61ce");var o=n("2877"),d=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,"0cf893d5",null);e["default"]=d.exports},"5ba7":function(t,e,n){"use strict";var a=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("cebc")),s=n("2f62"),o={data:function(){return{wallet_address:"",editFalg:!1}},computed:(0,i.default)({},(0,s.mapState)(["hasLogin"])),onLoad:function(t){this.hasLogin?"true"==t.edit&&(uni.setNavigationBarTitle({title:"编辑钱包地址"}),this.wallet_address=t.address,this.editFalg=!0,this.walletId=t.walletId):uni.reLaunch({url:"../login/loginPas"})},methods:(0,i.default)({},(0,s.mapMutations)(["onLineIndex"]),{clearAddress:function(){this.wallet_address=""},toBack:function(){uni.navigateBack({delta:1})},_saveWallet:function(){var t=this;if(uni.getNetworkType({success:function(t){"none"==t.networkType&&uni.showToast({icon:"none",title:"当前网络不可用"})}}),this.wallet_address){uni.showLoading({title:"保存中"});var e=this.wallet_address,n=uni.getStorageSync("userID"),a=1,i=Date.parse(new Date)/1e3,s=this.$md5("".concat(n,"__").concat(a,"__").concat(e,"__").concat(i,"__elseleimaohasjer2860")),o={user_id:n,coin_id:a,address:e,timestamp:i,sign:s};this.$ajax.post({url:this.$service.api_lists.saveWallet,data:o}).then(function(e){1==e.data.code&&uni.showToast({title:"保存成功",duration:2e3}),t.onLineIndex(-1),uni.hideLoading(),uni.navigateBack({delta:1}),console.log(e)}).catch(function(t){uni.hideLoading(),uni.showToast({title:t,duration:2e3})})}else uni.showToast({icon:"none",title:"请输入钱包地址"})},_editWallet:function(){var t=this;uni.showModal({title:"提示",content:"是否确定修改该钱包地址",success:function(e){if(e.confirm){if(uni.getNetworkType({success:function(t){"none"==t.networkType&&uni.showToast({icon:"none",title:"当前网络不可用"})}}),!t.wallet_address)return void uni.showToast({icon:"none",title:"请输入钱包地址"});uni.showLoading({title:"修改中"});var n=t.wallet_address,a=uni.getStorageSync("userID"),i=t.walletId,s=Date.parse(new Date)/1e3,o=t.$md5("".concat(a,"__").concat(i,"__").concat(n,"__").concat(s,"__elseleimaohasjer2860")),d={user_id:a,wallet_id:i,address:n,timestamp:s,sign:o};t.$ajax.post({url:t.$service.api_lists.editWallet,data:d}).then(function(e){1==e.data.code&&uni.showToast({title:"修改成功",duration:2e3}),t.onLineIndex(-1),uni.hideLoading(),uni.navigateBack({delta:1}),console.log(e)}).catch(function(t){uni.hideLoading(),uni.showToast({title:t,duration:2e3})})}else if(e.cancel)return}})}})};e.default=o},"61ce":function(t,e,n){"use strict";var a=n("bcf9"),i=n.n(a);i.a},7561:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.addBTC[data-v-0cf893d5]{padding:%?43?% %?40?%;border-top:%?1?% solid #f5f5f5}.addBTC .address[data-v-0cf893d5]{\n    /* position: relative; */display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?30?% 0;border-bottom:%?1?% solid #f5f5f5}.addBTC .address .ipt[data-v-0cf893d5]{width:%?600?%}.addBTC .address .img[data-v-0cf893d5]{width:%?36?%;height:%?36?%}.addBTC .btn[data-v-0cf893d5]{display:block;width:%?670?%;height:%?96?%;border-radius:%?6?%;background:#42a2ec;text-align:center;line-height:%?96?%;color:#fff;font-size:%?32?%;margin-top:%?75?%}',""])},"93dd":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"addBTC"},[n("v-uni-view",{staticClass:"address"},[n("v-uni-input",{staticClass:"ipt",attrs:{placeholder:"请输入钱包地址","placeholder-style":"color: #AFADAD;font-size: 32upx;",type:"text"},model:{value:t.wallet_address,callback:function(e){t.wallet_address=e},expression:"wallet_address"}}),n("v-uni-image",{staticClass:"img",attrs:{src:"../../static/images/login/delete.png",mode:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearAddress.apply(void 0,arguments)}}})],1),t.editFalg?n("v-uni-text",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._editWallet.apply(void 0,arguments)}}},[t._v("修改")]):n("v-uni-text",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._saveWallet.apply(void 0,arguments)}}},[t._v("保存")])],1)},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},bcf9:function(t,e,n){var a=n("7561");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("2f49cbb6",a,!0,{sourceMap:!1,shadowMode:!1})},f6fc:function(t,e,n){"use strict";n.r(e);var a=n("5ba7"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=i.a}}]);