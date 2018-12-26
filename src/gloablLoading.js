import {Loading} from "element-ui";

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

  }
}


export  const globalLoading=new GlobalLoading();


