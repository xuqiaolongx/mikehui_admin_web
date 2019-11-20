<template>
  <div class="member-info-detais-wrap">
    <el-tabs v-model="activeName">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息" name="firstTab">
        <ul class="basic-information-tab">
          <li class="information-item">
            <span class="title">昵称</span>
            <div class="content">{{ baseData.nickname }}</div>
          </li>
          <li class="information-item">
            <span class="title">账号</span>
            <div class="content">{{ baseData.loginName }}</div>
          </li>
          <li class="information-item">
            <span class="title">姓名</span>
            <div class="content">{{ baseData.name }}</div>
          </li>
          <li class="information-item">
            <span class="title">电话</span>
            <div class="content">{{ baseData.phone }}</div>
          </li>
          <li class="information-item">
            <span class="title">归属品牌</span>
            <div class="content">{{ baseData.affiliation }}</div>
          </li>
          <li class="information-item">
            <span class="title">归属门店</span>
            <div class="content">{{ baseData.affiliationStore }}</div>
          </li>
          <li class="information-item">
            <span class="title">会员等级</span>
            <div class="content">{{ baseData.vipLevel }}</div>
          </li>
          <li class="information-item">
            <span class="title">米宝余额</span>
            <div class="content">{{ baseData.ecoin }}</div>
          </li>
          <li class="information-item">
            <span class="title">首次登录时间</span>
            <div class="content">{{ baseData.createDate }}</div>
          </li>
          <li class="information-item">
            <span class="title">最近登录时间</span>
            <div class="content">{{ baseData.recent }}</div>
          </li>
        </ul>
      </el-tab-pane>

      <!-- 消费记录 -->
      <el-tab-pane label="消费记录" name="secondTab">
        <el-table v-loading="expendListLoading" :data="expendTableData" stripe style="width: 100%">
          <el-table-column label="-">
            <el-table-column show-overflow-tooltip align="center" prop="sn" label="订单号" />
          </el-table-column>
          <el-table-column label="-">
            <el-table-column show-overflow-tooltip align="center" prop="type" label="订单类型" />
          </el-table-column>
          <el-table-column label="100">
            <el-table-column show-overflow-tooltip align="center" prop="count" label="商品数量" />
          </el-table-column>
          <el-table-column label="10000.00">
            <el-table-column show-overflow-tooltip align="center" prop="discount" label="订单金额" />
          </el-table-column>
          <el-table-column label="10000.00">
            <el-table-column show-overflow-tooltip align="center" prop="actualPay" label="实际金额" />
          </el-table-column>
          <el-table-column label="10000.00">
            <el-table-column show-overflow-tooltip align="center" prop="totalFee" label="优惠券金额" />
          </el-table-column>
          <el-table-column label="10000.00">
            <el-table-column show-overflow-tooltip align="center" prop="ecoin" label="米宝金额" />
          </el-table-column>
          <el-table-column label="-">
            <el-table-column show-overflow-tooltip align="center" prop="createDate" label="订单时间" />
          </el-table-column>
        </el-table>
        <pagination v-show="expendTotal>0" :total="expendTotal" :page.sync="expendPageNum" :limit.sync="expendPageSize" @pagination="getExpendList" />
      </el-tab-pane>

      <!-- 店铺优惠券数量 -->
      <el-tab-pane label="店铺优惠券数量" name="thirdTab">
        <div class="coupon-header">
          <span class="title">店铺优惠券数量</span>
          <span class="amount">10</span>
        </div>
        <el-table v-loading="storeListLoading" :data="storeTableData" border stripe style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" prop="couponName" label="优惠券名称" />
          <el-table-column show-overflow-tooltip align="center" prop="shopName" label="店铺名称" />
          <el-table-column show-overflow-tooltip align="center" prop="decrease" label="优惠额度" />
          <el-table-column show-overflow-tooltip align="center" prop="" label="优惠类型" />
          <el-table-column show-overflow-tooltip align="center" prop="sn" label="使用订单号" />
          <el-table-column show-overflow-tooltip align="center" prop="sate" label="使用状态" />
          <el-table-column show-overflow-tooltip align="center" prop="useDate" label="使用时间" />
          <el-table-column show-overflow-tooltip align="center" prop="endDate" label="有效期" />
          <el-table-column show-overflow-tooltip align="center" prop="createDate" label="领取时间" />
        </el-table>
        <pagination v-show="storeTotal>0" :total="storeTotal" :page.sync="storePageNum" :limit.sync="storePageSize" @pagination="getStoreList" />
      </el-tab-pane>

      <!-- 商家优惠券数量  -->
      <el-tab-pane label="商品优惠券数量" name="fourthTab">
        <div class="coupon-header">
          <span class="title">商品优惠券数量</span>
          <span class="amount">10</span>
        </div>
        <el-table v-loading="productListLoading" :data="productTableData" border stripe style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" prop="couponName" label="优惠券名称" />
          <el-table-column show-overflow-tooltip align="center" prop="shopName" label="店铺名称" />
          <el-table-column show-overflow-tooltip align="center" prop="decrease" label="优惠额度" />
          <el-table-column show-overflow-tooltip align="center" prop="" label="优惠类型" />
          <el-table-column show-overflow-tooltip align="center" prop="sn" label="使用订单号" />
          <el-table-column show-overflow-tooltip align="center" prop="sate" label="使用状态" />
          <el-table-column show-overflow-tooltip align="center" prop="useDate" label="使用时间" />
          <el-table-column show-overflow-tooltip align="center" prop="endDate" label="有效期" />
          <el-table-column show-overflow-tooltip align="center" prop="createDate" label="领取时间" />
        </el-table>
        <pagination v-show="productTotal>0" :total="productTotal" :page.sync="productPageNum" :limit.sync="productPageSize" @pagination="getProductList" />
      </el-tab-pane>
    </el-tabs>
    <div style="margin-top:50px;padding-left:30px;">
      <el-button v-waves type="primary" @click="$router.push('/member/member-info')">返回</el-button>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getMemberDetails } from '@/apis/member'

