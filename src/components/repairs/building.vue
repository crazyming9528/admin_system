<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>设施报修</el-breadcrumb-item>
          <el-breadcrumb-item>楼宇管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">楼宇管理</span>
          <span class="description">校园楼宇管理,为报修业务提供楼宇选择.</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">
        <el-col :span="24">
          <el-button type="primary">添加 楼宇/区域</el-button>

          <el-button type="primary" @click="test()">打印</el-button>
        </el-col>
      </el-row>
      <el-row class="panelArea">

        <el-col :span="24">

          <Tree :listData="listData" ></Tree>

        </el-col>

      </el-row>

    </div>
  </div>
</template>

<script>

  import  Tree from '../childComponents/tree'
    export default {
        name: "building",
      components:{
          Tree
      },
      data(){
          return {
            listData:[
              {
                title:"航空港校区",
                expansion:true,
                type:'primary',
                child:[
                  {
                    title:"行政楼",
                    child:[],
                  },
                  {
                    title:"图书馆",
                    child:[],
                  },
                  {
                    title:"1号食堂",
                    child:[],
                  },
                  {
                    title:"2号食堂",
                    child:[],
                  },
                  {
                    title:"3号食堂",
                    child:[],
                  }
                ],
              },
              {
                title:"龙泉校区",
                expansion:true,
                type:'primary',
                child:[],
              }
          ]
          }
      },
      methods:{
        test() {
          console.log(this.listData)
        }
      }
    }
</script>

<style scoped>

</style>
