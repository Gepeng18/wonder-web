<template>
  <CommonDialog
      :title="dialogParam.title"
      :show-cancel="dialogParam.showCancel"
      :type="dialogParam.type"
      ref="dialog"
      @confirm="confirm">
    <div>
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px" label-suffix="：">
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </div>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "CurDialog",
  components: {CommonDialog},
  data() {
    return {
      dialogParam: {},
      formData: {},
      dialogType: null,
      rules: {
        name: [
          {required: true, trigger: 'blur', message: '请输入名称'},
          {min: 1, max: 10, message: '名称必须1-10个字符之间', trigger: "blur"}
        ],
      },
    }
  },

  methods: {
    confirm() {
      if (this.dialogType === this.$gc.dialogType.VIEW) {
        this.$refs.dialog.close()
        return
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.dialogType === this.$gc.dialogType.ADD) {
            this.$api.rule.save(this.formData).then(() => {
              this.$message.success('添加成功')
              this.$refs.dialog.close()
              this.$emit('close')
            }).catch(() => {
              this.$refs.dialog.stopLoading()
            })

          } else {
            this.$api.rule.update(this.formData).then(() => {
              this.$message.success('保存成功')
              this.$refs.dialog.close()
              this.$emit('close')
            }).catch(() => {
              this.$refs.dialog.stopLoading()
            })
          }

        } else {
          // 表单校验不通过，进行相应处理
          this.$message.error('未正确填写完整');
          return false;
        }
      });

    },

    show(id = null, dialogType = null) {
      this.reset()
      this.dialogType = dialogType
      if (dialogType === this.$gc.dialogType.ADD) {
        this.toAdd()
      } else if (dialogType === this.$gc.dialogType.EDIT) {
        this.toEdit(id)
      } else {
        this.toView(id)
      }
    },

    toAdd() {
      this.dialogParam.type = 'success'
      this.dialogParam.title = '添加'
      this.$refs.dialog.show()
    },

    toEdit(id) {
      this.dialogParam.title = '编辑'
      this.dialogParam.type = 'warning'
      // 查询数据
      this.getData(id)
    },

    toView(id) {
      this.dialogParam.showCancel = false
      this.dialogParam.title = '查看'
      // 查询数据
      this.getData(id)
    },

    getData(id) {
      this.$api.rule.getById(id).then(res => {
        this.formData = res
        this.$refs.dialog.show()
      })
    },

    reset() {
      this.formData = {}
      this.dialogParam = {}
    }
  }
}
</script>

<style scoped>

</style>
