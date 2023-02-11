<template>
  <!-- 系统整体页面布局 -->
  <el-container class="el-container" style="height: 100%">
    <el-header class="header">
      <div class="header-left">
        <h2>管理系统</h2>
      </div>
      <div class="header-right">
                <div @click="logout"><h3>退出</h3></div>
      </div>
      <CommonDialog ref="commonDialog" :display="false" title="提示" type="danger" confirm-text="退出" cancel-text="取消" @confirm="doLogout">
        <span>该操作会退出当前登录，是否退出？</span>
      </CommonDialog>
    </el-header>
    <el-container style="height: 100%">
      <el-aside style="width: 201px;">

        <NavTab></NavTab>

<!--        <el-menu-->
<!--            :default-active="this.$route.path"-->
<!--            class="el-menu-vertical-demo"-->
<!--            router-->
<!--            @open="handleOpen"-->
<!--            @close="handleClose"-->

<!--        >-->
<!--          <el-sub-menu index="/">-->
<!--            <el-menu-item index="/home" @click="clickItem('/home')">首页</el-menu-item>-->
<!--            <el-menu-item index="/system/user" @click="clickItem('/system/user')">用户管理</el-menu-item>-->
<!--            <el-menu-item index="/system/role" @click="clickItem('/system/role')">角色管理</el-menu-item>-->
<!--            <el-menu-item index="/system/menu" @click="clickItem('/system/menu')">菜单管理</el-menu-item>-->
<!--            <el-menu-item index="/system/dict" @click="clickItem('/system/dict')">字典管理</el-menu-item>-->
<!--          </el-sub-menu>-->
<!--        </el-menu>-->
      </el-aside>
<!--      <el-main>-->
<!--        &lt;!&ndash;        <el-container>&ndash;&gt;-->
<!--        &lt;!&ndash;          <el-header>&ndash;&gt;-->
<!--        <NavTab ref="navTab"/>-->
<!--        &lt;!&ndash;          </el-header>&ndash;&gt;-->
<!--        &lt;!&ndash;          <el-main>&ndash;&gt;-->
<!--        <router-view/>-->
<!--        &lt;!&ndash;          </el-main>&ndash;&gt;-->

<!--        &lt;!&ndash;        </el-container>&ndash;&gt;-->
<!--      </el-main>-->
      <el-main>
        <div>
          <el-tabs
              v-model="activeIndex"
              type="card"
              @tab-remove="removeTab"
              @tab-click="clickTab"
          >
            <el-tab-pane
                :key="item.name"
                v-for="item in editableTabs"
                :label="item.title"
                :name="item.name"
                :closable="item.closable"
            >
              <router-view></router-view>
            </el-tab-pane>
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
      activeIndex: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,

      menuList:[

      ]
    }
  },
  mounted() {

  },

  setup() {
  },
  methods: {
    clickItem(e){
      console.log(e)
      // this.addTab()
    },

    addTab() {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
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
      store.commit('logout')
    }
  }
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
