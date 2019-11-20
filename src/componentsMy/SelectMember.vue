<template>
  <div>
    <el-select v-model="val" placeholder="请选会员类型" filterable clearable @change="handleChange">
      <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value" />
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
        { label: '普通会员', value: 'General' },
        { label: '游客', value: 'Visitor' }
      ]
    }
  },
  computed: {
    ...mapState({
      globalList: function(state) {
        return state['my/component'].memberList
      }
    })
  },
  created() {
    this.$store.dispatch('my/component/getMemberList')
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
