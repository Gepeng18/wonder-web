<template>
  <!-- 系统整体页面布局 -->
  <el-container>
    <el-header class="header">
      <div class="left"><h2>管理系统</h2></div>

      <div class="right">
        <div class="right-sub">
          <h3>{{ this.$store.state.user.name }}</h3>
        </div>
        <div class="right-sub avatar">
          <el-avatar  :size="50" src="https://img2.woyaogexing.com/2022/05/10/8ff885eade914ea88a78563f1a2eda0e!400x400.jpeg"></el-avatar>
        </div>
        <div class="right-sub">
          <span @click="logout"><h3>退出</h3></span>
        </div>
      </div>
    </el-header>

    <CommonDialog ref="commonDialog" :display="false" title="提示" type="danger" confirm-text="退出" cancel-text="取消"
                  @confirm="doLogout">
      <span>该操作会退出当前登录，是否退出？</span>
    </CommonDialog>

    <el-container>
<!--      <el-aside style="width: 201px;">-->
      <el-aside style="width: auto;">
        <!--侧边栏-->
        <NavTab/>
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

import NavTab from "@/components/NavTab.vue";
import CommonDialog from "@/components/CommonDialog";

export default {
  name: "index",
  components: {NavTab, CommonDialog},
  data() {
    return {
      // 当前活跃的tabs
      // activeTab: '',
    }
  },
  computed: {
    tabList() {
      return this.$store.getters.getTabs
    },
    // activeTab() {
    //   return this.$store.getters.activeTab
    // }
    activeTab: {
      get() {
        return this.$store.getters.activeTab
      },
      set() {
        this.$store.commit('setActiveTab', this.$route.path)
      }
    }
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
      // this.activeTab = this.$route.path
      this.$store.commit('setActiveTab', this.$route.path)
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
      let that = this
      let tabs = that.tabList;
      // let activeName = that.activeTab;
      let activeName = this.$store.getters.activeTab
      ;

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
      // that.activeTab = activeName;
      this.$store.commit('setActiveTab', activeName)
      let newTabs = tabs.filter((tab) => tab.path !== targetName)
      if (newTabs.length === 1)
        newTabs[0].closable = false
      that.$store.state.tabList = newTabs
    },

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
  line-height: 60px;
  display: flex;
  color: white;
  justify-content: space-between;

  .left {
    width: 200px;
  }

  .right {
    width: auto;
    display: flex;
    line-height: 60px;
    justify-content: space-around;


    .right-sub {
      padding: 0 20px;
      line-height: 60px;
    }
    .avatar{
      //background-color: #F56C6C;
      margin-top: 5px;

    }
  }

}

.el-tabs__content {

}


::v-deep .el-main {
  padding: 5px;
}
</style>
