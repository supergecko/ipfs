<template>
	<view class="QS-segmented-control" :style="{
		'z-index': zIndex,
		'font-size': getFontSize + 'rpx',
		'background-color': getBgColor,
		'transition-duration': getDuration + 's'
		}">
		<scroll-view 
		scroll-x 
		class="QS-segmented-control-scroll"
		:scroll-left="left"
		scroll-with-animation
		:style="{ 
			'z-index': (Number(zIndex) + 1)
		}">
			<view 
			class="QS-segmented-control-scroll-item "
			:style="{
				'height': getHeight + 'rpx', 
				'line-height': getHeight + 'rpx',
				'width': getWidth + 'rpx',
				'color': index===getCurrent?getActiveColor:getDefaultColor,
				'transition-duration': getDuration + 's',
				'z-index': (Number(zIndex) + 2)
			}" 
			v-for="(item, index) in getTabs" :key="index" @tap="emit(index)">
				<!-- line1 -->
				<view 
				v-if="animationMode==='line1'" 
				class="boxStyle" 
				:style="getDurationStyle +( index===getCurrent?getActiveStyle:getDefaultStyle)"></view>
					{{item.name || item}}
			</view>
			<!-- itemBackground -->
			<view 
			v-if="hasItemBackground"
			class="itemBackgroundBox"
			:style="getItemBackgroundBoxStyle" >
				<view 
				class="itemBackground"
				:style="getItemBackgroundStyle"/>
			</view>
			<!-- line2 -->
			<view v-if="animationMode==='line2'" class="boxStyle2" :style="getLinezIndex + getDurationStyle + getBoxStyle2" />
		</scroll-view>
	</view>
</template>

