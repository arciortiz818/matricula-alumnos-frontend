import axios from 'axios';

export default {
  namespaced: true,
  state: {
    programas: [],
    programa: {},
    table_headers: [
      {
        text: '#',
        align: 'center',
        sortable: false,
        value: 'index',
      },
      {
        text: 'Código',
        align: 'left',
        sortable: false,
        value: 'codigo',
      },
      { text: 'Plan', align: 'left', sortable: false, value: 'plan' },
      { text: 'Nombre', align: 'left', sortable: false, value: 'nombre' },
      {
        text: 'Semestres',
        align: 'center',
        sortable: false,
        value: 'numero_niveles',
      },
      {
        text: 'Valor Semestre',
        align: 'right',
        sortable: false,
        value: 'valor_nivel',
      },
      {
        text: 'Acciones',
        align: 'center',
        sortable: false,
        value: 'actions',
      },
    ],
  },
  mutations: {
    SET_PROGRAMAS(state, payload) {
      state.programas = payload.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    SET_PROGRAMA(state, payload) {
      state.programa = payload;
    },
  },
  actions: {
    getAllProgramas({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/programas')
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_PROGRAMAS', res.data.data);
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
              commit('SET_PROGRAMA', res.data.data);

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
