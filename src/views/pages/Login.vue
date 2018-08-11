<template>
  <div class="login-container">
    <div class="login-bac" :style="{backgroundImage:`url(${backgroundBac})`}"></div>
    <div class="login-content box">
      <div class="login-left" :style="{backgroundImage:`url(${bgBac})`}"></div>
      <div class="login-right box-col-flex">
        <p>welcome</p>
        <div>
          <div class="login-one">
            <!--<div class="login-icon box box-item">
              <i class="iconfont">&#xe6b0;</i>
            </div>-->
            <input class="login-input box-col-flex" placeholder="用户名" type="text" @keyup.enter="login" v-model="userName">
          </div>
          <div class="login-one">
            <!--<div class="login-icon box box-item">
              <i class="iconfont">&#xe602;</i>
            </div>-->
            <input class="login-input box-col-flex" placeholder="密码"  type="password" @keyup.enter="login" v-model="passWord">
          </div>
          <div class="box box-y-center bb-content">
             <el-checkbox v-model="checked" class="box-col-flex box">同意并遵守协议</el-checkbox>
             <el-button type="primary" @click="login"> 登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import apiConfig from '@/config/api'
import {levelConfig} from '@/config/level'
import _ from 'lodash'
import md5 from 'js-md5'
import Cookie from 'store'
export default {
  components: {

  },
  data() {
    return {
      // userName: '18975137813',
      // passWord: '111111',
      userName: '',
      passWord: '',
      checked: true,
      backgroundBac: 'static/img/bg.jpg',
      bgBac: 'static/img/bg.jpg',
    }
  },
  created(to, from, next) {
    // 获取cookie中的username
    this.userName = _.get(JSON.parse(this.$Helper.getCookie('loginNumber') || '{}'), 'phone')
    // 清除token
    this.$Helper.clearCookie()
    if(process.env.NODE_ENV === 'development') {
      this.userName = '13319512211'
      this.passWord = '123456'
    }
    // console.log(md5('123456'))
  },
  computed: {
    userNameRight() {
      // 字母开头，允许5-16字节，允许字母数字下划线
      return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.exec(this.userName)
    },
    userPassRight() {
      // 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.exec(this.passWord)
    },
    canLogin() {
      return this.userName && this.passWord && this.checked
    },
  },
  watch: {

  },
  methods: {
    login() {
      if (!this.canLogin) {
        this.$store.dispatch('toast/update', { type: 'error', content: '请输入完整信息', time: 2000 })
        return
      }
      this.$Helper
      .ajax({
        url: "open/login",
        params: {
          username: this.userName,
          password: md5(this.passWord),
          category: 2,
        },
        method: "POST"
      })
      .then(
        (data) => {
          this.$store.dispatch("toast/update", {
            type: "success",
            content: data.message,
            time: 2000
          });
          // save basic data
          if (data.status === 1) {
            this.$Helper.setCookie('basic', { ...data.data, level: 1 })
            setTimeout(() => router.push({ name: levelConfig[1].subBar[0] }), 600)
          }
        },
        () => {
          this.$store.dispatch("toast/update", {
            type: "info",
            content: `登录失败`,
            time: 2000
          });
        }
      );
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// @import url('/login.less');
.login-container {
  height: 100%;
  position: relative;
  .login-bac {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    background-size: 100% 100%;
    opacity: .8;
  }
  .login-content {
    position: absolute;
    background: white;
    left: 0;
    right: 0;
    top: 25vh;
    width: 40vw;
    height: 50vh;
    margin: auto;
    text-align: center;
    border-radius: 2px;
    overflow: hidden;
  }
}


.login-left {
  width: 35%;
  // background-image: url('../../../static/img/login_bac.png');
  background-size: auto 100%;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: .7;
  overflow: hidden;
}

.login-right {
  >p {
    margin-top: 4vh;
    font-weight: 300;
    text-align: start;
    padding-left: 12%;
    margin-bottom:8vh;
    font-size: 2.6vw;
  }
  >div {
    // border: 1px solid red;
    padding: 2vh 3vw;
  }
}

.login-one {
  // border-bottom: 1px solid black;
  position: relative; // border: 1px solid red;
  margin-top: 2vh;
}

.login-icon {
  position: absolute;
  left: 1vw;
  top: 0;
  bottom: 0;
  margin: auto;
  .iconfont {
    margin-top: .3vh;
    font-size: 1.5vw;
    color: #c8c8c8;
  }
}

.login-input {
  background: #f3f3f3;
  border: none;
  outline: none;
  box-shadow: none;
  color: #444;
  font-size: 1vw; // text-align: center;
  width: 100%;
  height: 100%;
  line-height: 100%;
  padding: 10px 9px;
  padding-left: 2vh;
  border-radius: 3px;
}


.bb-content{
  height:10vh;
  margin-top:5%;
}

.el-checkbox {
  margin-top: 15px;
  color: #444;
}


.el-button {
  width:35%;
  margin-top:5%;
}
</style>
