<template>
  <div class="address-select">
    <el-select v-model="provinceId" placeholder="请选择省份" @change="handleProvinceSelect">
      <el-option v-for="item in provinceArr" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-select v-model="cityId" placeholder="请选择城市" @change="handleCitySelect">
      <el-option v-for="item in cityArr" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-select v-model="districtId" placeholder="请选择地区">
      <el-option v-for="item in districtArr" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<script>
import { getRoot, getCity, getDistrict } from '@/api/common'
import { setTimeout } from 'timers'

export default {
  name: 'AddressSelect',
  props: {
    finallyId: {
      type: Number,
      default: undefined
    },
    provinceids: {
      type: Number,
      default: undefined
    },
    cityids: {
      type: Number,
      default: undefined
    },
    areaids: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      provinceId: null,
      provinceArr: [],

      cityId: null,
      cityArr: [],

      districtId: null,
      districtArr: [],

      finallyIds: '',

      isNoneDistrict: false,
      // 请求省、市、区的存储数组，顺序依次下来
      provinceIdStore: [],
      cityIdsStore: [],
      areaIdsStore: [],
      // 传递来的省id、市id、区id分别所在其存储数组的下标值
      provinceIdsIndex: undefined,
      cityIdsIndex: undefined,
      areaIdsIndex: undefined
    }
  },

  watch: {
    districtId(value) {
      const finallyId = this.isNoneDistrict ? this.cityId : value
      this.$emit('update:finallyId', finallyId)
    }
  },
  mounted() {
    // 分别请求得到省、市、区的存储数组
    setTimeout(() => {
      getRoot().then(res => {
        this.provinceIdStore = res
      })
      getCity({ areaId: this.provinceids }).then(res => {
        this.cityIdsStore = res
      })
      getDistrict({ areaId: this.cityids }).then(res => {
        this.areaIdsStore = res
      })
    }, 70)
    // 分别请求得到省id、市id、区id所在其存储数组的下标值
    setTimeout(() => {
      this.changeprovince(this.provinceIdStore, this.provinceids)
      this.changecity(this.cityIdsStore, this.cityids)
      this.changearea(this.areaIdsStore, this.areaids)
    }, 170)
    setTimeout(() => {
      this.initDate(true, true, true)
    }, 270)
  },

  methods: {
    changeprovince(arr1, one) {
      let a
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id === one) {
          a = i
        }
      }
      this.provinceIdsIndex = a
    },
    changecity(arr2, two) {
      let a
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].id === two) {
          a = i
        }
      }
      this.cityIdsIndex = a
    },
    changearea(arr3, three) {
      let a = 3
      for (let i = 0; i < arr3.length; i++) {
        if (arr3[i].id === three) {
          a = i
        }
      }
      this.areaIdsIndex = a
    },
    // 初始化数据
    async initDate(needGetRoot, needGetCity, needGetDistrict) {
      needGetRoot && await getRoot().then(res => { this.provinceArr = res; this.provinceId = res[this.provinceIdsIndex].id })
      needGetCity && await getCity({ areaId: this.provinceId }).then(res => { this.cityArr = res; this.cityId = res[this.cityIdsIndex].id })
      needGetDistrict && await getDistrict({ areaId: this.cityId }).then(res => {
        this.districtArr = res
        if (res.length) { // 判断该城市是否有地区
          this.districtId = res[this.areaIdsIndex].id
          this.isNoneDistrict = false
        } else {
          this.districtId = null
          this.isNoneDistrict = true
        }
      })
    },

    // 选择省份
    async handleProvinceSelect() {
      this.initDate(false, true, true)
    },

    handleCitySelect() {
      this.initDate(false, false, true)
    }
  }
}
</script>

<style lang='scss' scoped>
.el-select {
  margin-right: 10px;
}
</style>
