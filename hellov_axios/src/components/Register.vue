<template>
  <div class="login" id="login">
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>

      <div class="log-logo">注册信息</div>
    </div>
    <div class="log-email">
      <div class="font">
        <label>邮箱</label>
        <input
          type="text"
          placeholder="Email"
          :class="'log-input' + (account == '' ? ' log-input-empty' : '')"
          v-model="account"
        />
      </div>
      <div class="font">
        <label>密码</label>
        <input
          type="password"
          placeholder="Password"
          :class="'log-input' + (password == '' ? ' log-input-empty' : '')"
          v-model="password"
        />
      </div>
      <div class="font">
        <label>确认密码</label>
        <input
          type="password"
          placeholder="confirm"
          :class="'log-input' + (password == '' ? ' log-input-empty' : '')"
          v-model="ppassword"
        />
      </div>
      <a href="javascript:;" class="log-btn" @click="register">注册</a>
    </div>
    <Loading v-if="isLoging" marginTop="-30%"></Loading>
  </div>
</template>

<script>
import hex_sha1 from "../js/sha1.min.js";
import Loading from "./Loading";
export default {
  name: "Register",
  data() {
    return {
      isLoging: false,
      username: "",
      account: "",
      password: "",
      ppassword: ""
    };
  },
  components: {
    Loading
  },
  methods: {
    register() {
      this.isLoging = true;
      let password_sha = hex_sha1(hex_sha1(this.password));
      let ppassword_sha = hex_sha1(hex_sha1(this.ppassword));
      let loginParam = {
        // account: this.account,
        // password_sha
        username: this.account,
        passhash: password_sha,
        passhash_confirm: ppassword_sha
      };
      this.$http
        .post("/api/user/auth/register/", loginParam, { emulateJSON: true })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            console.log("ok");
            let expireDays = 1000 * 60 * 60 * 24 * 15;
            this.setCookie("session", response.data.session, expireDays);
            //登录成功后
            this.$router.push("/login");
          } else if (response.data.code == 401) {
            alert("用户名已经注册");
            this.isLoging = false;
          } else if (
            response.data.code == 400 &&
            response.data.message ==
              "username and password and passhash_confirm can't be empty"
          ) {
            alert("用户名或密码或密码确认为空");
            this.isLoging = false;
          } else if (
            response.data.code == 400 &&
            response.data.message == "password and passhash_confirm not equal"
          ) {
            alert("密码和密码确认不相等");
            this.isLoging = false;
          }
        });
    }
  }
};
</script>

<style>
.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -350px;
  width: 500px;
  min-height: 555px;
  z-index: 10;
  right: 140px;
  background: #fff;
}
.log-close {
  display: block;
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 1;
}
.log-close:hover .icons {
  transform: rotate(180deg);
}
.log-close .icons {
  opacity: 1;
  transition: all 0.3s;
}
.log-cloud {
  width: 63px;
  height: 40px;
  position: absolute;
  z-index: 1;
}
.login .cloud1 {
  top: 21px;
  left: -30px;
  transform: scale(0.6);
  animation: cloud1 20s linear infinite;
}
.login .cloud2 {
  top: 87px;
  right: 20px;
  animation: cloud2 19s linear infinite;
}
.login .cloud3 {
  top: 160px;
  left: 5px;
  transform: scale(0.8);
  animation: cloud3 21s linear infinite;
}
.login .cloud4 {
  top: 150px;
  left: -40px;
  transform: scale(0.4);
  animation: cloud4 19s linear infinite;
}
.log-bg {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.log-logo {
  height: 80px;
  margin: 120px auto 25px;
  text-align: center;
  color: #1fcab3;
  font-weight: bold;
  font-size: 40px;
}
.log-text {
  color: #57d4c3;
  font-size: 13px;
  text-align: center;
  margin: 0 auto;
}
.log-logo,
.log-text {
  z-index: 2;
}
.icons {
  display: inline-block;
}
.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}
.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}
.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 13px;
  -webkit-border-radius: 5px;
  background-color: #3b5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}
.log-btn.tw {
  background-color: #13b4e9;
}
.log-btn.email {
  background-color: #50e3ce;
}
.log-btn:hover,
.log-btn:focus {
  color: #fff;
  opacity: 0.8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
}
.log-email .log-btn {
  background-color: #50e3ce;
  text-align: center;
}
.log-input-empty {
  border: 1px solid #f37474 !important;
}
.isloading {
  background: #d6d6d6;
}
.log-btn .icons {
  margin-left: 30px;
  vertical-align: middle;
}
.log-btn .text {
  left: 95px;
  line-height: 50px;
  text-align: left;
  position: absolute;
}
.log-input {
  width: 370px;
  overflow: hidden;
  padding: 0 15px;
  font-size: 13px;
  border: 1px solid #ebebeb;
  margin: 0 auto 15px;
  height: 48px;
  line-height: 48px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}
.log-input.warn {
  border: 1px solid #f88787;
}

@-webkit-keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}
@keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}
@keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@-webkit-keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}
label,
input {
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
  padding: 5px;
  height: 30px;
}
</style>
