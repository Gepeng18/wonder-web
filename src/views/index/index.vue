<template>
  <!-- 系统整体页面布局 -->
  <el-container>
    <el-header class="header">
      <div class="header-left">
        <h2>管理系统</h2>
      </div>
      <div class="header-right">
        <div @click="logout"><h3>退出</h3></div>
      </div>
      <CommonDialog ref="commonDialog" :display="false" title="提示" type="danger" confirm-text="退出" cancel-text="取消"
                    @confirm="doLogout">
        <span>该操作会退出当前登录，是否退出？</span>
      </CommonDialog>
    </el-header>
    <el-container>
      <el-aside style="width: 201px;">
        <NavTab></NavTab>
        <!--            <el-menu-item index="/home" @click="clickItem('/home')">首页</el-menu-item>-->
        <!--            <el-menu-item index="/system/user" @click="clickItem('/system/user')">用户管理</el-menu-item>-->
        <!--            <el-menu-item index="/system/role" @click="clickItem('/system/role')">角色管理</el-menu-item>-->
        <!--            <el-menu-item index="/system/menu" @click="clickItem('/system/menu')">菜单管理</el-menu-item>-->
        <!--            <el-menu-item index="/system/dict" @click="clickItem('/system/dict')">字典管理</el-menu-item>-->
      </el-aside>
      <el-main class="content-main">
        <div style="height: 100%">
          <el-tabs
              v-model="activeTab"
              type="card"
              @tab-remove="removeTab"
              @tab-click="clickBtn"
              style="line-height: 40px"
          >
            <el-tab-pane
                :key="index"
                v-for="(item, index) in tabList"
                :label="item.title"
                :name="item.path"
                :closable="item.closable"
            >
            </el-tab-pane>
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import store from "@/store";
import NavTab from "@/components/NavTab.vue";

export default {
  name: "index",
  components: {NavTab},
  data() {
    return {
      // 当前活跃的tabs
      activeTab: '',

      menuList: []
    }
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    tabList() {
      return store.getters['getTabs']
    },
  },

  watch: {
    $route: function () {
      this.setActiveTab()
      this.addTab()
    },
  },
  methods: {
    // 设置活跃的tab
    setActiveTab() {
      this.activeTab = this.$route.path
    },
    // 添加tab
    addTab() {
      const {path, meta} = this.$route
      const tab = {
        path,
        title: meta.title,
        closable: true
      }
      this.$store.commit('addTab', tab)

    },
    // 点击tab
    clickBtn(tab) {
      const {name} = tab
      this.$router.push({path: name})
    },
    removeTab(targetName) {
      let tabs = this.tabList;
      let activeName = this.activeTab;
      let that = this
      if (tabs.length === 1) {
        this.$message.warning('必须保留一个喔')
        return
      }

      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.path;
              that.$router.push({
                path: nextTab.path
              })
            }
          }
        });
      }
      this.activeTab = activeName;
      let newTabs = tabs.filter((tab) => tab.path !== targetName)
      if (newTabs.length === 1)
        newTabs[0].closable = false
      this.$store.state.tabList = newTabs
    },


    // 删除tab
    // removeTab(target) {
    //   // 当前激活的tab
    //   let active = this.activeTab
    //   const tabs = this.tabList
    //   // 只有一个标签页的时候不允许删除
    //   if (tabs.length === 1) return
    //   if (active === target) {
    //     console.log(1111111)
    //     tabs.forEach((tab, index) => {
    //       // 如果删除的就是当前活跃的tab,就把活跃的tab变成上一个或下一个
    //       const nextTab = tab[index + 1] || tab[index - 1]
    //       if (nextTab) {
    //         active = nextTab.path
    //       }
    //     })
    //   }
    //   // 重新设置当前激活的选项卡和 选项卡列表
    //   this.activeTab = active
    //   store.state.tabList = tabs.filter((tab) => tab.path !== target)
    // },


    handleOpen() {
      this.isCollapse = false

    },
    handleClose() {
      this.isCollapse = true
    },
    logout() {
      this.$refs.commonDialog.show()
    },
    doLogout() {
      this.$store.commit('logout')
    }
  },
  // 解决刷新数据丢失问题
  beforeRefresh() {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('tabsView', JSON.stringify(this.tabList))
    })
    let tabSession = sessionStorage.getItem('tabsView')
    if (tabSession) {
      let oldTabs = JSON.parse(tabSession)
      if (oldTabs.length > 0) {
        this.$store.state.tabList = oldTabs
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/public.scss";

.header {
  background-color: $color-primary;
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.el-tabs__content {

}

.header-left {
  line-height: 60px;
}

.header-right {
  line-height: 60px;
}

::v-deep .el-main {
  padding: 5px;
}
</style>
