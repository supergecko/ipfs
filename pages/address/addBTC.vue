<template>
	<view class="addBTC">
		<view class="address">
			<input class="ipt" placeholder="请输入钱包地址" placeholder-style="color: #AFADAD;font-size: 32upx;" type="text" v-model="wallet_address" />
			<image class="img" src="../../static/images/login/delete.png" mode="" @click="clearAddress"></image>
		</view>
		<text class="btn" @click="_saveWallet" v-if="!editFalg">保存</text>
		<text class="btn" @click="_editWallet" v-else>修改</text>
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
				wallet_address:'', // 钱包地址
				editFalg:false
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
			if(option.edit=='true'){
				uni.setNavigationBarTitle({
				    title: '编辑钱包地址'
				})
				this.wallet_address = option.address
				this.editFalg = true
				this.walletId = option.walletId
			}
		},
		methods:{
			...mapMutations(['onLineIndex']),
			clearAddress() {
				this.wallet_address = ''
			},
			toBack() {
				uni.navigateBack({
					delta: 1 // 代表返回上 1 页
				})
			},
			// 添加新的钱包地址
			_saveWallet() {
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
				if (!this.wallet_address) {
				    uni.showToast({
				        icon: 'none',
				        title: '请输入钱包地址'
				    });
				    return;
				}
				uni.showLoading({
					title: '保存中'
				})
				const address = this.wallet_address
				const user_id = uni.getStorageSync('userID')
				const coin_id = 1
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${coin_id}__${address}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, coin_id, address, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.saveWallet,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						uni.showToast({
						    title: '保存成功',
						    duration: 2000
						})
					}
					this.onLineIndex(-1)
					uni.hideLoading()
					uni.navigateBack({
						delta: 1 // 代表返回上 1 页
					})
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
			_editWallet() {
				const _this = this
				uni.showModal({
				    title: '提示',
				    content: '是否确定修改该钱包地址',
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
				            if (!_this.wallet_address) {
				                uni.showToast({
				                    icon: 'none',
				                    title: '请输入钱包地址'
				                });
				                return;
				            }
				            uni.showLoading({
				            	title: '修改中'
				            })
				            const address = _this.wallet_address
				            const user_id = uni.getStorageSync('userID')
				            const wallet_id = _this.walletId
				            const timestamp = Date.parse(new Date()) / 1000
				            const sign = _this.$md5(`${user_id}__${wallet_id}__${address}__${timestamp}__elseleimaohasjer2860`)
				            let params = {user_id, wallet_id, address, timestamp, sign}
				            _this.$ajax.post({
				            	url: _this.$service.api_lists.editWallet,
				            	data: params
				            }).then((res) => {
				            	if (res.data.code == 1) {
				            		uni.showToast({
				            		    title: '修改成功',
				            		    duration: 2000
				            		})
				            	}
				            	_this.onLineIndex(-1)
				            	uni.hideLoading()
				            	uni.navigateBack({
				            		delta: 1 // 代表返回上 1 页
				            	})
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
				});
				
			},
		}
	}
</script>

<style scoped lang='scss'>
	.addBTC{
		padding: 43upx 40upx;
		
		border-top: 1upx solid rgb(245,245,245);
		.address{
			/* position: relative; */
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30upx 0;
			border-bottom: 1upx solid rgb(245,245,245);
			.ipt{
				width: 600upx;
			}
			.img{
				width: 36upx;
				height: 36upx;
			}
		}
		.btn{
			display: block;
			width: 670upx;
			height: 96upx;
			border-radius: 6upx;
			background: #42A2EC;
			text-align: center;
			line-height: 96upx;
			color: #fff;
			font-size: 32upx;
			margin-top: 75upx;
		}
		
	}
</style>
