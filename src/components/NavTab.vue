<template>
  <div style="display: flex;height: 100%;background-color: #545c64">
    <el-menu
        unique-opened
        router
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        :default-active="routeChange()"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
    >
<!--      <el-menu
          unique-opened
          router
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          :default-active="$route.path"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
      >-->
      <!--      第一种-->
      <!--      <div style="width: 100%;height: 50px;color: white;">-->
      <!--        <i style="float: right;font-size:25px;line-height: 50px;margin-right: 20px"-->
      <!--           :class="[isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']" @click="isCollapse=!isCollapse"></i>-->
      <!--      </div>-->

      <MenuTree :menuList="menuList"></MenuTree>
    </el-menu>
    <!--第二种-->
    <div class="collapse" @click="isCollapse = !isCollapse">
      <i :class="['collapse-icon', isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']"></i>
    </div>
  </div>

</template>

<script>
import MenuTree from "@/components/MenuTree.vue";
import {shallowRef} from "vue";
import {defineAsyncComponent} from "vue";

export default {
  name: "NavTab",
  components: {MenuTree},
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    menuList() {
      return this.$store.getters.userMenus
    }
  },
  created() {
    this.$store.state.activeTab || this.getFirstRoutePath(this.menuList)
  },
  methods: {
    getFirstRoutePath(data) {
      let that = this
      const fn = function (array) {
        array.forEach((item, index) => {
          if (index === 0) {
            if (item.children && item.menuType !== 2) {
              fn(item.children);
            } else {
              const tab = {
                path: item.path,
                title: item.name,
                content: shallowRef(defineAsyncComponent(() => import(`@/views/${item.component}.vue`))),
              }
              that.$store.commit('addTab', tab)
              that.$router.push({
                path: item.path
              })
            }
          }
        })
      }
      fn(data);
    },

    handleOpen(key, keyPath) {
      console.log('open key: ', key, 'open keyPath: ', keyPath);
    },

    handleClose(key, keyPath) {
      console.log('close key: ', key, 'close keyPath: ', keyPath);
    },

    routeChange(){
      console.log('this.$route.path', this.$route.path)
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #545c64;
}

.collapse:hover {
  opacity: 0.5;
}

.collapse-icon {
  color: #fff;;
  float: right;
  font-size: 25px;
  line-height: 50px;
}

/* 必须设置 */
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  border-right: none;
}

.el-menu {
  border-right: none;
}

.tags {
  padding: 5px 10px 5px 10px;

  .item {
    margin-right: 5px;

    .el-tag {
      cursor: pointer;
    }
  }

  .el-divider--horizontal {
    margin: 10px 0 10px 0;
  }
}
</style>
