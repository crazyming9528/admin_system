<template>
  <div class="componentWrapper">
    <div v-show="search_input" class="search_wrapper" ref="search_wrapper">
      <div v-for="(item,index) in searchInfo" :key="index">
        <label :for="item.name">{{item.label}}</label>
        <input v-if="item.name!=='timeRange'" autocomplete="off" :name="item.name"  v-model.trim="item.value" :type="item.inputType" :placeholder="item.placeholder"/>
        <el-date-picker
          style="width: 200px;font-size: 12px;margin:5px auto"
          v-if="item.name==='timeRange'"
          v-model="item.value"
          value-format="timestamp"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>

      </div>

      <button class="btn" @click="search()">搜索</button>
    </div>
    <div class="tools">
      <button class="btn" v-show="search_btn" ref="search_btn" @click="showSearch($event)"><span class="fa fa-search"></span></button>
      <button class="btn" @click="refresh()"> <span class="fa fa-refresh"></span></button>
      <button class="btn" @click="addFn()"><span class="fa fa-plus"></span></button>
      <button class="btn"> <span class="fa fa-download"></span></button>
      <button class="btn1" @click="toggle()"> <span class=" fa fa-bar-chart"></span></button>
    </div>


  </div>


</template>

<script>
  export default {
    name: "TableTools",
    props:{
      searchInfo:{
        type:Array,
        required:false,
      }
    },
    data() {
      return {
        search_input: false,
        search_btn:false,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        inputData:[
          // {name:"title",label:"标题",inputType:"text",placeholder:"请输入需要搜索的标题",value:""},
          // {name:"author",label:"作者",inputType:"text",placeholder:"请输入作者名称",value:""},
          // {name:"timeRange",label:"时间区间",inputType:"text",placeholder:"请输入时间区间",value:""},
        ],
        form:{}
      }

    },
    methods: {

      showSearch(e) {
        this.search_input = !this.search_input;//切换 是否 显示搜索弹框
        if(this.search_input){
          let dom = this.$refs.search_wrapper;
          dom.style.top=e.clientY+"px";
          dom.style.left=e.clientX-250+"px";
        }
        this.searchInfo.forEach((item)=>{
          item.value="";
        }) // 清空输入框
      },
      search(event){
        let value=this.searchInfo.map((item)=>{
          return item.value
        });
        this.$emit("search",value);
        this.showSearch();
      },
      refresh(){
        console.log(this);
        this.$emit("refresh","Table Tools Require Refresh!");
      },
      addFn(){
        // this.$router.push({path: this.addRouterPath});
        this.$emit("addData","Table Tools Require Add!");
      },
      toggle(){
        console.log("切换");
        this.$emit("toggleDisplay","");
      },
      clickFn(e){
    console.log(e);
    if(this.$refs.search_wrapper){
      if (!this.$refs.search_wrapper.contains(e.target) && !this.$refs.search_btn.contains(e.target)) {
        // console.log(this.search_input,"sss");
        if(this.search_input){
          this.search_input=false;
        }
      }

    }

  }



    },

    created() {
      console.log(`table Tools was created!`);
      if(this.searchInfo){
        this.search_btn=true;
      } // 如果有传递搜索参数  显示搜索按钮
    },
    mounted(){
      document.addEventListener("click",this.clickFn)
    },
    destroyed(){
      document.removeEventListener("click",this.clickFn)

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";
  .componentWrapper {
    display: flex;
    justify-content: flex-end;

    /*background-color: #1e7c88;*/

    .search_wrapper {
      color:rgba(0, 0, 0, .3);
      font-size: 14px;
      text-align: left;
      width: 200px;
      background-color: #fefefe;
      position: absolute;
      padding: 5px;
      border-radius: 1px;
      min-height: 80px;
      z-index: 999;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, .3);
      opacity: 0.9;
      input{
        height: 30px;
        line-height: 30px;
        border-radius: 2px;
        border: 1px solid #d4d4d4;
        padding: 2px 3px;
        box-sizing: border-box;
        width: 200px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .btn{
        height: 30px;
        width: 50px;
        background-color: $baseColor-cyan;
        color: white;
        border: 1px solid transparent;
        border-radius: 1px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .3);
        margin: 0 5px;
        transition:  all 0.3s;

      }
    }

    .tools {
      width: 50%;
      /*background-color: #003f6b;*/
      height: 40px;
      color: white;
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
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
