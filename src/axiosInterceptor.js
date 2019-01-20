import {globalLoading} from "./gloablLoading";
import axios from 'axios'
import {Base64} from 'js-base64';
import router from './router'

let baseURL = window.CUIT_server.API_ROOT;
let timeout = window.CUIT_server.TIMEOUT;

let http = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json"
  }
});


// 添加请求拦截器
http.interceptors.request.use(function (config) {

  // showFullScreenLoading()
  globalLoading.showFullScreenLoading();

  console.log(config);

  let token = localStorage.getItem("login");  //从缓存中取token
  if (token) {
    config.headers.Authorization = Base64.decode(JSON.parse(token));   //将token放到请求头发送给服务器
  } else {

    //检测请求是不是登录接口
    if (config.url.indexOf("login") !== -1) {
      console.log("没有登录");
      router.push({path: "/login"});

    } else {

      console.log("登录接口 无需校验")

    }

  }


  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // globalLoading.tryHideFullScreenLoading();
  setTimeout(() => {
    // tryHideFullScreenLoading();
    globalLoading.tryHideFullScreenLoading();
  }, 300);

  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么

  globalLoading.tryHideFullScreenLoading();

  // setTimeout(()=>{
  //   // tryHideFullScreenLoading();
  //   globalLoading.tryHideFullScreenLoading();
  // },300);
  return Promise.reject(error);
});


export let axiosHttp = http;
