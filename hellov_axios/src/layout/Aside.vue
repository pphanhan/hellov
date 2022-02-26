<template>
  <div>
    <div class="logo">
      <img src='https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'>
    </div>
    <el-menu
      :default-active= "path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <template v-for="(item, index) in menu_data">
        <el-menu-item v-if="!item.childs"
        :index = "item.path" :key = "index">
        <i class="iconfont icon-daifukuan"></i>
            {{item.title}}
        </el-menu-item>
        <el-submenu v-else :index = "item.path+'' ">
          <template slot="title" >
          <i class="iconfont icon-daifukuan"></i>
          {{item.title}}
          </template>

          <template v-for = "child in item.childs">
          <el-menu-item  :key = "child.path" :index = "child.path">
          <i class="el-icon-location"></i>
          {{child.title}}
          </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'Aside',
  data(){
    return {
      path: '',
    }  
  },

  computed:{
      menu_data(){ 
        return[
        {
            title: this.$t('message.title1'),
            path: '/nested/menu1'
        },  
        {
          title: this.$t('message.title2'),
          childs: [
          {
            title: this.$t('message.title2-1'),
            path: '/nested/menu2/menu2-1'
          },
          {
            title: this.$t('message.title2-2'),
            path: '/nested/menu2/menu2-2'
          }
          ]
        }, 
        {
            title: this.$t('message.title3'),
            path: '/nested/menu3'
        },
        {
            title: this.$t('message.title4'),
            path: '/nested/menu4'
        }]
      }
  },
  created () {
    this.onRouteChanged()
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'onRouteChanged'
  },
  methods: {
    onRouteChanged () {
      let that = this
      that.path  = that.$route.path
    }
  }
}
</script>

<style>
img{
  height: 50px;
  width: 100%;
}
</style>