<template>
	<view class="conbox">
		
		<view class="container">
			
			<!-- 背景 -->
			<image src="../../static/img/Luckbg.png" class="cont" mode="widthFix"></image>
			<image src="../../static/img/caidai.png" class="caidai" mode=""></image>
			<view class="title">
				抽奖轮盘
			</view>
			<view class="uni-btn-icon" @tap="backClick"></view>
			<view class="header">
				<view class="rule" @tap="showRuleDialog">
					<text >规则</text>
				</view>
				
				<view class="info">
				<view class="times">
					还可抽奖： <text>{{lotteryTimes}}</text>次
				</view>
				<view class="my-prize" @click="showMyPrizeDialog">
					我的奖品<text class="lg cuIcon-right"></text>
				</view>
				</view>
				 
			</view>
			<view class="main">
				<view class="canvas-container">
					<canvas class="canvas"  canvas-id="canvas"  :style="'width:'+canvasWidth+'px;height:'+canvasHeight+'px;'"></canvas>
					<image :src="inLottery?'../../static/img/start_disabled.png':'../../static/img/start.png'" id="start" @tap="playReward" ></image>
				</view>
			</view>
			
			<view class="mission-list">
				<image class="mission-title" src="../../static/img/mission_title.png"  mode="widthFix"></image>
				<view class="title grid col-3">
					<view>内容</view>
					<view>奖励次数</view>
					<view>状态</view>
				</view>
				<view class="mission grid col-3">
					<view style="font-size: 30upx;">完成每日签到</view>
					<view>1</view>
					<view @click="_Signin">
						<text class="mission-button" :class="isSignIn?'disabled':''" @tap="signIn">{{signin_status===1?'已签到':'签到'}}</text>
					</view>
				</view>
				<!-- <view class="mission grid col-3">
					<view>做任务</view>
					<view>1</view>
					<view><text class="mission-button" @tap="mission">前往</text></view>
				</view>
				<view class="mission grid col-3">
					<view>兑换商品</view>
					<view>1</view>
					<view><text class="mission-button" @tap="integralMall">前往</text></view>
				</view> -->
			</view>
		</view>
		
		<view class="cu-modal" :class="showRule?'show':''"  @tap="hideRuleDialog">
			<view class="cu-dialog rule-dialog"> 
				<!-- 规则 -->
				<view class="rule-container" >
					<view class="title" >
						规则说明
					</view>
					<view class="g_item">
						1、用户每天签到即送1次抽奖机会，或完成对应任务获得抽奖机会，每天零时将清空获得的抽奖次数。
					</view>
					<view class="g_item">
						2、用户可以消耗10积分获取1次抽奖机会。
					</view>
					<view class="g_item">
						3、用户点击大转盘抽奖按钮，每抽一次消耗1次抽奖机会。
					</view>
					<view class="g_item">
						4、用户获得的奖品，可在我的奖品里查看。
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="showMyPrize?'show':''"  @tap="hideMyPrizeDialog">
			<view class="cu-dialog my-prize-dialog">
				<view class="title">
					我的奖品
				</view>
				<view class="itembox">
					<view class="item" v-for="(items,i) in myPrizelist" :key="i">
						<text class="left">{{items.awardsName}}</text>
						<text class="right">{{items.createTime}}</text>
					</view>
				</view>
				<view class="no-prize" v-if="myPrizelist.length==0 && showNoPrize">
					您还没有获得奖品
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var turntable = require("../../lib/turntable.js")
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				awardsList: {},//奖品列表
				lotteryTimes: 0,//原始抽奖次数
				isSignIn:false,
				showMyPrize:false,
				myPrizelist:[],
				showNoPrize:false,
				showRule:false,
				turntable:null,
				canvasWidth:0,
				canvasHeight:0,
				inLottery:false, //是否正在抽奖
				signin_status:0 // 是否签到
			}
		},
		onLoad: function() {
			var that=this;
			uni.getSystemInfo({
			    success: function (res) {
					that.canvasWidth=res.windowWidth-(res.windowWidth/100*10);
					that.canvasHeight=res.windowWidth-(res.windowWidth/100*10);
					
			        console.log(res.model); //用户手机型号
			        console.log(res.pixelRatio); // 像素比
			        console.log(res.windowWidth); // 手机屏幕宽度
			        console.log(res.windowHeight);// 手机屏幕高度
			        console.log(res.language);//编码方式
			        console.log(res.version);//版本号
			        console.log(res.platform);//机型系统(Android/IOS)
					// 获取奖品列表
					that.initdata();
					that._lotteryChance()
			    }});
			
		},
		onReady: function(e) { 
		}, 
		onPullDownRefresh:async function(){
			// 获取奖品列表
			await this.initdata();
			uni.stopPullDownRefresh();
		},
		methods: {
			// 获取抽奖次数
			_lotteryChance(){
				const user_id = uni.getStorageSync('userID')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					user_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.lotteryChance,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化用户信息
						this.lotteryTimes = res.data.data.number
						this.signin_status = res.data.data.signin_status
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			// 签到任务接口
			_Signin(){
				if (!this.hasLogin) {
					uni.reLaunch({
						url: '../login/loginPas'
					});
					return;
				}
				const user_id = uni.getStorageSync('userID')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					user_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.Signin,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化用户信息
						uni.showToast({
							title: res.data.msg,
							icon:'none',
							duration: 2000
						})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			// 查看奖品
			getMyPrize(){
				var that = this
				that.$lotteryApi.myPrizeList().then(res=>{
					that.myPrizelist = res
					that.showNoPrize=true;
				}).catch(()=>{
					that.showNoPrize=true;
				});
			},
			showRuleDialog(){
				this.showRule=true;
			},
			hideRuleDialog(){
				this.showRule=false;
			},
			showMyPrizeDialog(){
				this.getMyPrize();
				this.showMyPrize=true;
			},
			hideMyPrizeDialog(){
				this.showNoPrize=false;
				this.showMyPrize=false;
			},
			// 初始化抽奖数据
			initdata:function(){
				uni.showLoading({
					title: '加载中'
				});
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${timestamp}__elseleimaohasjer2860`)
				let params = {
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.awardsList,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化用户信息
						var that = this
						that.isSignIn=res.data.data.signInStatus
						that.awardsList = res.data.data.awardsList
						console.log(that.awardsList)
						var diskColor=[]
						for (var i = 0; i < that.awardsList.length; i++) {
							diskColor.push(that.awardsList[i].diskColor)
						} 
						
						// 画转盘
						var width=that.canvasWidth
						var height=width
						that.turntable=turntable.wheelSurf("canvas",{$this:that,list:that.awardsList,width:width,height:height,outerCircle: {
						     color: '#F95151' // 外圈颜色(可选)
						 },
						 innerCircle: {
						     color: '#B33E0A' // 里圈颜色(可选)
						 },
						 dots: ["#FBF0B0", "#FFFFFF"], // 装饰点颜色(可选)
						 // disk: diskColor, //中心奖盘的颜色，默认7彩(可选)
						 disk: ["#FAFAFA","#BCF489","#EFB88E", "#EBE993", "#82E7D4","#19BD9F", "#16B960"], //中心奖盘的颜色，默认7彩(可选)
						// disk: ["#EE904A", "#D3D03D","#8AD049", "#16B960","#19BD9F","#17ABC1", "#EB678D","#F0675D"], //中心奖盘的颜色，默认7彩(可选)
						 title: {
						     color: '#B14A29',
						     font: '13px Arial',
						     lineHeight:13
						 }})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			playReward:function(){
				this.lottery(false);
			},
			//发起抽奖
			lottery: function() {
				var that = this;
				//正在抽奖则返回
				if(that.inLottery){
					return;
				}
				that.inLottery=true;
				var angel = 360 / that.awardsList.length;
				const user_id = uni.getStorageSync('userID')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${user_id}__${timestamp}__elseleimaohasjer2860`)
				let params = {
					user_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.getAward,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化用户信息
						that.lotteryTimes=res.data.data.times;
						var awards=res.data.data.awards;
						if(typeof(awards) == "undefined"){
							uni.showModal({
							    title: '提示',
							    content: '当前抽奖次数为0，是否使用10积分兑换一次抽奖机会？',
							    success: function (res) {
							        if (res.confirm) {
										that.inLottery=false;
							            that.lottery(true);
							        } else if (res.cancel) {
										that.inLottery=false;
							        }
							    }
							});
						}else{
							var count = 0;
							// 计算奖品角度
							for (var key in that.awardsList) {
							    if (that.awardsList.hasOwnProperty(key)) {
							        if (awards.award_id == that.awardsList[key].award_id) {
							            break;
							        }
							        count++;
							    }
							}
							that.turntable.lottery(count * angel + angel / 2,function (){
								that.inLottery=false;
								uni.showModal({
								    title: '提示',
									showCancel:false,
								    content:awards.winText,
								    success: function (res) { 
								    }
								});
							});
						}
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
					that.inLottery=false
				})
			},
			signIn:function(){
			},
			mission:function(){
			},
			integralMall:function(){
			},
			backClick(){
				uni.navigateBack();
			}
		}

	}
