import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


const store = new Vuex.Store({
  state: {

    //基础信息
    company: {
      logo: "",
      tel: "",
      qq: [],
      address:"",
      QrCode:"",
      link:[],
      beian:"",
      name: "",
    },
    isLogin:{
      state:0
    }

  },
  mutations: {
    setLogin (state,loginState) {
      state.isLogin.state=loginState;
    },

  }
});
export default store;
