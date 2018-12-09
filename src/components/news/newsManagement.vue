<template>
  <div class="c-main wow fadeIn" style="">
    <TableTools></TableTools>
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
          <TableTools></TableTools>
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
                <el-button @click="editNews(scope.row)" type="text" size="small">编辑</el-button>

                <el-button type="text" size="small" @click="deleteNews(scope.row)">删除</el-button>
              </template>
            </el-table-column>



          </el-table>
        </el-col>

      </el-row>

      <el-row class="panelArea">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_total">
          </el-pagination>
        </div>


      </el-row>


    </div>
  </div>
</template>

<script>

  import TableTools from  "../childComponents/tableTools";

  export default {
    name: "newsManagement",
    components:{
      TableTools,
    },
    data() {
      return {

        loading: false,
        currentPage: 1,//分页当前页
        page_total: 0,//分页 总数
        page_size: 10,//分页  一页的大小
        tableData: []

      }
    },
    methods: {
      /**
       *改变分页  页面显示条数
       * @param val
       */
      handleSizeChange(val) {
        this.page_size = val;
        this.currentPage = 1;


       this.getNewsList();

      },
      /**
       * 切换分页
       * @param val
       */
      handleCurrentChange(val) {
        this.currentPage = val;

       this.getNewsList();

      },


      getNewsList() {
        let data = {
          pageNum: this.currentPage,
          pageSize: this.page_size
        };

        this.requestApiFnc("/news/getAll", "get", data, (res) => {

          let {data: {code: status, map: {pageInfo: {list, total}},message}} = res;

          if (status === 200) {
            console.log(status, data, list, total);
            this.tableData = list;
            this.page_total=total;

          }else {
            this.ele_alert(message,"error");
          }

        })

      },
      operateDialog(){

      },

      editNews(data){
        this.$router.push({ path: '/releaseNews', query: {action:"edit",newsId: data.id }});
      },

      deleteNews(news){

        this.ele_confirm("你确定删除这篇新闻吗？",`warning`,()=>{

          console.log(news.id);
          this.requestApiFnc("/news/delete","delete",{newsId:news.id},(res)=>{
            const {data:{code,message}}=res
;
            if(code===200){
              this.tips(message,"success");
              this.getNewsList();
            }else {
              this.ele_alert(message,"error")
            }


          })

        },()=>this.tips("你已取消删除！"))

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
