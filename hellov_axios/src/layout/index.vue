<template>
  <div>
    <div class="navbar"><Aside/></div>
    <div class="header">
      <div class="one">
         <Breadcrumb/>
      </div>
      <div class="two">
        <div>
          <UserInfo/>
        </div>
        <div class="three">
          <Lang/>
        </div>
     </div>
    </div>
    <div class="main">
     <AppMain/>
    </div>
  </div>
</template>

<script>
import Aside from './Aside.vue'
import Breadcrumb from './Breadcrumb.vue'
import Nav from './Nav.vue'
import UserInfo from '../components/UserInfo.vue'
import Lang from './lang.vue'
import AppMain from './AppMain.vue'
export default {
  components: {
    Aside,
    Breadcrumb,
    Nav,
    UserInfo,
    Lang,
    AppMain
  },
}
</script>

<style>
  /* 头部样式 */
  .header {
    position: absolute;
    top: 0px;
    left: 250px;
    right: 0px;
    height: 50px;
  }

  /* 左侧样式 */
  .navbar {
    position: absolute;
    width: 250px;
    top: 0px;  /* 距离上面50像素 */
    left: 0px;
    bottom: 0px;
    overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
    background-color: #545c64;
  }

  /* 主区域 */
  .main {
    position: absolute;
    top: 50px;
    left: 250px;
    bottom: 0px;
    right: 0px;  /* 距离右边0像素 */
    padding: 10px;
    overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
    color: #000;
  }
  .one{
    float: left;
  }
  .two div{
    float: right;
    /* display: inline-block; */
  font-size: 20px;
  line-height: 50px;
  margin-left: 8px;
    
  }
</style>