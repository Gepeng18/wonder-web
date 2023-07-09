<template>
  <CommonDialog ref="dialog" @confirm="confirm">
    <el-form :model="formData" label-width="100px" label-suffix="：">
      <el-form-item label="上级">
        <el-popover v-model="popoverShow" style="width: 100%;" placement="bottom-start" trigger="focus">
          <el-input readonly style="font-weight: bold;color: #8c939d" placeholder="无" v-model="formData.parentName"
                    slot="reference"></el-input>
          <div style="width: 224px;height: 300px;overflow: auto;">
            <el-tree
                :data="options"
                ref="tree"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
                :highlight-current="true"
            >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="data.icon">{{ data.name }}</span>
          </span>
            </el-tree>
          </div>
        </el-popover>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="formData.name" clearable placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="排序">
<!--        <el-input v-model="formData.sort" clearable placeholder="请输入排序"></el-input>-->
        <el-input-number v-model="formData.sort" controls-position="right" @change="handleChange" :min="1" :max="999"></el-input-number>

      </el-form-item>

      <el-form-item label="状态">
        <el-switch
            :value="formData.enabled"
            active-color="#67C23A"
            inactive-color="#E6A23C"
            active-text="启用"
            inactive-text="停用"
            @change="switchChange(formData.enabled)"
        >
        </el-switch>
      </el-form-item>
    </el-form>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "DeptEdit",
  components: {CommonDialog},
  data() {
    return {
      formData: null,
      popoverShow: false,
      options: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
    }
  },

  updated() {
    this.$nextTick(() => {
      this.$refs.tree.setCurrentKey(this.formData.parentId)
    })
  },

  methods: {
    show(id) {
      this.getData(id)
    },
    getData(id) {
      this.$api.dept.getById(id, {target: '#mian'}).then(res => {
        this.formData = res
        this.getTree()
      })
    },
    handleNodeClick(data) {
      if (this.formData.parentId === data.id) {
        this.formData.parentId = '0'
        this.formData.parentName = ''
        this.$refs.tree.setCurrentKey('0')
      } else {
        this.formData.parentName = data.name
        this.formData.parentId = data.id
        this.$refs.tree.setCurrentKey(data.id)
      }
      this.popoverShow = false
    },
    getTree() {
      this.$api.dept.tree().then(res => {
        this.options = res
        this.$refs.dialog.show()
      })
    },
    confirm() {
      this.$api.dept.update(this.formData).then(() => {
        this.$emit('updated')
      })
    },
    switchChange(val) {
      this.formData.enabled = !val
    },
    handleChange(currentValue) {
      this.formData.sort = currentValue
    },
  }
}
</script>

<style scoped>
/deep/ .el-tree-node__content:hover {
//background: rgb(199, 42, 37);
}

/deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #d2e1f1;
}

/deep/.el-tree {
//background: #10498f;
//color: #ffffff;
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
//background-color:rgba(35, 220, 205, 0.78);
}
</style>