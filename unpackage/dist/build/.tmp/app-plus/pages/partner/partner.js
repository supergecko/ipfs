(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/partner/partner"],{"07ea":function(e,t,n){},"242d":function(e,t,n){"use strict";var o=n("69e2"),a=n.n(o);a.a},3768:function(e,t,n){"use strict";(function(e){n("981c"),n("921b");o(n("66fd"));var t=o(n("e0cc"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"5d6f":function(e,t,n){"use strict";var o=n("07ea"),a=n.n(o);a.a},6945:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=u(n("841b")),i=u(n("043e"));function u(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{indexBackgroundImage:a.default,qrCodeLeiMao:i.default,name:"",mobile:"",res:"123"}},methods:{handleDownloadQrIMg:function(){e.showActionSheet({itemList:["保存到相册"],success:function(t){0==t.tapIndex&&(e.showLoading({title:"保存中..."}),setTimeout(function(){e.hideLoading()},6e3),e.downloadFile({url:"https://www.leimaominer.com/public/images/webservice/service_ad.png",success:function(t){200===t.statusCode&&e.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(t){e.hideLoading(),e.showToast({title:"保存成功！"})}})}}))}})},dat:function(){var t=this;""!==this.name&&/^[\u2E80-\u9FFF]+$/.test(this.name)?""!==this.mobile&&/^1[3456789]\d{9}$/.test(this.mobile)?e.request({url:"https://leimaominer.com/api/AlipayResult/getContact",method:"POST",data:{name:this.name,mobile:this.mobile},header:{"content-type":"application/x-www-form-urlencoded"},success:function(n){if(console.log(o(1," at pages\\partner\\partner.vue:287")),console.log(o(n," at pages\\partner\\partner.vue:288")),1===n.data.code){e.showToast({icon:"none",title:"提交成功",duration:2e3}),t.name="",t.mobile="";setTimeout(function(){e.reLaunch({url:"../login/loginPas"})},1500)}},fail:function(n){console.log(o(2," at pages\\partner\\partner.vue:306")),console.log(o(n," at pages\\partner\\partner.vue:307")),1!==n.data.code&&(e.showToast({icon:"none",title:"请重新输入",duration:2e3}),t.name="",t.mobile="")}}):e.showToast({icon:"none",title:"请输入正确的电话号码",duration:2e3}):e.showToast({icon:"none",title:"请输入正确的姓名",duration:2e3})}}};t.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"69e2":function(e,t,n){},a269:function(e,t,n){"use strict";n.r(t);var o=n("6945"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},e0cc:function(e,t,n){"use strict";n.r(t);var o=n("f780"),a=n("a269");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("5d6f"),n("242d");var u=n("2877"),r=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,"4762f46c",null);t["default"]=r.exports},f780:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})}},[["3768","common/runtime","common/vendor"]]]);