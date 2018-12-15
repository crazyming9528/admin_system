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
    document.querySelector(".el-main").style.overflow = "hidden";//当页面纵向内容多时，，加载动画无法覆盖住全部页面，，暂未找到解决方法，暂时先这样 隐藏掉滚动条
    this.lo = Loading.service({
      lock: true,
      target: document.querySelector(".el-main"),
      text: '拼命加载中...',
      spinner: 'el-icon-loading',
      // background: 'rgba(0, 0, 0, 0.8)',
      background: 'white',

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
    document.querySelector(".el-main").style.overflow = "auto";
  }
}


export  const globalLoading=new GlobalLoading();


