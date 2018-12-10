<template>
  <div class="componentWrapper">

<div class="chart" ref="chart">



</div>



  </div>
    
</template>

<script>
    export default {
        name: "EchartComponent",
      props:{
        title:{
          type:String,
          required:true
        },
        subtext:{
          type:String,
          required:true
        },
        type:{
          type:String,
          required:true
        }

      },
      data(){
          return{
            chartColor:"#33a0d7",
            // title:"新闻阅读量排行",
            // subtext:"这里是描述文字",
            // type:"rank"

          }
      },
      methods:{

          drawChart(){



            const chartPanel = this.$echarts.init(this.$refs.chart);
            let option={};
            switch (this.type) {
              case "bar":
                 option=this.barChart();
                break;
              case "line":
                option=this.lineChart();
                break;
              case "rank":
                option=this.rankChart();
            }

            chartPanel.setOption(option);

          },

          barChart(){

            return  {
              title: {
                text: this.title,
                subtext: this.subtext,
              },
              grid: {
                show:true,
                top:80,
                bottom:40,
              },
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: this.chartColor,
                  }
                }
              }]
            }

    },
        rankChart() {
          return {
            title: {
              text: this.title,
              subtext: this.subtext,
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['2018年']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: ['新闻标题123', '新闻标题123', '新闻标题123', '新闻标题123', '新闻标题123', '新闻标题123']
            },
            series: [
              {
                name: '2018年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230],
                itemStyle: {
                  normal: {
                    color: this.chartColor,
                  }
                }
              },

            ]


          }
        },
        lineChart(){
            return {
              title: {
                text: this.title,
                subtext: this.subtext,
              },
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                itemStyle: {
                  normal: {
                    color: this.chartColor,
                  }
                }
              }]
            };
        }

      },
      mounted(){

          this.drawChart();





      },
      created(){

      }
    }
</script>

<style lang="scss" scoped>

  .componentWrapper{
    height: 100%;
    .chart{
      width:100%;
      height: 100%;
      background-color: #f9f9f9;
    }

  }

</style>
