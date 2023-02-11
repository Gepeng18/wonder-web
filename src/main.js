import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import '@/api'
import CommonDialog from "@/components/CommonDialog.vue";
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(CommonDialog)
Vue.component(CollapseTransition.name, CollapseTransition)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
