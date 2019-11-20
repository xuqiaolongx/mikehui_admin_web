<template>
  <div class="pagination-wrap">
    <el-pagination
      :total="total"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="pageNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 20, 30, 40]
      }
    },
    paginationSizeChange: {
      type: Function,
      default: function() {}
    },
    paginationCurrentChange: {
      type: Function,
      default: function() {}
    }
  },
  methods: {
    // 每页条数改变
    handleSizeChange(curPageSize) {
      this.$emit('paginationSizeChange', curPageSize)
    },

    // 修改当前页
    handleCurrentChange(curPageNum) {
      this.$emit('paginationCurrentChange', curPageNum)
    }
  }
}
</script>

<style lang='scss' scoped>
  .pagination-wrap {
    margin-top: 20px;
  }
</style>
