module.exports = {

  devServer: {
    port: 8089
  },

  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: '@import \'~@/assets/css/public.scss\';'
      }
    }
  },

  configureWebpack: {
    devtool: 'source-map'
  }
}
