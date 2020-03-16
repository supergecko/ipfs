<template>
	<view class="attention">
		<view class="item">
			<text class="title">法律声明 </text>
			<text class="txt">矿机服务在以下国家或地区被禁止:巴尔干半岛、白俄罗斯、缅甸、科特迪瓦(象牙海岸)，克里米亚-乌克兰、古巴、刚果民主共和国、伊朗、伊拉克、利比里亚、朝鲜、苏丹、叙利亚、委内瑞拉、津巴布韦、中国香港和中国大陆。请确认矿机服务在您的国家或地区是合法的。否则，您将承担一切法律后果。</text>
		</view>
		<view class="item">
					<text class="title">无法退款 </text>
					<text class="txt">按照协议规定，一旦订单已付款，将不支持退款。 </text>
				</view>
				<view class="item">
					<text class="title">定价规则 </text>
					<text class="txt">矿机服务在以下国家或地区被禁止:巴尔干半岛、白俄罗斯、缅甸、科特迪瓦(象牙海岸)，克里米亚-乌克兰、古巴、刚果民主共和国、伊朗、伊拉克、利比里亚、朝鲜、苏丹、叙利亚、委内瑞拉、津巴布韦、中国香港和中国大陆。请确认矿机服务在您的国家或地区是合法的。否则，您将承担一切法律后果。
					</text>
				</view>
				<view class="item">
					<text class="title">算力波动说明 </text>
					<text class="txt">矿机服务套餐的定价会根据数字货币价格等多因素调整。实际购买价格以用户付款时为准，后续即使价格发生变化，时空存力也不会对这个订单进行差价补偿。
					</text>
				</view>
				<view class="item">
					<text class="title">不可控风险声明 </text>
					<text class="txt">时空存力不对以下不可控风险所造成的损失负责：不能预见、不能避免或不能克服的客观事件，包括自然灾害如洪水、火山爆发、地震、山崩、火灾、被中国政府部门评定为百年不遇级别以上的风暴和恶劣气候等，政府行为和政府指令，城市级别的电网供电事故，以及社会异常事件如战争、罢工、动乱等。
					</text>
				</view>
				<view class="item">
					<text class="title">不可控风险声明 </text>
					<text class="txt">用户不得将时空存力提供的算力用于攻击网络等违法违规行为，否则时空存力有权强行收回您的算力。
					</text>
				</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.attention{
		padding: 40upx 24upx;
		padding-top: 1upx;
		border-top: 1upx solid rgb(245,245,245);
		.item{
			text-align: justify;
			.txt{
				font-size: 32upx;
				color: #171719;
				line-height: 52upx;
			}
			.title{
				// display: block;
				vertical-align:text-top;
				font-size: 36upx;
				color: #171719;
				font-weight: 500;
				display: block;
				margin: 46upx 0;
				
			}
			.title:before{
				content: '';
				display: inline-block;
				width: 8upx;
				height: 34upx;
				background-color: #42A2EC;
				position: relative;
				top: 4upx;
				margin-right: 15upx;
			}
		}
	}
</style>
