<template>
  <div>
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="warning" @click="initList">刷新</el-button>
      <el-button v-waves class="filter-item" type="success" @click="viewDetails(0, 'add')">新增</el-button>
      <el-button v-waves class="filter-item" type="info" @click="deleteAdmin">删除</el-button>
      <el-input
        v-model="searchValue"
        clearable
        placeholder="搜索用户名"
        prefix-icon="el-icon-search"
        class="filter-item search-input"
        @clear="initList"
      />
      <el-button v-waves class="filter-item search-btn" type="primary" @click="initList">查询</el-button>
    </div>
    <div class="view-content">
      <el-table ref="tableList" v-loading="listLoading" :data="tableData" style="width: 100%" border stripe @selection-change="selectChange">
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column show-overflow-tooltip align="center" prop="isBlackList" label="操作">
          <template v-slot="{row}">
            <span class="operate-text" @click="viewDetails(row.id, 'edit')">编辑</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="department" label="角色名称" />
        <el-table-column show-overflow-tooltip align="center" prop="username" label="管理员帐号" />
        <el-table-column show-overflow-tooltip align="center" prop="name" label="管理员姓名" />
        <el-table-column show-overflow-tooltip align="center" prop="isEnabled" label="状态">
          <template v-slot="{row}">
            <el-switch v-model="row.isEnabled" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="createDate" label="创建日期" />
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

import { getAdminList, delAdmin } from '@/apis/system'
import { debounce } from '@/utils/index'

export default {
  name: 'Admin',
  components: {
    Pagination
  },
  data() {
    return {
      tableData: [],
      searchValue: '',
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      selection: [],
      none: ''
    }
  },
  computed: {
  },
  created() {
    this.initList()
  },
  methods: {
    initList: debounce(function() {
      this.pageNum = 1
      this.getList()
    }, 300, true),
    selectChange(selection) {
      this.selection = selection
    },
    getList() {
      this.listLoading = true
      const { pageNum, pageSize, searchValue } = this
      const data = { pageNum, pageSize, username: searchValue }
      getAdminList(data)
        .then(res => {
          const { list, pageNum, pageSize, total } = res
          this.tableData = list
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.total = total
        })
        .finally(() => { this.listLoading = false })
    },
    deleteAdmin() {
      if (this.selection.length < 1) return this.$message.warning('请勾选后再试')
      this.$confirm('确认删除？', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAdmin({ ids: this.selection.map(item => item.id) })
          .then(res => {
            this.$message.success('删除成功！')
            this.$refs.tableList.clearSelection()
            this.getList()
          })
      })
    },
    // 查看详情
    viewDetails(id, target) {
      this.$router.push({ path: '/system/admin-' + target, query: { id, target }})
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
