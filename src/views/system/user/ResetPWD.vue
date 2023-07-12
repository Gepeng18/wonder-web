<template>
  <CommonDialog ref="dialog" title="重置密码" @confirm="confirm" @cancel="cancel" type="warning">
    <el-input v-model="formData.password" type="password" autocomplete="off" placeholder="请输入新密码（6-16位的数字或英文字母）"></el-input>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "ResetPWD",
  components: {CommonDialog},
  data() {
    return {
      formData:{
        id: null,
        password: ''
      }
    }
  },
  methods: {
    show(id) {
      this.formData.id = id
      this.$refs.dialog.show()
    },

    confirm() {
      if (this.check()){
        this.$api.user.resetPWD(this.formData).then(() => {
          this.$refs.dialog.close()
          this.$message.success('操作成功')
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })
      }else {
        this.$message.warning('密码必须为6-16位的数字或英文字母')
        this.$refs.dialog.stopLoading()
      }
    },

    check(){
      const pattern = /^[A-Za-z0-9]{6,16}$/;
      return pattern.test(this.formData.password);
    },

    cancel(){
      this.formData = {}
    }
  }
}
</script>

<style scoped>

</style>
