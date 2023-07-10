<template>
  <div>
    <div>
      <el-button type="success" icon="el-icon-plus" size="mini">添加</el-button>
    </div>
    <el-divider/>

    <div id="menuList">
      <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          stripe
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >

        <el-table-column type="index" width="50" />

        <el-table-column
            prop="name"
            label="菜单名称"
        >
        </el-table-column>

        <el-table-column
            label="图标"
        >
          <template slot-scope="scope">
            <i :class="scope.row.icon" ></i>
          </template>
        </el-table-column>

        <el-table-column
            label="类型"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.menuType === 1 ? '' : scope.row.menuType === 2 ? 'success' : 'warning'">
              {{typeMap[scope.row.menuType]}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
            prop="permission"
            label="权限"
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
    edit(row){
      this.$refs.menuEdit.show(row.id)
    },

    getData() {
      this.$api.menu.list({},{target: '#main'}).then(res => {
        this.tableData = res
      })
    },

    load(tree, treeNode, resolve) {
      let params = {
        parentId: tree.id
      }
      this.$api.menu.list(params, {target: '#main'}).then(res => {
        resolve(res)
      })
    }
  },
}
</script>

<style scoped>

</style>
