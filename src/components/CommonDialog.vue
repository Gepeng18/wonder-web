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
      <div v-if="content" v-html="content"></div>
      <slot v-else/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel" v-if="showCancel" >{{ cancelText }}</el-button>
      <el-button @click="handleConfirm" v-if="showConfirm" :disabled="disabled" :loading="loading" type="primary">{{ confirmText }}</el-button>
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
      default: '提 示'
    },
    width: {
      type: String,
      default: '400px'
    },
    top: {
      type: String,
      default: '-50px'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确 定'
    },
    cancelText: {
      type: String,
      default: '取 消'
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
    autoClose: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      visible: this.display,
      loading: false,
      data: null,
    }
  },
  methods: {
    show(data = null) {
      this.data = data
      this.visible = true
    },

    handleConfirm() {
      this.startLoading()
      if (this.autoClose){
        this.close()
      }
      this.$emit('confirm', this.data)
    },

    handleCancel() {
      this.close()
      this.$emit('cancel', this.data)
    },

    close(){
      this.stopLoading()
      this.visible = false
      this.$emit('close', this.data)
    },

    startLoading(){
      this.loading = true
    },

    stopLoading(){
      this.loading = false
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
