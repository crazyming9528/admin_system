<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
          <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">新闻管理</span>
          <span class="description">校园新闻资讯的管理</span>
        </el-col>
      </el-row>

      <el-row class="panelArea ">
        <el-col :span="24">
          <!--:header-cell-style="{background:' #33a0d7',color:'white'}"-->
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%">

            <el-table-column
              width="50"
              type="index"

              label="#">
            </el-table-column>
            <el-table-column

              label="标题"
              min-width="500"
              prop="title">
            </el-table-column>

              <el-table-column

                label="作者"
                min-width="120"
                prop="author">
              </el-table-column>
            <el-table-column

              label="分类"
              min-width="120"
              prop="type">
            </el-table-column>
                <el-table-column

                  label="状态"
                  min-width="120"
                  prop="status">
                </el-table-column>
            <el-table-column

              label="阅读数"
              min-width="120"
              prop="viewCount">
            </el-table-column>
            <el-table-column

              label="点赞数"
              min-width="120"
              prop="likeCount">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="operateDialog('edit',scope.row)" type="text" size="small">编辑</el-button>

                <el-button type="text" size="small" @click="operateDialog('delete',scope.row)">删除</el-button>
              </template>
            </el-table-column>



          </el-table>
        </el-col>

      </el-row>


    </div>
  </div>
</template>

<script>
  export default {
    name: "newsManagement",
    data() {
      return {
        loading: false,
        tableData: []

      }
    },
    methods: {

      getNewsList() {
        let data = {
          pageNum: 1,
          pageSize: 10
        }

        this.requestApiFnc("/news/getAll", "get", data, (res) => {

          let {data: {code: status, map: {pageInfo: {list, total}}}} = res;

          if (status === 200) {
            console.log(status, data, list, total);
            this.tableData = list;

          }

        })

      },
      operateDialog(){

      }

    },
    mounted() {


    },
    created() {
      this.toTop();
      this.getNewsList();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  .c-main {

  }
</style>
