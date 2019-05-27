<template>
    <div>
        <van-nav-bar
        title="用户登录"
        left-back="返回"
        left-arrow
        @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required 
            :error-message='usernameErroMsg'
            @click-icon="username=''"/>
                 <van-field
            v-model="password"
            label="密   码"
            :error-message='passwordErrorMsg'
            placeholder="请输入密码"
            required/>
        </div>

            <div class="register-button">
                <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
            </div>
    </div>
</template>

<script>
import axios from "axios";
import user from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户的Loading
      usernameErroMsg: "", //用户名出错时提示消息
      passwordErrorMsg: "" //密码错误时提示细腻些
    };
  },
  //用户登录状态校验
  created(){
    if(localStorage.userInfo)
    {
      Toast.success('您已经登录')
      this.$router.push('/');
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErroMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErroMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能小于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    loginAction() {
      this.checkForm() && this.registerUser();
    },
    //用户登录
    registerUser() {
      this.openLoading = true;
      axios({
        url: user.login,
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(response => {
          let code = response.data.code;
          switch (code) {
            case 200:
              if (response.data.message) {
                //存储用户信息
                new Promise((resolve, reject) => {
                  localStorage.userInfo = { userName: this.username };
                  setTimeout(() => {
                    resolve();
                  }, 500);
                })
                  .then(() => {
                    this.$router.push("/");
                  })
                  .catch(err => {
                    Toast.success("用户存储失败");
                  });
              } else {
                Toast.fail("密码错误");
              }
              break;
            default:
              Toast.fail(response.data.message);
              break;
          }
          this.openLoading = false;
        })
        .catch(err => {
          console.log(err);
          Toast.fail("服务器错误，请稍后再试");
          this.openLoading = false;
        });
    }
  }
};
</script>
<style   scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>