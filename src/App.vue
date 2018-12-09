<template>
  <div id="app">

    <router-view></router-view>
    <!--<img src="./assets/logo.png">-->

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {

      }
    },



  };
</script>

<style lang="scss">
  @import 'assets/styles/publicStyle';
  html, body, #app,.frame-wrapper,.frame,.frame-container,.el-main{
    height: 100%;
  }
  body{
    overflow: hidden;
    background-color: #f2f2f2;
  }
  /*.el-main{*/
    /*padding: 0!important;*/
  /*}*/
</style>

