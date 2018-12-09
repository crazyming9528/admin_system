<template>
<div class="c-main">




<div class="loginWrapper ">
  <div class="logo "><img src="../../assets/logo.png" alt=""></div>
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="formLabelAlign.password"></el-input>
    </el-form-item>
    <el-form-item  label="">
      <el-button  type="primary" @click="login">登录</el-button>
      <el-button  type="text" @click="register">注册账号</el-button>
    </el-form-item>
  </el-form>
  <div class="copyright"><span>CUIT Campus Services Management System </span></div>
</div>



</div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{
            labelPosition:"top",
            formLabelAlign: {
              username:"test",
              password:"admin",
            }
          }
      },
      methods:{
          login(){
            this.setStorage("login","1");
           this.tips("登录成功","success");
            this.$router.push({path: "/home"});
          },

        register(){
          this.tips("注册还没有做","warning");
        },

      },
      created(){

        // 使用sessionStorage模拟登录状态
        var login = this.getStorage("login");
        console.log(login);
        if(login==null || login=="0"){
          console.log("没有登录");
        }else {
          console.log("已经登录了 直接跳到首页");
          this.$router.push({path: "/home"});
        }
         // this.notify("warning","注意","账号和密码是假数据，直接点击登录即可~~")
      }
    }
</script>

<style lang="scss"  scoped>
  @import "../../assets/styles/base";

  @keyframes bg{

    0%{
      background-position: 0 0;
    }
    100%{
      background-position: 100% 0;
    }

  }

  @keyframes login{

    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }

  }
.c-main{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  /*background-color: #f3f3f3;*/
  background-color: $baseColor1;
  background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 80%);//background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 100%);
  background-size: 300% 100%;
  animation: bg 10s ease-in-out infinite  alternate;


  .loginWrapper{

    .logo{
      position: absolute;
      top:0%;
      left: 50%;
      width: 100px;
      height: 100px;
      transform: translate(-50%,-50%);
      z-index: 100;
      img{
        width: 100%;
        height: 100%;
      }
    }

  background-color: white;
    padding: 15px;
    border-radius: 5px;
    width: 300px;
    height: 260px;
    color: $baseColor1;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin-top: -5%;
    transition: all 0.5s;
    animation: login 2s ease-in-out 1;

    .copyright{

      position: absolute;
      bottom: -80px;
      left: 0;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 12px;
      opacity: 0.8;
    }

  }
  .loginWrapper:hover{
    box-shadow: 1px 5px  30px 0px #6e6e6e;

  }






}

  </style>
