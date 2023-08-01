<template>
  <CommonDialog title="编辑" ref="dialog" @confirm="confirm" @cancel="cancel" width="800">
    <el-form :model="formData" :rules="rules" label-width="100px" label-suffix="：">

      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="上级菜单" prop="parentId">

            <el-popover v-model="popoverShow" style="width: 100%;" placement="right" trigger="focus">
              <el-input readonly style="font-weight: bold;color: #8c939d" placeholder="主目录"
                        v-model="formData.parentName"
                        slot="reference"/>
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
        </el-col>

        <el-col :span="12">
          <el-form-item label="类型" prop="menuType">
            <el-select
                v-model="formData.menuType"
                placeholder="请选择类型"
                @change="val => formData.menuType = val"
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
        </el-col>

        <el-col v-if="formData.menuType === 2" :span="12">
          <el-form-item label="框架打开" prop="inFrame">
            <el-select
                v-model="formData.inFrame"
                placeholder="请选择是否框架内打开"
                @change="val => formData.inFrame = val"
            >
              <el-option
                  v-for="item in trueOrFalseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-if="formData.inFrame || formData.menuType === 3" :span="12">
          <el-form-item label="路由路径" prop="path">
            <el-input v-model="formData.path"/>
          </el-form-item>
        </el-col>

        <el-col v-if="formData.inFrame || formData.menuType === 3" :span="12">
          <el-form-item label="组件路径">
            <el-input v-model="formData.component"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="权限标识">
            <el-input v-model="formData.permission"/>
          </el-form-item>
        </el-col>

        <el-col v-if="formData.menuType === 2 && !formData.inFrame" :span="12">
          <el-form-item label="外链类型">
            <el-select
                v-model="formData.targetType"
                placeholder="请选择外链打开方式"
                @change="val => formData.targetType = val"
            >
              <el-option
                  v-for="item in targetTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-if="formData.menuType === 2 && formData.inFrame" :span="12">
          <el-form-item label="是否缓存" prop="keepAlive">
            <el-select
                v-model="formData.keepAlive"
                placeholder="请选择是否缓存"
                @change="val => formData.keepAlive = val"
            >
              <el-option
                  v-for="item in trueOrFalseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-if="formData.menuType === 2 && !formData.inFrame" :span="12">
          <el-form-item label="外链地址" prop="url">
            <el-input v-model="formData.url"/>
          </el-form-item>
        </el-col>

        <el-col v-if="formData.menuType === 2 && formData.inFrame" :span="12">
          <el-form-item label="需登录访问" prop="needAuth">
            <el-select
                v-model="formData.needAuth"
                placeholder="请选择是否需登录访问"
                @change="val => formData.needAuth = val"
            >
              <el-option
                  v-for="item in trueOrFalseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="排序">
            <el-input-number
                style="width: 100%"
                v-model="formData.sort"
                controls-position="right"
                @change="val => formData.sort = val"
                :min="1"
                :max="999">
            </el-input-number>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "CurDialog",
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
      targetTypeOptions: [
        {
          value: 0,
          label: '当前页'
        },
        {
          value: 1,
          label: '新标签页'
        },
      ],
      trueOrFalseOptions: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        },
      ],
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: "blur"}
        ]
      }

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

    // handleChange(currentValue) {
    //   this.formData.sort = currentValue
    // },

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
      if (dialogType === this.$gc.dialogType.ADD) {
        this.toAdd()
      } else if (dialogType === this.$gc.dialogType.EDIT) {
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
      if (this.dialogType === this.$gc.dialogType.ADD) {
        this.$api.menu.save(this.formData).then(() => {
          this.$refs.dialog.close()
          this.$message.success('添加成功')
          this.$emit('close')
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })
      } else if (this.dialogType === this.$gc.dialogType.EDIT) {
        this.$api.menu.update(this.formData).then(() => {
          this.$refs.dialog.close()
          this.$message.success('保存成功')
          this.$emit('close')
        }).catch(() => {
          this.$refs.dialog.stopLoading()
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
