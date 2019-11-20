<template>
  <div>
    <el-select v-model="val" placeholder="请选择供应商" filterable clearable @change="handleChange">
      <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
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
        { value: 1, label: '四川供应商' },
        { value: 2, label: '湖南供应商' }
      ]
    }
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
