<template xmlns="http://www.w3.org/1999/html">
<div style="color: black">
  <h1>这是首页</h1>
  <h2 v-has="'ttt'">这是ttt权限</h2>
  <h2 v-has="'sys:user:view'">这是sys:user:view权限</h2>

<!--  <div>
    <el-select v-model="formData.name" placeholder="请选择性别" clearable size="small">
      <el-option v-for="dict in dict.sys_user_sex" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
    </el-select>
  </div>

  <div>

    <el-select v-model="formData.name" placeholder="请选择天气" clearable size="small">
      <el-option v-for="dict in dict.weather" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
    </el-select>
  </div>-->

<!--  <div>
    <el-table
        :data="tableData"
        style="width: 500px">
      <el-table-column
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <dict-tag :options="dict.sys_user_sex" :value="scope.row.sex"></dict-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>-->

</div>
</template>

<script>
import DictTag from "@/components/DictTag/index.vue";

export default {
  name: "index",
  components: {DictTag},
  // dicts: ['sys_user_sex', 'weather'],
  data(){
    return {
      formData: {
        name: '1'
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        sex: '0'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        sex: '1'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        sex: '2'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        sex: '1'
      }],
      value: ''

    }
  },

  mounted() {

  },

  methods: {
    setup(editor) {
      console.log(editor)
    }
  }

}
</script>

<style scoped>

</style>
