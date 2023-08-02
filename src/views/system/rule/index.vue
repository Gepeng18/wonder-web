<template>
  <div>
    <div style="padding: 10px"><h2>{{ mark.name }}</h2></div>
    <div style="padding: 10px 10px"><span>备注：{{ mark.remark }}</span></div>

    <div style="padding: 0 10px; margin-top: 20px">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="clickAdd()">添加</el-button>
    </div>
    <el-divider/>

    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
      >
        <el-table-column prop="remark" label="描述"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="clickEdit(scope.row)">修改</el-button>
            <el-button type="text" class="color-danger" @click="clickDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <CurDialog ref="curDialog"/>

  </div>
</template>

<script>
import CurDialog from "@/views/system/rule/CurDialog.vue";

export default {
  name: "index",
  components: {CurDialog},
  data() {
    return {
      mark: {},
      tableData: [],
      pageInfo: {
        total: 0,
        curPage: 1,
        pageSize: 10
      },
    }
  },
  mounted() {
    this.getData(this.$route.query.markId)
  },
  methods: {
    getData(markId) {
      if (!markId) {
        return
      }
      this.$api.mark.get(markId).then(res => {
        this.mark = res
      })

      this.$api.rule.getByMarkId(markId).then(res => {
        this.tableData = res
      })
    },

    clickEdit(row){
      this.$refs.curDialog.show(this.$gc.dialogType.EDIT, row.id)
    },

    clickAdd(){
      this.$refs.curDialog.show(this.$gc.dialogType.ADD)
    },

  }
}
</script>

<style scoped>

</style>
