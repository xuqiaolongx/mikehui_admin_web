<template>
  <div>
    <div class="filter-container">
      <el-button v-waves class="filter-item refresh-btn" type="warnig" @click="initList">刷新</el-button>
      <el-input
        v-model="searchValue"
        clearable
        placeholder="搜索订单号"
        prefix-icon="el-icon-search"
        class="filter-item search-input"
      />
      <el-button v-waves class="filter-item search-btn" type="primary" @click="initList">查询</el-button>
      <el-select v-model="orderType" placeholder="请选择订单类型" class="filter-item" clearable>
        <el-option v-for="(item, index) in orderTypeList" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="orderState" placeholder="请选择订单状态" class="filter-item" clearable>
        <el-option v-for="(item, index) in orderStateList" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <date-range-picker :start.sync="startTime" :end.sync="endTime" class="filter-item" @change="initList" />
    </div>
    <div class="view-content">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="-" align="center">
          <el-table-column label="操作" align="center" width="60px" fixed>
            <template v-slot="{row}">
              <span class="operate-text" @click="viewDetails(row.paidCode)">查看</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="paidCode" label="退货订单号" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="sn" label="销售订单号" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="loginName" label="帐号" />
        </el-table-column>
        <el-table-column :label="baseData.count" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="count" label="商品数量" />
        </el-table-column>
        <el-table-column :label="baseData.total_fee" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="totalFee" label="退货订单金额" />
        </el-table-column>
        <el-table-column :label="baseData.refund_price" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="refundPrice" label="实际退货金额" />
        </el-table-column>
        <el-table-column :label="baseData.refund_ecoin" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="refundEcoin" label="退回米宝金额" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="type" label="订单类型" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="refundStatus" label="订单状态" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="shopName" label="店铺名称" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="createDate" label="创建时间" />
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import DateRangePicker from '@/componentsMy/DateRangePicker'

import { getReturnOrderList } from '@/apis/order'
import { debounce } from '@/utils/index'

export default {
  name: 'ReturnOrderList',
  components: {
    Pagination, DateRangePicker
  },
  data() {
    return {
      baseData: {},
      tableData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      total: 0,

      startTime: '',
      endTime: '',
      searchValue: '',
      orderType: '',
      orderTypeList: [
        { label: '普通订单', value: 'common' },
        { label: '拼团订单', value: 'Collage' },
        { label: '秒杀订单', value: 'Sec' },
        { label: '1元抢购订单', value: 'Oneyuan' },
        { label: '会员订单', value: 'Vip' }
      ],
      orderState: '',
      orderStateList: [
        { label: '待商家处理', value: 'WaitToDeal' },
        { label: '已确认', value: 'Affirm' },
        { label: '待退货', value: 'Returning' },
        { label: '已退货', value: 'ProductReceive' },
        { label: '已完成', value: 'Finish' }
      ],

      none: ''
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
      const { pageNum, pageSize, orderType, orderState, searchValue, startTime, endTime } = this
      const data = { pageNum, pageSize, paidCode: searchValue, type: orderType, refundStatus: orderState, startTime, endTime }
      getReturnOrderList(data)
        .then(res => {
          const { list, pageNum, pageSize, total } = res.orderRefundVOPageInfo
          const baseData = JSON.parse(JSON.stringify(
            Object.assign({}, res.objectMap['SUM(o'], res.objectMap['SUM(tor'])
          ).replace(/\)/g, ''))
          Object.keys(baseData).forEach(item => { baseData[item] = baseData[item].toString() })
          this.baseData = baseData
          this.tableData = list
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.total = total
        })
        .finally(() => { this.listLoading = false })
    },
    // 查看详情
    viewDetails(sn) {
      this.$router.push({ path: '/order/return-details', query: { sn: sn }})
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
