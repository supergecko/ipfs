<template>
	<view style="background: rgb(245,245,245);height: 100%;">
		<view style="height: 30upx;"></view>
		<view class="setTingItem" @click="openPopup2">
			<view class="leftText">矿池名称</view>
			<view style="display: flex;align-items: center;">
				<input placeholder="请选择矿池名称" style="text-align: right;" disabled="true" v-show="millflag" />
				<text class="txt" v-show="!millflag">{{millName}}</text>
				<text class="icon">&#xe630;</text>
			</view>
		</view>
		<view class="borderPx"></view>
		<view class="setTingItem">
			<view class="leftText">矿池账号</view>
			<view style="display: flex;align-items: center;">
				<input placeholder="请输入矿池账号" style="text-align:right;min-width:500upx;" v-model="userPhone" v-show="bind_statusFlag"/>
				<text class="txt" v-show="!bind_statusFlag">{{userPhone}}</text>
			</view>
		</view>
		<view class="borderPx"></view>
		<view class="setTingItem">
			<view class="leftText">矿池密码</view>
			<view style="display: flex;align-items: center;">
				<input placeholder="请输入矿池密码" style="text-align:right;min-width:500upx;" v-model="poolPassword"/>
			</view>
		</view>
		<view class="borderPx"></view>
		<view class="setTingItem">
			<view class="leftText">用户名</view>
			<view style="display: flex;align-items: center;">
				<input placeholder="请输入用户名" style="text-align:right;min-width:500upx;" v-model="poolUserName"/>
			</view>
		</view>
		<view style="height:72upx;"></view>
		<view class="loginOut" @click="_bindMine" v-show="!bind_statusFlag">确定</view>
		<view class="loginOut" @click="_modifyMine" v-show="bind_statusFlag">修改</view>
		<uni-popup class="pop" ref="popup2" type="bottom">
			<view class="pop-item" @click='closePopup2(item)' v-for="(item, i) in mine" :key="i">
				{{item.name}}
			</view>
			<view class="line" style="height: 0upx;">
			</view>
			<view class="pop-item cancel" @click="cancel('popup2')">取消</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {mapState} from 'vuex'
	const userName = uni.getStorageSync('userName'); // 用户名
	export default {
		data() {
			return {
				mine: [] ,// 矿池
				millName:'' ,// 矿池名称
				millflag:true, // 矿池flag
				mine_id:0 ,// 矿池ID
				poolUserName: '' ,//用户名
				poolPassword:'' ,// 用户密码
				userPhone:userName ? userName : '', //用户名
				bind_status:0,
				bind_statusFlag: false,
				mine_user_account_id:0
			};
		},
		components: {
			uniPopup
		},
		computed: {
			...mapState(['hasLogin','userName'])
		},
		methods: {
			toPage(URL) {
				uni.navigateTo({
					url: URL
				});
			},
			//矿池
			closePopup2(item) {
				this.$refs.popup2.close()
				this.millName = item.name
				this.mine_id = item.mine_id
				this.millflag = false
			},
			//矿池
			openPopup2() {
				this.$refs.popup2.open()
			},
			// 通用关闭弹框
			cancel(type) {
				this.$refs[type].close()
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
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
						if (res.data.data.bind_status==1&& this.bind_statusFlag===false){
							uni.reLaunch({
								url: '../control/control'
							})
						} else {
							this.mine = res.data.data.mine
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
			//绑定矿池
			_bindMine() {
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
					title: '绑定中'
				})
				const user_id = uni.getStorageSync('userID')
				const username = this.poolUserName //用户名
				const mine_id = this.mine_id
				const account = this.userPhone // 矿池账号
				const password = this.poolPassword
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${account}__${password}__${username}__${mine_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, account, password, timestamp, username, mine_id, sign}
				this.$ajax.post({
					url: this.$service.api_lists.bindMine,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '绑定成功'
						})
						const fres = setTimeout(() => {
							uni.reLaunch({
								url: '../control/control'
							})
						}, 1500)
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
			//修改矿池
			_modifyMine(){
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
					title: '修改中'
				})
				const user_id = uni.getStorageSync('userID')
				const username = this.poolUserName //用户名
				const mine_id = this.mine_id
				const account = this.userPhone // 矿池账号
				const password = this.poolPassword
				const mine_user_account_id = this.mine_user_account_id
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${mine_user_account_id}__${account}__${password}__${username}__${mine_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, mine_user_account_id, account, password, timestamp, username, mine_id, sign}
				this.$ajax.post({
					url: this.$service.api_lists.modifyMine,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						})
						const fres = setTimeout(() => {
							uni.navigateBack({
							    delta: 1
							});
						}, 1500)
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
			this._isBindMine()
			if(option.bind_status) {
				this.mine_user_account_id = option.mine_user_account_id
				this.bind_status = option.bind_status
				this.bind_statusFlag = true
				if(option.bind_status==1){
					uni.setNavigationBarTitle({
					    title: '修改矿池信息'
					})
				}
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1456673_4pxyw8wa6af.ttf') format('truetype');
	}
	.leftText{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(23,23,25,1);
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
		width:670upx;
		height:96upx;
		background:rgba(66,162,236,1);
		opacity:0.92;
		border-radius:12upx;
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(245,245,245,1);
		line-height: 96upx;
		text-align: center;
		margin: 0 auto;
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
	uni-page-body,
	uni-page-wrapper {
		height: 100%;
	}
</style>
