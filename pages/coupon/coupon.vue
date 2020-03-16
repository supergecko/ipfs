<template>
	<view class="coupon">
		<view>
			<view class="usable">
				<text class="title">可用卡券</text>
				<view class="content" v-for="(item,index) in available" :key='index' v-if="!(available.length===0)">
					<image class="img" src="../../static/images/user/coupon/quanicon.png" mode=""></image>
					<view class="info">
						<text class="txt1">{{item.name}}</text>
						<text class="txt">有效期: {{item.begin_time}}-{{item.end_time}}</text>
						<text class="txt" style="display: inline-block;">使用规则：优惠券仅限在有效期内</text>
					</view>
					<view class="priceWrap">
						<text class="price">￥{{item.money}}</text>
						<text style="font-size:28upx;font-family:PingFang SC;font-weight:400;color:rgba(252,242,242,1);">可用卡卷</text>
					</view>
				</view>
				<view v-if="available.length===0" style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<img src="../../static/zanwu.png" alt style="width: 460upx; height: 460upx;" />
				</view>
			</view>
			<view class="usable" v-if="!(unavailable.length===0)" >
				<text class="title" style="margin-top: 30upx;">已用卡券</text>
				<view class="content2" v-for="(item,index) in unavailable" :key='index' :style="{backgroundImage:`url(${overdue})`}">
					<image class="img" src="../../static/images/user/coupon/quanicon.png" mode=""></image>
					<view class="info">
						<text class="txt1">{{item.name}}</text>
						<text class="txt">有效期: {{item.begin_time}}-{{item.end_time}}</text>
						<text class="txt" style="display: inline-block;">使用规则：优惠券仅限在有效期内</text>
					</view>
				</view>
			</view>
			
			<view class="usable" v-if="!(overtime.length===0)" >
				<text class="title" style="margin-top: 30upx;">过期卡券</text>
				<view class="content3" v-for="(item,index) in overtime" :key='index' :style="{backgroundImage:`url(${overtime2})`}">
					<image class="img" src="../../static/images/user/coupon/quanicon.png" mode=""></image>
					<view class="info">
						<text class="txt1">{{item.name}}</text>
						<text class="txt">有效期: {{item.begin_time}}-{{item.end_time}}</text>
						<text class="txt" style="display: inline-block;">使用规则：优惠券仅限在有效期内</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import overdue from "@/static/images/user/coupon/overdue.png"
	import overtime2 from "@/static/images/user/coupon/overtime.png"
	import { mapState } from 'vuex'
	export default {
		data () {
			return{
				available: [], // 可用礼券数组
				unavailable: [], // 已用礼券
				overtime: [] ,// 过期礼券
				overdue: overdue,
				overtime2: overtime2
			}
		},
		computed: {
		    ...mapState(['hasLogin'])
		}, 
		onLoad(option) {
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/loginPas'
			  });
			  return;
			}
			this._myCoupon()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._myCoupon()
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
			toggleTab(){
				this.$refs.region.show();
			},
			
			_myCoupon() {
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
				uni.showLoading({
					title: '加载中'
				});
				const user_id = uni.getStorageSync('userID')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, timestamp, sign}
				this.$ajax.post({
					url:this.$service.api_lists.myCoupon,
					data:params
				}).then((res)=>{
					if(res.data.code == 1){
						this.available = res.data.data.available
						this.unavailable = res.data.data.used
						this.overtime = res.data.data.overtime
						console.log(res.data.data)
					}
					uni.hideLoading()
				}).catch((err)=>{
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

<style scoped lang='scss'>
	.coupon{
		/* background-color: rgb(245,245,245);
		padding: 35upx 20upx; */
		.title{
			font-size: 40upx;
			font-weight: 500;
			color: #171719;
			display: inline-block;
			margin-bottom: 34upx;
		}
		
		.content{
			width: 100%;
			height: 202upx;
			background: url('../../static/images/user/coupon/bg.png');
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 28upx;
			background-size: cover;
			.img{
				width: 112upx;
				height: 90upx;
				margin-left: 25upx;
				margin-right: 21upx;
			}
			.info{
				.txt1{
					color: #151414;
					font-size: 32upx;
					display: block;
				}
				.txt{
					font-size: 24upx;
					color: #777777;
					display: block;
					margin-top: 24upx;
				}
			}
			.down{
				width: 13upx;
				height: 13upx;
				margin-left: 15upx;
			}
			.priceWrap{
				margin-left: 68upx;
				text-align: center;
				.price{
					font-size: 38upx;
					color: #fff;
					display: block;
				}
				.btn{
					display: block;
					width: 134upx;
					height: 48upx;
					background-color: #fff;
					font-size: 24upx;
					color: #E10909;
					border-radius: 24upx;
					margin-left: 115upx;
					margin-top: 32upx;
					line-height: 48upx;
					text-align: center;
				}
			}
		}
		.content2{
			width: 100%;
			height: 202upx;
			/* background: url('../../static/images/user/coupon/overdue.png'); */
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 28upx;
			background-size: cover;
			.img{
				width: 112upx;
				height: 90upx;
				margin-left: 25upx;
				margin-right: 21upx;
			}
			.info{
				.txt1{
					color: #151414;
					font-size: 32upx;
					display: block;
				}
				.txt{
					font-size: 24upx;
					color: #777777;
					display: block;
					margin-top: 24upx;
				}
			}
			.down{
				width: 13upx;
				height: 13upx;
				margin-left: 15upx;
			}
			.priceWrap{
				margin-left: 68upx;
				text-align: center;
				.price{
					font-size: 38upx;
					color: #fff;
					display: block;
				}
				.btn{
					display: block;
					width: 134upx;
					height: 48upx;
					background-color: #fff;
					font-size: 24upx;
					color: #E10909;
					border-radius: 24upx;
					margin-left: 115upx;
					margin-top: 32upx;
					line-height: 48upx;
					text-align: center;
				}
			}
		}
		.content3{
			width: 100%;
			height: 202upx;
			/* background: url('../../static/images/user/coupon/overtime.png'); */
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 28upx;
			background-size: cover;
			.img{
				width: 112upx;
				height: 90upx;
				margin-left: 25upx;
				margin-right: 21upx;
			}
			.info{
				.txt1{
					color: #151414;
					font-size: 32upx;
					display: block;
				}
				.txt{
					font-size: 24upx;
					color: #777777;
					display: block;
					margin-top: 24upx;
				}
			}
			.down{
				width: 13upx;
				height: 13upx;
				margin-left: 15upx;
			}
			.priceWrap{
				margin-left: 68upx;
				text-align: center;
				.price{
					font-size: 38upx;
					color: #fff;
					display: block;
				}
				.btn{
					display: block;
					width: 134upx;
					height: 48upx;
					background-color: #fff;
					font-size: 24upx;
					color: #E10909;
					border-radius: 24upx;
					margin-left: 115upx;
					margin-top: 32upx;
					line-height: 48upx;
					text-align: center;
				}
			}
		}
		
		.overdue{
			.content{
				background: url('../../static/images/user/coupon/overdue.png');
				background-size: cover;
			}
		}
		.overtime{
			.content{
				background: url('../../static/images/user/coupon/overtime.png');
				background-size: cover;
			}
		}
	}
	
</style>
