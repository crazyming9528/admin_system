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
            <el-form-item label="网站LOGO">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="网站标题" >
              <el-input v-model="form.name" placeholder="网站显示的标题"></el-input>
            </el-form-item>
            <el-form-item label="网站关键词">
              <el-input  v-model="form.keyword" placeholder="以英文逗号隔开 用于SEO优化"></el-input>
            </el-form-item>
            <el-form-item label="网站标语">
              <el-input  v-model="form.keyword" placeholder="网站slogan  宣传口号"></el-input>
            </el-form-item>
            <el-form-item label="网站描述">
              <el-input type="textarea" v-model="form.desc" placeholder="描述网站的主要功能与内容 用于SEO优化"></el-input>
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
              <el-switch v-model="form.open"></el-switch>
            </el-form-item>
            <el-form-item label="是否允许注册">
              <el-switch v-model="form.open"></el-switch>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
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
      data(){
        return {
          form: {
            name: '',
            keyword:"",
            desc: '',
            region: '',
            date1: '',
            date2: '',
            open: false,
            imageUrl: ''
          }
        }
      },method:{
        onSubmit() {
          console.log('submit!');
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
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
        }
      }
    }
</script>

<style scoped>

</style>
