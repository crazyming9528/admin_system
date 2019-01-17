<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
          <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">轮播图管理</span>
          <span class="description">系统首页轮播图管理</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">
        <el-col :span="24">
          <ul class="slideManage">
            <li class="s-header">
              <div class="li_item th order">#</div>
              <!--<div class="li_item th rank">排序</div>-->
              <div class="li_item th title">标题</div>
              <div class="li_item th url">跳转链接</div>
              <div class="li_item th imgUrl">图片链接</div>
              <div class="li_item th description">描述</div>
              <div class="li_item th option">操作</div>
            </li>
            <li class="li_row" v-for="(item,index) in sliderData " :key=index draggable="true"
                @dragstart="drag($event,index)" @drop="drop($event,index)" @dragover='allowDrop($event)'>
              <div class="li_item order">{{index+1}}</div>
              <!--<div class="li_item rank"><input min="0" v-model.trim="item.rank" type="number"-->
                                               <!--:class="{'text-line':!item.status}"></div>-->
              <div class="li_item title"><input v-model.trim="item.newsTitle" type="text" placeholder="请输入标题"
                                                :class="{'text-line':!item.status}"></div>
              <div class="li_item url"><input v-model.trim="item.rUrl" type="text"
                                              placeholder="链接需加上 http:// 或 https://"
                                              :class="{'text-line':!item.status}">
              </div>
              <div class="li_item imgUrl"><input v-model.trim="item.imgUrl" type="text" placeholder="请输入图片链接"
                                                 :class="{'text-line':!item.status}"></div>
              <div class="li_item description"><input v-model.trim="item.remark" type="text" placeholder="请输入描述"
                                                      :class="{'text-line':!item.status}">
              </div>
              <div class="li_item option">
                <el-button v-if="item.status===0" type="text" @click="controlStatus(index)"><span
                  class="font-color-green">启用</span></el-button>
                <el-button @click="controlStatus(index)" v-if="item.status===1" type="text"><span
                  class="font-color-red">禁用</span></el-button>
                <el-button type="text" @click="deleteSlider(index)">删除</el-button>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="panelArea">

        <el-col :span="24">
          <el-button type="primary" size="small" @click="addSlider()">新增</el-button>
          <el-button type="success" size="small" @click="saveSlider()">保存</el-button>

        </el-col>

      </el-row>

    </div>
  </div>
</template>

