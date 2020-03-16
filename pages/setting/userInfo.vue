<template>
	<view style="background: rgb(245,245,245);height: 100%;">
		<view style="height: 30upx;"></view>
		<view class="setTingItem">
			<view>姓名</view>
			<view style="min-width:500upx;">
				<input placeholder="请输入姓名" style="text-align: right;" v-model="realname"/>
			</view>
		</view>
		<view class="borderPx"></view>
		<view class="setTingItem">
			<view>手机号</view>
			<view style="min-width:500upx;">
				<input placeholder="请输入手机号码" style="text-align: right;" v-model="userPhone"/>
			</view>
		</view>
		<view class="borderPx"></view>
		<view class="setTingItem">
			<view>身份证号码</view>
			<view style="min-width:500upx;">
				<input placeholder="请输入身份证号码" style="text-align: right;" v-model="idcard"/>
			</view>
		</view>
		<view class="borderPx"></view>
		<view style="height: 30upx;"></view>

		<view class="uni-flex uni-row IDCard">
			<view class="uni-uploader__files" style="margin-bottom: 20upx;">
				<block v-for="(image,index) in imageface" :key="index">
					<view class="uni-uploader__file">
						<image class="uni-uploader__img" :src="image" :data-src="image" @tap="chooseFaceImage"></image>
					</view>
				</block>
			</view>
			<view class="uni-uploader__files" style="margin-bottom: 20upx;">
				<block v-for="(image,index) in imageback" :key="index">
					<view class="uni-uploader__file">
						<image class="uni-uploader__img" :src="image" :data-src="image" @click="chooseBackImage"></image>
					</view>
				</block>
			</view>
			<view class="uni-uploader__input-box" v-if="imagefacestatus == 0" @click="chooseFaceImage">
				<image src="../../static/IDCardFace.jpg" class="IDCardImage"></image>
			</view>
			<view class="uni-uploader__input-box" v-if="imagebackstatus == 0" @click="chooseBackImage">
				<image src="../../static/IDCardBack.jpg" class="IDCardImage"></image>
			</view>
		</view>
		<view class="loginOut" @click="submit">提交</view>
	</view>
</template>
<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	export default {
		onLoad() {
			
		},
		data() {
			return {
				realname: '',
				userPhone:'',
				idcard: '',
				index: 0,
				countIndex: 1,
				array: ['身份证'],
				imageface: [],
				imageback: [],
				imagefacestatus: 0,
				imagebackstatus: 0,
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				imagefaceurl: '',
				imagebackurl: '',
				btnfalse: false
			};
		},
		methods: {
			submit() {
				if (this.realname == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入真实姓名'
					});
					return false;
				}
				if (this.userPhone == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码'
					});
					return false;
				}
				if (this.idcard == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入身份证号'
					});
					return false;
				}
				if (this.imagefaceurl == '') {
					uni.showToast({
						icon: 'none',
						title: '请上传身份证正面'
					});
					return false;
				}
				if (this.imagebackurl == '') {
					uni.showToast({
						icon: 'none',
						title: '请上传身份证反面'
					});
					return false;
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
				const realname = this.realname
				const idcard = this.idcard
				const mobile = this.userPhone
				const face = this.imagefaceurl
				const back = this.imagebackurl
				const user_id = uni.getStorageSync('userID')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${realname}__${idcard}__${mobile}__${face}__${back}__${timestamp}__elseleimaohasjer2860`)
				let params = {user_id, realname, idcard, mobile, face, back, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.identityAuthentication,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						uni.showToast({
							title: '提交成功',
							icon: "none"
						})
					}
					uni.navigateBack({
						delta: 1 // 代表返回上 1 页
					})
					uni.hideLoading()
					console.log(res);
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			},
			
			chooseFaceImage: async function() {
				this.uploadFIle(1);
			},
			chooseBackImage: async function() {
				this.uploadFIle(2);
			},
			// 异步上传图片
			uploadFIle(type) {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						console.log(res)
						if (type == 1) {
							this.imageface = [];
							this.imageface = this.imageface.concat(res.tempFilePaths);
							this.imagefacestatus = 1;
						}
						if (type == 2) {
							this.imageback = [];
							this.imageback = this.imageback.concat(res.tempFilePaths);
							this.imagebackstatus = 1;
						}
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: this.$service.api_baseurl + this.$service.api_lists.file_post,
							filePath: imageSrc,	
							name: 'imgPath',
							success: (res) => {
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								const res1 = JSON.parse(res.data);
								if (type == 1) {
									this.imagefaceurl = res1.data.url
								}
								if (type == 2) {
									this.imagebackurl = res1.data.url
								}
								console.log(res1.data.url);
							},
							fail: (err) => {
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								})
							},
							complete: () => {
								console.log("complate")
							}
						})

					},
					fail: (err) => {
						console.log('chooseImage fail', err)
					}
				})
			},
			
		}
	}
</script>
<style>
	.setTingItem {
		display: flex;
		justify-content: space-between;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(21, 20, 20, 1);
		padding: 40upx 30upx 40upx 38upx;
		background: #FFF;
	}

	.borderPx {
		height: 1upx;
	}

	.loginOut {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(66, 162, 236, 1);
		height: 110upx;
		line-height: 110upx;
		text-align: center;
		background: #FFF;
	}

	.IDCardTitle{
		text-align: right;
		padding: 16upx 44upx;
	}
	.IDCard {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	
	.IDCardImage {
		position: absolute;
		width: 560upx;
		height: 350upx;
	}
	.uni-uploader__img{
		width: 560upx;
		height: 350upx;
	}
	.uni-uploader__input-box {
		width: 560upx;
		height: 350upx;
		margin-bottom: 20upx;
	}
	
	.uni-uploader__file {
		width: 560upx;
		height: 350upx;
	}
	
</style>
