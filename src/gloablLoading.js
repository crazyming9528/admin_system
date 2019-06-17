import {Loading} from "element-ui";
import store from './store/store'
 class GlobalLoading {


  needLoadingRequestCount = 0;
  lo;

  showFullScreenLoading() {
    if (this.needLoadingRequestCount === 0) {
      this.startLoading()
    }
    this.needLoadingRequestCount++
  }

  startLoading() {
    this.lo = Loading.service({
      lock: true,
      // target: document.querySelector(".el-main"),
      text: '拼命加载中...',
      spinner:"fa fa-spinner fa-spin",
      // spinner: 'el-icon-loading',
      // background: 'rgba(0, 0, 0, 0.8)',
      background: 'transparent',

    })

    //通知vuex   请求开始 请求没有完成
    store.commit("setRequestCompleted",false);
  }

  tryHideFullScreenLoading() {
    if (this.needLoadingRequestCount <= 0) return;
    this.needLoadingRequestCount--;
    if (this.needLoadingRequestCount === 0) {
      this.endLoading()
    }
  }

  endLoading() {

    this.lo.close()

    //通知vuex   请求完成
    store.commit("setRequestCompleted",true);

  }
}


export  const globalLoading=new GlobalLoading();


