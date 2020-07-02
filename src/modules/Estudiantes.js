import axios from 'axios';

export default {
  namespaced: true,
  state: {
    estudiantes: [],
    estudiante: {},
    editing: false,
    table_headers: [
      {
        text: '#',
        align: 'center',
        sortable: false,
        value: 'index',
      },
      {
        text: 'Documento',
        align: 'center',
        sortable: false,
        value: 'documento',
      },
      {
        text: 'Primer Nombre',
        align: 'left',
        sortable: false,
        value: 'nombre1',
      },
      {
        text: 'Segundo Nombre',
        align: 'left',
        sortable: false,
        value: 'nombre2',
      },
      {
        text: 'Primer Apellido',
        align: 'left',
        sortable: false,
        value: 'apellido1',
      },
      {
        text: 'Segundo Apellido',
        align: 'left',
        sortable: false,
        value: 'apellido2',
      },
      {
        text: 'Celular',
        align: 'right',
        sortable: false,
        value: 'celular',
      },
      {
        text: 'Email',
        align: 'center',
        sortable: false,
        value: 'email',
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
    SET_ESTUDIANTES(state, payload) {
      state.estudiantes = payload.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    SET_ESTUDIANTE(state, payload) {
      state.estudiante = payload;
    },
    SET_EDITING(state, payload) {
      state.editing = payload;
    },
  },
  actions: {
    getAllEstudiantes({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/estudiantes')
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_ESTUDIANTES', res.data.data);
              // commit('REFRESH_DATA');
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
    addEstudiante({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/estudiantes', payload)
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
    editEstudiante({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('admin/estudiantes/' + payload.id, payload)
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
    getEstudiante({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/estudiantes/' + id)
          .then((res) => {
            if (res.data.success === 'true') {
              commit('SET_ESTUDIANTE', res.data.data);
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
    getEstudianteByDocumento({ commit }, documento) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/estudiantes/documento/' + documento)
          .then((res) => {
            console.log(res.data.data);
            if (res.data.success === 'true') {
              commit('SET_ESTUDIANTE', res.data.data);
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            console.log('error');
            reject(err.response.data);
          });
      });
    },
    deleteEstudiante({ state }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete('admin/estudiantes/' + id)
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
