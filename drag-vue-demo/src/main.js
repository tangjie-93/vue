import Vue from 'vue'
import App from './App.vue'
import store from './store'
import _ from 'lodash'
import './assets/index.css'
import iView from 'view-design'
import VueWorker from 'vue-worker'
Vue.use(iView)
Vue.use(VueWorker)
Vue.config.productionTip = false
Vue.prototype.$lodash = _
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
