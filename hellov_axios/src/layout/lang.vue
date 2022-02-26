<template>
  <el-dropdown>
    <span class="el-dropdown-link">
    <i class="iconfont icon-zhongyingwenyingwen-01 iconfont1"></i>
    </span>     
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="selectLanguage('cn')">中文</el-dropdown-item>
      <el-dropdown-item @click.native="selectLanguage('en')">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> 
</template>

<script>
export default {
  data(){
      return{
        langcn: 'cn',
        langen: 'en'
      }
  },
  methods:{
      selectLanguage(lang){
        if(lang == 'cn'){
          this.$i18n.locale = this.langcn
          localStorage.lang = this.langcn
        }
        else if(lang == 'en'){
          this.$i18n.locale = this.langen
          localStorage.lang = this.langen
        }
      }
  }
}
</script>

<style>
.iconfont1{
  font-size:30px;
}
</style>