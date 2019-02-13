<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>基础信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">基础信息</span>
          <span class="description">网站基础信息设置</span>
        </el-col>
      </el-row>


      <el-row class="panelArea">

        <el-col :span="24">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item style="position: relative" label="网站LOGO">
              <el-upload
                :action="uploadUrl"
                :limit="1"
                :headers="setHeader"
                :multiple="false"
                :on-error="uploadError"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
              </el-upload>
              <img :src="form.logo" style="width: 150px;position: absolute;top:50%;transform: translateY(-50%);left: 400px"  alt="">
            </el-form-item>
            <el-form-item label="网站标题">
              <el-input v-model="form.title" placeholder="网站显示的标题"></el-input>
            </el-form-item>
            <el-form-item label="网站关键词">
              <el-input v-model="form.keyword" placeholder="以英文逗号隔开 用于SEO优化"></el-input>
            </el-form-item>
            <el-form-item label="网站标语">
              <el-input v-model="form.slogan" placeholder="网站slogan  宣传口号"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
              <el-input type="textarea" v-model="form.remark" placeholder="描述网站的主要功能与内容 用于SEO优化"></el-input>
            </el-form-item>
            <!--<el-form-item label="活动区域">-->
            <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="是否开启网站">
              <el-switch v-model="form.open"></el-switch>
            </el-form-item>
            <el-form-item label="是否允许登录">
              <el-switch v-model="form.login"></el-switch>
            </el-form-item>
            <el-form-item label="是否允许注册">
              <el-switch v-model="form.register"></el-switch>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="saveConfig()">保存</el-button>
              <!--<el-button>取消</el-button>-->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>


    </div>
  </div>
</template>

<script>
  export default {
    name: "config",
    data() {
      return {
        uploadUrl: window.CUIT_server.API_ROOT + "/user/uploadImg",
        setHeader: {Authorization: Base64.decode(JSON.parse(localStorage.getItem('login')))},
        form: {
          title: '',
          keyword: "",
          slogan: '',
          remark: '',
          open: false,
          login: false,
          register: false,
          logo: ''
        }
      }
    },
    computed:{
      systemInfo:function () {
        return this.$store.getters.systemInfo;
      }

    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      uploadSuccess(response, file, fileList) {
        console.log(response, file, fileList);
        this.form.logo = window.CUIT_server.API_ROOT + "/" + response.map.url;
        console.log(this.form.logo);
      },
      uploadError(err, file, fileList) {
        console.log(err, file, fileList)
      },
      onSubmit() {
        console.log('submit!');
      },
      handleAvatarSuccess(res, file) {
        this.logo = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      saveConfig() {
        this.requestApiFnc('/systemSetting/add', 'post', {
          title: this.form.title,
          keyword: this.form.keyword,
          slogan: this.form.slogan,
          remark: this.form.remark,
          open: this.form.open ? 1 : 0,
          login: this.form.login ? 1 : 0,
          register: this.form.register ? 1 : 0,
          logo: this.form.logo
        },(res)=>{
          const {code,map,message} = res.data;
         if (code===200){
           this.ele_alert("保存成功",'success');
           this.getSystemInfo();//  更新数据

         }
        })
      },
       //从vuex 获取
      getConfig() {
        let ob = this.systemInfo;
        for (let property in ob){
          if (ob.hasOwnProperty(property)){
            if (this.systemInfo[property] === 1){
              this.form[property] = true;
            } else if (this.systemInfo[property] === 0) {
              this.form[property] = false;
            }else {
              this.form[property] = this.systemInfo[property];
            }
          }
        }

      },
   // 从网络获取
      getSystemInfo() {
        this.requestApiFnc('/systemSetting/get','get',null,(res)=>{
          const {code,map:{SystemSetting},message} = res.data;
          if (code === 200){
            console.log(SystemSetting);
            this.$store.commit('setSystem',SystemSetting)
          }
        })
      },

    },
    created() {


      setTimeout(()=>{
        this.getConfig();
      },1500);
      console.log(this.systemInfo);
    }
  }
</script>

<style scoped>

</style>
