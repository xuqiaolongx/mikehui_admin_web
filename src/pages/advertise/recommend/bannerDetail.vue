<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="广告名称" required>
      <el-input v-model="form.adName" placeholder="输入广告名称" style="width: 200px" />
    </el-form-item>
    <el-form-item label="广告图片" required>
      <upload-image :src.sync="form.picture" />
    </el-form-item>
    <el-form-item label="类型" required>
      <el-select v-model="form.banner" placeholder="选择轮播图类型" @change="bannerChange">
        <el-option label="指定商品" value="Product" />
        <el-option label="指定店铺" value="Shop" />
        <el-option label="指定分类" value="Category" />
      </el-select>
    </el-form-item>
    <el-form-item v-show="form.banner === 'Product'" label="商品ID" required>
      <el-input v-model="form.id" placeholder="输入商品的ID" style="width: 200px" />
    </el-form-item>
    <el-form-item v-show="form.banner === 'Shop'" label="店铺编号" required>
      <el-input v-model="form.id" placeholder="输入店铺的编号" style="width: 200px" />
    </el-form-item>
    <el-form-item v-show="form.banner === 'Category'" label="分类" required>
      <el-select v-model="form.id" placeholder="选择分类">
        <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="排序" required>
      <el-input v-model.number="form.order" style="width: 200px" />
      <span>(输入数字)</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('form')">提交</el-button>
      <el-button @click="$router.back(-1)">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import UploadImage from '@/componentsMy/UploadImage'
import { GroupToPromoteSave, GroupToPromoteEdit, GroupToPromoteUpdate } from '@/apis/advertisement'
import { oneCategory } from '@/apis/commodity'
import { parseType, parseBanner } from '../constType'

export default {
  name: 'AdvertiseDetail',
  components: { UploadImage },
  data() {
    return {
      type: 'CollageProduct',
      categoryList: [],
      form: {
        adName: '',
        banner: 'Product',
        order: null,
        picture: '',
        id: null
      }
    }
  },
  mounted() {
    this.getOneCategory()
    this.getAdvertiseInfo()
  },
  methods: {
    submit() {
      const { picture, order, banner, adName, id } = this.form
      const type = this.type
      if (!adName) return this.$message.error('请输入广告名称')
      if (!id) return this.$message.error('请输入商品的ID')
      if (!picture) return this.$message.error('请输入广告名称')
      if (!order) return this.$message.error('请输入轮播图的排序')
      if (!banner) return this.$message.error('请选择类型')
      if (!this.$route.query.id) {
        GroupToPromoteSave({ picture, order, banner, adName, type, code: id })
          .then(res => {
            this.$message.success('添加成功')
            this.$router.back(-1)
          })
      } else {
        GroupToPromoteUpdate({ picture, order, banner, adName, type, code: id, id: this.$route.query.id })
          .then(res => {
            this.$message.success('更新成功')
            this.$router.back(-1)
          })
      }
    },

    bannerChange(value) {
      this.form.id = ''
    },

    getOneCategory() {
      oneCategory().then(res => {
        this.categoryList = res
      })
    },

    getAdvertiseInfo() {
      const id = this.$route.query.id
      if (!id) return
      GroupToPromoteEdit({ id }).then(res => {
        this.form.adName = res.adName
        this.form.banner = parseBanner(res.banner)
        this.form.order = res.order
        this.form.id = Number(res.code)
        this.form.picture = res.picture
        this.form.type = parseType(res.type)
      })
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
