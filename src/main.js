// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueResorce from 'vue-resource'
import vueUpload from '@websanova/vue-upload'
import ElementUI from 'element-ui'
import Helper from '@/util/helper'
// import {
//   Pagination,
//   DatePicker,
//   Input,
//   Button,
//   Select,
//   Option,
//   Checkbox,
//   Radio,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
// } from 'element-ui';
import '../theme/index.css'
Vue.config.productionTip = false
Vue.prototype.$Route = router
Vue.prototype.$Helper = Helper
Vue.use(ElementUI)
Vue.use(vueResorce)
// Vue.use(Pagination)
// Vue.use(DatePicker)
// Vue.use(Input)
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Checkbox)
// Vue.use(Radio)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)

Vue.use(vueUpload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})

