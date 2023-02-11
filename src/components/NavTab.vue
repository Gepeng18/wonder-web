<template>
  <div>
    <el-menu
        unique-opened
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <MenuTree :menuList="menuList"></MenuTree>
    </el-menu>
  </div>

</template>

<script>
import MenuTree from "@/components/MenuTree.vue";

export default {
  name: "NavTab",
  components: {MenuTree},
  data() {
    return {
      menuList:[]
    }
  },
  created() {
    this.$api.menu.treeList({}).then(res => {
      this.menuList = res
    })
  },
  methods: {
    handleOpen(key, keyPath){
      console.log('open key: ', key, 'open keyPath: ', keyPath);
    },
    handleClose(key, keyPath){
      console.log('close key: ', key, 'close keyPath: ', keyPath);
    }
  }


}
</script>

<style lang="scss" scoped>

.tags{
  padding: 5px 10px 5px 10px;

  .item{
    margin-right: 5px;

    .el-tag {
      cursor: pointer;
    }
  }

  .el-divider--horizontal{
    margin: 10px 0 10px 0;
  }
}
</style>
