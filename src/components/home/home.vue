<template>
  <div class="c-main">
    <el-row class="topArea  wow fadeInDown">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>欢迎来到管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>

      </el-col>
    </el-row>

    <el-row class="headArea panelArea wow fadeInDown">
      <el-col :span="24" >
        <span class="title">仪表盘</span>
        <span class="description">信息聚合中心 实时展示系统动态</span>
      </el-col>
    </el-row>

    <el-row class="dataVisualization  panelArea">
      <el-col class="dataVisualization_item dataVisualization_item1 wow fadeInLeft" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(1)"><h3>今日访问量<br/> <b>100</b><span>(人次)</span></h3>
          <div class="viewMore">查看详细</div>
        </div>
      </el-col>

      <el-col class="dataVisualization_item dataVisualization_item2 wow fadeInLeft" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(2)"><h3>本月访问量<br/> <b>1200</b><span>(人次)</span></h3>
          <div class="viewMore">查看详细</div>
        </div>
      </el-col>
      <el-col class="dataVisualization_item dataVisualization_item3 wow fadeInRight" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(3)"><h3>今日活跃用户<br/><b>20</b><span>(人)</span></h3>
          <div class="viewMore">查看详细</div>
        </div>
      </el-col>
      <el-col class="dataVisualization_item dataVisualization_item4 wow fadeInRight" :span="6" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="card" @mouseenter="displayChart(4)"><h3>本月活跃用户<br/><b>200</b><span>(人)</span></h3>
          <div class="viewMore">查看详细</div>
        </div>
      </el-col>
    </el-row>

    <el-row class="chartArea  panelArea">

      <el-col class="chart" :span="24">
        <div id="chart" style="height: 400px;width: 100%"></div>
      </el-col>


    </el-row>

    <el-row class="tableArea  panelArea">

      <el-col class="table" :span="12" :xs="24">
        <h3>待处理事项</h3>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="未查看的系统通知" name="tie">
            <span style="font-size: 12px">数据出现异常，例如：访问量突然增高、出现刷帖等情形时触发检测程序，并在这里展示提示信息!</span>

            <el-alert style="margin-top: 10px"
              title="2018-9-10 00:30 数据库定时自动备份成功！"
              type="success">
            </el-alert>



            <el-alert  style="margin-top: 10px"
              title="2018-9-9 11:30 系统访问量高于平时60%！"
              type="warning">
            </el-alert>

            <el-alert  style="margin-top: 10px"
              title="2018-9-9 10:30 检测到非法登录后台管理系统！"
              type="error">
            </el-alert>

          </el-tab-pane>
          <el-tab-pane label="待处理的举报" name="second">

            <el-table
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="内容">
              </el-table-column>
            </el-table>

          </el-tab-pane>
          <el-tab-pane label="未查看的留言" name="third"> <span style="font-size: 12px">暂无未查看的留言!</span></el-tab-pane>

        </el-tabs>


      </el-col>
      <el-col class="console" :span="12" :xs="24" style="padding-left: 150px">
        <h3 style="margin-left: -150px">控制台</h3>
        <br> <br> <br>

        <span style="font-size: 12px;margin-top: 15px;margin-bottom: 15px"> 是否开启前台访问:</span>
        <el-switch

          v-model="t1"
          active-color="#005da0"
          inactive-color="#33a0d7"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
        <br> <br>
        <span style="font-size: 12px;margin-top: 15px;margin-bottom: 15px"> 是否开启用户注册:</span>
        <el-switch

          v-model="t1"
          active-color="#005da0"
          inactive-color="#33a0d7"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
        <br> <br>
        <span style="font-size: 12px;margin-top: 15px;margin-bottom: 15px"> 是否允许游客访问:</span>
        <el-switch

          v-model="t1"
          active-color="#005da0"
          inactive-color="#33a0d7"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
        <br> <br>
        <el-button type="primary" size="mini">执行</el-button>  <el-button type="warning" size="mini"  >取消</el-button>


      </el-col>

    </el-row>

  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        getSize:"",
        arrayData: [
          {timeRange: "00:00-00:59", value: 80},
          {timeRange: "01:00-01:59", value: 20},
          {timeRange: "02:00-02:59", value: 10},
          {timeRange: "03:00-03:59", value: 10},
          {timeRange: "04:00-04:59", value: 5},
          {timeRange: "05:00-05:59", value: 3},
          {timeRange: "06:00-06:59", value: 1},
          {timeRange: "07:00-07:59", value: 6},
          {timeRange: "08:00-08:59", value: 30},
          {timeRange: "09:00-09:59", value: 32},
          {timeRange: "10:00-10:59", value: 45},
          {timeRange: "11:00-11:59", value: 47},
          {timeRange: "12:00-12:59", value: 60},
          {timeRange: "13:00-13:59", value: 120},
          {timeRange: "14:00-14:59", value: 123},
          {timeRange: "15:00-15:59", value: 189},
          {timeRange: "16:00-16:59", value: 60},
          {timeRange: "17:00-17:59", value: 100},
          {timeRange: "18:00-18:59", value: 80},
          {timeRange: "19:00-19:59", value: 70},
          {timeRange: "20:00-20:59", value: 111},
          {timeRange: "21:00-21:59", value: 90},
          {timeRange: "22:00-22:59", value: 100},
          {timeRange: "23:00-23:59", value: 69}
        ],
        unit:"人次",
        chartColor:"#005da0",
        chartTitle:"今日实时访问量图表分析",
        chartType:"line",
        activeName: 'tie',
        tableData: [{
          date: '2018-05-02',
          name: '宋波',
          address: '内容..........'
        }, {
          date: '2018-05-04',
          name: '宋宋宋',
          address: '内容..........'
        }, ],
        t1:true,
        t2:false,
        t3:true,
        t4:""

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      displayChart(i) {
        switch (i) {
          case 1:
            this.chartColor="#005da0";
            this.unit="人次";
            this.chartType="line"
            this.arrayData=[
              {timeRange: "00:00-00:59", value: 80},
              {timeRange: "01:00-01:59", value: 20},
              {timeRange: "02:00-02:59", value: 10},
              {timeRange: "03:00-03:59", value: 10},
              {timeRange: "04:00-04:59", value: 5},
              {timeRange: "05:00-05:59", value: 3},
              {timeRange: "06:00-06:59", value: 1},
              {timeRange: "07:00-07:59", value: 6},
              {timeRange: "08:00-08:59", value: 30},
              {timeRange: "09:00-09:59", value: 32},
              {timeRange: "10:00-10:59", value: 45},
              {timeRange: "11:00-11:59", value: 47},
              {timeRange: "12:00-12:59", value: 60},
              {timeRange: "13:00-13:59", value: 120},
              {timeRange: "14:00-14:59", value: 123},
              {timeRange: "15:00-15:59", value: 189},
              {timeRange: "16:00-16:59", value: 60},
              {timeRange: "17:00-17:59", value: 100},
              {timeRange: "18:00-18:59", value: 80},
              {timeRange: "19:00-19:59", value: 70},
              {timeRange: "20:00-20:59", value: 111},
              {timeRange: "21:00-21:59", value: 90},
              {timeRange: "22:00-22:59", value: 100},
              {timeRange: "23:00-23:59", value: 69}
            ];
            this.chartTitle="今日实时访问量图表分析";
            break;
          case 2:
            this.chartColor="#4270ae";
            this.unit="人次";
            this.chartType="line"
            this.arrayData=[
              {timeRange: "2018-9-1", value: 453},
              {timeRange: "2018-9-2", value: 234},
              {timeRange: "2018-9-3", value: 335},
              {timeRange: "2018-9-4", value: 310},
              {timeRange: "2018-9-5", value: 80},
              {timeRange: "2018-9-6", value: 652},
              {timeRange: "2018-9-7", value: 333},
            ]
            this.chartTitle="本月访问量图表分析";
            break;
          case 3:
            this.chartColor="#21a3b0";
            this.unit="人";
            this.chartType="bar";
            this.arrayData=[
              {timeRange: "2018-9-1", value: 453},
              {timeRange: "2018-9-2", value: 234},
              {timeRange: "2018-9-3", value: 335},
              {timeRange: "2018-9-4", value: 310},
              {timeRange: "2018-9-5", value: 80},
              {timeRange: "2018-9-6", value: 652},
              {timeRange: "2018-9-7", value: 333},
              {timeRange: "2018-9-8", value: 23},
            ]
            this.chartTitle="过去七日活跃用户数据分析";
            break;
          case 4:
            this.chartColor="#7bbdbc";
            this.unit="人";
            this.chartType="bar";
            this.arrayData=[
              {timeRange: "2018-1", value: 453},
              {timeRange: "2018-2", value: 234},
              {timeRange: "2018-3", value: 335},
              {timeRange: "2018-4", value: 310},
              {timeRange: "2018-5", value: 80},
              {timeRange: "2018-6", value: 652},
              {timeRange: "2018-7", value: 333},
              {timeRange: "2018-8", value: 23},
              {timeRange: "2018-9", value: 223},
              {timeRange: "2018-10", value: 456},
            ]
            this.chartTitle="本年度各月份活跃用户数据分析";
            break;
        }

        this.drawChart();
      },
      drawChart(afresh) {

        let a=this.arrayData;
        // console.log(a);
        let t=[];
        let v=[];
        for (let i = 0; i < a.length; i++) {
          t.push(a[i].timeRange);
          v.push(a[i].value);
        }
        //
        // console.log(t);
        // console.log(v);




        let chartPanel = this.$echarts.init(document.getElementById('chart'));

        if (afresh) {
          //如果传入的afresh是true 表示 是重绘地图，在这里销毁掉原来的地图，重新初始化一个地图
          chartPanel.dispose();
          chartPanel = this.$echarts.init(document.getElementById('chart'));
        }else {
          chartPanel.dispose();
          chartPanel = this.$echarts.init(document.getElementById('chart'));

        }

        // 绘制图表
        chartPanel.setOption({
          animation: !afresh,//如果是重绘的地图 就关掉动画效果，这样就可以实现只在页面第一次加载的时候展示绘图动画
          title: {
            left:"center",
            text: this.chartTitle,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            }
          },
          legend: {
            data: [''+this.unit+''],
            x: 'right', // 'center' | 'left' | {number},
            y: 'top', // 'center' | 'bottom' | {number}

          },
          xAxis: {
            type: 'category',
            data: t,
            axisLabel: {
              interval: 0,
              rotate: 40,
            }

          },

          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'+this.unit,
            },
            // min:0,
            // max:1000,
            // splitNumber: 8
          },
          grid: { // 控制图的大小，调整下面这些值就可以，
            x2: 100,
            y2: 150// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
          },
          series: [{
            data: v,
            name: this.unit,
            type: this.chartType,
            // barWidth: 60,//固定柱子宽度
            barMaxWidth: 60,//柱子最大宽度
            itemStyle: {
              normal: {
                color: this.chartColor,
              }
            }

          }]
        });
      }

    },
    mounted() {

      this.drawChart();
      let width = "";
      width = document.getElementsByClassName("c-main")[0].clientWidth;


      this.getSize=setInterval(() => {
        try {


        let w = document.getElementsByClassName("c-main")[0].clientWidth;
        if (w !== width) {
          this.drawChart(true);
          // console.log("变化了");
          width = w;
        }

        }catch(e){
          console.log("Failed to get window size");
        }
      }, 1000)



    },
    beforeDestroy(){
      clearInterval(this.getSize);
    },
    created() {
      this.toTop();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  .c-main {
    overflow: hidden;

    .dataVisualization {

      .dataVisualization_item {
        padding: 15px 15px;
        .card {
          position: relative;
          box-sizing: border-box;
          padding: 5px;
          background-color: $baseColor1;
          border-radius: 3px;
          cursor: pointer;
          h3 {
            font-weight: lighter;
            color: white;
            padding: 2px;
            b {
              font-weight: bold;
              font-size: 45px;
              padding: 0 10px;
            }
            span {
              font-size: 12px;
              color: #e4e4e4;
            }
          }
          .viewMore {
            text-align: right;
            color: white;
            font-size: 12px;
          }

        }
      }

      .dataVisualization_item1 {
        .card {
          background-color: $baseColor1;
          transition: all 0.3s ;
        }
      }
      .dataVisualization_item1:hover {
        .card {
          background-color: #003f6b;
        }
      }
      .dataVisualization_item2 {
        .card {
          background-color: #4270ae;
          transition: all 0.3s ;
        }
      }
      .dataVisualization_item2:hover {
        .card {
          background-color: #31507e;
        }
      }
      .dataVisualization_item3 {
        .card {
          background-color: #21a3b0;
          transition: all 0.3s ;
        }
      }
      .dataVisualization_item3:hover {
        .card {
          background-color: #1e7c88;
        }
      }
      .dataVisualization_item4 {
        .card {
          background-color: #7bbdbc;
          transition: all 0.3s ;
        }
      }

      .dataVisualization_item4:hover {
        .card {
          background-color: #5c908f;
        }
      }

    }

    .chartArea{

    }

    .tableArea{
      .table,.console{
        padding: 15px;
      }
    }

  }
</style>
