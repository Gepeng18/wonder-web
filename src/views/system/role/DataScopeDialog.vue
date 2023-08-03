<template>
  <CommonDialog icon="s-tools" ref="dialog" width="1000px" :title="title" :show-cancel="false" @confirm="confirm">
    <el-row :gutter="0">
      <el-col :span="12">
        <el-table
            :data="markTableData"
            height="500"
            highlight-current-row
            @current-change="handleMarkCurrentChange"
            style="width: 100%">
          <el-table-column
              prop="name"
              label="标记"
              width="150">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="描述"
              width="310">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <div>
          <el-table
              ref="ruleTable"
              :data="ruleTableData"
              height="500"
              tooltip-effect="light"
              @select="handleSelect"
              @select-all="handleSelectAll"
              style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="规则描述"
                width="310">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "DataScopeDialog",
  components: {CommonDialog},
  data() {
    return {
      title: '',
      markTableData: [],
      ruleTableData: [],
      markCurrentRow: null,
      role: null,
    }
  },
  methods: {
    show(dialogType = null, role = null) {
      if (role == null)
        return

      this.role = role
      this.title = '配置数据权限 - ' + role.name

      this.$api.mark.list().then(res => {
        this.markTableData = res
        this.$refs.dialog.show()
      })
    },

    getRule(markId) {
      this.$api.rule.getByMarkId(markId).then(res => {
        this.ruleTableData.slice(0, this.ruleTableData.length)
        this.ruleTableData = res
      }).catch()
    },

    handleMarkCurrentChange(val) {
      this.markCurrentRow = val;
      this.getRule(val.id)

      let params = {
        roleId: this.role.id,
        markId: val.id
      }

      this.$api.rule.getByRoleIdAndMarkId(params).then(res => {
        if (res) {
          for (let i = 0; i < this.ruleTableData.length; i++) {
            if (this.ruleTableData[i].id === res.id) {
              this.$refs.ruleTable.toggleRowSelection(this.ruleTableData[i], true)
              break
            }
          }
        }
      })

    },

    handleSelect(selection, val) {
      //只能选择一行，选择其他，清除上一行
      if (selection.length >= 1) {
        if (selection.length > 1){
          let del_row = selection.shift()
          this.$refs.ruleTable.toggleRowSelection(del_row, false) //设置这一行取消选中
        }
        let params = {
          roleId: this.role.id,
          ruleId: selection[0].id
        }
        this.$api.role.bindingRule(params).then(() => {
          this.$message.success('保存成功')
        })
      }else {
        let params = {
          roleId: this.role.id,
          ruleId: val.id
        }
        this.$api.role.unBindingRule(params).then(() => {
          this.$message.success('保存成功')
        })
      }
    },

    handleSelectAll() {
      this.$refs.ruleTable.clearSelection()
    },

    confirm(){
      this.reset()
      this.$refs.dialog.close()
    },

    reset() {
      this.title = ''
      this.markTableData = []
      this.ruleTableData = []
      this.markCurrentRow = null
      this.role = null
    }
  }
}
</script>

<style scoped>

</style>
