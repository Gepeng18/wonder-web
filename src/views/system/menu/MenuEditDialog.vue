<template>
  <CommonDialog title="编辑" ref="dialog" @confirm="confirm" @cancel="cancel">
    <el-form :model="formData" label-width="90px" label-suffix="：">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
            v-model="formData.menuType"
            placeholder="请选择类型"
            @change="menuTypeChange"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级菜单">

        <el-popover v-model="popoverShow" style="width: 100%;" placement="right" trigger="focus">
          <el-input readonly style="font-weight: bold;color: #8c939d" placeholder="主目录" v-model="formData.parentName"
                    slot="reference"></el-input>
          <div style="width: 224px;height: 400px;overflow: auto;">
            <el-tree
                :data="menuOptions"
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

<!--      根据菜单类型显示不同的输入框-->
      <el-form-item label="路由路径">
        <el-input v-model="formData.path"></el-input>
      </el-form-item>

      <el-form-item label="组件路径">
        <el-input v-model="formData.component"></el-input>
      </el-form-item>

      <el-form-item label="权限标识">
        <el-input v-model="formData.permission"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-input-number
            style="width: 250px"
            v-model="formData.sort"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="999">
        </el-input-number>
      </el-form-item>


    </el-form>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "MenuEditDialog",
  components: {CommonDialog},
  data() {
    return {
      formData: {},
      menuOptions: [{
        id: 0,
        name: "主目录",
        children: null,
        menuType: 1,
      }],
      options: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
      popoverShow: false,
      dialogType: null,

    }
  },
  updated() {
    // this.$nextTick(() => {
    //   this.$refs.tree.setCurrentKey(this.formData.parentId)
    // })
  },
  methods: {
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

    menuTypeChange(val) {
      this.formData.menuType = val
    },
    handleChange(currentValue) {
      this.formData.sort = currentValue
    },

    getMenuTree() {
      this.$api.menu.treeList().then(res => {
        // this.menuOptions[0].children = res
        this.menuOptions = res
      })
    },

    getMenuType() {
      this.options =
          [
            {
              value: 1,
              label: '目录'
            },
            {
              value: 2,
              label: '菜单'
            },
            {
              value: 3,
              label: '按钮'
            },
          ]
    },

    getData(id) {
      this.$api.menu.get(id).then(res => {
        this.formData = res
      })
    },

    show(id = null, dialogType = null) {
      this.dialogType = dialogType
      if (dialogType === this.$globalConst.dialogType.Add) {
        this.toAdd()
      } else if (dialogType === this.$globalConst.dialogType.Edit) {
        this.toEdit(id)
      }

      this.getMenuType()
    },

    async toAdd() {
      await this.getMenuTree()
      this.$refs.dialog.show()
    },

    async toEdit(id) {
      await this.getData(id)
      await this.getMenuTree()
      this.$refs.dialog.show()
    },

    confirm() {
      if (this.dialogType === this.$globalConst.dialogType.Add) {
        this.$api.menu.save(this.formData).then(() => {
          this.$message.success('添加成功')
          this.$emit('refresh')
        })
      } else if (this.dialogType === this.$globalConst.dialogType.Edit) {
        this.$api.menu.update(this.formData).then(() => {
          this.$message.success('保存成功')
          this.$emit('refresh')
        })
      }
    },

    cancel() {
      console.log("取消")
      this.formData = {}
      this.menuOptions = [{
        id: 0,
        name: "主目录",
        children: null,
        menuType: 1,
      }]
      this.options = []
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
//background-color: $color-warning;
}

/deep/ .el-tree {
//background: #10498f; //color: #ffffff;
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
//background-color:rgba(35, 220, 205, 0.78);
}
</style>
