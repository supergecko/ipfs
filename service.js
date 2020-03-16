// 管理账号信息
// const api_baseurl = 'http://ipfs.haofengshui.wang';//测试
const api_baseurl = 'http://ipfs.leimaominer.com';//线上
// const api_baseurl = 'https://www.leimaominer.com';//线上

const api_lists = {
	"userLogin":'/home/user/do_login',//登录
	"loginOut":'/home/user/logout',//退出登陆
	"homePage":'/index.php/home/index/new_index',//首页接口1
	"register":'/home/user/reg',//注册账号1
	"goodsList":'/home/goods/index',//商品列表接口1
	"sendCode":'/home/api/send_validate_code',//短信接口1
	"goodsInfo":'/home/goods/goodsInfo',//商品详情接口1
	"saveWallet":'/home/user/save_wallet',//保存电子钱包地址接口1
	"getWallet":'/home/user/getWallet',//获取电子钱包地址接口1
	"buyNow":'/home/order/buy_now',//购买矿机+电费接口1
	"saveAddress":'/home/user/save_address',//保存用户线下收货地址接口1
	"orderDataList":'/home/order/orderList',//订单详情接口1
	"myCoupon":'/home/panel/myCoupon',//我的礼券接口1
	"polularizeDetail":'/home/panel/popularizeDetail',//我的团队接口1
	"newsLlist":'/home/article/articleList',//新闻列表1
	"newsDetails":'/home/article/detail',//新闻详情1
	"myPopularize":'/home/panel/myPopularize',//我的推广1
	"controlPanel":'/home/panel/filecoin',//控制面板1
	"marquee":'/home/article/hot',//公告
	"getUserAddress":'/home/user/userAddress',//获取用户收货地址1
	"editWallet":'/home/user/editwallet',//修改电子钱包地址1
	"editAddress":'/home/user/editAddress',//修改收货地址接口
	"isBindMine":'/home/panel/isBindMine ',//是否绑定矿池
	"bindMine":'/home/panel/bindMine',//绑定矿池
	"orderDetail":'/home/order/orderDetail',//订单详情
	"jackpotIndex":'/home/jackpot/index',//奖池列表
	"deleteUserAddress":'/home/user/deleteUserAddress',//删除用户收货地址
	"deleteWalletAddress":'/home/user/delete_wallet_address',//删除钱包地址
	"shouhuo":'/home/order/orderFinished',//确认收货
	"buyElectricityDetail":'/home/order/buyElectricityDetail',//电费订单充值/详情接口
	"buyElectricityCost":'/home/order/buyElectricityCost',//电费购买接口
	"identityAuthentication":'/home/user/identityAuthentication',//上传身份信息
	"identityAuthenticationExist":'/home/user/identityAuthenticationExist',//用户是否实名验证
	"file_post":'/home/ueditor/imageUp',//上传照片
	"mobileOrderList":'/home/order/mobileOrderList',//我的订单接口-手机
	"Modifypassword":'/home/user/modifyPassword',//修改密码接口
	"resetPassword":'/home/user/resetPassword',//重置密码接口
	"payAgain":'/home/order/pay_again',//重新支付
	"modifyMine":'/home/panel/modifyMine',//修改矿池账户
	
	"awardsList":'/lottery/lottery/awardsList' ,// 奖品列表
	"lotteryChance":'/lottery/lottery/lotteryChance' ,// 获取抽奖次数
	"Signin":'/home/user/signin' ,//签到任务接口
	"getAward":'/lottery/lottery/getAward' ,// 中奖接口
	"myAward":'/lottery/lottery/myAward' ,// 我的奖品接口
	"withdraw":'/home/panel/withdraw_apply' ,// 申请提现
	"myTeam":'/home/panel/myTeam' // 我的团队
}

export default {
	api_baseurl,
	api_lists
}