</script>
<style scoped>
	@import '../../colorui/main.css';
	@import '../../colorui/icon.css';
	.uni-btn-icon{
		color: #fff; 
		font-size: 27px;
		position: absolute;
		top:2.5vw;
		left:2vw;
	}
	.title{
		position: relative;
		width:100%;
		text-align: center;
		padding-top:3vw;
		font-size: 18px;
		color: #fff;
	}
	
	.conbox {
		width: 750upx;
		height: 100vh;
		background-color: #FC3459;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.container,
	image.cont {
		width: 750upx;
		height: auto;
		position: relative;
	}

	image.cont {
		position: absolute;
		z-index: 0;
	}

	image.caidai {
		position: absolute;
		top: 20px;
		left: 0;
		width: 750upx;
		height: 1024upx;
	}

	.header {
		/* height: 246upx; */
		padding-top: 75upx;
		padding-bottom: 40upx;
		box-sizing: border-box;
		position: relative;
		z-index: 3;
	}
	
	.header .rule{
		padding:15upx 10upx 15upx 60upx;
		color:#FFFFFF;
		background-color: #FFC000;
		border-radius: 40upx;
		margin-left:-45upx;
		width:160upx
		
	}
	.header .info{
		padding: 100upx 30upx 0upx 30upx; 
		width:100%; 
		color:#FEE40B;
	}
		
	.header .times{
		float:left;
		font-size: 35upx;
		font-weight: bold;
	}
	.header .times text{
		color:#FFFFFF;
	}	
	
	.header .my-prize{
		float:right;
		font-size: 35upx;
		font-weight: bold;
	}
	.header .my-prize text{
		color:#FFFFFF;
	}

	/* 转盘 */
	.canvas-container {
		width: 90%;
		margin: 0 5%;
	}

	.canvas {
		/* width: 100%!important; */
	}
 
	#start{
			position: absolute;
			top: calc(50% - 15vw);
			left: 50%;
			width:18vw;
			height:29vw;
			margin-left: -9vw;
			margin-top: -4vw;
			cursor: pointer;
	}
	
	.rule-dialog{
		background-color: transparent!important;
	}

	.rule-container {
		min-height: 300upx;
		display: flex;
		flex-direction: column;
		z-index: 3;
		background-image: linear-gradient(-180deg, #F48549 0%, #F2642E 100%);
		border: 18upx solid #E4431A;
		border-radius: 16px;
		padding:30upx;
		/* box-sizing: border-box; */
		color: #fff;
	}

	.rule-container .title {
		text-align: center;
		margin-bottom: 36upx;
		font-size: 40upx;
	}

	.rule-container .g_item {
		font-size: 30upx;
		color: #FFFFFF;
		letter-spacing: 0.5px;
		text-align: justify;
		line-height: 20px;
		margin-bottom: 10px;
	}
	

	.shadowbox {
		width: 750upx;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background: rgba(0, 0, 0, .6);
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.my-prize-dialog {
		width: 600upx;
		min-height: 180upx;
		background: #FFEEDF;
		border: 10upx solid #F2692F;
		color: #333;
		font-size: 24upx;
		font-family: PingFang-SC-Medium;
		border-radius: 40upx;
		padding-bottom: 20upx;
	}

	.my-prize-dialog .title {
		font-family: PingFang-SC-Bold;
		font-size: 16px;
		color: #E4431A;
		letter-spacing: 0.57px;
		display: flex;
		padding: 36upx 0;
		justify-content: center;
	}

	.my-prize-dialog .itembox {
		max-height: 1320upx;
		overflow-y: auto;
	}

	.my-prize-dialog .item {
		width: 100%;
		height: 66upx;
		padding: 0 32upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.my-prize-dialog  .no-prize{
		padding: 40upx 0;
	}
	
	.mission-title{
		width:90%;
		margin:10px 5%;
	}
	
	.mission-list{
		position: relative;
		z-index: 3;
		text-align: center;
		color:#ffffff;
		width:90%;
		margin:0 5% 50upx 5%;
	}
	
	.mission-list .title{
		margin-top:50upx;
		background-color: #FD9383;
		border: 1upx solid #FFFFFF;
	}
	.mission-list .title view{
		border-right: 1upx solid #FFFFFF;
		padding:15upx 10upx;	
	}
	.mission-list .title view:nth-child(3){
		border-right: 0upx solid #FFFFFF;
	}
	
	
	.mission-list .mission{
		border: 1upx solid #FFFFFF;
		border-top: 0upx solid #FFFFFF;
		line-height: 60upx;
		height:100upx;
	}
	.mission-list .mission view{
		border-right: 1upx solid #FFFFFF;
		padding:20upx 10upx;	
	}
	.mission-list .mission view:nth-child(3){
		border-right: 0upx solid #FFFFFF;
	}
	
	.mission-list .mission .mission-button{
		width:100upx;
		height:50upx;
		line-height: 50upx;
		padding:5upx 10upx;
		display: inline-block;
		background-color: #FDF3AB;
		color:#FD302D;
		font-size: 30upx;
		border-radius: 8upx;
	}
	
	
	.mission-list .mission .mission-button.disabled{
		background-color: #BEBEBE;
		color: #FFFFFF;
	}
</style>
