<template>
  <!-- 系统整体页面布局 -->
  <el-container>
    <el-header class="header">
      <div class="left"><h2>管理系统</h2></div>

      <div class="right">
        <div class="right-sub">
<!--          <h3>{{ this.$store.state.user.name }}</h3>-->
        </div>
        <div class="right-sub avatar">
          <el-avatar :size="50"
                     src="https://img2.woyaogexing.com/2022/05/10/8ff885eade914ea88a78563f1a2eda0e!400x400.jpeg"></el-avatar>
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
      <el-main id="main">
        <div style="height: auto">
          <el-tabs
              v-model="activeTab"
              type="card"
              @tab-remove="removeTab"
              @tab-click="clickBtn"
              style="line-height: 40px"
              addable
              @edit="reloadCurrentTab"
          >
            <el-tab-pane
                :key="index"
                v-for="(item, index) in tabList"
                :label="item.title"
                :name="item.path"
                :closable="item.closable"
            >
            </el-tab-pane>

          </el-tabs>

        </div>
        <div>
          <transition name="fade-transform" mode="out-in">
            <keep-alive v-if="ifRouterAlive">
              <router-view/>
            </keep-alive>
          </transition>
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
      ifRouterAlive: true,

    }
  },

  computed: {
    tabList() {
      return this.$store.getters.getTabs
    },
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
    reload() {
      this.ifRouterAlive = false;
      this.$nextTick(() => {
        this.ifRouterAlive = true;
      });
    },
    reloadCurrentTab() {
      this.reload()
    },
    // 设置活跃的tab
    setActiveTab() {
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
      this.$store.commit('setActiveTab', name)
      this.$router.push({path: name})
    },
    removeTab(targetName) {
      let that = this
      let tabs = that.tabList
      let activeName = this.$store.getters.activeTab

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
      this.$store.commit('setActiveTab', activeName)
      let newTabs = tabs.filter((tab) => tab.path !== targetName)
      // that.$store.state.tabList = newTabs
      that.$store.commit('setTabs', newTabs)
    },
    logout() {
      this.$refs.commonDialog.show()
    },
    doLogout() {
      this.$store.commit('logout')
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/public.scss";

$el-header-height: 60px;

.el-header {
  background-color: $color-primary;
  line-height: $el-header-height;
  display: flex;
  color: white;
  justify-content: space-between;

  .left {
    width: 200px;
  }

  .right {
    width: auto;
    display: flex;
    line-height: $el-header-height;
    justify-content: space-around;


    .right-sub {
      padding: 0 20px;
      line-height: $el-header-height;
    }

    .avatar {
      //background-color: #F56C6C;
      margin-top: 5px;

    }
  }

}

.el-tabs__content {

}

::v-deep(.el-tabs__new-tab) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 41px;
  width: 84px;
  //border-color: #545c64;
  color: #111;
  border-bottom: 0 #00ff0d solid; /*上边*/
  background-color: #FFF;
  margin: 0;
  font-size: 15px;
  transform: translateY(-50);

  &:after {
    position: absolute;
    content: "刷新本页";
  }

  .el-icon-plus {
    display: none;
  }

}

.el-aside{
  height: calc(100vh - $el-header-height);
}
.el-main{
  padding: 0;
  height: calc(100vh - $el-header-height);

}
::v-deep(.el-tabs__new-tab:hover) {
  opacity: 0.8;
}

::v-deep .el-main {
  padding: 5px;
}
</style>
