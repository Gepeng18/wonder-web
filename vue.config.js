module.exports = {
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: '@import \'~@/assets/css/public.scss\';'
      }
    }
  },

}
