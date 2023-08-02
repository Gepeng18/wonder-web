<template>
  <div>
    <!--表格列表-->
    <TableList
        ref="tableList"
        @clickEdit="clickEdit"
        @clickDel="clickDel"
        @clickAdd="clickAdd"
        @clickDataScopeEdit="clickDataScopeEdit"
        @switchChange="switchChange"
    />

    <!--删除弹框-->
    <RoleDelDialog
        ref="delDialog"
        @close="delDialogClose"
    />

    <!--停启用 弹框-->
    <RoleEnabledDialog
        ref="enabledDialog"
        @close="enabledDialogClose"
    />

    <RoleSave
        ref="roleSave"
        @close="saveDialogClose"
    />

    <DataScopeDialog
        ref="dataScopeDialog"
    />

  </div>

</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import RoleSave from "@/views/system/role/RoleSave.vue";
import RoleEnabledDialog from "@/views/system/role/RoleEnabledDialog.vue";
import RoleDelDialog from "@/views/system/role/RoleDelDialog.vue";
import TableList from "@/views/system/role/TableList.vue";
import DataScopeDialog from "@/views/system/role/DataScopeDialog.vue";

export default {
  name: "index",
  components: {DataScopeDialog, TableList, RoleDelDialog, RoleEnabledDialog, RoleSave, CommonDialog, TableSearchBar},
  data() {
    return {

    }
  },

  methods: {
    switchChange(row) {
      this.$refs.enabledDialog.show(row)
    },

    enabledDialogClose() {
      this.$refs.tableList.findList()
    },

    delDialogClose() {
      this.$refs.tableList.findList()
    },

    clickAdd() {
      this.$refs.roleSave.show(null, this.$gc.dialogType.ADD)
    },

    clickEdit(id) {
      this.$refs.roleSave.show(id, this.$gc.dialogType.EDIT)
    },

    clickDel(row) {
      this.$refs.delDialog.show(row)
    },

    saveDialogClose() {
      this.$refs.tableList.findList()
    },

    clickDataScopeEdit(row){
      this.$refs.dataScopeDialog.show(this.$gc.dialogType.VIEW, row)
    },

  }
}
</script>

<style scoped>

</style>
