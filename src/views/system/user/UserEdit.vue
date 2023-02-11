<template>
  <CommonDialog ref="dialog" title="编辑" @confirm="confirm">
    <div>
      <el-form :model="form" label-width="60px" label-suffix="：">
        <el-form-item label="姓名">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.username" ></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phone" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" ></el-input>
        </el-form-item>
      </el-form>
    </div>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "UserEdit",
  components: {CommonDialog},
  data() {
    return {
      form: {
        email: '',
        name: '',
        phone: '',
        username: '',
      }
    }
  },
  methods: {
    show(data) {
      this.form = data
      this.$refs.dialog.show()
    },
    confirm(){
      this.$emit('confirm', this.form)
    }
  }
}
</script>

<style scoped>

</style>
