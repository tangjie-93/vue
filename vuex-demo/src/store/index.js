import Vue from 'vue'
import Vuex from "./store"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add (state) {
            state.count++
        },
        sub (state) {
            state.count--
        }
    },
    actions: {
        add ({ commit }) {
            setTimeout(() => {
                commit('add')
            }, 1000);
        }
    },
    getters: {
        doubleCount: state => {
            // console.log(state)
            return state.count * 2
        }
    }
})