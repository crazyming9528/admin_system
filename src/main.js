// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import echarts from 'echarts' //如果改用cdn 就不在需要引入

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import 'es6-promise/auto'
import './assets/styles/element-variables.scss'
import store from './store/store.js'
import publicFunction from './publicFunction'
// import { Loading } from 'element-ui';
// import {globalLoading} from "./gloablLoading";
import axios from 'axios'
import {axiosHttp} from "./axiosInterceptor";

import 'font-awesome/scss/font-awesome.scss'


Vue.use(mavonEditor)
Vue.use(publicFunction);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axiosTools=axios;//可用于并发请求


Vue.prototype.$axios=axiosHttp;


Vue.prototype.setStorage =function (key,value) {
  sessionStorage.setItem(key, JSON.stringify(value));
};
Vue.prototype.getStorage =function (key) {
  return JSON.parse(sessionStorage.getItem(key));
};
Vue.prototype.removeStorage=function(key){
  sessionStorage.removeItem(key);
};




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
