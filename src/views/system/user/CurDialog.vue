<template>
  <CommonDialog ref="dialog" :title="title" :type="dialogType" @confirm="confirm">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px" label-suffix="：">

      <el-form-item label="所属部门" prop="deptId">
        <el-popover v-model="popoverShow" style="width: 100%;" placement="right-start" trigger="hover">
          <div
              class="tag-group"
              slot="reference">
            <span style="margin: 0 2px;" v-for="tag in selectDeptList">
              <el-tag
                  :key="tag.name"
                  closable
                  @close="tagClose(tag)"
                  type="info"
                  size="small">
                {{ tag.name }}
              </el-tag>
            </span>
          </div>
          <div style="width: 224px;height: 300px;overflow: auto;">
            <el-tree
                :data="options"
                ref="tree"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                :highlight-current="true"
                show-checkbox
                @check="deptTreeChecked"
                :check-strictly="true"
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
  name: "CurDialog",

  components: {CommonDialog},
  data() {
    return {
      selectDeptList: [],
      title: '',
      formData: {},
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
          {required: true, trigger: 'blur', message: '请选择角色', type: 'array'},
          {min: 1, max: 10, message: '请选择角色', trigger: "blur", type: 'array',}
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
        this.$refs.tree.setCheckedKeys(res.deptIdList);

        for (let item of res.deptList) {
          this.selectDeptList.push({id: item.id, name: item.name})
        }
      })
    },

    tagClose(tag) {
      console.log('tag', tag)
      console.log('this.selectDeptList.indexOf(tag)', this.selectDeptList.indexOf(tag))
      this.selectDeptList.splice(this.selectDeptList.indexOf(tag), 1);
      let checkedKeys = []
      for (let item of this.selectDeptList) {
        checkedKeys.push(item.id)
      }
      this.$refs.tree.setCheckedKeys(checkedKeys);
      this.formData.deptIdList = checkedKeys
    },

    deptTreeChecked(data, checked) {
      let selectDeptList = []
      for (const item of checked.checkedNodes) {
        selectDeptList.push({id: item.id, name: item.name})
      }
      this.selectDeptList = selectDeptList
      this.formData.deptIdList = checked.checkedKeys
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
      this.formData = {}
      this.options = []
      this.selectDeptList = []
    }
  }
}
</script>

<style scoped lang="scss">

.tag-group {
  min-height: 40px;
  background: #ffffff;
  border: #d7d8da solid 1px;
  border-radius: 5px;

  max-height: 1000px;
  //transition: max-height 1s linear;
}

</style>
