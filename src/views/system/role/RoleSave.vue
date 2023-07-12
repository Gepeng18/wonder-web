<template>
  <CommonDialog ref="dialog" @confirm="confirm" @cancel="cancel">
    <div>
      <el-form :model="formData" label-width="60px" label-suffix="：">
        <el-form-item label="名称">
          <el-input v-model="formData.name" clearable placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="formData.code" clearable placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
              type="textarea"
              clearable
              maxlength="30"
              v-model="formData.description"
              :autosize="{minRows: 2, maxRows: 3}"
              placeholder="请输入描述"
              show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="菜单">
          <div style="width: 280px;overflow: auto;height: 180px;border: #d9dfe8 solid 1px; border-radius: 5px">
            <el-tree
                :data="menuTreeList"
                ref="tree"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                :highlight-current="true"
                show-checkbox
                @check="menuTreeChecked"
                :check-strictly="true"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span :class="data.icon">{{ data.name }}</span>
              </span>
            </el-tree>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "RoleSave",
  components: {CommonDialog},
  data() {
    return {
      formData: {
        id: null,
        description: '',
        name: '',
        code: '',
        menuIds: []
      },
      menuTreeList: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
      dialogType: null,

    }
  },
  methods: {
    show(id = null, dialogType = null) {
      this.dialogType = dialogType

      if (dialogType === this.$gc.dialogType.Edit) {
        // 编辑
        this.toEdit(id)
      } else if (dialogType === this.$gc.dialogType.Add) {
        // 新增
        this.toAdd()
      }

    },

    async toAdd() {
      await this.getMenuTreeList()
      this.$refs.dialog.show()
    },

    async toEdit(id) {
      await this.getById(id)
      await this.getMenuTreeList()
      this.$refs.dialog.show()
    },

    menuTreeChecked(data, checked) {
      let halfCheckedKeys = checked.halfCheckedKeys
      let checkedKeys = checked.checkedKeys
      this.formData.menuIds = halfCheckedKeys.concat(checkedKeys)
    },

    async getById(id) {
      await this.$api.role.get(id).then(res => {
        this.formData = res
      })
    },

    confirm() {
      if (this.dialogType === this.$gc.dialogType.Edit) {
        this.$api.role.update(this.formData).then(() => {
          this.reset()
          this.$emit('close')
          this.$refs.dialog.close()
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })

      } else if (this.dialogType === this.$gc.dialogType.Add) {
        this.$api.role.save(this.formData).then(() => {
          this.reset()
          this.$emit('close')
          this.$refs.dialog.close()
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })
      }
    },

    cancel() {
      this.reset()
      this.$emit('cancel')
    },

    reset() {
      this.formData = {
        id: null,
        description: '',
        name: '',
        code: '',
        menuIds: []
      }
      this.menuTreeList = []
      this.dialogType = null
    },

    getMenuTreeList() {
      this.$api.menu.treeList().then(res => {
        this.menuTreeList = res
        if (this.formData.menuIds !== []) {
          this.$refs.tree.setCheckedKeys(this.formData.menuIds)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
