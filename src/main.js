import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';
//将axios挂在到Vue的实例上
Vue.prototype.$axios = axios 
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';
//根路径配置
axios.defaults.baseURL = "http://localhost:8080"
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})

// 挂在message方法
Vue.prototype.$message = Message

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
