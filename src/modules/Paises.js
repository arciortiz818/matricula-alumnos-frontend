import axios from 'axios';

export default {
  namespaced: true,
  state: {
    paises: [],
  },
  mutations: {
    SET_PAISES(state, payload) {
      state.paises = payload;
    },
  },
  actions: {
    getPaises({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/paises')
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_PAISES', res.data.data);
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
