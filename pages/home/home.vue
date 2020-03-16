<template>
	<view class="content">
		<view class="status_bar"></view>
		<view class="header">
			<view class="nav">
				<image class="img" src="../../static/images/home/LOGO%20.png" mode="" @click="toPage2"></image>
				<view class="search">
					<view class="wrap">
						<image class="img" src="../../static/images/home/search.png" mode=""></image>
						<text class="txt">搜一搜</text>
					</view>
				</view>
				<image class="img" src="../../static/images/home/navMy.png " mode="" @click="toPage"></image>
			</view>
		</view>

		<!-- 首页开始 -->
		<view class="home">
			<swiper
				class="swiper"
				:indicator-dots="true"
				indicator-color="#EDEDED"
				indicator-active-color="#42A2EC"
				:autoplay="true"
				:interval="5000"
				:duration="500"
				:circular="true"
			>
				<swiper-item class="swpItm" v-for="(item,i) in banner" :key="i"><image class="img" :src="item.ad_code" @click="sildeCollapse(item.ad_name)"></image></swiper-item>
			</swiper>
			<view class="categoryWrap">
				<view class="presell" v-for="(item,i) in activity" :key="i">
					<view class="title">
						<text class="h1">{{item.goods[0].goods_name}}</text>
						<!-- <view style="color: #F85F5F;font-weight: bold;" v-if="activity.status === 2">团购结束</view>
						<view class="dayWrap" v-else>
							<text class="txt txt1">剩余</text>
							<text class="txt txt2">{{ activity.rest_day }}天</text>
						</view> -->
					</view>
					<view class="time">
						<text class="txt" style="color: #e49c3a;font-size: 24upx;">全网算力第一矿池产币量保证</text>
						<!-- <text class="txt">{{ activity.dig_time }}</text> -->
					</view>
					<view class="content">
						<view class="hashrate">
							<view class="h-title">
								<text class="sign"></text>
								<text class="txt">挖矿币种</text>
							</view>
							<text class="main">{{item.goods[0].coin_title}}</text>
						</view>
						<view class="hashrate">
							<view class="d-title">
								<text class="sign"></text>
								<text class="txt">结算周期</text>
							</view>
							<text class="main">{{item.goods[0].hashrate_cost}}</text>
						</view>
						<view class="hashrate">
							<view class="s-title">
								<text class="sign"></text>
								<text class="txt">合约期限</text>
							</view>
							<text class="main">{{item.goods[0].electricity}}</text>
						</view>
						<view class="hashrate">
							<view class="s-title">
								<text class="sign"></text>
								<text class="txt">技术服务费</text>
							</view>
							<text class="main">{{item.goods[0].income}}</text>
						</view>
						<!-- <text class="txt-bottom">每日净挖矿所得等于每日挖矿产出减去算力费和电费。</text> -->
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 10upx;">
							<view style="display: flex;align-items: center;">
								<view style="color: #959fa9;font-size: 24upx;margin-right: 20upx;">付款方式</view>
								<image src="../../static/USDT.png" style="width: 32upx;height: 32upx;"></image>
							</view>
							<view>
								<button type="primary" class="checkBtnBuy" @click="tabInfo(item.share_activity_id,item.goods[0].goods_id,item.goods[0].electricity_consumption)">
									立即抢购
								</button>
							</view>
						</view>
						
						
					</view>
				</view>
				<view class="problem">
					<text class="h2">你是否遇到以下问题？</text>
					<view class="item">
						<image class="img" src="../../static/images/home/one.png" mode=""></image>
						<text class="txt">想要挖Filecoin，不知从何下手？</text>
					</view>
					<view class="item">
						<image class="img" src="../../static/images/home/two.png" mode=""></image>
						<text class="txt">想买Filecoin矿机，不知道找谁买？怕被骗？</text>
					</view>
					<view class="item">
						<image class="img" src="../../static/images/home/three.png" mode=""></image>
						<text class="txt">有了矿机，家里电价高？不会/没时间维护？</text>
					</view>
					<view class="item">
						<image class="img" src="../../static/images/home/four.png" mode=""></image>
						<text class="txt">找人托管矿机，托管方不专业矿机不稳定？</text>
					</view>
				</view>
				<view class="commitment">
					<view class="title" style="text-align: center;">
						<text class="h2">郑重承诺</text>
						<text class="txt">时空商城本着为Filecoin矿工提供专业一条龙服务的原则</text>
					</view>
					<view class="wrap">
						<view class="content" style="height: 440upx;">
							<image class="img" src="../../static/images/home/new.png" mode=""></image>
							<text class="txt">时空存力商城支持一键租赁存储空间服务</text>
						</view>
						<view class="content" style="border-bottom: 10upx solid rgb(250,197,165);height: 440upx;">
							<image class="img" src="../../static/images/home/maintain.png" mode=""></image>
							<text class="txt">凡时空商城所销售存储空间，提供安全保障和托管服务，3年内除设备更新以外，无需买家二次付费</text>
						</view>
						<view class="content" style="height: 520upx;border-bottom: 10upx solid rgb(175,194,245);">
							<image class="img" src="../../static/images/home/buchan.png" mode=""></image>
							<text class="txt">
								在时空商城租赁存储空间并委托时空商城托管，主网上线1个月内，如挖不出Filecoin，购买时买家所花费的费用，时空商城将全额退款
							</text>
						</view>
						<view class="content" style="height: 520upx;border-bottom: 10upx solid rgb(176,255,248);">
							<image class="img" src="../../static/images/home/dian.png" mode=""></image>
							<text class="txt">
								时空商城承诺，因人为因素导致算力停止运行，则100%赔付用户损失
							</text>
						</view>
					</view>
					<view class="title" style="text-align: center;">
						<text class="h2">来时空商城轻松挖Filecoin</text>
						<text class="txt">简化挖矿繁琐步骤，打包矿机购买、物流、矿场选择、机器维护、矿池接入的复杂环节</text>
					</view>
					<view class="mining">
						<view class="min-top">
							<view>
								<image class="img" src="../../static/images/home/buy.png" mode=""></image>
								<text class="txt">用户购买 套餐</text>
							</view>
							<view>
								<image class="img" src="../../static/images/home/gongxiang.png" mode=""></image>
								<text class="txt" style="width: 160upx;">时空商城分时 共享平台</text>
							</view>
							<view>
								<image class="img" src="../../static/images/home/fenpei.png" mode=""></image>
								<text class="txt">矿池分配 收益</text>
							</view>
							<view>
								<image class="img" src="../../static/images/home/shouyi.png" mode=""></image>
								<text class="txt">用户收到 收益</text>
							</view>
						</view>
					</view>
					<view class="title" style="text-align: center;">
						<text class="h2">值得信赖的Filecoin存力商城</text>
						<text class="txt">时空提供Filecoin存储空间，支持租赁服务</text>
					</view>
					<view class="trust">
						<view class="content">
							<image class="img" src="../../static/images/home/djgh.png" mode=""></image>
							<text class="name">时空顶级供货方</text>
							<text class="txt">时空提供最新款矿机支持矿机质量保证</text>
						</view>
				
						<view class="content">
							<image class="img" src="../../static/images/home/hzkb.png" mode=""></image>
							<text class="name">自有矿池深度开发</text>
							<text class="txt">时空商城自主研发Filecoin矿池，为用户打造最简单便捷Filecoin挖矿服务</text>
						</view>
				
						<view class="content">
							<image class="img" src="../../static/images/home/zjdk.png" mode=""></image>
							<text class="name">支持矿池直接打款</text>
							<text class="txt">可选择矿池直接将受益打给用户,本商城不参与收益的分配与划拨</text>
						</view>
				
						<view class="content">
							<image class="img" src="../../static/images/home/wh24.png" mode=""></image>
							<text class="name">24小时维护的专业团队</text>
							<text class="txt">平台24小时提供专业的挖矿服务保障人员</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 首页结束-->
	</view>
