<template>
	<view>
		<view class="status_bar"></view>
		<view class="userInfoHeader">
			<view class="userInfoTitle">
				<image src="../../static/images/user/userH.png" style="width:202upx;height: 202upx;"></image>
				<view class="userInfoText">{{userPhone}}</view>
			</view>
		</view>
		
		<view>
			<view style="display: flex;align-items: center;margin-top: 115upx;">
				<navigator class="userInfoMiddleItem"  url="../Account/Account">
					<image src="../../static/images/user/accountCenter.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">账户中心</view>
				</navigator>
				<navigator class="userInfoMiddleItem"  url="../control/control">
					<image src="../../static/images/user/control.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">控制面板</view>
				</navigator>
				<navigator class="userInfoMiddleItem"  url="../myOrder/myOrder" open-type="reLaunch">
					<image src="../../static/images/user/order.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">我的订单</view>
				</navigator>
			</view>
			<view style="display: flex;align-items: center;margin-top: 100upx;">
				<navigator class="userInfoMiddleItem"  url="../myPromotion/myPromotion">
					<image src="../../static/images/user/extension.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">我的推广</view>
				</navigator>
				<navigator class="userInfoMiddleItem"  url="../generalize/generalize">
					<image src="../../static/images/user/recharge.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">我的团队</view>
				</navigator>
				<navigator class="userInfoMiddleItem"  url="../setting/setting">
					<image src="../../static/images/user/setting.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">设置中心</view>
				</navigator>
				<!-- <navigator class="userInfoMiddleItem" url="../coupon/coupon">
					<image src="../../static/images/user/coupon.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">我的礼券</view>
				</navigator> -->
			</view>
			<view style="display: flex;margin-top: 100upx;">
				
				<!-- <navigator class="userInfoMiddleItem"  url="../mill/mill">
					<image src="../../static/images/user/mill.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">时空存力矿场</view>
				</navigator>
				<navigator class="userInfoMiddleItem"  url="../about/about">
					<image src="../../static/images/user/about.png" style="width:80upx;height: 80upx;"></image>
					<view class="userInfoMiddleItemText">关于我们</view>
				</navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	const userName = uni.getStorageSync('userName'); // 用户名
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName'])
		},
		data() {
			return {
				userPhone:userName ? userName : '未登录', //用户名
			}
		},
		methods: {
			...mapMutations(['logout']),
			noOpen() {
				uni.showToast({
				    title: '暂未开放,敬请期待',
					icon:'none',
				    duration: 2000
				});
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		},
		onShow(){
			this.userPhone = uni.getStorageSync('userName'); // 用户名
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this.userPhone = uni.getStorageSync('userName'); // 用户名
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
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.userInfoHeader {
		background-image: url('../../static/images/user/userBg.png');
		background-size: cover;
		height: 484upx;
		width: 750upx;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.userInfoTitle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 80px;
	}
	.userInfoText{
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(249,251,253,1);
	}
	.userInfoMiddleItem{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: auto
	}
	.userInfoMiddleItemText{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
</style>
