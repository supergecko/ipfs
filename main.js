import Vue from 'vue'
import App from './App'
import store from './store'
import md5 from './js_sdk/md5.js'
import $ajax from "./common/ajax.js"
import service from './service.js'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.use(VueClipboard)
Vue.prototype.$md5  = md5
Vue.prototype.$ajax = $ajax
Vue.prototype.$service = service

const app = new Vue({
    ...App,
	store
})
app.$mount()
