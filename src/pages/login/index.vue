<template>
  <div class="login-container">
    <div class="header"> 米客惠后台管理系统 </div>
    <div class="login-center flex-vertical" :style="{ backgroundImage: `url(${loginBg})` }">
      <div class="login-box">
        <div class="flex-between" style="margin-bottom: 10px">
          <p class="login-box-prompt">{{ activeIndex === 0 ? '商家登录' : '员工登录' }}</p>
          <el-button v-if="activeIndex === 0" class="login-register-btn">免费入驻</el-button>
        </div>
        <el-form
          :ref="activeIndex === 0 ? 'loginForm' : 'staffForm'"
          :model="activeIndex === 0 ? loginForm : staffForm"
          :rules="activeIndex === 0 ? loginRules : staffRules"
          class="login-form"
          autocomplete="on"
        >
          <el-form-item v-if="activeIndex === 1" prop="storeNum">
            <el-input
              ref="storeNum"
              v-model="staffForm.storeNum"
              placeholder="请输入商家编号"
              name="storeNum"
              type="text"
              tabindex="1"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item v-if="activeIndex === 0" prop="loginName">
            <el-input
              ref="loginName"
              v-model.trim="loginForm.loginName"
              placeholder="请输入商家账号"
              name="loginName"
              type="text"
              tabindex="1"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item v-if="activeIndex === 1" prop="loginName">
            <el-input
              ref="loginName"
              v-model.trim="staffForm.loginName"
              placeholder="请输入员工账号"
              name="loginName"
              type="text"
              tabindex="2"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item v-if="activeIndex === 0" prop="password">
            <el-input
              ref="password"
              v-model.trim="loginForm.password"
              placeholder="请输入登录密码"
              name="password"
              type="password"
              tabindex="2"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item v-if="activeIndex === 1" prop="password">
            <el-input
              ref="password"
              v-model.trim="staffForm.password"
              placeholder="请输入登录密码"
              name="password"
              type="password"
              tabindex="3"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <div class="flex-vertical">
            <el-button
              :class="['login-box-toggle', activeIndex === 0 ? 'active-btn' : '']"
              @click="activeIndex = 0"
            >商家登录</el-button>
            <el-button
              :class="['login-box-toggle', activeIndex === 1 ? 'active-btn' : '']"
              @click="activeIndex = 1"
            >员工登录</el-button>
          </div>
          <el-button
            :loading="loading"
            type="primary"
            class="login-box-btn"
            @click.native.prevent="handleLogin"
          >登录</el-button>
          <div class="login-forget">忘记密码？</div>
        </el-form>
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script>

import loginBg from '@/assets/images/login-bg.png'
import PageFooter from './PageFooter'
import md5 from 'js-md5'

export default {
  name: 'Login',
  components: { PageFooter },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
        if (value.length < 6) {
          callback(new Error('密码不能少于6位数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      loginBg,
      activeIndex: 0,
      loginForm: {
        loginName: 'admin',
        password: '123456'
      },
      staffForm: {
        storeNum: null,
        loginName: '',
        password: ''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      staffRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        loginName: [{ required: true, trigger: 'blur', message: '账号不能为空' }]
      },
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handleLogin() {
      if (this.activeIndex === 0) {
        // 商家登录
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            const data = {
              password: md5(this.loginForm.password),
              username: this.loginForm.loginName
            }
            this.$store.dispatch('user/login', data)
              .then(() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      } else {
        // 员工登录
        this.$refs.staffForm.validate(valid => {
          if (valid) this.$message.warning('暂不可用')
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#8d8d8d;
$color:#272222;
$light_red:#f76c6c;
$cursor: rgb(160, 160, 160);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    input{
      color: $color;
      background: transparent;
      -webkit-appearance: none;
      height: 38px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
      }
      &:focus{
        border-color: $cursor;
      }
    }
    .el-input__inner{
      border-color: $cursor;
      &:focus{
        border-color: $cursor;
      }
    }
  }
}
</style>

<style lang="scss" scoped>

.header {
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    padding: 50px;
}

$bg:#f76c6c;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-center{
    width: 100%;
    height: 600px;
    background-repeat: no-repeat;
    .login-box{
      width: 360px;
      margin-left: auto;
      margin-right: 160px;
      padding: 20px;
      background-color: #fff;
      .login-box-prompt{
        color: $bg;
        font-size: 18px;
        font-weight: bold;
      }
      .login-register-btn{
        background-color: $bg;
        border-color: $bg;
        color: #fff;
        font-weight: bold;
      }
      .login-form{
        margin-top: 6px;
      }
      .login-box-toggle{
        width: 180px;
        margin-bottom: 16px;
        background-color: #fff;
        color: #777777;
        &:hover, &:focus, &:visited{
          border-color: #DCDFE6;
        }
      }
      .active-btn{
        border-color: $bg;
        &:hover, &:focus, &:visited{
          border-color: $bg;
        }
      }
      .login-box-btn{
        width: 100%;
        background-color: $bg;
        border-color: $bg;
      }
      .login-forget{
        width: 100%;
        text-align: right;
        margin-top: 12px;
        color: #979797;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
      }
    }
  }
}
// flex

.flex{
  display: flex;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-horizon {
  display: flex;
  justify-content: center;
}
.flex-vertical {
  display: flex;
  align-items: center;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-space-around {
  display: flex;
  justify-content: space-around;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex-base-line {
  display: flex;
  align-items: baseline;
}

</style>
