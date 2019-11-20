<template>
  <div>
    <div class="filter-container">
      <el-button v-waves class="filter-item refresh-btn" type="warning" @click="initList">刷新</el-button>
      <div class="search-input-prifix filter-item">
        <el-input v-model="searchValue" clearable :placeholder="'搜索' + searchPlaceholder" @clearable="initList">
          <el-select slot="prepend" v-model="searchType">
            <el-option v-for="(item, index) in searchTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-input>
      </div>
      <el-button v-waves class="filter-item search-btn" type="primary" @click="initList">查询</el-button>
      <date-range-picker :start.sync="startTime" :end.sync="endTime" class="filter-item" @change="initList" />
      <el-select v-model="payType" placeholder="请选择消费类型" class="filter-item" clearable @change="initList">
        <el-option v-for="(item, index) in payTypeList" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <Select-brand :value.sync="brand" class="filter-item" @change="initList" />
    </div>
    <div class="view-content">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border stripe>
        <el-table-column show-overflow-tooltip align="center" prop="phone" label="会员手机号码" width="110" />
        <el-table-column show-overflow-tooltip align="center" prop="vipCode" label="会员编码" />
        <el-table-column show-overflow-tooltip align="center" prop="on" label="流水号" width="110" />
        <el-table-column show-overflow-tooltip align="center" prop="sn" label="订单编号" />
        <el-table-column show-overflow-tooltip align="center" prop="affiliationStore" label="店铺" />
        <el-table-column show-overflow-tooltip align="center" prop="affiliation" label="归属品牌" />
        <el-table-column show-overflow-tooltip align="center" prop="type" label="类型" />
        <el-table-column show-overflow-tooltip align="center" prop="lastMMoney" label="获得米宝前" />
        <el-table-column show-overflow-tooltip align="center" prop="mMoney" label="获得米宝后" />
        <el-table-column show-overflow-tooltip align="center" prop="increase" label="增值" />
        <el-table-column show-overflow-tooltip align="center" prop="reduce" label="减值" />
        <el-table-column show-overflow-tooltip align="center" prop="remarks" label="备注" />
        <el-table-column show-overflow-tooltip align="center" prop="createDate" label="创建时间" />
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectBrand from '@/componentsMy/SelectBrand'
import DateRangePicker from '@/componentsMy/DateRangePicker'

// import { getFlowRecordList } from '@/apis/member'
import { debounce } from '@/utils/index'

export default {
  name: 'RebateFlow',
  components: {
    Pagination,
    SelectBrand,
    DateRangePicker
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
        { label: '手机号码', value: 'phone' },
        { label: '会员编号', value: 'code' }
      ],
      payType: '',
      payTypeList: [
        { label: '消费米宝', value: 'Use' },
        { label: '兑换米宝', value: 'Change' },
        { label: '退回米宝', value: 'Out' }
      ],
      brand: '',
      startTime: '',
      endTime: '',

      none: ''
    }
  },
  computed: {
    searchPlaceholder() {
      return this.searchTypeList.find(item => item.value === this.searchType).label
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
      // this.listLoading = true
      // const { pageNum, pageSize, startTime, endTime } = this
      // const affiliation = this.brand
      // const type = this.payType
      // const phone = this.searchType === 'phone' ? this.searchValue : ''
      // const vipCode = this.searchType === 'code' ? this.searchValue : ''
      // const data = { pageNum, pageSize, affiliation, type, phone, vipCode, startTime, endTime }
      // getFlowRecordList(data)
      //   .then(res => {
      //     const { list, pageNum, pageSize, total } = res
      //     this.tableData = list
      //     this.pageNum = pageNum
      //     this.pageSize = pageSize
      //     this.total = total
      //   })
      //   .finally(() => { this.listLoading = false })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
