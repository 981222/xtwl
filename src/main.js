import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueJsonp from 'vue-jsonp'
import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': "application/form-data",
    'access_token': window.localStorage.getItem("token")
  }
})
Vue.use(ElementUI);
Vue.use(VueJsonp);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
