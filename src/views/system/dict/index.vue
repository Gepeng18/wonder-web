<template>
  <div>
    <el-collapse-transition>
      <!--搜索框-->
      <TableSearchBar v-show="showSearchBar" :query-params="queryParams" @search="handleSearch" @reset="handleReset">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item prop="dictName" label="字典名称">
              <el-input v-model="queryParams.dictName" placeholder="请输入字典名称" clearable/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item prop="dictCode" label="字典编码">
              <el-input v-model="queryParams.dictCode" placeholder="请输入字典编码" clearable/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item prop="dictType" label="字典类型" >
              <el-select v-model="queryParams.dictType" clearable placeholder="请选择字典类型">
                <el-option
                    v-for="dict in dict.dict_type"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item label="创建时间">
              <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </TableSearchBar>
    </el-collapse-transition>

    <div>
      <el-button size="mini" type="success" @click="handleSave">添 加</el-button>
      <el-button size="mini" type="primary" @click="showSearchBar = !showSearchBar">搜 索</el-button>
    </div>

    <!--列表-->
    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
      >
        <el-table-column type="index" width="50"/>
        <el-table-column prop="dictName" label="字典名称"/>
        <el-table-column label="字典编码">
          <template slot-scope="scope">
            <span class="color-primary">{{ scope.row.dictCode }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">修 改</el-button>
            <el-button type="text" class="color-danger" @click="handleDelete(scope.row)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider/>

      <pagination
          v-show="queryParams.total>0"
          :total="queryParams.total"
          :page.sync="queryParams.curPage"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
      />
    </div>

    <!--新增、编辑弹框-->
    <CommonDialog ref="dialog" :title="dialogInfo.title" :type="dialogInfo.type" :disabled="dialogInfo.disabled"
                  @confirm="handleSubmitConfirm" @close="handleClose">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="formData.dictName" placeholder="字典名称" clearable/>
        </el-form-item>
        <el-form-item label="字典编码" prop="dictCode">
          <el-input v-model="formData.dictCode" placeholder="字典编码" clearable/>
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-select v-model="formData.dictType" clearable placeholder="请选择字典类型">
            <el-option
                v-for="dict in dict.dict_type"
                :key="Number(dict.dictValue)"
                :label="dict.dictLabel"
                :value="Number(dict.dictValue)" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
              style="width: 100%"
              v-model="formData.sort"
              controls-position="right"
              @change="val => formData.sort = val"
              :min="1"
              :max="999">
          </el-input-number>
        </el-form-item>
      </el-form>
    </CommonDialog>

  </div>
</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";
import Pagination from "@/components/Pagination/index.vue";
import CommonDialog from "@/components/CommonDialog.vue";

export default {
  name: "Dict",
  dicts: ['dict_type'],
  components: {CommonDialog, Pagination, TableSearchBar},
  data() {
    return {
      queryParams: {
        total: 0,
        curPage: 1,
        pageSize: 10,
        dictName: '',
        dictCode: '',
        dictType: '',
      },
      tableData: [],
      showSearchBar: false,
      formData: {
        dictName: '',
        dictCode: '',
        dictType: '',
        sort: 1,
      },
      rules: {
        dictName: [
          {required: true, message: '请输入字典名称', trigger: 'blur'},
          {min: 1, max: 50, message: '1~100字符', trigger: 'blur'}
        ],
        dictCode: [
          {required: true, message: '请输入字典编码', trigger: 'blur'},
          {min: 1, max: 50, message: '1~100字符', trigger: 'blur'}
        ],
        dictType: [
          {required: true, message: '请选择字典类型', trigger: ['blur','change']}
        ],
      },
      dialogInfo: {
        title: '',
        type: '',
        disabled: false,
      },
      dateRange: [],
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      this.$api.dict.page(this.$addDateRange(this.queryParams, this.dateRange)).then(res => {
        this.tableData = res.list
        this.queryParams.total = res.total
        this.queryParams.pages = res.pages
      })
    },

    resetFormData() {
      this.$resetForm('form')
    },

    handleSave() {
      this.dialogInfo.title = '新 增'
      this.dialogInfo.type = 'success'
      this.$refs.dialog.show()
    },

    handleClose() {
      this.resetFormData()
    },

    handleUpdate(row) {
      this.$api.dict.get(row.id).then(res => {
        this.dialogInfo.title = '修 改'
        this.dialogInfo.type = 'warning'
        this.$refs.dialog.show()
        this.$nextTick(() => {
          this.formData = res
        })
      })
    },

    handleDelete(row) {
      this.$dialog({
        type: 'danger',
        content: `确认删除 “ <b class="color-danger">${row.dictName}</b> ”？`
      }).then(() => {
        this.$api.dict.del(row.id).then(() => {
          this.getList()
          this.$message.success('删除成功')
        })
      })
    },

    handleSubmitConfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.formData.id) {
            this.$api.dict.update(this.formData).then(res => {
              this.$message.success('修改成功')
              this.$refs.dialog.close()
              this.getList()
            }).catch(() => {
              this.$refs.dialog.stopLoading()
            })
          } else {
            this.$api.dict.save(this.formData).then(res => {
              this.$message.success('新增成功')
              this.$refs.dialog.close()
              this.getList()
            }).catch(() => {
              this.$refs.dialog.stopLoading()
            })
          }
        } else {
          this.$message.warning('请填写完整')
          this.$refs.dialog.stopLoading()
        }
      })
    },

    handleSearch() {
      this.queryParams.curPage = 1
      this.getList()
    },

    handleReset() {
      this.dateRange = []
      this.handleSearch()
    },
  }
}
</script>

<style scoped>

</style>
