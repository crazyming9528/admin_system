<template>
  <div class="frame">
    <el-container class="frame-wrapper">
      <el-header class="frame-header">
        <div class="left wow fadeInLeft">
          <div class="logo" v-show="isCollapse"><img alt="logo" src="../assets/logo.png"/></div>
          <span>{{this.$store.getters.systemInfo.title}}</span>
          <el-tooltip class="item" content="点击这里可以展开和收起侧栏菜单~" effect="dark" manual placement="right-start" value>
            <el-button @click="toggleNav" icon="el-icon-menu" size="mini" style="margin-left: 20px;font-weight: lighter"
                       type="text">切换菜单
            </el-button>
          </el-tooltip>
        </div>
        <div class="right clearfix wow fadeInRight">
          <div class="time hidden-sm-and-down">{{nowTime | formatDate}}</div>
          <div class="userInfo">
            <div class="avatar"><img height="45" src="../assets/other-img/avatar.jpg" width="45"/></div>
            <el-dropdown trigger="click">
        <span class="el-dropdown-link">{{this.user.userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <i class="el-icon-bell"></i> 通知
                  <el-badge :value="12" class="mark"/>
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
          <el-scrollbar style="height: 100%">
          <div class="logo" v-show="!isCollapse"><img alt="logo" src="../assets/logo.png"/>
          </div>
          <el-menu :collapse="isCollapse" :default-active="activeMenuIndex" :router=true :unique-opened=true
                   @close="handleClose"
                   @open="handleOpen"
                   active-text-color="#33a0d7" background-color="#4f5254" class="el-menu-vertical-demo"
                   style="border: none;"
                   text-color="#fff">
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
                <i class="fa fa-cog"></i>
                <span>菜单</span>
              </template>
              <el-menu-item index="/repairs_order">菜单</el-menu-item>
              <el-menu-item index="/repairs_building">菜单</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="fa fa-users"></i>
                <span>用户</span>
              </template>
              <el-menu-item index="/userManagement">用户管理</el-menu-item>
              <el-menu-item index="/role">角色与权限</el-menu-item>
            </el-submenu>


            <el-submenu index="6">
              <template slot="title">
                <i class="fa fa-cog"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/config">基础信息</el-menu-item>
              <el-menu-item index="/link">友情链接</el-menu-item>
            </el-submenu>
          </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main class="frame-main">
          <el-scrollbar style="height: 100%">
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
          </el-scrollbar>

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
        nowTime: "",
        user: {}
      }
    },
    computed: {
      isLogin: function () {
        return this.$store.state.isLogin;
      },
      activeMenuIndex: function () {
        return this.$route.path;
      },
      systemInfo() {
        return this.$store.state.systemInfo;
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

        this.isCollapse = !this.isCollapse;

      }, logOff() {
        // this.$store.commit('setLogin', 0);
        this.removeStorage('login');
        this.removeStorage('user');
        this.removeStorage('r');
        this.tips("注销成功", "success");
        this.$router.push({path: "/login"});
      },

      getUserInfo() {
        const l = this.getStorage('login');
        const u = this.getStorage('user');
        if (u && l) {
          this.user = JSON.parse(this.$base64.decode(u));
          console.log(this.user);
        } else {
          // this.ele_alert("获取用户信息失败！", "error");
          this.$router.push({path: "/login"});
        }
      }

    },
    created() {
      setInterval(() => {
        // this.nowTime = this.showTime();
        this.nowTime = new Date();
      }, 1000);


      // this.getUserInfo();

    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/base';

  @keyframes bg {

    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }

  }

  .frame-header {
    overflow: hidden;
    height: 50px !important;
    color: $fontColor2;
    line-height: 50px;
    background-color: $baseColor1;
    background-image: linear-gradient(120deg, $baseColor1 10%, $baseColor3 80%); //background-image: linear-gradient(120deg, $baseColor1 10%, #7bbdbc 100%);
    background-size: 200% 100%;
    animation: bg 10s ease-in-out infinite alternate;
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
        font-weight: lighter;

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

    .fa {
      font-size: 18px;
      margin-right: 8px;
    }

    .logo {
      /*width: 100%;*/
      width: 200px;
      text-align: center;
      margin: 50px 0 50px 0;

      img {
        /*width: 40%;*/
        width: 40%;
        border-radius: 50%;
        background-color: $baseColor1;
        transition: all 0.5s;
        animation: boxShow 5s linear infinite alternate;
        cursor: pointer;
        &:hover{
          width: 50%
        }
      }

    }
  }

  .frame-main {
    padding: 0;
  }

  .page-wrapper {
    padding: 20px;
  }

  @keyframes boxShow {
    0% {
      /*box-shadow: 0 0 0px 0px #7b7b7b;*/
      background-color: $baseColor1;
      box-shadow: 0 0 10px 5px $baseColor1


    }
    100% {
      /*box-shadow: 0 0 30px 10px #7b7b7b;*/
      background-color: $baseColor3;
      box-shadow: 0 0 30px 5px $baseColor3;

    }

  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


</style>
