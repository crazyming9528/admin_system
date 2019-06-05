import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


const store = new Vuex.Store({
  state: {

    //基础信息
   systemInfo:{
     title: "后台管理系统", // 网站标题
     logo: "", // 网站标志
     slogan: "", // 网站口号
     keyword: "", // 网站关键词
     remark: "", // 网站描述
     login: 0, // 是否允许登录   0 false  1 true
     open: 0, // 是否开启网站  0 false  1 true
     register: 0, // 是否允许注册  0 false  1 true
   },
    userInfo:{
      name:""

    },
    isLogin:{
      state:0
    }

  },
  getters:{
    systemInfo:(state)=>{
      return state.systemInfo;
    }

  },
  mutations: {
    setLogin (state,loginState) {
      state.isLogin.state=loginState;
    },
    setSystem(state,info){
      let sy =state.systemInfo;
      for (let item in sy){
        if (sy.hasOwnProperty(item)){
          sy[item] = info[item];
        }
      }


    }

  }
});
export default store;
