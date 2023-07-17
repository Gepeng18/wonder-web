<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {}
  },
  mounted() {
    this.getData(this.$route.query.markId)
  },
  methods: {
    getData(markId){
      if (!markId){
        return
      }

      this.$api.rule.getByMarkId(markId).then(res => {
        console.log(res)
      })
    }

  }
}
</script>

<style scoped>

</style>
