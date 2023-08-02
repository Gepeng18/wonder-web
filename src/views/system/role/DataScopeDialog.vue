<template>
  <CommonDialog ref="dialog" width="1000px" title="配置数据权限">
    <el-row :gutter="0">
      <el-col :span="12">
        <el-table
            :data="markTableData"
            height="250"
            highlight-current-row
            @current-change="handleMarkCurrentChange"
            style="width: 100%;max-height: 400px; overflow: auto">
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
              height="250"
              tooltip-effect="light"
              @select="handleSelect"
              @select-all="handleSelectAll"
              style="width: 100%;max-height: 400px; overflow: auto">
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
import Dict from "@/views/system/dict/Dict.vue";

export default {
  name: "DataScopeDialog",
  components: {Dict, CommonDialog},
  data() {
    return {
      markTableData: [],
      ruleTableData: [],
      markCurrentRow: null,
      roleId: null,
    }
  },
  methods: {
    show(dialogType = null, roleId = null) {
      if (roleId == null)
        return

      this.roleId = roleId

      this.$api.mark.list().then(res => {
        this.markTableData = res
      }).catch(() => {

      })

      this.$refs.dialog.show()
    },

    getRule(markId) {
      this.$api.rule.getByMarkId(markId).then(res => {
        this.ruleTableData = res
      }).catch()
    },

    handleMarkCurrentChange(val) {
      this.markCurrentRow = val;
      this.getRule(val.id)
    },

    handleSelect(selection, val){
      //只能选择一行，选择其他，清除上一行
      if(selection.length > 1){
        let del_row = selection.shift()
        this.$refs.ruleTable.toggleRowSelection(del_row,false) //设置这一行取消选中

        let params = {
          roleId: this.roleId,
          ruleId: selection[0].id
        }
        this.$api.role.bindingRule(params).then(() => {
          this.$message.success('保存成功')
        })
      }
    },

    handleSelectAll(){
      this.$refs.ruleTable.clearSelection()
    },

  }
}
</script>

<style scoped>

</style>
