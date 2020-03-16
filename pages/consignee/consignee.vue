<template>
	<view class="consignee">
		<view class="" style="min-height:820upx">
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in underLine_address" :key='index' style="display: flex;">
						<view style="display: inline-block;">
							<radio :value="item.address_id" :checked="index === underLine_index" />
						</view>
						<view class="wrap">
							<view class="consigneeWrap">
								<text class="txt1">{{item.consignee}}</text>
								<text class="txt1">{{item.mobile}}</text>
								<text class="txt2">{{item.province+item.city+item.district+item.address}}</text>
							</view>
							<view class="editBTN">
								<text style="font-size: 40upx;" class="icon" @click="editAddress(item.consignee,item.mobile,item.province,item.city,item.district,item.address,item.zipcode,item.address_id)">&#xe611;</text>
							</view>
						</view>
					</label>
				</radio-group>
			</view>
		</view>

		<text class="btn" @click="toPage()">添加收货地址</text>
		<text class="btn" @click="toBack()">确定</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				underLine_address: [] // 线下收货地址
			}
		},
		computed: {
			...mapState(['hasLogin', 'underLine_index'])
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this._getUserAddress()
		},
		onShow() {
			this._getUserAddress()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				this._getUserAddress()
				this.UnderLine_Index(-1)
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
						uni.stopPullDownRefresh() //停止下拉刷新动画
					}
			    }
			})
		},
		methods: {
			...mapMutations(['UnderLineAddress', 'UnderLine_Index']),
			editAddress(consignee,mobile,province,city,district,address,zipcode,address_id) {
				uni.navigateTo({
					url: '../add/add?addFlag=true'+'&consignee='+consignee+'&mobile='+mobile+'&province='+province+'&city='+city+'&district='+district+'&address='+address+'&zipcode='+zipcode+'&address_id='+address_id
				});
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.underLine_address.length; i++) {
					if (this.underLine_address[i].address_id.toString() == evt.target.value) {
						this.UnderLine_Index(i)
						this.UnderLineAddress(this.underLine_address[i])
						break;
					}
				}
			},
			toBack() {
				uni.navigateBack({
					delta: 1 // 代表返回上 1 页
				})
			},
			toPage() {
				uni.navigateTo({
					url: '../add/add'
				});
			},
			// 获取用户收货地址
			_getUserAddress() {
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
					url: this.$service.api_lists.getUserAddress,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.underLine_address = res.data.data
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
		
		}
	}
</script>
<style>
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1456673_hw1wsw0lo0n.ttf') format('truetype');
	}

	.icon {
		font-family: iconfont;
		margin-left: 10upx;
	}
</style>
<style scoped lang="scss">
	.editBTN {
		    width: 120upx;
		    height: 120upx;
		    text-align: center;
		    line-height: 120upx;
		    margin-right: -30upx;
	}

	.consignee {
		padding: 37upx 30upx;

		.wrap {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			display: flex;
			width: 100%;
			overflow-x: hidden;

			.consigneeWrap {
				margin-bottom: 70upx;

				.txt1 {
					font-size: 34upx;
					color: #333;
					font-weight: 500;
					margin-right: 50upx;
				}

				.txt2 {
					font-size: 26upx;
					color: #666;
					display: block;
					margin-top: 22upx;
					width: 520upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.btn {
			display: block;
			background: linear-gradient(90deg, rgba(116, 190, 248, 1) 0%, rgba(66, 162, 236, 1) 91%);
			width: 410upx;
			height: 96upx;
			border-radius: 46upx;
			font-size: 32upx;
			color: #fff;
			text-align: center;
			line-height: 96upx;
			margin-left: 135upx;
			margin-bottom: 40upx;
		}
	}
</style>
