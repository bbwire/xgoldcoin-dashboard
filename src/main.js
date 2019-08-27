import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import vuetify from './plugins/vuetify';
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueProgressBar from 'vue-progressbar'
import VueSweetalert2 from 'vue-sweetalert2';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

Vue.use(VueChartkick, {adapter: Chart})
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
Vue.use(VueSession)
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app') 
