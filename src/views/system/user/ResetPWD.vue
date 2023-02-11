<template>
  <CommonDialog ref="dialog" title="重置密码" @confirm="confirm" @cancel="cancel" type="warning">
    <el-input v-model="form.password" type="password" autocomplete="off" placeholder="请输入新密码（6-16位的数字或英文字母）"></el-input>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "ResetPWD",
  components: {CommonDialog},
  data() {
    return {

      form:{
        id: null,
        password: ''
      }
    }
  },
  methods: {
    show(id) {
      this.form.id = id
      this.$refs.dialog.show()
    },
    confirm() {
      if (this.check()){
        this.$emit('confirm', this.form)
      }
    },
    check(){
      const pattern = /^[A-Za-z0-9]{6,16}$/;
      if(!pattern.test(this.form.password)){
        this.$message.warning("密码必须为6-16位的数字或英文字母")
        return false
      }
      return true
    },
    cancel(){
      this.form.password = ''
      this.form.id = null
    }
  }
}
</script>

<style scoped>

</style>
