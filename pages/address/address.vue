<template>
	<view class="address">
		    <view style="min-height:900upx;max-height:900upx;overflow: auto;">
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in wallet_address" :key='index' style="display: flex;justify-content: center;align-items: center;">
							<view style="display: inline-block;margin-top: 26upx;">
								<radio :value="item.wallet_id" :checked="index === on_line_index" />
							</view>
							<view class="content">
								<text class="txt">{{item.address}}</text>
								<view class="operation">
									<text class="txt compile" @click="toEditWallet(item.address,item.wallet_id)">编辑</text>
									<text class="txt delete" @click="_deleteWalletAddress(item.wallet_id)">删除</text>
								</view>
							</view>
						</label>
					</radio-group>
				</view>	
		    </view>
		<text class="btn" @click="toPage()">添加新的FIL地址</text>
		<text class="btn" @click="toBack()">确定</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default{
		data(){
			return {
				 options:[
				        {
				            text: '编辑',
				            style: {
				                backgroundColor: '#007aff'
				            }
				        }, {
				            text: '确认',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }
				      ],
				wallet_address: [] // 钱包地址
			}
		},
		computed: {
			...mapState(['hasLogin', 'on_line_index'])
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this._getWallet()
		},
		onShow() {
			this._getWallet()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				this._getWallet()
				this.onLineIndex(-1)
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
		methods:{
			...mapMutations(['onLineAddress', 'onLineIndex']),
			toPage(){
				uni.navigateTo({
					url: 'addBTC'
				});
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.wallet_address.length; i++) {
					if ((this.wallet_address[i].wallet_id).toString() == evt.target.value) {
						this.onLineIndex(i)
						this.onLineAddress(this.wallet_address[i])
						break;
					}
				}
			},
			toBack() {
				uni.navigateBack({
					delta: 1 // 代表返回上 1 页
				})
			},
			// 获取用户钱包地址
			_getWallet() {
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
					url: this.$service.api_lists.getWallet,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.wallet_address = res.data.data.address
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
			
			// 修改用户钱包地址
			toEditWallet(address,walletId) {
				uni.navigateTo({
					url: 'addBTC?edit=true'+'&address='+address+'&walletId='+walletId
				});
			},
			// 删除用户收货地址
			_deleteWalletAddress(WalletId) {
				const _this = this
				uni.showModal({
				    title: '提示',
				    content: '是否确定删除该钱包地址?',
				    success: function (res) {
				        if (res.confirm) {
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
				            	title: '删除中'
				            });
				            const user_id = uni.getStorageSync('userID')
				            const wallet_id = WalletId
				            const timestamp = Date.parse(new Date()) / 1000
				            const sign = _this.$md5(`${user_id}__${wallet_id}__${timestamp}__elseleimaohasjer2860`)
				            let params = {user_id, wallet_id, timestamp, sign}
				            _this.$ajax.post({
				            	url: _this.$service.api_lists.deleteWalletAddress,
				            	data: params
				            }).then((res) => {
				            	if (res.data.code == 1) {
				            		//初始化信息
				            		uni.showToast({
				            		    title: '删除成功',
				            		    duration: 2000
				            		})
				            	}
				            	_this._getWallet()
				            	_this.onLineIndex(-1)
				            	uni.hideLoading()
				            	console.log(res)
				            }).catch((err) => {
				            	uni.hideLoading()
				            	uni.showToast({
				            		title: err,
				            		duration: 2000
				            	});
				            })
				        } else if (res.cancel) {
				            return
				        }
				    }
				})
			}
		
		}
	}
</script>
<style>
	uni-page-body{
		height: 100%;
	}
	/* uni-page-wrapper{
		height: 100%
	} */
</style>
<style scoped lang="scss">
	
	.address{
		background-color: rgb(245,245,245);
		padding: 1upx 15upx;
		height: 100%;
		.content{
			margin-top: 27upx;
			padding: 50upx 30upx;
			border-radius: 14upx;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			margin-top: 27upx;
			.txt{
				font-size: 32upx;
				color: #171719;
				margin-left: 20upx;
				// margin-right: 20upx;
				// display: inline-block;
				width: 430upx;
				word-wrap: break-word;word-break: break-all;overflow: hidden;
			}
			//修改
				.operation{
					.txt{
						font-size: 26upx;
						color: #0081FF;
						padding: 20upx 0;
					}
				}
		}
		
		.btn{
			display: block;
			background:linear-gradient(90deg,rgba(116,190,248,1) 0%,rgba(66,162,236,1) 91%);
			width: 410upx;
			height: 96upx;
			border-radius: 46upx;
			font-size: 32upx;
			color: #fff;
			text-align: center;
			line-height: 96upx;
			margin: 0 auto;
			margin-top: 40upx;
		}
	}
</style>
