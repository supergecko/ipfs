(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myOrder/myOrder"],{"14fa":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},"201d":function(e,t,a){},"422e":function(e,t,a){},"9fd4":function(e,t,a){"use strict";a.r(t);var n=a("a0b6"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},a0b6:function(e,t,a){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a("2f62");function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),n.forEach(function(t){r(e,t,a[t])})}return e}function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var c=function(){return a.e("components/uni-popup/uni-popup").then(a.bind(null,"942a"))},s=function(){return a.e("components/QS-tabs/QS-tabs").then(a.bind(null,"82dd"))},u={components:{QSTabs:s,uniPopup:c},computed:i({},(0,o.mapState)(["hasLogin"]),{captchaSrc:function(){return this.qrCodeUrl.replace(/[\r\n]/g,"")}}),onNavigationBarButtonTap:function(){e.reLaunch({url:"../user/user"})},data:function(){return{usdtAddress:"0x7df5a30658993392c5e85c14cc4584eae69fe489",current_1:0,tabs_1:["算力套餐订单","电费订单"],tabs_2:["全部订单","待付款","已完成"],current_2:0,All:[],unpaidArry:[],undelivery:[],delivery:[],completed:[],electricity_list:[],qrCodeUrl:"",networkImgSrc:"",unpaid:0,formLabelAlign:{bank_account:"",bank_name:"",bank_open:"",bank_title:""}}},methods:{actualPrice:function(e){return parseFloat(e).toFixed(2)},_payAgain:function(t){var a=this;e.getNetworkType({success:function(t){"none"==t.networkType&&e.showToast({icon:"none",title:"当前网络不可用"})}}),e.showLoading({title:"重新支付中"});var o=e.getStorageSync("userID"),i=t,r=Date.parse(new Date)/1e3,c=this.$md5("".concat(o,"__").concat(i,"__").concat(r,"__elseleimaohasjer2860")),s={user_id:o,order_id:i,timestamp:r,sign:c};this.$ajax.post({url:this.$service.api_lists.payAgain,data:s}).then(function(t){if(1==t.data.code)if(t.data.data.pay_type<3)a.qrCodeUrl=t.data.data.base64,a.networkImgSrc=t.data.data.qrcode,a.unpaid=t.data.data.unpaid,a.$refs.qrcode.open();else if(3===t.data.data.pay_type){e.showToast({icon:"none",title:"支付成功"});setTimeout(function(){e.reLaunch({url:"../myOrder/myOrder"})},1500)}else a.formLabelAlign.bank_account=t.data.data.address.bank_account,a.formLabelAlign.bank_name=t.data.data.address.bank_name,a.formLabelAlign.bank_open=t.data.data.address.bank_open,a.formLabelAlign.bank_title=t.data.data.address.bank_title,a.unpaid=t.data.data.unpaid,a.$refs.underLine.open();e.hideLoading(),console.log(n(t," at pages\\myOrder\\myOrder.vue:254"))}).catch(function(t){e.hideLoading(),e.showToast({title:t,duration:2e3})})},successPay:function(t){this.$refs[t].close();setTimeout(function(){e.reLaunch({url:"../myOrder/myOrder"})},1500)},cancel:function(e){this.$refs[e].close()},handleDownloadQrIMg:function(t){e.showActionSheet({itemList:["保存到相册"],success:function(a){0==a.tapIndex&&(e.showLoading({title:"保存中..."}),setTimeout(function(){e.hideLoading()},6e3),e.downloadFile({url:t,success:function(t){200===t.statusCode&&e.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(t){e.hideLoading(),e.showToast({title:"保存成功！"})}})}}))}})},copyText:function(t){e.setClipboardData({data:t,success:function(){console.log(n("success"," at pages\\myOrder\\myOrder.vue:353"))}})},_mobileOrderList:function(){var t=this;e.getNetworkType({success:function(t){"none"==t.networkType&&e.showToast({icon:"none",title:"当前网络不可用"})}}),e.showLoading({title:"加载中"});var a=e.getStorageSync("userID"),o=Date.parse(new Date)/1e3,i=this.$md5("".concat(a,"__").concat(o,"__elseleimaohasjer2860")),r={user_id:a,timestamp:o,sign:i};this.$ajax.post({url:this.$service.api_lists.mobileOrderList,data:r}).then(function(a){1==a.data.code&&(t.All=a.data.data.all,t.unpaidArry=a.data.data.unpaid,t.undelivery=a.data.data.undelivery,t.delivery=a.data.data.delivery,t.completed=a.data.data.completed),e.hideLoading(),console.log(n(a," at pages\\myOrder\\myOrder.vue:391"))}).catch(function(t){e.hideLoading(),e.showToast({title:t,duration:2e3})})},_orderDataList:function(){var t=this;e.getNetworkType({success:function(t){"none"==t.networkType&&e.showToast({icon:"none",title:"当前网络不可用"})}}),e.showLoading({title:"加载中"});var a=e.getStorageSync("userID"),o=Date.parse(new Date)/1e3,i=this.$md5("".concat(a,"__").concat(o,"__elseleimaohasjer2860")),r={user_id:a,timestamp:o,sign:i};this.$ajax.post({url:this.$service.api_lists.orderDataList,data:r}).then(function(a){1==a.data.code&&(t.electricity_list=a.data.data.electricity_list),e.hideLoading(),console.log(n(a," at pages\\myOrder\\myOrder.vue:429"))}).catch(function(t){e.hideLoading(),e.showToast({title:t,duration:2e3})})},toPage:function(t){e.navigateTo({url:"../orderDetails/orderDetails?order_id="+t})},toChargeRecharge:function(t){e.navigateTo({url:"../chargeRecharge/chargeRecharge?order_electricity_id="+t})},change1:function(e,t){this.current_1=e},change2:function(e,t){this.current_2=e}},onLoad:function(t){this.hasLogin?(this._mobileOrderList(),this._orderDataList()):e.reLaunch({url:"../login/loginPas"})},onPullDownRefresh:function(){var t=this,a=setTimeout(function(){t._mobileOrderList(),t._orderDataList(),e.stopPullDownRefresh(),e.showToast({icon:"none",title:"刷新成功"})},1e3);e.getNetworkType({success:function(t){"none"==t.networkType&&(e.showToast({icon:"none",title:"当前网络不可用"}),clearTimeout(a),e.stopPullDownRefresh())}})}};t.default=u}).call(this,a("6e42")["default"],a("0de9")["default"])},a874:function(e,t,a){"use strict";var n=a("201d"),o=a.n(n);o.a},cec8:function(e,t,a){"use strict";a.r(t);var n=a("14fa"),o=a("9fd4");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);a("a874"),a("f54b");var r=a("2877"),c=Object(r["a"])(o["default"],n["a"],n["b"],!1,null,"5d3ca590",null);t["default"]=c.exports},d552:function(e,t,a){"use strict";(function(e){a("981c"),a("921b");n(a("66fd"));var t=n(a("cec8"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},f54b:function(e,t,a){"use strict";var n=a("422e"),o=a.n(n);o.a}},[["d552","common/runtime","common/vendor"]]]);