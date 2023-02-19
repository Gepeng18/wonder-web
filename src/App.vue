<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import {debounce} from "@riophae/vue-treeselect/src/utils";

export default {
  name: 'App',
  components: {},
  data() {
    return {
      //获取浏览器可视区域高度（包含滚动条）、
      //获取浏览器可视区域高度（不包含工具栏高度）、
      //获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的)
      innerHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    }
  },
  mounted() {
    window.addEventListener('resize', this.getHeight, false);
  },
  beforeDestroy() {
    window.addEventListener('resize', this.getHeight,false);
  },
  methods: {
    getHeight: debounce(function () {
      this.innerHeight = window.innerHeight || document.documentElement.innerHeight || document.body.clientHeight;
      this.$store.commit('setTabContentHeight', this.innerHeight)
    }, 500),

    },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('storeData')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('storeData'))))
      this.$store.dispatch('setDynamicRoutes')
      sessionStorage.clear()
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('storeData', JSON.stringify(this.$store.state))
    })
    // 兼容iphone手机
    window.addEventListener('pagehide', () => {
      sessionStorage.setItem('storeData', JSON.stringify(this.$store.state))
    })

  },
}
</script>
<style lang="scss" src="./assets/css/public-class.scss"></style>

<style>

body {
  margin: 0;
}

#nprogress .bar {
  background: #00ff0d !important;
}

#nprogress .peg {
  box-shadow: 0 0 10px red, 0 0 5px red !important;
}
</style>
