<template>
  <div>
    <div>
      <el-button type="success" icon="el-icon-plus" size="mini" @click="clickAdd">添加</el-button>
    </div>
    <el-divider/>

    <div id="menuList">
      <el-table
          :key="keyNum"
          :data="tableData"
          style="width: 100%"
          row-key="id"
          stripe
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >

        <el-table-column type="index" width="50"/>

        <el-table-column
            prop="name"
            label="名称"
        >
        </el-table-column>

        <el-table-column
            label="图标"
        >
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>

        <el-table-column
            label="类型"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.menuType === 1 ? '' : scope.row.menuType === 2 ? 'success' : 'warning'">
              {{ typeMap[scope.row.menuType] }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
            prop="permission"
            label="权限标识"
        >
        </el-table-column>

        <el-table-column
            prop="path"
            label="路由路径"
        >
        </el-table-column>

        <el-table-column
            prop="component"
            label="组件路径"
        >
        </el-table-column>

        <el-table-column
            prop="sort"
            label="排序"
        >
        </el-table-column>

        <el-table-column label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="clickEdit(scope.row)">修改</el-button>
            <el-button type="text" class="color-danger" @click="clickDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <MenuEditDialog ref="menuEditDialog" @close="editDialogClose"/>

    <CommonDialog type="danger" ref="delDialog" @confirm="delConfirm">
      <div>
        确认删除 “ <b class="color-danger">{{ selectRow.name }}</b> ” ？
      </div>
    </CommonDialog>

  </div>
</template>

<script>
import {getMapping} from "@/utils/MappingUtil";
import MenuEditDialog from "@/views/system/menu/MenuEditDialog.vue";
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "index",
  components: {CommonDialog, MenuEditDialog},
  data() {
    return {
      tableData: [],
      typeMap: {},
      keyNum: 0,
      selectRow: {}
    }
  },

  created() {
    // this.typeMap = getMapping("system_menu_type")
    this.typeMap = {
      '1': '目录',
      '2': '菜单',
      '3': '按钮',
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    clickDel(row) {
      this.selectRow = row
      this.$refs.delDialog.show()
    },

    delConfirm(){
      this.$api.menu.del(this.selectRow.id).then(() => {
        this.selectRow = {}
        this.$refs.delDialog.close()
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {
        this.$refs.delDialog.stopLoading()
      })
    },

    clickEdit(row) {
      this.$refs.menuEditDialog.show(row.id, this.$gc.dialogType.EDIT)
    },

    clickAdd() {
      this.$refs.menuEditDialog.show(null, this.$gc.dialogType.ADD)
    },

    getData() {
      this.$api.menu.list().then(res => {
        this.tableData = res
        this.keyNum++
      })
    },

    editDialogClose() {
      this.getData()
    },

    load(tree, treeNode, resolve) {
      this.$api.menu.list({parentId: tree.id}).then(res => {
        resolve(res)
      })
    }
  },
}
</script>

<style scoped>

</style>
