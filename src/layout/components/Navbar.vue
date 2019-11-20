<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="title">
      <i class="el-icon-user-solid" />
      您好，admin，欢迎来到米客惠管理后台
    </div>
    <div class="right-menu">
      <div class="right-menu-item hover-effect">
        <i class="el-icon-message" />
      </div>
      <span class="divider" />
      <el-dropdown class="right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/password">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: { Hamburger },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .title {
    float: left;
    margin-left: 10px;
    line-height: 50px;
    .el-icon-user-solid{
      font-size: 20px;
      position: relative;
      top: 1px;
      margin-right: 5px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    padding-right: 8px;
    &:focus {
      outline: none;
    }
    .divider{
      height: 25px;
      width: 1px;
      background: #DCDFE6;
      display: inline-block;
      margin-bottom: 10px;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 10px;
      height: 100%;
      font-size: 28px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

  }
}
</style>
