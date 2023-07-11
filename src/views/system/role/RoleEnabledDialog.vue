<template>
  <CommonDialog :type="data.enabled ? 'warning' : 'success'" ref="dialog" @confirm="confirm" @cancel="cancel">
    <div>
      确认{{ data.enabled ? '禁用' : '启用' }} “
      <b :class="data.enabled ? 'color-warning' : 'color-success'">{{ data.name }}</b> ” ？
    </div>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "RoleEnabledDialog",
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
        this.$api.role.enabledSwitch(this.data.id).then(() => {
          this.$emit('confirm')
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
