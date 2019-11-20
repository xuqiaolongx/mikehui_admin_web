<template>
  <div class="list">
    <div><span>好评</span><span>123</span></div>
    <div><span>中评</span><span>123</span></div>
    <div><span>差评</span><span>123</span></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='scss' scoped>
.list {
  padding: 30px 15px;
  div {
    border: 1px solid #a0a0a0;
    padding: 12px 15px;
    border-left: 5px solid;
    margin-bottom: 15px;
    font-size: 15px;
    cursor: pointer;
    span:last-child {
      color: #379efd;
      font-weight: 600;
      float: right;
    }
    &:nth-child(1) {
      border-left-color: #ff7373;
    }
    &:nth-child(2) {
      border-left-color: #ffd100;
    }
    &:nth-child(3) {
      border-left-color: #297aff;
    }
  }

}
</style>
