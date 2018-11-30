// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import echarts from 'echarts' //如果改用cdn 就不在需要引入

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import 'es6-promise/auto'
import './assets/styles/element-variables.scss'
import store from './store/store.js'
import publicFunction from './publicFunction'


Vue.use(mavonEditor)
Vue.use(publicFunction);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axiosTools=axios;


let baseURL = window.CUIT_server.API_ROOT;
let timeout=window.CUIT_server.TIMEOUT;

let http = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type":"application/json"
  }
});
Vue.prototype.$axios=http;



Vue.prototype.setStorage =function (key,value) {
  sessionStorage.setItem(key, JSON.stringify(value));
};
Vue.prototype.getStorage =function (key) {
  return JSON.parse(sessionStorage.getItem(key));
};
Vue.prototype.removeStorage=function(key){
  sessionStorage.removeItem(key);
};


Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
