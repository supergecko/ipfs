<template>
	<view style="background: rgb(245,245,245);height: 100%;" class="CRWarp">
		<view style="height: 24upx;"></view>
		<view class="chargeRechargeHeader" @click="openPopup4">
			<text style="margin-left: 30upx;">付款方式</text>
			<view style="display: flex;align-items: center;margin-right:29upx;">
				<input placeholder="请选择付款方式" style="text-align: right;" disabled="true" v-show="paymentFlag" />
				<text class="txt" v-show="!paymentFlag">{{paymentName}}</text>
				<text class="icon">&#xe630;</text>
			</view>
		</view>
		<view style="height: 24upx;"></view>
		<view class="chargeRechargeMiddle">
			<view style="height: 404upx;    display: flex;justify-content: space-around;flex-direction: column;">
				<view class="chargeRechargeMiddleItem">
					<text style="margin-left: 30upx;">套餐</text>
					<view style="display: flex;align-items: center;margin-right:29upx;">
						<text class="txt">{{electricityInfo.goods_name}}</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view>
				<view class="chargeRechargeMiddleItem">
					<text style="margin-left: 30upx;">电费</text>
					<view style="display: flex;align-items: center;margin-right:29upx;">
						<text class="txt">{{electricityInfo.electricity}}元/天</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view>
				<view class="chargeRechargeMiddleItem" @click="openPopup2">
					<text style="margin-left: 30upx;">电费缴纳天数</text>
					<view style="display: flex;align-items: center;margin-right:29upx;">
						<input placeholder="请选择电费缴纳天数" style="text-align: right;" disabled="true" v-show="electricityDayFlag" />
						<text class="txt" v-show="!electricityDayFlag">{{electricityDay}} 天</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view>
				<view class="chargeRechargeMiddleItem">
					<text style="margin-left: 30upx;">设备数量</text>
					<view style="display: flex;align-items: center;margin-right:29upx;">
						<text class="txt">{{electricityInfo.goods_num}}台</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view>
			</view>
			<view style="height: 1upx;width: 660upx;margin:0 auto;background:rgb(245,245,245)"></view>
			<view class="chargeRechargeMiddleItem2">
				<view>
					<text style="margin-right: 30upx;">应缴纳费用</text>
					<text style="color: #F03030;"><span style="font-size: 26upx;">￥</span>{{totalCase}} 元</text>
				</view>
				<view style="font-size:26upx;font-family:PingFang SC;font-weight:400;color:#888888">应缴纳费用=电费*电费缴纳天数*设备数量</view>
			</view>
		</view>
		<view class="chargeRechargeFooter">
			<view style="margin-left: 20upx;display: flex;align-items: center;">
				<text class="btnPriceText">实付金额</text>
				<view class="btnPrice">￥<span style="font-size: 32upx;font-weight: bold;">{{totalCase}} 元</span></view>
			</view>
			<view class="BTn" @click="_buyElectricityCost">立即缴纳</view>
		</view>

		<!-- 用户选择天数弹框 -->
		<uni-popup class="pop" ref="popup2" type="bottom">
			<view class="pop-item" @click='closePopup2(item)' v-for="(item, i) in electricityDayAll" :key="i">
				{{item.dayText}}
			</view>
			<view class="line" style="height: 0upx;">
			</view>
			<view class="pop-item cancel" @click="cancel('popup2')">取消</view>
		</uni-popup>
		<!-- 用户选择天数弹框 -->

		<!-- 支付方式弹框 -->
		<uni-popup ref="popup4" :custom="true" type="bottom">
			<view class="uni-share">
				<view class="uni-share-title">付款方式</view>
				<view class="uni-share-content">
					<view v-for="(item, i) in electricityPay" :key="i" @click='closePopup4(item)' class="uni-share-content-box">
						<view class="uni-share-content-image">
							<image :src='"../../static/paymentMethod/"+item.description+".png"' class="image" />
						</view>
						<view class="uni-share-content-text">{{item.name}}</view>
					</view>
				</view>
				<view class="uni-share-btn" @click="cancel('popup4')">取消 </view>
			</view>
		</uni-popup>
		<!-- 支付方式弹框 -->
		
		<!--线上支付-->
		<uni-popup ref="qrcode" :custom="true">
			<view class="uni-share" style="width:600upx;">
				<view class="uni-share-title">请扫描下方二维码进行支付</view>
				<view class="uni-share-content">
					<view class="uni-share-content-box" style="width: 100%;">
						<view class="uni-share-content-image" style="width: 360upx;height: 484upx;" @click="handleDownloadQrIMg(networkImgSrc)">
							<img :src="captchaSrc" style="width: 360upx;height: 484upx;	">
						</view>
						<view style="color: #007AFF;text-align: center;font-size: 24upx;">转账请备注手机号，以便工作人员核实到账情况。请勿备注与矿机有关字眼<br>如：蚂蚁矿机、神马矿机、比特币等</view>
						<view style="color: #007AFF;text-align: center;font-size: 30upx;color: red;">转账收款人:郑瑞龙</view>
						<view style="margin-top: 10upx;">待支付金额:<span style="color: red;">{{unpaid}}</span>元</view>
					</view>
				</view>
				<view class="uni-share-btn" @click="toback">支付完成</view>
				<view class="uni-share-btn" @click="cancel('qrcode')">取消</view>
			</view>
		</uni-popup>
		
		<!-- 对公转账 -->
		<uni-popup ref="underLine" :custom="true">
			<view class="uni-share" style="width:600upx;">
				<view class="uni-share-title">请线下转账对公账户</view>
				<view class="uni-share-content" style="display: flex;flex-direction: column;font-size: 32upx;">
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_title)">
						<view class="txt" style="width: 82px;">户 名:</view>
						<view class="txt">{{formLabelAlign.bank_title}}</view>
					</view>
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_account)">
						<view class="txt" style="width: 76px;">账 号:</view>
						<view class="txt">{{formLabelAlign.bank_account}}</view>
					</view>
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_open)">
						<view class="txt" style="width: 100px;">开 户 行:</view>
						<view class="txt">{{formLabelAlign.bank_open}}</view>
					</view>
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_name)">
						<view class="txt" style="width: 75px;">银行名称:</view>
						<view class="txt">{{formLabelAlign.bank_name}}</view>
					</view>
					<view style="margin-top: 10upx;text-align: center;">待支付金额:<span style="color: red;">{{unpaid}}</span>元</view>
					<view style="text-align: center;font-size: 30upx;color: grey;">点击以上内容进行复制</view>
				</view>
				<view class="uni-share-btn" @click="toback">支付完成</view>
				<view class="uni-share-btn" @click="cancel('underLine')">重新选购</view>
			</view>
		</uni-popup>
			
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			uniPopup
		},
		computed: {
			...mapState(['hasLogin']),
			captchaSrc() {
				return this.qrCodeUrl.replace(/[\r\n]/g, "")
			}
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this.order_electricity_id = option.order_electricity_id
			this._buyElectricityDetail()
		},
		data() {
			return {
				paymentName: '', //支付方式名称
				paymentFlag: true, // 支付方式flag
				electricityPay: [], // 支付方式
				electricityInfo: {}, // 电费订单详情
				order_electricity_id: '', //电费订单ID
				electricityDay: 0, // 用户选择的电费天数
				electricityDayFlag: true, // 用户选择天数flag
				totalCase:0,//总电费
				electricityDayAll: [{
						dayText: '30天',
						day: 30
					},
					{
						dayText: '60天',
						day: 60
					},
					{
						dayText: '90天',
						day: 90
					},
					{
						dayText: '120天',
						day: 120
					},
					{
						dayText: '150天',
						day: 150
					},
					{
						dayText: '180天',
						day: 180
					}
				],
				pay_id:0,
				qrCodeUrl: '', // 二维码图片
				unpaid: 0, // 未支付金额
				networkImgSrc: '', // 支付网络图片链接下载
				formLabelAlign: {
					bank_account: '',
					bank_name: '',
					bank_open: '',
					bank_title: ''
				}
			}
		},
		methods: {
			//#ifdef H5
			// 点击下载图片 (H5端)
			handleDownloadQrIMg(ImgSrc) {
				// 这里是获取到的图片base64编码
				const imgUrl = this.qrCodeUrl
				// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
				if (window.navigator.msSaveOrOpenBlob) {
					var bstr = atob(imgUrl.split(',')[1])
					var n = bstr.length
					var u8arr = new Uint8Array(n)
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n)
					}
					var blob = new Blob([u8arr])
					window.navigator.msSaveOrOpenBlob(blob, 'paymentImg' + '.' + 'png')
				} else {
					// 这里就按照chrome等新版浏览器来处理
					const a = document.createElement('a')
					a.href = imgUrl
					a.setAttribute('download', 'paymentImg.png')
					a.click()
				}
			},
			//复制(H5)
			copyText(item) {
				const _this = this
				this.$copyText(item).then(function(e) {
					uni.showToast({
						icon: 'none',
						title: '复制成功'
					})
				}, function(e) {
					uni.showToast({
						icon: 'none',
						title: '复制失败，请重试'
					})
				})
			},
			//#endif
			
			//#ifdef APP-PLUS
			// 点击下载图片 (APP端)
			handleDownloadQrIMg(ImgSrc) {
				uni.showActionSheet({
					itemList:["保存到相册"],  
					success:res=>{  
						if(res.tapIndex==0){  
							uni.showLoading({  
								title:"保存中..."  
							})  
							setTimeout(function() {   
								uni.hideLoading()  
							}, 6000);  
							uni.downloadFile({  
								url: ImgSrc,//网络路径，下载下来  
								success: (res) => {
									if (res.statusCode === 200) {  
										uni.saveImageToPhotosAlbum({  
											filePath: res.tempFilePath,//下载后的临时路径  
											success:  res => {//下载完成后在相册里压根找不到  
												uni.hideLoading()  
												uni.showToast({  
													title:"保存成功！"   
												})  
											}  
										})  
									}  
								}  
							});  
						}  
					}  
				})
			},
			//复制(APP)
			copyText(item) {
				uni.setClipboardData({
				    data: item,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			//#endif
			
			// 拉取电费订单信息
			_buyElectricityDetail() {
				uni.getNetworkType({
					success: (res) => {
						if (res.networkType == 'none') {
							uni.showToast({
								icon: 'none',
								title: '当前网络不可用'
							})
						}
					}
				})
				uni.showLoading({
					title: '加载中'
				});
				const user_id = uni.getStorageSync('userID')
				const order_electricity_id = this.order_electricity_id
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${order_electricity_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					user_id,
					order_electricity_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.buyElectricityDetail,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.electricityInfo = res.data.data.info
						this.electricityPay = res.data.data.pay
					}
					uni.hideLoading()
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			},
			// 购买电费
			_buyElectricityCost() {
				if (this.paymentName === '') {
					uni.showToast({
						icon: 'none',
						title: '请选择付款方式'
					});
					return;
				}
				if (this.electricityDay === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择电费缴纳天数'
					});
					return;
				}
				uni.getNetworkType({
					success: (res) => {
						if (res.networkType == 'none') {
							uni.showToast({
								icon: 'none',
								title: '当前网络不可用'
							})
						}
					}
				})
				uni.showLoading({
					title: '购买中'
				});
				const user_id = uni.getStorageSync('userID')
				const buy_day = this.electricityDay
				const pay_id = this.pay_id
				const order_electricity_id = this.order_electricity_id
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${order_electricity_id}__${buy_day}__${pay_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, order_electricity_id, buy_day, pay_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.buyElectricityCost,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						if (res.data.data.pay_type < 3) {
						  //打开二维码支付
						  this.qrCodeUrl = res.data.data.base64
						  this.networkImgSrc = res.data.data.qrcode
						  this.unpaid = res.data.data.unpaid // 未支付金额
						  this.$refs.qrcode.open()
						} else if (res.data.data.pay_type === 3) {
						  uni.showToast({
						  	icon: 'none',
						  	title: '支付成功'
						  })
						  const fres = setTimeout(() => {
						  	uni.reLaunch({
						  		url:'../myOrder/myOrder'
						  	})
						  }, 1500)
						} else {
						  //打开公账
						  this.formLabelAlign.bank_account = res.data.data.address.bank_account
						  this.formLabelAlign.bank_name = res.data.data.address.bank_name
						  this.formLabelAlign.bank_open = res.data.data.address.bank_open
						  this.formLabelAlign.bank_title = res.data.data.address.bank_title
						  this.unpaid = res.data.data.unpaid // 未支付金额
						  this.$refs.underLine.open()
						}
					}
					uni.hideLoading()
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			},
			
			toback(){
				uni.navigateBack({
					delta: 1 // 代表返回上 1 页
				})
			},
			openPopup4() {
				this.$refs.popup4.open()
			},
			// 支付方式
			closePopup4(item) {
				this.$refs.popup4.close()
				this.paymentFlag = false
				this.paymentName = item.name
				this.pay_id = item.pay_id
			},
			// 用户选择天数
			openPopup2() {
				this.$refs.popup2.open()
			},
			closePopup2(item) {
				this.$refs.popup2.close()
				this.electricityDayFlag = false
				this.electricityDay = item.day
			},
			// 通用关闭弹框
			cancel(type) {
				this.$refs[type].close()
			},

		},
		watch: {
			// 电费天数
			electricityDay(newName, oldName) {
				this.totalCase = parseFloat(newName) * parseFloat(this.electricityInfo.electricity) // 总电费
				this.totalCase = parseFloat(this.totalCase).toFixed(2) // 总电费
			}
		}
	}
