<template>
  <div>
    <div style="padding: 10px"> <h2>{{mark.name}}</h2> </div>
    <div style="padding: 10px 10px"> <span>备注：{{mark.remark}}</span> </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      mark: {}
    }
  },
  mounted() {
    this.getData(this.$route.query.markId)
  },
  methods: {
    getData(markId){
      if (!markId){
        return
      }
      this.$api.mark.get(markId).then(res => {
        this.mark = res
      })

      this.$api.rule.getByMarkId(markId).then(res => {
        console.log(res)
      })
    }

  }
}
</script>

<style scoped>

</style>
