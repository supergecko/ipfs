<template>
	<view>
		<view class="p10">普通使用</view>
		<sun-tab :value.sync="index" :tabList="tabList"></sun-tab>
		<view class="p10">更换颜色</view>
		<sun-tab :value.sync="index" @change="arrayChange" :tabList="tabColorList" activeColor="#f37b1d" defaultColor="#FFFFFF" bgColor="#1e9fff"></sun-tab>
		<view class="p10">使用icon</view>
		<sun-tab :value.sync="index" :tabList="tabIconList" rangeKey="name"></sun-tab>
		<view class="p10">对象赋值</view>
		<sun-tab :value.sync="index" @change="objectChange" :tabList="tabObjectList" rangeKey="name"></sun-tab>
		<view class="p10">横向滚动</view>
		<sun-tab :value.sync="tabScrollIndex" :tabList="tabScrollList" :scroll="true"></sun-tab>
		<view class="p10">搭配滑块使用</view>
		<sun-tab :value.sync="swiperIndex" :tabList="tabSwiperList"></sun-tab>
		<swiper :current="swiperIndex" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
			<swiper-item v-for="(swiper,index) in tabSwiperList" :key="index">
				<view style="margin: 20px;background-color: #FFFFFF;text-align: center;">{{swiper}}</view>
			</swiper-item>
		 </swiper>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	export default {
		components: {
			sunTab
		},
		data() {
			return {
				index: 0,
				swiperIndex:0,
				tabList: ['选项卡一','选项卡二','选项卡三'],
				tabColorList: ['选项卡一','选项卡二','选项卡三选项卡三项卡三'],
				tabIconList: [
					{
						name: '男',
						icon: 'iconnan',
					},
					{
						name: '女',
						icon: 'iconziyuan',
					},
					{
						name: '儿童',
						icon: 'icon10',
					}
				],
				tabObjectList: [
					{
						name: '选项卡一',
						value: 1
					},
					{
						name: '选项卡二',
						value: 2
					},
					{
						name: '选项卡三',
						value: 3
					}
				],
				tabScrollIndex: 0,
				tabScrollList: ['选项卡一','选项卡二选项卡二','选项卡三','选项卡四','选项卡五选项卡五选项卡五','选项卡六','选项卡七','选项卡八'],
				tabSwiperList: ['A','B','C'],
			}
		},
		onLoad() {

		},
		methods: {
			arrayChange(e){
				console.log('数组数据返回格式');
				console.log(e);
			},
			objectChange(e){
				console.log('对象数据返回格式');
				console.log(e);
			},
			swiperChange(e){
				this.swiperIndex = e.target.current;
			}
		}
	}
</script>
<style lang="scss">
	uni-page-body{
		background-color: #f4f4f4;
	}
	.p10{
		padding: 10px;
		font-size: 16px;
	}
</style>
