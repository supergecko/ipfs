<template>
	<view class="orderD">
		<view class="head">
			<view class="status">
				<text class="txt">{{order.order_status}}</text>
				<text class="border"></text>
			</view>
			<view class="imgWrap">
				<image class="img" src="../../static/images/user/orderDetailsBuy.png" mode=""></image>
			</view>
		</view>
		<view class="main">
			<view class="info">
				<view class="item">
					<text class="txt" style="margin-bottom: 46upx;">下单号</text>
					<text class="txt2">{{order.order_sn}}</text>
				</view>
				<view class="item">
					<text class="txt">下单时间</text>
					<text class="txt2">{{order.add_time}}</text>
				</view>
			</view>
			<view class="address">
				<text class="title" v-show="order.wallet_address">矿池/钱包地址</text>
				<text class="title" v-show="order.user_address">矿池/收货地址</text>
				<view class="item">
					<text class="txt">矿池</text>
					<text class="txt2">{{order.mine_name}}</text>
				</view>
				<view class="item">
					<text class="txt" style="min-width:140upx;" v-show="order.wallet_address">钱包地址</text>
					<text class="txt" style="min-width:140upx;" v-show="order.user_address">收货地址</text>
					<text class="txt2" style="max-width:580upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" v-show="order.wallet_address">{{order.wallet_address}}</text>
					<text class="txt2" style="max-width:580upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" v-show="order.user_address">{{order.user_address}}</text>
				</view>
			</view>
			<view class="productInfo">
				<text class="title">产品信息</text>
				<view style="margin-top: 25upx;">
					<view class="p-info" style="background: #F6F8F9;border-top: 1upx solid #E6E8ED;">
						<text class="txt">型号</text>
						<text class="txt2">{{order.goods_name}}</text>
					</view>
					<view class="p-info">
						<text class="txt">币种</text>
						<text class="txt2">{{order.title}}</text>
					</view>
					<view class="p-info">
						<text class="txt">数量</text>
						<text class="txt2">{{order.goods_num}}台</text>
					</view>
					<view class="p-info">
						<text class="txt">算力</text>
						<text class="txt2">{{order.hashrate}}TH/s</text>
					</view>
					<view class="p-info">
						<text class="txt">品牌</text>
						<text class="txt2">{{order.cycle_day}}</text>
					</view>
					<view class="p-info">
						<text class="txt">价格</text>
						<text class="txt2">{{order.shop_price}}(元)</text>
					</view>
				</view>
			</view>
			<view class="payInfo" style="margin-bottom: 28upx;" v->
				<text class="title">优惠信息</text>
				<view class="item" v-for="(item, i) in discount" :key="i">
					<text class="txt">{{item.name}}</text>
					<text class="txt2">{{item.amount}}(元)</text>
				</view>
			</view>
			<view class="payInfo">
				<text class="title">支付信息</text>
				<view class="item">
					<text class="txt">订单金额</text>
					<text class="txt2">{{pay.actual_price}}(元)</text>
				</view>
				<view class="item">
					<text class="txt">挖矿币种</text>
					<text class="txt2">{{pay.title}}</text>
				</view>
				<view class="item">
					<text class="txt">支付方式</text>
					<text class="txt2">{{pay.pay_name}}</text>
				</view>
				<view class="item">
					<text class="txt">支付状态</text>
					<text class="txt2">{{pay.pay_status===0?'未支付':'已支付'}}</text>
				</view>
			</view>
			<view class="payInfo" v-if="!(delivery===null)">
				<text class="title">物流信息</text>
				<view class="item">
					<text class="txt">物流公司</text>
					<text class="txt2">{{delivery.shipping_name}}</text>
				</view>
				<view class="item">
					<text class="txt">物流单号</text>
					<text class="txt2">{{delivery.invoice_no}}</text>
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
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				order_id: 0,
				order: {}, // 订单详细信息
				pay: {},
				ele: {},
				delivery: {},
				active: true,
				discount: []
			}
		},
		methods: {
			// 拉取订单状态信息
			_orderDetail() {
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
				const order_id = this.order_id
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${order_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					user_id,
					order_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.orderDetail,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						let data = res.data.data
						this.ele = data.ele
						this.order = data.order
						this.pay = data.pay
						this.discount = data.discount
						this.delivery = data.delivery
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
			}
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this.order_id = option.order_id
			this._orderDetail()
		},
	}
