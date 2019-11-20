<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="ruleForm.newPassword" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button v-waves type="primary" @click="$router.go(-1)">返回</el-button>
        <el-button type="success" @click="submitForm('ruleForm')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updatePassword } from '@/apis/user'
import md5 from 'js-md5'

export default {
  name: 'Password',
  data() {
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
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        oldPassword: [{ required: true, validator: password, trigger: 'blur' }],
        newPassword: [{ required: true, validator: password, trigger: 'blur' }],
        checkPass: [{ required: true, validator: checkPass, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters({
      username: 'token'
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        const { oldPassword, newPassword } = this.ruleForm
        const data = { password1: md5(oldPassword), password2: md5(newPassword), username: this.username }
        updatePassword(data).then(res => {
          this.$message.success('修改成功成功!')
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.demo-ruleForm {
  width: 420px;
  margin: 50px auto;
}
</style>
