<template>
	<view class="reset">
		<input class="ipt" type="text" placeholder="请输入手机号" v-model="userPhone" disabled="true"/>
		<view class="yzm">
			<input class="spearIpt" type="text" placeholder="请输入验证码" v-model="userCode"/>
			<text class="txt" @click="_sendCode" :disabled="sendCodeFlag === true">{{sendCodeText}}</text>
		</view>
		<view class="newPass">
			<input class="spearIpt" :password='showPas' type="text" placeholder="请输入新密码（至少8位，首字母+数字）" v-model="newPassWord" />
			<view>
				<image class="img" src="../../static/images/login/show.png" v-show="showPas" @click="changePas"></image>
				<image class="img" src="../../static/images/login/conceal.png" v-show="!showPas" @click="changePas"></image>
			</view>
		</view>
		<view class="affirm">
			<input class="ipt" :password='showPas' type="text" placeholder="请确认新密码" v-model="againtPassWord" />
		</view>
		<text class="btn" @click="_Modifypassword">重置密码</text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showPas: true,
				userPhone:'',
				userCode:'',
				newPassWord:'',
				againtPassWord:'',
				sendCodeText:'获取验证码',
				intervalId: 0, // 定时器
				sendCodeFlag: false, // 发送验证码flag
			}
		},
		onLoad(option){
			if(option.userName){
				this.userPhone = option.userName
			}
		},
		methods: {
			changePas(){
				this.showPas =!this.showPas
			},
			//发送重置验证码
			_sendCode() {
				if (this.userPhone === '') {
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
				const mobile = this.userPhone
				const timestamp = Date.parse(new Date()) / 1000
				const scene = 3
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
			
			//重置密码
			_Modifypassword() {
				if (this.userPhone === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
					return;
				}
				if (this.userCode === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (this.newPassWord === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
					});
					return;
				}
				if (this.againtPassWord === '') {
					uni.showToast({
						icon: 'none',
						title: '请再次输入新密码'
					});
					return;
				}
				if (!(this.againtPassWord === this.newPassWord)) {
					uni.showToast({
						icon: 'none',
						title: '请检查两次密码是否相同'
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
				const new_password = this.newPassWord
				const code = this.userCode
				const scene = 2
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${new_password}__${code}__${scene}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, new_password, code, scene, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Modifypassword,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: '重置密码成功'
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
			},
					
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

<style scoped lang="scss">
	.spearIpt{
		padding: 36upx ;
		font-size: 28upx;
		width: 70%;
	}
	.reset{
		padding: 46upx 39upx;
		.ipt{
			padding: 36upx ;
			border-bottom: 1upx solid rgb(245,245,245);
			font-size: 28upx;
		}
		.yzm{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid rgb(245,245,245);
			.txt{
				font-size: 30upx;
				color: #333333;
				min-width:160upx;
				text-align: center;
			}
		}
		.newPass{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid rgb(245,245,245);
			.img{
				width: 42upx;
				height: 30upx;
			}
		}
		.btn{
			background-color: #42A2EC;
			width: 670upx;
			height: 96upx;
			text-align: center;
			line-height: 96upx;
			font-size: 34upx;
			color: #FFFFFF;
			border-radius: 6upx;
			display: block;
			margin-top: 84upx;
		}
		.to{
			display: inline-block;
			font-size: 28upx;
			color: #666666;
			margin-top: 34upx;
		}
	}
</style>
