<template>
  <div class="componentWrapper">

    <div class="tools">

      <button class="btn"@click="showSearch()">搜索</button>
     <div class="search_wrapper"> <input v-show="search_input" type="text"></div>
      <button class="btn">刷新</button>

      <button class="btn">导出</button>
    </div>

</div>


    
</template>

<script>
    export default {
        name: "TableTools",
      data(){
          return{
            search_input:false
          }

      },
      methods:{


          showSearch(){
            this.search_input = !this.search_input;
          }

      },

      created(){
        console.log(`table Tools was created!`);
      }
    }
</script>

<style lang="scss" scoped>

  .componentWrapper{
    display: flex;
    justify-content: flex-end;
    /*background-color: #1e7c88;*/
    .tools{
      width: 50%;
      /*background-color: #003f6b;*/
      height: 48px;
      color: white;
      display: flex;
      justify-content: flex-end;
      padding: 2.5px 15px;
      box-sizing: border-box;
      .btn{
        width: 50px;
        background-color: #7bbdbc;
        color: white;
        border: 1px solid #e2e2e2;

        &:hover{
          color: #bfbfbf;
          background-color: #4caace;
        }
      }
    }
  }

</style>
