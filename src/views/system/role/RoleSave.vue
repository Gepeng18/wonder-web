<template>
  <CommonDialog top="-100px" ref="dialog" @confirm="confirm">
    <div>
      <el-form :model="formData" label-width="100px" label-suffix="：">
        <el-form-item label="名称">
          <el-input v-model="formData.name" clearable  placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="formData.code" clearable placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
              type="textarea"
              clearable
              maxlength="30"
              v-model="formData.description"
              :autosize="{minRows: 2, maxRows: 3}"
              placeholder="请输入描述"
              show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="菜单">
          <el-popover v-model="popoverShow" style="width: 100%;" placement="right-start" trigger="focus">
            <el-input readonly style="font-weight: bold;color: #8c939d" placeholder="无" v-model="formData.parentName"
                      slot="reference"></el-input>
            <div style="width: 224px;height: 600px;overflow: auto;">
              <el-tree
                  :data="options"
                  ref="tree"
                  :props="defaultProps"
                  node-key="id"
                  :expand-on-click-node="false"
                  @node-click="handleNodeClick"
                  :highlight-current="true"
              >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="data.icon">{{ data.name }}</span>
          </span>
              </el-tree>
            </div>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "RoleSave",
  components: {CommonDialog},
  data() {
    return {
      formData: {
        id: null,
        description: '',
        name: '',
        code: '',
        menuIdList: []
      }
    }
  },
  methods: {
    show(id = null, showType = 1) {
      this.getById(id)
      this.$refs.dialog.show()
    },

    getById(id){
      this.$api.role.get(id).then(res => {
        this.formData = res
      })
    },

    confirm(){
      this.$emit('confirm')
    },

    reset(){
      this.formData = {
        id: null,
        description: '',
        name: '',
        code: '',
        menuIdList: []
      }
    }
  }
}
</script>

<style scoped>

</style>
