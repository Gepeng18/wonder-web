<template>
  <CommonDialog title="编辑" ref="dialog" @confirm="confirm" @cancel="cancel" >
    <el-form :model="formData" label-width="90px" label-suffix="：">
      <el-form-item label="菜单名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
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

        <el-popover v-model="popoverShow" style="width: 100%;" placement="bottom-start" trigger="focus">
          <el-input readonly style="font-weight: bold;color: #8c939d" placeholder="主目录" v-model="formData.parentName" slot="reference"></el-input>
          <div style="width: 224px;height: 300px;overflow: auto;">
            <el-tree
                :data="menuOptions"
                ref="tree"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
                :highlight-current="true"
                :filter-node-method="filterNode"
            >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="data.icon">{{data.name}}</span>
          </span>
            </el-tree>
          </div>
        </el-popover>

      </el-form-item>
      <el-form-item label="权限字符">
        <el-input v-model="formData.permission"></el-input>
      </el-form-item>
      <el-form-item label="菜单排序">
        <el-input-number v-model="formData.sort" controls-position="right" @change="handleChange" :min="1" :max="999"></el-input-number>
      </el-form-item>


    </el-form>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "MenuEdit",
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
      popoverShow: false

    }
  },

  // watch: {
  //   //方法1
  //   "formData.menuType"(newVal, oldVal) {
  //     console.log(`新值：${newVal}`);
  //     this.$refs.tree.filter(newVal);
  //   }
  // },

  updated() {
    // this.$refs.tree.filter(this.formData.menuType)

    this.$nextTick(() => {
      this.$refs.tree.setCurrentKey(this.formData.parentId)
    })
    // this.$refs.tree.setCheckedKeys([this.formData.parentId])
    // console.log('this.$refs.tree', this.$refs.tree.checkedNodes)
  },

  created() {
  },

  methods: {
    filterNode(value, data, node) {
      // if (value === 1 && data.menuType === 1){
      //   data
      // }else if (value === 2 && (data.menuType === 1 || data.menuType === 2)){
      //
      // }else if (value === 3 && data.menuType === 2){
      //
      // }
      return true
    },

    handleNodeClick(data) {
      if (this.formData.parentId === data.id){
        this.formData.parentId = '0'
        this.formData.parentName = ''
        this.$refs.tree.setCurrentKey('0')
      }else {
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
        this.menuOptions[0].children = res
        // this.menuOptions = res
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
    show(id) {
      this.getMenuType()

      this.getData(id)

      this.getMenuTree()

      this.$refs.dialog.show()
    },
    confirm() {

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
      this.options= []
    }
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
