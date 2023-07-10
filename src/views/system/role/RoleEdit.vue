<template>
  <CommonDialog ref="dialog" @confirm="confirm">
    <div>
      <el-form :model="formData" label-width="100px" label-suffix="：">
        <el-form-item label="角色名称">
          <el-input v-model="formData.name" clearable  placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="formData.code" clearable placeholder="请输入角色编码"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
              type="textarea"
              clearable
              maxlength="30"
              v-model="formData.description"
              :autosize="{minRows: 2, maxRows: 3}"
              placeholder="请输入角色描述"
              show-word-limit
          >
          </el-input>
        </el-form-item>
<!--        <el-form-item label="角色状态">-->
<!--          <el-switch-->
<!--              :value="!formData.disabled"-->
<!--              active-color="#13ce66"-->
<!--              inactive-color="#ff4949"-->
<!--              active-text="启用"-->
<!--              inactive-text="停用"-->
<!--              @change="switchChange(formData.disabled)"-->
<!--          >-->
<!--          </el-switch>-->
<!--        </el-form-item>-->
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
        name: '',
        code: '',
        disabled: null
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
    },

    switchChange(val){
      this.formData.disabled = !val
    }
  }
}
</script>

<style scoped>

</style>
