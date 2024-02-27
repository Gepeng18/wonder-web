<template>
  <CommonDialog
      :title="dialogParam.title"
      :show-cancel="dialogParam.showCancel"
      :type="dialogParam.type"
      width="800px" ref="dialog"
      @close="close"
      @confirm="confirm">
    <div>
      <el-form ref="form" :model="formData" :rules="rules" label-width="130px" label-suffix="：">
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item label="描述" prop="remark">
              <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="提供类型" prop="provideType">
              <el-select v-model="formData.provideType" placeholder="请选择提供类型" @change="provideTypeChange">
                <el-option
                    v-for="item in  [{ value: 1, label: '值' },{ value: 2, label: '方法' }]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="表别名" prop="tableAlias">
              <el-input v-model="formData.tableAlias" placeholder="请输入表别名"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="12">
            <el-form-item label="拼接类型" prop="spliceType">
              <el-select v-model="formData.spliceType" placeholder="请选择拼接类型">
                <el-option
                    v-for="item in  [{ value: 'AND', label: 'AND' },{ value: 'OR', label: 'OR' }]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->

          <el-col :span="12">
            <el-form-item label="字段名" prop="columnName">
              <el-input v-model="formData.columnName" placeholder="请输入字段名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="formData.provideType === $gc.provideType.VALUE">
            <el-form-item label="表达式" prop="expression">
              <el-select v-model="formData.expression" placeholder="请选择表达式">
                <el-option
                    v-for="item in valueExpressionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-else>
            <el-form-item label="表达式" prop="expression">
              <el-select v-model="formData.expression" placeholder="请选择表达式">
                <el-option
                    v-for="item in methodExpressionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div v-if="formData.provideType === $gc.provideType.VALUE || formData.provideType == null">
            <el-col :span="12">
              <el-form-item label="值" prop="value1">
                <el-input v-model="formData.value1" placeholder="请输入值"></el-input>
              </el-form-item>
            </el-col>

<!--            <el-col :span="12">-->
<!--              <el-form-item label="值2" prop="value2">-->
<!--                <el-input v-model="formData.value2" placeholder="请输入值2"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
          </div>

          <div v-else>
            <el-col :span="24">
              <el-form-item label="类名/bean名称" prop="className">
                <el-input v-model="formData.className" placeholder="请输入类名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="dialogType !== $gc.dialogType.VIEW ? 20 : 24">
              <el-form-item label="方法名" prop="methodName">
                <el-input v-model="formData.methodName" placeholder="请输入方法名"></el-input>
              </el-form-item>
            </el-col>


            <el-col v-if="dialogType !== $gc.dialogType.VIEW" :span="4">
              <el-button type="success" @click="addGroup">添加参数</el-button>
            </el-col>

            <div v-for="(group, index) in getGroups" :key="index">

              <el-col :span="10">
                <el-form-item :label="`第${index + 1}个形参`">

                  <el-select v-model="group.formalParam" placeholder="请选择形参类型">
                    <el-option
                        v-for="item in formalTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item :label="`第${index + 1}个实参`" :key="index">
                  <el-input v-model="group.actualParam" placeholder="实际参数"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-button type="danger" icon="el-icon-delete" @click="removeGroup(index)" circle></el-button>
              </el-col>
            </div>
          </div>
        </el-row>
      </el-form>

    </div>

  </CommonDialog>
</template>

<script>
import CommonDialog from "@/components/CommonDialog.vue";
import {validateEMail, validatePhone} from "@/utils/validate";
import mark from "@/views/system/mark/index.vue";

