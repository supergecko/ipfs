<template>
	<view class="mygel">
		<view class="invite1 invite2">
			<view class="grade grade2">
				<text>当前等级</text>
			</view>
			<text class="name">时空存力合伙人</text>
			<view class="info">
				<view class="item">
					<text>用户名：123355</text>
					<text>累计贡献值</text>
				</view>
				<image class="qrCode" style="width: 100upx;height: 100upx;" src="../../static/images/generalize/qrCode.png" mode=""></image>
			</view>
		</view> 
		
		<view class="invite">
			<text>我邀请的人（20）</text>
		</view>
		
		<view style="height: 600upx;overflow: auto;">
			<view class="invite1" v-for="(item,index) in 4" :key='index' style="margin-bottom: 35upx;">
				<view class="grade grade2">
					<text>当前等级</text>
				</view>
				<text class="name">普通用户</text>
				<view class="info">
					<view class="item">
						<text>用户名：123355</text>
						<text>累计贡献值</text>
					</view>
					<image class="qrCode" style="width: 100upx;height: 100upx;" src="../../static/images/generalize/qrCode.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<text class="btn">
			查看更多
		</text>
		
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.mygel{
		padding: 40upx 30upx;
		.invite{
			padding: 47upx 0;
			text{
				color: #171719;
				font-size: 36upx;
			}
		}
		.btn{
			width: 210upx;
			height: 68upx;
			line-height: 68upx;
			border:2upx solid rgba(108,158,238,1);
			border-radius: 32upx;
			font-size: 26upx;
			color: #6C9EEE;
			text-align: center;
			display: block;
			margin-left: 240upx;
			margin-top: 40upx;
		}
	}
	.invite1 {
		// position: relative;
		background: url('../../static/images/generalize/silverBg.png');
		background-size: cover;
		width: 604upx;
		height: 334upx;
		margin-left: 47upx;
	
		.grade {
			background: url(../../static/images/generalize/silver2.png);
			width: 124upx;
			height: 50upx;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 50upx;
			position: relative;
			top: 25upx;
		}
	
		.name {
			font-size: 44upx;
			color: #fff;
			font-weight: bold;
			margin-left: 216upx;
			position: relative;
			top: 40upx;
		}
	
		.info {
			.item {
				width: 322upx;
				border-right: 2upx solid #fff;
				margin-left: 52upx;
				margin-top: 100upx;
	
				text {
					color: #fff;
					font-size: 32upx;
					display: block;
				}
			}
	
			.qrCode {
				float: right;
				position: relative;
				top: -92upx;
				right: 60upx;
			}
		}
	}
	
	.invite2 {
		background: url(../../static/images/generalize/yellow2.png);
		background-size: cover;
		width: 604upx;
		height: 334upx;
		margin-left: 47upx;
	
		.grade {
			background: url(../../static/images/generalize/yellow.png);
			width: 124upx;
			height: 50upx;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 50upx;
			position: relative;
			top: 25upx;
		}
	}
	
</style>
