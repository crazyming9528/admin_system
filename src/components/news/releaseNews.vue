<template>
  <div class="c-main wow fadeIn"  style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
          <el-breadcrumb-item>发布新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

    <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
      <el-col :span="24">
        <span class="title">发布新闻</span>
        <span class="description">发布校园新闻资讯</span>
      </el-col>
    </el-row>


      <el-row class="panelArea ">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item style="position: relative">
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :multiple="false"
              :limit="1"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.type" placeholder="请选择分类">
              <el-option label="分类一" value="shanghai"></el-option>
              <el-option label="分类二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input type="textarea" v-model="form.digest"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <mavon-editor style="height: 400px"  ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" @change="getHtmlContent" v-model="form.content"></mavon-editor>
            <!--<el-input type="textarea" v-model="form.content"></el-input>-->
          </el-form-item>

          <el-form-item label="选项">
            <el-checkbox-group v-model="form.option">
              <el-checkbox label="允许评论" name="discuss"></el-checkbox>
              <el-checkbox label="置顶" name="top"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">发布资讯</el-button>
            <el-button type="success" size="small" @click="onSubmit">保存草稿</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>

      </el-row>



    </div>

  </div>
</template>

<script>
  export default {
    name: "releaseNews",
    data() {
      return {
        uploadUrl:window.CUIT_server.API_ROOT+"/user/uploadImg",
        form: {
          title: '',
          firstImg:"",
          type: '',
          digest:"摘要",
          content:"",
          contentHtml:"",
          option:["允许评论"]
        },

      }
    },
    methods: {

      $imgDel(pos){
        delete this.img_file[pos];
      },
      $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        let formdata = new FormData();
        formdata.append('file', $file);
        console.log(formdata.get("file"));
        this.$axios({
          url: '/user/uploadImg',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          console.log(res);
         let url= window.CUIT_server.API_ROOT+"/"+res.data.map.url;
          this.$refs.md.$img2Url(pos, url);
        }).catch((error)=>{
          // console.log(error);
          // this.$refs.md.$img2Url(pos, "https://www.baidu.com/img/bd_logo1.png");
        })

      },

     getHtmlContent(value,render){
        this.form.contentHtml=render;

     },


      onSubmit() {
        console.log(this.$refs.md);

        this.$axios.post("/news/add",{

            title:this.form.title,
            author:"crazyming",
            type:"默认",
            digest:this.form.digest,
            firstImg:this.form.firstImg,
            content:this.form.content,
            contentHtml:this.form.contentHtml,

        }).then((res)=>{
          console.log(res);
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      uploadSuccess(response, file, fileList){
        console.log(response,file,fileList)
        this.form.firstImg = window.CUIT_server.API_ROOT+"/"+response.map.url;
        console.log(this.form.firstImg);
      },
      uploadError(err, file, fileList){
        console.log(err,file,fileList)
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



  }
</style>
