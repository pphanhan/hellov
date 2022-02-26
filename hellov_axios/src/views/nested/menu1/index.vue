<template>
<div>
  <!-- <el-input placeholder="Search by name" v-model="">
    <el-button slot="append" icon="el-icon-search" @click="handleUserList()"></el-button>
  </el-input> -->
  <el-popover
  placement="right"
  width="500"
  trigger="click">

  <el-form :model="query" :rules="rules" ref="query" label-width="100px" class="demo-ruleForm">
    <el-form-item label="state">
      <el-select v-model="query.state.name_en" placeholder="请选择state">
        <el-option label="运行中" value=4></el-option>
        <el-option label="启动中" value=1></el-option>
        <el-option label="停止" value=2></el-option>
        <el-option label="不正常退出" value=3></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="min_start">
    <el-col :span="11">
      <el-form-item>
        <el-date-picker type="date" placeholder="选择日期" v-model="query.min_start" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    
  </el-form-item>

    <el-form-item label="instance">
      <el-input v-model="query.instance"></el-input>
    </el-form-item>

  <el-form-item label="health">
      <el-input v-model="query.health"></el-input>
    </el-form-item>

  <el-form-item label="creator">
      <el-input v-model="query.creator"></el-input>
    </el-form-item>

  <el-form-item label="image">
      <el-input v-model="query.image"></el-input>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="handleUserList()">立即创建</el-button>
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
  
</el-form>
 <el-button slot="reference"><i class="iconfont icon-shaixuan">  高级筛选</i></el-button>
</el-popover>
    <el-card v-for="(o,index) in gett" :key="index" class="text item box-card">
    <!-- {{'列表内容 ' + o }} -->
    <el-descriptions>
    <el-descriptions-item label="name">{{o.name}}</el-descriptions-item>
    <el-descriptions-item label="instance">{{o.instance}}</el-descriptions-item>
    <el-descriptions-item label="image">{{o.image}}</el-descriptions-item>
    <el-descriptions-item label="state.name_en" v-if="o.state.severe == '正常'" content-class-name="state_1">{{o.state.name_en}}</el-descriptions-item>
    <el-descriptions-item label="state.name_en" v-if="o.state.severe == '异常'" content-class-name="state_2">{{o.state.name_en}}</el-descriptions-item>
    <el-descriptions-item label="state.name_en" v-if="o.state.severe == '待定'" content-class-name="state_3">{{o.state.name_en}}</el-descriptions-item>
    <el-descriptions-item label="health">{{o.health}}</el-descriptions-item>
    <el-descriptions-item label="start_at">{{o.start_at}}</el-descriptions-item>
    <el-descriptions-item label="change_at">{{o.change_at}}</el-descriptions-item>
  </el-descriptions>
  </el-card>

    <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[5, 10, 20, 40]"
  :page-size="pagesize"         
  layout="total, sizes, prev, pager, next, jumper"
  :total="userList.length"
  > 
  </el-pagination>
</div>
</template>

<script>
// import '../../../mock/mock.js'

export default {
  data() {
    return {
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      userList: [],
      query: {
        state:{name_en:''},
        min_start:'',
        max_start:{data1:'',data2:''},
        min_update:{data1:'',data2:''},
        max_update:{data1:'',data2:''},
        health:'',
        creator:'',
        image:'',
        instance:'',
      },
    }
  },
  created() {
    this.handleUserList()
  },
  methods: {
        // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    handleUserList() {
      // this.userList = this.$parent.get
      var vm = this
      let vmquery = {
        instance: 1,
        health: '',
        min_start: ''
      }
      this.$http.get('/api/container/', {params: vmquery}).then(res => {  //这是从本地请求的数据接口，
        this.userList = res.data.data.results
      })
    },
    // search(query){
      // return this.gett.filter(item=>{
      //                   if(item.name.indexOf(query)!= -1){
      //                       return item
      //                   }//filter方法来循环数组返回的是一个符合条件的新数组
      //               })

    // },
  },
  computed:{
    gett(){
      return this.userList.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
    }
  }
  
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: auto;
  }
  .state_1{
    background-color: rgb(167, 241, 167);
  }
  .state_2{
    background-color: rgb(233, 153, 153);
  }
  .state_3{
    background-color: rgb(245, 245, 145);
  }
</style>