</script>

<style scoped lang="scss">
	.orderD {

		.head {
			width: 100%;
			height: 348upx;
			position: absolute;
			top: -88upx;
			display: flex;
			flex-direction: row;
			background-image: url('../../static/images/user/orderDetailsBg.png');

			.status {
				width: 50%;
				text-align: center;
				position: absolute;
				bottom: 97upx;

				.txt {
					font-size: 34upx;
					color: #fff;
				}

				.border {
					display: block;
					width: 36px;
					height: 6px;
					margin-left: 148upx;
					margin-top: 33upx;
					background: rgba(255, 255, 255, 1);
				}
			}

			.imgWrap {
				width: 50%;
				text-align: center;
				position: absolute;
				bottom: 61upx;
				right: 0upx;

				.img {
					width: 164upx;
					height: 124upx;
				}
			}
		}

		.main {
			background-color: rgb(245, 245, 245);
			padding: 284upx 15upx 24upx;

			.info {
				background-color: #fff;
				border-radius: 14upx;
				margin-bottom: 28upx;
				padding: 47upx 29upx;

				.item {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.txt {
						font-size: 32upx;
						color: rgba(119, 119, 119, 1);
					}

					.txt2 {
						font-size: 32upx;
						color: rgba(23, 23, 25, 1);
					}
				}
			}

			.address {
				background-color: #fff;
				padding: 38upx 30upx;
				border-radius: 14upx;
				margin-bottom: 28upx;

				.title {
					font-size: 34upx;
					font-weight: 500;
					color: #171719;
					padding-bottom: 26upx;
					display: block;
					border-bottom: 1px solid rgb(245, 245, 245);
				}

				.item {
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					margin-top: 43upx;

					.txt {
						font-size: 32upx;
						color: rgba(119, 119, 119, 1);
					}

					.txt2 {
						font-size: 32upx;
						color: rgba(23, 23, 25, 1);
					}
				}
			}

			.productInfo {
				background-color: #fff;
				border-radius: 14upx;
				padding: 37upx 29upx;
				margin-bottom: 28upx;

				.title {
					font-size: 34upx;
					margin-bottom: 25upx;
				}

				.p-info {
					// height: 106upx;
					display: flex;
					flex-direction: row;
					border-bottom: 1px solid #E6E8ED;
					align-items: center;
					border-left: 1upx solid #E6E8ED;
					text {
						display: block;
						width: 50%;
						text-align: center;
						font-size: 30upx;
					}

					.txt {
						color: rgba(119, 119, 119, 1);
					}

					.txt2 {
						color: #171719;
						padding: 19upx 0;
						border-left: 1upx solid #E6E8ED;
						border-right: 1upx solid #E6E8ED;
					}

					.txt3 {
						color: #171719;
					}
				}
			}

			.payInfo {
				background-color: #fff;
				border-radius: 14upx;
				padding: 37upx 29upx;

				.title {
					font-size: 34upx;
					font-weight: 500;
					color: #171719;
					padding-bottom: 26upx;
					display: block;
					border-bottom: 1px solid rgb(245, 245, 245);
				}

				.item {
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					margin-top: 43upx;

					.txt {
						font-size: 32upx;
						color: rgba(119, 119, 119, 1);
					}

					.txt2 {
						font-size: 32upx;
						color: rgba(23, 23, 25, 1);
					}
				}
			}
		}
	}
</style>
