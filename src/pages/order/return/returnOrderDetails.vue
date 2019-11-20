<template>
  <div>
    <ul class="base-information">
      <li v-for="(item, index) in informationList" :key="index" :class="['item', item.long ? 'long' : '']">
        <span class="title">{{ item.label }}</span>
        <div class="content">{{ item.value }}</div>
      </li>
    </ul>
    <el-table :data="tableData" border stripe>
      <el-table-column show-overflow-tooltip align="center" prop="image" label="图片" width="80">
        <template v-slot="{row}">
          <div class="table-picture"><el-image :src="row.image" fit="cover" /></div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="productName" label="商品名" />
      <el-table-column show-overflow-tooltip align="center" prop="price" label="单价" />
      <el-table-column show-overflow-tooltip align="center" prop="ecoin" label="米宝" />
      <el-table-column show-overflow-tooltip align="center" label="规格1">
        <template v-slot="{row}">
          <div>{{ row.specificationName1 + '(' + row.specificationValue1 + ')' }}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="规格2">
        <template v-slot="{row}">
          <div>{{ row.specificationName2 + '(' + row.specificationValue2 + ')' }}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="count" label="数量" />
      <el-table-column show-overflow-tooltip align="center" prop="totalMoney" label="总金额" />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
    <div style="margin-top:50px;">
      <el-button v-waves type="primary" @click="$router.push('/order/return')">返回</el-button>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getReturnOrderDetails } from '@/apis/order'

export default {
  name: 'ReturnOrderDetails',
  components: {
    Pagination
  },
  data() {
    return {
      sn: '',
      total: 0,
      pageSize: 20,
      pageNum: 1,
      information: {},
      tableData: []
    }
  },
  computed: {
    informationList() {
      const data = this.information
      const list = [
        { label: '退货订单号', value: data.paidCode, long: false },
        { label: '销售订单号', value: data.sn, long: false },
        { label: '会员帐号', value: data.loginName, long: false },
        { label: '订单类型', value: data.type, long: false },
        { label: '订单状态', value: data.refundStatus, long: false },
        { label: '订单总金额', value: data.totalFee, long: false },
        { label: '实际退货金额', value: data.refundPrice, long: false },
        { label: '退回米宝', value: data.refundEcoin, long: false },
        { label: '订单时间', value: data.createDate, long: false },
        { label: '完成时间', value: data.succeedDate, long: false },
        { label: '收货人姓名', value: data.contact, long: false },
        { label: '电话', value: data.phone, long: false },
        { label: '地址', value: data.specificAddress, long: true },
        { label: '订单状态', value: data.orderStatus, long: false },
        { label: '发货时间', value: data.sendDate, long: false },
        { label: '物流公司', value: data.expressName, long: false },
        { label: '快递单号', value: data.expressNumber, long: false },
        { label: '备注', value: data.remark, long: true }
      ]
      return list
    }
  },
  created() {
    this.sn = this.$route.query.sn
    this.getList()
  },
  methods: {
    getList() {
      getReturnOrderDetails({ paidCode: this.sn })
        .then(res => {
          this.information = res
          this.tableData = res.itemsVO
        })
        .catch(err => this.$message({ type: 'error', message: `请求详情错误 ${err}` }))
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
