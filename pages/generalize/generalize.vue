<template>
	<view style="background: rgb(245,245,245);height: 100%;">
		<view class="controlBg"></view>
		<view class="controlHeader">
			<view class="controlHeaderTX1">累计获得</view>
			<view class="controlHeaderFirst">
				<span style="width:362upx;display: inline-block;text-align: center;">{{myTeam.filecoin}}Filecoin</span>
				<span style="width:362upx;display: inline-block;text-align: center;">{{myTeam.integral}}USDT</span>
			</view>
			<view class="controlHeaderSecond">
				<span style="width:362upx;display: inline-block;text-align: center;">{{hashrate_balance.hashrate}}<span class="controlHeaderSecondText"></span> </span>
				<span style="width:362upx;display: inline-block;text-align: center;">{{hashrate_balance.balance}}<span class="controlHeaderSecondText"></span> </span>
			</view>
			<view class="infoText">当前身份:{{myTeam.identity}}</view>
		</view>

		<view class="controlMiddle" style="min-height: 700upx;">
			<view class="setTingItem">
				<view>我的团队人数</view>
				<view>
					<text style="color:rgba(175,173,173,1);">{{myTeam.teamNumber}}人</text>
				</view>
			</view>
			<view class="borderPx"></view>
			<view class="setTingItem">
				<view>我的团队业绩</view>
				<view>
					<text style="color:rgba(175,173,173,1);">{{myTeam.teamSale==null? 0 : myTeam.teamSale}}存力</text>
				</view>
			</view>
			<view class="borderPx"></view>
			<view class="setTingItem">
				<view>昨日销售业绩</view>
				<view>
					<text style="color:rgba(175,173,173,1);">{{myTeam.yesterday==null? 0.0000 : myTeam.yesterday}}USDT</text>
				</view>
			</view>
			<view class="borderPx"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		onNavigationBarButtonTap(e) {
			if(e.text=='订单状态'){
				uni.navigateTo({
					url: '../orderStatus/orderStatus',
				})
			} else {
				uni.reLaunch({
					url: '../user/user',
				})
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				num: 0, // 套餐数量
				hashrate_balance: {}, // 总算力和总产出数组
				day_balance: [] ,// 每日产出
				myTeam:{}
			}
		},
		methods: {
			toBuy () {
				uni.reLaunch({
					url: '../home/home'
				});
			},
			// 拉取订单状态信息
			_controlPanel() {
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
					url: this.$service.api_lists.myTeam,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.myTeam = res.data.data
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
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this._controlPanel()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._controlPanel()
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
	uni-page-body{
		height: 100%;
	}
	.borderPx {
		height: 2upx;
		width: 94%;
		background: rgb(245, 245, 245);
		margin: 0 auto;
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
	.infoText{
		width: 100%;
		height: 80upx;
		background: rgb(76,168,238);
		font-size: 30upx;
		text-align: center;
		line-height: 80upx;
		color: #fff;
		margin-top: 20upx;
		border-radius: 0px 0px 12upx 12upx;
	}
	.controlBg {
		background-image: url('../../static/images/user/controlBg.png');
		width: 750upx;
		height: 350upx;
		background-size: 100% 100%;
	}

	.controlHeader {
		width: 720upx;
		height: 300upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 14upx;
		margin: 0 auto;
		margin-top: -300upx;
	}

	.controlHeaderTX1 {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(23, 23, 25, 1);
		padding-left: 30upx;
		padding-top: 38upx;
	}

	.controlHeaderFirst {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(119, 119, 119, 1);
		padding-top: 30upx;
		display: flex;
	}

	.controlHeaderSecond {
		font-size: 44upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(23, 23, 25, 1);
		padding-top: 10upx;
		display: flex;
	}

	.controlHeaderSecondText {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(23, 23, 25, 1);
	}

	.controlHeaderThird {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(136, 136, 136, 1);
		padding-top: 20upx;
		padding-left: 28upx;
	}

	.controlBgBtn {
		width: 146upx;
		height: 54upx;
		border: 1upx solid rgba(66, 162, 236, 1);
		opacity: 0.92;
		border-radius: 4upx;
		display: inline-block;
		margin-right: 214upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(66, 162, 236, 1);
		text-align: center;
		line-height: 54upx;
	}

	.controlMiddle {
		width: 720upx;
		min-height: 441upx;
		margin: 0 auto;
		margin-top: 29upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 14upx;
	}

	.controlMiddleWarp {
		padding-left: 29upx;
		padding-right: 31upx;
		padding-top: 37upx;
	}

	.ItemTitleLeft {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(23, 23, 25, 1);
	}

	.ItemTitleRight {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
	}

	.MiddleItemHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 26upx;
		border-bottom: 1upx solid rgba(230, 232, 237, 1);
	}

	.MiddleItemContent {
		padding-top: 44upx;
	}

	.middleItemContentItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 48upx;
	}

	.contentLeft {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(23, 23, 25, 1);
	}

	.contentRight {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
	}
</style>
