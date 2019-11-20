<template>
  <div>
    <el-date-picker
      v-model="startDate"
      :picker-options="disabledStartDate"
      value-format="yyyy-MM-dd"
      type="date"
      clearable
      placeholder="选择开始日期"
      style="margin-right: 10px"
      @change="handleChange"
    />
    <el-date-picker
      v-model="endDate"
      :picker-options="disabledEndDate"
      value-format="yyyy-MM-dd"
      type="date"
      clearable
      placeholder="选择结束日期"
      @change="handleChange"
    />
  </div>
</template>

<script>

export default {
  name: 'DateRangePicker',
  props: {
    start: {
      type: [String, Number],
      default: ''
    },
    end: {
      type: [String, Number],
      default: ''
    },
    addTime: {
      type: Boolean,
      default: true
    }
  },
  // 事件：change
  data() {
    return {
      startDate: this.start,
      endDate: this.end
    }
  },
  computed: {
    disabledStartDate() {
      return { disabledDate: (time1) => {
        const time2 = this.endDate
        if (!time1 || !time2) return false
        return time1.valueOf() > new Date(time2).valueOf()
      } }
    },
    disabledEndDate() {
      return { disabledDate: (time2) => {
        const time1 = this.startDate
        if (!time1 || !time2) return false
        return time2.valueOf() <= new Date(time1).valueOf()
      } }
    }
  },
  mounted() {
  },
  methods: {
    getValue(target) {
      let data = ''
      const addTime = this.addTime
      // 阻止返回的数据等于null
      const startDate = this.startDate || ''
      const endDate = this.endDate || ''
      // A && B 如果A为''就返回'', 不返回 '' + ' 00:00:00'
      const startDateTime = startDate && startDate + ' 00:00:00'
      const endDateTime = endDate && endDate + ' 23:59:59'
      switch (target) {
        case 'start':
          data = addTime ? startDateTime : startDate
          break
        case 'end':
          data = addTime ? endDateTime : endDate
          break
        case 'range':
          data = addTime ? [startDateTime, endDateTime] : [startDate, endDate]
          break
      }
      return data
    },
    handleChange() {
      this.$emit('update:start', this.getValue('start'))
      this.$emit('update:end', this.getValue('end'))
      this.$emit('change', this.getValue('range'))
    }
  }
}
</script>

<style lang='scss' scoped>
.el-select {
  margin-right: 10px;
}
</style>
