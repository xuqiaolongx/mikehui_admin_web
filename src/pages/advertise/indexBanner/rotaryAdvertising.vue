<template>
  <div>
    <div class="filter-container">
      <el-button v-waves type="primary" @click="addAdvertise">添加</el-button>
      <el-button v-waves type="danger" @click="deleteAdvertise">删除</el-button>
      <el-button v-waves type="success" @click="getAdList">刷新</el-button>
    </div>
    <div class="view-content">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column type="index" align="center" label="序号" width="80" />
        <el-table-column show-overflow-tooltip align="center" prop="adName" label="广告名称" />
        <el-table-column show-overflow-tooltip align="center" prop="picture" label="首页图片">
          <template v-slot="{row}">
            <el-image :src="row.picture" class="table-img" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="order" label="排序" />
        <el-table-column show-overflow-tooltip align="center" prop="createDate" label="创建时间" />
        <el-table-column show-overflow-tooltip align="center" prop="id" label="操作">
          <template slot-scope="scope">
            <a class="operate-text" @click="() => naviEdit(scope.row.id)">编辑</a>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="total"
        :page-size="pageSize"
        :current-page="pageNum"
        @paginationSizeChange="paginationSizeChange"
        @paginationCurrentChange="paginationCurrentChange"
      />
    </div>
  </div>
</template>

<script>

import { ByAdvertisingList, ByAdvertisingDelete } from '@/apis/advertisement'
import Pagination from '@/componentsMy/Pagination'
export default {
  name: 'RotaryAdvertising',
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: false,
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      type: 'Slideshow',
      adName: '',
      ids: []
    }
  },
  created() {
    this.getAdList()
  },
  methods: {
    handleSelectionChange(data) {
      this.ids = data.map(item => item.id)
    },
    naviEdit(id) {
      this.$router.push({
        name: 'bannerDetail',
        query: { id }
      })
    },
    deleteAdvertise() {
      const ids = this.ids
      if (!ids.length) return this.$message.error('请勾选要删除的广告')
      ByAdvertisingDelete({ ids })
        .then(res => {
          this.$message.success('删除成功')
          this.getAdList()
        })
    },
    addAdvertise() {
      this.$router.push('/advertise/advertise-detail')
    },
    getAdList() {
      const { adName, pageSize, pageNum, type } = this
      ByAdvertisingList({ adName, pageSize, pageNum, type }).then(res => {
        this.tableData = res.list
        this.total = res.total
        this.pageNum = res.pageNum
        this.pageSize = res.pageSize
      })
    },
    paginationSizeChange(pageSize) {
      this.pageSize = pageSize
      this.$nextTick(_ => {
        this.getAdList()
      })
    },
    paginationCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.$nextTick(_ => {
        this.getAdList()
      })
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
