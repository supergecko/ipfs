/*
	封装uni-app请求
*/
import $store from "../store";
import service from "../service.js";

function request(params, method) {
	
	return new Promise(function(resolve, reject) {
		// if (!service.api_baseurl || !service.app_config) {
		// 	console.log('service.js 中参数配置不全');
		// 	reject('service.js 中参数配置不全');
		// 	return
		// }

		// 添加必要参数 根据具体业务定
		uni.request({
			url: service.api_baseurl + params.url,
			data: params.data,
			method: method,
			success(res) {
				if(res.statusCode == 200){
					if(res.data.code == 10001){
						uni.reLaunch({
						    url: '../login/login'
						});
					}
					if(res.data.code == 0){
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
					// 成功回调
					resolve(res)
				}
			},
			fail() {
				uni.showToast({
					title: '系统繁忙,请稍后重试',
					icon: "none"
				})
				// 失败回调
			},
			complete() {
				// 无论成功或失败 只要请求完成的 回调
			}
		})
	})
};
export default {
	async get(params) {
		return await request(params, "GET")
	},
	async post(params) {
		return await request(params, "POST")
	},

}
