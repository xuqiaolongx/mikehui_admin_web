<template>
  <div :class="['upload-image', {wrap: disableUpload}]">
    <el-upload
      action="/api/common/fileUtils/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="handleBefore"
      :file-list="fileList"
      :limit="limit"
      :multiple="false"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 1
    },
    disableUpload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  watch: {
    image(val, old) {
      if (val) {
        this.fileList = [{ uid: '-1', url: val }]
      }
    }
  },
  mounted() {
  },
  methods: {
    // 超过上传数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件`)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('uploadChange', {})
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleBefore(file) {
      if ((file.size / 1024) > 1000) {
        this.$message.error('当前图片超过1M，请更换图片大小')
        return false
      }
    },
    handleSuccess(res, file, fileList) {
      this.fileList = fileList
      this.$emit('uploadChange', file)
    }
  }
}
</script>

<style lang="scss">
.wrap{
  .el-upload--picture-card{
    display: none;
  }
}
</style>
