<template>
  <CommonDialog ref="dialog" :show-cancel="false" title="用户详情" @confirm="confirm">
    <div class="body">
      <el-form :model="user" label-width="60px" label-suffix="：" >
        <el-form-item label="姓名">
          <el-input v-model="user.nickname" readonly></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="user.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="user.phone" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "UserDetail",
  components: {CommonDialog},
  data() {
    return {
      user: {
        email: '',
        name: '',
        phone: '',
        username: '',
      }
    }
  },
  methods: {
    show(data) {
      this.user = data
      this.$refs.dialog.show()
    },
    confirm() {
    }

  }
}
</script>

<style scoped>

.body >>> .el-input__inner {
  border: 0;
}

</style>
