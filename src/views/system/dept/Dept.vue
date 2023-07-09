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


    <div>
      <el-button type="success" icon="el-icon-plus" size="mini">添加</el-button>
      <el-button type="danger" icon="el-icon-plus" size="mini">删除</el-button>
      <el-button type="info" icon="el-icon-search" size="mini" @click="showSearchBar = !showSearchBar">搜索</el-button>
      <span>    存在问题: 在编辑弹框更改上级后,列表没刷新成功,旧的节点没去掉</span>
    </div>

    <div>
      <el-table
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

        <el-table-column label="状态" width="250">
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

        <el-table-column
            prop="sort"
            label="排序"
        >
        </el-table-column>

        <el-table-column
            prop="updateTime"
            label="更新时间"
        >
        </el-table-column>

        <el-table-column label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" round @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" round @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--停启用 弹框-->
    <CommonDialog :type="selectSwitch ? 'warning' : 'success'" ref="switchEnabledDialog"
                  @confirm="switchEnabledConfirm">
      <div>
        是否{{ selectSwitch ? '停用' : '启用' }} “
        <span style="font-weight: bolder" :class="selectSwitch ? 'color-warning' : 'color-success'">{{ selectName }}</span>
          ” ？
      </div>
    </CommonDialog>

    <!--    编辑框-->
    <DeptEdit ref="editDialog" title="编辑" @updated="updated"/>
    <!--删除弹框-->
    <CommonDialog type="danger" ref="delDialog" @confirm="delConfirm">
      <div>
        是否删除 “  <span style="font-weight: bolder" class="color-danger">{{ deleteName}}</span>  ”  ？
      </div>
    </CommonDialog>
  </div>
</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import DeptEdit from "@/views/system/dept/DeptEdit.vue";

export default {
  name: "Dept",
  components: {DeptEdit, TableSearchBar, CommonDialog},
  data() {
    return {
      style: {
        // overflow: 'auto',
        // 'max-height': this.$store.state.tabContentHeight + 'px'
      },
      searchForm: {
        name: '',
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
      selectSwitch: false,
      deleteName: '',
    }
  },

  created() {
    this.getData()
  },

  methods: {
    switchChange(row) {
      this.selectSwitch = row.enabled
      this.selectName = row.name
      this.selectId = row.id
      this.$refs.switchEnabledDialog.show(row)
    },

    getData() {
      if (this.searchForm.name === '') {
        this.$api.dept.list({parentId: 0}, {target: '#main'}).then(res => {
          this.tableData = []
          this.tableData = res
        })
      } else {
        this.$api.dept.list(this.searchForm, {target: '#main'}).then(res => {
          this.tableData = []
          this.tableData = res
        })
      }
    },

    load(tree, treeNode, resolve) {
      this.$api.dept.list({parentId: tree.id}, {target: '#main'}).then(res => {
        resolve(res)
      })
    },
    handleSearch() {
      this.getData()
    },
    handleReset(e) {
      this.searchForm.name = ''
      this.pageInfo.curPage = 1
      this.getData()
      console.log(e)
      e.target.blur()
    },

    switchEnabledConfirm(data) {
      this.$api.dept.enabledSwitch(data.id).then(() => {
        this.$refs.switchEnabledDialog.close()
        this.getData()
      })
    },

    edit(row) {
      this.$refs.editDialog.show(row.id)
    },
    del(row) {
      this.deleteName = row.name
      this.$refs.delDialog.show(row)
    },
    updated() {
      this.getData()
    },
    delConfirm(data){
      this.$api.dept.del(data.id).then(() => {
        this.getData()
        this.$message.success('删除成功')
      })
    },
  }
}
</script>

<style scoped>

</style>