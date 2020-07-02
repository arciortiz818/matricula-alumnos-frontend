import axios from 'axios';

export default {
  namespaced: true,
  state: {
    ciudades: [],
  },
  mutations: {
    SET_CIUDADES(state, payload) {
      state.ciudades = payload;
    },
  },
  actions: {
    getCiudades({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/ciudades')
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_CIUDADES', res.data.data);
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
