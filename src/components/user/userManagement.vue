<template>
  <div class="c-main wow fadeIn">

    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>用户</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

      </el-col>
    </el-row>

    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">用户管理</span>
          <span class="description">新增、删除、修改用户信息</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">

        <el-col :span="8" :offset="12" :md="8" :lg="8" :xs="24" :sm="24">
          <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select" size="small">
            <el-select v-model="search_select" slot="prepend" placeholder="请选择........">
              <!--<el-option label="ID" value="id"></el-option>-->
              <el-option label="用户名" value="userName"></el-option>
              <el-option label="姓名" value="realName"></el-option>
              <el-option label="手机" value="phone"></el-option>
              <el-option label="邮箱" value="email"></el-option>
              <el-option label="QQ" value="qq"></el-option>
            </el-select>
            <el-button slot="append" @click="requestApi('search')" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :md="4" :lg="4" :xs="24" :sm="24"
                style="text-align: left;box-sizing: border-box;padding-left: 25px">
          <el-tooltip content="刷新" placement="top">
            <el-button type="primary" icon="el-icon-refresh" @click="refresh" size="small"
                       plain></el-button>
          </el-tooltip>

          <el-tooltip content="新增" placement="top">
            <el-button type="primary" @click="openDialog('add')" icon="el-icon-plus" size="small" plain></el-button>
          </el-tooltip>

        </el-col>


      </el-row>

      <el-row class="panelArea">
        <!-- :header-cell-style="{background:' #33a0d7',color:'white'}" 表格的属性 蓝色背景-->
        <el-col :span="24">
          <!--v-loading="loading"-->
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
             width="50"
             type="index"
              label="#">
            </el-table-column>
            <el-table-column

              prop="userName"
              label="用户名">
            </el-table-column>
            <el-table-column

              prop="realName"
              width="120"
              label="姓名">
            </el-table-column>
            <el-table-column

              prop="gender"
              width="50"
              label="性别">
            </el-table-column>
            <el-table-column

              prop="role"
              width="120"
              label="角色">
            </el-table-column>
            <el-table-column

              prop="status"
              width="120"
              label="状态">
            </el-table-column>
            <el-table-column

              width="150"
              prop="phone"
              label="手机">
            </el-table-column>
            <el-table-column

              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column

              prop="userQq"
              width="150"
              label="QQ">
            </el-table-column>

            <el-table-column

              prop="createDate"
              width="160"
              label="注册时间">
            </el-table-column>
            <el-table-column

              prop="loginTime"
              width="160"
              label="最后登录时间">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="100">

              <template slot-scope="scope">
                <el-button @click="openDialog('edit',scope.row)" type="text" size="small">编辑</el-button>

                <el-button type="text" size="small" @click="openDialog('delete',scope.row)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>


        </el-col>


      </el-row>

      <el-row class="panelArea">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_total">
          </el-pagination>
        </div>


      </el-row>

    </div>


    <el-dialog
      :append-to-body="true"
      title="删除用户"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{this.dialogText}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogConfirm('cancel')">取 消</el-button>
    <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
  </span>
    </el-dialog>


    <el-dialog :append-to-body="true" :title="this.dialogText" @close="closeUserDialog" :visible.sync="dialogFormNew">
      <el-form :model="form_user" ref="userForm" :rules="formRulers" size="small">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.userName" auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.realName" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item v-if="this.action==='add'" label="密码" prop="password" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.password" type="password" auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item v-if="this.action==='edit'" label="密码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.password" type="password" auto-complete="off"
                        placeholder="（不填写此处将不会修改用户的密码）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="form_user.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form_user.role" placeholder="请选择角色">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="新闻发布员" value="新闻发布员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form_user.status" placeholder="请选择状态">
            <el-option label="正常" value="1"></el-option>
            <el-option label="封禁" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.phone" auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.email" auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_user.userQq" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirm('cancel')">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: "userManagement",
    data() {
      let checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        if (value.length < 3 || value.length > 15) {
          return callback(new Error('用户名长度要求3-15字符'));
        }
        this.requestApi('checkName', function (v) {
          if (!v) {
            return callback(new Error('该用户名不可用'));
          } else {
            callback(); //这个会变绿
          }
        });
      };
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        if (value.length !== 11 || isNaN(value)) {
          return callback(new Error('手机号格式不正确'));
        }
        this.requestApi('checkPhone', function (v) {
          if (!v) {
            return callback(new Error('该手机号不可用'));
          } else {
            callback(); //这个会变绿
          }
        });

      };
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        if (value.indexOf("@") === -1) {
          return callback(new Error('邮箱格式不正确'));
        }
        this.requestApi('checkEmail', function (v) {
          if (!v) {
            return callback(new Error('该邮箱不可用'));
          } else {
            callback(); //这个会变绿
          }
        });
      };

      let checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        if (value.length <= 5) {
          return callback(new Error("密码安全性过低"));
        } else {
          callback(); //这个会变绿
        }
      };
      return {
        loading: true,
        action: "",//当前行为
        currentPage: 1,//分页当前页
        page_total: 0,//分页 总数
        page_size: 10,//分页  一页的大小
        userID: "",//用户id 唯一标识
        dialogVisible: false,//确认 的删除弹出  是否显示
        dialogFormNew: false,// 添加 或 编辑 的 模态框  是否显示
        formLabelWidth: "80px",//模态框右侧的label间距
        formRulers: {
          userName: [
            {validator: checkUserName, trigger: 'blur'},
          ],
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          password: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        },

        fromCheck1: {
          userName: false,
          phone: false,
          email: false,
        },
        form_user: {
          userName: "",
          gender: "男",
          realName: "",
          role: "普通用户",
          status: "1",
          phone: "",
          email: "",
          password: "",
          userQq: "",
        },//新增 和 编辑 的数据
        dialogText: "",
        search: "",//搜索框
        search_select: "userName",//搜索框左侧下拉数据
        tableData: [],//表单数据源

      }
    },
    methods: {
      /**
       *改变分页  页面显示条数
       * @param val
       */
      handleSizeChange(val) {
        this.page_size = val;
        this.currentPage = 1;


          this.requestApi("getUser");

      },
      /**
       * 切换分页
       * @param val
       */
      handleCurrentChange(val) {
        this.currentPage = val;

          this.requestApi("getUser");

      },
      handleClick(row) {
        console.log(row);
      },
      /**
       * 打开模态框，删除用户  新增用户  编辑用户
       * @param type
       * @param data
       */
      openDialog(type, data) {

        if (type === 'delete') {

          this.action = "delete";
          this.userID = data.id;
          this.dialogVisible = true;
          this.dialogText = "确认删除该用户吗？"

        } else if (type === 'add') {
          this.userID = "";
          this.action = "add";
          this.dialogText = "新增用户";
          this.dialogFormNew = true;
          this.form_user = {
            userName: "",
            gender: "男",
            realName: "",
            role: "普通用户",
            status: "1",
            phone: "",
            email: "",
            password: "",
            userQq: "",
          }

        } else if (type === 'edit') {
          this.action = "edit";
          this.userID = data["id"];
          for (let item in data) {

            if (data.hasOwnProperty(item)) {
              this.form_user[item] = data[item];
            }

          }

          if (this.form_user.status === "正常") {
            this.form_user.status = "1"
          } else if (this.form_user.status === "封禁") {
            this.form_user.status = "0"
          }
          this.form_user.password = "";


          this.dialogText = "编辑用户";
          this.dialogFormNew = true;

        }


      },


      /**
       *关闭新增 编辑 用户的回调
       */
      closeUserDialog() {
        this.$refs['userForm'].clearValidate();//清除验证
      },


      /**
       * 确认或者取消
       * @param res
       */
      dialogConfirm(res) {


        if (this.action === "delete") {

          if (res === "cancel") {
            this.dialogVisible = false;
            this.action = "";

          } else {

            console.log("删除用户", this.userID);

            this.requestApi("delete");

            this.dialogVisible = false;
            this.action = "";


          }


        } else if (this.action === "add") {

          if (res === "cancel") {
            this.dialogFormNew = false;
            this.action = "";

          } else {

            console.log("新增用户");

            this.$refs["userForm"].validate((valid) => {
              if (valid) {
                this.requestApi("add");
                this.dialogFormNew = false;
              } else {
                console.log('error submit!!');
                return false;
              }
            });

          }


        } else if (this.action === "edit") {

          if (res === "cancel") {
            this.dialogFormNew = false;
          } else {
            console.log("保存编辑的用户");

            this.$refs["userForm"].validate((valid) => {
              if (valid) {
                this.requestApi("edit");
                this.dialogFormNew = false;
                console.log("success！");
                this.requestApi("getUser");
              } else {
                console.log('error submit!!');
                return false;
              }
            });


          }


        }


      },


      refresh(){

        this.search="";
        this.requestApi("getUser");
      },


      requestApi(action, verifyCB) {

        switch (action) {

          case "add":
            this.$axios.post("/user/register", {
              userName: this.form_user.userName,
              password: this.form_user.password,
              realName: this.form_user.realName,
              gender: this.form_user.gender,
              phone: this.form_user.phone,
              userImg: "1",
              userQq: this.form_user.userQq,
              email: this.form_user.email,
              status: this.form_user.status,
            }).then((res) => {

              if (res.data.code === 200) {

                this.tips( res.data.message,"success")
                this.requestApi("getUser");
              } else {
                this.tips( res.data.message,"warning")

              }
            }).catch(
              (error) => {
                console.log(error);
              }
            );
            break;
          case "edit":

            this.$axios.put("/user/update", {
              id: this.userID,
              userName: this.form_user.userName,
              password: this.form_user.password,
              realName: this.form_user.realName,
              gender: this.form_user.gender,
              phone: this.form_user.phone,
              userImg: "1",
              userQq: this.form_user.userQq,
              email: this.form_user.email,
              status: this.form_user.status,

            }).then((res) => {
              if (res.data.code === 200) {

                this.tips("更新成功！","success");
                this.requestApi("getUser")
              } else {
                this.tips(res.data.message,"warning");
              }

            }).catch((error) => {
            });


            break;
          case "delete":
            this.$axios.delete("/user/delete", {
              params: {
                userId: this.userID
              }

            }).then((res) => {
              if (res.data.code === 200) {

                this.tips("删除成功！","success");
                this.requestApi("getUser")
              } else {
                this.tips(res.data.message,"warning");
              }

            }).catch((error) => {

              this.tips("系统出错！","error");

            });
            break;
          case "getUser":
            if (this.search !=="") {
              this.requestApi("search");//如果搜索框内有参数， 就执行搜索 接口
           return;
            }
            this.loading = true;
            // this.$axios.get("/user/getAll?pageNum=" + this.currentPage + "&pageSize=" + this.page_size).then((res) => {
            this.$axios.get("/user/getAll",{
              params:{
                pageNum:this.currentPage,
                pageSize:this.page_size,

              }
            }).then((res) => {

              if (res.data.code === 200) {

                let list = res.data.map.pageInfo.list;


                this.page_total = res.data.map.pageInfo.total;

                let _this = this;
                this.tableData = list.map(function (item) {

                  if (item.status === 1) {
                    item.status = "正常"
                  } else if (item.status === 0) {
                    item.status = "封禁"
                  }
                  item.createDate = _this.showTime(item.createDate);
                  if (item.loginTime) {
                    item.loginTime = _this.showTime(item.loginTime);
                  } else {
                    item.loginTime = "暂无记录";
                  }
                  return item;

                });

              } else {
                this.tips(res.data.message,"warning");
              }
              this.loading = false;
            }).catch((error) => {
              this.tips( "系统出错！","error");
                console.log(error);
                this.loading = false;
              }
            );

            break;
          case "checkName":
            this.$axios.get("/user/checkName", {
              params: {
                userId: this.userID,
                userName: this.form_user.userName,
              }
            }).then((res) => {

              if (res.data.code === 200) {

                this.fromCheck1.userName = true;//验证通过

                verifyCB(this.fromCheck1.userName);//回调  验证
                this.form_user.hahah = "dd";


              } else if (res.data.code === 500) {
                this.fromCheck1.userName = false;//验证不通过

                verifyCB(this.fromCheck1.userName);//回调 弹出错误验证
              }

            }).catch((error) => {
              this.tips( "系统出错！","error");

              console.log(error)


            });
            break;
          case "checkEmail":
            let _this = this;
            console.log(_this.form_user);
            this.$axios.get("/user/checkEmail", {
              params: {
                userId: this.userID,
                email: this.form_user.email,
              }
            }).then(function (res) {
              if (res.data.code === 200) {
                _this.fromCheck1.email = true;//验证通过
                verifyCB(_this.fromCheck1.email);//回调  验证
              } else if (res.data.code === 500) {
                _this.fromCheck1.email = false;//验证不通过
                verifyCB(_this.fromCheck1.email);//回调  验证
              }

            }).catch((error) => {

              this.tips( "系统出错！","error");
              console.log(error)


            });
            break;
          case "checkPhone":
            this.$axios.get("/user/checkPhone", {
              params: {
                userId: this.userID,
                phone: this.form_user.phone,
              }
            }).then((res) => {
              if (res.data.code === 200) {
                this.fromCheck1.phone = true;//验证通过
                verifyCB(this.fromCheck1.phone);//回调  验证
              } else if (res.data.code === 500) {
                this.fromCheck1.phone = false;//验证
                verifyCB(this.fromCheck1.phone);//回调

              }


            }).catch((error) => {
              this.tips( "系统出错！","error");
              console.log(error);


            });
            break;
          case "search":

            if (this.search === "") {
              this.tips("搜索内容不能为空！","warning");
              return

            }
            this.loading = true;
            this.$axios.get("/user/queryUser", {
              params: {
                query: this.search,
                type: this.search_select,
                pageNum: this.currentPage,
                pageSize: this.page_size,

              }
            }).then((res) => {
              if (res.data.code === 200) {
                let list = res.data.map.pageInfo.list;

                if (list.length === 0) {
                  this.tips("没有查询到数据","info");
                  this.tableData = [];
                  this.page_total = 0;
                  this.loading = false;
                  return;
                }

                this.page_total = res.data.map.pageInfo.total;
                let _this = this;
                this.tableData = list.map(function (item) {

                  if (item.status === 1) {
                    item.status = "正常"
                  } else if (item.status === 0) {
                    item.status = "封禁"
                  }
                  item.createDate = _this.showTime(item.createDate);
                  if (item.loginTime) {
                    item.loginTime = _this.showTime(item.loginTime);
                  } else {
                    item.loginTime = "暂无记录";
                  }
                  return item;

                });


              } else if (res.data.code === 500) {
                this.tips(res.data.message,"warning");

              }

              this.loading = false;


            }).catch((error) => {
              this.tips("系统出错！","error");
              console.log(error);
              this.loading = false;

            });


            break;


        }

      },
    }, created() {
      this.requestApi("getUser");


    }
  }
</script>

<style lang="scss" scoped>
  .c-main /deep/ .el-select .el-input {
    width: 120px;
    text-align: center;
  }

  .c-main /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }


</style>
