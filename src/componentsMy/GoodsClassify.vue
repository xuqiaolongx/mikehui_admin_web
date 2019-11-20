<template>
  <div>
    <el-popover v-model="visible" placement="bottom-start" width="300" trigger="click">
      <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤" size="small" />
      <div class="tree-container">
        <el-tree
          ref="tree"
          :props="defaultProps"
          :data="globalTreeData"
          :filter-node-method="filterNode"
          :check-strictly="judeStrictly"
          :default-checked-keys="defaultChecked"
          class="filter-tree"
          show-checkbox
          node-key="id"
          empty-text="没有数据"
          @check="checkChange"
        />
      </div>
      <div class="tree-bottom">
        <el-button size="mini" type="danger" plain @click="clearCheck">清空</el-button>
        <el-button size="mini" type="primary" plain @click="visible = false">确认</el-button>
      </div>
      <el-input slot="reference" :value="classifyString" placeholder="请选择分类" clearable readonly />
    </el-popover>
  </div>
</template>
<script>
import { debounce } from '@/utils/index'
import { mapState } from 'vuex'
export default {
  props: {
    multiple: {
      // 多选
      type: Boolean,
      default: false
    },
    strictly: {
      // 父子不关联 仅多选时可用，单选时强制为true
      type: Boolean,
      default: false
    },
    defaultChecked: {
      // 默认回显的勾选项目
      type: Array,
      default: () => []
    },
    data: {
      // 自定义treeData, 注意需要符合 id 和 label 属性
      type: Array,
      required: false,
      default: () => []
    }
  },
  // 事件：change
  data() {
    return {
      classifyNodes: [],
      classifyKeys: [],
      filterText: '',
      visible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    classifyString() {
      return this.classifyNodes.reduce((pre, item) => {
        return pre + item.label + ','
      }, '').slice(0, -1)
    },
    judeStrictly() {
      // 当单选时，强制父子节点不关联
      return !this.multiple ? true : this.strictly
    },
    ...mapState({
      globalTreeData: function(state) {
        return this.data.length > 0 ? this.data : state['my/component'].categoryList
      }
    })
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.$store.dispatch('my/component/getProductCategoryList')
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    checkChange(node, currentValue) {
      // 单选
      !this.multiple && this.$refs.tree.setCheckedKeys([node.id])
      this.checkChangeComplete()
    },
    checkChangeComplete: debounce(function() {
      this.classifyKeys = this.$refs.tree.getCheckedKeys()
      this.classifyNodes = this.$refs.tree.getCheckedNodes()
      this.$emit('update:nodes', this.classifyNodes)
      this.$emit('update:keys', this.classifyKeys)
      this.$emit('change')
    }, 100),
    clearCheck() {
      this.$refs.tree.setCheckedKeys([])
      this.checkChangeComplete()
    }
  }

}
</script>

<style lang='scss' scoped>
.tree-container{
  max-height: 400px;
  margin: 5px 0;
  overflow: auto;
  .filter-tree {
    margin: 10px 5px;
    /deep/ .el-tree-node__label{
      text-indent: 8px;
    }
  }
}
.tree-bottom {
  text-align: right;
  margin-top: 15px 15px 0 0;
}
</style>
