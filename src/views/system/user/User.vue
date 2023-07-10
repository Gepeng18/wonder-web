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
        <el-button type="success" icon="el-icon-plus" size="mini" @click="add">添加</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="showSearchBar = !showSearchBar">搜索</el-button>
      </div>
      <el-divider/>
      <div :style="style">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%"
        >
          <el-table-column prop="nickname" label="姓名"/>
          <el-table-column prop="deptName" label="部门"/>
          <el-table-column prop="username" label="帐号"/>
          <el-table-column prop="phone" label="手机"/>
          <el-table-column prop="email" label="邮箱"/>
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
<!--              <el-button class="primary" type="text" @click="detail(scope.row)">查看</el-button>-->
              <el-button class="primary" type="text" @click="edit(scope.row)">修改</el-button>
              <el-button class="primary" type="text" @click="resetPWD(scope.row)">重置密码</el-button>
              <el-button class="danger" type="text" @click="del(scope.row)">删除</el-button>

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
        <ResetPWD ref="resetPWD" @confirm="resetPWDConfirm"></ResetPWD>
        <UserDetail ref="userDetail"/>

        <!--删除弹框-->
        <CommonDialog type="danger" ref="delDialog" @confirm="delConfirm" title="提示">
          <div>
            确认删除 “<span class="color-danger">{{ selectName }}</span>” ？
          </div>
        </CommonDialog>

        <!--停启用 弹框-->
        <CommonDialog :type="selectSwitch ? 'warning' : 'success'" ref="switchEnabledDialog"
                      @confirm="switchEnabledConfirm">
          <div>
            确认{{ selectSwitch ? '停用' : '启用' }}账号 “
            <span style="font-weight: bolder" :class="selectSwitch ? 'color-warning' : 'color-success'">{{ selectName }}</span>
            ” ？
          </div>
        </CommonDialog>

        <UserSave ref="userSave" @confirm="userSaveConfirm"/>
      </div>
    </div>
  </div>

</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import ResetPWD from "@/views/system/user/ResetPWD.vue";
import UserDetail from "@/views/system/user/UserDetail.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import UserSave from "@/views/system/user/UserSave.vue";

export default {
  name: "User",
  components: {UserSave, CommonDialog, UserDetail, ResetPWD, TableSearchBar},
  data() {
    return {
      style:{
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
      selectId: null,
      selectName: '',
      showSearchBar: false,
      deptTree: [], // 部门数据
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
      selectSwitch: false,

    }
  },
  watch:{
    '$store.state.tabContentHeight':{
      handler(){
        this.style['max-height'] = this.$store.state.tabContentHeight + 'px'
        console.log('跟新后的hei', this.style)
      }
    }
  },

  created() {
    this.getData()
    this.getTree()
  },

  methods: {
    add(){
      this.$refs.userSave.show()
    },

    edit(row){
      this.$refs.userSave.show(row.id)
    },

    switchChange(row) {
      this.selectName = row.username
      this.selectSwitch = row.enabled
      this.$refs.switchEnabledDialog.show(row)
    },

    switchEnabledConfirm(data) {
      this.$api.user.enabledSwitch(data.id).then(() => {
        this.$refs.switchEnabledDialog.close()
        this.getData()
      })
    },

    handleNodeClick(data) {
      if (this.searchForm.deptId == data.id){
        this.searchForm.deptId = null
        this.$refs.tree.setCurrentKey(null)

      }else {
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
      this.$message.success('删除成功')
      this.selectName = ''
      this.selectId = null
    },

    del(row) {
      this.selectId = row.id
      this.selectName = row.nickname
      this.$refs.delDialog.show()
    },
    resetPWDConfirm(params) {
      this.$api.user.resetPWD(params).then(() => {
        this.$message.success('修改成功')
      })
    },
    detail(row) {
      this.$refs.userDetail.show(row)
    },
    resetPWD(row) {
      this.$refs.resetPWD.show(row.id)
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

    userSaveConfirm(){
      this.getData()
    },

    handleSearch() {
      this.getData()
    },
    handleReset(e) {
      this.searchForm.nickname = ''
      this.searchForm.username = ''
      this.searchForm.phone = ''
      this.searchForm.deptId = null
      this.pageInfo.curPage = 1
      this.getData()
      console.log(e)
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
