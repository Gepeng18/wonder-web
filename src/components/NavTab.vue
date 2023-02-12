<template>
  <div style="height: 100%">
    <el-menu
        unique-opened
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        :default-active="$route.path"
        active-text-color="#ffd04b"
        style="height: 100%">
      <MenuTree :menuList="menuList"></MenuTree>
    </el-menu>
  </div>

</template>

<script>
import MenuTree from "@/components/MenuTree.vue";
import store from "@/store";
import {shallowRef} from "vue";
import {defineAsyncComponent} from "vue";
export default {
  name: "NavTab",
  components: {MenuTree},
  data() {
    return {
      menuList:[],
    }
  },
  created() {
    this.$api.menu.treeList({}).then(res => {
      this.menuList = res
      this.getFirstRoutePath(res)
    })
  },
  methods: {
    getFirstRoutePath(res){
      let that =  this
      const fn = function(array){
        array.forEach((item,index)=>{
          if( index === 0){
            if(item.children && item.menuType !== 2){
              fn(item.children);
            }else{
              const tab = {
                path:item.path,
                title: item.name,
                content: shallowRef(defineAsyncComponent(() => import(`@/views/system/user/User.vue`))),
              }
              store.commit('addTab', tab)
              that.$router.push({
                path: item.path
              })
            }
          }
        })
      }
      fn(res);
    },
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
