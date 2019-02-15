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
          <span class="description">校园楼宇管理,可任意在无限极树形中添加修改为报修业务提供楼宇选择.</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">
        <el-col :span="24">
          <el-button type="primary" @click="addNewBuilding()">添加 楼宇/区域</el-button>

          <el-button type="primary" @click="test()">打印</el-button>
        </el-col>
      </el-row>
      <el-row class="panelArea">

        <el-col :span="24">

          <Tree :listData="listData"></Tree>

        </el-col>

      </el-row>

    </div>
  </div>
</template>

<script>

  import Tree from '../childComponents/tree'

  export default {
    name: "building",
    components: {
      Tree
    },
    data() {
      return {
        listData: [
          {
            title: "航空港校区",
            expansion: true,
            type: 'primary',
            child: [
              {
                title: "行政楼",
                child: [],
              },
              {
                title: "男生宿舍",
                expansion: true,
                child: [
                  {
                    title: "男生宿舍1栋",
                    child: [],
                  },
                  {
                    title: "男生宿舍2栋",
                    child: [],
                  },
                  {
                    title: "男生宿舍3栋",
                    child: [],
                  },
                  {
                    title: "男生宿舍4栋",
                    child: [],
                  },
                ],
              },
              {
                title: "女生宿舍",
                child: [],
              },
              {
                title: "体育馆",
                child: [],
              },
              {
                title: "图书馆",
                child: [],
              },
              {
                title: "1号食堂",
                child: [],
              },
              {
                title: "2号食堂",
                child: [],
              }
            ],
          },
          {
            title: "龙泉校区",
            expansion: true,
            type: 'primary',
            child: [
              {
                title: "体育馆",
                child: [],
              },
              {
                title: "图书馆",
                child: [],
              },
              {
                title: "1号食堂",
                child: [],
              },
            ],
          }
        ]
      }
    },
    methods: {
      test() {
        alert("控制台打印  当前 树形数据结构")
        let text = JSON.stringify(this.listData);
        console.log(text);
        console.log(JSON.parse(text))
      },
      addNewBuilding() {
        this.listData.forEach((item)=>{
          item.expansion = false;
        });
        setTimeout(()=>{
          this.listData.push({
            title: "未命名",
            expansion: true,
            type: 'primary',
            child: [],
          })
        },800);
      }
    }
  }
</script>

<style scoped>

</style>
