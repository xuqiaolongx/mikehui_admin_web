<template>
  <div>
    <div class="filter-container">
      <el-button v-waves class="filter-item refresh-btn" @click="initList">刷新</el-button>
      <div class="search-input-prifix filter-item">
        <el-input v-model="searchValue" clearable :placeholder="'搜索' + searchPlaceholder" @clearable="initList">
          <el-select slot="prepend" v-model="searchType">
            <el-option v-for="(item, index) in searchTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-input>
      </div>
      <el-button v-waves class="filter-item search-btn" type="primary" @click="initList">查询</el-button>
      <Select-member :value.sync="memberLevel" class="filter-item" @change="initList" />
      <Select-brand :value.sync="brand" class="filter-item" @change="initList" />
    </div>
    <div class="view-content">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="操作" align="center" width="60px" fixed>
          <template v-slot="{row}">
            <span class="operate-text" @click="viewDetails(row.id)">查看</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="shopCode" label="头像" width="63">
          <template v-slot="{row}">
            <div class="tabel-avatar"><el-image :src="row.avatar" fit="cover" /> </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="phone" label="手机号码" width="110" />
        <el-table-column show-overflow-tooltip align="center" prop="loginName" label="会员账号" />
        <el-table-column show-overflow-tooltip align="center" prop="vipCode" label="会员编号" />
        <el-table-column show-overflow-tooltip align="center" prop="vipLevel" label="会员等级" />
        <el-table-column show-overflow-tooltip align="center" prop="name" label="会员姓名" />
        <el-table-column show-overflow-tooltip align="center" prop="nickname" label="会员昵称" />
        <el-table-column show-overflow-tooltip align="center" prop="affiliation" label="归属品牌" />
        <el-table-column show-overflow-tooltip align="center" prop="affiliationStore" label="归属门店" />
        <el-table-column show-overflow-tooltip align="center" prop="ecoin" label="米宝余额" />
        <el-table-column show-overflow-tooltip align="center" prop="createDate" label="创建时间" />
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectBrand from '@/componentsMy/SelectBrand'
import SelectMember from '@/componentsMy/SelectMember'

import { getMemberList } from '@/apis/member'
import { debounce } from '@/utils/index'

export default {
  name: 'MemberInfo',
  components: {
    Pagination,
    SelectBrand,
    SelectMember
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
        { label: '手机', value: 'phone' },
        { label: '用户名', value: 'userName' }
      ],
      memberLevel: '',
      brand: '',

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
      const vipLevel = this.memberLevel
      const userName = this.searchType === 'userName' ? this.searchValue : ''
      const phone = this.searchType === 'phone' ? this.searchValue : ''
      const data = { pageNum, pageSize, affiliation, vipLevel, userName, phone }
      getMemberList(data)
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
    viewDetails(memberId) {
      this.$router.push({ path: '/member/member-info-details', query: { memberId: memberId }})
    }
  }
}
</script>

<style lang='scss' scoped>
  .search-input-prifix {
    /deep/ .el-input-group__prepend {
      width: 95px;
    }
  }

</style>
