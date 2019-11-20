<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <!-- <el-form-item label="角色描述" prop="description">
        <el-input v-model="ruleForm.description" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
      </el-form-item> -->
      <el-form-item label="权限列表">
        <el-tree
          ref="tree"
          :check-strictly="false"
          :data="treeData"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          node-key="value"
          class="permission-tree"
          @check-change="selectKey = $refs.tree.getCheckedKeys().filter(item => item !== 'all')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="$router.push('/system/role')">取消</el-button>
        <el-button class="btn-blue" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAuthoritiesList, getRoleInfo, addRole, updateRole } from '@/apis/system'

export default {
  name: 'RoleEdit',
  data() {
    return {
      id: '',
      treeData: [],
      selectKey: [],
      defaultProps: { children: 'children', label: 'label' },
      ruleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
    this.id = this.$route.query.id
    this.target = this.$route.query.target
    this.$store.dispatch('my/component/getRoleList', { pageSize: 100, pageNum: 1 })
    if (this.target === 'edit') this.getList()
    getAuthoritiesList().then(res => {
      const data = res[0] || []
      const dataList = Object.keys(data).map(key => ({ label: key, value: data[key] }))
      this.treeData = [{
        label: '所有权限',
        value: '所有权限-filter',
        children: [
          {
            label: '用户管理',
            value: '用户管理-filter',
            children: dataList.filter(item => '用户信息-米宝流水记录-用户店铺收藏-用户商品收藏-用户浏览记录'.indexOf(item.label) > -1)
          },
          {
            label: '订单管理',
            value: '订单管理-filter',
            children: dataList.filter(item => '销售订单-退货订单'.indexOf(item.label) > -1)
          },
          {
            label: '商品管理',
            value: '商品管理-filter',
            children: dataList.filter(item => '商品分类-商品列表-商品评论'.indexOf(item.label) > -1)
          },
          {
            label: '商家管理',
            value: '商家管理-filter',
            children: dataList.filter(item => '商家管理-店铺管理'.indexOf(item.label) > -1)
          },
          {
            label: '广告管理',
            value: '广告管理-filter',
            children: dataList.filter(item => '首页轮播广告-新品快报广告-今日必拼广告-拼团推介商品-分类轮播广告-当地特产广告-精选特产'.indexOf(item.label) > -1)
          },
          {
            label: '系统管理',
            value: '系统管理-filter',
            children: dataList.filter(item => '管理员管理-角色管理-评论标签'.indexOf(item.label) > -1)
          }
        ]
      }]
    })
  },
  methods: {
    getList() {
      getRoleInfo({ id: this.id })
        .then(res => {
          const { name, description, authorities } = res
          this.ruleForm = { name, description }
          this.selectKey = authorities
          this.$refs.tree.setCheckedKeys(authorities)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        const { name, description } = this.ruleForm
        const authorities = this.selectKey.filter(item => item.indexOf('filter') === -1)
        if (this.target === 'add') {
          const data = { name, description, authorities }
          addRole(data).then(res => {
            this.$message.success('添加成功！')
            this.$router.push('/system/role')
          })
        } else if (this.target === 'edit') {
          const data = { name, description, authorities, id: this.id }
          updateRole(data).then(res => {
            this.$message.success('修改成功！')
            this.$router.push('/system/role')
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.demo-ruleForm {
  width: 420px;
  margin: 50px 60px;
  .select {
    width: 100%;
  }
  .permission-tree {
    margin-top: 8px;
    margin-bottom: 30px;
    /deep/ .el-tree-node__label {
      text-indent: 10px;
    }
  }
}
</style>
