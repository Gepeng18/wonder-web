<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-plus" size="medium">添加</el-button>

    </div>
    <el-divider></el-divider>


    <div>
      <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          stripe
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

        <el-table-column type="index" width="50" />

        <el-table-column
            prop="name"
            label="菜单名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="permission"
            label="权限"
            width="180">
        </el-table-column>
        <el-table-column
            prop="path"
            label="路径"
            width="180">
        </el-table-column>
        <el-table-column
            prop="sort"
            label="排序"
            width="180">
        </el-table-column>
        <el-table-column
            label="类型"
            width="180">
          <template slot-scope="scope">
            {{typeMap[scope.row.menuType]}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template  slot-scope="scope">
            <el-button type="primary" size="mini" round @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" round @click="del(scope.row)">删除</el-button>

          </template>
        </el-table-column>

      </el-table>
    </div>

    <MenuEdit ref="menuEdit"/>
  </div>
</template>

<script>
import {getMapping} from "@/utils/MappingUtil";
import MenuEdit from "@/views/system/menu/MenuEdit.vue";

export default {
  name: "Menu",
  components: {MenuEdit},
  data() {
    return {
      tableData: [],
      typeMap:{}
    }
  },

  created() {
    this.typeMap = getMapping("system_menu_type")
  },

  mounted() {
    this.getData()
  },

  methods: {
    edit(row){
      this.$refs.menuEdit.show(row.id)
    },

    getData() {
      this.$api.menu.list().then(res => {
        this.tableData = res
      })
    },

    load(tree, treeNode, resolve) {
      let params = {
        parentId: tree.id
      }
      this.$api.menu.list(params).then(res => {
        resolve(res)
      })
    }
  },
}
</script>

<style scoped>

</style>
