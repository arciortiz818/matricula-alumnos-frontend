import axios from 'axios';

export default {
  namespaced: true,
  state: {
    tiposDocumento: [],
  },
  mutations: {
    SET_TIPOS(state, payload) {
      state.tiposDocumento = payload;
    },
  },
  actions: {
    getTiposDocumento({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/tipos-documento')
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_TIPOS', res.data.data);
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
  },
};
