<template>
  <div>
    <div class="bar">
      <div class="inner-left">
          <el-form :model="queryParams" ref="queryForm" label-suffix=":" label-width="100px">
            <slot/>
          </el-form>
      </div>
      <div class="inner-right">
        <el-row :gutter="5" >
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-button type="primary" @click="handlerSearch">搜 索</el-button>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-button type="primary" plain ref="handlerReset" @click="handlerReset">重 置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-divider/>
  </div>
</template>

<script>
export default {
  name: "TableSearchBar",
  props:{
    queryParams: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handlerSearch(e){
      e.target.blur()
      this.$emit('search')
    },

    handlerReset(e){
      this.$refs.handlerReset.$el.blur()
      this.$resetForm('queryForm')
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
.bar {
  /*background-color: #42b983;*/
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}

.inner-left {
  /*background-color: #2c3e50;*/
  width: 80%;
}

.inner-right {
  /*background-color: blueviolet;*/
  margin-left: 10px;
  /*line-height: 62px;*/
}

.el-button {
  padding-right: 30px;
  padding-left: 30px;
}
.el-divider--horizontal{
  margin: 0 5px 10px 5px;
}
</style>
