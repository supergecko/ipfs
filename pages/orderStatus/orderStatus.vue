<template>
	<view class="orderStatus">
		<view class="box">
			<QSTabs :current="current_2" :tabs="tabs_2" width="187" activeColor="#42A2EC" @change="change($event, '1')" />
		</view>
		<!-- 全部状态 -->
		<view class="content" v-if="current_2===0">
			<view class="order" v-for="(item,index) in all_order" :key='index'>
				<view class="wrap">
					<text class="txt">订单号</text>
					<text class="txt2">{{item.order_sn}}</text>
				</view>
				<view class="wrap">
					<text class="txt">算力</text>
					<text class="txt2">{{item.hashrate}}TH/s</text>
				</view>
				<view class="wrap">
					<text class="txt">套餐周期</text>
					<text class="txt2">永久</text>
				</view>
				<view class="wrap">
					<text class="txt">剩余电费天数</text>
					<text class="txt2">{{item.rest_day}}天</text>
				</view>
				<view class="wrap">
					<text class="txt">当前矿池</text>
					<text class="txt2">{{item.mine_name}}</text>
				</view>
				<view class="wrap">
					<text class="txt">收益地址</text>
					<view class="txt2"  style="max-width:500upx;word-break:break-all;">{{item.address}}</view>
				</view>
			</view>
		</view>
		<!-- 待运行 -->
		<view class="content" v-if="current_2===1">
			<view class="order" v-for="(item,index) in init_order" :key='index'>
				<view class="wrap">
					<text class="txt">订单号</text>
					<text class="txt2">{{item.order_sn}}</text>
				</view>
				<view class="wrap">
					<text class="txt">算力</text>
					<text class="txt2">{{item.hashrate}}TH/s</text>
				</view>
				<view class="wrap">
					<text class="txt">套餐周期</text>
					<text class="txt2">永久</text>
				</view>
				<view class="wrap">
					<text class="txt">剩余电费天数</text>
					<text class="txt2">{{item.rest_day}}天</text>
				</view>
				<view class="wrap">
					<text class="txt">当前矿池</text>
					<text class="txt2">{{item.mine_name}}</text>
				</view>
				<view class="wrap">
					<text class="txt">收益地址</text>
					<view class="txt2"  style="max-width:500upx;word-break:break-all;">{{item.address}}</view>
				</view>
			</view>
		</view>
		<!-- 运行中 -->
		<view class="content" v-if="current_2===2">
			<view class="order" v-for="(item,index) in doing_order" :key='index'>
				<view class="wrap">
					<text class="txt">订单号</text>
					<text class="txt2">{{item.order_sn}}</text>
				</view>
				<view class="wrap">
					<text class="txt">算力</text>
					<text class="txt2">{{item.hashrate}}TH/s</text>
				</view>
				<view class="wrap">
					<text class="txt">套餐周期</text>
					<text class="txt2">永久</text>
				</view>
				<view class="wrap">
					<text class="txt">剩余电费天数</text>
					<text class="txt2">{{item.rest_day}}天</text>
				</view>
				<view class="wrap">
					<text class="txt">当前矿池</text>
					<text class="txt2">{{item.mine_name}}</text>
				</view>
				<view class="wrap">
					<text class="txt">收益地址</text>
					<view class="txt2"  style="max-width:500upx;word-break:break-all;">{{item.address}}</view>
				</view>
			</view>
		</view>
		<!-- 已结束 -->
		<view class="content" v-if="current_2===3">
			<view class="order" v-for="(item,index) in end_order" :key='index'>
				<view class="wrap">
					<text class="txt">订单号</text>
					<text class="txt2">{{item.order_sn}}</text>
				</view>
				<view class="wrap">
					<text class="txt">算力</text>
					<text class="txt2">{{item.hashrate}}TH/s</text>
				</view>
				<view class="wrap">
					<text class="txt">套餐周期</text>
					<text class="txt2">永久</text>
				</view>
				<view class="wrap">
					<text class="txt">剩余电费天数</text>
					<text class="txt2">{{item.rest_day}}天</text>
				</view>
				<view class="wrap">
					<text class="txt">当前矿池</text>
					<text class="txt2">{{item.mine_name}}</text>
				</view>
				<view class="wrap">
					<text class="txt">收益地址</text>
					<view class="txt2"  style="max-width:500upx;word-break:break-all;">{{item.address}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue'
	import { mapState } from 'vuex'
	export default {
		components: {
			QSTabs
		},
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				tabs_2: ['全部状态', '待运行', '运行中', '已结束'],
				current_2: 0,
				all_order: [], // 全部状态
				init_order: [], // 待运行
				doing_order: [], // 运行中
				end_order: [] // 已结束
			}
		},
		methods: {
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
				const coin_id = 1
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${coin_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, coin_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.controlPanel,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.all_order = res.data.data.all_order
						this.init_order = res.data.data.init_order
						this.doing_order = res.data.data.doing_order
						this.end_order = res.data.data.end_order
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
			
			//tab 切换
			change(index, i) {
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

<style scoped lang="scss">
	.nav {
		display: flex;
		flex-direction: row;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 44upx;

		.txt {
			width: 22%;
			font-size: 30upx;
			color: #777777;
			padding: 30upx 0;
			text-align: center;

			.active {
				padding-bottom: 24upx;
				border-bottom: 6upx solid #42A2EC;
			}
		}
	}

	.content {
		background-color: rgb(245, 245, 245);
		padding: 24upx 15upx;

		.order {
			background-color: #fff;
			border-radius: 14upx;
			margin-bottom: 24upx;
			padding: 50upx 29upx 1upx;

			.wrap {
				display: flex;
				flex-direction: row;
				margin-bottom: 47upx;

				.txt {
					font-size: 32upx;
					color: #777777;
					display: inline-block;
					width: 350upx;
				}

				.txt2 {
					font-size: 32upx;
					font-weight: #171719;
				}
			}
		}
	}
</style>
