import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import VModal from 'vue-js-modal'
import BootstrapVue from 'bootstrap-vue'  // Add
import 'bootstrap/dist/css/bootstrap.css' //Add
import 'bootstrap-vue/dist/bootstrap-vue.css' //Add


Vue.config.productionTip = false
Vue.use(BootstrapVue)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

Vue.use(VModal)

