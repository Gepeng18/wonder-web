<template>
  <CommonDialog ref="dialog" :title="title" :type="dialogType" @confirm="confirm">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px" label-suffix="：">

      <el-form-item label="所属部门" prop="deptId">
        <el-popover v-model="popoverShow" style="width: 100%;" placement="right-start" trigger="focus">
          <el-input readonly style="font-weight: bold;color: #8c939d" placeholder="请选择所属部门"
                    v-model="formData.deptName"
                    slot="reference"></el-input>
          <div style="width: 224px;height: 300px;overflow: auto;">
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

      <el-form-item label="角色" prop="roleIdList">
        <el-select v-model="formData.roleIdList" multiple placeholder="请选择角色" @change="roleSelectChange">
          <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>

      <el-form-item label="登录账号" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>

      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>

    </el-form>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";
import {validateEMail, validatePhone} from "@/utils/validate";

export default {
  name: "UserSave",
  components: {CommonDialog},
  data() {
    return {
      title: '',
      formData: {
        id: null,
        username: '',
        nickname: '',
        deptId: null,
        deptName: '',
        phone: '',
        email: '',
        enabled: null,
      },
      popoverShow: false,
      options: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
      dialogType: '',
      rules: {
        deptId: [
          {required: true, trigger: 'blur', message: '请选择所属部门'},
          {min: 1, max: 10, message: '请选择所属部门', trigger: "blur"}
        ],
        // roleIdList 未生效
        roleIdList: [
          {required: true, trigger: 'blur', message: '请选择角色', type:'array'},
          {min: 1, max: 10, message: '请选择角色', trigger: "blur", type:'array',}
        ],
        nickname: [
          {required: true, trigger: 'blur', message: '请输入用户昵称'},
          {min: 1, max: 10, message: '用户名称必须1-10个字符之间', trigger: "blur"}
        ],
        username: [
          {required: true, trigger: 'blur', message: '请输入登录账号'},
          {min: 6, max: 20, message: '账号必须6-20个字符之间', trigger: "blur"}
        ],
        phone: [
          {required: true, trigger: 'blur', message: '请输入手机号码'},
          {required: true, validator: validatePhone, message: '请慎输入正确的手机号码', trigger: "blur"}
        ],
        email: [
          {required: false, validator: validateEMail, message: '请慎输入正确的电子邮件', trigger: "blur"}
        ]
      },
      roleOptions: [],
    }
  },
  methods: {
    confirm() {
      if (this.formData.id == null) {
        this.$api.user.save(this.formData).then(() => {
          this.$message.success('添加成功')
          this.$refs.dialog.close()
          this.$emit('confirm')
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })

      } else {
        this.$api.user.update(this.formData).then(() => {
          this.$message.success('保存成功')
          this.$refs.dialog.close()
          this.$emit('confirm')
        }).catch(() => {
          this.$refs.dialog.stopLoading()
        })
      }
    },

    show(id = null, dialogType = null) {
      this.reset()
      this.dialogType = dialogType
      if (dialogType === this.$gc.dialogType.Add) {
        this.toAdd()
      } else if (dialogType === this.$gc.dialogType.Edit) {
        this.toEdit(id)
      }

      this.getRoleList()
      this.getDeptTree()

      this.$refs.dialog.show()
    },

    toAdd() {
      this.title = '添加'
      this.dialogType = 'success'
    },

    toEdit(id) {
      this.title = '编辑'
      this.dialogType = 'primary'
      // 查询数据
      this.getData(id)
    },

    getData(id) {
      this.$api.user.getById(id).then(res => {
        this.formData = res
      })
    },

    handleNodeClick(data) {
      this.formData.deptName = data.name
      this.formData.deptId = data.id
      this.$refs.tree.setCurrentKey(data.id)
      this.popoverShow = false
    },

    getDeptTree() {
      this.$api.dept.tree().then(res => {
        this.options = res
        // fixme 在树列表中没回显所属部门
        this.$refs.tree.setCurrentKey(this.formData.deptId)
      })
    },

    getRoleList() {
      this.$api.role.list().then(res => {
        this.roleOptions = res
      })
    },

    roleSelectChange(val) {
      this.formData.roleIdList = val
    },

    reset() {
      this.formData = {
        id: null,
        username: '',
        nickname: '',
        deptId: null,
        deptName: '',
        phone: '',
        email: '',
        enabled: null,
      }
      this.options = []
    }
  }
}
</script>

<style scoped>

</style>
