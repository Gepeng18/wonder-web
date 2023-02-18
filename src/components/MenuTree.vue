<template>
  <fragment>
    <template v-for="menu in this.menuList">
      <el-submenu :key="menu.id" :index="menu.id.toString()" v-if="menu.children && menu.menuType === 1">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <menu-tree :menuList="menu.children"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.id" :index="menu.path" v-else-if="menu.menuType ===2">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </template>
  </fragment>

</template>

<script>
export default {
  name: 'MenuTree',  // 很重要，调用自身需要用到
  props: ['menuList'],
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

