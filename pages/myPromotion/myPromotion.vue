<template>
	<view class="myPromotion">
		<!-- <image class="img" src="../../static/images/user/promote.png" mode=""></image> -->
		<view class="rebate">
			<view class="title">
				<text class="txt">{{identity}}</text>
				<text class="txt">累计邀请人数 {{direct_number}}</text>
			</view>
			<view class="content">
				<view class="left">
					<text class="txt" style="margin-bottom: 20upx;">累计返佣</text>
					<text class="num">{{add_up_coin}}</text>
					<!-- <text class="txt">（积分）</text> -->
				</view>
				<view class="right">
					<text class="txt">USDT</text>
					<text class="num">{{available}}</text>
					<text class="btn" @click="open('withdrawal')">申请提现</text>
				</view>
			</view>
		</view>
		<view class="invite">
			<view class="title" style="align-items: center;">
				<text class="txt">我的邀请二维码</text>
				<!-- <text class="btn" @click="copyText">复制邀请链接</text> -->
				<text class="btn" @click="downImgSrc()">下载二维码</text>
			</view>
			<view class="txt-link">
				<!-- {{input}} -->
				<view style="text-align: center;">
					<image :src="qrCodeSrc" style="width: 300upx;height: 300upx;"></image>
				</view>
			</view>
		</view>
		<!-- 返佣记录 -->
		<view class="record">
			<text class="title">返佣记录</text>
			<view class="content" v-for="(item,index) in bonus_record" :key='index' v-if="!(bonus_record.length===0)">
				<!-- <text class="txt">{{item.order_sn}}</text> -->
				<view class="username">
					<text>{{item.description}}</text>
					<text>{{item.bonus}}</text>
				</view>
				<view class="time">
					<text class="txt">{{item.create_time}}</text>
					<text class="txt">{{item.type_string}}</text>
				</view>
			</view>
			<view class="zanwuClass" v-if="bonus_record.length===0">
				<image src="../../static/zanwu.png" style="width: 230upx;height: 230upx;"></image>
				<text style="font-size: 30upx;color:gray;">暂无数据</text>
			</view>
		</view>
		<!-- 提现记录 -->
		<view class="record">
			<text class="title">提现记录</text>
			<view class="content" v-for="(item,index) in withdrawalsRecord" :key='index' v-if="!(withdrawalsRecord.length===0)">
				<!-- <text class="txt">{{item.order_sn}}</text> -->
				<view class="username">
					<text>{{item.description}}</text>
					<text>{{item.bonus}}</text>
				</view>
				<view class="time">
					<text class="txt">{{item.create_time}}</text>
					<text class="txt">{{item.status_string}}</text>
				</view>
			</view>
			<view class="zanwuClass" v-if="withdrawalsRecord.length===0">
				<image src="../../static/zanwu.png" style="width: 230upx;height: 230upx;"></image>
				<text style="font-size: 30upx;color:gray;">暂无数据</text>
			</view>
		</view>
		<!--提现弹框-->
		<uni-popup ref="withdrawal" :custom="true">
			<view class="uni-share" style="width:600upx;">
				<view class="uni-share-title">提现</view>
				
				<view class="uni-share-content">
					<view class="uni-share-content-box" style="width: 100%;">
						<uniInput :before="'填写提现USDT数量'" :after="'提现USDT数量'" @input="input1"></uniInput>
						<uniInput :before="'填写提现地址'" :after="'提现地址'" @input="input2"></uniInput>
						<uniInput :before="'填写提现备注'" :after="'提现备注'" @input="input3"></uniInput>
					</view>
				</view>
				<view class="uni-share-btn" @click="successWithdrawal('withdrawal')">提现</view>
				<view class="uni-share-btn" @click="cancel('withdrawal')">取消</view>
			</view>
		</uni-popup>
		<!-- 二维码弹框 -->
		<uni-popup ref="Qrcode" :custom="true">
			<view class="uni-share" style="width:600upx;">
				<view class="uni-share-content">
					<view class="uni-share-content-box QRcode" :style="{backgroundImage:`url(${downQrcode})`}">
						<!-- <image :src="qrCodeSrc" style="width:120upx;height:120upx;position: absolute;top:0upx;right:0upx;"></image> -->
					</view>
				</view>
				<view class="uni-share-btn" @click="cancel('Qrcode')">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniInput  from "@/components/uni-input/uni-input.vue"
	import ipfsQr from '@/static/ipfsQrcode.png';
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		components: {
			uniPopup,uniInput
		},
		data() {
			return {
				ipfsQr: ipfsQr,
				withdrawalIntegral:'',//提现USDT数量
				withdrawalAddress:'',//提现地址
				withdrawalRemarks:'',//提现备注
				shadow: false,
				QRCodeUrl: '', // 邀请链接的二维码地址
				input: '', // 邀请链接文字
				identity: '', // 当前身份
				add_up_coin: 0, // 累计返佣积分
				direct_number: 0, // 累计邀请人数
				available: 0, // 可提佣金
				bonus_record: [] ,// 返佣记录
				withdrawalsRecord:[],//提现记录
				qrCodeSrc:'',//二维码链接
				downQrcode:'',//要下载的二维码图片
				downQrcodeBase64:'' //要下载的二维码图片base64
			}
		},
		methods: {
			//下载图片
			downImgSrc(){
				this.open('Qrcode')
				this.handleDownloadQrIMg(this.downQrcode)
			},
			successWithdrawal(){
				console.log(this.withdrawalIntegral,this.withdrawalAddress,this.withdrawalRemarks)
				this._withdraw()
			},
			input1(e){
			    this.withdrawalIntegral = e.detail.value
			},
			input2(e){
			    this.withdrawalAddress = e.detail.value
			},
			input3(e){
			    this.withdrawalRemarks = e.detail.value
			},
			// 通用打开弹框
			open(type) {
				this.$refs[type].open()
			},
			// 通用关闭弹框
			cancel(type) {
				this.withdrawalIntegral = ''
				this.withdrawalAddress = ''
				this.withdrawalRemarks = ''
				this.$refs[type].close()
			},
			//#ifdef H5
			// 点击下载图片 (H5端)
			 handleDownloadQrIMg (src) {
			    uni.downloadFile({
			        url: src, //仅为示例，并非真实的资源
			        success: (res) => {
			            if (res.statusCode === 200) {
			                console.log('下载成功');
			            }
			        }
			    });
			 },
			//复制(H5)
			copyText() {
				const _this = this
				this.$copyText(this.input).then(function(e) {
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
				    data: this.input,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			//#endif
			
			// 申请提现
			_withdraw() {
				if (this.withdrawalIntegral == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写提现USDT数量'
					});
					return;
				}
				if (this.withdrawalAddress == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写提现地址'
					});
					return;
				}
				if (this.withdrawalRemarks == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写提现备注'
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
					title: '加载中'
				});
				const user_id = uni.getStorageSync('userID')
				const address = this.withdrawalAddress
				const num = this.withdrawalIntegral // 积分
				const description = this.withdrawalRemarks //备注
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${address}__${num}__${description}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					user_id,
					address,
					num,
					description,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.withdraw,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
						this.withdrawalIntegral = ''
						this.withdrawalAddress = ''
						this.withdrawalRemarks = ''
						this.$refs.withdrawal.close()
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					this.withdrawalIntegral = ''
					this.withdrawalAddress = ''
					this.withdrawalRemarks = ''
					uni.showToast({
						title: err,
						duration: 2000
					})
					this.$refs.withdrawal.close()
				})
			},
			// 拉取我的推广信息
			_myPopularize() {
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
				let params = {
					user_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.myPopularize,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.downQrcode = res.data.data.poster
						this.downQrcodeBase64 = res.data.data.poster
						this.input = res.data.data.popularize_url
						this.QRCodeUrl = res.data.data.qr_code
						this.add_up_coin = res.data.data.add_up_coin === null ? 0 : res.data.data.add_up_coin //累计返佣
						this.direct_number = res.data.data.direct_number === null ? 0 : res.data.data.direct_number
						this.available = res.data.data.available_bonus === null ? 0 : res.data.data.available_bonus //可提积分
						this.identity = res.data.data.identity
						this.bonus_record = res.data.data.bonus_record
						this.withdrawalsRecord = res.data.data.withdraw
						this.qrCodeSrc = res.data.data.qr_code
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
			}
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this._myPopularize()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._myPopularize()
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

<style scoped lang='scss'>
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
		align-items: center;
		justify-content: center;
	}
	.uni-share-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		width: 20%;
	}
	.QRcode{
		width: 100%;
		background-size:100% 100%;
		position: relative;
		height: 1000upx;
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
	.zanwuClass{
		height: 432upx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.myPromotion {
		padding: 32upx 20upx;
		box-sizing: border-box;
		background-image: linear-gradient(#fff, rgb(245, 245, 245));

		.img {
			width: 710upx;
			height: 281upx;
			border-radius: 16upx;
			margin-bottom: 28upx;
		}

		.rebate {
			width: 100%;
			height: 324upx;
			padding: 34upx 28upx;
			box-sizing: border-box;
			background: url(../../static/images/user/myPromotionBg.png);
			background-size: 100% 100%;
			margin-bottom: 55upx;

			.title {
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				margin-bottom: 60upx;

				.txt {
					font-size: 30upx;
					color: #fff;
				}
			}

			.content {
				display: flex;
				flex-direction: row;

				.left {
					width: 50%;
					padding-left: 42upx;
					box-sizing: border-box;
					border-right: 1upx solid #fff;
					height: 140upx;

					.txt {
						font-size: 24upx;
						color: rgba(222, 239, 252, 1);
						display: block;
					}

					.num {
						font-size: 40upx;
						color: #fff;
					}
				}

				.right {
					width: 50%;
					padding-left: 70upx;
					box-sizing: border-box;

					.txt {
						font-size: 24upx;
						color: rgba(222, 239, 252, 1);
						display: block;
						margin-bottom: 20upx;
					}

					.num {
						font-size: 40upx;
						color: #fff;
						display: block;
					}

					.btn {
						padding: 8upx 15upx;
						background-color: rgba(0, 0, 0, 0);
						font-size: 24upx;
						border: 1upx solid #fff;
						color: #fff;
					}
				}
			}

		}

		.invite {
			.title {
				display: flex;
				justify-content: space-between;
				flex-direction: row;

				.txt {
					font-size: 34upx;
					color: #171719;
					/* font-weight: bold; */
				}

				.btn {
					padding: 15upx 19upx;
					background-color: #42A2EC;
					color: #fff;
					font-size: 24upx;
					border-radius: 4upx;
				}
			}

			.txt-link {
				display: block;
				font-size: 26upx;
				color: rgba(23, 23, 25, 1);
				padding: 34upx 28upx;
				margin-top: 30upx;
				background-color: #D9EEFF;
				border-radius: 8upx;
			}
		}

		.record {
			margin-top: 70upx;

			/* margin-bottom: 30upx; */
			.title {
				font-size: 32upx;
				color: #171719;
				/* font-weight: bold; */
				margin-bottom: 14upx;
			}

			.content {
				background: #fff;
				padding: 28upx 28upx;
				margin-top: 20upx;

				.txt {
					font-size: 26upx;
					color: #666666;
					padding-bottom: 22upx;
					border-bottom: 1px solid rgb(245, 245, 245);
					display: block;
				}

				.username {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					font-size: 32upx;
					margin: 38upx 0;
				}

				.time {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.txt {
						border: none;
					}
				}
			}
		}
	}
</style>
