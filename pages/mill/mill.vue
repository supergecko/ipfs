<template>
	<view class="mill">
		<!-- <video class="video" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4" 
		controls></video> -->
		<view class="out">
			<image class="m1" src="../../static/images/mill/m1.png" mode=""></image>
			<view class="desc">
				<text class="txt1">矿场外部</text>
				<text class="txt2">outside the mine</text>
			</view>
		</view>
		<view class="item">
			<image src="../../static/images/mill/m2.png" class="m2" mode=""></image>
			<image src="../../static/images/mill/m3.png" class="m3" mode=""></image>
		</view>
		<view class="inline">
			<image src="../../static/images/mill/m4.png" class="m4" mode=""></image>
			<image src="../../static/images/mill/m5.png" class="m5" mode=""></image>
			<view class="desc">
				<text class="txt1">矿场内部</text>
				<text class="txt2">inside the mine</text>
			</view>
		</view>
		<view class="hydropower">
			<image src="../../static/images/mill/m6.png" class="m6" mode=""></image>
			<image src="../../static/images/mill/m7.png" class="m7" mode=""></image>
			<view class="desc">
				<text class="txt1">水电站</text>
				<text class="txt2">Hydropower station</text>
			</view>
		</view>
	</view>
</template>

<script>
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
	.mill{
		padding: 42upx 45upx;
		border-top: 1upx solid rgb(245,245,245);
		.video{
			width: 660upx;
			height: 370upx;
			margin-bottom: 40upx;
		}
		.out{
			position: relative;
			.m1{
				width: 582upx;
				height: 400upx;
			}
			.desc{
				position: absolute;
				top: 262upx;
				right: 0;
				.txt1{
					font-size: 34upx;
					color: #011C40;
					font-weight: 500;
					display: block;
					text-align: right;
				}
				.txt2{
					font-size: 16upx;
					color: #011C40;
				}
			}
		}
		.item{
			margin-bottom: 60upx;
			.m2{
				width: 300upx;
				height: 370upx;
				margin-top: 40upx;
				margin-right: 40upx;
			}
			.m3{
				width: 300upx;
				height: 370upx;
				position: relative;
				top: 60upx;
			}
		}
		.inline{
			margin-top: 110upx;
			position: relative;
			.m4{
				width: 310upx;
				height: 500upx;
				margin-right: 40upx;
			}
			.m5{
				width: 310upx;
				height: 414upx;
				position: relative;
				top: 111upx;
			}
			.desc{
				position: absolute;
				top: 51upx;
				right: 103upx;
				.txt1{
					font-size: 34upx;
					color: #333;
					font-weight: 500;
					display: block;
				}
				.txt2{
					font-size: 16upx;
					color: #666;
				}
			}
			.desc::after{
				display: block;
				content: '';
				width: 30upx;
				height: 6upx;
				background-color: #2B78BF;
			}
		}
		.hydropower{
			position: relative;
			margin-top: 180upx;
			margin-bottom: 40upx;
			.m6{
				width: 382upx;
				height: 480upx;
				margin-right: 40upx;
			}
			.m7{
				position: relative;
				top: 42upx;
				width: 238upx;
				height: 404upx;
			}
			.desc{
				position: absolute;
				top: 0upx;
				right: 0upx;
				.txt1{
					font-size: 34upx;
					color: #333;
					font-weight: 500;
					display: block;
				}
				.txt2{
					font-size: 16upx;
					color: #666;
				}
			}
			.desc::after{
				display: block;
				content: '';
				width: 30upx;
				height: 6upx;
				background-color: #2B78BF;
			}
		}
	}
</style>
