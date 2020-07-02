import axios from 'axios';

export default {
  namespaced: true,
  state: {
    materias: [],
    niveles: 0,
    table_headers: [
      {
        text: 'Matricular',
        align: 'left',
        value: 'matricular',
      },
      {
        text: 'Materia',
        align: 'left',
        value: 'nombre',
      },
      {
        text: 'Créditos',
        align: 'left',
        value: 'creditos',
      },
    ],
  },
  mutations: {
    SET_MIS_MATERIAS(state, payload) {
      state.materias = payload;
    },
    SET_NIVELES(state, payload) {
      state.niveles = payload;
    },
  },
  actions: {
    getMaterias({ state, dispatch, commit }, idPrograma) {
      return new Promise((resolve, reject) => {
        dispatch('Materias/getMateriasxPrograma', idPrograma, {
          root: true,
        })
          .then((res) => {
            commit('SET_MIS_MATERIAS', res.data);
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
            commit('SET_NIVELES', res.data.numero_niveles);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
