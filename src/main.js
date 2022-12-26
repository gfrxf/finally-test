import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';
//将axios挂在到Vue的实例上
Vue.prototype.$axios = axios 
import 'element-ui/lib/theme-chalk/index.css';
//根路径配置
axios.defaults.baseURL = ""
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
