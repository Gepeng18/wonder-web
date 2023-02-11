<template>
  <div>
    <TableSearchBar @search="handleSearch" @reset="handleReset">
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

    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column prop="description" label="描述"/>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini"  round @click="edit(scope.row)">修改</el-button>
            <el-button type="primary" size="mini"  round @click="edit(scope.row)">分配用户</el-button>
            <el-button type="danger" size="mini"  round  @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <div style="text-align: center">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.curPage"
            :page-sizes="[2, 3, 4]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.totalElements">
        </el-pagination>
      </div>

      <!--删除弹框-->
      <CommonDialog type="danger" ref="delDialog" @confirm="delConfirm" title="提示">
        <div>
          是否删除 “<span class="color-danger">{{selectName}}</span>”  ？
        </div>
      </CommonDialog>

      <RoleEdit ref="roleEdit" title="编辑角色" @confirm="editConfirm"/>

    </div>

  </div>

</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import RoleEdit from "@/views/system/role/RoleEdit.vue";

export default {
  name: "Role",
  components: {CommonDialog,TableSearchBar, RoleEdit},
  data() {
    return {
      searchForm: {
        name: '',
      },
      tableData: [],
      pageInfo:{
        totalElements: 0,
        curPage: 1,
        pageSize: 2
      },
      selectId: null,
      selectName: ''
    }
  },

  mounted() {
    this.findList()
  },
  methods: {
    editConfirm(data){
      this.$api.role.edit(data)
    },
    delConfirm(){
      this.$message.success('删除成功')
      this.selectName = ''
      this.selectId  = null
    },
    edit(row){
      this.$refs.roleEdit.show(row)
    },
    del(row){
      this.selectId = row.id
      this.selectName = row.name
      this.$refs.delDialog.show()
    },

    findList(){
      const params = {
        ...this.searchForm,
        ...this.pageInfo
      }
      this.$api.role.findPage(params).then(res => {
        this.tableData = res.dataList
        this.pageInfo.totalElements = res.totalElements
        this.pageInfo.totalPage = res.totalPage
      })
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
