import axios from 'axios';

export default {
  namespaced: true,
  state: {
    materias: [],
    materia: {},
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
      { text: 'Nombre', align: 'left', sortable: false, value: 'nombre' },
      {
        text: 'Semestre',
        align: 'center',
        sortable: true,
        value: 'nivel',
      },
      {
        text: 'Créditos',
        align: 'center',
        sortable: false,
        value: 'creditos',
      },
      {
        text: 'Valor Crédito',
        align: 'right',
        sortable: false,
        value: 'valor_credito',
      },
      {
        text: 'Valor Materia',
        align: 'right',
        sortable: false,
        value: 'valor_materia',
      },
      {
        text: '% Desc',
        align: 'right',
        sortable: false,
        value: 'porc_descuento',
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
    SET_MATERIAS(state, payload) {
      state.materias = payload.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    SET_MATERIA(state, payload) {
      state.materia = payload;
    },
  },
  actions: {
    getAllMaterias({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/materias')
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_MATERIAS', res.data.data);
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
    getMateria({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/materias/' + id)
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_MATERIA', res.data.data);
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
    getMateriasxPrograma({ commit }, idPrograma) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/materias/programa/' + idPrograma)
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_MATERIAS', res.data.data);
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
    addMateria({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/materias', payload)
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
    editMateria({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('admin/materias/' + payload.id, payload)
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
    deleteMateria({ state }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete('admin/materias/' + id)
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
