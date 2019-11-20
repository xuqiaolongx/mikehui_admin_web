<template>
  <div class="login-footer flex-column-center">
    <div>2013-2019 Copyright. Meamei Tech - All Rights Reserved <a @click="openHref">粤ICP备17069857</a></div>
    <div>本系统由广州米美科技有限公司提供技术支持</div>
    <div>客服电话：400-167-8229 服务时间：周一至周五 9:00—18:00</div>
  </div>
</template>

<script>

export default {
  name: 'PageFooter',
  data() {
    return {
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    openHref() {
      window.open('http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action')
    }
  }
}
</script>

<style lang='scss' scoped>
.login-footer{
  div{
    line-height: 24px;
    font-size: 15px;
  }
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
