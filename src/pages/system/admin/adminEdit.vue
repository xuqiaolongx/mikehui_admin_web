<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" label-position="left" class="demo-ruleForm">
      <el-form-item label="角色" prop="roles">
        <el-select v-model="ruleForm.roles" placeholder="请选择角色" class="select">
          <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="管理员帐号" prop="username">
        <el-input v-model="ruleForm.username" :disabled="target === 'edit'" />
      </el-form-item>
      <el-form-item label="设置密码" prop="password">
        <el-input v-model="ruleForm.password" :disabled="target === 'edit'" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" :disabled="target === 'edit'" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="管理员姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="管理员电话" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnabled">
        <el-switch v-model="ruleForm.isEnabled" />
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="$router.push('/system/admin')">取消</el-button>
        <el-button class="btn-blue" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAdminInfo, addAdmin, updateAdmin } from '@/apis/system'
import { mapState } from 'vuex'
import md5 from 'js-md5'

export default {
  name: 'AdminEdit',
  data() {
    const username = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_]{3,16}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入3到16位字母、数字、下划线的组合'))
      }
    }
    const password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('长度必须大于或等于6位'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      id: '',
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        name: '',
        department: '',
        email: '',
        roles: '',
        isEnabled: true
      },
      rules: {
        username: [{ required: true, validator: username, trigger: 'blur' }],
        password: [{ required: true, validator: password, trigger: 'blur' }],
        checkPass: [{ required: true, validator: checkPass, trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        roles: [{ required: true, message: '请至少选择一项', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapState({
      roleList: function(state) {
        return state['my/component'].roleList
      }
    })
  },
  created() {
    this.id = this.$route.query.id
    this.target = this.$route.query.target
    this.$store.dispatch('my/component/getRoleList', { pageSize: 100, pageNum: 1 })
    if (this.target === 'edit') this.getList()
  },
  methods: {
    getList() {
      getAdminInfo({ id: this.id })
        .then(res => {
          const { username, password, name, department, email, roles, isEnabled } = res
          this.ruleForm = { username, password, checkPass: password, name, department, email, roles: roles[0].id, isEnabled }
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        const { username, password, name, department, email, isEnabled } = this.ruleForm
        const data = { id: this.id, username, password, name, department, email, roles: [{ id: this.ruleForm.roles }], isEnabled }
        if (this.target === 'add') {
          data.password = md5(data.password)
          addAdmin(data).then(res => {
            this.$message.success('添加成功！')
            this.$router.push('/system/admin')
          })
        } else if (this.target === 'edit') {
          updateAdmin(data).then(res => {
            this.$message.success('修改成功！')
            this.$router.push('/system/admin')
          })
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.ruleForm = Object.assign({}, this.ruleForm, { name: '', department: '', email: '', roles: [], isEnabled: true })
    }
  }
}
</script>

<style lang='scss' scoped>
.demo-ruleForm {
  width: 420px;
  margin: 50px 30px;
  .select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    position: relative;
    &:before {
      position: absolute;
      left: -15px;
      top: 3px;
    }
  }
}
</style>
