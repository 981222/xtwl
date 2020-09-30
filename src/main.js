import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueJsonp from 'vue-jsonp';
import axios from 'axios';
import { error } from './utils/error'
import { filesToRar } from './utils/filesToRar'
import { Message } from 'element-ui';
import global from './components/utils/global.vue';

Vue.prototype.$http = axios.create({
  baseURL: '/api',
  headers: {
    'Access-Control-Allow-Methods': 'POST, GET',
    'Access-Control-Allow-Origin': '*',
    'X-AjaxPro-Method': 'ShowList',
    'Content-Type': "application/json",
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36',
    'access_token': window.localStorage.getItem("token"),
    post: {
      'Content-Type': "application/json",
    },
    // get: {
    //   "Accept": "application/json",
    //   'Content-Type': "application/x-www-form-urlencoded",
    // }
  }
})

Vue.prototype.$GLOBAL = global
Vue.prototype.$error = error
Vue.prototype.$filesToRar = filesToRar
Vue.prototype.$Message = Message

Vue.use(ElementUI);
Vue.use(VueJsonp);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
