import axios from 'axios';

export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    getMaterias({ state, dispatch, commit }, idPrograma) {
      return new Promise((resolve, reject) => {
        dispatch('Materias/getMateriasxPrograma', idPrograma, {
          root: true,
        })
          .then((res) => {
            // commit('SET_MIS_MATERIAS', res.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getNivelesPrograma({ commit, dispatch }, idPrograma) {
      return new Promise((resolve, reject) => {
        dispatch('Programas/getPrograma', idPrograma, { root: true })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    matricularEstudiante({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/matriculas', payload)
          .then((res) => {
            if (res.data.success === 'true') {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            reject(err.data);
          });
      });
    },
    getMatriculaByDocEstudiante({ state }, docEstudiante) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/matriculas/' + docEstudiante)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    modificarMatricula({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('admin/matriculas/' + payload.idMatricula, {
            detalle: payload.detalle,
          })
          .then((res) => {
            if (res.data.success === 'true') {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            reject(err.data);
          });
      });
    },
  },
};
