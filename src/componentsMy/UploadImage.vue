<template>
  <div class="small">
    <el-upload
      ref="uploadImage"
      list-type="picture-card"
      action="/api/common/fileUtils/upload"
      :file-list="modalFileList"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :disabled="disabled"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="previewModal">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: [String, Array],
      default: ''
    },
    limit: {
      type: [Number],
      default: 1
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    previewModal: {
      type: [Boolean],
      default: true
    }
  },
  data() {
    return {
      // fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      responseUrl: ''
    }
  },
  computed: {
    modalFileList() {
      return this.src ? [{ name: '模拟.jpg', url: this.src || '' }] : []
    }
  },
  methods: {
    imageChange(value) {
      this.responseUrl = value
      this.$emit('update:src', value)
      this.$emit('change', value)
    },
    // 图片 上传成功
    handleAvatarSuccess(response, file, fileList) {
      // 限制 1 张数
      // this.fileList = fileList.slice(-1)
      // this.fileList = fileList.map(item => Object.assign({}, item, { url: item.response && item.response.data }))
      this.imageChange(response.data)
    },
    // 图片 限制上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 图片 删除
    handleRemove(file, fileList) {
      this.imageChange('')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.responseUrl || this.src
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
