<template>
  <div>
    <el-collapse-transition>
      <TableSearchBar v-show="showSearchBar" @search="handleSearch" @reset="handleReset">
        <el-form :model="searchForm" label-suffix=":" label-width="100px">
          <el-row :gutter="5" align="middle">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
              <el-form-item label="角色名称">
                <el-input v-model="searchForm.name" placeholder="角色名称"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </TableSearchBar>
    </el-collapse-transition>

    <div style="padding: 0 10px">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add">添加</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="showSearchBar = !showSearchBar">搜索</el-button>
    </div>

    <el-divider/>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50"/>
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column prop="code" label="角色编码"/>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
                :value="scope.row.enabled"
                active-color="#67C23A"
                inactive-color="#E6A23C"
                @change="switchChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickEdit(scope.row)">修改</el-button>
            <el-button type="text" size="mini" >数据权限</el-button>
            <el-button type="text" size="mini" >分配用户</el-button>
            <el-button type="text" style="color: #F56C6C" size="mini" @click="clickDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <div style="text-align: center">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.curPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
      </div>

      <!--删除弹框-->
      <RoleDelDialog ref="delDialog" @confirm="delDialogConfirm"/>

      <!--停启用 弹框-->
      <RoleEnabledDialog ref="enabledDialog" @confirm="enabledDialogConfirm"/>

      <RoleSave ref="roleSave" @confirm="confirm"/>
    </div>

  </div>

</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import RoleSave from "@/views/system/role/RoleSave.vue";
import RoleEnabledDialog from "@/views/system/role/RoleEnabledDialog.vue";
import RoleDelDialog from "@/views/system/role/RoleDelDialog.vue";

export default {
  name: "Role",
  components: {RoleDelDialog, RoleEnabledDialog, RoleSave, CommonDialog, TableSearchBar},
  data() {
    return {
      searchForm: {
        name: '',
      },
      tableData: [],
      pageInfo: {
        total: 0,
        curPage: 1,
        pageSize: 10
      },
      showSearchBar: false,
    }
  },

  created() {
    this.findList()
  },

  methods: {
    switchChange(row) {
      this.$refs.enabledDialog.show(row)
    },

    enabledDialogConfirm(){
      this.findList()
    },

    delDialogConfirm(){
      this.findList()
    },

    add(row) {
      this.$refs.roleSave.show(row.id, this.$dialogType.Add)
    },

    clickEdit(row) {
      this.$refs.roleSave.show(row.id, this.$dialogType.Edit)
    },

    clickDel(row) {
      this.$refs.delDialog.show(row)
    },

    findList() {
      const params = {
        ...this.searchForm,
        ...this.pageInfo
      }
      this.$api.role.page(params, {target: '#main'}).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.pageInfo.pages = res.pages
      })
    },
    confirm(){
      this.findList()
    },
    handleSearch() {
      this.findList()
    },
    handleReset(e) {
      this.searchForm.name = ''
      this.pageInfo.curPage = 1
      this.findList()
      e.target.blur()
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.pageInfo.curPage = 1
      this.findList()
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val
      this.findList()
    }

  }
}
</script>

<style scoped>

</style>
