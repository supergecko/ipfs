<template>
	<view class="jackpot" style="overflow-x: hidden;">
		<view class="empt">
		</view>
		<view class="ruleWrap">
			<view class="rule">
				<text class="title">奖池规则介绍</text>
				<view class="money">
					<view class="left">
						<view class="item">
							<text class='txt'>{{jackpot_thundercat_coin}}</text>
							<text class='txt2'>万</text>
							<text class='txt2' style="display: block">积分</text>
						</view>
					</view>
					<view class="right">
						<view class="item">
							<text class='txt'>奖池金额</text>
							<text class='txt1'>!</text>
							<text class='txt2'>积分使用规则</text>
						</view>
					</view>
				</view>
			</view>
			<view class="ruleNum">
				<view class="item" style="display: flex;align-items: center;">
					<text class='txt1' style="display: inline-block;">1</text>
					<text class='txt2'>时空存力商城全部成交金额的1%会注入奖池</text>
				</view>
				<view class="item" style="display: flex;align-items: center;">
					<text class='txt1' style="display: inline-block;">2</text>
					<text class='txt2'>时空存力商城合伙人有权参与奖池瓜分</text>
				</view>
				<view class="item" style="display: flex;align-items: center;">
					<text class='txt1' style="display: inline-block;">3</text>
					<text class='txt2'>达成分阶段目标，即可享受阶段目标对应比例的奖池分红</text>
				</view>
				<view class="item" style="display: flex;align-items: center;">
					<view class='txt1' style="display: inline-block;">4</view>
					<view class='txt2'>完成更高阶段目标的合伙人，同样参与低阶段目标奖池分红</view>
				</view>
				<view class="item" style="display: flex;align-items: center;">
					<view class='txt1' style="display: inline-block;">5</view>
					<view class='txt2'>若分阶段目标无人达成，则该阶段对应奖池金额累计至下期活动</view>
				</view>
			</view>
			<text class="btn" @click="toPage('../myPromotion/myPromotion')">
				立刻邀请好友
			</text>
		</view>
		<view class="Crunchies ">
			<view class="title">
				<image class="img" src="../../static/images/jackpot/crown.png" mode=""></image>
				<text class="name">贡献排行榜</text>
			</view>
			<view class="wrap">
				<view class="table">
					<view class="title">
						<text class='txt txt1'>排名</text>
						<text class='txt txt2'>账号</text>
						<text class='txt txt3'>累计贡献值</text>
						<text class='txt txt4'>预计瓜分积分</text>
					</view>
					<view v-for="(item,index) in rankList" :key="index">
						<view class="title" style='background: rgb(2,25,70);'>
							<text class='txt txt1'>{{item.rank}}</text>
							<text class='txt txt2'>{{item.mobile}}</text>
							<text class='txt txt3'>￥{{item.all_results}}</text>
							<text class='txt txt4'>￥{{item.get_thundercat_coin}}</text>
						</view>
					</view>
				</view>
				<!-- <text class="btn">查看更多</text> -->
			</view>
		</view>
		<view class="total">
			<text class="txt">奖池金额：</text>
			<text class="txt2">{{jackpot_thundercat_coin}}万</text>
			<text class="txt">积分</text>
		</view>
		<view class="Crunchies ">
			<view class="title">
				<image class="img" src="../../static/images/jackpot/crown.png" mode=""></image>
				<text class="name">我的贡献明细</text>
			</view>
			<view class="wrap">
				<view class="table">
					<view class="title">
						<!-- <text class='txt txt1'>排名</text> -->
						<text class='txt txt2' style="width: 50%;">账号</text>
						<text class='txt txt3' style="width: 50%;">累计贡献值</text>
						<!-- <text class='txt txt4'>预计瓜分积分</text> -->
					</view>
					<view v-for="(item,index) in all_team_order" :key="index">
						<view class="title" style='background: rgb(2,25,70);'>
							<!-- <text class='txt txt1'>1</text> -->
							<text class='txt txt2' style="width: 50%;">{{item.mobile}}</text>
							<text class='txt txt3' style="width: 50%;">￥{{item.self_result}}</text>
							<!-- <text class='txt txt4'>￥122325455</text> -->
						</view>
					</view>
				</view>
				<!-- <text class="btn">查看更多</text> -->
			</view>
		</view>
		<view style="width: 750upx; height: 50upx;"></view>
		<view class="test"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
		    ...mapState(['hasLogin'])
		}, 
		data(){
			return{
				jackpot_thundercat_coin:0,
				rankList:[] ,// 总排行榜
				all_team_order:[] // 我的团队贡献榜
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			uni.showToast({
				icon:'none',
				title:'刷新成功'
			})
			uni.getNetworkType({
			    success:  (res) => {
			        if(res.networkType == 'none'){
						uni.showToast({
							icon:'none',
							title:'当前网络不可用'
						})
					}
			    }
			})
		},
		onLoad() {
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/loginPas'
			  });
			  return;
			}
			uni.showLoading({
				title: '敬请期待',
			});
			// this._jackpotIndex()
		},
		onShow() {
			uni.showLoading({
				title: '敬请期待',
			});
		},
		methods:{
			toPage(url){
				uni.navigateTo({
					url:url
				})
			},
			// 获取分佣团队
			_jackpotIndex() {
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
				const page = 1
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${page}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, page, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.jackpotIndex,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.jackpot_thundercat_coin = res.data.data.jackpot_thundercat_coin
						this.rankList = res.data.data.rankList
						this.all_team_order = JSON.parse(res.data.data.all_team_order) 
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
		}
	}
