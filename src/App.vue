<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('storeData')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('storeData'))))
      this.$store.dispatch('setDynamicRoutes')
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('storeData', JSON.stringify(this.$store.state))
    })
    // 兼容iphone手机
    window.addEventListener('pagehide', () => {
      sessionStorage.setItem('storeData', JSON.stringify(this.$store.state))
    })

  }
}
</script>
<style lang="scss"  src="./assets/css/public-class.scss"></style>

<style>
/*@import "~@/assets/css/public-class.scss";*/
/*@import "~@/assets/css/testcss.css";*/

body{
  margin: 0;
}

#nprogress .bar {
  background: #00ff0d !important;
}
#nprogress .peg {
  box-shadow: 0 0 10px red, 0 0 5px red !important;
}
</style>
