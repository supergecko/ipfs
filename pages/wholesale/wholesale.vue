<template>
	<view>
		<view class="status_bar"></view>
		<Head/>
		<view class="wholesale">	
			<view class="category">
				<text class="h1">矿机拼团</text>
				<!-- <view class="more">
					<text class="txt">更多</text>
					<image class="img" src="../../static/images/home/more.png" mode=""></image>
				</view> -->
			</view>
			<view v-for="(item, i) in goodsList" :key="i">
				<view class="presell">
					<view class="title">
						<text class="h1">{{item.title}}</text>
						<view style="color: #F85F5F;font-weight: bold;" v-if="item.status===2">
							团购结束
						</view>
						<view class="dayWrap" v-else>
							<text class="txt txt1">剩余</text>
							<text class="txt txt2">{{item.rest_day}}天</text>
						</view>
					</view>
					<view class="time">
						<text class='txt'>预计开始挖矿时间</text>
						<text class='txt'>{{item.dig_time}}</text>
					</view>
					<view class="content">
						<view class="hashrate">
							<view class="h-title">
								<text class="sign"></text>
								<text class="txt">最低算力</text>
							</view>
							<text class="main">{{item.minimum_hashrate}}TH/S</text>
						</view>
						<view class="hashrate">
							<view class="d-title">
								<text class="sign"></text>
								<text class="txt">电费</text>
							</view>
							<text class="main">{{item.electricity_cost}}元/天</text>
						</view>
						<view class="hashrate" style="width: 100%;margin-top: 53upx;">
							<view class="s-title">
								<text class="sign"></text>
								<text class="txt">来自BTC.com的理论收益</text>
							</view>
							<text class="main">{{item.income}}BTC/月</text>
						</view>
						<text class="txt-bottom">每日净挖矿所得等于每日挖矿产出减去算力费和电费。</text>
					</view>
				</view>
				<view class="millWrap">
					<view class="mill" v-for="(item1, j) in item.goods" :key="j">
						<text class="name">{{item1.description}}</text>
						<view class="hashrateWrap">
							<image class="img" src="../../static/images/home/suanli.png" mode=""></image>
							<text class="txt">算力</text>
							<text class="txt">{{item1.hashrate}} Th/s</text>
						</view>
						<view class="powerwrap">
							<image class="img" src="../../static/images/home/gonghao.png" mode=""></image>
							<text class="txt">功耗</text>
							<text class="txt">{{item1.electricity_consumption}} W</text>
						</view>
						<view class="earnings">
							<text class="txt">月化收益</text>
							<text class="txt">{{item1.income}} BTC</text>
						</view>
						<view class="priceWrap">
							<text class="txt" style="margin-right: 2px;">团购价格</text>
							<text class="price">{{item1.shop_price}}元</text>
						</view>
						<view class="workOff">
							<progress class="pross" :percent="item1.rate" stroke-width="3"/>
							<text class="txt">已售</text>
							<text class="num">{{item1.rate}}%</text>
						</view>
						<button type="primary" class="btn" @click="tabInfo(item.share_activity_id, item1.goods_id)" :disabled="item1.on_sale===1? false: true" :style="{'background' :item1.on_sale===1? '#42a2ec' : '#808080'}">
							{{item1.on_sale===0? '即将补货': item1.on_sale===1?'立即抢购':'抢购结束'}}
						</button>
						<text class="txt-botm">— {{item1.goods_name}} —</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import header from '../../common/header.vue'
	export default {
		components: {
			Head: header
		},
		data() {
			return {
				goodsList: [] // 商品详情列表
			}
		},
		onLoad() {
			this._goodsList()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._goodsList()
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
		},
		methods: {
			tabInfo(share_activity_id, goods_id) {
				uni.navigateTo({
					url: '../productInfo/productInfo?share_activity_id='+share_activity_id+'&goods_id='+goods_id
				});
			},
			_goodsList() {
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
				const page = 1
				let params = {page}
				this.$ajax.post({
					url: this.$service.api_lists.goodsList,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.goodsList = res.data.data
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
		}
	}
</script>
<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
<style scoped lang='scss'>
	.wholesale {
		background: rgb(245, 245, 245);
		padding: 24upx 20upx;

		.category {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 30upx;

			.h1 {
				font-size: 40upx;
				color: rgba(23, 23, 25, 1);
				font-weight: bold;
			}

			.more {
				line-height: 39upx;
				display: flex;
				align-items: center;

				.img {
					width: 18upx;
					height: 30upx;
					margin-left: 16upx;
				}

				.txt {
					font-size: 28upx;
					color: rgba(136, 136, 136, 1);
				}
			}

		}

		.presell {
			background-color: #fff;
			border-radius: 16upx;
			padding: 36upx 30upx;
			margin-bottom: 26upx;

			.title {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-bottom: 22upx;

				.h1 {
					font-size: 36upx;
					font-weight: bold;
					color: rgba(23, 23, 25, 1);
				}

				.dayWrap {
					background: url(../../static/images/home/residueBtn.png);
					background-size: cover;
					width: 238upx;
					height: 52upx;
					box-sizing: border-box;
					.txt {
						display: inline-block;
						width: 50%;
						text-align: center;
						line-height: 52upx;
						position: relative;
						top: -5upx;
					}

					.txt1 {
						font-size: 28upx;
						color: #fff;
					}

					.txt2 {
						font-size: 28upx;
						color: #F85F5F;
					}
				}
			}

			.time {
				.txt {
					font-size: 32upx;
					color: rgba(21, 20, 20, 1);
					margin-right: 40upx;
				}

				margin-bottom: 58upx;
			}

			.content {
				.hashrate {
					width: 50%;
					display: inline-block;

					.h-title:before {
						content: "";
						display: inline-block;
						background-color: #F85F5F;
						width: 6upx;
						height: 28upx;
						margin-top: 2upx;

					}

					.s-title:before {
						content: "";
						display: inline-block;
						background-color: #CE9C16;
						width: 6upx;
						height: 28upx;
						margin-top: 2upx;

					}

					.d-title:before {
						content: "";
						display: inline-block;
						background-color: #1F9654;
						width: 6upx;
						height: 28upx;
						margin-top: 2upx;

					}

					.h-title,
					.d-title,
					.s-title {
						display: flex;
						flex-direction: row;
						align-items: center;
						color: rgba(136, 136, 136, 1);
						font-size: 28upx;

						.txt {
							margin-left: 20upx;
						}

						margin-bottom: 26upx;
					}

					.main {
						font-size: 40upx;
						color: rgba(23, 23, 25, 1);
						font-weight: bold;
					}
				}

				.txt-bottom {
					font-size: 26upx;
					color: rgba(102, 102, 102, 1);
					margin: 45upx 0 50upx 0;
				}
			}
		}

		.millWrap {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			flex-direction: row;

			.mill {
				width: 346upx;
				background-color: #fff;
				border-radius: 14upx;
				padding: 44upx 25upx;
				box-sizing: border-box;
				margin-bottom: 26upx;

				.img {
					width: 34upx;
					height: 34upx;
				}

				.name {
					color: rgba(23, 23, 25, 1);
					font-size: 38upx;
					font-weight: bold;
					display: inline-block;
					margin-bottom: 20upx;
				}

				.hashrateWrap {
					display: flex;
					flex-direction: row;
					align-items: center;

					.txt {
						font-size: 28upx;
						color: rgba(23, 23, 25, 1);
						margin-left: 11upx;
					}

					margin-bottom: 15upx;
				}

				.powerwrap {
					display: flex;
					flex-direction: row;
					align-items: center;

					.txt {
						font-size: 26upx;
						color: rgba(102, 102, 102, 1);
						margin-left: 11upx;
					}

					margin-bottom: 27upx;
				}

				.earnings {
					.txt {
						font-size: 26upx;
						color: rgba(102, 102, 102, 1);
					}
				}

				.priceWrap {
					.txt {
						font-size: 30upx;
						color: #171719;
						font-weight: 500;
						margin-right: 20upx;
					}

					.price {
						font-size: 30upx;
						color: #F46868;
						font-weight: 600;
					}
				}

				.workOff {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 40upx;

					.pross {
						width: 60%;
						display: inline-block;
						margin-right: 16upx;
					}

					.txt {
						font-size: 20upx;
						color: #888888;
						margin-right: 4upx;
					}

					.num {
						font-size: 20upx;
						color: #F46868;
					}
				}

				.btn {
					width: 100%;
					height: 70upx;
					background: rgba(66, 162, 236, 1);
					opacity: 0.92;
					border-radius: 4upx;
					font-size: 28upx;
					line-height: 70upx;
					margin-top: 17upx;
					margin-bottom: 19upx;
				}

				.txt-botm {
					font-size: 22upx;
					color: rgba(136, 136, 136, 1);
					display: inline-block;
					width: 100%;
					text-align: center;
				}
			}
		}

	}
</style>
