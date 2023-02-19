<template>
  <el-dialog
      :visible.sync="visible"
      :width="width"
      :top="top"
      :show-close="false"
      :class="['custom-dialog', 'dialog-header-bg-' + type]"
      :close-on-click-modal="false"
  >
    <div slot="title" class="title">
      <i :class="['el-icon-' + icon]"></i> <span style="font-weight: bold">{{ title }}</span>
    </div>
    <div class="content">
      <slot/>
    </div>
    <div slot="footer" class="dialog-footer" v-if="showFooter">
      <el-button @click="cancel" v-if="showCancel">{{ cancelText }}</el-button>
      <el-button @click="confirm" :disabled="disabled" type="primary">{{ confirmText }}</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: "CommonDialog",
  props: {
    icon: {
      type: String,
      default: 'warning'
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '400px'
    },
    top: {
      type: String,
      default: '0%'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    type: {
      type: String,
      default: "primary"
    },
    display: {
      type: Boolean,
      default: false
    },
    disabled:{
      type: Boolean,
      default: false
    },
    showFooter:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: this.display,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    confirm() {
      this.close()
      this.$emit('confirm')
    },

    cancel() {
      this.close()
      this.$emit('cancel')
    },

    close(){
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/public.scss";

.content {
  font-size: 18px;
}

.title {
  line-height: 20px;
}
</style>
