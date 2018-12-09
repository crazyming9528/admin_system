<template>
  <div class="c-main wow fadeIn">

    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>用户</el-breadcrumb-item>
          <el-breadcrumb-item>角色与权限</el-breadcrumb-item>
        </el-breadcrumb>

      </el-col>
    </el-row>

    <div class="mainBody">


      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">角色与权限</span>
          <span class="description">对系统中的用户角色与权限进行控制</span>
        </el-col>
      </el-row>

      <el-row class="panelArea ">


        <el-col :span="24" style="text-align: right">
          <el-button size="small" type="primary" @click="openDialog('add')" icon="el-icon-plus">添加角色</el-button>
        </el-col>

      </el-row>


      <el-row class="panelArea">

        <el-col :span="24">
          <el-table
            :data="roleList"
            border
            style="width: 100%">
            <el-table-column

              type="index"
              label="ID"
              width="50">
            </el-table-column>
            <el-table-column

              prop="roleName"
              width="150"
              label="角色名">
            </el-table-column>
            <el-table-column

              prop="pst"
              label="权限">
            </el-table-column>

            <el-table-column

              prop="remark"
              width="400"
              label="描述">
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

    </div>


    <el-dialog :append-to-body="true" :title="this.dialogText" :visible.sync="dialogFormDisplay">
      <el-form :model="form_role">
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_role.name" auto-complete="off" placeholder="（必填）"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">

          <el-checkbox-group v-model="form_role.checkList">
            <el-checkbox label="资讯发布"></el-checkbox>
            <el-checkbox label="资讯管理"></el-checkbox>
            <el-checkbox label="资讯栏目管理"></el-checkbox>
            <el-checkbox label="用户管理"></el-checkbox>
            <el-checkbox label="数据库管理"></el-checkbox>
            <el-checkbox label="系统管理"></el-checkbox>
          </el-checkbox-group>

        </el-form-item>


        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form_role.description" auto-complete="off" placeholder="一句话描述该角色"></el-input>
            </el-col>
          </el-row>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirm('cancel')">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :append-to-body="true"
      title="删除角色"
      :visible.sync="dialogDeleteDisplay"
      width="30%">
      <span>{{this.dialogText}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogConfirm('cancel')">取 消</el-button>
    <el-button type="primary" @click="dialogConfirm('confirm')">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "role",
    data() {
      return {
        dialogText: "修改角色",
        dialogFormDisplay: false,
        dialogDeleteDisplay: false,
        roleNameValue: "",
        roleId: "",
        roleList: [],
        formLabelWidth: "60px",
        action:"",
        form_role: {
          name: "",
          checkList: ['资讯发布', '资讯管理', "资讯栏目管理", "用户管理"],
          description:"",
        },
        tableData:[],
      }
      },
    created() {
      console.log(this.tableData)
      this.changeTableData();
      this.getRole();
    }
    , methods: {
      dialogConfirm(type) {
        if (type === "confirm" && this.action === "add") {
          this.requestApi("add");
          this.dialogFormDisplay = false;
        } else if (type === "confirm" && this.action === "edit") {
          this.requestApi("edit");
          this.dialogFormDisplay = false;
        }else  if(type==="confirm" && this.action==="delete"){
          this.requestApi("delete");
          this.dialogDeleteDisplay = false;
        }
        else if (type === "cancel") {
          this.dialogDeleteDisplay = false;
          this.dialogFormDisplay = false;
        }




      },
      openDialog(action,data) {
        this.action="";
        if(action==="add"){
          this.dialogText="添加角色";
          this.action="add";
          this.dialogFormDisplay = true;
        }else if(action==="edit"){
          console.log(data);
          this.dialogText="编辑角色";
          this.action="edit";
          this.roleId=data.id;
          this.form_role.name=data.roleName;
          this.form_role.description=data.remark;
          this.dialogFormDisplay = true;
        }else  if(action==="delete"){
          this.dialogText="确定删除该角色吗？属于该角色的用户将会重新分配到普通用户角色！";
          this.roleId=data.id;
          this.action="delete";
          this.dialogDeleteDisplay=true;


        }

      },

      getTable() {

        let t = [{
          id: '1',
          role: "超级管理员",
          permission: [
            {id: 1, name: "资讯发布", usable: true},
            {id: 2, name: "资讯管理", usable: true},
            {id: 3, name: "资讯栏目管理", usable: true},
            {id: 3, name: "资讯评论管理", usable: true},
            {id: 4, name: "用户管理", usable: true},
            {id: 5, name: "角色管理", usable: true},
            {id: 6, name: "系统管理", usable: true},
            {id: 7, name: "数据库管理", usable: true},
          ],
          description: "拥有系统的最高权限"

        },
          {
            id: '2',
            role: "新闻管理员",
            permission: [
              {id: 1, name: "资讯发布", usable: true},
              {id: 2, name: "资讯管理", usable: true},
              {id: 3, name: "资讯栏目管理", usable: true},
              {id: 3, name: "资讯评论管理", usable: true},
              {id: 4, name: "用户管理", usable: false},
              {id: 5, name: "角色管理", usable: false},
              {id: 6, name: "系统管理", usable: false},
              {id: 7, name: "数据库管理", usable: false},
            ],
            description: "管理新闻"
          },
          {
            id: '3',
            role: "评论管理员",
            permission: [
              {id: 1, name: "资讯发布", usable: false},
              {id: 2, name: "资讯管理", usable: false},
              {id: 3, name: "资讯栏目管理", usable: false},
              {id: 3, name: "资讯评论管理", usable: true},
              {id: 4, name: "用户管理", usable: false},
              {id: 5, name: "角色管理", usable: false},
              {id: 6, name: "系统管理", usable: false},
              {id: 7, name: "数据库管理", usable: false},
            ],
            description: "管理评论"
          }
        ]

      },
      changeTableData: function () {

        this.tableData.forEach(function (item) {
          item["pst"] = "";
          for (var i = 0; i < item["permission"].length; i++) {
            if (item["permission"][i].usable) {
              item["pst"] += item["permission"][i].name + "、";
            }
          }
        })


      },
      getRole() {
        this.requestApi("getAllRole");

      },
      requestApi(action) {

        if (action === "getAllRole") {

          this.$axios.get("/role/getAll", {
            params: {
              pageNum: 1,
              pageSize: 1000,
            }
          }).then((res) => {
            console.log(res);
            if(res.data.code===200){
              this.roleList=res.data.map.pageInfo.list;
              console.log(roleList);
            }


          }).catch((error) => {

          })

        } else if (action === "add") {
          this.$axios.post("/role/add", {
              roleName: this.form_role.name,
            remark:this.form_role.description,
          }).then((res) => {
            if(res.data.code===200){
              this.tips("添加成功！","success")
              this.requestApi("getAllRole");
            }
            console.log(res);
          }).catch((error) => {

            this.tips("添加角色失败！","error")
            console.log(error);
          })


        } else if (action === "edit") {
          this.$axios.put("/role/update", {
              id: this.roleId,
              roleName: this.form_role.name,
              remark:this.form_role.description,
          }).then((res) => {
            if(res.data.code===200){
              this.tips("修改成功！","success");
              this.requestApi("getAllRole");
            }
            console.log(res);
          }).catch((error) => {
            this.tips("修改失败！","error")
            console.log(error);
          })
        } else if (action === "delete") {

          this.$axios.delete("/role/delete", {
            params: {
              id: this.roleId,
            }
          }).then((res) => {
            if(res.data.code===200){
              this.tips("删除成功！","success");
              this.requestApi("getAllRole");
            }
            console.log(res);
          }).catch((error) => {
            this.tips("删除失败！","error")
            console.log(error);

          })


        } else if (action === "checkName") {
          this.$axios.delete("/role/checkName", {
            params: {
              roleId: this.roleId,
              roleName: this.roleNameValue,
            }
          }).then((res) => {
            console.log(res);
          }).catch((error) => {

          })


        }
      }
    },

  }
</script>

<style scoped>

</style>
