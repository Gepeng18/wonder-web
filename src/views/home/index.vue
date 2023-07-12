<template>
<div style="color: black">
  <h1>这是首页</h1>
  <h2 v-has="'ttt'">这是ttt权限</h2>
  <h2 v-has="'sys:user:view'">这是sys:user:view权限</h2>


</div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
