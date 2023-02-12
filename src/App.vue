<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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
