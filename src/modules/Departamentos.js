import axios from 'axios';

export default {
  namespaced: true,
  state: {
    departamentos: [],
  },
  mutations: {
    SET_DEPARTAMENTOS(state, payload) {
      state.departamentos = payload;
    },
  },
  actions: {
    getDepartamentos({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/departamentos')
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_DEPARTAMENTOS', res.data.data);
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
