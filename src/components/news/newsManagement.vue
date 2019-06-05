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
          <span class="description">新闻资讯的管理</span>
        </el-col>
      </el-row>
      <!--      <TableTools :searchInfo="searchInfo" @addData="addData" @refresh="refresh" @search="search"-->
      <!--                  @toggleDisplay="toggleDisplay()"-->
      <!--                  style="margin-bottom: 20px"></TableTools>-->
      <TableToolsBox @search="search">
        <template slot="search">
          <el-input
            maxlength="10"
            placeholder="请输入内容"
            show-word-limit
            type="text"
            v-model="textData"
          >
          </el-input>
        </template>
      </TableToolsBox>
      <div class="tableWrapper" v-if="displayInfo==='table'">
        <el-row class="panelArea">
          <el-col :span="24">
            <el-alert
              :closable="false"
              title="以下是搜索结果："
              type="info"
              v-if="this.searchData.length">
            </el-alert>
          </el-col>
        </el-row>

        <el-row class="panelArea ">
          <el-col :span="24">

            <!--:header-cell-style="{background:' #33a0d7',color:'white'}"-->
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading">

              <el-table-column
                align="center"
                label="#"
                type="index"

                width="50">
              </el-table-column>
              <el-table-column

                label="标题"
                min-width="500"
                prop="title">
              </el-table-column>

              <el-table-column

                label="作者"
                min-width="120"
                prop="authorName">
              </el-table-column>
              <el-table-column

                label="分类"
                min-width="120"
                prop="typeName">
              </el-table-column>
              <el-table-column

                label="状态"
                min-width="120"
                prop="status">
              </el-table-column>

              <el-table-column

                label="发布时间"
                min-width="150"
                prop="createTime">
              </el-table-column>
              <el-table-column

                label="阅读数"
                min-width="100"
                prop="viewCount">
              </el-table-column>
              <el-table-column

                label="点赞数"
                min-width="100"
                prop="likeCount">
              </el-table-column>

              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="editNews(scope.row)" size="small" type="text">编辑</el-button>

                  <el-button @click="deleteNews(scope.row)" size="small" type="text">删除</el-button>
                </template>
              </el-table-column>


            </el-table>
          </el-col>

        </el-row>
        <el-row class="panelArea">
          <div class="block">
            <el-pagination
              :current-page="currentPage"
              :page-size="page_size"
              :page-sizes="[10, 20, 30, 40,50]"
              :total="page_total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
          </div>


        </el-row>

      </div>


      <div class="chartWrapper" v-if="displayInfo==='chart'">
        <el-row class="panelArea">
          查询周期：<input placeholder="  按年  按月  按日" type="text">

          查询时间范围：<input placeholder=" 开始时间" type="text"> - <input placeholder="结束时间" type="text">

          <button>查询</button>

        </el-row>
        <el-row class="panelArea echartWrapper">

          <div class="echart">
            <EchartComponent subtext="新闻阅读量排行榜" title="阅读量排行榜" type="rank"></EchartComponent>

          </div>
          <div class="echart">
            <EchartComponent subtext="新闻点赞量量排行榜" title="点赞量排行榜" type="rank"></EchartComponent>
          </div>

          <div class="echart">
            <EchartComponent subtext="可以按年 按月 按天的 周期 来进行查询" title="新闻模块各周期阅读量分析-折线图" type="line"></EchartComponent>

          </div>
          <div class="echart">
            <EchartComponent subtext="可以按年 按月 按天的 周期 来进行查询" title="新闻模块各周期阅读量分析-柱状图" type="bar"></EchartComponent>
          </div>


        </el-row>

      </div>


    </div>
  </div>


</template>

