<template>
  <div class="c-main wow fadeIn" style="">
    <el-row class="topArea wow fadeInDown" data-wow-delay="0.5s">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>设施报修</el-breadcrumb-item>
          <el-breadcrumb-item>报修订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="mainBody">

      <el-row class="headArea wow fadeInDown panelArea" data-wow-delay="0.3s">
        <el-col :span="24">
          <span class="title">报修订单管理</span>
          <span class="description">可分别查看并处理 待处理订单、处理中订单、处理完成订单。</span>
        </el-col>
      </el-row>


      <el-row class="panelArea ">
        <el-col :span="24">
          <el-tabs v-model="activeName" @tab-click="">
            <el-tab-pane label="待处理订单" name="pendingOrder">

              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="报修时间"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="报修人"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系电话"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="报修位置">
                </el-table-column>
                <el-table-column
                  align="center"
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="openDetail(scope.row,'待处理订单')" type="text" size="small">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane label="处理中" name="inProgress">
              <el-table
                :data="tableData2"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="报修时间"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="报修人"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系电话"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="报修位置">
                </el-table-column>
                <el-table-column
                  prop="Hdate"
                  label="开始处理时间"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="operator"
                  label="操作人"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="repairman"
                  label="维修员"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  align="center"
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="openDetail(scope.row,'正在处理中的订单')" type="text" size="small">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane label="已处理完成的订单" name="Completed">

              <el-table
                :data="tableData3"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="报修时间"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="报修人"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="报修位置">
                </el-table-column>
                <el-table-column
                  prop="Hdate"
                  label="开始处理时间"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="operator"
                  label="操作人"
                  align="center"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="repairman"
                  label="维修员"
                  align="center"
                  width="180">
                </el-table-column>

                <el-table-column
                  prop="status"
                  label="状态"
                  align="center"
                  width="180">
                </el-table-column>


                <el-table-column
                  prop="remark"
                  label="说明">
                </el-table-column>
                <el-table-column
                  align="center"
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="openDetail(scope.row,'已处理完成的订单')" type="text" size="small">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row class="panelArea">

        <el-col :span="24">


        </el-col>

      </el-row>

      <el-dialog :append-to-body="true" :title="orderStatus" :visible.sync="displayDetail">
        <div class="btn-area">

          <el-popover v-if="orderStatus === '待处理订单'"
            placement="top"
            width="250"
            v-model="doOrder">
            <el-input
              type="text"
              placeholder="请输入处理该订单的维修员姓名"
              v-model="repairman">
            </el-input>
            <br>
            <el-input
              style="margin-top: 5px"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="remark1">
            </el-input>
            <div style="text-align: right; margin: 10px 0">
              <el-button size="mini" type="text" @click="closeDoOrderFn()" >取消</el-button>
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </div>
            <el-button slot="reference" plain  type="success">处理订单</el-button>
          </el-popover>

          <el-popover v-if="orderStatus === '正在处理中的订单' || orderStatus === '待处理订单'"
            placement="top"
            width="250"
            v-model="cancelOrder">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入取消原因"
              v-model="remark2">
            </el-input>
            <div style="text-align: right; margin: 10px 0">
              <el-button size="mini" type="text" @click="closeCancelOrderFn()">取消</el-button>
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </div>
            <el-button slot="reference" plain type="warning"  >取消订单</el-button>
          </el-popover>
        </div>
        <div class="info">

          <span><i>报修人姓名:</i>{{detail.name}}</span>
          <span><i>报修人电话:</i>{{detail.phone}}</span>
        </div>
        <div class="info">
          <span><i>报修时间:</i>{{detail.time}}</span>
          <span><i>报修地址:</i>{{detail.address}}</span>

        </div>
        <div class="content-wrap">

          <div class="content">
            <i>报修说明:</i>
            宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了宿舍的门坏了
          </div>
<div style="text-align: left">报修照片:</div>
          <br>
          <img :src="detail.imgUrl" />

        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>


  export default {
    name: "repairOrder",
    data() {
      return {
        activeName:"pendingOrder",
        displayDetail:false,
        doOrder:false,
        cancelOrder:false,
        remark1:"",
        remark2:"",
        repairman:"",
        orderStatus:"", //订单状态
        detail:{
          name:"",
          phone:"",
          time:"",
          address:"",
          photo:"",
          imgUrl:"http://cuit.crazyming.cn/img/zj.jpg"
        },
        tableData: [{
          date: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          address: '本校区教学楼 102'
        }, {
          date: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          address: '本校区教学楼 102'
        }, {
          date: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          address: '本校区教学楼 102'
        }, {
          date: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          address: '本校区教学楼 102'
        }],
        tableData2: [{
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"",
          address: '本校区教学楼 102',
          status:"已取消",
          operator:"小明",
          remark:"电话无法联系"
        }, {
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"宋宋宋",
          address: '本校区教学楼 102',
          status:"已解决",
          operator:"小明",
          remark:"无"
        }, {
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"",
          address: '本校区教学楼 102',
          status:"已取消",
          operator:"小明",
          remark:"电话无法联系"
        }, {
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"宋宋宋",
          address: '本校区教学楼 102',
          status:"已解决",
          operator:"小明",
          remark:"无"
        }],
        tableData3: [{
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"",
          address: '本校区教学楼 102',
          status:"已取消",
          operator:"小明",
          remark:"电话无法联系"
        }, {
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"宋宋宋",
          address: '本校区教学楼 102',
          status:"已解决",
          operator:"小明",
          remark:"无"
        }, {
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"",
          address: '本校区教学楼 102',
          status:"已取消",
          operator:"小明",
          remark:"电话无法联系"
        }, {
          date: '2019-01-02 08:30',
          Hdate: '2019-01-02 08:30',
          name: '王小虎',
          phone:"18581520828",
          repairman:"宋宋宋",
          address: '本校区教学楼 102',
          status:"已解决",
          operator:"小明",
          remark:"无"
        }]
      }
    },
    methods: {

      openDetail(item,status){
        this.displayDetail=true;
        console.log(item);
        this.orderStatus = status;
        this.detail.address = item.address;
        this.detail.phone = item.phone;
        this.detail.name = item.name;
        this.detail.time = item.date;

      },
      openDoOrderFn(){
        this.doOrder = true;
      },
      closeDoOrderFn(){
        this.doOrder = false
      },
      openCancelOrderFn(){
        this.cancelOrder = true;
      },
      closeCancelOrderFn(){
        this.cancelOrder = false;
      }

    }
  }
</script>

<style lang="scss" scoped>
  .btn-area{
    position: absolute;
    top: 60px;
    right: 20px;
  }

.info{
  margin-bottom: 10px;
  span{
    margin-left: 15px;
  }
}

i{
  color: #a5a5a5;
}

  .content-wrap{
    width: 98%;
    margin: 0 auto;
    text-align: center;

    .content{
      background-color: #fdf6ec;
      padding: 15px 5px;
      margin-bottom: 15px;
      text-align: left;
    }
    img{
      max-width:80%;
    }
  }

</style>
