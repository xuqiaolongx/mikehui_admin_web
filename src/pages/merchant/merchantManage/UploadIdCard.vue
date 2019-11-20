<template>
  <div>
    <div v-if="!imageUrl" class="settleIn-form-upload flex-column-center">
      <img class="card-image" :src="imgSrc" alt="">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="/api/common/fileUtils/upload"
        :show-file-list="false"
        :limit="1"
        :file-list="fileList"
        :on-change="picChange"
      >
        <el-button size="small" type="primary" style="margin-top: 10px">选择文件</el-button>
      </el-upload>
    </div>
    <div v-else class="settleIn-form-upload flex-column-center">
      <!-- <i class="el-icon-error close-icon" @click="closeImg" /> -->
      <el-image style="width: 100%; height: 100%" :src="imageUrl || ''" :preview-src-list="[imageUrl]" fit="contain" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'UploadIdCard',
  props: {
    imgSrc: {
      type: String,
      default: '@/assets/images/front-of-id-card.png'
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    closeImg() {
      this.$emit('emitData', '')
    },
    picChange(file, fileList) {
      this.fileList = fileList
      if (file.status === 'success') {
        this.$emit('emitData', file.response.data)
      }
    }
  }
}
</script>

<style lang="scss">
.flex-column-center{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.settleIn-form-upload{
  width: 133px;
  height: 136px;
  position: relative;
  .close-icon{
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 20px;
    z-index: 5;
    color: #b6b6b6;
    cursor: pointer;
  }
  .card-image{
    width: 100px;
    height: 72px;
    margin-top: 10px;
  }
}
.liences {
  .settleIn-form-upload {
    height: 180px;
    .card-image {
      height: 115px;
    }
  }

}
</style>
