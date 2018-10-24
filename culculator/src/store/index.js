import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const state={
	count:10,
	timer:null
}
export default new Vuex.Store({	 
	state,
	actions,
	getters,
	mutations
})

