<template>
  <div class="attribution-brand-wrap">
    <el-select v-model="brandValue" filterable placeholder="请选择归属品牌" clearable style="width: 234px" @change="handleChange">
      <el-option
        v-for="item in brandOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      brandValue: this.value,
      brandOptions: [{
        value: 1,
        label: '高米易购'
      }, {
        value: 2,
        label: '信福易购'
      }, {
        value: 3,
        label: '米客惠'
      }]
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
