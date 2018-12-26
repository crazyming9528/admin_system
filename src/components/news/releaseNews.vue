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
        <el-form :model="form" label-width="80px" ref="form">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item style="position: relative">
            <el-upload
              :action="uploadUrl"
              :limit="1"
              :multiple="false"
              :on-error="uploadError"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label="分类">
            <el-select placeholder="请选择分类" v-model="form.type">
              <el-option :key="nt.id" :label="nt.typeName" :value="nt.id" v-for="nt in newsType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input type="textarea" v-model="form.digest"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <mavon-editor @change="getHtmlContent"  @imgAdd="$imgAdd" @imgDel="$imgDel" ref=md style="height: 400px" v-model="form.content"></mavon-editor>
            <!--<el-input type="textarea" v-model="form.content"></el-input>-->
          </el-form-item>

          <el-form-item label="选项">
            <el-checkbox-group v-model="form.option">
              <el-checkbox label="允许评论" name="discuss"></el-checkbox>
              <el-checkbox label="置顶" name="top"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item v-if="this.editModel">
            <el-button @click="updateNews(1)" size="small" type="primary">确认修改并发布</el-button>
            <el-button @click="updateNews(0)" size="small" type="success">确认修改并保存为草稿</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
          <el-form-item v-else>
            <button @click="moni()">模拟</button>
            <el-button @click="onSubmit(1)" size="small" type="primary">发布资讯</el-button>
            <el-button @click="onSubmit(0)" size="small" type="success">保存草稿</el-button>
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
          id:'',//仅 更新 新闻的时候使用
          title: '',
          firstImg:"",
          type: '',
          digest:"",
          content:"",
          contentHtml:"",
          option:["允许评论"],
        },
        editModel:false,
        newsType:[]

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
      getNewsType() {
        let data = {
          pageNum: 1,
          pageSize: 100
        };
        this.requestApiFnc("/NewsType/getAll", "get", data,
          (res) => {
            const {data:{code,map:{pageInfo:{list}},message,success}} =res;
            if(code !==200){
              this.ele_alert(message,"error");
              return;
            }
            this.newsType=list;
            // console.log(this.tableData);
          })
      },
      moni(){

        let da = [
          "性感宋波 在线改BUG",
          "追光的人，身披万丈光芒",
          "一辈子很短，要欢喜",
          "愿所有的久别重逢都是别来无恙​​​​",
          "往上攀，总能登顶",
          "华为拿下25份5G商业合同全球第一",
          "俄军新型武器可保俄十年安全",
          "性感宋波 在线改BUG",
          "性感宋波 在线改BUG",
          "性感宋波 在线改BUG",
        ]

     setInterval(()=>{

       let discuss;
       let important;

       this.form.option.indexOf("允许评论") !== -1 ? discuss = 1 : discuss = 0;
       this.form.option.indexOf("置顶") !== -1 ? important = 1 : important = 0;

       const data={
         title:da[Math.floor(Math.random()*10)] + Math.floor(Math.random()*10)+Math.floor(Math.random()*10),
         author:"3f3ff415-b27f-46cd-bf4d-17b8b14836a8",
         // type:"默认",
         type:"f01b4f42-7f96-4235-acc1-1d1ea7155b98",
         digest:"测试摘要测试摘要测试摘要测试摘要测试摘要",
         firstImg:"http://120.78.149.155:8040/1545232360678.jpeg",
         content:"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容![croppedtimg.jpg](http://120.78.149.155:8040/1545232379678.jpeg)",
         contentHtml:"<p>测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容<img src='http://120.78.149.155:8040/1545232379678.jpeg' alt='croppedtimg.jpg' /></p>",
         status:1,//type 1 发布文章  type 0 保存草稿
         discuss,
         important
       };
       this.requestApiFnc("/news/add","post",data,(res)=>{
         let {data:{code,map,message}} = res;
         if (code===200){
           this.tips("发布新闻成功！","success");
           // this.ele_alert("发布新闻成功！","success",()=> this.$router.push({path: "/newsManagement"}));
         }else {
           this.ele_alert(message,"error");
         }
       })

     },1500)

      },
      onSubmit(type) {
        // console.log(this.$refs.md);

        let discuss;
        let important;

 this.form.option.indexOf("允许评论") !== -1 ? discuss = 1 : discuss = 0;
 this.form.option.indexOf("置顶") !== -1 ? important = 1 : important = 0;

       const data={
         title:this.form.title,
         author:"3f3ff415-b27f-46cd-bf4d-17b8b14836a8",
         // type:"默认",
         type:this.form.type,
         digest:this.form.digest,
         firstImg:this.form.firstImg,
         content:this.form.content,
         contentHtml:this.form.contentHtml,
         status:type,//type 1 发布文章  type 0 保存草稿
         discuss,
         important
       };


       this.requestApiFnc("/news/add","post",data,(res)=>{
         let {data:{code,map,message}} = res;
         if (code===200){
           this.ele_alert("发布新闻成功！","success",()=> this.$router.push({path: "/newsManagement"}));
         }else {
           this.ele_alert(message,"error");
         }
       })
      },
      updateNews(type) {
        // console.log(this.$refs.md);
        let discuss;
        let important;
        this.form.option.indexOf("允许评论") !== -1 ? discuss = 1 : discuss = 0;
        this.form.option.indexOf("置顶") !== -1 ? important = 1 : important = 0;
        const data={
          id:this.form.id,
          title:this.form.title,
          author:"3f3ff415-b27f-46cd-bf4d-17b8b14836a8",
          type:this.form.type,
          digest:this.form.digest,
          firstImg:this.form.firstImg,
          content:this.form.content,
          contentHtml:this.form.contentHtml,
          status:type,//type 1 发布文章  type 0 保存草稿
          discuss,
          important
        };


        this.requestApiFnc("/news/update","put",data,(res)=>{
          let {data:{code,map,message}} = res;
          if (code===200){
            this.ele_alert("发布新闻成功！","success",()=> this.$router.push({path: "/newsManagement"}));
          }else {
            this.ele_alert(message,"error");
          }
        })
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      uploadSuccess(response, file, fileList){
        console.log(response,file,fileList);
        this.form.firstImg = window.CUIT_server.API_ROOT+"/"+response.map.url;
        console.log(this.form.firstImg);
      },
      uploadError(err, file, fileList){
        console.log(err,file,fileList)
      },
      initEditModel(nid){

        this.requestApiFnc(`/news/getNewsById`,`get`,{
          newsId:nid
        },(res)=>{
          console.log(res);
          const {data:{code,map:{news},message}} = res;
          if (code===200){
            this.form.id = news.id;
            this.form.title=news.title;
            this.form.digest=news.digest;
            this.form.content=news.content;
            this.form.type=news.type;
            this.form.firstImg=news.firstImg;
            this.form.option=[];
            if(news.discuss){
              this.form.option.push("允许评论");
            }
            if (news.important) {
              this.form.option.push("置顶");
            }
          }
          else {
            this.ele_alert(message,"error",()=> this.$router.push({path: "/newsManagement"}),()=> this.$router.push({path: "/newsManagement"}));
          }


        })

      }

    },
    mounted() {

    },
    created() {
      this.toTop();
      this. getNewsType();
      const action = this.$route.query.action;
      const newsId = this.$route.query.newsId;
      if(action && newsId){
        this.editModel = action === "edit";// 判断action 是edit  则进入编辑模式
        if(this.editModel){
          this.initEditModel(newsId);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  .c-main {



  }
</style>
