<template>
  <div class="c-main">

    <div class="title"><h1>平台内容管理与数据系统</h1></div>
    <div class="loginWrapper ">
      <el-form :label-position="labelPosition" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="register" type="text">注册账号</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="copyright">
      <div class="logo "><img alt="" src="../../assets/logo.png"></div>
      <span>管理系统</span></div>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>


  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        labelPosition: "top",
        form: {
          username: "18581520828",
          password: "123456",
        }
      }
    },
    methods: {
      login() {

        this.$router.push({path: "/home"});
        return;
        let type = "";

        //判断是电话还是邮箱
        // if (isNaN(this.username)){
        //   type ="email"
        // }else {
        //   type = "phone"
        // }
        this.requestApiFnc("/login", 'post2', {
          username: this.form.username + "_phone",
          password: this.form.password,
        }, (res) => {
          console.log(res.data.map.token);
          this.setStorage("login", this.$base64.encode(res.data.map.token));
          this.tips("登录成功", "success");
          // this.$router.push({path: "/home"});
          this.getUserInfo();
        });


      },
      getUserInfo() {
        this.requestApiFnc("/user/getUserByToken", "get", {token: this.$base64.decode(this.getStorage('login'))}, (res) => {

          const {code, map: {user}, message} = res.data;
          if (code === 200) {

            this.setStorage('user', this.$base64.encode(JSON.stringify(user)));
            console.log(this.getStorage('user'));
            console.log(this.$base64.decode(this.getStorage('user')));
            console.log(JSON.parse(this.$base64.decode(this.getStorage('user'))));
            this.$router.push({path: "/home"});
          }


        })

      },


      register() {
        this.tips("注册还没有做", "warning");
      },

    },
    created() {

      // 使用sessionStorage模拟登录状态
      var login = this.getStorage("login");
      console.log(login);
      if (login == null || login == "0") {
        console.log("没有登录");
      } else {
        console.log("已经登录了 直接跳到首页");
        // this.$router.push({path: "/home"});
        this.getUserInfo();
      }
      // this.notify("warning","注意","账号和密码是假数据，直接点击登录即可~~")
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  @media (max-height: 650px) {
    .title{
      h1{
        font-size: 20px!important;
      }
    }
    .copyright {
      display: none;
    }
  }

  @media (max-height: 500px) {

    .loginWrapper {
      display: none;
    }
  }

  @media (max-height: 200px) {
    .title {
      display: none;
    }
  }

  @keyframes bg {

    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }

  }

  @keyframes login {

    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }

  }

  .c-main {
    width: 100%;
    height: 100%;
    min-height: 700px;
    overflow: hidden;
    position: relative;
    /*background-color: #f3f3f3;*/
    background-color: $baseColor1;
    background-image: linear-gradient(120deg, $baseColor1 10%, $baseColor3 80%); //background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 100%);
    background-size: 300% 100%;
    animation: bg 10s ease-in-out infinite alternate;


    .title {
      position: absolute;
      top: 15%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      animation: op 4s ease-in-out 1;
      text-align: center;

      h1 {
        color: white;
        font-weight: lighter;
        font-size: 30px;
      }
    }

    .loginWrapper {


      background-color: white;


      width: 400px;
      height: 300px;
      max-width: 80%;
      color: $baseColor1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-60%);
      border-radius: 2px;
      z-index: 999;
      padding: 10px;
      box-sizing: border-box;

      /*animation: login 2s ease-in-out 1;*/
      animation: square2 3s ease-in-out 1;


    }


    .copyright {
      position: fixed;
      bottom: 50px;
      left: 0;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 12px;


      .logo {
        width: 100px;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }
    }


  }

  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: -160px;
    animation: square 15s infinite;
    transition-timing-function: linear;
    border-radius: 2px;
  }

  .bg-bubbles li:nth-child(1) {
    left: 10%;
  }

  .bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    animation-delay: 1s;
    animation-duration: 17s;
  }

  .bg-bubbles li:nth-child(3) {
    left: 25%;
    animation-delay: 3s;
  }

  .bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
  }

  .bg-bubbles li:nth-child(5) {
    left: 70%;
  }

  .bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    animation-delay: 2s;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    animation-delay: 6s;
  }

  .bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;

    animation-delay: 14s;
    animation-duration: 40s;
  }

  .bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    -webkit-animation-delay: 2s;
    animation-delay: 1s;
    animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    animation-delay: 10s;
  }

  @keyframes square {
    0% {

      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(-700px) rotate(600deg);
    }
  }

  @keyframes square2 {
    0% {
      opacity: 0;
      transform: translate(-50%,-40%);
    }
    100% {
      opacity: 0.8;
      transform: translate(-50%,-60%);
    }
  }

  @keyframes op {
    0% {

      opacity: 0;
    }
    100% {
      opacity: 0.8;

    }
  }

</style>
