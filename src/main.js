import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/api'
import '@/store'
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Fragment from 'vue-fragment'
import "@/utils/permission";
import has from "@/utils/permission";
import globalConst from "@/utils/globalConst"
import dict from '@/components/DictData'// 数据字典
import { resetForm, dialog } from "@/utils/common";

Vue.prototype.$gc = globalConst
Vue.prototype.$resetForm = resetForm
Vue.prototype.$dialog = dialog

Vue.use(has)
Vue.use(dict)

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(CommonDialog)
Vue.use(Fragment.Plugin)

Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
