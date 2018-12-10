<template>
  <div class="componentWrapper">

    <div class="tools">
      <div v-show="search_input" class="search_wrapper">
        <input type="text" placeholder="请输入搜索内容"/>
      <button class="btn" @click="search()">搜索</button>
      </div>
      <button class="btn" @click="showSearch()"><span class="el-icon-search"></span></button>
      <button class="btn" @click="refresh()"> <span class="el-icon-refresh"></span></button>
      <button class="btn"> <span class="el-icon-download"></span></button>
      <button class="btn1" @click="toggle()"> <span class="el-icon-picture"></span></button>
    </div>


  </div>


</template>

<script>
  export default {
    name: "TableTools",
    data() {
      return {
        search_input: false
      }

    },
    methods: {


      showSearch() {
        this.search_input = !this.search_input;
      },
      search(){
        this.showSearch();
      },
      refresh(){
        console.log(this);

        this.$emit("refresh","Table Tools Require Refresh!");

      },
      toggle(){
        console.log("切换");
        this.$emit("toggleDisplay","");
      }

    },

    created() {
      console.log(`table Tools was created!`);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";
  .componentWrapper {
    display: flex;
    justify-content: flex-end;

    /*background-color: #1e7c88;*/

    .tools {
      width: 50%;
      /*background-color: #003f6b;*/
      height: 40px;
      color: white;
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      position: relative;
      .search_wrapper {
        background-color: #fefefe;
        position: absolute;
        padding: 5px;
        border-radius: 1px;
        top: 45px;
        right: 185px;
        min-height: 80px;
        z-index: 999;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .3);
        opacity: 0.9;
        text-align: right;
        input{
          height: 30px;
          line-height: 30px;
          border-radius: 2px;
          border: 1px solid #d4d4d4;
          padding: 2px 3px;
          box-sizing: border-box;
          width: 100%;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .btn{
          height: 30px;

        }
      }
      .btn {

        width: 50px;
        /*background-color: #7bbdbc;*/
        background-color: $baseColor-cyan;
        color: white;
        border: 1px solid transparent;
        border-radius: 1px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .3);
        margin: 0 5px;
        transition:  all 0.3s;

        &:hover {

            box-shadow: 0 0 8px 0 rgba(0, 0, 0, .3);
        }
        &:active{
          background-color: $baseColor3;
          box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .3);
          transform: translateY(2px);
        }
      }

      .btn1 {

        width: 50px;
        /*background-color: #7bbdbc;*/
        background-color: #67C23A;
        color: white;
        border: 1px solid transparent;
        border-radius: 1px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .3);
        margin: 0 5px;
        transition:  all 0.3s;

        &:hover {

          box-shadow: 0 0 8px 0 rgba(0, 0, 0, .3);
        }
        &:active{
          background-color: $baseColor3;
          box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .3);
          transform: translateY(2px);
        }
      }
    }
  }

</style>
