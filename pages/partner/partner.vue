<template>
	<view class="wrap" :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize: 'cover'}">
		<view class="item">
			<view class="tit">产 品 介 绍</view>
			<view class="con">
				IPFS（InterPlanetary File System）即星际文件系统。它是一个致力于在创建持久且分布式存储和共享文件的网络传输协议。注意，IPFS狭义上是一种协议，它是一种内容可寻址的对等超媒体分发协议。在IPFS网络中的节点将构成一个分布式文件系统
			</view>
		</view>
		<view class="item">
			<view class="tit">优 惠</view>
			<view class="discount">
				<view class="item" style="margin-right: 77upx;display:inline-block;">
					<image src="../../static/img/newScan.png" mode="" style="width:150upx;height:150upx;"></image>
					<view style="color: #333;font-size: 26upx;"><text>扫描二维码</text><br/><text>即送200元</text> </view>
				</view>
				<view class="item" style="margin-right: 74upx;display:inline-block;" @click="handleDownloadQrIMg()">
					<image src="../../static/img/newCode.png" mode="" style="width:150upx;height:150upx;"></image>
					<view style="color: #333;font-size: 26upx;"><text>时空存力</text><br/><text>专属客服</text> </view>
				</view>
				<view class="item" style="display:inline-block;margin-bottom:121upx;">
					<image src="../../static/img/service.png" mode="" style="width:150upx;height:150upx;"></image>
					<view style="color: #333;font-size: 26upx;"><text>咨询客服</text><br/><text>立抢试用名额</text> </view>
				</view>
				
				
				<!-- 新添加部分开始 -->
				<view class="contact" style="position:relative;box-sizing:border-box;display: block;width:604upx;border-radius:10upx;box-shadow:2upx 4upx 10upx -2upx #3A039C;padding:88upx 37upx 50upx;">
					<view style="position:absolute;top:-64upx;left: 39%;">
						<image src="../../static/img/contact.png" mode="" style="width:130upx;height:130upx;"></image>
					</view>
					<view style="color:#E4731E;font-size:28upx;">合伙人咨询者请留联系方式</view>
					<view>
						<view style="border-bottom:1upx solid #838282;text-align: left;margin: 72upx 0 72upx 0;padding-bottom:29upx;">
							<input type="text" value="" placeholder="请输入您的姓名" v-model="name"/>
						</view>
						<view style="border-bottom:1upx solid #838282;text-align: left;margin: 72upx 0 72upx 0;padding-bottom:29upx;">
							<input type="text" value="" placeholder="请输入您的电话号码" v-model="mobile"/>
						</view>
						<view @click="dat" style="width:510upx;height:82upx;margin:0 auto;border-radius:10upx;line-height:82upx;text-align:center;background-color:#4474FC;color:#eee;font-size:32upx;">提交</view>
					</view>
				</view>
				<!-- 新添加部分结束 -->
				
				
				
			</view>
		</view>
		<view class="item" style="margin-bottom: 168upx;">
			<view class="tit" >大 咖 说</view>
			<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" display-multiple-items=2 next-margin=30px>
				<swiper-item>
					<view class="swiper-item">
						<view>
							<image class="h-img" src="../../static/img/xumingxing.png" mode=""></image>
							<view style="color:#4C4C8D;font-size:26upx;">徐明星</view>
							<view style="color:#333;font-size:28upx;">IPFS将会使整个社会的基础设施</view>
						</view>
						
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view>
							<image class="h-img" src="../../static/img/heyi.png" mode=""></image>
							<view style="color:#4C4C8D;font-size:26upx;">何一</view>
							<view style="color:#333;font-size:28upx;">Filecoin上线之后我们肯定会关注</view>
						</view>
		
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image class="h-img" src="../../static/img/baoerye.png" mode=""></image>
						<view style="color:#4C4C8D;font-size:26upx;">宝二爷</view>
						<view style="color:#333;font-size:28upx;">
							IPFS挖矿要趁早，收益才最多
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image class="h-img" src="../../static/img/sunyuchen.png" mode=""></image>
						<view style="color:#4C4C8D;font-size:26upx;">孙宇晨</view>
						<view style="color:#333;font-size:28upx;">我很看好IPFS，我看好的东西我就要做一个一摸一样的出来</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="item">
			<view class="tit">怎 么 做</view>
			<view class="way">
				<view class="left" style="margin-right: 130upx;">
					<image src="../../static/img/phone1-2x.png" mode="" style="width: 240upx;height: 500upx;"></image>
					<view style="margin: 84upx 0 223upx;">
						<image src="../../static/img/2.png" mode="" style="width: 58upx;height:58upx;margin-right: 10upx;vertical-align: -18upx;"></image>
						<text>选择产品类型</text>
					</view>
					<image src="../../static/img/phone3-2x.png" mode="" style="width: 240upx;height: 500upx;"></image>
				</view>
				<view class="right">
					<view style="margin-top: 126upx;">
						<image src="../../static/img/1.png" mode=""  style="width: 58upx;height:58upx;margin-right: 10upx;vertical-align: -18upx;"></image>
						<text>进行注册</text>
					</view>
					<image src="../../static/img/phone2-2x.png" mode="" style="width: 240upx;height: 500upx;margin: 272upx 0 121upx;"></image>
					<view>
						<image src="../../static/img/3.png" mode=""  style="width: 58upx;height:58upx;margin-right: 10upx;vertical-align: -18upx;"></image>
						<text>收益情况</text>
					</view>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="tit">推 荐 奖 励</view>
			<view class="order">
				<image src="../../static/img/order1.png" mode="" style="width:406upx;height:506upx;"></image>
				<view style="margin: 63upx 0 119upx;">
					<view style="display: inline-block;width:24upx;height:24upx;background-color:#FBAB6A; border-radius:12upx;margin-right: 12upx;"></view>高达25%推荐佣金
				</view>
				<image src="../../static/img/order3.png" mode="" style="width:406upx;height:506upx;"></image>
				<view style="margin-top:63upx;">
					<view style="display: inline-block;width:24upx;height:24upx;background-color:#FBAB6A; border-radius:12upx;margin-right: 12upx;"></view>高达5%管理费分红
				</view>
			</view>
		</view>
		<view class="item">
			<view class="tit">用 户 反 馈</view>
			<view class="meg">
				<view class="meg1">
					<view style="display: block;width:72upx;height:72upx;margin-right:19upx;">
						<image src="../../static/img/aa.jpg" mode="" style="width: 72upx;height:72upx;border-radius:36upx;"></image>
					</view>
					<view style="padding-right: 30upx;width: 522upx">
						<view style="color:#3D64AB;font-size:30upx;">安安</view>
						<view style="color:#171719;font-size:32upx;margin: 27upx 0 22upx 0;">最近区块链特别火，因为朋友介绍投了几个项目，全部亏了，但我很看好IPFS，应该是我弯道超车的一次机会</view>
						<view style="width:112upx;height:46upx;line-height:46upx;font-size:24upx; color:#FE8095;text-align:center;border:1upx solid #F97D91;">稳定性</view>
					</view>
				</view>
				<view class="meg1">
					<view style="width:72upx;height:72upx;margin-right:19upx;">
						<image src="../../static/img/ll.jpg" mode="" style="width: 72upx;height:72upx;border-radius:36upx;"></image>
					</view>
					<view style="padding-right: 30upx;width: 522upx">
						<view style="color:#3D64AB;font-size:30upx;">林良</view>
						<view style="color:#171719;font-size:32upx;margin: 27upx 0 22upx 0;">第一次了解到IPFS挖矿，我按照现在的参与人员计算收益，早期很可能2-3个月回本</view>
						<view style="width:112upx;height:46upx;line-height:46upx;font-size:24upx; color:#FE8095;text-align:center;border:1upx solid #F97D91;">收益高</view>
					</view>
				</view>
				<view class="meg1">
					<view style="width:72upx;height:72upx;margin-right:19upx;">
						<image src="../../static/img/ly.jpg" mode="" style="width: 72upx;height:72upx;border-radius:36upx;"></image>
					</view>
					<view style="padding-right: 30upx;width: 522upx">
						<view style="color:#3D64AB;font-size:30upx;">林亦</view>
						<view style="color:#171719;font-size:32upx;margin: 27upx 0 22upx 0;">时空存力商城真的很用心在服务，之前了解过其他家的IPFS，都是很扯的，有问题也不给解决，时空存力商城服务态度非常好，非常满意，给点个赞</view>
						<view style="width:112upx;height:46upx;line-height:46upx;font-size:24upx; color:#FE8095;text-align:center;border:1upx solid #F97D91;">服务好</view>
					</view>
				</view>
				<view class="meg1">
					<view style="width:72upx;height:72upx;margin-right:19upx;">
						<image src="../../static/img/cf.jpg" mode="" style="width: 72upx;height:72upx;border-radius:36upx;"></image>
					</view>
					<view style="padding-right: 30upx;width: 522upx">
						<view style="color:#3D64AB;font-size:30upx;">陈飞</view>
						<view style="color:#171719;font-size:32upx;margin: 27upx 0 22upx 0;">真的不是托！我在区块链领域研究了很久，才觉得投资IPFS，越了解越看好其中的发展，这个项目会是2020年最亮的一颗星！</view>
						<view style="width:112upx;height:46upx;line-height:46upx;font-size:24upx; color:#FE8095;text-align:center;border:1upx solid #F97D91;">有意义</view>
					</view>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="tit">照 片 墙</view>
			<view class="picture">
				<image src="../../static/img/picture.png" mode="" style="width:642upx;height:596upx;margin:80upx 0 43upx 0;"></image>
				<!-- <view>
					<image src="../../static/img/address.png" mode="" style="width:38upx;height:38upx;vertical-align: -12upx;"></image>
					<text style="font-size:28upx;color:#fff;">福建省福州市鼓楼区国家863软件专业孵化器基地 5楼512(领鹿谷）</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
		import indexBackgroundImage from "@/static/img/bg.png"
		import qrCodeLeiMao from '@/static/img/newCode.png';
		export default {
			data() {
				return {
					indexBackgroundImage:indexBackgroundImage,
					qrCodeLeiMao: qrCodeLeiMao,
					name: '',
					mobile: '',
					res: '123'
				}
			},
			methods: {
				//#ifdef H5
				// 点击下载图片(H5端)
				handleDownloadQrIMg() {
					// 这里是获取到的图片base64编码
					const imgUrl = this.qrCodeLeiMao;
					// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
					if (window.navigator.msSaveOrOpenBlob) {
						var bstr = atob(imgUrl.split(',')[1]);
						var n = bstr.length;
						var u8arr = new Uint8Array(n);
						while (n--) {
							u8arr[n] = bstr.charCodeAt(n);
						}
						var blob = new Blob([u8arr]);
						window.navigator.msSaveOrOpenBlob(blob, 'paymentImg' + '.' + 'png');
					} else {
						// 这里就按照chrome等新版浏览器来处理
						const a = document.createElement('a');
						a.href = imgUrl;
						a.setAttribute('download', 'paymentImg.png');
						a.click();
					}
				},
				//#endif
				
				//#ifdef APP-PLUS
				// 点击下载图片(APP端)
				handleDownloadQrIMg() {
					uni.showActionSheet({
						itemList: ['保存到相册'],
						success: res => {
							if (res.tapIndex == 0) {
								uni.showLoading({
									title: '保存中...'
								});
								setTimeout(function() {
									uni.hideLoading();
								}, 6000);
								uni.downloadFile({
									url: 'https://www.leimaominer.com/public/images/webservice/service_ad.png', //网络路径，下载下来
									success: res => {
										if (res.statusCode === 200) {
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath, //下载后的临时路径
												success: res => {
													//下载完成后在相册里压根找不到
													uni.hideLoading();
													uni.showToast({
														title: '保存成功！'
													});
												}
											});
										}
									}
								});
							}
						}
					});
				},
				//#endif
				//提交
				dat(){
					if(this.name===''|| !(/^[\u2E80-\u9FFF]+$/).test(this.name)){
						uni.showToast({
							icon: 'none',
							title: '请输入正确的姓名',
							duration: 2000
						});
						return;
					}
					if(this.mobile===''|| !(/^1[3456789]\d{9}$/.test(this.mobile))){
						uni.showToast({
							icon: 'none',
							title: '请输入正确的电话号码',
							duration: 2000
						});
						return;
					}
						uni.request({
						    url: 'https://leimaominer.com/api/AlipayResult/getContact', //仅为示例，并非真实接口地址。
							method: 'POST',
						    data: {
						        name: this.name,
								mobile: this.mobile
						    },
						    header: {
						        'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						    },
						    success: (res) => {
								console.log(1);
						        console.log(res);
								if(res.data.code===1){
									uni.showToast({
										icon: 'none',
									    title: '提交成功',
									    duration: 2000
									});
									this.name='',
									this.mobile=''
									const fres = setTimeout(() => {
										uni.reLaunch({
											url:'../login/loginPas'
										})
									}, 1500)
								}
								
						    },
							fail:(res)=>{
								console.log(2);
								console.log(res);
								if(res.data.code!==1){
									uni.showToast({
										icon: 'none',
									    title: '请重新输入',
									    duration: 2000
									});
									this.name='',
									this.mobile=''
								}
							},
							
						});
				}
			}
		}
