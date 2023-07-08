<template>
  <div>
    <TableSearchBar @search="handleSearch" @reset="handleReset">
      <el-form :model="searchForm" label-suffix=":" label-width="100px">
        <el-row :gutter="5" align="middle">
         <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item label="字典名称">
              <el-input v-model="searchForm.dictName" placeholder="字典名称"/>
            </el-form-item>
          </el-col>
         <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
           <el-form-item label="字典类型">
             <el-input v-model="searchForm.dictType" placeholder="字典类型"/>
           </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </TableSearchBar>

    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="dictName" label="字典名称" />
        <el-table-column prop="dictType" label="字典类型" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini"  round @click="detail(scope.row)">查看</el-button>
            <el-button type="primary" size="mini"  round @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="mini"  round @click="edit(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <div style="text-align: center">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.curPage"
            :page-sizes="[2, 3, 4]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.totalElements">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.vue";

export default {
  name: "Dict",
  components: {TableSearchBar},
  data() {
    return {
      searchForm: {
        dictName: '',
        dictType: '',
      },
      tableData: [],
      pageInfo:{
        totalElements: 0,
        curPage: 1,
        pageSize: 2
      },
      selectId: null,
      selectName: ''
    }
  },
  mounted() {
    this.findList()
  },
  methods:{
    detail(row){
      this.$router.push({
        path: '/system/dictData',
        query:{
          dictId: row.id
        }

      })
    },
    findList(){
      const params = {
        ...this.searchForm,
        ...this.pageInfo
      }
      this.$api.dict.list(params).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.pageInfo.pages = res.pages
      })
    },
    handleSearch() {
      this.findList()
    },
    handleReset(e) {
      this.searchForm.dictName = ''
      this.searchForm.dictType = ''
      this.pageInfo.curPage = 1
      this.findList()
      e.target.blur()
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.pageInfo.curPage = 1
      this.findList()
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val
      this.findList()
    }
  }
}
</script>

<style scoped>

</style>