<script>
	const { screenWidth } = uni.getSystemInfoSync();
	export default {
		props:{
			tabs: {	//需循环的标签列表
				type: Array,
				default() {
					return [];
				}
			},
			current: {	//当前所在滑块的 index
				type: Number,
				default: 0
			},
			height: {	//QS-tabs的高度和行高
				type: [String, Number],
				default: 80
			},
			width: {	//单个tab的宽度
				type: [String, Number],
				default: 250
			},
			fontSize: {	//字体大小
				type: [String, Number],
				default: 30
			},
			duration: {	//过渡动画时长, 单位 s
				type: [String, Number],
				default: .5
			},
			activeColor: {	//选中项的主题颜色
				type: String,
				default: '#33cc33'
			},
			defaultColor: {	//未选中项的主题颜色
				type: String,
				default: '#888'
			},
			animationLineWidth: {	//动画线条的宽度
				type: [String, Number],
				default: 20
			},
			line2Style: {	//line2线条的样式
				type:String,
				default: 'height: 8rpx;border-radius: 4rpx;'
			},
			animationMode: {	//动画类型
				type:String,
				default: 'line1'
			},
			autoCenter: {	//是否自动滚动至中心目标
				type: Boolean,
				default: true
			},
			autoCenterMode: {	//滚动至中心目标类型
				type: String,
				default: 'component'
			},
			activeStyle: {	//line1模式选中项的样式
				type: String,
				default: 'bottom:0;left:50%;transform: translate(-50%,-100%);height: 8rpx;border-radius:4rpx;'
			},
			defaultStyle: {	//line1模式未选中项的样式
				type: String,
				default: 'bottom:0;left:50%;transform: translate(-50%,-100%);height: 8rpx;border-radius:4rpx;'
			},
			backgroundColor: {	//统一背景颜色
				type: String,
				default: 'rgba(255,255,255,0)'
			},
			hasItemBackground: {	//是否开启背景追光
				type: Boolean,
				default: false
			},
			itemBackgroundColor: {	//统一追光背景颜色
				type: String,
				default: 'rgba(255,255,255,0)'
			},
			itemBackgroundStyle: {	//追光样式
				type: String,
				default: ''
			},
			zIndex: {	//css的z-index属性值
				type: [String,Number],
				default: 99
			}
		},
		computed: {
			getCurrent() {
				if(this.current > (this.getTabs.length-1)) {
					return (this.getTabs.length-1)
				}
				return this.current;
			},
			getTabs() {
				return this.tabs;
			},
			getHeight() {
				return this.height;
			},
			getWidth() {
				return this.width;
			},
			getFontSize() {
				return this.fontSize;
			},
			getDuration() {
				return this.duration;
			},
			getBgColor() {
				const defaultColor = this.backgroundColor || 'rgba(255,255,255,0)';
				if(this.getTabs[this.getCurrent] instanceof Object) {
					return this.getTabs[this.getCurrent].backgroundColor || defaultColor;
				}else{
					return defaultColor;
				}
			},
			getItemBackgroundColor() {
				const defaultColor = this.itemBackgroundColor || 'rgba(255,255,255,0)';
				if(this.getTabs[this.getCurrent] instanceof Object) {
					return this.getTabs[this.getCurrent].itemBackgroundColor || defaultColor;
				}else{
					return defaultColor;
				}
			},
			getDurationStyle() {
				return `transition-duration: ${this.getDuration}s;`
			},
			getActiveColor() {
				let activeColor;
				if(this.getTabs[this.getCurrent] instanceof Object) {
					if(this.getTabs[this.getCurrent].activeColor) {
						activeColor = this.getTabs[this.getCurrent].activeColor;
					}else{
						activeColor = this.activeColor;
					}
				}else{
					activeColor = this.activeColor;
				}
				return activeColor;
			},
			getDefaultColor() {
				let defaultColor;
				if(this.getTabs[this.getCurrent] instanceof Object) {
					if(this.getTabs[this.getCurrent].defaultColor) {
						defaultColor = this.getTabs[this.getCurrent].defaultColor;
					}else{
						defaultColor = this.defaultColor;
					}
				}else{
					defaultColor = this.defaultColor;
				}
				return defaultColor;
			},
			getActiveStyle() {
				return `width:${this.animationLineWidth}%;background-color:${this.getActiveColor};${this.activeStyle}`;
			},
			getDefaultStyle() {
				return `width:0;background-color:${this.getActiveColor};${this.defaultStyle}`;
			},
			getLinezIndex() {
				return `z-index: ${Number(this.zIndex)+2};`;
			},
			getBoxStyle2() {
				if(this.animationMode === 'line2') {
					const lineWidth = Number(this.line2Width);
					const lw = this.width*(lineWidth/100);
					const x = this.width*(this.getCurrent + 1) - this.width/2 - lw/2;
					return `transform:translate(${x}rpx, -100%);width:${lw}rpx;background-color: ${this.getActiveColor};${this.line2Style}`;
				}
			},
			getItemBackgroundBoxStyle() {
				return `height: ${this.getHeight}rpx;
						width: ${this.getWidth}rpx;
						z-index: ${(Number(this.zIndex) + 1)};
						transition-duration: ${this.getDuration}s;
						transform: translateX(${this.width*(this.getCurrent)}rpx);`
			},
			getItemBackgroundStyle() {
				return `transition-duration: ${this.getDuration}s;
						background-color: ${this.getItemBackgroundColor};
						box-shadow: 0 0 5rpx 5rpx ${this.getItemBackgroundColor};
						${this.itemBackgroundStyle};`
			}
		},
		watch: {
			current(n, o) {
				this.change(n);
			}
		},
		data() {
			return {
				left: 0,
				line2Width: this.animationLineWidth,
				setTimeoutFc: null,
				componentsWidth: 0
			}
		},
		// #ifndef H5
		onReady() {
			this.getQuery(()=>{
				this.countScrollX();
			});
		},
		// #endif
		// #ifdef H5
		mounted() {
			this.getQuery(()=>{
				this.countScrollX();
			});
		},
		// #endif
		methods: {
			emit(index) {
				this.$emit('change', index);
			},
			change() {
				this.countScrollX();
				if(this.animationMode === 'line2') {
					this.line2Width = 2;
					if(this.setTimeoutFc) clearTimeout(this.setTimeoutFc);
					this.setTimeoutFc = setTimeout(()=>{
						this.line2Width = this.animationLineWidth;
					}, this.getDuration*1000*3/5);
				}
			},
			getQuery(cb) {
				try{
					let view = uni.createSelectorQuery().in(this).select('.QS-segmented-control-scroll');
					view.fields({
						size: true
					}, data => {
						if(data) {
							this.componentsWidth = data.width;
							if(cb && typeof cb === 'function') cb(data);
						}else{
							this.retryGetQuery(cb);
						}
					}).exec();
				}catch(e){
					//TODO handle the exception
					this.componentsWidth = screenWidth;
				}
			},
			retryGetQuery() {
				try{
					let view = uni.createSelectorQuery().select('.QS-segmented-control-scroll');
					view.fields({
						size: true
					}, data => {
						if(data) {
							this.componentsWidth = data.width;
						}else{
							this.componentsWidth = screenWidth;
						}
						if(cb && typeof cb === 'function') cb(data);
					}).exec();
				}catch(e){
					//TODO handle the exception
					this.componentsWidth = screenWidth;
				}
			},
			countScrollX() {
				if(this.autoCenter) {
					const width = Number(this.width);
					const itemWidth = width/750*screenWidth;
					let left = itemWidth*(this.getCurrent+1) - itemWidth/2;
					let fatherWidth;
					if(this.autoCenterMode === 'window') {
						fatherWidth = screenWidth;
					}else{
						fatherWidth = this.componentsWidth;
					}
					this.left = left -  fatherWidth/2;
				}
			}
		}
	}
</script>

<style scoped>
	view,scroll-view{
		box-sizing: border-box;
	}
	.QS-segmented-control{
		width: 100%;
		transition-property: background-color,color;
	}
	.QS-segmented-control-scroll {
		width: 100%;
		white-space: nowrap;
		position: relative;
	}
	.QS-segmented-control-scroll-item{
		position: relative;
		display: inline-block;
		text-align: center;
		transition-property: background-color,color;
		padding: 0 20rpx;
	}
	.content{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.boxStyle{
		pointer-events: none;
		position: absolute;
		transition-property: all;
	}
	.boxStyle2{
		pointer-events: none;
		position: absolute;
		bottom:0;
		left: 0;
		transition-property: all;
	}
	.itemBackgroundBox{
		pointer-events: none;
		position: absolute;
		top:0;
		left: 0;
		transition-property: transform,background-color;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.itemBackground{
		height: 100%;
		width: 100%;
		transition-property: all;
	}
</style>
