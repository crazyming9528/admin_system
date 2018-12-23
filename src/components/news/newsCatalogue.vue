<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
          <el-breadcrumb-item>新闻分类管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">新闻分类</span>
          <span class="description">校园新闻资讯分类的管理</span>
        </el-col>
      </el-row>
      <TableTools style="margin-bottom: 20px"   @refresh="refresh" @addData="addData"
                  @toggleDisplay="toggleDisplay()"></TableTools>

      <el-row class="panelArea ">


        <!--<el-col :span="8" :offset="12" :md="8" :lg="8" :xs="24" :sm="24">-->

        <!--</el-col>-->
        <!--<el-col :offset="20" :span="4" :md="4" :lg="4" :xs="24" :sm="24"-->
                <!--style="text-align: left;box-sizing: border-box;padding-left: 25px">-->
          <!--<el-tooltip content="刷新" placement="top">-->
            <!--<el-button type="primary" icon="el-icon-refresh" @click="refresh" size="small"-->
                       <!--plain></el-button>-->
          <!--</el-tooltip>-->

          <!--<el-tooltip content="新增" placement="top">-->
            <!--<el-button type="primary" @click="operateDialog('add')" icon="el-icon-plus" size="small" plain></el-button>-->
          <!--</el-tooltip>-->

        <!--</el-col>-->


      </el-row>

      <el-row class="panelArea">
        <el-col :span="24">
          <!-- :header-cell-style="{background:' #33a0d7',color:'white'}" 表格的属性 蓝色背景-->
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              width="50"
              type="index"
              label="#">
            </el-table-column>
            <el-table-column
              prop="typeName"
              width="250"
              label="分类名称">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="分类描述">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="operateDialog('edit',scope.row)" type="text" size="small">编辑</el-button>

                <el-button type="text" size="small" @click="operateDialog('delete',scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>


      <el-row class="panelArea ">
      </el-row>


    </div>

    <el-dialog :title="addOrEditDialog.title" :visible.sync="addOrEditDialog.display" :append-to-body="true">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="addOrEditDialog.LabelWidth">
          <el-input placeholder="请输入分类名称" v-model.trim="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" :label-width="addOrEditDialog.LabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            autocomplete="off"
            placeholder="请输入该分类的描述"
            v-model.trim="form.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="operateDialog('cancel')">取 消</el-button>
        <el-button type="primary" @click="operateDialog('ok')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import TableTools from "../childComponents/tableTools";
  export default {
    name: "newsCatalogue",
    components: {
      TableTools,
    },
    data() {
      return {
        loading: false,

        addOrEditDialog: {
          display: false,
          action: "",
          title: "标题",
          LabelWidth: "80px",
          currentData: "",
        },
        form: {
          id: "",
          name: "",
          description: "",
        },
        tableData: []
      }
    },
    methods: {


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
            this.tableData=list;
            // console.log(this.tableData);
          })
      },

      refresh() {
        this.getNewsType();
      },
      addData(){

        this.operateDialog('add')

      },
      operateDialog(type, data = null) {

        //add添加分类 edit修改分类
        if (type === "add") {
          this.addOrEditDialog.action = "add";
          this.addOrEditDialog.title = "添加分类";
          this.addOrEditDialog.display = true;
          this.form.name="";
          this.form.description="";
        } else if (type === "edit") {
          this.addOrEditDialog.action = "edit";
          this.addOrEditDialog.title = "修改分类";
          this.addOrEditDialog.currentData = data;
          this.form.id=this.addOrEditDialog.currentData.id;
          this.form.name = this.addOrEditDialog.currentData.typeName;
          this.form.description = this.addOrEditDialog.currentData.remark;
          this.addOrEditDialog.display = true;
        } else if (type === "delete") {
          this.addOrEditDialog.action = "delete";
          this.addOrEditDialog.currentData = data;
          this.deleteType();
        }

        // ok:确认、保存 等行为  cancel:取消  关闭等行为
        if (type === "ok") {
          this.addOrEditDialog.display = false;
          if (this.addOrEditDialog.action === "add") {
            this.addType();
          } else if (this.addOrEditDialog.action === "edit") {
            this.updateType();
          }

        } else if (type === "cancel") {
          this.addOrEditDialog.display = false;
        }


      },

      deleteType() {

        this.ele_confirm(`确定删除吗？`, `warning`, () => {

            this.requestApiFnc("/NewsType/delete", "delete", {id: this.addOrEditDialog.currentData.id}, (res) => {
              const {data:{code,map,message,success}} =res;
              if(code !==200){
                this.ele_alert(message,"error");
                return;
              }
              this.tips( message,'success',);
              this.getNewsType();
            });
          }, () => this.tips( '已取消删除！','info')
        );

        console.log(this.addOrEditDialog.currentData);
      },

      addType() {
        if (this.form.name === "" || this.form.description === "") {
          this.ele_alert("分类名称和描述不能为空!", "warning", () => this.addOrEditDialog.display = true);
          return;
        }
        let data = {
          typeName: this.form.name,
          remark: this.form.description,
        };

        this.requestApiFnc("/NewsType/add", "post", data,
          (res) => {
            console.log(res);
            let{data:{code,map,message,success}} =res;
            if(code !==200){
              this.ele_alert(message,"error");
              return;
            }

            this.getNewsType()
          })
      },
      updateType() {
        if (this.form.name === "" || this.form.description === "") {
          this.ele_alert("分类名称和分类描述不能为空", "warning", () => this.addOrEditDialog.display = true);
          return;
        }
        let data = {
          id: this.form.id,
          typeName: this.form.name,
          remark: this.form.description,
        };
        this.requestApiFnc("/NewsType/update", "put", data, (res) => {
        let{data:{code,map,message,success}} =res;

          if(code !==200){
            this.ele_alert(message,"error");
            return;
          }
          this.tips(message,"success");
          this.getNewsType()
        });
      }
    },
    mounted() {

    },
    created() {
      this.toTop();
      this.getNewsType();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base";

  .c-main {

  }
</style>
