<template>
  <div>
    <!--    <el-collapse-transition>-->
    <!--    <TableSearchBar v-show="showSearchBar" @search="handleSearch" @reset="handleReset">-->
    <!--      <el-form :model="searchForm" label-suffix=":" label-width="70px">-->
    <!--        <el-row :gutter="5" align="middle">-->
    <!--          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">-->
    <!--            <el-form-item label="名称">-->
    <!--              <el-input v-model="searchForm.name" placeholder="名称"/>-->
    <!--            </el-form-item>-->
    <!--          </el-col>-->
    <!--        </el-row>-->
    <!--      </el-form>-->
    <!--    </TableSearchBar>-->
    <!--  </el-collapse-transition>-->


    <div>
      <el-button type="success" icon="el-icon-plus" size="mini" @click="clickAdd">添加</el-button>
      <!--      <el-button type="primary" icon="el-icon-search" size="mini" @click="showSearchBar = !showSearchBar">搜索</el-button>-->
    </div>

    <div>
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
            <el-button type="text" size="" @click="clickEdit(scope.row)">编辑</el-button>
            <el-button type="text" class="color-danger" @click="clickDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--停启用 弹框-->
    <CommonDialog :type="selectRow.enabled ? 'warning' : 'success'" ref="switchEnabledDialog" @confirm="switchEnabledConfirm">
      <div>
        确认{{ selectRow.enabled ? '停用' : '启用' }} “ <b :class="selectRow.enabled ? 'color-warning' : 'color-success'">{{ selectRow.name }}</b> ” ？
      </div>
    </CommonDialog>

    <!--    编辑框-->
    <DeptSave ref="saveDialog" title="编辑" @close="saveDialogClose"/>

    <!--删除弹框-->
    <CommonDialog type="danger" ref="delDialog" @confirm="delConfirm">
      <div>
        确认删除 “ <b class="color-danger">{{ selectRow.name }}</b> ” ？
      </div>
    </CommonDialog>
  </div>
</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import DeptSave from "@/views/system/dept/DeptSave.vue";

export default {
  name: "index",
  components: {DeptSave, TableSearchBar, CommonDialog},
  data() {
    return {
      style: {
        // overflow: 'auto',
        // 'max-height': this.$store.state.tabContentHeight + 'px'
      },
      // searchForm: {
      //   name: '',
      //   parentId: 0
      // },
      tableData: [],
      showSearchBar: false,
      keyNum: 0,
      maps: new Map(),
      selectRow: {},
    }
  },

  created() {
    this.getData()
  },

  methods: {
    switchChange(row) {
      this.selectRow = row
      this.$refs.switchEnabledDialog.show(row)
    },

    getData() {
      this.$api.dept.list({parentId: 0}).then(res => {
        this.tableData = res
        console.log('this.tableData', this.tableData)
        // this.tableData.splice(1, 0)
        this.keyNum++
      })

      // if (this.searchForm.name === '') {
      //   this.$api.dept.list({parentId: 0}).then(res => {
      //     this.tableData = res
      //   })
      // } else {
      //   this.$api.dept.list(this.searchForm).then(res => {
      //     this.tableData = res
      //   })
      // }
    },

    load(tree, treeNode, resolve) {
      this.maps.set(tree.id, {tree, treeNode, resolve})
      this.$api.dept.list({parentId: tree.id}).then(res => {
        console.log('load', res)
        resolve(res)
      })
    },

    // handleSearch() {
    //   this.getData()
    // },
    //
    // handleReset(e) {
    //   this.searchForm.name = ''
    //   this.getData()
    //   e.target.blur()
    // },

    switchEnabledConfirm(data) {
      this.$api.dept.enabledSwitch(data.id).then(() => {
        this.$refs.switchEnabledDialog.close()
        this.refreshRow(data)
      })
    },

    // 局部刷新列表
    refreshRow(row) {
      const {tree, treeNode, resolve} = this.maps.get(row.parentId)
      this.load(tree, treeNode, resolve);
    },

    clickEdit(row) {
      this.$refs.saveDialog.show(row.id, this.$gc.dialogType.Edit)
    },

    clickAdd() {
      this.$refs.saveDialog.show(null, this.$gc.dialogType.Add)
    },

    clickDel(row) {
      this.selectRow = row
      this.$refs.delDialog.show(row)
    },

    saveDialogClose() {
      this.selectRow = {}
      this.getData()
    },

    delConfirm(data) {
      this.$api.dept.del(data.id).then(() => {
        this.getData()
        this.selectRow = {}
        this.$message.success('删除成功')
      })
    },
  }
}
</script>

<style scoped>

</style>
