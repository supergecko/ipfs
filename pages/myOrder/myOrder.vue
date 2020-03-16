<template>
	<view class="myOrder" style="height: 100%;">
		<view class="box">
			<QSTabs :current="current_2" :tabs="tabs_2" width="250" activeColor="#42A2EC" @change="change2($event, '1')"/>
		</view>
		<!-- 全部订单 -->
		<view v-show="current_2===0&&current_1===0">
			<view class="content" v-for="(item,index) in All" :key='index'>
				<view class="main">
					<view class="time">
						<text class="txt">{{item.buy_time}}</text>
						<text class="status">
						{{item.pay_status==0&&item.order_status==0? '待付款':
						 item.pay_status==1&&item.order_status==1&&item.shipping_time==''? '已完成':''}}</text>
					</view>
					<view class="mill" @click="toPage(item.order_id)">
						<image class="img" src="../../static/images/user/ipfs.jpg" mode=""></image>
						<view class="wrap">
							<text class="txt" style="margin-top: 36upx;margin-bottom: 28upx;">{{item.goods_name}}</text>
							<text class="txt">${{item.shop_price}}</text>
						</view>
						<text class="numm">*{{item.goods_num}}</text>
					</view>
					<!-- <view class="mill">
						<image class="img" src="../../static/images/user/testdf.png" mode=""></image>
						<view class="wrap">
							<text class="txt" style="margin-top: 36upx;margin-bottom: 28upx;">电费</text>
							<text class="txt">$20000</text>
						</view>
						<text class="numm">30天</text>
					</view> -->
					<view class="price" style="text-align: right;">
						<text class="txt">共{{item.goods_num}}件商品</text><br>
						<!-- <text class="txt" style="color: rgb(136, 136, 136);font-size:24upx;">优惠卷抵扣:{{item.coupon_money}}</text><br>
						<text class="txt" style="color: rgb(136, 136, 136);font-size:24upx;">积分抵扣:{{item.thundercat_coin}}</text><br> -->
						<view class="txt" style="margin-top:10upx;">实付金额:$<span style="color: #F03030;">{{item.actual_price}}</span></view>
					</view>
					<!-- <text class="btn one">取消订单</text> -->
					<text class="btn two" style="margin-top:32upx;margin-left: 484upx;" :style="{'display' :item.pay_status==0&&item.order_status==0? 'block' : 'none'}" @click="_payAgain(item.order_id)">立即付款</text>
				</view>
			</view>
		</view>
		
		<!-- 待付款 -->
		<view v-show="current_2===1&&current_1===0">
			<view class="content" v-for="(item,index) in unpaidArry" :key='index'>
				<view class="main">
					<view class="time">
						<text class="txt">{{item.buy_time}}</text>
						<text class="status">待付款</text>
					</view>
					<view class="mill" @click="toPage(item.order_id)">
						<image class="img" src="../../static/images/user/ipfs.jpg" mode=""></image>
						<view class="wrap">
							<text class="txt" style="margin-top: 36upx;margin-bottom: 28upx;">{{item.goods_name}}</text>
							<text class="txt">${{item.shop_price}}</text>
						</view>
						<text class="numm">*{{item.goods_num}}</text>
					</view>
					<view class="price" style="text-align: right;">
						<text class="txt">共{{item.goods_num}}件商品</text><br>
						<!-- <text class="txt" style="color: rgb(136, 136, 136);font-size:24upx;">优惠卷抵扣:{{item.coupon_money}}</text><br>
						<text class="txt" style="color: rgb(136, 136, 136);font-size:24upx;">积分抵扣:{{item.thundercat_coin}}</text><br> -->
						<view class="txt" style="margin-top:10upx;">实付金额:$<span style="color: #F03030;">{{item.actual_price}}</span></view>
					</view>
					<!-- <text class="btn one">取消订单</text> -->
					<text class="btn two" style="margin-top:32upx;margin-left: 484upx;" @click="_payAgain(item.order_id)">立即付款</text>
				</view>
			</view>
		</view>
		
		<!-- 已完成 -->
		<view v-show="current_2===2&&current_1===0">
			<view class="content" v-for="(item,index) in completed" :key='index'>
				<view class="main">
					<view class="time">
						<text class="txt">{{item.buy_time}}</text>
						<text class="status">已完成</text>
					</view>
					<view class="mill" @click="toPage(item.order_id)">
						<image class="img" src="../../static/images/user/ipfs.jpg" mode=""></image>
						<view class="wrap">
							<text class="txt" style="margin-top: 36upx;margin-bottom: 28upx;">{{item.goods_name}}</text>
							<text class="txt">${{item.shop_price}}</text>
						</view>
						<text class="numm">*{{item.goods_num}}</text>
					</view>
					<view class="price" style="text-align: right;">
						<text class="txt">共{{item.goods_num}}件商品</text><br>
						<!-- <text class="txt" style="color: rgb(136, 136, 136);font-size:24upx;">优惠卷抵扣:{{item.coupon_money}}</text><br>
						<text class="txt" style="color: rgb(136, 136, 136);font-size:24upx;">积分抵扣:{{item.thundercat_coin}}</text><br> -->
						<view class="txt" style="margin-top:10upx;">实付金额:$<span style="color: #F03030;">{{item.actual_price}}</span></view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!--线上支付-->
		<uni-popup ref="qrcode" :custom="true">
			<view class="uni-share" style="width:600upx;">
				<view class="uni-share-title">请扫描下方二维码进行支付</view>
				<view class="uni-share-content">
					<view class="uni-share-content-box" style="width: 100%;">
						<view class="uni-share-content-image" style="width: 360upx;height: 360upx;" >
							<img :src="captchaSrc" style="width: 360upx;height: 360upx;	">
						</view>
						<view class="saveSrcBtn" @click="handleDownloadQrIMg(networkImgSrc)">保存二维码</view>
						<view style="font-size: 26upx;color: darkgray;margin-top: 20upx;">充币地址</view>
						<view style="color: #007AFF;text-align: center;font-size: 24upx;" >{{usdtAddress}}</view>
						<view class="copyAddressBTn" @click="copyText(usdtAddress)">复制地址</view>
						<view style="margin-top: 10upx;font-size: 30upx;">待支付金额: <span style="color: red;">$ {{unpaid}}</span></view>
					</view>
				</view>
				<view class="uni-share-btn" @click="successPay('qrcode')">支付完成</view>
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
				<view class="uni-share-btn" @click="successPay('underLine')">支付完成</view>
				<view class="uni-share-btn" @click="cancel('underLine')">重新选购</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue'
	import { mapState } from 'vuex'
	export default {
		components: {
			QSTabs,
			uniPopup
		},
		computed: {
			...mapState(['hasLogin']),
			captchaSrc() {
				return this.qrCodeUrl.replace(/[\r\n]/g, "")
			}
		},
		onNavigationBarButtonTap() {
			uni.reLaunch({
				url: '../user/user',
			});
		},
		data() {
			return {
				usdtAddress:'0x7df5a30658993392c5e85c14cc4584eae69fe489',//USDT收款地址
				current_1: 0, // 算力套餐/电费订单Tab切换index
				tabs_1: ['算力套餐订单', '电费订单'],
				tabs_2: ['全部订单', '待付款', '已完成'],
				current_2: 0, // 算力套餐Tab切换index
				All:[], //全部
				unpaidArry:[],//待支付
				undelivery:[],//待发货
				delivery:[],//已发货
				completed:[],//已完成	
				electricity_list: [] ,// 电费订单数组
				qrCodeUrl: '', // 二维码图片
				networkImgSrc: '', // 支付网络图片链接下载
				unpaid: 0 ,// 未支付金额
				formLabelAlign: {
					bank_account: '',
					bank_name: '',
					bank_open: '',
					bank_title: ''
				}
			}
		},
		methods: {
			actualPrice (price) {
				return parseFloat(price).toFixed(2)
			},
			// 重新购买
			_payAgain(orderId) {
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
					title: '重新支付中'
				});
				const user_id = uni.getStorageSync('userID')
				const order_id = orderId
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${order_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, order_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.payAgain,
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
			successPay(type) {
				this.$refs[type].close()
				const fres = setTimeout(() => {
					uni.reLaunch({
						url: '../myOrder/myOrder'
					})
				}, 1500)
			},
			// 通用关闭弹框
			cancel(type) {
				this.$refs[type].close()
			},
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
			// 复制 (H5)
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
			//复制 (APP)
			copyText(item) {
				uni.setClipboardData({
				    data: item,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			//#endif
			
			// 拉取订单状态信息
			_mobileOrderList() {
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
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.mobileOrderList,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.All = res.data.data.all
						this.unpaidArry = res.data.data.unpaid
						this.undelivery = res.data.data.undelivery
						this.delivery = res.data.data.delivery
						this.completed = res.data.data.completed
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
			
			// 拉取电费订单信息
			_orderDataList() {
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
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.orderDataList,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.electricity_list = res.data.data.electricity_list
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
			
			//跳转到订单详情页
			toPage(order_id) {
				uni.navigateTo({
					url: '../orderDetails/orderDetails?order_id='+order_id
				});
			},
			//跳转到电费订单详情页
			toChargeRecharge(order_electricity_id) {
				uni.navigateTo({
					url: '../chargeRecharge/chargeRecharge?order_electricity_id='+order_electricity_id
				});
			},
			//力套餐/电费订单Tab切换
			change1(index, i) {
				this.current_1 = index
			},
			//算力套餐tab 切换
			change2(index, i) {
				this.current_2 = index
			}
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this._mobileOrderList()
			this._orderDataList()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._mobileOrderList()
				this._orderDataList()
				uni.stopPullDownRefresh(); //停止下拉刷新动画
				uni.showToast({
					icon: 'none',
					title: '刷新成功'
				})
			}, 1000);
			uni.getNetworkType({
			    success:  (res) => {
			        if(res.networkType == 'none'){
						uni.showToast({
							icon:'none',
							title:'当前网络不可用'
						})
						clearTimeout(fres)
						uni.stopPullDownRefresh(); //停止下拉刷新动画
					}
			    }
			})
		}
	}
</script>
<style>
	uni-page-body {
		height: 100%;
	}
</style>
<style scoped lang="scss">
	.saveSrcBtn{
		width:200upx;
		height:68upx;
		background:rgba(231,237,249,1);
		opacity:0.94;
		border-radius:10upx;
		border: 1upx solid rgb(194,206,216);
		color: rgb(3,105,209);
		text-align: center;
		line-height: 68upx;
		font-weight: bold;
		margin-top: 20upx;
		font-size: 30upx;
		font-family: 'fangsong';
	}
	.copyAddressBTn{
		width:160upx;
		height:56upx;
		background:rgba(233,234,235,1);
		opacity:0.94;
		border-radius:10upx;
		color: darkgray;
		text-align: center;
		line-height: 56upx;
		margin-top: 20upx;
		font-size: 30upx;
		font-family: 'fangsong';
	}
	.ElectricityItem{
		width:720upx;
		height:452upx;
		background:rgba(255,255,255,1);
		border-radius:14upx;
		margin: 0 auto;
		box-sizing: border-box;
		padding-top: 24upx;
		padding-left: 30upx;
		position: relative;
	}
	.ElectricityItemLeftText{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(119,119,119,1);
	}
	.ElectricityItemRightText{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(23,23,25,1);
	}
	.ElectricityItemBtn{
		width:173upx;
		height:65upx;
		border:1upx solid rgba(82,171,240,1);
		border-radius:30upx;
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(66,162,236,1);
		line-height:65upx;
		text-align: center;
		position: absolute;
		bottom: 46upx;
		right: 30upx;
	}
	.nav {
		display: flex;
		flex-direction: row;

		.txt {
			display: inline-block;
			width: 20%;
			text-align: center;
			font-size: 30upx;
			color: #777;
			padding: 23upx 0;
		}

		.active {
			color: #171719;
			padding-bottom: 23upx;
			border-bottom: 6upx solid #42A2EC;
		}
	}

	.content {
		padding: 24upx 15upx;
		background-color: rgb(245, 245, 245);

		.main {
			background-color: #fff;
			padding: 35upx 30upx;

			.time {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.txt {
					font-size: 26upx;
					color: #666666;
				}

				.status {
					font-size: 26upx;
					color: #F03030;
				}
			}

			.mill {
				display: flex;
				position: relative;
				flex-direction: row;

				.numm {
					font-size: 28upx;
					color: #999999;
					position: absolute;
					right: 0upx;
					top: 115upx;
				}

				.img {
					width: 144upx;
					height: 144upx;
					margin-top: 36upx;
					margin-right: 26upx;
				}

				.wrap {
					.txt {
						font-size: 32upx;
						color: #171719;
						display: block;
					}
				}
			}

			.price {
				margin-left: 200upx;
				margin-top: 40upx;

				.txt {
					font-size: 30upx;
					color: #171719;
				}

				.num {
					font-size: 24upx;
					color: #F03030;
				}
			}

			.btn {
				width: 176upx;
				height: 65upx;
				border-radius: 30upx;
				text-align: center;
				line-height: 65upx;
				font-size: 26upx;
				display: inline-block;
			}

			.one {
				border: 1upx solid #888888;
				color: #888;
				margin-left: 283upx;
				margin-top: 32upx;
			}

			.two {
				border: 1upx solid #F85B5B;
				color: #F85B5B;
				margin-left: 25upx;
			}
		}
	}
	/* 底部分享 */
	.uni-share {
		background: rgb(247,247,249);
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
		font-size: 24upx;
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
