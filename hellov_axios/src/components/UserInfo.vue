<template>
  <transition name="fade">
    <div class="info">
      <div class="user-info">
        <span>{{ getUserInfo }}</span>
        <a
          href="javascript:;"
          class="logout"
          @click="logout"
          v-if="!isLogouting"
        >[退出]</a>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLogin: true,
      isLogouting: false,
      userInfo:''
    };
  },
  computed: {
    getUserInfo() {
      const sessionid = this.getCookie("sessionid");
      this.$http.get("/api/user/auth/info/",{sessionid},{withCredentials: true})
        .then(response => {
            this.userInfo = response.data.code.username
        })
        return this.userInfo
        },  
   
  },
  mounted() {},
  methods: {
    logout() {
      console.log();
      const sessionid = this.getCookie("sessionid");
      this.$http
        .post("/api/user/auth/logout/", {
          sessionid
        },{withCredentials: true})
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            console.log("ok");
            // this.isLogouting = true;
            // this.delCookie('session');
            this.$router.push("/login");
            // this.isLogouting = false;
          } else if (response.data.code == 500) {
            alert("不正确");
            this.isLogouting = false;
          } else if (response.data.code == 400) {
            alert("未登陆");
            this.isLogouting = false;
          }
        });

      // setTimeout(() => {
      //   this.$router.push("/login/");
      //   this.isLogouting = false;
      // }, 3000);
    }
  }
};
</script>

<style scoped>
/* .info {
  background: #fff;
  width: 100%;
  height: 600px;
  color: #2c3e50;
  text-align: center;
  padding-top: 170px;
}
.portrait {
  width: 200px;
  height: 200px;
  overflow: hidden;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
  background-color: #cccccc;
  margin: 0 auto 15px;
  border: 2px solid #2c3e50;
  display: block;
}
.user-info {
  margin: 38px 0 0 0;
  vertical-align: top;
}
.user-info,
.w-star,
.w-diamond,
.nick,
.level {
  display: inline-block;
}
.nick {
  margin-right: 10px;
}
.cut {
  padding: 0 10px;
  color: #e9e9e9;
  font-size: 15px;
}
.logout {
  color: #2c3e50;
  display: block;
  margin-top: 20px;
} */
</style>
