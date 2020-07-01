import axios from 'axios'

export default {
  namespaced: true,
  state: {
    estudiantes: [],
    table_headers: [
      {
        text: '#',
        align: 'center',
        sortable: false,
        value: 'index'
      },
      {
        text: 'Tipo Doc.',
        align: 'center',
        sortable: false,
        value: 'tipoDocumento.codigo'
      },
      {
        text: 'Documento',
        align: 'center',
        sortable: false,
        value: 'documento'
      },
      {
        text: 'Primer Nombre',
        align: 'left',
        sortable: false,
        value: 'nombre1'
      },
      {
        text: 'Segundo Nombre',
        align: 'left',
        sortable: false,
        value: 'nombre2'
      },
      {
        text: 'Primer Apellido',
        align: 'left',
        sortable: false,
        value: 'apellido1'
      },
      {
        text: 'Segundo Apellido',
        align: 'left',
        sortable: false,
        value: 'apellido2'
      },
      //   {
      //     text: "Dirección",
      //     align: "center",
      //     sortable: false,
      //     value: "direccion",
      //   },
      //   {
      //     text: "Barrio",
      //     align: "right",
      //     sortable: false,
      //     value: "barrio",
      //   },
      //   {
      //     text: "Teléfono Casa",
      //     align: "right",
      //     sortable: false,
      //     value: "telefono_casa",
      //   },
      //   {
      //     text: "Teléfono Oficina",
      //     align: "right",
      //     sortable: false,
      //     value: "telefono_oficina",
      //   },
      {
        text: 'Celular',
        align: 'right',
        sortable: false,
        value: 'celular'
      },
      {
        text: 'Email',
        align: 'center',
        sortable: false,
        value: 'email'
      },
      //   {
      //     text: "Fecha Nacimiento",
      //     align: "center",
      //     sortable: false,
      //     value: "fechaNacimiento",
      //   },

      //   {
      //     text: "Departamento",
      //     align: "right",
      //     sortable: false,
      //     value: "departamento.nombre",
      //   },
      //   {
      //     text: "Ciudad",
      //     align: "right",
      //     sortable: false,
      //     value: "ciudad.nombre",
      //   },
      //   {
      //     text: "País",
      //     align: "right",
      //     sortable: false,
      //     value: "pais.nombre",
      //   },
      {
        text: 'Acciones',
        align: 'center',
        sortable: false,
        value: 'actions'
      }
    ]
  },
  mutations: {
    SET_ESTUDIANTES (state, payload) {
      state.estudiantes = payload
    },
    EDIT_ESTUDIANTE (state, payload) {
      Object.assign(state.estudiantes[payload.index], payload.data)
    },
    ADD_ESTUDIANTE (state, payload) {
      state.estudiantes.push(payload.data)
    },
    REFRESH_DATA (state) {
      state.estudiantes = state.estudiantes.map((items, index) => ({
        ...items,
        index: index + 1
      }))
    }
  },
  actions: {
    getAllEstudiantes ({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/estudiantes')
          .then(res => {
            if (res.data.success === 'true') {
              commit('SET_ESTUDIANTES', res.data.data)
              commit('REFRESH_DATA')
              resolve(res.data)
            } else {
              reject(res.data)
            }
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    addEstudiante ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/estudiantes', payload.data)
          .then(res => {
            if (res.data.success === 'true') {
              commit('ADD_ESTUDIANTE', payload)
              commit('REFRESH_DATA')
              resolve(res.data)
            }
            reject(res.data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    editEstudiante ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('admin/estudiantes/' + payload.id, payload.data)
          .then(res => {
            if (res.data.success === 'true') {
              commit('EDIT_ESTUDIANTE', payload)
              resolve(res.data)
            } else {
              reject(res.data)
            }
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    getEstudiante (state, id) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/estudiantes/' + id)
          .then(res => {
            if (res.data.success === 'true') {
              resolve(res.data)
            } else {
              reject(res.data)
            }
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    deleteEstudiante ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete('admin/estudiantes/' + payload.id)
          .then(res => {
            if (res.data.success === 'true') {
              state.estudiantes.splice(payload.index, 1)
              resolve(res.data)
            }
            reject(res.data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    }
  }
}
