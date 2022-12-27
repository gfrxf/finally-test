import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Axios from 'axios';
import { Message } from 'element-ui';

//将axios挂在到Vue的实例上
Vue.prototype.$axios = Axios 
import 'element-ui/lib/theme-chalk/index.css';

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