</script>
<style lang="scss" scoped>
	.wrap /deep/ uni-swiper .uni-swiper-wrapper{
		overflow: visible;
	}
	uni-swiper-item{
		overflow: visible;
	}
	.wrap /deep/ wx-swiper .wx-swiper-wrapper{
		overflow: visible;
	}
	wx-swiper-item{
		overflow: visible;
	}
</style>
<style lang="scss" scoped>
	.wrap{
		width: 100%;
		// height: 8200upx;
		padding-top: 610upx;
		font-family: 'Adobe Heiti Std R';
		overflow-x: hidden;
		background: url('../../static/img/bg.png') repeat left top/cover;
		.item{
			.tit{
				width: 358upx;
				height: 78upx;
				line-height: 72upx;
				color: #fff;
				font-size: 36upx;
				text-align: center;
				margin: 0 auto;
				background:url(../../static/img/intro.png) no-repeat center/cover;
			}
			.con{
				width: 691upx;
				margin: 66upx auto 168upx;
				color: #E6DAFE;
				font-size: 32upx;
			}
			swiper{
				margin: 146upx 0 0 30upx;
				overflow: visible;
				.swiper-item{
					positiom: relative;
					box-sizing: border-box;
					width:300upx;
					height:220upx;
					text-align: center;
					background-color:#fff;
					padding:56upx 24upx;
					border-radius: 20upx;
					overflow: visible;
				}
				.h-img{
					position:absolute;
					top: 0upx;
					left: 100upx;
					width: 108upx;
					height: 108upx;
					margin-top: -50upx;
				}
			}
			.way{
				display: flex;
				width: 622upx;
				margin: 88upx auto;
				font-size: 30upx;
				color: #fff;
			}
			.order{
				width: 406upx;
				margin: 115upx auto;
				font-size: 30upx;
				color: #fff;
				text-align: center;
			}
			.meg{
				box-sizing: border-box;
				width: 690upx;
				height: 1600upx;
				margin: 77upx auto;
				padding: 71upx 0 0 38upx;
				background-color: #fff;
				border-radius: 30upx;
				.meg1{
					display: flex;
					margin-bottom: 68upx;
				}
			}
			.picture{
				width: 642upx;
				margin: 0 auto 142upx;
				// text-align: center;
			}
			.discount{
				box-sizing: border-box;
				width: 690upx;
				padding: 67upx 43upx;
				margin: 96upx auto 169upx;
				background-color: #fff;
				border-radius: 10upx;
				text-align: center;
			}
			.code{
				width: 620upx;
				margin: 159upx auto;
				text-align: center;
				color: #fff;
				font-size: 24upx;
				background: url(../../static/img/dress.png) repeat center/cover;
			}
		}
	}
</style>
