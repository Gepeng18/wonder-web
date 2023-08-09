<template>
  <div>
    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="dictLabel" label="字典标签" />
        <el-table-column prop="dictValue" label="字典键值" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column label="是否默认">
          <template slot-scope="scope">
            {{statusMap[scope.row.isDefault]}}
          </template>
        </el-table-column>
        <el-table-column label="是否禁用" >
          <template slot-scope="scope">
            {{statusMap[scope.row.isDisabled]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini"  round @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="mini"  round @click="edit(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>

import {getMapping} from "@/utils/MappingUtil";

export default {
  name: "DictData",
  data(){
    return{
      dictId: 0,
      tableData: [],

      statusMap:{}
    }
  },
  activated() {
    this.dictId = this.$route.query.dictId
    this.statusMap = getMapping('system_yes_no')
    this.findList()
  },
  methods:{
    findList(){
      let params = {
        id: this.dictId,
        selectDetail: true
      }
      this.$api.dict.get(params).then(res => {
        this.tableData = res.dictData
      })
    }
  }

}
</script>

<style scoped>

</style>