</script>
<style scoped lang="scss">
	.test{
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    width: 100%;
	    height: 100%;
	    background: rgba(0,0,0,0.6);
	}
	.jackpot {
		background-color: #000;
		background-image: url('../../static/images/jackpot/bg.jpg');
		background-size: 750upx 669upx;
		background-repeat: no-repeat;

		.empt {
			height: 538upx;
			background-color: rgba(0, 0, 0, 0);
		}

		padding: 0 38upx;

		.ruleWrap {
			padding-bottom: 81upx;
			border: 1px solid #B38E65;
			background-color: rgb(2, 24, 70);

			.rule {
				margin-bottom: 30upx;
				padding: 40upx 35upx;
				box-sizing: border-box;
				margin-left: 35upx;
				width: 601upx;
				border-bottom: 2upx solid #A18260FF;
				background-color: rgb(2, 24, 70);

				.title {
					display: inline-block;
					width: 360upx;
					height: 74upx;
					text-align: center;
					line-height: 74upx;
					border-radius: 37upx;
					font-size: 34upx;
					color: #021846;
					font-weight: bold;
					background: linear-gradient(0deg, rgba(247, 207, 141, 1), rgba(238, 234, 207, 1));
					margin-left: 100upx;
					position: relative;
					top: -74upx;
				}

				.money {
					display: flex;

					flex-direction: row;

					.left {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 50%;

						.item {
							width: 180upx;
							border-radius: 50%;
							background: linear-gradient(0deg, rgba(247, 207, 141, 1), rgba(238, 234, 207, 1));
							text-align: center;
							height: 180upx;

							.txt {
								font-size: 52upx;
								color: #021846;
								font-weight: bold;
								margin-top: 40upx;
								display: inline-block;
							}

							.txt2 {
								font-size: 32upx;
								color: #021846;
							}
						}

					}

					.right {
						width: 50%;

						.item {
							.txt {
								font-size: 36upx;
								display: block;
								color: rgb(243, 218, 167);
								color: rgb(243, 218, 167);
								margin-bottom: 25upx;
								margin-top: 15upx;
							}

							.txt1 {
								color: rgba(2, 24, 70, 1);
								padding: 0 12upx;
								background-color: rgb(243, 218, 167);
								border-radius: 50%;
								font-size: 20upx;
								margin-right: 16upx;
							}

							.txt2 {
								color: rgb(243, 218, 167);
								font-size: 24upx;
							}

						}
					}
				}
			}

			.ruleNum {
				.item {
					margin-bottom: 10upx;

					.txt1 {
						color: rgba(2, 24, 70, 1);
						padding: 0 10upx;
						background-color: rgb(243, 218, 167);
						border-radius: 50%;
						font-size: 20upx;
						margin-right: 16upx;
						margin-left: 15upx;
					}

					.txt2 {
						color: rgb(243, 218, 167);
						font-size: 24upx;
					}

				}
			}

			.btn {
				width: 526upx;
				height: 90upx;
				background: linear-gradient(0deg, rgba(247, 207, 141, 1), rgba(238, 234, 207, 1));
				border-radius: 10upx;
				text-align: center;
				line-height: 90upx;
				font-size: 30upx;
				color: #021846;
				display: block;
				margin: 62upx 0 0 56upx;
			}
		}

		.Crunchies {
			margin-top: 70upx;

			.title {
				text-align: center;

				.img {
					width: 50upx;
					height: 40upx;
					margin-right: 13upx;
				}

				.name {
					color: #f3daa7;
					font-size: 34upx;
				}
			}

			.table {
				margin-top: 27upx;

				.title {
					height: 61upx;
					line-height: 61upx;
					background: rgba(139, 105, 68, 0.43);

					.txt {
						font-size: 24upx;
						color: #f3daa7;
					}

					.txt1 {
						display: inline-block;
						width: 15%;
					}

					.txt2 {
						display: inline-block;
						width: 25%;
					}

					.txt3 {
						display: inline-block;
						width: 30%;
					}

					.txt4 {
						display: inline-block;
						width: 30%;
					}
				}
			}

			.btn {
				width: 526upx;
				height: 90upx;
				background: linear-gradient(0deg, rgba(247, 207, 141, 1), rgba(238, 234, 207, 1));
				border-radius: 10upx;
				font-size: 30upx;
				color: #021846;
				text-align: center;
				line-height: 90upx;
				display: block;
				margin-left: 66upx;
				margin-top: 60upx;
			}
			
		}
	}
	.wrap{
		background-color: rgb(2,25,70);
		padding-bottom: 80upx;
	}
	.total{
		padding: 50upx 0 0 0;
		.txt{
			font-size: 27upx;
			color: #f3daa7;
		}
		.txt2{
			font-size: 42upx;
			color: #f3daa7;
		}
	}
</style>
