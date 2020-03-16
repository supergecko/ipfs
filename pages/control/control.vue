<template>
	<view style="background: rgb(245,245,245);">
		<view class="controlBg"></view>
		<view class="controlHeader">
			<view class="controlHeaderTX1">Filecoin挖矿</view>
			<view class="controlHeaderFirst">
				<span style="margin-right: 281upx;">总算力</span>
				<span>
					总产出
					<!-- <image src="../../static/images/user/controlHint.png" style="width: 36upx;height: 36upx;vertical-align: middle;"></image> -->
				</span>
			</view>
			<view class="controlHeaderSecond">
				<span style="width:362upx;display: inline-block;"><span class="controlHeaderSecondText">{{num}}TH/S</span> </span>
				<span><span class="controlHeaderSecondText">{{hashrate_balance}}FIL</span> </span>
			</view>
			<view class="controlHeaderThird" @click="toBuy">
					<view class="controlBgBtn">购买更多</view>
				<!-- <span>≈$ 0.00</span> -->
			</view>
		</view>

		<view class="controlMiddle" style="min-height: 824upx;">
			<view class="controlMiddleWarp">
				<view class="MiddleItemHeader">
					<span class="ItemTitleLeft">
						每日产出
						<!-- <image src="../../static/images/user/controlHint.png" style="width: 36upx;height: 36upx;vertical-align: middle;margin-left: 14upx;"></image> -->
					</span>
					<!-- <span class="ItemTitleRight">矿池分配：鱼池</span> -->
				</view>

				<view class="MiddleItemContent" v-for="(item,index) in day_balance" :key='index'>
					<view class="middleItemContentItem">
						<span class="contentLeft">{{item.filecoin}} FIL</span>
						<span class="contentRight">{{item.create_time}}</span>
					</view>
				</view>
			</view>
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
				num: 0, // 总算力
				hashrate_balance: 0, // 总产出
				day_balance: [] // 每日产出
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
					url: this.$service.api_lists.controlPanel,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.num = res.data.data.all_num
						this.hashrate_balance = res.data.data.all_output
						this.day_balance = res.data.data.log
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
	.controlBg {
		background-image: url('../../static/images/user/controlBg.png');
		width: 750upx;
		height: 350upx;
		background-size: 100% 100%;
	}

	.controlHeader {
		width: 720upx;
		height: 344upx;
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
		padding-left: 28upx;
	}

	.controlHeaderSecond {
		font-size: 44upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(23, 23, 25, 1);
		padding-top: 10upx;
		padding-left: 28upx;
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
