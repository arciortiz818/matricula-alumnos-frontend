import axios from 'axios'

export default {
  state: {
    nombre_usuario: window.localStorage.getItem('nombre_usuario') || '',
    token: window.localStorage.getItem('token') || ''
  },
  mutations: {
    SET_USER (state, payload) {
      state.nombre_usuario = payload
      window.localStorage.setItem('nombre_usuario', payload)
    },
    SET_TOKEN (state, payload) {
      state.token = payload
      window.localStorage.setItem('token', payload)
    },
    REMOVE_USER (state) {
      state.nombre_usuario = ''
      window.localStorage.removeItem('nombre_usuario')
    },
    REMOVE_TOKEN (state) {
      state.token = ''
      window.localStorage.removeItem('token')
    }
  },
  getters: {
    isLoggedIn (state) {
      return !!state.token
    },
    nombre_usuario (state) {
      return state.nombre_usuario
    }
  },
  actions: {
    login: ({ commit, dispatch }, credentials) => {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8000/api/auth/login', credentials)
          .then(res => {
            commit('SET_TOKEN', res.data.token)
            dispatch('getAuthenticatedUser', res.data.token)
            resolve(true)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    getAuthenticatedUser ({ commit }, payload) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + payload
        }
      }
      axios
        .post(
          'http://localhost:8000/api/auth/get-authenticated-user',
          null,
          config
        )
        .then(res => {
          commit('SET_USER', res.data.user.name)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    logout: ({ commit }) => {
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_USER')
          commit('REMOVE_TOKEN')
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
