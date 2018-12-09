<template>
  <div class="componentWrapper">

    <div class="tools">
      <div v-show="search_input" class="search_wrapper">
        <input type="text" placeholder="请输入搜索内容"/>
      <button class="btn" @click="search()">搜索</button>
      </div>
      <button class="btn" @click="showSearch()">搜索</button>
      <button class="btn" @click="refresh()">刷新</button>
      <button class="btn">导出</button>
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

      }

    },

    created() {
      console.log(`table Tools was created!`);
    }
  }
</script>

<style lang="scss" scoped>

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
        background-color: #fcfcfc;
        position: absolute;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 2px;
        top: 0;
        right: 180px;
        min-height: 80px;
        z-index: 999;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, .3);
        opacity: 0.95;
        text-align: right;
        input{
          height: 30px;
          line-height: 30px;
          border-radius: 2px;
          border: 1px solid #d4d4d4;
          padding: 2px 5px;
          box-sizing: border-box;
          width: 100%;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .btn{
          height: 28px;
        }
      }
      .btn {

        width: 50px;
        /*background-color: #7bbdbc;*/
        background-color: #a4ddd9;
        color: white;
        border: 1px solid transparent;
        border-radius: 2px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .3);
        margin: 0 5px;
        transition:  all 0.5s;

        &:hover {
          color: white;
          background-color: #7bbdbc;
        }
      }
    }
  }

</style>
