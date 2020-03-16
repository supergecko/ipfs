<template>
	<view class="about">
		<view class="logo">
			<image class="logoImg" src="../../static/images/LOGO.png" mode=""></image>
			<text class="txt">时空存力矿机</text>
		</view>
		<view class="descWrap">
			<text class="desc">时空存力商城团队经历3个月的精心打造，于2019年09月正式上线时空存力矿机交易平台。
				时空存力商城是基于区块链投资者的需求，矿圈内矿机的交易因没有担保规范机制，行业混乱，参差不齐的服务，时空存力商城希望能在行业里树立一个新的体系，完善生态服务。围绕矿业生态的矿场托管服务、增值服务希望能过时空存力团队的努能为矿工们在挖矿的道路上得到品质交易及矿业生态的便捷服务！</text>
		</view>
		<image class="aboutImg" src="../../static/images/about.png" mode=""></image>
		<view class="item">
			<text class="title">时空存力商城能为您做什么？</text>
			<text class="content">
				矿机购买、矿机使用、矿机托管业务、矿机售后保障，时空存力商城为您提供高效、便捷的矿机一站式解决方案，您的需求就是我们的目标。我们为您整合矿圈资源、新款矿机、矿场托管及独立专业运营团队。为您提供：矿机购买+矿机托管+售后保障+推广返佣等，一站式解决方案。
			</text>
		</view>
		<view class="item">
			<text class="title">矿机销售</text>
			<text class="content">
				时空存力商城拥有优质的数字货币矿机的供货渠道比特币矿机、以太坊矿机、莱特币矿机的销售。例如：蚂蚁系列(Antminer)：S17、S15、T9、S9SE、Z11、S9i，神马矿机：M3、M20S、M10，阿瓦隆(Avalon)：921、850、852、A921，翼比特：E11、E11+、E9.3、+E10，芯动T2T,T3等优质高性价比机型。
			</text>
		</view>
		<view class="item">
			<text class="title"> 矿机托管</text>
			<text class="content">
				规模化部署-集约式管理-低廉电费-电价低廉+规模化管理+运行效率提升+完善的安防 。提供矿机托管服务，矿场按照枯水期额定发电量进行搭建，全年保障供电。时空存力商城三大矿场分别位于云南昭通、云南迪庆、湖南株洲。
			</text>
		</view>
		<view class="item">
			<text class="title">  矿机买卖，优选时空存力商城</text>
			<text class="content">
				为你提供专业贴心的服务，以不断提高服务质量为己任。 时空存力矿机商城长期服务于比特币矿机相关领域，全力协助矿工与矿商打通销售渠道，并实现共赢。开创分享、拼团、共赢的全新运营模式。
			</text>
		</view>
		<text class="txt3">时空存力矿机商城也许不能为您提供市场最低价,但能给您最好的服务。</text>
		<view class="contact">
			<view class="title">
				<text class="txt"> 联系方式</text>
				<text class="line"></text>
			</view>
			<view class="item">
				<text class='txt'>联系人：</text>
				<text class='txt2'>林经理</text>
			</view>
			<view class="item">
				<text class='txt'>联系电话：     </text>
				<text class='txt2'>18144055176</text>
			</view>
			<view class="item">
				<text class='txt'>邮箱：</text>
				<text class='txt2'>lintingxin@linglu666.com</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.about {
		padding: 0 28upx;

		.logo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 30upx;
			margin-bottom: 50upx;

			.txt {
				font-size: 34upx;
				color: #151414;
				display: block;
				margin-top: 10upx;
			}

			.logoImg {
				width: 144upx;
				height: 144upx;
			}
		}

		.descWrap {
			text-align: justify;
		}

		.desc {
			font-size: 34upx;
			color: #151414;
		}

		.aboutImg {
			width: 690upx;
			height: 348upx;
			margin: 55upx 0;
		}

		.item {
			.title {
				font-size: 36upx;
				color: #171719;
				font-weight: bold;
				display: block;
				margin-bottom: 30upx;
			}

			.content {
				font-size: 34upx;
				color: #171719;
			}

			margin-bottom: 60upx;
		}
		.txt3{
			display: block;
			font-size: 34upx;
			color: #171719;
			margin-bottom: 60upx;
		}
		.contact{
			.title{
				.txt{
					font-size: 36upx;
					color: #171719;
					font-weight: bold;
					display: block;
					z-index: 999;
				}
				.line{
					display: block;
					width: 162upx;
					height: 16upx;
					background-color: #42A2EC;
					position: relative;
					top: -20upx;
					z-index: -1;
				}
			}
			.item{
				margin-top: 40upx;
				.txt{
					font-size: 34upx;
					color: #171719;
					font-weight: 500;
					margin-right: 40upx;
				}
				.txt2{
					font-size: 34upx;
					font-weight: 500;
					color: #171719;
				}
			}
		}
	}
</style>
