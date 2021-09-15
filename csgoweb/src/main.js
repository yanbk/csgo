import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import {
  Button,
  Message,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'

import './utils/rem'
import './icons'
import '@/styles/element-variables.scss'
import './permission'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.config.productionTip = false
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