</template>

<script>
	import ipfs from '@/static/ipfs.jpg';
	export default {
		data() {
			return {
				showMore: false,
				share_activity_id: '',
				banner: [], // 轮播组
				activity: [], // IPFS数组
				ipfs: ipfs
			};
		},
		onLoad() {
			this._homePage();
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._homePage();
				uni.stopPullDownRefresh(); //停止下拉刷新动画
				uni.showToast({
					icon: 'none',
					title: '刷新成功'
				});
			}, 1000);
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
						clearTimeout(fres);
						uni.stopPullDownRefresh(); //停止下拉刷新动画
					}
				}
			});
		},
		methods: {
			sildeCollapse(type) {
				if (type == '2') {
					console.log('1111');
				}
			},
			toMore() {
				uni.reLaunch({
					url: '../wholesale/wholesale'
				});
			},
			toPage() {
				uni.reLaunch({
					url: '../user/user'
				});
			},
			toPage2() {
				uni.reLaunch({
					url: '../home/home'
				});
			},
			more() {
				this.showMore = !this.showMore;
			},
			tabInfo(share_activity_id, goods_id,consumption) {
				uni.navigateTo({
					url: '../productInfo/productInfo?share_activity_id=' + share_activity_id + '&goods_id=' + goods_id + '&consumption=' + consumption
				});
			},
			_homePage() {
				uni.getNetworkType({
					success: res => {
						if (res.networkType == 'none') {
							uni.showToast({
								icon: 'none',
								title: '当前网络不可用'
							});
						}
					}
				});
				uni.showLoading({
					title: '加载中'
				});
				this.$ajax
					.post({
						url: this.$service.api_lists.homePage,
						data: {}
					})
					.then(res => {
						if (res.data.code == 1) {
							//初始化信息
							this.banner = res.data.data.ad;
							this.activity = res.data.data.activity; //IPFS
							this.share_activity_id = res.data.data.activity.share_activity_id;
						}
						uni.hideLoading();
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: err,
							duration: 2000
						});
					});
			}
		}
	};
