import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const userID = uni.getStorageSync('userID'); // 用户ID
const userName = uni.getStorageSync('userName'); // 用户名
const userToken = uni.getStorageSync('userToken'); // 用户token
const identityId = uni.getStorageSync('identityId'); // 身份Id

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: userID ? true : false, // 是否登录
		userName: userName ? userName : '未登录', //用户名
		userToken: userToken ? userToken : {}, //token
		identityId: identityId ? identityId : {}, //身份ID
		
		underLine_address:'',//用户线下收货地址
		underLine_userName:'',//线下用户收货名字
		underLine_mobile:'',//线下用户收货电话
		underLine_flag:false,//线下地址flag
		underLine_index:-1 ,// 线下地址index
		address_id:0,//自提地址ID
		
		on_line_address:'',//线上地址(钱包地址)
		on_line_index:-1,// 线上地址(钱包地址)index
		on_line_flag:false,// 线上地址(钱包地址)flag
		wallet_id:0 //钱包地址ID
	},
	mutations: {
		login(state, userID) {
			state.userID = userID || '';
			state.hasLogin = true;
		},
		logout(state) {
			uni.clearStorageSync();
			state.userName = "";
			state.userToken = "";
			state.identityId = "";
			state.hasLogin = false;
		},
		UserName(state, userName) {
			state.userName = userName;
		},
		UserToken(state, userToken) { //钱包数组
			state.userToken = userToken;
		},
		IdentityId(state, identityId) {
			state.identityId = identityId;
		},
		UnderLineAddress(state, item) {
			state.underLine_address = item.province+item.city+item.district+item.address;
			state.underLine_userName = item.consignee;
			state.underLine_mobile = item.mobile;
			state.underLine_flag = true
			state.address_id = item.address_id
		},
		UnderLine_Index(state, index) {
			state.underLine_index = index;
		},
		onLineAddress(state, item) {
			state.on_line_address = item.address;
			state.on_line_flag = true
			state.wallet_id = item.wallet_id
		},
		onLineIndex(state, index) {
			state.on_line_index = index;
		},
	}
})

export default store
