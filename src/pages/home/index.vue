<template>
  <div class="home-wrap">
    <el-row :gutter="20">
      <el-col :lg="17">
        <div class="module-box">
          <ul class="data-list">
            <li>
              <img :src="require('@/assets/images/今日销售额.png')" alt="">
              <div><p>￥100000.00</p><p>今日销售额</p></div>
            </li>
            <li>
              <img :src="require('@/assets/images/今日线下销售额.png')" alt="">
              <div><p>￥100000.00</p><p>今日线下销售额</p></div>
            </li>
            <li>
              <img :src="require('@/assets/images/今日线上销售额.png')" alt="">
              <div><p>￥100000.00</p><p>今日线上销售额</p></div>
            </li>
            <li>
              <img :src="require('@/assets/images/今日订单数.png')" alt="">
              <div><p>100000.00</p><p>今日订单数</p></div>
            </li>
            <li>
              <img :src="require('@/assets/images/今日线下订单数.png')" alt="">
              <div><p>100000.00</p><p>今日线下订单数</p></div>
            </li>
            <li>
              <img :src="require('@/assets/images/今日线上订单数.png')" alt="">
              <div><p>100000.00</p><p>今日线上订单数</p></div>
            </li>
          </ul>
        </div>
        <div class="module-box">
          <ul class="data-list">
            <li>
              <img :src="require('@/assets/images/商家入驻总数.png')" alt="">
              <div><p>100000.00</p><p>商家入驻总数</p></div>
            </li>
            <li>
              <img :src="require('@/assets/images/订单总数.png')" alt="">
              <div><p>100000.00</p><p>订单总数</p></div>
            </li>
            <li>
              <img :src="require('@/assets/images/销售总金额.png')" alt="">
              <div><p>100000.00</p><p>销售总金额</p></div>
            </li>
          </ul>
        </div>
        <div class="module-box">
          <Chart />
        </div>
      </el-col>
      <el-col :lg="7">
        <div class="module-box">
          <p class="title">评论情况</p>
          <CommentList />
        </div>
        <div class="module-box">
          <p class="title">普通订单占比</p>
          <div class="limit">
            <InstrumentChart />
          </div>
        </div>
        <div class="module-box">
          <p class="title">会员订单占比</p>
          <div class="limit">
            <WaterWaveChart />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from './components/Chart'
import CommentList from './components/CommentList'
import InstrumentChart from './components/InstrumentChart'
import WaterWaveChart from './components/WaterWaveChart'
export default {
  name: 'Home',
  components: {
    CommentList,
    InstrumentChart,
    WaterWaveChart,
    Chart
  },
  data() {
    return {
      bubbleData: [
        {
          comments: '哈哈',
          date: '1902/04/19',
          deaths: '10',
          lat: '14',
          lng: '-91',
          location: 'Quezaltenango and San Marcos, Guatemala',
          magnitude: '1'
        },
        {
          comments: '嗯嗯',
          date: '1902/04/19',
          deaths: '200',
          lat: '37',
          lng: '-122.55',
          location: 'Quezaltenango and San Marcos, Guatemala',
          magnitude: '5'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.home-wrap {
  background: #f2f2f2 !important;
  padding: 5px !important;
}
.module-box {
  background: #fff;
  margin-bottom: 20px;
  .title {
    margin: 0;
    font-size: 17px;
    border-bottom: 1px solid #dadada;
    text-indent: 5%;
    line-height: 50px;
  }
  .data-list {
    padding: 25px 25px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      border: 1px solid #b1b1b1;
      height: 130px;
      width: 30%;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      >img {
        width: 70px;
        height: 70px;
      }
      >div>p:first-child {
        font-size: 20px;
        font-weight: 700;
        margin: 13px 0;
      }
      >div>p:last-child {
        font-size: 14px;
        margin: 13px 0;
      }
    }
  }
  .limit {
    max-width: 400px;
    max-height: 350px;
    margin:0 auto;
  }
}
</style>