</script>

<style>
	.ipfs{
		height: 6194upx;
		background-size: 100% 100%;
	}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.navSelect {
	border-bottom: 4upx solid #fff;
}

* {
	padding: 0;
	margin: 0;
}
</style>
<style lang="scss" scoped>
.checkBtnBuy{
	background: -webkit-linear-gradient(315deg,#f18729,#fdb552);
	background: linear-gradient(135deg,#f18729,#fdb552);
	color: #fff;
	font-size: .14rem;
	height: 53upx;
	border-radius: .14rem;
	width: 314upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius:28upx;
	font-size: 24upx;
}
.header {
	width: 100%;
	padding-bottom: 32upx;
	padding-top: 32upx;
	background: url(../../static/images/home/headerBg.png);
}

.nav {
	width: 100%;
	display: flex;
	flex-direction: row;

	.img {
		width: 44upx;
		height: 44upx;
		margin: 10upx 28upx 0;
	}

	.search {
		flex: 1;
		height: 64upx;
		background: rgba(245, 245, 245, 1);
		border-radius: 30upx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.wrap {
			display: flex;
			flex-direction: row;

			.img {
				width: 36upx;
				height: 36upx;
				margin: 0 10upx 0 40upx;
			}
		}

		.txt {
			font-size: 28upx;
			color: rgba(175, 173, 173, 1);
		}
	}
}

.nav2 {
	margin-top: 43upx;
	display: flex;
	flex-direction: row;

	.txtWrap {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		.txt {
			font-size: 30upx;
			color: #fff;
			padding-bottom: 18upx;
		}
	}

	.img {
		width: 30upx;
		height: 20upx;
		margin: 10upx 26upx 0 0;
	}

	.img2 {
		width: 30upx;
		height: 20upx;
		margin: 10upx 26upx 0 0;
		transform: rotate(180deg);
	}
}

.popUp {
	width: 100%;
	height: 1035upx;
	background-color: rgba(0, 0, 0, 0.35);

	.content {
		background-color: #fff;
		z-index: 999;
		padding: 16upx 22upx;

		.txt {
			display: inline-block;
			font-size: 26upx;
			width: 158upx;
			height: 64upx;
			border: 1upx solid rgba(181, 181, 181, 1);
			border-radius: 30upx;
			text-align: center;
			line-height: 64upx;
			color: rgba(102, 102, 102, 1);
			margin: 16upx 9upx;
			box-sizing: border-box;
		}
	}
}

//首页开始
.home {
	background: rgb(245, 245, 245);
	padding: 24upx 20upx;

	.swiper {
		width: 710upx;
		height: 280upx;
		margin-bottom: 60upx;
	}

	.swpItm {
		width: 100%;
		border-radius: 16upx;

		.img {
			width: 100%;
			height: 100%;
		}
	}

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

			.h1 {
				color: #24375e;
				font-size: 28upx;
				font-weight: 700;
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
					color: #f85f5f;
				}
			}
		}

		.time {
			.txt {
				font-size: 32upx;
				color: rgba(21, 20, 20, 1);
				margin-right: 40upx;
			}

			margin-bottom: 10upx;
		}

		.content {
			.hashrate {
				width: 50%;
				display: inline-block;

				.h-title:before {
					content: '';
					display: inline-block;
					background-color: #f85f5f;
					width: 6upx;
					height: 28upx;
					margin-top: 2upx;
				}

				.s-title:before {
					content: '';
					display: inline-block;
					background-color: #ce9c16;
					width: 6upx;
					height: 28upx;
					margin-top: 2upx;
				}

				.d-title:before {
					content: '';
					display: inline-block;
					background-color: #1f9654;
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
					font-size: 24upx;

					.txt {
						margin-left: 20upx;
					}

					// margin-bottom: 26upx;
				}

				.main {
					color: #e49c3a;
					    font-size: 24upx;
					    font-weight: 700;
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
					color: #f46868;
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
					color: #f46868;
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

	.problem {
		background-color: #fff;
		border-radius: 16px;
		padding: 57upx 26upx;

		.h2 {
			font-size: 40upx;
			color: rgba(23, 23, 25, 1);
			font-weight: bold;
		}

		.item {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 41upx;

			.img {
				position: absolute;
				width: 66upx;
				height: 66upx;
				z-index: 10;
			}

			.txt {
				font-size: 32upx;
				color: rgba(23, 23, 25, 1);
				margin-left: 46upx;
				z-index: 99;
			}
		}
	}

	.commitment {
		margin-top: 70upx;

		.title {
			.h2 {
				font-size: 40uxp;
				color: rgba(23, 23, 25, 1);
				font-weight: bold;
			}

			.txt {
				display: block;
				font-size: 26upx;
				margin-top: 20upx;
				color: rgba(136, 136, 136, 1);
			}

			margin-bottom: 44upx;
		}

		.wrap {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.content {
				width: 346upx;
				height: 395upx;
				background-color: #fff;
				padding: 47upx 32upx;
				border-radius: 12upx;
				text-align: center;
				border-bottom: 10upx solid rgb(253, 169, 169);
				box-sizing: border-box;
				margin-bottom: 69upx;

				.img {
					width: 128upx;
					height: 128upx;
				}

				.txt {
					font-size: 28upx;
					color: rgba(23, 23, 25, 1);
					display: block;
					margin-top: 30upx;
				}
			}
		}
	}

	.mining {
		padding: 63upx 23upx 50upx 23upx;
		background-color: #fff;
		border-radius: 12upx;
		margin-bottom: 62upx;

		.min-top {
			text-align: center;
			display: flex;
			justify-content: space-between;
			flex-direction: row;

			.img {
				width: 120upx;
				height: 120upx;
			}

			.txt {
				font-size: 26upx;
				color: #666666;
				display: block;
				width: 112upx;
			}
		}

		.min-center {
			margin-top: 40upx;

			.img {
				width: 56upx;
				height: 56upx;
				margin-left: 210upx;
			}
		}

		.min-bottom {
			text-align: center;
			display: flex;
			justify-content: space-between;
			flex-direction: row;

			.img {
				width: 96upx;
				height: 96upx;
			}

			.txt {
				font-size: 26upx;
				color: #666666;
				display: block;
				width: 112upx;
			}
		}
	}

	.trust {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;

		.content {
			background-color: #fff;
			width: 346upx;
			// height: 460upx;
			border-radius: 12upx;
			padding: 48upx 41upx;
			box-sizing: border-box;
			text-align: center;
			margin-bottom: 25upx;
		}

		.img {
			width: 114upx;
			height: 114upx;
		}

		.name {
			display: block;
			font-size: 20upx;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		.txt {
			font-size: 26upx;
			color: rgba(136, 136, 136, 1);
		}
	}
}

//首页结束
</style>
