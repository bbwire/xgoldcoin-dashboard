import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import vuetify from './plugins/vuetify';
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueProgressBar from 'vue-progressbar'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VueChartkick, {adapter: Chart})
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
Vue.use(VueSession)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app') 
