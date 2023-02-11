<template>
  <CommonDialog ref="dialog" @confirm="confirm">
    <div>
      <el-form :model="formData" label-width="100px" label-suffix="：">
        <el-form-item label="角色名称">
          <el-input v-model="formData.name" ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formData.description" ></el-input>
        </el-form-item>
      </el-form>
    </div>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "RoleEdit",
  components: {CommonDialog},
  data() {
    return {
      formData: {
        description: '',
        name: ''
      }
    }
  },
  methods: {
    show(data) {
      this.formData = data
      this.$refs.dialog.show()
    },
    confirm(){
      this.$emit('confirm', this.formData)
    }
  }
}
</script>

<style scoped>

</style>
