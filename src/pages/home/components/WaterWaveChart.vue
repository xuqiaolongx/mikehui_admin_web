<template>
  <div class="water-wave-wrap">
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale" :padding="0">
      <v-tooltip />
      <v-interval
        shape="liquid-fill-gauge"
        position="gender*value"
        color="gender"
        :v-style="style1"
      />
      <v-guide
        v-for="(row, index) in data"
        :key="index"
        type="text"
        :top="true"
        :position="{
          gender: row.gender,
          value: 50
        }"
        :content="row.value + '%'"
        :v-style="style2"
      />
    </v-chart>
  </div>
</template>

<script>
const data = [{
  gender: 'male',
  path: 'M381.759 0h292l-.64 295.328-100.127-100.096-94.368 94.368C499.808 326.848 512 369.824 512 415.712c0 141.376-114.56 256-256 256-141.376 0-256-114.624-256-256s114.624-256 256-256c48.8 0 94.272 13.92 133.12 37.632l93.376-94.592L381.76 0zM128.032 415.744c0 70.688 57.312 128 128 128s128-57.312 128-128-57.312-128-128-128-128 57.312-128 128z',
  value: 50
}]
const scale = [{
  dataKey: 'value',
  min: 0,
  max: 100
}]

export default {
  data() {
    return {
      data,
      scale,
      style1: {
        lineWidth: 10,
        opacity: 0.75
      },
      style2: {
        fontSize: 40,
        textAlign: 'center'
      },
      height: 300
    }
  }
}
</script>

<style lang="scss" scoped>
.water-wave-wrap {
}
</style>
