<template>
  <el-card v-for="(o,index) in get" :key="index" class="text item box-card">
    <!-- {{'列表内容 ' + o }} -->
    <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">{{o.id}}</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
  </el-descriptions>
  </el-card>
</template>

<script>
import '../../../api/mock'
import FanYe from './fanye.vue'
export default {
  data() {
    return {
      userList: [],
    }
  },
  computed:{
    get(){
      this.$http.get('/news').then(res => {  //这是从本地请求的数据接口，
        this.userList = res.data.list
      })
      const a = this.userList
      return a.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
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
</style>