<template>
	<view class="loginWarp">
		<view class="head">
			<view style="display: flex;justify-content: center;padding-top: 40upx;">
				<image class="logo" src="../../static/images/login/logo.png" mode=""></image>
			</view>
			
<!-- 			<image class="name" src="../../static/images/login/name.png" mode=""></image> -->
			<text class="txt">账号密码登录</text>
			<view>
				<view class="content">
					<view class="form">
						<view class="item" style="padding-top: 170upx;">
							<text class="txt" style="margin-left: 0upx;margin-top: 60upx;">密码</text>
							<input class="ipt" password placeholder="请输入密码" type="text" v-model="userInfo.verification" />
						</view>
						<view class="item" style="border-bottom: 1upx solid #E6E8ED;">
							<text class="txt" style="margin-left: 0upx;margin-top: 60upx;">手机号</text>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<input class="spearIpt" placeholder="请输入账号" type="text" v-model="userInfo.username" />
								<image class="img" src="../../static/images/login/delete.png" mode="" v-show="userInfo.username" @click="empty"></image>
							</view>
						</view>
				
						<view class="btn" @click="bindLogin">登录</view>
						<view class="changeLogin">
							<text class="txt change" @click="toPage('../login/loginYzm')" style="margin-top: 40upx;margin-left: 0upx;">注册</text>
							<text class="txt pawod" @click="toPage('../login/reset')" style="margin-top: 40upx;margin-left: 0upx;">忘记密码</text>
						</view>
					</view>
				</view>
			</view>
			
		
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				userInfo: {
					username: '', // 手机号
					verification: '' // 密码
				}
			}
		},
		onNavigationBarButtonTap() {
			uni.reLaunch({
				url: '../home/home',
			});
		},
		onLoad() {
			this.logout();//强制退出一下
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			setTimeout(() => {
				this.userInfo.username = ''
				this.userInfo.verification = ''
				uni.stopPullDownRefresh(); //停止下拉刷新动画
				uni.showToast({
					icon: 'none',
					title: '刷新成功'
				})
			}, 1000);
		},
		computed: {
			...mapState(['forcedLogin']),
		},
		methods: {
			...mapMutations(['login', 'logout']),
			bindLogin() {
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
				if (this.userInfo.username.length =='') {
					uni.showToast({
						icon: 'none',
						title: '请输入账号'
					});
					return;
				}
				if (this.userInfo.verification.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '密码不能小于5位'
					});
					return;
				}
				uni.showLoading({
					title: '登录中'
				});
				const mobile = this.userInfo.username
				const password = this.userInfo.verification
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}__${password}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					mobile,
					password,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.userLogin,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化用户信息
						uni.setStorageSync("userToken", res.data.data.token);
						uni.setStorageSync("userName", res.data.data.mobile);
						uni.setStorageSync("userID", res.data.data.mobile);
						uni.setStorageSync("identityId", res.data.data.identity);
						this.toMain(res.data.data.user_id);
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
					    title: err,
					    duration: 2000
					})
				})
			},
			
			toMain(userID) {
			    this.login(userID);
			    /**
			     * 强制登录时使用reLaunch方式跳转过来
			     * 返回首页也使用reLaunch方式
			     */
			    if (this.forcedLogin) {
			        uni.reLaunch({
			            url: '../home/home',
			        });
			    } else {
			        uni.navigateBack();
			    }
			
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				});
			},
			empty() {
				this.userInfo.username = ""
			}
		}
	}
</script>
<style>
	page {
	background-color: rgb(245, 245, 245);
	}
</style>
<style scoped lang="scss">
	.loginWarp{
		background-color: rgb(245, 245, 245);
		width: 750upx;
	}
	.spearIpt{
		padding: 20upx 0 20upx 0;
	}
	.head {
		width: 100%;
		height: 446upx;
		box-sizing: border-box;
		left: 0;
		background-image: url('../../static/images/login/bg.png');
		background-size: 100% 100%;

		.logo {
			width: 110upx;
			height: 112upx;
			// margin: 44upx 29upx 0 39upx;
		}

		.name {
			width: 174upx;
			height: 82upx;
		}

		.txt {
			font-size: 42upx;
			color: #fff;
			display: block;
			margin-top: 86upx;
			font-weight: 500;
			font-family: PingFang SC;
			margin-left: 39upx;
		}
		.content {
			padding: 0 40upx;
			width: 669upx;
			height: 607upx;
			margin-top: 51upx;
			.form {
				padding: 2upx 46upx 1upx;
				background: #fff;
				border-radius: 14upx;
				position: relative;
				height: 607upx;
		
				.item {
					width: 560upx;
					position: absolute;
		
					.txt {
						font-size: 26upx;
						color: #888888;
					}
		
					.ipt {
						border-bottom: 1upx solid #E6E8ED;
						padding: 20upx 0 20upx 0;
					}
		
					.img {
						width: 36upx;
						height: 36upx;
						position: absolute;
						top: 126upx;
						right: 0;
					}
				}
		
				.btn {
					width: 571upx;
					height: 96upx;
					display: block;
					text-align: center;
					line-height: 96upx;
					background-color: #42A2EC;
					border-radius: 14upx;
					font-size: 34upx;
					color: #fff;
					margin-top: 410upx;
				}
			}
		
			.changeLogin {
				// background-color: rgb(245, 245, 245);
				// padding-bottom: 30upx;
				// margin-left: 206upx;
				// margin-top: 36upx;
				display: flex;
				justify-content: center;
				.txt {
					font-size: 26upx;
					color: #666666;
				}
		
				.change {
					padding-right: 24upx;
					border-right: 1upx solid #fff;
				}
		
				.pawod {
					// padding-left: 24upx;
				}
			}
		}
		
	}
	
	
	.bg {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgb(245, 245, 245);
	}
</style>