<script>
  export default {
    name: "slideshow-management",
    data() {
      return {
        sliderData: [],
        fullscreenLoading: false
      }
    },
    methods: {

      controlStatus(index) {
        let check = true;

        this.sliderData.forEach((item, i) => {
          if (i === index) {
            if (item.status === 0) {
              // if (typeof this.sliderData[i].rank !== "number") {
              //   this.ele_alert(`序号只能是数字！`, `warning`);
              //   check = false;
              // }
              if (this.sliderData[i].newsTitle === "" || this.sliderData[i].rUrl === "" || this.sliderData[i].imgUrl === "" || this.sliderData[i].remark === "") {
                this.ele_alert(`你必须完整填写这条轮播图数据才能启用它！`, `warning`);
                check = false;
              }

              if (check) {
                item.status = 1
              }

            } else {
              item.status = 0
            }
          }
        })

      },
      getSlider() {
        this.requestApiFnc("/newsTurn/getAll", "get", null, (res) => {

          const {data: {code, map: {turn}, message, success}} = res;
          if (code !== 200) {
            this.ele_alert(message, "error");
            return;
          }
          this.sliderData = turn;

        })


      },
      addSlider() {
        // if (this.sliderData.length === 0) {

          this.sliderData.push({
            // rank: 1,
            title: "",
            url: "",
            imgUrl: "",
            remark: "",
            status: 0
          })

        // }
        // else {
        //   var temp = this.sliderData.map((item) => {
        //     return parseInt(item.rank);
        //   });
        //
        //   temp.sort(function (a, b) {
        //     return a - b;
        //   });
        //
        //   this.sliderData.push({
        //     rank: temp[temp.length - 1] + 1,
        //     newsTitle: "",
        //     rUrl: "",
        //     imgUrl: "",
        //     remark: "",
        //     status: 0
        //   })
        //
        // }

      },
      deleteSlider(index) {
        this.ele_confirm(`确定删除吗？`, `warning`, () => {
            this.sliderData.splice(index, 1);
            this.tips('已删除，保存后生效！', 'success')
          }, () => this.tips('已取消删除！', 'info')
        );
        // this.sliderData.splice(index, 1)
      },
      saveSlider() {

        let check = true;
        this.sliderData.forEach((item) => {
          // if (typeof item.rank !== "number") {
          //   this.ele_alert(`序号只能是数字！`)
          //   check = false;
          // }
          if (item.newsTitle === "" || item.rUrl === "" || item.imgUrl === "" || item.remark === "") {

            check = false;
          }
        });

        if (check) {
          // this.tips("保存成功！","success");

          this.requestApiFnc("/newsTurn/addList", "post", {
            request: this.sliderData
          }, (res) => {
            console.log(res);
            const {data: {code, map, message, success}} = res;
            if (code !== 200) {
              this.ele_alert(message, "error");
              return;
            }

            // this.tips(message,"success");
            this.ele_alert(message, "success");
            this.getSlider();


          }, error => console.log(error))


        } else {
          this.ele_alert(`请将轮播图数据填写完整后再保存！`, `warning`);
        }

      },
      drag(event, index) {

        this.moveDom = event.currentTarget;
        this.startY = event.clientY;//   拖拽开始时 的y位置
        event.dataTransfer.setData('index', index);
        console.log(index);
      },
      drop(event, index) {

        event.preventDefault();
        let startIndex = parseInt(event.dataTransfer.getData('index'));
        let currentIndex = parseInt(index);
        console.log("start", startIndex);
        console.log("drop", currentIndex);

        // if (startIndex - currentIndex === 1) {
        //   this.sliderData.splice(currentIndex+1,0,this.sliderData[currentIndex]);
        //   this.sliderData.splice(currentIndex+1,0,this.sliderData[startIndex+1]);
        //   this.sliderData.splice(currentIndex+3,1);
        //   this.sliderData.splice(currentIndex,1);
        // }else
          if(startIndex - currentIndex > 0){

          console.log("大于");
          this.sliderData.splice(currentIndex, 0, this.sliderData[startIndex]);
          console.log("删除" + startIndex + 1);
          this.sliderData.splice(startIndex + 1, 1)

        }else if(startIndex - currentIndex < 0){

          console.log("小于");
          this.sliderData.splice(currentIndex + 1, 0, this.sliderData[startIndex]);
          this.sliderData.splice(startIndex, 1)

        }else {
            console.log("什么也不用做");
          }
        
        // if (startIndex-currentIndex === 1){
        //   let str =JSON.stringify(this.sliderData[startIndex]);
        //   this.sliderData[startIndex]= this.sliderData[currentIndex];
        //   this.sliderData[currentIndex] = JSON.parse(str);
        //   console.log(this.sliderData[startIndex]);
        //   console.log(this.sliderData[currentIndex]);
        //   return;
        // }
        //
        //
        // if (startIndex < currentIndex) {
        //   console.log("小于");
        //   this.sliderData.splice(currentIndex + 1, 0, this.sliderData[startIndex]);
        //   this.sliderData.splice(startIndex, 1)
        // } else if (startIndex > currentIndex) {
        //   console.log("大于");
        //   this.sliderData.splice(currentIndex + 1, 0, this.sliderData[startIndex]);
        //   console.log("删除"+startIndex + 1);
        //   this.sliderData.splice(startIndex + 1, 1)
        // } else if (startIndex === currentIndex) {
        //   console.log("en.... 啥都没有发生")
        //
        // }



      },
      allowDrop(event) {
        event.preventDefault();
        // event.currentTarget.style.backgroundColor="orange";
        this.endY = event.clientY;
      }

    },
    mounted() {


    },
    created() {
      this.toTop();
      this.getSlider();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  .c-main {

    .slideManage {

      .s-header {
        background-color: $baseColor3;
        background-image: linear-gradient(120deg, $baseColor3 10%, #7bbdbc 70%);
        background-size: 100% 100%;
      }

      .li_row {
        transition: all 0.5s;

        &:hover {
          background-color: #ebf6fb;
        }
      }

      li {
        width: 100%;
        display: flex;
        font-size: 14px;

        .th {
          /*background-color: #33a0d7;*/
          background-color: transparent;
          color: white;

        }

        .li_item {
          text-align: center;
          height: 48px !important;
          line-height: 48px !important;
          border-right: rgb(235, 238, 245) solid 1px;
          border-left: rgb(235, 238, 245) solid 1px;
          border-bottom: rgb(235, 238, 245) solid 1px;
          box-sizing: border-box;
          border-collapse: collapse;
          /*background-color: #1e7c88;*/
          input {
            box-sizing: border-box;
            width: 98%;
            height: 95%;
            padding: 2px 2px;
            border-color: transparent;
            background-color: transparent;

          }

          &:not(:first-child):not(:last-child) {
            flex: 1;
          }

        }

        .rank, .order {
          width: 50px;
        }

        .rank, .title, .url, .imgUrl, .description, .option {
          margin-left: -1px;
        }

        .option {
          width: 100px;
        }

        .rank {
          input {
            text-align: center;
          }
        }

      }
    }

  }
</style>
