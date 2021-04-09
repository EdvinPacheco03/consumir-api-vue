import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
// import Mdbvue from 'mdbvue'
import store from './store'

Vue.config.productionTip = false
//Archivos Js de Bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, Axios)
Vue.use(store)
// Vue.use(Mdbvue)


//Importan archivos css de Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../public/style.css'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
