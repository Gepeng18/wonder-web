<template>
  <CommonDialog ref="dialog" @confirm="confirm" @cancel="cancel">
    <el-form :model="formData" :rules="rules" label-width="100px" label-suffix="：">
      <el-form-item label="上级">
        <el-popover v-model="popoverShow" style="width: 100%;" placement="right-start" trigger="focus">
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

      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-input-number style="width: 240px" v-model="formData.sort" controls-position="right" @change="handleChange"
                         :min="1" :max="999"/>
      </el-form-item>

      <!--      <el-form-item label="状态">-->
      <!--        <el-switch-->
      <!--            :value="formData.enabled"-->
      <!--            active-color="#67C23A"-->
      <!--            inactive-color="#E6A23C"-->
      <!--            active-text="启用"-->
      <!--            inactive-text="停用"-->
      <!--            @change="switchChange(formData.enabled)"-->
      <!--        >-->
      <!--        </el-switch>-->
      <!--      </el-form-item>-->
    </el-form>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";
import {validateEMail, validatePhone} from "@/utils/validate";

export default {
  name: "DeptSave",
  components: {CommonDialog},
  data() {
    return {
      formData: {},
      popoverShow: false,
      options: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
      dialogType: null,
      rules: {
        name: [
          {required: true, trigger: 'blur', message: '请输入名称'},
          {min: 1, max: 10, message: '请输入名称', trigger: "blur"}
        ]
      },
    }
  },

  methods: {
    show(id = null, dialogType = null) {
      this.dialogType = dialogType
      if (dialogType === this.$gc.dialogType.ADD) {
        this.toAdd()
      } else if (dialogType === this.$gc.dialogType.EDIT) {
        this.toEdit(id)
      }
    },

    async toAdd() {
      await this.getTree()
      this.$refs.dialog.show()
    },

    async toEdit(id) {
      await this.getData(id)
      await this.getTree()
      this.$refs.dialog.show()
    },

    getData(id) {
      this.$api.dept.getById(id).then(res => {
        this.formData = res
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

    async getTree() {
      this.$api.dept.tree().then(res => {
        this.options = res
      })
    },

    confirm() {
      if (this.dialogType === this.$gc.dialogType.ADD) {
        this.$api.dept.save(this.formData).then(() => {
          this.$refs.dialog.close()
          this.reset()
          this.$emit('close')
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })
      } else if (this.dialogType === this.$gc.dialogType.EDIT) {
        this.$api.dept.update(this.formData).then(() => {
          this.$refs.dialog.close()
          this.reset()
          this.$emit('close')
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })
      }
    },

    switchChange(val) {
      this.formData.enabled = !val
    },

    handleChange(currentValue) {
      this.formData.sort = currentValue
    },

    cancel() {
      this.reset()
    },

    reset() {
      this.formData = {}
    }
  }
}
</script>

<style scoped>
/deep/ .el-tree-node__content:hover {
//background: rgb(199, 42, 37);
}

/deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #d2e1f1;
}

/deep/ .el-tree {
//background: #10498f; //color: #ffffff;
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
//background-color:rgba(35, 220, 205, 0.78);
}
</style>
