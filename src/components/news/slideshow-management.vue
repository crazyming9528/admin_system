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
            <li>
              <div class="li_item th order">#</div>
              <div class="li_item th rank">排序</div>
              <div class="li_item th title">标题</div>
              <div class="li_item th url">跳转链接</div>
              <div class="li_item th imgUrl">图片链接</div>
              <div class="li_item th description">描述</div>
              <div class="li_item th option">操作</div>
            </li>
            <li class="li_row" v-for="(item,index) in sliderData " :key=index>
              <div class="li_item order">{{index+1}}</div>
              <div class="li_item rank"><input min="0" v-model.trim="item.rank" type="number"></div>
              <div class="li_item title"><input v-model.trim="item.title" type="text" placeholder="请输入标题"></div>
              <div class="li_item url"><input v-model.trim="item.url" type="text"
                                              placeholder="链接需加上 http:// 或 https://">
              </div>
              <div class="li_item imgUrl"><input v-model.trim="item.imgUrl" type="text" placeholder="请输入图片链接"></div>
              <div class="li_item description"><input v-model.trim="item.description" type="text" placeholder="请输入描述">
              </div>
              <div class="li_item option" :class="{'bg-green':item.status,'bg-red':!item.status}">
                <el-button v-if="item.status===0" type="text" @click="controlStatus(index)">启用</el-button>
                <el-button @click="controlStatus(index)" v-if="item.status===1" type="text">禁用</el-button>
                <el-button type="text" @click="deleteSlider(index)">删除</el-button>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row>

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
        sliderData: [

          {
            id: 1,
            rank: 0,
            title: "成信校园服务",
            url: "http://www.baidu.com",
            imgUrl: "https://www.baidu.com/img/bd_logo1.png",
            description: "这里是描述啊。",
            status: 0
          },
          {
            id: 2,
            rank: 1,
            title: "成信校园服务",
            url: "http://www.baidu.com",
            imgUrl: "https://www.baidu.com/img/bd_logo1.png",
            description: "这里是描述啊。",
            status: 1
          },
          {
            id: 3,
            rank: 5,
            title: "成信校园服务",
            url: "http://www.baidu.com",
            imgUrl: "https://www.baidu.com/img/bd_logo1.png",
            description: "这里是描述啊。",
            status: 0
          },
          {
            id: 4,
            rank: 5,
            title: "成信校园服务",
            url: "http://www.baidu.com",
            imgUrl: "https://www.baidu.com/img/bd_logo1.png",
            description: "这里是描述啊。",
            status: 0
          },
          {
            id: 5,
            rank: 5,
            title: "成信校园服务",
            url: "http://www.baidu.com",
            imgUrl: "https://www.baidu.com/img/bd_logo1.png",
            description: "这里是描述啊。",
            status: 1
          },
          {
            id: 5,
            rank: 5,
            title: "成信校园服务",
            url: "http://www.baidu.com",
            imgUrl: "https://www.baidu.com/img/bd_logo1.png",
            description: "这里是描述啊。",
            status: 1
          },
          {
            id: 5,
            rank: 6,
            title: "",
            url: "",
            imgUrl: "",
            description: "",
            status: 0
          },

        ]

      }
    },
    methods: {

      controlStatus(index) {
        let check = true;

        this.sliderData.forEach((item, i) => {
          if (i === index) {
            if (item.status === 0) {
              if (typeof this.sliderData[i].rank !== "number") {
                this.ele_alert(`序号只能是数字！`,`warning`);
                check = false;
              }
              if (this.sliderData[i].title === "" || this.sliderData[i].url === "" || this.sliderData[i].imgUrl === "" || this.sliderData[i].description === "") {
                this.ele_alert(`你必须完整填写这条轮播图数据才能启用它！`,`warning`);
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
      addSlider() {
        var temp = this.sliderData.map((item) => {
          return parseInt(item.rank);
        });

        temp.sort(function (a, b) {
          return a - b;
        });
        console.log(temp);
        this.sliderData.push({
          rank: temp[temp.length - 1] + 1,
          title: "",
          url: "",
          imgUrl: "",
          description: "",
          status: 0
        })
      },
      deleteSlider(index) {
        this.ele_confirm(`确定删除吗？`, `warning`, () => {
            this.sliderData.splice(index, 1);
            this.tips('success', '已删除，保存后生效！')
          }, () => this.tips('info', '已取消删除！')
        );
        // this.sliderData.splice(index, 1)
      },
      saveSlider() {

        let check = true;
        this.sliderData.forEach((item) => {
          if (typeof item.rank !== "number") {
            // this.tips("warning", "序号只能是数字！",`warning`);
            this.ele_alert(`序号只能是数字！`)
            check = false;
          }
          if (item.title === "" || item.url === "" || item.imgUrl === "" || item.description === "") {
            check = false;
          }
        });

        if (check) {
          this.tips("success", "保存成功！");
        }else {
          this.ele_alert(`请将轮播图数据填写完整后再保存！`,  `warning`);
        }

      }

    },
    mounted() {


    },
    created() {
      this.toTop();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  .c-main {

    .slideManage {

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
          background-color: #33a0d7;
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
          &:not(:first-child):not(:last-child):not(:nth-child(2)) {
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
