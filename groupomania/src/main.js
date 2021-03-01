import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const moment = require('moment')
require('moment/locale/fr')
 
Vue.use(require('vue-moment'), {
    moment
})


// Import Bootstrap an BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


// Authentification token
require('@/store/subscriber')
axios.defaults.baseURL ='http://localhost:3000/api/'


Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token'))
.then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
