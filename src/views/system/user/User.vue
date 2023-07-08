<template>
  <div style="height: 100%;" id="content">
    <TableSearchBar @search="handleSearch" @reset="handleReset">
      <el-form :model="searchForm" label-suffix=":" label-width="70px">
        <el-row :gutter="5" align="middle">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item label="账号">
              <el-input v-model="searchForm.username" placeholder="用户名"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name" placeholder="姓名"/>
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

    <div :style="style">
      <el-table :data="tableData"
                stripe
                style="width: 100%"

      >
        <el-table-column prop="nickname" label="姓名"/>
        <el-table-column prop="username" label="帐号"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="email" label="邮箱"/>
<!--        <el-table-column prop="createTime" label="创建时间"/>-->
<!--        <el-table-column prop="updateTime" label="修改时间"/>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="primary" type="text" @click="detail(scope.row)">查看</el-button>
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
          是否删除 “<span class="color-danger">{{ selectName }}</span>” ？
        </div>
      </CommonDialog>

      <UserEdit ref="userEdit" @confirm="editSubmit"/>
    </div>
  </div>

</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import ResetPWD from "@/views/system/user/ResetPWD.vue";
import UserDetail from "@/views/system/user/UserDetail.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import UserEdit from "@/views/system/user/UserEdit.vue";

export default {
  name: "User",
  components: {UserEdit, CommonDialog, UserDetail, ResetPWD, TableSearchBar},
  data() {
    return {
      style:{
        // overflow: 'auto',
        // 'max-height': this.$store.state.tabContentHeight + 'px'
      },
      searchForm: {
        username: '',
        nickname: '',
        phone: ''
      },
      tableData: [],
      pageInfo: {
        total: 0,
        curPage: 1,
        pageSize: 10
      },
      selectId: null,
      selectName: '',
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

  mounted() {
    this.getData()
  },
  methods: {
    editSubmit(data) {
      this.$api.user.edit(data)
    },
    delConfirm() {
      this.$message.success('删除成功')
      this.selectName = ''
      this.selectId = null
    },
    edit(row) {
      this.$refs.userEdit.show(row)
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
    handleSearch() {
      this.getData()
    },
    handleReset(e) {
      this.searchForm.name = ''
      this.searchForm.username = ''
      this.searchForm.phone = ''
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
.table-footer {
  text-align: center;
  /*position: absolute;*/
  /*bottom: 0;*/

}
</style>
