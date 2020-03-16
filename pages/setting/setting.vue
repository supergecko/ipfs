<template>
	<view style="background: rgb(245,245,245);height: 100%;">
		<view style="height: 30upx;"></view>
		<view class="setTingItem">
			<view>手机号</view>
			<view>
				<text style="color:rgba(175,173,173,1);">{{userPhone}}</text>
<!-- 				<text class="icon">&#xe630;</text> -->
			</view>
		</view>
		<view class="borderPx"></view>
		<view class="setTingItem" @click="toPage2">
			<view>重置密码</view>
			<view>
				<text class="icon">&#xe630;</text>
			</view>
		</view>
		<view class="borderPx"></view>
		<!-- <view class="setTingItem" @click="toPage('../setting/userInfo')">
			<view>个人信息</view>
			<view>
				<text style="color:rgba(175,173,173,1);">{{userInfoTip}}</text>
				<text class="icon">&#xe630;</text>
			</view>
		</view> -->
		<view class="borderPx"></view>
		<view class="borderPx"></view>
		<view style="height: 30upx;"></view>

		<view class="loginOut" @click="bindLogout">退出登录</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	const userName = uni.getStorageSync('userName'); // 用户名
	export default {
		data() {
			return {
				userInfoTip:'' ,// 个人信息验证
				userPhone:userName ? userName : '', //用户名
				modifyMine:'',//矿池信息验证
				bind_status:0 ,
				mine_user_account_id:0
			};
		},
		onShow() {
			this._identityAuthenticationExist()
		},
		computed: {
			...mapState(['hasLogin', 'userName'])
		},
		methods: {
			...mapMutations(['logout']),
			toBindMine() {
				uni.navigateTo({
					url: '../control/bindingPool?bind_status='+ this.bind_status+'&mine_user_account_id='+this.mine_user_account_id
				});
			},
			// 是否绑定矿池
			_isBindMine() {
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
				})
				const user_id = uni.getStorageSync('userID')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.isBindMine,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						this.mine_user_account_id = res.data.data.exist.mine_user_account_id
						this.bind_status = res.data.data.bind_status
						if (res.data.data.bind_status==1){
							this.modifyMine = '已绑定'
						} else {
							this.modifyMine = '未绑定'
						}
					}
					uni.hideLoading()
					console.log(res);
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			},
			toPage(URL) {
				uni.navigateTo({
					url: URL
				});
			},
			toPage2() {
				uni.navigateTo({
					url: '../setting/replacePhone?userName='+this.userPhone
				});
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			// 退出
			bindLogout() {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '是否确定退出登录',
					success: function(res) {
						if (res.confirm) {
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
								title: '退出中'
							});
							uni.reLaunch({
								url:'../login/loginPas'
							})
							uni.hideLoading()
						// 	const user_id = uni.getStorageSync('userID')
						// 	let params = {
						// 		user_id
						// 	}
						// 	console.log(params)
						// 	_this.$ajax.post({
						// 		url: _this.$service.api_lists.loginOut,
						// 		data: params
						// 	}).then((res) => {
						// 		if (res.data.code == 1) {
						// 			//初始化信息
						// 			_this.logout()
						// 			uni.reLaunch({
						// 				url: '../login/login',
						// 			})
						// 		}
						// 		uni.hideLoading()
						// 		console.log(res)
						// 	}).catch((err) => {
						// 		uni.hideLoading()
						// 		uni.showToast({
						// 			title: err,
						// 			duration: 2000
						// 		});
						// 	})
						
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 是否身份信息验证
			_identityAuthenticationExist() {
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
					url: this.$service.api_lists.identityAuthenticationExist,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						switch(res.data.data.user_authentication_status) {
						     case 0:
						        this.userInfoTip = '待审核'
						        break;
						     case 1:
						        this.userInfoTip = '已验证'
						        break;
							 case 2:
							    this.userInfoTip = '审核不通过'
							    break;
						     default:
						        this.userInfoTip = '未设置'
						}
					}
					uni.hideLoading()
					console.log(res);
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
			this._identityAuthenticationExist()
			this._isBindMine()
			this.userPhone = uni.getStorageSync('userName'); // 用户名
		},
		onShow(){
			this.userPhone = uni.getStorageSync('userName'); // 用户名
		}
	}
</script>
<style>
	page {
	background-color: rgb(245, 245, 245);
	}
</style>
<style scoped>
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1456673_4pxyw8wa6af.ttf') format('truetype');
	}

	.icon {
		font-family: iconfont;
		margin-left: 10upx;
	}
	.setTingItem {
		display: flex;
		justify-content: space-between;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(21, 20, 20, 1);
		padding: 40upx 30upx 40upx 38upx;
		background: #FFF;
	}

	.borderPx {
		height: 1upx;
	}

	.loginOut {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(66, 162, 236, 1);
		height: 110upx;
		line-height: 110upx;
		text-align: center;
		background: #FFF;
	}

	uni-page-body,
	uni-page-wrapper {
		height: 100%;
	}
</style>
