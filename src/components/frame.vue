<template>
  <div class="frame">
    <el-container class="frame-wrapper">
      <el-header class="frame-header">
        <div class="left wow fadeInLeft">
          <div class="logo" v-show="isCollapse"><img src="../assets/logo.png" alt="logo"/></div>
          <span><em>CUIT</em> 校园服务平台管理系统</span>
          <el-tooltip class="item" effect="dark" content="点击这里可以展开和收起侧栏菜单~" manual value placement="right-start">
            <el-button style="margin-left: 20px;font-weight: bold" type="text" size="mini" @click="toggleNav"
                       icon="el-icon-menu">切换菜单
            </el-button>
          </el-tooltip>
        </div>
        <div class="right clearfix wow fadeInRight">
          <div class="time hidden-sm-and-down">{{nowTime}}</div>
          <div class="userInfo">
            <div class="avatar"><img src="../assets/other-img/avatar.jpg" height="45" width="45"/></div>
            <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    song<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <i class="el-icon-bell"></i> 通知
                  <el-badge class="mark" :value="12"/>
                </el-dropdown-item>
                <el-dropdown-item>

                  <i class="el-icon-refresh"></i>
                  刷新
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-setting"></i>
                  设置
                </el-dropdown-item>

                <el-dropdown-item>
                  <i class="c-icon-user"></i>
                  <el-button @click="logOff" type="text">退出登录</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container class="frame-container">
        <el-aside class="frame-aside">
          <div class="logo" v-show="!isCollapse"><img src="../assets/logo.png" alt="logo"/></div>

          <el-menu :default-active="activeMenuIndex" :router=true style="border: none;" :unique-opened=true
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose" :collapse="isCollapse" background-color="#4f5254"
                   text-color="#fff"
                   active-text-color="#33a0d7">
            <el-menu-item index="/home">

              <i class="fa fa-home"></i>
              <span>首页</span>

            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="fa fa-newspaper-o"></i>
                <span>新闻资讯</span>
              </template>
              <el-menu-item index="/releaseNews">新闻发布</el-menu-item>
              <el-menu-item index="/newsManagement">新闻管理</el-menu-item>
              <el-menu-item index="/newsType">新闻分类</el-menu-item>
              <el-menu-item index="/comments">评论管理</el-menu-item>
              <el-menu-item index="/slideshowManagement">轮播图管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="fa fa-users"></i>
                <span>用户</span>
              </template>
              <el-menu-item index="/userManagement">用户管理</el-menu-item>
              <el-menu-item index="/role">角色与权限</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="fa fa-cog"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/config">基础信息</el-menu-item>
            </el-submenu>
          </el-menu>


        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>


      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "frame",
    data() {
      return {
        isCollapse: false,
        nowTime: ""
      }
    },
    computed: {
      isLogin: function () {
        return this.$store.state.isLogin;
      },
      activeMenuIndex: function () {
        return this.$route.path;
      }

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toggleNav() {

        if (this.isCollapse) {
          this.isCollapse = false;
        } else {
          this.isCollapse = true;
        }

      }, logOff() {
        // this.$store.commit('setLogin', 0);
        this.setStorage("login", "0");
        this.tips("注销成功","success");
        this.$router.push({path: "/login"});
      },
    },
    created() {
      setInterval(() => {
        this.nowTime = this.showTime();
      }, 1000);


      // setTimeout(()=>{
      //   this.toggleNav();
      // },3500)


      // 使用sessionStorage模拟登录状态
      var login = this.getStorage("login");
      console.log(login);
      if (login == null || login == "0") {
        console.log("没有登录");
        this.$router.push({path: "/login"});
      } else {
        console.log("模拟登录成功");
      }


    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/base';


  .frame-header {
    overflow: hidden;
    height: 50px !important;
    color: $fontColor2;
    line-height: 50px;
    background-color: $baseColor1;
    background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 80%); //background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 100%);
    background-size: 200% 100%;
    animation: bg 10s ease-in-out infinite alternate;
  }

  @keyframes bg {

    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }

  }

  .frame-header {
    .left {
      float: left;
      color: white;

      .logo {
        display: inline-block;
        width: 50px;
        height: 50px;
        position: relative;
        vertical-align: top;
        img {
          width: 50%;
          height: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      span {
        vertical-align: top;
      }
    }
    .right {
      float: right;
      .time {
        display: inline-block;
        vertical-align: top;
        color: white;
      }
      .userInfo {
        display: inline-block;
        .avatar {
          display: inline-block;
          width: 50px;
          height: 50px;
          position: relative;
          img {
            width: 50%;
            height: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .el-dropdown {
          display: inline-block;
          vertical-align: top;
          cursor: pointer;
          .el-dropdown-link {
            color: $fontColor2;
          }
        }
      }
    }
  }

  .frame-aside {
    background-color: $baseColor2;
    color: #333;
    width: auto !important;
    .fa{
      font-size: 18px;
      margin-right: 8px;
    }
    .logo {
      width: 100%;
      text-align: center;
      padding: 35px 0;
      img {
        width: 40%;
        border-radius: 50%;
        animation: boxShow 2.5s linear infinite alternate;
      }
    }
  }

  @keyframes boxShow {
    0% {
      box-shadow: 0 0 0px 0px #7b7b7b;
    }
    100% {
      box-shadow: 0 0 30px 10px #7b7b7b;
    }

  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


</style>
