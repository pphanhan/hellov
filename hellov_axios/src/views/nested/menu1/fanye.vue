<template>
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[5, 10, 20, 40]"
  :page-size="pagesize"         
  layout="total, sizes, prev, pager, next, jumper"
  :total="userList.length">   
</el-pagination>
</template>

<script>

export default({
  props:['cchild'],
  data(){
    return {
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      userList: []
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
          this.userList = this.$parent.get
            // this.$http.get('/news').then(res => {  //这是从本地请求的数据接口，
            //     this.userList = res.data.list
            // })
        }
    }
})
</script>
