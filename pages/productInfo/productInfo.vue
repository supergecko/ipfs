<template>
	<view class="productInfo" style="overflow-x: hidden;">
		<view class="content">
			<view class="mill">
				<view class="type">
					<text class="txt">名称</text>
					<text class="txt" v-if="goodsInfo.goods">{{goodsInfo.goods.goods_name}}</text>
				</view>
				<view class="type">
					<text class="txt">挖矿币种</text>
					<text class="txt" v-if="goodsInfo.goods">{{goodsInfo.goods.coin_title}}</text>
				</view>
				<view class="type">
					<text class="txt">结算周期</text>
					<text class="txt" v-if="goodsInfo.goods">{{goodsInfo.goods.hashrate_cost}}</text>
				</view>
				<view class="type">
					<text class="txt">合约期限</text>
					<text class="txt" v-if="goodsInfo.goods">{{goodsInfo.goods.electricity}}</text>
				</view>
				<view class="type">
					<text class="txt">技术服务费</text>
					<text class="txt" v-if="goodsInfo.goods">{{goodsInfo.goods.income}}</text>
				</view>
				<!-- <view class="type" @click="openPopup">
					<text class="txt">币种</text>
					<view class="">
						<text class="txt">{{myType}}</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view> -->
				<uni-popup class="pop" ref="popup" type="bottom">
					<view class="pop-item" @click='closePopup(item)' v-for="(item,index) in moneyType" :key='index'>
						{{ item }}
					</view>
					<view class="line" style="height: 0upx;">
					</view>
					<view class="pop-item cancel" @click='closePopup'>取消</view>
				</uni-popup>
			</view>
			<view class="mill" style="margin-top: 24upx; display: none;">
				<!-- <view class="type" @click="openPopup2">
					<text class="txt">矿池</text>
					<view class="" style="display: flex;align-items: center;">
						<input class="txt" text placeholder="请选择矿池" type="text" style="text-align: right;" disabled="true" v-show="millflag" />
						<text class="txt" v-show="!millflag">{{mill}}</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view> -->
				<view class="type">
					<text class="txt">托管方式</text>
					<view class="" style="display: flex;align-items: center;">
						<!-- <input class="txt" text placeholder="请选择托管方式" type="text" style="text-align: right;" disabled="true" v-show="colloflag" /> -->
						<text class="txt">线上托管</text>
					</view>
				</view>
				<!-- 线上/线下地址warp -->
				<view>	
					<view class="type" @click="toPage('../address/address')"  style="display: flex;align-items: center;">
						<text class="txt" style="min-width:200upx;">钱包地址</text>
						<view style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align:right;max-width: 400upx;">
							<view v-show="!on_line_flag" style="width: 400upx;">
								<text class="txt" style="color: #888888;">请选择钱包地址</text>
							</view>
							<view v-show="on_line_flag" style="width: 400upx;">
								<text class="txt">{{on_line_address}}</text>
							</view>
						</view>
						<view class="" style="line-height: 60upx;">
							<text class="icon">&#xe630;</text>
						</view>
					</view>
				</view>
				<!-- 矿池 -->
				<uni-popup class="pop" ref="popup2" type="bottom">
					<view class="pop-item" @click='closePopup2(item)' v-for="(item, i) in goodsInfo.mine" :key="i" v-if="goodsInfo.mine">
						{{item.name}}
					</view>
					<view class="line" style="height: 0upx;">
					</view>
					<view class="pop-item cancel" @click='closePopup'>取消</view>
				</uni-popup>
				<!-- 矿池 -->

				<!-- 托管方式 -->
				<uni-popup class="pop" ref="popup3" type="bottom">
					<view class="pop-item" @click='closePopup3(item)' v-for="(item, i) in goodsInfo.host" :key="i" v-if="goodsInfo.host">
						{{item.title}}
					</view>
					<view class="line" style="height: 0upx;">
					</view>
					<view class="pop-item cancel" @click='closePopup'>取消</view>
				</uni-popup>
				<!-- 托管方式 -->
			
			</view>

			<view class="mill" style="margin-top: 24upx;">
				<view class="type">
					<text class="txt">购买的算力(/T)</text>
					<yp-number-box @change="changeNumber" :index="saleNumber" :value="saleGB" :min="saleMinGB" :max="10000000"/>
				</view>
				<view class="type">
					<text class="txt">算力价格</text>
					<text class="txt" v-if="goodsInfo.goods">${{goodsInfo.goods.shop_price}}/T</text>
				</view>
				<!-- 优惠卷 -->
				<!-- <view class="type" style="margin-bottom: 20upx;" @click="openCoupon">
					<text class="txt">优惠券</text>
					<view class="" style="display: flex;align-items: center;">
						<text class="txt" v-show="couponFlag" style="color: #888888;">请选择优惠劵</text>
						<text class="txt" v-show="!couponFlag">{{couponName}}</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view> -->
				<!-- 优惠卷弹框 -->
				<uni-popup class="pop" ref="popupCoupon" type="bottom">
					<view class="pop-item" @click='chooseCoupon(item)' v-for="(item, i) in goodsInfo.coupon" :key="i" v-if="goodsInfo.coupon">
						{{item.name}}{{item.money}}
					</view>
					<view class="line" style="height: 0upx;">
					</view>
					<view class="pop-item cancel" @click='closePopup'>取消</view>
				</uni-popup>
				
				<!-- 支付方式 -->
				<view class="type" @click="openPopup4" style="padding-top: 34upx;margin-bottom: 0upx;">
					<text class="txt">支付方式</text>
					<view class="" style="display: flex;align-items: center;">
						<!-- <input class="txt" text placeholder="请选择支付方式" type="text" style="text-align: right;" disabled="true" v-show="paymentFlag" /> -->
						<text class="txt" v-show="paymentFlag" style="color: #888888;">请选择支付方式</text>
						<text class="txt" v-show="!paymentFlag">{{paymentName}}</text>
						<text class="icon">&#xe630;</text>
					</view>
				</view>
				<!-- 支付方式弹框 -->
				<uni-popup ref="popup4" :custom="true" type="bottom">
					<view class="uni-share">
						<view class="uni-share-title">支付方式</view>
						<view class="uni-share-content">
							<view v-for="(item, i) in goodsInfo.pay" :key="i" v-if="goodsInfo.pay" @click='closePopup4(item)' class="uni-share-content-box">
								<view class="uni-share-content-image">
									<image :src='"../../static/paymentMethod/"+item.description+".png"' class="image" />
								</view>
								<view class="uni-share-content-text">{{item.name}}</view>
							</view>
						</view>
						<view class="uni-share-btn" @click="cancel('popup4')">取消 </view>
					</view>
				</uni-popup>
				<view class="showTotal">
					<image class="img" src="../../static/images/home/cut-off.png" mode=""></image>
					<view class="" style="text-align: right;margin-bottom: 24upx;">
						<text style="font-size: 32upx; color: #171719;margin-right: 20upx;">总计</text>
						<text style="font-size: 32upx; color: #F03030;"> ${{totalCase}}</text>
					</view>
					<text class="txt">总计费用=算力*算力价格</text>
					<!-- <text class="txt" style="padding-bottom: 20upx;">套餐中未交纳的电费剩余天数可以后续支付</text> -->
				</view>
			</view>
			<view class="clause">
				<radio style="font-size: 30upx;" :checked="chooseCla" @click="toggleChooseCla" /></label>
				<text class="text1">我接受IPFS</text>
				<text class="text2" @click="toPage('../agreement/agreement')">《用户服务协议》</text>
				<text class="text2" @click="toPage('../attention/attention')">、《注意事项》</text>
			</view>

		</view>
		<view class="bottom-bar">
			<view class="" style="width: 400upx;">
				<text style="font-size: 30upx; color: #171719;margin-right: 30upx;">实付金额</text>
				<text style="font-size: 30upx; color: #F03030;">${{totalCase}}</text>
			</view>
			<button class="btn" type="warn" @click="_buyNow">确定</button>
		</view>
		<!--线上支付-->
		<uni-popup ref="qrcode" :custom="true">
			<view class="uni-share" style="width:600upx;">
				<view class="uni-share-title">请扫描下方二维码进行支付</view>
				<view class="uni-share-content">
					<view class="uni-share-content-box" style="width: 100%;">
						<view class="uni-share-content-image" style="width: 360upx;height: 360upx;" >
							<img :src="captchaSrc" style="width: 360upx;height: 360upx;	">
						</view>
						<view class="saveSrcBtn" @click="handleDownloadQrIMg(networkImgSrc)">保存二维码</view>
						<view style="font-size: 26upx;color: darkgray;margin-top: 20upx;">充币地址</view>
						<view style="color: #007AFF;text-align: center;font-size: 24upx;" >{{usdtAddress}}</view>
						<view class="copyAddressBTn" @click="copyText(usdtAddress)">复制地址</view>
						<view style="margin-top: 10upx;font-size: 30upx;">待支付金额: <span style="color: red;">$ {{unpaid}}</span></view>
					</view>
				</view>
				<view class="uni-share-btn" @click="successPay('qrcode')">支付完成</view>
				<view class="uni-share-btn" @click="cancel('qrcode')">取消</view>
			</view>
		</uni-popup>

		<!-- 对公转账 -->
		<uni-popup ref="underLine" :custom="true">
			<view class="uni-share" style="width:600upx;">
				<view class="uni-share-title">请线下转账对公账户</view>
				<view class="uni-share-content" style="display: flex;flex-direction: column;font-size: 32upx;">
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_title)">
						<view class="txt" style="width: 82px;">户 名:</view>
						<view class="txt">{{formLabelAlign.bank_title}}</view>
					</view>
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_account)">
						<view class="txt" style="width: 76px;">账 号:</view>
						<view class="txt">{{formLabelAlign.bank_account}}</view>
					</view>
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_open)">
						<view class="txt" style="width: 100px;">开 户 行:</view>
						<view class="txt">{{formLabelAlign.bank_open}}</view>
					</view>
					<view style="margin-bottom:10upx;display:flex;" @click="copyText(formLabelAlign.bank_name)">
						<view class="txt" style="width: 75px;">银行名称:</view>
						<view class="txt">{{formLabelAlign.bank_name}}</view>
					</view>
					<view style="margin-top: 10upx;text-align: center;">待支付金额:<span style="color: red;">{{unpaid}}</span>元</view>
					<view style="text-align: center;font-size: 30upx;color: grey;">点击以上内容进行复制</view>
				</view>
				<view class="uni-share-btn" @click="successPay('underLine')">支付完成</view>
				<view class="uni-share-btn" @click="cancel('underLine')">重新选购</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			uniPopup,
			ypNumberBox
		},
		data() {
			return {
				formLabelAlign: {
					bank_account: '',
					bank_name: '',
					bank_open: '',
					bank_title: ''
				},
				usdtAddress:'0x7df5a30658993392c5e85c14cc4584eae69fe489',//USDT收款地址
				unpaid: 0, // 未支付金额
				saleGB:10,//销售的T
				saleMinGB:10,//限制的销售额
				saleNumber:1, // 数字输入框的index
				moneyType: ['BTC'],
				address: ['AntPool', 'BTC.com', 'F2Pool', 'zhizhu.top'],
				collocation: ['托管时空存力矿场', '指定收货地址'],
				collo: '',
				mill: '', //矿池
				millflag: true, //矿池flag
				colloflag: true, //托管方式flag
				addressFlag: false, //线上线下地址falg
				myType: 'BTC', // 标题
				chooseCla: true,
				goodsInfo: {}, // 商品详情
				electricity: '', // 初始化电费单价价格
				totalCase: 0, // 总费用
				initMinePrice: 0, // 初始化矿机单价价格
				cycle_id: 1, // 周期的ID
				numberValue: 1, // 产品数量
				paymentName: '', //支付方式名称
				paymentFlag: true, // 支付方式flag
				couponName: '', //支付方式名称
				couponMoney: 0, // 优惠劵优惠金额
				couponFlag: true, // 支付方式flag
				lmbPayment: true, // 是否需要时空存力币支付
				networkImgSrc: '', // 支付网络图片链接下载
				activityId: '',
				goodsId: '',
				qrCodeUrl: '', // 二维码图片
				ruleForm: {
					coupon: '', // 优惠劵
					trusteeshipM: '', // 托管方式
					btcAddress: '', // 钱包地址
					userAddress: '', // 用户收货地址
					orePool: '', // 矿池
					electricityDays: '', // 电费天数
					num: 1, // 购买数量
					paymentMethod: '' // 支付方式
				},
				newFlag:true,
			}
		},
		mounted() {
			// 判断浏览器是否是火狐
			if (navigator.userAgent.indexOf("Firefox") > 0) {
				this.isFirefox = true;
			}
		},
		methods: {
			//#ifdef H5
			// 点击下载图片(H5端)
			handleDownloadQrIMg(ImgSrc) {
				// 这里是获取到的图片base64编码
				const imgUrl = this.qrCodeUrl
				// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
				if (window.navigator.msSaveOrOpenBlob) {
					var bstr = atob(imgUrl.split(',')[1])
					var n = bstr.length
					var u8arr = new Uint8Array(n)
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n)
					}
					var blob = new Blob([u8arr])
					window.navigator.msSaveOrOpenBlob(blob, 'paymentImg' + '.' + 'png')
				} else {
					// 这里就按照chrome等新版浏览器来处理
					const a = document.createElement('a')
					a.href = imgUrl
					a.setAttribute('download', 'paymentImg.png')
					a.click()
				}
			},
			//复制(H5)
			copyText(item) {
				const _this = this
				this.$copyText(item).then(function(e) {
					uni.showToast({
						icon: 'none',
						title: '复制成功'
					})
				}, function(e) {
					uni.showToast({
						icon: 'none',
						title: '复制失败，请重试'
					})
				})
			},
			//#endif
			
			//#ifdef APP-PLUS
			// 点击下载图片(APP端)
			handleDownloadQrIMg(ImgSrc) {
				uni.showActionSheet({  
					itemList:["保存到相册"],  
					success:res=>{  
						if(res.tapIndex==0){  
							uni.showLoading({  
								title:"保存中..."  
							})  
							setTimeout(function() {   
								uni.hideLoading()  
							}, 6000);  
							uni.downloadFile({  
								url: ImgSrc,//网络路径，下载下来  
								success: (res) => {
									if (res.statusCode === 200) {  
										uni.saveImageToPhotosAlbum({  
											filePath: res.tempFilePath,//下载后的临时路径  
											success:  res => {//下载完成后在相册里压根找不到  
												uni.hideLoading()  
												uni.showToast({  
													title:"保存成功！"   
												})  
											}  
										})  
									}  
								}  
							});  
						}  
					}  
				})
			},
			//复制(app端)
			copyText(item) {
				uni.setClipboardData({
				    data: item,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			//#endif
			
			//购买矿机+电费
			_buyNow() {
				if (this.ruleForm.paymentMethod === '') {
					uni.showToast({
						icon: 'none',
						title: '请选择支付方式'
					});
					return;
				}
				if (this.chooseCla === false) {
					uni.showToast({
						icon: 'none',
						title: '请勾选用户服务协议'
					});
					return;
				}
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
					title: '提交中'
				});
				const {
					coupon,
					trusteeshipM,
					orePool,
					electricityDays,
					num,
					paymentMethod
				} = this.ruleForm
				const user_id = uni.getStorageSync('userID')
				const share_activity_id = this.activityId
				const goods_id = this.goodsId
				const buy_num = this.numberValue // 购买数量
				const wallet_id = this.wallet_id // 钱包地址
				const pay_id = paymentMethod // 支付方式ID
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${this.initMinePrice}__${this.electricity}__${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					user_id,
					share_activity_id,
					buy_num,
					wallet_id,
					pay_id,
					goods_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.buyNow,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						if (res.data.data.pay_type < 3) {
							//打开二维码支付
							this.qrCodeUrl = res.data.data.base64
							this.networkImgSrc = res.data.data.qrcode
							this.unpaid = res.data.data.unpaid // 未支付金额
							this.$refs.qrcode.open()
						} else if (res.data.data.pay_type === 3) {
							uni.showToast({
								icon: 'none',
								title: '支付成功'
							});
							const fres = setTimeout(() => {
								uni.reLaunch({
									url: '../myOrder/myOrder'
								})
							}, 1500)
						} else {
							//打开公账
							this.formLabelAlign.bank_account = res.data.data.address.bank_account
							this.formLabelAlign.bank_name = res.data.data.address.bank_name
							this.formLabelAlign.bank_open = res.data.data.address.bank_open
							this.formLabelAlign.bank_title = res.data.data.address.bank_title
							this.unpaid = res.data.data.unpaid // 未支付金额
							this.$refs.underLine.open()
						}
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
			
			successPay(type) {
				this.$refs[type].close()
				const fres = setTimeout(() => {
					uni.reLaunch({
						url: '../myOrder/myOrder'
					})
				}, 1500)
			},
			changeNumber(e) {
				console.log(e[1])
				this.numberValue = e[1]
			},
			// 拉取订单信息
			_homePage(activityId, goodsId) {
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
				const share_activity_id = activityId
				const goods_id = goodsId
				let params = {
					share_activity_id,
					goods_id,
					user_id
				}
				this.$ajax.post({
					url: this.$service.api_lists.goodsInfo,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.goodsInfo = res.data.data
						this.electricity = res.data.data.goods.electricity
						this.totalCase = parseFloat(res.data.data.goods.shop_price) * parseFloat(this.saleMinGB) // 总花费
						this.totalCase = parseFloat(this.totalCase).toFixed(2)
						this.initMinePrice = res.data.data.goods.shop_price
						this.cycle_id = res.data.data.cycle[0].cycle_id
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

			toggleChooseCla() {
				this.chooseCla = !this.chooseCla
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup(item) {
				this.$refs.popup.close()
				this.$refs.popup2.close()
				this.$refs.popup3.close()
				this.$refs.popupCoupon.close()
			},
			// 优惠劵
			openCoupon() {
				this.$refs.popupCoupon.open()
			},
			chooseCoupon(item) {
				this.$refs.popupCoupon.close()
				this.couponFlag = false
				this.couponName = item.name + item.money
				this.couponMoney = item.money
				this.ruleForm.coupon = item.cid
			},
			//矿池
			openPopup2() {
				this.$refs.popup2.open()
			},
			//矿池
			closePopup2(item) {
				this.$refs.popup2.close()
				this.mill = item.name
				this.ruleForm.orePool = item.mine_id
				this.millflag = false
			},
			//托管方式	
			openPopup3() {
				this.$refs.popup3.open()
			},
			//托管方式
			closePopup3(item) {
				this.$refs.popup3.close()
				this.collo = item.title
				this.ruleForm.trusteeshipM = item.host_id
				this.colloflag = false
				this.addressFlag = true
				if(this.collo==='托管时空存力'){
					this.newFlag = false
				} else {
					this.newFlag = true
				}
			},
			openPopup4() {
				this.$refs.popup4.open()
			},
			// 通用关闭弹框
			cancel(type) {
				this.$refs[type].close()
			},
			// 支付方式
			closePopup4(item) {
				this.$refs.popup4.close()
				this.paymentFlag = false
				this.paymentName = item.name
				this.ruleForm.paymentMethod = item.pay_id
			},
			toPage(URL) {
				uni.navigateTo({
					url: URL
				});
			},
			// 打开用户收货地址
			toAddAddress() {
				uni.navigateTo({
					url: '../consignee/consignee'
				});
			}
		},
		computed: {
			...mapState(['hasLogin', 'underLine_address', 'underLine_userName', 'underLine_mobile', 'underLine_flag',
				'on_line_address', 'on_line_flag', 'wallet_id', 'address_id'
			]),
			captchaSrc() {
				return this.qrCodeUrl.replace(/[\r\n]/g, "")
			}
		},
		onLoad(option) {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '../login/loginPas'
				});
				return;
			}
			this.saleMinGB = option.consumption
			this.saleGB = option.consumption
			this.activityId = option.share_activity_id
			this.goodsId = option.goods_id
			this._homePage(option.share_activity_id, option.goods_id)
		},
		watch: {
			numberValue(newName, oldName) {
				this.totalCase = this.initMinePrice // 初始化总花费
				this.totalCase = parseFloat(this.totalCase) * newName - parseFloat(this.couponMoney) // 总花费
				this.totalCase = parseFloat(this.totalCase).toFixed(2)
			},
			couponMoney(newName, oldName) {
				this.totalCase = this.initMinePrice // 初始化总花费
				this.totalCase = (parseFloat(this.totalCase) * this.numberValue) - parseFloat(newName) // 总花费
				this.totalCase = parseFloat(this.totalCase).toFixed(2)
			},
		}
	}
</script>
<style>
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1456673_4pxyw8wa6af.ttf') format('truetype');
	}

	.icon {
		font-family: iconfont;
		margin-left: 10upx;
	}

	.uni-numbox__value{
		width: 180upx;
	}
	.uni-numbox{
		width: 320upx;
	}
	.content .mill .line {
		padding: 0upx !important;
		background-color: rgb(245, 245, 245);
	}
</style>
<style scoped lang="scss">
	.saveSrcBtn{
		width:200upx;
		height:68upx;
		background:rgba(231,237,249,1);
		opacity:0.94;
		border-radius:10upx;
		border: 1upx solid rgb(194,206,216);
		color: rgb(3,105,209);
		text-align: center;
		line-height: 68upx;
		font-weight: bold;
		margin-top: 20upx;
		font-size: 30upx;
		font-family: 'fangsong';
	}
	.copyAddressBTn{
		width:160upx;
		height:56upx;
		background:rgba(233,234,235,1);
		opacity:0.94;
		border-radius:10upx;
		color: darkgray;
		text-align: center;
		line-height: 56upx;
		margin-top: 20upx;
		font-size: 30upx;
		font-family: 'fangsong';
	}
	.content {
		padding: 24upx 15upx;
		padding-bottom: 100upx;
		background-color: rgb(245, 245, 245);

		.mill {
			background-color: #fff;
			border-radius: 14upx;
			padding: 55upx 30upx 1upx 30upx;

			.type {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-bottom: 55upx;

				.txt {
					font-size: 32upx;
					color: #171719;
				}

				.numIcon {
					font-size: 45upx;
					color: #999;
					padding: 10upx;
				}

				.buyNum {
					display: inline-block;
					margin-left: 10upx;
					margin-right: 0upx;
					line-height: 60upx;
					font-size: 34upx;
					color: #171719;
				}

			}

			.assign {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.userInfo {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.address {
					font-size: 26upx;
					color: #888888;
				}
			}

			.pop-item {
				height: 100upx;
				border-bottom: 1upx solid rgb(245, 245, 245);
				background-color: #fff;
				line-height: 100upx;
				display: block;
				text-align: center;
				font-size: 34upx;
				color: #151414;
			}

			.line {
				height: 20upx;
				background-color: rgb(245, 245, 245);
			}

			.showTotal {
				.img {
					width: 100%;
					height: 16upx;
					margin-bottom: 30upx;
				}

				.txt {
					text-align: right;
					font-size: 26upx;
					color: #888888;
					display: block;
					margin-bottom: 24upx;
				}
			}
		}

		.clause {
			background-color: rgb(245, 245, 245);
			padding: 20upx 0;

			.text1 {
				font-size: 26upx;
				color: #666666;
			}

			.text2 {
				font-size: 26upx;
				color: #42A2EC;
			}

		}
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 11upx 20upx;

		.btn {
			margin-left: 85upx;
			width: 222upx;
			height: 78upx;
			border-radius: 38upx;
			display: inline-block;
			background-color: #F34E4E;
			font-size: 32upx;
			color: #fff;
		}
	}

	/* 底部分享 */
	.uni-share {
		background: rgb(247,247,249);
	}

	.uni-share-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
		text-align: center;
	}

	.uni-share-content {
		display: flex;
		flex-wrap: wrap;
		padding: 15px;
		align-items: center;
		justify-content: center;
	}

	.uni-share-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		box-sizing: border-box;
	}

	.uni-share-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60upx;
		height: 60upx;
		overflow: hidden;
		border-radius: 10upx;
	}

	.uni-share-content-image .image {
		width: 100%;
		height: 100%;
	}

	.uni-share-content-text {
		font-size: 26upx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}

	.uni-share-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
		text-align: center;
		color: #666;
		font-size: 24upx;
	}
</style>
