<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">评论管理</span>
          <span class="description">设置评论过滤词 过滤违规内容</span>
        </el-col>
      </el-row>

      <el-row class="panelArea">
        <el-col :span="12">
          <div>
            <h5>评论过滤词设置：</h5>

            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入需要过滤的关键词"
              v-model.trim="textarea">
            </el-input>

            <el-row class="panelArea">
              <el-col :span="8">

                <el-input
                  placeholder="请输入替换词"
                  v-model.trim="replace"
                  clearable>
                </el-input>

              </el-col>
              <el-col :span="8">
                <span class="replace-tips">例如 ： **、违规内容、已屏蔽</span>
              </el-col>

            </el-row>

            <el-button @click="saveFilter()" size="small" type="primary">保存</el-button>

          </div>

        </el-col>
        <el-col :span="12">
          <div class="tips">

            <el-alert
              title="请在左侧过滤词输入框内输入需要过滤的关键词，使用英文逗号分隔开各关键词，例如：关键词1,关键词2,关键词3 用户发布的评论中包含左侧设置的关键词时，被命中的关键词将会被你设置的 替换词 替换，以此达到屏蔽违规内容的目的。"
              type="info">
            </el-alert>

          </div>
        </el-col>
      </el-row>


    </div>


  </div>
</template>

<script>
  export default {
    name: "commentManagement",
    data() {
      return {
        textarea: "",
        replace: ""
      }
    },
    methods: {

      getFilter() {


        this.requestApiFnc("/newsDiscuss/getFilter", "get", null ,(res)=>{
          const {data:{code, map:{discussFilter:{keyword,replaceWord}},message}} = res;
          if(code===200){
            this.textarea = keyword;
            this.replace = replaceWord;
          }else {
            this.ele_alert(message,"error")
          }
        })

      },
      saveFilter() {

        let keyword = [];
        let keywordString="";
        let replaceWord = this.replace;
        if (this.textarea) {
          keyword = this.textarea.split(",");
          if (keyword[keyword.length-1]===""){
            keyword.splice(keyword.length-1,1);
          }
          //变更需求  又要改成 传字符串的形式
          keywordString = keyword.join(",")
        }else {
          keywordString = "";
        }
        this.requestApiFnc("/newsDiscuss/saveFilter", "post", {
          keyword:keywordString,
          replaceWord
        },(res)=>{
          const {data:{code,map,message,success}} =res;
          if(code===200){
            this.ele_alert("过滤词库更新成功！","success");
          }else {
            this.ele_alert(message,"error")
          }
        })

      }
    },created(){
      this.getFilter();
    }
  }
</script>

<style lang="scss" scoped>

  .c-main {
    .tips {
      padding: 15px;
      padding-top: 60px;
    }

    .replace-tips {
      font-size: 12px;
      color: grey;
      box-sizing: border-box;
      padding: 15px;
    }

  }
</style>
