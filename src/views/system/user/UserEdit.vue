<template>
  <CommonDialog ref="dialog" title="编辑" @confirm="confirm" :disabled="disabled">
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix="：">
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
    </div>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";
import {validateEMail, validatePhone} from "@/utils/validate";
import {debounce} from "@riophae/vue-treeselect/src/utils";

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
      },
      rules: {
        name: [
          {required: true, trigger: 'blur', message: '请输入用户昵称'},
          {min: 1, max: 10, message: '用户名称必须1-10个字符之间', trigger: "blur"}
        ],
        username: [
          {required: true, trigger: 'blur', message: '请输入登录账号'},
          {min: 6, max: 20, message: '登录账号必须6-20个字符之间', trigger: "blur"}
        ],
        phone: [
          {required: true, trigger: 'blur', message: '请输入手机号码'},
          {required: true, validator: validatePhone, message: '请慎输入正确的手机号码', trigger: "blur"}
        ],
        email: [
          {required: false, validator: validateEMail, message: '请慎输入正确的电子邮件', trigger: "blur"}
        ]
      },
      disabled: true
    }
  },
  watch: {
    form: {
      handler: debounce(function () {
        this.doValidate()
      }, 1000),
      deep: true
    }
  },
  methods: {
    show(data) {
      this.form = data
      this.$refs.dialog.show()
    },
    doValidate() {
      this.$refs.form.validate(valid => {
        this.disabled = !valid;
      })
    },
    confirm() {
      this.$emit('confirm', this.form)
    }
  }
}
</script>

<style scoped>

</style>
