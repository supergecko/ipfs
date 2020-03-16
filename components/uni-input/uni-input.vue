<template>
	<view class="box">
		<label :class="['label',labelfocus,value?'labelfocus':'',disabled?'disabled':'']">{{msg}}</label>
		<input 
			:class="['inputitem',value?'inval':'']" 
			@focus="focus" 
			@blur="blur" 
			@input="input" 
			:type='type'
			:value="value"
			:name="name"
			:id="name"
			:password="password"
		>
	</view>
</template>

<script>
	export default {
		data() {
			var This = this;
			return {
				labelfocus:'',
				msg:This.value?This.after:This.before
			};
		},
		props: {
			type: {
				type: String,
				value: 'text'
			},
			password: {
				type: Boolean,
				value: false
			},
			name:{
				type: String,
				value: ''
			},
			before:{
				type: String,
				value: '请输入'
			},
			after:{
				type: String,
				value: '名称'
			},
			value:{
				type: String,
				value:''
			},
			disabled:{
				type:Boolean,
				value:false
			},
			errmsg:{
				type: String,
				value: ''
			}
		},
		created() {
			var This = this;
			var val = This.value;
			This.labelfocus = val ? 'labelfocus' : '';
		},
		methods:{
			focus: function (e) {
				var This = this;
				This.$emit("focus", e);
				var val = e.detail.value;
				This.labelfocus = 'labelfocus';
			},
			blur: function (e) {
				var This = this;
				This.$emit("blur", e);
				var val = e.detail.value;
				if(val!=''){
					This.labelfocus = 'labelfocus';
				}else{
					This.labelfocus = '';
					This.value = '';
				}
			},
			input: function (e) {
				var This = this;
				This.$emit("input", e);
				var val = e.detail.value;
				This.msg = val!='' ? This.after : This.before;
			}
		}
	}
</script>

<style>
.box {position: relative;height: 70px;padding: 0;margin: 0;width: 90%;display: block;}
.box .label {position: absolute;left: 0;top: 24px;font-size: 16px;color: #999;transition-duration: .2s;}
.box .label.labelfocus {top: 5px;transition-duration: .2s;font-size: 10px;color: #aaa;}
.box .inputitem {width: 100%;height: 26px; line-height: 26px;padding: 28px 0 20px 0; transition-duration: .2s;font-size:16px;color: #333;position: absolute;top: 0;left: 0;}
.box .label.labelfocus + .inputitem { transition-duration: .1s;color: #333;}
.box .inval {color: #333;}

.box .label.disabled {width: 100%;height: 70px;z-index: 10;display: block;}
</style>