</script>

<style>
	.CRWarp {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(23, 23, 25, 1);
	}

	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1456673_4pxyw8wa6af.ttf') format('truetype');
	}

	.icon {
		font-family: iconfont;
		margin-left: 10upx;
	}

	uni-page-body {
		height: 100%;
	}

	.chargeRechargeHeader {
		width: 720upx;
		height: 120upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 14upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.chargeRechargeMiddle {
		width: 720upx;
		height: 565upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 14upx;
		margin: 0 auto;
	}

	.chargeRechargeMiddleItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.chargeRechargeMiddleItem2 {
		height: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-top: 14upx;
		text-align: right;
		padding-right: 30upx;
	}

	.chargeRechargeFooter {
		height: 100upx;
		width: 750upx;
		background: rgba(255, 255, 255, 1);
		position: fixed;
		bottom: 0px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.btnPriceText {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(23, 23, 25, 1);
		margin-right: 30upx;
	}

	.btnPrice {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #F03030;
	}

	.BTn {
		width: 222upx;
		height: 78upx;
		background: rgba(243, 78, 78, 1);
		border-radius: 38upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 78upx;
		margin-right: 16upx;
	}

	/* 底部分享 */
	.uni-share {
		background: #fff;
	}

	.uni-share-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
		text-align: center;
	}

	.uni-share-content {
		display: flex;
		flex-wrap: wrap;
		padding: 15px;
	}

	.uni-share-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		box-sizing: border-box;
	}

	.uni-share-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60upx;
		height: 60upx;
		overflow: hidden;
		border-radius: 10upx;
	}

	.uni-share-content-image .image {
		width: 100%;
		height: 100%;
	}

	.uni-share-content-text {
		font-size: 26upx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}

	.uni-share-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
		text-align: center;
		color: #666;
	}

	.pop-item {
		height: 100upx;
		border-bottom: 1upx solid rgb(245, 245, 245);
		background-color: #fff;
		line-height: 100upx;
		display: block;
		text-align: center;
		font-size: 34upx;
		color: #151414;
	}
</style>
