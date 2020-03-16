<template>
	<view class="login change" style="height: 100%;">
		<view class="head">
			<view style="display: flex;justify-content: center;padding-top: 130upx;">
				<image class="logo" src="../../static/images/login/logo.png" mode=""></image>
			</view>
			<!-- <image class="name" src="../../static/images/login/name.png" mode=""></image> -->
			<!-- <text class="txt">注册</text> -->
		</view>
		<view class="content">
			<view class="form">
				<view class="item" style="border-bottom: 1upx solid #E6E8ED;">
					<view class="txt">请选择地区</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						 <select  class="optionSelect" v-model="countryCheck" @change="changeProduct($event)" >
							 <option v-for="(item,index) in countryList" :key="index"  :value='item.id'>{{item.title}}</option>  
						 </select>  
					</view>
				</view>
				<view class="item" style="border-bottom: 1upx solid #E6E8ED;">
					<text class="txt">手机号</text>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<input class="spearIpt" placeholder="请输入手机号" type="text" v-model="registered.mobile" />
						<!-- <image class="img" src="../../static/images/login/delete.png" mode="" v-show="registered.mobile" @click="empty"></image> -->
					</view>
				</view>
				<view class="item" style="border-bottom: 1upx solid #E6E8ED;" v-show="countryCheck===1">
					<text class="txt">验证码</text>
					<input class="spearIpt" placeholder="请输入验证码" type="text" v-model="registered.verificationCode"  style="width: 60%;"/>
					<view>
						<text class="send" @click="_sendCode" :stop="sendCodeFlag === true">{{sendCodeText}}</text>
					</view>
				</view>
				<view class="item">
					<text class="txt">密码</text>
					<input class="ipt" placeholder="请输入密码" type="password" v-model="registered.userPwd" />
				</view>
				<view class="item">
					<text class="txt">确认密码</text>
					<input class="ipt" placeholder="请输入确认密码" type="password" v-model="registered.userPwd2" />
				</view>
				<view class="item">
					<text class="txt">邀请码</text>
					<input class="ipt" placeholder="请输入邀请码" type="text" v-model="registered.userPhone" :disabled="invite_codeFlag" />
				</view>
				<text class="btn" @click="_register">注册</text>
				<view class="changeLogin">
					<text class="txt change" @click="toPage()" style="background: #fff;">账号密码登录</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				registered: {
					mobile: '', // 手机号
					verificationCode: '', // 验证码
					userPwd: '', // 新密码
					userPwd2: '', // 确认密码
					userPhone: '' // 用户的邀请码
				},
				sendCodeFlag: false, // 发送验证码flag
				sendCodeText:'获取验证码',
				invite_codeFlag:false,
				countryList:[{id:1,title:"中国"},{id:2,title:"国际"}],
				countryCheck:1,
			}
		},
		methods: {
			changeProduct(event) {
				console.log(this.countryCheck)
			},
			toPage() {
				uni.navigateTo({
					url: 'loginPas'
				});
			},
			empty() {
				this.registered.mobile = ""
			},
			//发送验证码
			_sendCode() {
				if (this.registered.mobile === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
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
				const mobile = this.registered.mobile
				const timestamp = Date.parse(new Date()) / 1000
				const scene = 1
				const sign = this.$md5(`${mobile}__${scene}__${timestamp}__elseleimaohasjer2860`)
				let params = {mobile, timestamp, scene, sign}
				this.$ajax.post({
					url: this.$service.api_lists.sendCode,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.sendCodeFlag = true
						this.sendCodeText = 60
						this.intervalId = setInterval(() => {
						  this.sendCodeText--
						}, 1000)
						uni.showToast({
							icon: 'none',
							title: '发送成功'
						})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
					    title: err,
					    duration: 2000
					});
				})
			},
			//注册
			_register() {
				if (this.registered.mobile === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
					return;
				}
				if (this.registered.verificationCode === ''&& this.countryCheck===1) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (this.registered.userPwd === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
					});
					return;
				}
				if (this.registered.userPwd2 === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入确认密码'
					});
					return;
				}
				if (!(this.registered.userPwd2 === this.registered.userPwd)) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不相同'
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
				const { mobile, userPwd, userPwd2, verificationCode, userPhone } = this.registered
				const password = userPwd
				const password2 = userPwd2
				const code = verificationCode
				const invite_code = userPhone
				const scene = 1
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}__${scene}__${password}__${password2}__${code}__${timestamp}__elseleimaohasjer2860`)
				let params = {mobile, scene, password, password2, code, timestamp, invite_code, sign}
				this.$ajax.post({
					url: this.$service.api_lists.register,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: '注册成功'
						})
						const fres = setTimeout(() => {
							uni.reLaunch({
								url: '../login/loginPas'
							})
						}, 1500)
					}
					uni.hideLoading()
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
			if(option.invite_code){
				this.registered.userPhone = option.invite_code
				this.invite_codeFlag = true
			}
		},
		watch: {
		  sendCodeText (newName, oldName) {
		    if (newName === 0) {
		      clearInterval(this.intervalId)
		      this.sendCodeText = '获取验证码'
		      this.sendCodeFlag = false
		    }
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
	.optionSelect{
		width: 100%;
		border: 0;
		padding: 10px 0 10px 0;
		color: grey;
	}
	.head {
		width: 100%;
		height: 534upx;
		padding: 0 39upx;
		box-sizing: border-box;
		position: absolute;
		top: -88upx;
		left: 0;
		background-image: url('../../static/images/login/bg.png');

		.logo {
			width: 110upx;
			height: 112upx;
			// margin: 132upx 29upx 0 0;
		}

		.name {
			width: 174upx;
			height: 82upx;
		}

		.txt {
			font-size: 42upx;
			color: #fff;
			display: block;
			margin-top: 40upx;
			font-weight: 500;
			font-family: PingFang SC;
		}
	}

	.content {
		padding: 0 40upx;
		padding-top: 180upx;

		.form {
			padding: 20upx 46upx 1upx;
			background: #fff;
			border-radius: 14upx;
			position: relative;
			// height: 870upx;
			margin-bottom: 20upx;
			.item {
				width: 560upx;

				.txt {
					font-size: 26upx;
					color: #888888;
				}

				.ipt {
					border-bottom: 1upx solid #E6E8ED;
					padding: 20upx 0 20upx 0;
				}
				.spearIpt{
					padding: 20upx 0 20upx 0;
				}

				.img {
					width: 36upx;
					height: 36upx;
					// position: absolute;
					// top: 118upx;
					// right: 70upx;
				}

				.send {
					padding: 13upx 29upx;
					font-size: 26upx;
					color: #42A2EC;
					border: 1px solid #42A2EC;
					border-radius: 24upx;
					position: absolute;
					top: 180upx;
					right: 64upx;
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
				margin-top: 20upx;
			}
		}

		.changeLogin {
			// width: 334px;
			text-align: center;
			/* background-color: whitesmoke; */
			padding-bottom: 30upx;
			margin-top: 20upx;

			.txt {
				font-size: 26upx;
				color: #666666;
			}

			.change {
				padding-right: 24upx;
				// border-right: 1upx solid #fff;
			}

			.pawod {
				padding-left: 24upx;
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
