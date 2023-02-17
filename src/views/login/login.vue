<template>
  <div class="page-box">
    <div class="login-panel">
      <el-form :model="form" label-width="70px" label-suffix="：">
        <el-form-item label="账号">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"/>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.code" type="text" style="width: 100px;float: left"/>
          <el-image :src="imgBase64" style="width: 120px;margin-left: 5px;height: 40px" @click="getCode()"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading" style="width: 100px">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      form: {
        username: 'whz',
        password: '123456',
        code: '',
        uuid: ''
      },
      loadingHidden: false,
      imgBase64: '',
      loading: false
    }
  },
  setup() {


  },
  mounted() {
    this.getCode()
  },
  watch: {
    '$store.getters.userMenus': {
      handler() {
        if (this.$store.state.userMenus.length) {
          this.$router.push({
            path: '/index'
          })
        }
      }
    }
  },
  methods: {
    getCode() {
      this.$api.user.getCode().then(res => {
        this.imgBase64 = res.imgBase64
        this.form.uuid = res.uuid
        // this.form.code = ''
        this.form.code = res.code
      })
    },
    onSubmit() {
      this.loading = true
      this.$api.user.loginByPassword(this.form).then(res => {
        //请求成功操作
        this.$store.commit('logined', res)
        this.$message.success('登录成功')
        this.$store.dispatch('getUserMenu')
      }).catch(() => {
        this.loading = false
        this.getCode()
      })
    },
  }
}
</script>

<style scoped>
.page-box {
  background-color: #ffffff;
  height: 100vh;
}

.login-panel {
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  width: 300px;
  /*height: 400px;*/
  padding: 40px;
  top: 40%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
