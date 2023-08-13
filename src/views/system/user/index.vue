<template>
  <div style="height: 100%;" id="content" class="content">
    <div style="width: 15%;border-right: #d2e1f1 solid 1px;margin-right: 5px">
      <div style="width: 100%;height: 300px;overflow: auto;">
        <el-tree
            :data="deptTree"
            ref="tree"
            :props="defaultProps"
            node-key="id"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            :highlight-current="true"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div style="width: 85%">
      <el-collapse-transition>
        <TableSearchBar v-show="showSearchBar" @search="handleSearch" @reset="handleReset">
          <el-form :model="searchForm" label-suffix=":" label-width="70px">
            <el-row :gutter="5" align="middle">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <el-form-item label="姓名">
                  <el-input v-model="searchForm.nickname" placeholder="姓名"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <el-form-item label="账号">
                  <el-input v-model="searchForm.username" placeholder="用户名"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <el-form-item label="手机号">
                  <el-input v-model="searchForm.phone" placeholder="手机号"/>
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
      <div :style="style">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%"
        >
          <el-table-column prop="nickname" label="姓名"/>
          <el-table-column label="部门">
            <template slot-scope="scope">
              {{ formatDeptNames(scope.row.deptList) }}
            </template>
          </el-table-column>
          <el-table-column prop="username" label="帐号"/>
          <el-table-column prop="phone" label="手机"/>
          <el-table-column prop="email" label="邮箱"/>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                  :disabled="scope.row.username === $gc.adminCode"
                  :value="scope.row.enabled"
                  active-color="#67C23A"
                  inactive-color="#E6A23C"
                  @change="switchChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--              <el-button class="primary" type="text" @click="detail(scope.row)">查看</el-button>-->
              <div v-if="scope.row.username !== $gc.adminCode || $store.state.userinfo.username === $gc.adminCode">
                <el-button type="text" @click="edit(scope.row)">修改</el-button>
                <el-button type="text" @click="clickResetPWD(scope.row)">重置密码</el-button>
                <el-button type="text" class="color-danger" @click="clickDel(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <el-divider></el-divider>

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
    </div>

    <ResetPWD ref="resetPWDDialog"/>

    <!--删除弹框-->
    <CommonDialog type="danger" ref="delDialog" @confirm="delConfirm">
      <div>
        确认删除 <b class="color-danger">{{ selectRow.nickname }}</b> 的账号 “ <b
          class="color-danger">{{ selectRow.username }}</b> ” ？
      </div>
    </CommonDialog>

    <!--停启用 弹框-->
    <CommonDialog :type="selectRow.enabled ? 'warning' : 'success'" ref="enabledDialog" @confirm="enabledConfirm">
      <div>
        确认{{ selectRow.enabled ? '停用' : '启用' }} <b :class="selectRow.enabled ? 'color-warning' : 'color-success'">{{
          selectRow.nickname
        }}</b> 的账号 “
        <b :class="selectRow.enabled ? 'color-warning' : 'color-success'">{{ selectRow.username }}</b>
        ” ？
      </div>
    </CommonDialog>

    <CurDialog ref="curDialog" @confirm="curDialogConfirm"/>

  </div>

</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import ResetPWD from "@/views/system/user/ResetPWD.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import CurDialog from "@/views/system/user/CurDialog.vue";

export default {
  name: "index",
  components: {CurDialog, CommonDialog, ResetPWD, TableSearchBar},
  data() {
    return {
      style: {
        // overflow: 'auto',
        // 'max-height': this.$store.state.tabContentHeight + 'px'
      },
      searchForm: {
        username: '',
        nickname: '',
        phone: '',
        deptId: null,
      },
      tableData: [],
      pageInfo: {
        total: 0,
        curPage: 1,
        pageSize: 10
      },
      showSearchBar: false,
      deptTree: [], // 部门数据
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
      selectRow: {},
    }
  },
  watch: {
    '$store.state.tabContentHeight': {
      handler() {
        this.style['max-height'] = this.$store.state.tabContentHeight + 'px'
        console.log('跟新后的hei', this.style)
      }
    }
  },

  mounted() {
    this.getData()
    this.getTree()
  },

  methods: {
    formatDeptNames(list) {
      return list.map(item => item.name).join('、');
    },

    clickAdd() {
      this.$refs.curDialog.show(null, this.$gc.dialogType.ADD)
    },

    edit(row) {
      this.$refs.curDialog.show(row.id, this.$gc.dialogType.EDIT)
    },

    switchChange(row) {
      this.selectRow = row
      this.$refs.enabledDialog.show(row)
    },

    enabledConfirm(data) {
      this.$api.user.enabledSwitch(data.id).then(() => {
        this.$refs.enabledDialog.close()
        this.getData()
      }).catch(() => {
        this.$refs.enabledDialog.stopLoading()
      })
    },

    handleNodeClick(data) {
      if (this.searchForm.deptId == data.id) {
        this.searchForm.deptId = null
        this.$refs.tree.setCurrentKey(null)

      } else {
        this.searchForm.deptId = data.id
        this.$refs.tree.setCurrentKey(data.id)
      }

      this.getData()
    },

    getTree() {
      this.$api.dept.tree().then(res => {
        this.deptTree = res
      })
    },

    delConfirm() {
      this.$api.user.del(this.selectRow.id).then(() => {
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

    clickResetPWD(row) {
      this.$refs.resetPWDDialog.show(row.id)
    },

    getData() {
      const params = {
        ...this.searchForm,
        ...this.pageInfo
      }
      this.$api.user.page(params, {target: '#main'}).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.pageInfo.pages = res.pages
      })
    },

    curDialogConfirm() {
      this.getData()
    },

    handleSearch() {
      this.getData()
    },

    handleReset(e) {
      this.searchForm = {}
      this.pageInfo.curPage = 1
      this.$refs.tree.setCurrentKey(null)
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
.content {
  display: flex;
}

.table-footer {
  text-align: center;
  /*position: absolute;*/
  /*bottom: 0;*/

}

/deep/ .el-tree-node__content:hover {
//background: rgb(199, 42, 37);
}

/deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #409EFF;
  color: #fff;
}

/deep/ .el-tree {
//background: #10498f; //color: #ffffff;
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
//background-color:rgba(35, 220, 205, 0.78);
}
</style>
