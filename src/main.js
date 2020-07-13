import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/http.js'
import uploader from 'vue-simple-uploader'
Vue.use(uploader)

Vue.config.productionTip = false
Vue.use(ElementUI)
// 绑定到vue原型链上去
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
