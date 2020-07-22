import axios from 'axios';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getProgramas({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/programas')
          .then((res) => {
            if (res.data.success === 'true') {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    getPrograma({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/programas/' + id)
          .then((res) => {
            if (res.data.success === 'true') {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    addPrograma({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/programas', payload)
          .then((res) => {
            if (res.data.success === 'true') {
              resolve(res.data);
            }
            reject(res.data);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    editPrograma({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('admin/programas/' + payload.id, payload)
          .then((res) => {
            if (res.data.success === 'true') {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    deletePrograma({ state }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete('admin/programas/' + id)
          .then((res) => {
            if (res.data.success === 'true') {
              resolve(res.data);
            }
            reject(res.data);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
  },
};
