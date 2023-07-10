<template>
  <CommonDialog ref="dialog" @confirm="confirm">
    <div>
      <el-form :model="formData" label-width="100px" label-suffix="：">
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
          <div style="width: 240px;overflow: auto;height: 180px;border: #d9dfe8 solid 1px; border-radius: 5px">
            <el-tree
                :data="menuTreeList"
                ref="tree"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                :highlight-current="true"
                show-checkbox
                @check="menuTeeChecked"
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
// import {DialogType} from "@/utils/constant"
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
      if (dialogType === this.$dialogType.Edit){
        this.getById(id)
      }else if (dialogType === this.$dialogType.Add){

      }

      this.getMenuTreeList()
      this.$refs.dialog.show()
    },

    menuTeeChecked(data, checked) {
      let halfCheckedKeys = checked.halfCheckedKeys
      let checkedKeys = checked.checkedKeys

      this.formData.menuIds = halfCheckedKeys.concat(checkedKeys)
      this.$message.success(this.formData.menuIds)
    },

    getById(id) {
      this.$api.role.get(id).then(res => {
        this.formData = res
      })
    },

    confirm() {
      this.$emit('confirm')
    },

    reset() {
      this.formData = {
        id: null,
        description: '',
        name: '',
        code: '',
        menuIds: []
      }
    },

    getMenuTreeList() {
      this.$api.menu.treeList().then(res => {
        this.menuTreeList = res
        if (this.dialogType === this.$dialogType.Edit){
          console.log('22222222', this.formData)
          this.$refs.tree.setCheckedKeys(this.formData.menuIds)
        }
        // 菜单树没回显
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.formData.menuIds)
          console.log('99999', this.formData.menuIds)

        })
      })
    }
  }
}
</script>

<style scoped>

</style>
