<template>
  <CommonDialog type="danger" ref="dialog" @confirm="confirm" @cancel="cancel">
    <div>
      确认删除 “ <b class="color-danger">{{ data.name }}</b> ” ？
    </div>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "RoleDelDialog",
  components: {CommonDialog},
  data() {
    return {
      data: {}
    }
  },
  methods: {
    show(data){
      this.data = data
      this.$refs.dialog.show()
    },
    confirm(){
      if (this.data.id){
        this.$api.role.del(this.data.id).then(() => {
          this.$emit('confirm')
          this.$message.success('删除成功')
        })
      }
      this.reset()
    },
    cancel(){
      this.reset()
    },
    reset(){
      this.data = {}
    }

  }
}
</script>

<style scoped>

</style>
