import {globalLoading} from "./gloablLoading";
import axios from 'axios'

let baseURL = window.CUIT_server.API_ROOT;
let timeout=window.CUIT_server.TIMEOUT;

let http = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type":"application/json"
  }
});




// 添加请求拦截器
  http.interceptors.request.use(function (config) {

    // showFullScreenLoading()
    globalLoading.showFullScreenLoading()

    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
  http.interceptors.response.use(function (response) {
    // globalLoading.tryHideFullScreenLoading();
    setTimeout(()=>{
      // tryHideFullScreenLoading();
      globalLoading.tryHideFullScreenLoading();
    },300);

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







export let axiosHttp=http;
