<template>
  <div class="copy" @click="copy(data)">
    {{ data }}
  </div>
</template>

<script>
import { debounce } from '@/utils/index'
export default {
  props: {
    data: { type: String, required: true }
  },
  methods: {
    copy: debounce(function(data) {
      const element = document.createElement('textarea')
      element.innerHTML = data
      document.body.appendChild(element)
      element.select()
      document.execCommand('Copy')
      document.body.removeChild(element)
      this.$message({ type: 'success', message: '复制文本成功' })
    }, 300, true)
  }
}
</script>

<style lang='scss' scoped>
  .copy {
    cursor: cell;
  }
</style>
