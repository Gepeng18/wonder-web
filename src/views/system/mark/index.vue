<template>
  <div>
    <el-collapse-transition>
      <TableSearchBar v-show="showSearchBar" @search="handleSearch" @reset="handleReset">
        <el-form :model="searchForm" label-suffix=":" label-width="70px">
          <el-row :gutter="5" align="middle">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
              <el-form-item label="名称">
                <el-input v-model="searchForm.name" placeholder="名称"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </TableSearchBar>
    </el-collapse-transition>

    <div style="padding: 0 10px">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="clickAdd()">添加</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="showSearchBar = !showSearchBar">搜索
      </el-button>
    </div>
    <el-divider/>
    <div>
      <el-table :data="tableData"
                stripe
                style="width: 100%"
      >
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="remark" label="备注"/>
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
        <!--        <el-table-column prop="createTime" label="创建时间"/>-->
        <!--        <el-table-column prop="updateTime" label="修改时间"/>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
<!--            <el-button class="primary" type="text" @click="clickView(scope.row)">查看</el-button>-->
            <el-button type="text" @click="clickManage(scope.row)">数据管理</el-button>
            <el-button type="text" @click="clickEdit(scope.row)">修改</el-button>
            <el-button type="text" class="color-danger" @click="clickDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <el-divider />
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
    </div>

    <!--停启用 弹框-->
    <CommonDialog :type="selectRow.enabled ? 'warning' : 'success'" ref="enabledDialog" @confirm="enabledConfirm">
      <div>
        确认{{ selectRow.enabled ? '停用' : '启用' }} <b :class="selectRow.enabled ? 'color-warning' : 'color-success'">{{
          selectRow.name
        }}</b> “ ？
      </div>
    </CommonDialog>

    <!--删除弹框-->
    <CommonDialog type="danger" ref="delDialog" @confirm="delConfirm">
      <div>
        确认删除<b class="color-danger">{{ selectRow.name }}</b> “ ？
      </div>
    </CommonDialog>

    <CurDialog ref="curDialog" @close="getData"/>

  </div>

</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import CurDialog from "@/views/system/mark/CurDialog.vue";

export default {
  name: "index",
  components: {CurDialog, CommonDialog, TableSearchBar},
  data() {
    return {
      searchForm: {
        name: ''
      },
      tableData: [],
      pageInfo: {
        total: 0,
        curPage: 1,
        pageSize: 10
      },
      showSearchBar: false,
      selectRow: {},
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    clickAdd() {
      this.$refs.curDialog.show(null, this.$gc.dialogType.Add)
    },

    clickEdit(row) {
      this.$refs.curDialog.show(row.id, this.$gc.dialogType.Edit)
    },

    clickManage(row) {
      this.$router.push({
        name: 'rule-index',
        query: {
          markId: row.id
        }
      })
    },

    clickView(row) {
      this.$refs.curDialog.show(row.id, this.$gc.dialogType.View)
    },

    switchChange(row) {
      this.selectRow = row
      this.$refs.enabledDialog.show(row)
    },

    enabledConfirm(data) {
      this.$api.mark.enabledSwitch(data.id).then(() => {
        this.$refs.enabledDialog.close()
        this.getData()
      }).catch(() => {
        this.$refs.enabledDialog.stopLoading()
      })
    },

    delConfirm() {
      this.$api.mark.del(this.selectRow.id).then(() => {
        this.selectRow = {}
        this.$refs.delDialog.close()
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {
        this.$refs.delDialog.stopLoading()
      })
    },

    clickDel(row) {
      this.selectRow = row
      this.$refs.delDialog.show()
    },

    getData() {
      const params = {
        ...this.searchForm,
        ...this.pageInfo
      }
      this.$api.mark.page(params).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.pageInfo.pages = res.pages
      })
    },

    userSaveConfirm() {
      this.getData()
    },

    handleSearch() {
      this.getData()
    },

    handleReset(e) {
      this.searchForm = {}
      this.pageInfo.curPage = 1
      this.getData()
      e.target.blur()
    },

    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.pageInfo.curPage = 1
      this.getData()
    },

    handleCurrentChange(val) {
      this.pageInfo.curPage = val
      this.getData()
    }

  }
}
</script>

<style scoped>
.table-footer {
  text-align: center;
}
</style>
