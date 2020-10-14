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
import VideoPlayer from 'vue-video-player'
import DragImage from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import './assets/style/index.less' // global css


import bus from './utils/fed-design/x-bus'
// global request
import http from './utils/fed-design/x-request'

import * as filters from './utils/fed-design/x-filters' // global request


Vue.use(bus)
// request
Vue.use(http)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
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
Vue.component('DragImage', DragImage)



Vue.config.productionTip = false

Array.prototype.pushHead = function(){
  for(var i = 0 ;i<arguments.length;i++){
    this.splice(i,0,arguments[i]);
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
