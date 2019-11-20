<template>
  <div>
    <div class="filter-container">
      <el-button v-waves class="filter-item refresh-btn" type="warning" @click="initList">刷新</el-button>
      <el-input
        v-model="searchValue"
        clearable
        placeholder="搜索订单号"
        prefix-icon="el-icon-search"
        class="filter-item search-input"
        @clearable="initList"
      />
      <el-button v-waves class="filter-item search-btn" type="primary" @click="initList">查询</el-button>
      <el-select v-model="orderType" placeholder="请选择订单类型" class="filter-item" clearable @change="initList">
        <el-option v-for="(item, index) in orderTypeList" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="orderState" placeholder="请选择订单状态" class="filter-item" clearable @change="initList">
        <el-option v-for="(item, index) in orderStateList" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="groupState" placeholder="请选择成团状态" class="filter-item" clearable @change="initList">
        <el-option v-for="(item, index) in groupStateList" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="payState" placeholder="请选择付款状态" class="filter-item" clearable @change="initList">
        <el-option v-for="(item, index) in payStateList" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <date-range-picker :start.sync="startTime" :end.sync="endTime" class="filter-item" @change="initList" />
    </div>
    <div class="view-content">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="-" align="center">
          <el-table-column label="操作" align="center" width="60px" fixed>
            <template v-slot="{row}">
              <span class="operate-text" @click="viewDetails(row.sn)">查看</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="sn" label="订单号" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="loginName" label="帐号" />
        </el-table-column>
        <el-table-column :label="baseData['SUM(count)']" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="count" label="商品数量" />
        </el-table-column>
        <el-table-column :label="baseData['SUM(total_fee)']" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="totalFee" label="订单金额" />
        </el-table-column>
        <el-table-column :label="baseData['SUM(discount)']" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="actualPay" label="实际金额" />
        </el-table-column>
        <el-table-column :label="baseData['SUM(postage)']" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="postage" label="运费" />
        </el-table-column>
        <el-table-column :label="baseData['SUM(discount)']" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="discount" label="优惠金额" />
        </el-table-column>
        <el-table-column :label="baseData['SUM(ecoin)']" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="ecoin" label="米宝金额" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="type" label="订单类型" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="orderStatus" label="订单状态" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="paymentStatus" label="付款状态" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="collageStatus" label="成团状态" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="shopName" label="店铺名称" />
        </el-table-column>
        <el-table-column label="-" align="center">
          <el-table-column show-overflow-tooltip align="center" prop="createDate" label="下单时间" />
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import DateRangePicker from '@/componentsMy/DateRangePicker'

import { getSaleOrderList } from '@/apis/order'
import { debounce } from '@/utils/index'

export default {
  name: 'OrderList',
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
        // { label: '已处理', value: '' },
        { label: '已完成', value: 'Completed' },
        { label: '已取消', value: 'Canceled' },
        { label: '待发货', value: 'WaitToSend' },
        { label: '已发货', value: 'SendOut' }
      ],
      payState: '',
      payStateList: [
        { label: '待支付', value: 'unpaid' },
        { label: '已支付', value: 'paid' },
        { label: '已取消', value: 'canceled' }
      ],
      groupState: '',
      groupStateList: [
        { label: '已成团', value: 'Succeed' },
        { label: '未成团', value: 'Failed' }
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
      const { pageNum, pageSize, orderType, orderState, payState, groupState, searchValue, startTime, endTime } = this
      const data = { pageNum, pageSize, sn: searchValue, type: orderType, orderStatus: orderState, paymentStatus: payState, collageStatus: groupState, startTime, endTime }
      getSaleOrderList(data)
        .then(res => {
          const { list, pageNum, pageSize, total } = res.PageInfo
          Object.keys(res.map).forEach(item => { res.map[item] = res.map[item].toString() })
          this.baseData = res.map
          this.tableData = list
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.total = total
        })
        .finally(() => { this.listLoading = false })
    },
    // 查看详情
    viewDetails(sn) {
      this.$router.push({ path: '/order/sale-details', query: { sn: sn }})
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
