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


// Directive(s) personnalisée(s)
Vue.directive('show-password-input', {
  inserted: function(el) {
    var clone = el.cloneNode();
    clone.id = '';
    clone.type = 'text';
    clone.style.display = 'none';
    clone.addEventListener('input', function(e) {
      
      var inputEvent = document.createEvent('Event');
      inputEvent.initEvent('input', true, false);
      el.value = e.target.value;
      el.dispatchEvent(inputEvent);
      
    });
    el.parentNode.insertBefore(clone, el);
    var icons = {
      show: '&#x1F441;',
      hide: '&#x1F576;'
    };
    var a = document.createElement('a');
    a.style.position = 'absolute';
    a.style.cursor = 'pointer';
    a.style.fontSize = '2em';
    a.style.color = 'blue';
    a.textDecoration = 'none';
    a.innerHTML = icons.show;
    a.addEventListener('click', function(e) {
      
      if(clone.style.display === 'none') {
        
        e.target.innerHTML = icons.hide;
        el.style.display = 'none';
        clone.style.display = '';
        clone.value = el.value;
        clone.focus();
        
      } else {
        
        e.target.innerHTML = icons.show;
        clone.style.display = 'none';
        el.style.display = '';
        el.value = clone.value;
        el.focus();
        
      }
      
      e.preventDefault();
      
    });
    document.body.appendChild(a);
    function alignElement(target) {
      
      var rect = el.getBoundingClientRect();
      const clientWidth = target.clientWidth;
      const clientHeight = target.clientHeight;
      const left = rect.right - Math.round(clientWidth) - 10;
      const top = rect.top + Math.round(rect.height * 0.5) - Math.round(clientHeight * 0.5);
      target.style.left = window.pageXOffset + left +'px';
      target.style.top = window.pageYOffset + top +'px';
      
    }
    alignElement(a);
    
    window.addEventListener('resize', function() {
      
      alignElement(a);
      
    })
  }
})

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token'))
.then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
