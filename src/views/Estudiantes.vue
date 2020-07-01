<template>
  <default-layout>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-spacer></v-spacer>
        <v-toolbar-title>Administrar Estudiantes</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          :headers="table_headers"
          :items="estudiantes"
          :items-per-page="10"
          class="elevation-1"
        >
          <template slot="no-data">
            <v-progress-circular
              :size="50"
              :width="7"
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </template>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="secondary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >Nuevo</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-select
                              v-model="editedItem.idTipo_Documento"
                              :items="tipos_documentos"
                              :rules="[
                                v => !!v || 'Tipo Documento es requerido.'
                              ]"
                              label="Tipo de Documento"
                              required
                              item-text="nombre"
                              item-value="id"
                            ></v-select>
                            <v-text-field
                              v-model="editedItem.documento"
                              label="Documento de Identidad"
                              :rules="[v => !!v || 'Documento es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.nombre1"
                              label="Primer Nombre"
                              :rules="[
                                v => !!v || 'Primer Nombre es requerido.'
                              ]"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.nombre2"
                              label="Segundo Nombre"
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.apellido1"
                              label="Primer Apellido"
                              :rules="[
                                v => !!v || 'Primer Apellido es requerido.'
                              ]"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.apellido2"
                              label="Segundo Apellido"
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.direccion"
                              label="Dirección"
                              :rules="[v => !!v || 'Dirección es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.barrio"
                              label="Barrio"
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.telefono_casa"
                              label="Teléfono Casa"
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.telefono_oficina"
                              label="Teléfono Oficina"
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.celular"
                              label="Celular"
                              :rules="[v => !!v || 'Celular es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="editedItem.email"
                              label="Email"
                              :rules="[v => !!v || 'Email es requerido.']"
                              required
                            ></v-text-field>
                            <v-menu
                              v-model="showPicker"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              full-width
                              max-width="290px"
                              min-width="290px"
                              header-color="primary"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="editedItem.fecha_nacimiento"
                                  label="Fecha de Nacimiento"
                                  hint="YYYY/MM/DD"
                                  persistent-hint
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="editedItem.fecha_nacimiento"
                                no-title
                                @input="showPicker = false"
                              ></v-date-picker>
                            </v-menu>
                            <v-select
                              v-model="editedItem.idDepartamento"
                              :items="departamentos"
                              :rules="[
                                v => !!v || 'Departamento es requerido.'
                              ]"
                              label="Departamento"
                              required
                              item-text="nombre"
                              item-value="id"
                            ></v-select>
                            <v-select
                              v-model="editedItem.idCiudad"
                              :items="ciudades"
                              :rules="[v => !!v || 'Ciudad es requerido.']"
                              label="Ciudad"
                              required
                              item-text="nombre"
                              item-value="id"
                            ></v-select>
                            <v-select
                              v-model="editedItem.idPais"
                              :items="paises"
                              :rules="[v => !!v || 'Pais es requerido.']"
                              label="Pais"
                              required
                              item-text="nombre"
                              item-value="id"
                            ></v-select>
                          </v-form>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </default-layout>
</template>

<script>
import DefaultLayout from "../layouts/default-layout";
import { mapState } from "vuex";
import axios from "axios";
export default {
  components: {
    DefaultLayout
  },
  data() {
    return {
      loading: false,
      showPicker: false,
      valid: false,
      dialog: false,
      editedItem: {
        id: 0,
        documento: "",
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        direccion: "",
        barrio: "",
        telefono_casa: "",
        telefono_oficina: "",
        celular: "",
        email: "",
        fecha_nacimiento: null,
        idTipo_Documento: 0,
        idDepartamento: 0,
        idCiudad: 0,
        idPais: 0
      },
      defaultItem: {
        id: 0,
        documento: "",
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        direccion: "",
        barrio: "",
        telefono_casa: "",
        telefono_oficina: "",
        celular: "",
        email: "",
        fecha_nacimiento: null,
        idTipo_Documento: 0,
        idDepartamento: 0,
        idCiudad: 0,
        idPais: 0
      },
      tipos_documentos: [],
      departamentos: [],
      ciudades: [],
      paises: [],
      editedIndex: -1
    };
  },
  mounted() {
    this.getTiposDocumentos();
    this.getDepartamentos();
    this.getCiudades();
    this.getPaises();
    this.getEstudiantes();
  },
  computed: {
    ...mapState("Estudiantes", ["estudiantes", "table_headers"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Estudiante" : "Editar Estudiante";
    }
  },
  methods: {
    getTiposDocumentos() {
      axios.get("admin/tipos-documento").then(res => {
        this.tipos_documentos = res.data.data;
      });
    },
    getDepartamentos() {
      axios.get("admin/departamentos").then(res => {
        this.departamentos = res.data.data;
      });
    },
    getCiudades() {
      axios.get("admin/ciudades").then(res => {
        this.ciudades = res.data.data;
      });
    },
    getPaises() {
      axios.get("admin/paises").then(res => {
        this.paises = res.data.data;
      });
    },
    getEstudiantes() {
      this.loading = true;
      this.$store
        .dispatch("Estudiantes/getAllEstudiantes")
        .then(res => {
          this.loading = false;
          console.log(res);
        })
        .catch(err => {
          this.$toastr.e(err.message);
        });
    },

    async editItem(item) {
      this.editedIndex = this.estudiantes.indexOf(item);
      const estudiante = await this.$store.dispatch(
        "Estudiantes/getEstudiante",
        item.id
      );
      this.editedItem = Object.assign({}, estudiante.data[0]);
      this.editedItem.idTipo_Documento = estudiante.data[0].tipoDocumento.id;
      this.editedItem.idDepartamento = estudiante.data[0].departamento.id;
      this.editedItem.idCiudad = estudiante.data[0].ciudad.id;
      this.editedItem.idPais = estudiante.data[0].pais.id;
      this.editedItem.fecha_nacimiento = estudiante.data[0].fechaNacimiento;
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.estudiantes.indexOf(item);
      this.$store
        .dispatch("Estudiantes/deleteEstudiante", { index: index, id: item.id })
        .then(res => {
          this.$toastr.s(res.message);
        })
        .catch(err => {
          this.$toastr.e(err.message);
        });
    },
    save() {
      if (!this.$refs.form.validate()) {
        console.log("no valido");
        return;
      }
      if (this.editedIndex > -1) {
        this.$store
          .dispatch("Estudiantes/editEstudiante", {
            index: this.editedIndex,
            id: this.editedItem.id,
            data: this.editedItem
          })
          .then(res => {
            this.$toastr.s(res.message);
            this.close();
          })
          .catch(err => {
            this.$toastr.e(err.message);
          });
      } else {
        this.$store
          .dispatch("Estudiantes/addEstudiante", {
            data: this.editedItem
          })
          .then(res => {
            this.$toastr.s(res.message);
            this.close();
          })
          .catch(err => {
            this.$toastr.e(err.message);
          });
      }
    },
    close() {
      this.$refs.form.reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }
  }
};
</script>
