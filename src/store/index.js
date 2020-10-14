import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import modules from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state,
  mutations,
  getters,
})
