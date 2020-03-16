<template>
	<!-- 钱包地址 -->
	<view class="address">
		<view style="min-height:1174upx;">
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in wallet_address" :key='index' style="display: flex;justify-content: center;align-items: center;">
						<view style="display: inline-block;margin-top: 26upx;">
							<radio :value="item.address" :checked="index === on_line_index" />
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
		<view style="height: 160upx;width: 750upx;"></view>
		<view class="BTNWarp">
			<text class="btn" @click="toPage()">添加新的钱包地址</text>
		</view>
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue'
	import { mapState,mapMutations } from 'vuex'
	export default {
		components: {
			QSTabs
		},
		computed: {
			...mapState(['hasLogin','on_line_index','underLine_index'])
		},
		data() {
			return {
				tabs_2: ['钱包地址', '收货地址'],
				current_2: 0,
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
				wallet_address: [] ,// 钱包地址
				underLine_address: [] // 线下收货地址
			}
		},
		onShow() {
			if (this.current_2===1){
				this._getUserAddress()
			} else {
				this._getWallet()
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				if (this.current_2===1){
					this._getUserAddress()
					this.UnderLine_Index(-1)
				} else {
					this._getWallet()
					this.onLineIndex(-1)
				}
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
			...mapMutations(['onLineAddress', 'onLineIndex','UnderLineAddress', 'UnderLine_Index']),
			// 钱包地址开始
			toPage(){
				uni.navigateTo({
					url: '../address/addBTC'
				});
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.wallet_address.length; i++) {
					if (this.wallet_address[i].address === evt.target.value) {
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
			//修改用户钱包地址
			toEditWallet(address,walletId) {
				uni.navigateTo({
					url: '../address/addBTC?edit=true'+'&address='+address+'&walletId='+walletId
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
			},
			//钱包地址结束
			
			//收货地址开始
			radioChange2: function(evt) {
				for (let i = 0; i < this.underLine_address.length; i++) {
					if (this.underLine_address[i].mobile === evt.target.value) {
						this.UnderLine_Index(i)
						this.UnderLineAddress(this.underLine_address[i])
						break;
					}
				}
			},
			editAddress(consignee,mobile,province,city,district,address,zipcode,address_id) {
				uni.navigateTo({
					url: '../add/add?addFlag=true'+'&consignee='+consignee+'&mobile='+mobile+'&province='+province+'&city='+city+'&district='+district+'&address='+address+'&zipcode='+zipcode+'&address_id='+address_id
				});
			},
			toPage2() {
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
			//收货地址结束
			
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
			this._getWallet()
			this._getUserAddress()
		},
	}
</script>
<style>
	uni-page-body{
		height: 100%;
	}
</style>
<style scoped lang="scss">
	.BTNWarp{
		width: 750upx;
		position: fixed;
		bottom: 0;
		height: 160upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address{
		background-color: rgb(245,245,245);
		padding: 1upx 15upx;
		overflow-x: hidden;
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
		}
	}
</style>

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
		overflow-x: hidden;
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
		}
	}
</style>