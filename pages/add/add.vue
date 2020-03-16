<template>
	<view class="add">
		<w-picker
			mode="region"
			:defaultVal="['福建省','福州市','鼓楼区']"
			:areaCode="['35','3501','350102']"
			:hideArea="false"
			@confirm="onConfirm" 
			ref="region" 
		></w-picker>
		<view class="addItem" style="display: flex;justify-content: space-between;align-items: center;">
			<text class="txt">收货人</text>
			<input class="ipt" type="text" placeholder="请输入收货人姓名" v-model="formData.consignee"  style="margin-left: -70upx;"/>
			<text class="icon phone">&#xe632;</text>
		</view>
		<view class="addItem" style="display: flex;">
			<text class="txt">手机号码</text>
			<input class="ipt" placeholder="请输入收货人手机号" type="text"v-model="formData.mobile" />
			<!-- <text class="icon phone">&#xe632;</text> -->
		</view>
		<view class="addItem" @click="toggleTab" style="display: flex;justify-content: space-between;align-items: center;">
			<text class="txt">收货地区</text>
			<input class="ipt" placeholder="请选择收货地区" type="text" v-model="formData.receivingArea" />
			<text class="icon phone">&#xe630;</text>
		</view>
		<view class="addItem" style="display: flex;flex-direction: row;">
			<text style="display: inline-block;
				width: 240upx;
				font-size: 32upx;
				color: #666;
				">门牌号</text>
			<textarea placeholder="详细街道、楼、门牌号等" style="height: 120upx;" v-model="formData.address"/>
			<!-- <text class="icon phone">&#xe630;</text> -->
		</view>
		<view class="addItem" style="display: flex;">
			<text class="txt">邮编</text>
			<input class="ipt" placeholder="请输入邮编" type="text" v-model="formData.zipcode" />
			<!-- <text class="icon phone">&#xe632;</text> -->
		</view>
		<text class="btn" @click="_saveAddress" v-if="!addFlag">保存</text>
		<text class="btn" @click="_editAddress" v-if="addFlag">修改</text>
		<w-picker
			mode="region"
			:defaultVal="['浙江省','杭州市','滨江区']"
			:areaCode="['33','3301','330108']"
			:hideArea="false"
			@confirm="onConfirm" 
			ref="region" 
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import { mapState,mapMutations } from 'vuex'
	export default {
		data () {
			return{
				resultInfo:{},
				formData:{
					receivingArea: '', // 收货地区
					address: '', // 门牌号
					consignee: '', // 收货人
					mobile: '', // 收获手机
					zipcode: '' // 邮编
				},
				province:'',
				city:'',
				district:'',
				addFlag:false,
				address_id:0
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
			if(option.addFlag=='true'){
				this.addFlag = true
				uni.setNavigationBarTitle({
				    title: '编辑收货地址'
				})
				this.formData.receivingArea = option.province+option.city+option.district
				this.formData.address = option.address
				this.formData.consignee = option.consignee
				this.formData.mobile = option.mobile
				this.formData.zipcode = option.zipcode
				this.province = option.province
				this.city = option.city
				this.district = option.district
				this.address_id = option.address_id
			} else {
				this.addFlag = false
			}
		},
	    components:{
	        wPicker
	    },
		methods: {
			...mapMutations(['UnderLine_Index']),
			onConfirm(val){
				console.log(val);
				this.province = val.checkArr[0]
				this.city = val.checkArr[1]
				this.district = val.checkArr[2]
				this.resultInfo=val;
				this.formData.receivingArea = val.result
			},
			toggleTab(){
				this.$refs.region.show();
			},
			//上传线下收货地址
			_saveAddress() {
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
			    if (!this.formData.consignee) {
			        uni.showToast({
			            icon: 'none',
			            title: '请输入收货人姓名'
			        });
			        return;
			    }
			    if (!(this.formData.mobile.length === 11)) {
			        uni.showToast({
			            icon: 'none',
			            title: '请输入正确的手机号码'
			        });
			        return;
			    }
				if (!this.formData.receivingArea) {
				    uni.showToast({
				        icon: 'none',
				        title: '请选择收货地区'
				    });
				    return;
				}
				if (!this.formData.address) {
				    uni.showToast({
				        icon: 'none',
				        title: '请输入详细门牌号'
				    });
				    return;
				}
				uni.showLoading({
					title: '保存中'
				});
				const { address, consignee, mobile, zipcode } = this.formData
				const user_id = uni.getStorageSync('userID')
				const province = this.province
				const city = this.city
				const district = this.district
				const town = ''
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${province}__${city}__${district}__${town}__${consignee}__${mobile}__${zipcode}__${address}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, province, city, district, town, consignee, mobile, zipcode, address, timestamp, sign}
				this.$ajax.post({
					url:this.$service.api_lists.saveAddress,
					data:params
				}).then((res)=>{
					if(res.data.code == 1){
						uni.showToast({
						    title: '保存成功',
						    duration: 2000
						})
					}
					this.UnderLine_Index(-1)
					uni.hideLoading()
					uni.navigateBack({
						delta: 1 // 代表返回上 1 页
					})
					console.log(res)
				}).catch((err)=>{
					uni.hideLoading()
					uni.showToast({
					    title: err,
					    duration: 2000
					});
				})
			},
			// 编辑线下收货地址
			_editAddress() {
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
			    if (!this.formData.consignee) {
			        uni.showToast({
			            icon: 'none',
			            title: '请输入收货人姓名'
			        });
			        return;
			    }
			    if (!(this.formData.mobile.length === 11)) {
			        uni.showToast({
			            icon: 'none',
			            title: '请输入正确的手机号码'
			        });
			        return;
			    }
				if (!this.formData.receivingArea) {
				    uni.showToast({
				        icon: 'none',
				        title: '请选择收货地区'
				    });
				    return;
				}
				if (!this.formData.address) {
				    uni.showToast({
				        icon: 'none',
				        title: '请输入详细门牌号'
				    });
				    return;
				}
				uni.showLoading({
					title: '保存中'
				});
				const { address, consignee, mobile, zipcode } = this.formData
				const user_id = uni.getStorageSync('userID')
				const province = this.province
				const city = this.city
				const district = this.district
				const town = ''
				const address_id = this.address_id
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${province}__${city}__${district}__${town}__${address_id}__${consignee}__${mobile}__${zipcode}__${address}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, province, city, district, town, address_id, consignee, mobile, zipcode, address, timestamp, sign}
				this.$ajax.post({
					url:this.$service.api_lists.editAddress,
					data:params
				}).then((res)=>{
					if(res.data.code == 1){
						uni.showToast({
						    title: '保存成功',
						    duration: 2000
						})
					}
					this.UnderLine_Index(-1)
					uni.hideLoading()
					uni.navigateBack({
						delta: 1 // 代表返回上 1 页
					})
					console.log(res);
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
<style>
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1456673_ufjoh8kdk8.ttf') format('truetype');
	}
	
	.icon {
		font-family: iconfont;
		margin-left: 10upx;
	}
</style>
<style scoped lang="scss">
	.add{
		padding: 0 40upx;
		border-top: 1upx solid rgb(245,245,245);
		.addItem{
			padding: 30upx 0;
			border-bottom: 1upx solid rgb(245,245,245);
			.txt{
				display: inline-block;
				width: 195upx;
				font-size: 32upx;
				color: #666;
				position: relative;
			}
			.ipt{
				// width: 400upx;
				display: inline-block;
				height: 30upx;
			}
			.phone{
				float: right;
				// line-height: 60upx;
				font-size: 40upx;
			}
		}
		.btn{
			width: 100%;
			height: 96upx;
			background-color: #42A2EC;
			font-size: 34upx;
			color: #fff;
			text-align: center;
			display: block;
			line-height: 96upx;
			border-radius: 12upx;
			margin-top: 100upx;
		}
		
	}
</style>
