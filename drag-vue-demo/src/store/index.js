import Vue from 'vue'
import Vuex from 'vuex'

import chart from './module/chart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chart
  }
})
