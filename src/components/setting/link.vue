<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>友情链接管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">友情链接</span>
          <span class="description">管理网站的友情链接</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">
        <el-col :span="24">
          <ul class="slideManage">
            <li class="s-header">
              <div class="li_item th order">#</div>
              <div class="li_item th title">名称</div>
              <div class="li_item th url">链接</div>
              <div class="li_item th description">描述</div>
              <div class="li_item th option">操作</div>
            </li>
            <li class="li_row" v-for="(item,index) in linkData " :key=index draggable="true"
                @dragstart="drag($event,index)" @drop="drop($event,index)" @dragover='allowDrop($event)'>
              <div class="li_item order">{{index+1}}</div>
              <!--<div class="li_item rank"><input min="0" v-model.trim="item.rank" type="number"-->
              <!--:class="{'text-line':!item.status}"></div>-->
              <div class="li_item title"><input v-model.trim="item.name" type="text" placeholder="请输入站点名称"></div>
              <div class="li_item url"><input v-model.trim="item.url" type="text" placeholder="链接需加上 http:// 或 https://">
              </div>
              <div class="li_item description"><input v-model.trim="item.description" type="text" placeholder="请输入描述">
              </div>
              <div class="li_item option">
                <el-button type="text" @click="deleteLink(index)">删除</el-button>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="panelArea">

        <el-col :span="24">
          <el-button type="primary" size="small" @click="addLink()">新增</el-button>
          <el-button type="success" size="small" @click="saveLink()">保存</el-button>

        </el-col>

      </el-row>

    </div>
  </div>
</template>

<script>
  export default {
    name: "link",
    data() {
      return {
        linkData: [
          {name:'百度网',url:'wwww.baidu.com',description:'baidu'},
          {name:'百度网',url:'wwww.baidu.com',description:'baidu'},
          {name:'百度网',url:'wwww.baidu.com',description:'baidu'},
          {name:'百度网',url:'wwww.baidu.com',description:'baidu'}
        ],
        fullscreenLoading: false
      }
    },
    methods: {
      
      getLink() {
        this.requestApiFnc("/NewsTurn/getAll", "get", null, (res) => {

          const {data: {code, map: {turn}, message, success}} = res;
          if (code !== 200) {
            this.ele_alert(message, "error");
            return;
          }
          this.linkData = turn;

        })


      },
      addLink() {
        this.linkData.push({
          name: "",
          url: "",
          description: "",
        })
        

      },
      deleteLink(index) {
        this.ele_confirm(`确定删除吗？`, `warning`, () => {
            this.linkData.splice(index, 1);
            this.tips('已删除，保存后生效！', 'success')
          }, () => this.tips('已取消删除！', 'info')
        );
        // this.linkData.splice(index, 1)
      },
      saveLink() {

        return;

        let check = true;
        this.linkData.forEach((item) => {
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

          this.requestApiFnc("/NewsTurn/addList", "post", {
            request: this.linkData
          }, (res) => {
            console.log(res);
            const {data: {code, map, message, success}} = res;
            if (code !== 200) {
              this.ele_alert(message, "error");
              return;
            }

            // this.tips(message,"success");
            this.ele_alert(message, "success");
            this.getLink();


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
        //   this.linkData.splice(currentIndex+1,0,this.linkData[currentIndex]);
        //   this.linkData.splice(currentIndex+1,0,this.linkData[startIndex+1]);
        //   this.linkData.splice(currentIndex+3,1);
        //   this.linkData.splice(currentIndex,1);
        // }else
        if(startIndex - currentIndex > 0){

          console.log("大于");
          this.linkData.splice(currentIndex, 0, this.linkData[startIndex]);
          console.log("删除" + startIndex + 1);
          this.linkData.splice(startIndex + 1, 1)

        }else if(startIndex - currentIndex < 0){

          console.log("小于");
          this.linkData.splice(currentIndex + 1, 0, this.linkData[startIndex]);
          this.linkData.splice(startIndex, 1)

        }else {
          console.log("什么也不用做");
        }


      },
      allowDrop(event) {
        event.preventDefault();
      }

    },
    mounted() {

    },
    created() {
      this.toTop();
      // this.getLink();
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
