<template>
  <div>
    <!--表格列表-->
    <TableList
        ref="tableList"
        @clickEdit="clickEdit"
        @clickDel="clickDel"
        @clickAdd="clickAdd"
        @switchChange="switchChange"
    />

      <!--删除弹框-->
      <RoleDelDialog
          ref="delDialog"
          @confirm="delConfirm"
      />

      <!--停启用 弹框-->
      <RoleEnabledDialog
          ref="enabledDialog"
          @confirm="enabledConfirm"
      />

      <RoleSave
          ref="roleSave"
          @confirm="confirm"
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

export default {
  name: "index",
  components: {TableList, RoleDelDialog, RoleEnabledDialog, RoleSave, CommonDialog, TableSearchBar},
  data() {
    return {

    }
  },

  methods: {
    switchChange(row) {
      this.$refs.enabledDialog.show(row)
    },

    enabledConfirm(){
      this.$refs.tableList.findList()
    },

    delConfirm(){
      this.$refs.tableList.findList()
    },

    clickAdd() {
      this.$refs.roleSave.show(null, this.$dialogType.Add)
    },

    clickEdit(id){
      this.$refs.roleSave.show(id, this.$dialogType.Edit)
    },

    clickDel(row) {
      this.$refs.delDialog.show(row)
    },

    confirm(){
      this.$refs.tableList.findList()
    },


  }
}
</script>

<style scoped>

</style>
