<template>
  <div>
    <ul class="list">
      <li>
        <span class="title">绑定手机</span>
        <span class="msg">15622334526（绑定手机号码可使用手机号码登陆）</span>
        <span class="operate" @click="dialogVisible = true">更换</span>
      </li>
      <li>
        <span class="title">绑定邮箱</span>
        <span class="msg">未绑定</span>
        <span class="operate">立即绑定</span>
      </li>
      <li>
        <span class="title">修改密码</span>
        <span class="operate">修改</span>
      </li>
    </ul>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
      <el-steps :active="1" align-center>
        <el-step title="验证身份" />
        <el-step title="绑定新手机" />
        <el-step title="完成" />
      </el-steps>
      <el-input>
        <template slot="prepend">请输入密码</template>
      </el-input>
      <span slot="footer">
        <el-button class="btn-blue" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { debounce } from '@/utils/index'

export default {
  name: 'Setting',
  data() {
    return {
      active: 0,
      dialogVisible: false
    }
  },
  created() {
    this.initList()
  },
  methods: {
    initList: debounce(function() {
      //
    }, 300, true)
  }
}
</script>

<style lang='scss' scoped>
.list > li{
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  .title {
    float: left;
    font-weight: 800;
    margin-left: 15px;
    margin-right: 15px;
  }
  .msg {
    color: #666;
    float: left;
  }
  .operate {
    margin-right: 15px;
    float: right;
    color: #409eff;
    cursor: pointer;
  }
}
/deep/ .el-dialog__footer {
  text-align: center;
}
</style>
