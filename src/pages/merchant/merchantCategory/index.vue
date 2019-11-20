<template>
  <div>
    <el-button type="warning">刷新</el-button>
    <el-button class="btn-blue add-fist" @click="operateClassify('addFirst', '新增一级分类')">新增一级分类</el-button>
    <div v-loading="listLoading" class="tree-container">
      <el-tree
        ref="tree"
        :props="defaultProps"
        :data="globalTreeData"
        :indent="30"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKey"
        accordion
        icon-class="el-icon-arrow-right"
        node-key="id"
        class="filter-tree"
        empty-text="没有数据"
        @node-expand="nodeExpand"
      >
        <div slot-scope="{node, data}" class="custom-tree-node">
          <span>{{ data.label }}</span>
          <el-dropdown trigger="click">
            <span class="operate-text"> 操作 <i class="el-icon-arrow-down el-icon--right" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="node.level < 3" icon="el-icon-plus" @click.native="operateClassify('addNextLevel', '新增下级分类', data.id, node)">
                新增下级分类
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" @click.native="operateClassify('edit', '编辑分类', data.id, node)"> 编辑 </el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" @click.native="deleteClassify(data.id)"> 删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-tree>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="dialogClose">

      <div v-if="classTopName" class="content-section">
        <span class="title">上级分类：</span>
        <div class="right-wrap">{{ classTopName }}</div>
      </div>
      <div class="content-section">
        <span class="title">分类名称：</span>
        <div class="right-wrap">
          <el-input v-model.trim="className" :maxlength="classNameLimit" show-word-limit placeholder="请输入内容" />
        </div>
      </div>
      <div class="content-section">
        <span class="title">分类图片：</span>
        <div class="right-wrap">
          <upload-image :src.sync="classImage" :preview-modal="false" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="isSureOperate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addProductCategory, deleteProductCategory, editProductCategory, updateProductCategory } from '@/apis/commodity'
import { mapState } from 'vuex'
import UploadImage from '@/componentsMy/UploadImage'

export default {
  name: 'CommodityClassify',
  components: { UploadImage },
  data() {
    return {
      listLoading: false,
      defaultProps: { children: 'children', label: 'label' },
      expandedKey: [],

      dialogType: '',
      dialogVisible: false,
      dialogTitle: '',

      classId: '',
      classParentId: '',
      className: '',
      classTopName: '',
      classImage: '',
      classNameLimit: 4
    }
  },
  computed: {
    ...mapState({
      globalTreeData: function(state) { return state['my/component'].categoryList }
    })
  },
  created() {
    this.initList()
  },
  methods: {
    // 获取列表
    initList() {
      this.listLoading = true
      this.$store.dispatch('my/component/getProductCategoryList')
        .then(res => {
          this.listLoading = false
        })
    },
    // 编辑 新增
    operateClassify(type, title, id, node) {
      this.dialogType = type
      this.dialogTitle = title
      this.dialogVisible = true
      // console.log(node)
      if (node) this.classNameLimit = node.level * 2 + 2
      // 因为新增所以父ID是现在的ID
      if (type === 'addNextLevel') this.classParentId = id
      if (type === 'edit') {
        editProductCategory({ id })
          .then(res => {
            this.classId = res.productCategory.id || ''
            this.classParentId = res.parentCategory ? res.parentCategory.id : ''
            this.className = res.productCategory.name || ''
            const first = res.topCategory ? res.topCategory.name : ''
            const second = res.parentCategory ? res.parentCategory.name : ''
            this.classTopName = (first && first + ' / ') + second
            this.classImage = res.productCategory.image || ''
          })
      }
    },
    // 删除分类
    deleteClassify(id) {
      this.$confirm('确定删除该分类吗？?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProductCategory({ id })
          .then(res => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.initList()
          })
      })
    },
    // 确定 编辑 新增
    isSureOperate() {
      const { dialogType, className, classImage, classId, classParentId } = this
      if (!className) return this.$message({ type: 'error', message: '请输入分类名称' })
      const data = { name: className, image: classImage }
      if (dialogType === 'addNextLevel' || dialogType === 'addFirst') {
        if (dialogType === 'addNextLevel') data.parentId = classParentId
        addProductCategory(data)
          .then(res => {
            this.$message({ type: 'success', message: '操作成功' })
            this.dialogClose()
            this.initList()
          })
      } else if (dialogType === 'edit') {
        data.id = classId
        data.parentId = classParentId
        updateProductCategory(data)
          .then(res => {
            this.$message({ type: 'success', message: '操作成功' })
            this.dialogClose()
            this.initList()
          })
      }
    },
    // 对话框关闭
    dialogClose() {
      this.dialogVisible = false
      this.classId = ''
      this.classParentId = ''
      this.className = ''
      this.classTopName = ''
      this.classImage = ''
    },
    // 报错默认展开的项
    nodeExpand(data) {
      this.expandedKey = [data.id]
    }
  }
}
</script>

<style lang="scss" scoped>
.add-fist {
  margin-left: 20px;
}
// 树结构
.tree-container {
  margin: 30px 20px;
  border-top: 1px solid #dfe6ec;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .icon {
    font-size: 25px;
  }
  /deep/ .el-tree-node__content {
    height: 44px;
    border-bottom: 1px solid #dfe6ec;
  }
  /deep/ .el-tree-node__expand-icon {
    padding: 13px;
  }
}
// 弹窗
.content-section {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 15px;
  .title {
    width: 110px;
    color: #606266;
  }
  .right-wrap {
    flex: 1;
  }
}
</style>