export default {
  name: 'MemberInfoDetais',
  components: {
    Pagination
  },
  data() {
    return {
      activeName: 'firstTab',
      memberId: '',

      baseData: {}, // 基本信息

      expendTableData: [], // 消费记录
      expendTotal: 0,
      expendPageSize: 20,
      expendPageNum: 1,
      expendListLoading: false,

      storeTableData: [], // 店铺优惠券数量
      storeTotal: 0,
      storePageSize: 20,
      storePageNum: 1,
      storeListLoading: false,

      productTableData: [], // 商品优惠券数量
      productTotal: 0,
      productPageSize: 20,
      productPageNum: 1,
      productListLoading: false
    }
  },
  created() {
    this.memberId = this.$route.query.memberId
    this.getAllList()
  },
  methods: {
    getAllList() {
      getMemberDetails({ memberId: this.memberId, pageNum: 1, pageSize: 20 })
        .then(res => {
          const baseData = Object.assign({}, res.memberDto)
          this.baseData = baseData
          this.expendData = res.ordersVoPageInfo
          this.expendTableData = res.ordersVoPageInfo.list
          this.storeTableData = res.shopCouponVoPageInfo.list
          this.productTableData = res.productCouponVoPageInfo.list
        })
        .catch(err => this.$message({ type: 'error', message: err }))
    },
    getExpendList() {
      this.expendlistLoading = true
      const { memberId, expendTotal, expendPageSize, expendPageNum } = this
      getMemberDetails({ memberId, expendTotal, expendPageSize, expendPageNum })
        .then(res => {
          this.expendTableData = res.ordersVoPageInfo.list
          this.expendPageNum = res.ordersVoPageInfo.pageNum
          this.expendPageSize = res.ordersVoPageInfo.pageSize
          this.expendTotal = res.ordersVoPageInfo.total
        })
        .catch(err => this.$message({ type: 'error', message: err }))
        .finally(() => { this.expendlistLoading = false })
    },
    getStoreList() {
      this.storelistLoading = true
      const { memberId, storeTotal, storePageSize, storePageNum } = this
      getMemberDetails({ memberId, storeTotal, storePageSize, storePageNum })
        .then(res => {
          this.storeTableData = res.shopCouponVoPageInfo.list
          this.storePageNum = res.shopCouponVoPageInfo.pageNum
          this.storePageSize = res.shopCouponVoPageInfo.pageSize
          this.storeTotal = res.shopCouponVoPageInfo.total
        })
        .catch(err => this.$message({ type: 'error', message: err }))
        .finally(() => { this.storelistLoading = false })
    },
    getProductList() {
      this.productlistLoading = true
      const { memberId, productTotal, productPageSize, productPageNum } = this
      getMemberDetails({ memberId, productTotal, productPageSize, productPageNum })
        .then(res => {
          this.productTableData = res.productCouponVoPageInfo.list
          this.productPageNum = res.productCouponVoPageInfo.pageNum
          this.productPageSize = res.productCouponVoPageInfo.pageSize
          this.productTotal = res.productCouponVoPageInfo.total
        })
        .catch(err => this.$message({ type: 'error', message: err }))
        .finally(() => { this.productlistLoading = false })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-table thead.is-group th {
  text-align: center;
}
.coupon-header {
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
  .title {
    font-size: 14px;
    color: #333;
  }
  .amount {
    display: inline-block;
    width: 180px;
    color: #333;
    font-size: 15px;
    text-align: center;
    margin-left: 20px;
    border-radius: 5px;
    border: 1px solid #E4E4E4;
  }
}
</style>