<script>

  import TableTools from "../childComponents/tableTools";
  import TableToolsBox from "../childComponents/tableToolsBox";
  import EchartComponent from "../childComponents/echartComponent";

  export default {
    name: "newsManagement",
    components: {
      TableTools,
      TableToolsBox,
      EchartComponent
    },
    data() {
      return {
        displayInfo: "table",
        loading: false,
        currentPage: 1,//分页当前页
        page_total: 0,//分页 总数
        page_size: 10,//分页  一页的大小
        tableData: [],
        textData: "",
        searchInfo: [
          {name: "title", label: "标题", inputType: "text", placeholder: "请输入需要搜索的标题", value: ""},
          {name: "author", label: "作者", inputType: "text", placeholder: "请输入作者名称", value: ""},
          {name: "select", label: "订单类型", option: [{id: 0, name: "类型1"}, {id: 1, name: "类型2"}], value: ""},
          {name: "timeRange", label: "时间区间", inputType: "text", placeholder: "请输入时间区间", value: ""},
        ],
        searchData: [],

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


        if (this.searchData.length > 0) {
          this.search();
        } else {
          this.getNewsList();
        }

      },
      /**
       * 切换分页
       * @param val
       */
      handleCurrentChange(val) {
        this.currentPage = val;


        if (this.searchData.length > 0) {
          this.search();
        } else {
          this.getNewsList();
        }

      },
      resetPaging() {
        this.currentPage = 1;
        this.page_size = 10;
      },
      search(data) {
        console.log("search");
        console.log(this.textData);
        return;
        if (data) {
          this.searchData = data;
          this.resetPaging();
        }

        let title, author, timeRange, startTime, endTime;
        title = this.searchData[0];
        author = this.searchData[1];
        timeRange = this.searchData[2];

        if (!title && !author && !timeRange) {
          this.ele_alert("你没有输入任何搜索选项哦~", "warning");
          return;
        }

        if (typeof timeRange === "object" && timeRange !== null) {
          console.log(timeRange);
          startTime = Math.floor(timeRange[0] / 1000);
          endTime = Math.floor(timeRange[1] / 1000);
        }

        this.requestApiFnc("/news/getNewsByQuery", "get", {
          startTime: startTime || "",
          endTime: endTime || "",
          title,
          author,
          pageNum: this.currentPage,
          pageSize: this.page_size
        }, (res) => {
          console.log(res);
          let {data: {code: status, map: {pageInfo: {list, total}}, message}} = res;

          if (status === 200) {
            this.tableData = list.map((item) => {
              item.createTime = this.showTime(item.createTime);
              return item;
            });
            this.page_total = total;
          } else {
            this.ele_alert(message, "error");
          }
        },);
        console.log(title, author, startTime, endTime)
      },
      refresh(value) {
        this.searchData = [];
        this.getNewsList()
      },
      getNewsList() {

        let data = {
          pageNum: this.currentPage,
          pageSize: this.page_size
        };

        this.requestApiFnc("/news/getAll", "get", data, (res) => {

          let {data: {code: status, map: {pageInfo: {list, total}}, message}} = res;

          if (status === 200) {
            console.log(status, data, list, total);
            this.tableData = list.map((item) => {

              item.createTime = this.showTime(item.createTime);
              return item;
            });
            this.page_total = total;

          } else {
            this.ele_alert(message, "error");
          }

        })

      },
      operateDialog() {

      },

      editNews(data) {
        this.$router.push({path: '/releaseNews', query: {action: "edit", newsId: data.id}});
      },

      deleteNews(news) {

        this.ele_confirm("你确定删除这篇新闻吗？", `warning`, () => {

          console.log(news.id);
          this.requestApiFnc("/news/delete", "delete", {newsId: news.id}, (res) => {
            const {data: {code, message}} = res
            ;
            if (code === 200) {
              this.tips(message, "success");
              this.getNewsList();
            } else {
              this.ele_alert(message, "error")
            }


          })

        }, () => this.tips("你已取消删除！"))

      },
      toggleDisplay() {

        if (this.displayInfo === "table") {
          this.displayInfo = "chart"
        } else {
          this.displayInfo = "table"
        }

      },
      addData() {
        this.$router.push({path: "/releaseNews"});
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

    .echartWrapper {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .echart {
        width: 50%;
        height: 400px;
        padding: 5px;
        box-sizing: border-box;

      }
    }

  }
</style>
                                                                                                 
