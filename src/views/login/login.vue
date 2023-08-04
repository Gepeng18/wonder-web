<template>
  <div class="page-box">
    <div class="login-panel" id="captcha">
      <div class="title">
        <!--        Wonder-->
        <img src="/assets/images/logo.png" alt="logo"/>
      </div>
      <el-form :model="form" :rules="rules" label-width="100px" label-suffix="：">
        <el-form-item label="登录账号" prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" type="password" show-password/>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" type="text" style="width: 100px;float: left"/>
          <div>
            <el-image :src="imgBase64" style="width: 90px;margin-left: 5px;height: 40px" @click="getCode()"/>
          </div>
        </el-form-item>

        <el-button type="primary" @click="onSubmit" :loading="loading" style="width: 100%;font-size: 17px">登录
        </el-button>
      </el-form>

      <!--      <div style="text-align: center;margin-top: 20px"><h4>扫码登录</h4></div>-->
      <div class="back-hello"
           @click="() => {$router.replace({name: 'hello'})}"><p>返回首页</p></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456',
        code: '',
        uuid: ''
      },
      loadingHidden: false,
      imgBase64: '',
      loading: false,

      rules: {
        username: [
          {required: true, message: '请输入登录账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码，点击图片可切换', trigger: 'change'},
          {min: 4, max: 4, message: '请输入4位数验证码，点击图片可切换', trigger: 'change'}
        ],
      }
    }
  },

  mounted() {
    this.$store.commit('clear')
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    this.getCode()
  },

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    console.log('login beforeDestroy')
  },

  watch: {
    '$store.getters.userMenus': {
      handler() {
        if (this.$store.state.userMenus.length) {
          this.$router.replace({
            name: 'index'
          })
        }
      }
    }
  },
  methods: {
    handleBeforeUnload() {
      this.$store.commit('clear')
    },

    getCode() {
      this.$api.user.getCode({target: '#captcha'}).then(res => {
        this.imgBase64 = res.imgBase64
        this.form.uuid = res.uuid
        // this.form.code = ''
        this.form.code = res.code
      })
    },

    onSubmit() {
      this.loading = true
      this.$api.user.loginByUsername(this.form).then(res => {
        //请求成功操作
        this.$store.commit('login', res)
        this.$notify({
          title: '提示',
          message: '登录成功！欢迎您 ' + res.nickname,
          type: 'success',
          offset: 50
        })
        this.$store.dispatch('getUserMenu')
      }).catch(() => {
        this.loading = false
        this.getCode()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/image/login-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-panel {
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  width: 300px;
  /*height: 400px;*/
  padding: 20px 40px 40px 40px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #c1c5c8;

  .title {
    color: #545c64;
    font-size: 30px;
    font-weight: bolder;
    line-height: 60px;
    text-align: center;
    margin-bottom: 20px;
  }

}

.back-hello {
  text-align: center;
  margin-top: 20px;
  color: #409EFF;

  :hover {
    font-weight: bold;
  }
}
</style>
