<template>
  <div>
    <el-select v-model="val" placeholder="请选择归属品牌" filterable clearable @change="handleChange">
      <el-option v-for="item in globalList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    }
  },
  data() {
    return {
      val: this.value,
      list: [
        { label: '高米易购', value: '高米易购' },
        { label: '信福易购', value: '信福易购' },
        { label: '米客惠', value: '米客惠' }
      ]
    }
  },
  computed: {
    ...mapState({
      globalList: function(state) {
        return state['my/component'].brandList
      }
    })
  },
  created() {
    this.$store.dispatch('my/component/getAffiliationBrandList')
  },
  methods: {
    handleChange(value) {
      this.$emit('update:value', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
