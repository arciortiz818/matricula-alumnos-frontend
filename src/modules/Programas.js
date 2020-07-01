import axios from 'axios'

export default {
  namespaced: true,
  state: {
    programas: [],
    table_headers: [
      {
        text: '#',
        align: 'center',
        sortable: false,
        value: 'index'
      },
      {
        text: 'Código SNIES',
        align: 'left',
        sortable: false,
        value: 'codigo'
      },
      { text: 'Nombre', align: 'left', sortable: false, value: 'nombre' },
      {
        text: 'Semestres',
        align: 'center',
        sortable: false,
        value: 'numero_niveles'
      },
      {
        text: 'Valor Semestre',
        align: 'right',
        sortable: false,
        value: 'valor_nivel'
      },
      {
        text: 'Acciones',
        align: 'center',
        sortable: false,
        value: 'actions'
      }
    ]
  },
  mutations: {
    SET_PROGRAMAS (state, payload) {
      state.programas = payload
    },
    EDIT_PROGRAMA (state, payload) {
      Object.assign(state.programas[payload.index], payload.data)
    },
    ADD_PROGRAMA (state, payload) {
      state.programas.push(payload.data)
    },
    REFRESH_DATA (state) {
      state.programas = state.programas.map((items, index) => ({
        ...items,
        index: index + 1
      }))
    }
  },
  actions: {
    getAllProgramas ({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/programas')
          .then(res => {
            if (res.data.success === 'true') {
              commit('SET_PROGRAMAS', res.data.data)
              commit('REFRESH_DATA')
              resolve(res.data)
            } else {
              reject(res.data)
            }
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    addPrograma ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/programas', payload.data)
          .then(res => {
            if (res.data.success === 'true') {
              commit('ADD_PROGRAMA', payload)
              commit('REFRESH_DATA')
              resolve(res.data)
            }
            reject(res.data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    editPrograma ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('admin/programas/' + payload.id, payload.data)
          .then(res => {
            if (res.data.success === 'true') {
              commit('EDIT_PROGRAMA', payload)
              resolve(res.data)
            } else {
              reject(res.data)
            }
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    deletePrograma ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete('admin/programas/' + payload.id)
          .then(res => {
            if (res.data.success === 'true') {
              state.programas.splice(payload.index, 1)
              resolve(res.data)
            }
            reject(res.data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    }
  }
}
