<template>
  <div>
    <div class="filter-container">
      <el-button v-waves class="filter-item refresh-btn" type="warning" @click="initList">刷新</el-button>
      <div class="search-input-prifix filter-item">
        <el-input v-model="searchValue" clearable :placeholder="'搜索' + searchPlaceholder" @clear="initList">
          <el-select slot="prepend" v-model="searchType">
            <el-option v-for="(item, index) in searchTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-input>
      </div>
      <el-button v-waves class="filter-item search-btn" type="primary" @click="initList">查询</el-button>
      <Select-brand :value.sync="brand" class="filter-item" @change="initList" />
      <el-select v-model="storeType" class="filter-item" placeholder="商家类型" filterable clearable @change="initList">
        <el-option v-for="item in storeTypeList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="storeState" class="filter-item" placeholder="审核状态" filterable clearable @change="initList">
        <el-option v-for="item in storeStateList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="view-content">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="操作" align="center" width="60px" fixed>
          <template v-slot="{row}">
            <span v-if="row.auditStatus" class="operate-text" @click="viewDetails(row.id, encodeType(row.recordType), row.auditStatus)">查看</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="auditStatus" label="审核状态">
          <template v-slot="{row}">
            <el-tag :type="judgeStatus(row.auditStatus)">{{ row.auditStatus || '未备案' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="name" label="商家名称" />
        <el-table-column show-overflow-tooltip align="center" prop="loginName" label="商家账号" />
        <el-table-column show-overflow-tooltip align="center" prop="recordType" label="商家类型" />
        <el-table-column show-overflow-tooltip align="center" prop="affiliation" label="归属品牌" />
        <el-table-column show-overflow-tooltip align="center" prop="shopNum" label="店铺数量" />
        <el-table-column show-overflow-tooltip align="center" prop="isBlackList" label="是否黑名单">
          <template v-slot="{row}">
            <span>{{ row.isBlackList ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="createDate" label="申请注册时间" />
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectBrand from '@/componentsMy/SelectBrand'

import { getMerchantList } from '@/apis/merchant'
import { debounce } from '@/utils/index'
import { encodeType } from './storeType'

export default {
  name: 'MerchantManage',
  components: {
    Pagination,
    SelectBrand
  },
  data() {
    return {
      tableData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      total: 0,

      searchValue: '',
      searchType: 'phone',
      searchTypeList: [
        { label: '商家号码', value: 'phone' },
        { label: '名称', value: 'name' }
      ],
      brand: '',
      storeType: '',
      storeTypeList: [
        { label: '个人', value: 'Personal' },
        { label: '个体工商户', value: 'Business' },
        { label: '专柜店', value: 'Shoppe' },
        { label: '专营店', value: 'Stores' },
        { label: '普通店', value: 'General' }
      ],
      storeState: '',
      storeStateList: [
        { label: '已通过', value: 'Pass' },
        { label: '不通过', value: 'UnPass' },
        { label: '审核中', value: 'Auditing' }
      ],

      none: ''
    }
  },
  computed: {
    searchPlaceholder() {
      return this.searchTypeList.find(item =>
        item.value === this.searchType
      ).label
    }
  },
  created() {
    this.initList()
  },
  methods: {
    initList: debounce(function() {
      this.pageNum = 1
      this.getList()
    }, 300, true),
    getList() {
      this.listLoading = true
      const { pageNum, pageSize } = this
      const affiliation = this.brand
      const auditStatus = this.storeState
      const recordType = this.storeType
      const name = this.searchType === 'name' ? this.searchValue : ''
      const phone = this.searchType === 'phone' ? this.searchValue : ''
      const data = { pageNum, pageSize, affiliation, name, phone, auditStatus, recordType }
      getMerchantList(data)
        .then(res => {
          const { list, pageNum, pageSize, total } = res
          this.tableData = list
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.total = total
        })
        .finally(() => { this.listLoading = false })
    },
    // 查看详情
    viewDetails(id, type, state) {
      this.$router.push({ path: '/merchant/merchant-manage-edit', query: { id, type, state }})
    },
    encodeType,
    judgeStatus(data) {
      let msg = ''
      switch (data) {
        case '已通过': msg = 'success'
          break
        case '不通过': msg = 'danger'
          break
        case '待审核': msg = ''
          break
        default : msg = 'warning'
          break
      }
      return msg
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
