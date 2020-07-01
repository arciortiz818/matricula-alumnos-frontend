import Vue from 'vue'
import Vuex from 'vuex'
import User from '../modules/User'
import Programas from '../modules/Programas'
import Materias from '../modules/Materias'
import Estudiantes from '../modules/Estudiantes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: ''
  },
  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    }
  },
  actions: {},
  modules: { User, Programas, Materias, Estudiantes }
})
