<template>
	<view class="content">
		<view class="header">
			<view class="nav">
				<image class="img"  src="../../static/images/home/LOGO%20.png" mode="" @click="toPage2"></image>
				<view class="search">
					<view class="wrap">
						<image class="img" src="../../static/images/home/search.png" mode=""></image>
						<text class="txt">搜一搜</text>
					</view>
				</view>
				<image class="img" src="../../static/images/home/navMy.png" mode="" @click="toPage"></image>
			</view>
			
			<!-- <view class='nav2'>
				<view class="txtWrap">
					<text class='txt' >首页</text>
					<text class='txt' >矿机拼团</text>
					<text class='txt' >奖池瓜分</text>
					<text class='txt' >推广返佣</text>
				</view>
				<image class="img" src="../../static/images/home/down.png" mode="" @tap="more" v-show="!showMore"></image>
				<image class="img2" src="../../static/images/home/down.png" mode="" @tap="more" v-show="showMore"></image>
			</view> -->
		</view>
		
		<view class="popUp" v-show="showMore">
			<view class="content" @tap="more">
				<text class="txt" v-for="(item,index) in list" :key='index'>
					{{ item.title }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMore: false,
				list: [
					{title:'首页'},
					{title:'矿机拼团'},
					{title:'奖池瓜分'},
					{title:'推广返佣'},
					{title:'矿机商城'},
					{title:'时空存力矿场'},
					{title:'时空存力资讯'},
					{title:'关于时空存力'},
					{title:'商务合作'},
					{title:'计算器'},
					{title:'隐私条款'},
					{title:'用户条款'}
				]
			}
		},
		onLoad() {

		},
		methods: {
			more () {
				this.showMore = !this.showMore
			},
			toPage() {
				uni.reLaunch({
					url: '../user/user',
				});
			},
			toPage2() {
				uni.reLaunch({
					url: '../home/home'
				});
			},
		}
	}
</script>

<style>
	.navSelect{
		border-bottom: 4upx solid #fff;
	}
</style>
<style lang="scss" scoped>
	.header{
		width: 100%;
		padding-bottom: 32upx;
		padding-top: 32upx;
		background: url(../static/images/home/headerBg.png);
	}
	.nav{
		width: 100%;
		display: flex;
		flex-direction: row;
		.img{
			width: 44upx;
			height: 44upx;
			margin: 10upx 28upx 0;
		}
		.search{
			flex: 1;
			height:64upx;
			background:rgba(245,245,245,1);
			border-radius:30upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			.wrap{
					display: flex;
					flex-direction: row;
					.img{
						width: 36upx;
						height: 36upx;
						margin: 0 10upx 0 40upx;
					}
				}
			.txt{
				font-size: 28upx;
				color:rgba(175,173,173,1);
			}
		}
		
	}
	.nav2{
		margin-top: 43upx;
		display: flex;
		flex-direction: row;
		.txtWrap{
			flex: 1;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.txt{
				font-size: 30upx;
				color: #fff;
				padding-bottom: 18upx;
			}
		}
		.img{
			width: 30upx;
			height: 20upx;
			margin: 10upx 26upx 0 0;
		}
		.img2{
			width: 30upx;
			height: 20upx;
			margin: 10upx 26upx 0 0;
			transform: rotate(180deg);
		}
	}
	.popUp{
		width: 100%;
		height: 1035upx;
		background-color: rgba(0,0,0,.35);
		.content{
			background-color: #fff;
			z-index: 999;
			padding: 16upx 22upx ;
			.txt{
				display: inline-block;
				font-size: 26upx;
				width:158upx;
				height:64upx;
				border:1upx solid rgba(181,181,181,1);
				border-radius:30upx;
				text-align: center;
				line-height: 64upx;
				color:rgba(102,102,102,1);
				margin: 16upx 9upx;
				box-sizing: border-box;
			}
		}
	}
</style>