export default {
  name: "CurDialog",
  components: {CommonDialog},
  data() {
    return {
      dialogParam: {},
      formData: {},
      dialogType: null,
      markId: null,
      groups: [],
      rules: {
        remark: [
          {required: true, trigger: 'blur', message: '请输入描述'},
          {min: 1, max: 30, message: '描述必须1-30个字符之间', trigger: "blur"}
        ],
        provideType: [
          {required: true, trigger: 'blur', message: '请选择提供类型'},
        ],
        columnName: [
          {required: true, trigger: 'blur', message: '请输入字段名'},
          {min: 1, max: 30, message: '字段名必须1-30个字符之间', trigger: "blur"}
        ],
        spliceType: [
          {required: true, trigger: 'blur', message: '请选择拼接类型'},
        ],
        expression: [
          {required: true, trigger: 'blur', message: '请选择表达式'},
        ],
        value1: [
          {required: true, trigger: "blur", message: '请输入value1'}
        ],
        className: [
          {required: true, trigger: 'blur', message: '请输入类名'},
        ],
        methodName: [
          {required: true, trigger: 'blur', message: '请选择方法名'},
        ]
      },
      valueExpressionOptions: [{
        value: 'EQ',
        label: 'EQ-等于'
      }, {
        value: 'NE',
        label: 'NE-不等于'
      }, {
        value: 'LIKE',
        label: 'LIKE-模糊'
      }, {
        value: 'GT',
        label: 'GT-大于'
      }, {
        value: 'GE',
        label: 'GE-大于等于'
      }, {
        value: 'LT',
        label: 'LT-小于'
      }, {
        value: 'LE',
        label: 'LE-小于等于'
      }, /*{
        value: 'IN',
        label: 'IN-在给定的数据内'
      }, {
        value: 'NOTIN',
        label: 'NOTIN-不在给定的数据内'
      },*/ {
        value: 'IS_NULL',
        label: 'IS_NULL-为NUll'
      }, {
        value: 'NOT_NULL',
        label: 'NOT_NULL-不为NUll'
      }],
      methodExpressionOptions: [{
        value: 'IN',
        label: 'IN-在给定的数据内'
      }, {
        value: 'NOT_IN',
        label: 'NOT_IN-不在给定的数据内'
      },{
        value: 'EQ',
        label: 'EQ-等于'
      }, {
        value: 'NE',
        label: 'NE-不等于'
      }, {
        value: 'LIKE',
        label: 'LIKE-模糊'
      }, {
        value: 'GT',
        label: 'GT-大于'
      }, {
        value: 'GE',
        label: 'GE-大于等于'
      }, {
        value: 'LT',
        label: 'LT-小于'
      }, {
        value: 'LE',
        label: 'LE-小于等于'
      }

      ],
      formalTypeOptions: [{
        value: 'java.lang.String',
        label: '字符串'
      }, {
        value: 'java.lang.Integer',
        label: '整型'
      }, {
        value: 'java.lang.Long',
        label: '长整型'
      }, {
        value: 'java.lang.Boolean',
        label: '布尔值'
      }, {
        value: 'java.lang.Byte',
        label: '字节型'
      }, {
        value: 'java.lang.Short',
        label: '短整型'
      }, {
        value: 'java.lang.Float',
        label: '单精度浮点型'
      }, {
        value: 'java.lang.Double',
        label: '双精度浮点型'
      }, {
        value: 'java.math.BigDecimal',
        label: 'BigDecimal'
      }],

    }
  },

  computed: {
    getGroups() {
      return this.groups;
    }
  },

  methods: {
    addGroup() {
      this.groups.push({formalParam: '', actualParam: ''}); // 在组数组中新增一组
    },

    removeGroup(index) {
      this.groups.splice(index, 1); // 从组数组中删除指定索引的组
    },

    provideTypeChange() {
      // 根据选择的类型动态设置校验规则
      if (this.formData.provideType === this.$gc.provideType.VALUE) {
        // this.$set(this.rules.name[0], 'validator', this.validateName);
        // this.$delete(this.rules.age[0], 'validator');
      } else if (this.formData.provideType === this.$gc.provideType.METHOD) {
        // this.$set(this.rules.age[0], 'validator', this.validateAge);
        // this.$delete(this.rules.name[0], 'validator');
      }
    },

    confirm() {
      if (this.dialogType === this.$gc.dialogType.VIEW) {
        this.$refs.dialog.close()
        return
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.formData.provideType === this.$gc.provideType.METHOD && this.groups.length > 0) {
            let formalParamArray = []
            let actualParamArray = []

            for (let group of this.groups) {
              if (group.formalParam === "" || group.actualParam === '') {
                this.$message.warning('参数请成对填写完整')
                this.$refs.dialog.stopLoading()
                return false;
              }
              formalParamArray.push(group.formalParam)
              actualParamArray.push(group.actualParam)
            }
            if (formalParamArray.length === actualParamArray.length) {
              this.formData.formalParam = formalParamArray.join(';')
              this.formData.actualParam = actualParamArray.join(';')
            }
          }

          if (this.dialogType === this.$gc.dialogType.ADD) {
            this.formData.markId = this.markId
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

    show(dialogType = null, markId = null, id = null) {
      if (markId == null)
        return
      this.markId = markId
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
        if (res.provideType === this.$gc.provideType.METHOD && res.paramList != null) {
          for (const param of res.paramList) {
            this.groups.push({formalParam: param.type, actualParam: param.value})
          }
        }
        this.$refs.dialog.show()
      })
    },

    close(){
      this.reset()
    },

    reset() {
      this.formData = {}
      this.groups = []
      this.dialogParam = {}
    }
  }
}
</script>

<style scoped>

</style>
