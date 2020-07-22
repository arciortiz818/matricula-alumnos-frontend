<template>
  <default-layout>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="8">
          <v-toolbar color="primary" dark flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>Ficha del Estudiante</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card elevation="12">
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row align-center>
                    <v-col>
                      <v-select
                        v-model="estudiante.idTipo_Documento"
                        :items="tiposDocumento"
                        :rules="[(v) => !!v || 'Tipo Documento es requerido.']"
                        label="Tipo de Documento"
                        required
                        item-text="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.documento"
                        label="Documento de Identidad"
                        :rules="[(v) => !!v || 'Documento es requerido.']"
                        required
                        @keyup="find($event)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.nombre1"
                        label="Primer Nombre"
                        :rules="[(v) => !!v || 'Primer nombre es requerido.']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.nombre2"
                        label="Segundo Nombre"
                        :rules="[(v) => !!v || 'Segundo nombre es requerido.']"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.apellido1"
                        label="Primer Apellido"
                        :rules="[(v) => !!v || 'Primer apellido es requerido.']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.apellido2"
                        label="Segundo Apellido"
                        :rules="[
                          (v) => !!v || 'Segundo apellido es requerido.',
                        ]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field label="Teléfono Casa" v-model="estudiante.telefono_casa"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field label="Teléfono Oficina" v-model="estudiante.telefono_oficina"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.celular"
                        label="Celular"
                        :rules="[(v) => !!v || 'Celular es requerido.']"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col>
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
                            v-model="estudiante.fecha_nacimiento"
                            label="Fecha de Nacimiento"
                            hint="YYYY/MM/DD"
                            persistent-hint
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="estudiante.fecha_nacimiento"
                          no-title
                          @input="showPicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.email"
                        label="Email"
                        :rules="[(v) => !!v || 'Email es requerido.']"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="estudiante.direccion"
                        label="Dirección"
                        :rules="[(v) => !!v || 'Dirección es requerido.']"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field label="Barrio" v-model="estudiante.barrio"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select
                        v-model="estudiante.idCiudad"
                        :items="ciudades"
                        :rules="[(v) => !!v || 'Ciudad es requerido.']"
                        label="Ciudad"
                        required
                        item-text="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                        v-model="estudiante.idDepartamento"
                        :items="departamentos"
                        :rules="[(v) => !!v || 'Departamento es requerido.']"
                        label="Departamento"
                        required
                        item-text="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        v-model="estudiante.idPais"
                        :items="paises"
                        :rules="[(v) => !!v || 'Pais es requerido.']"
                        label="Pais"
                        required
                        item-text="nombre"
                        item-value="id"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" dark @click="cancel">Cancelar</v-btn>
              <v-btn color="secondary" dark @click="save">Grabar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </default-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {

  data() {
    return {
      valid: false,
      showPicker: false,
    };
  },
  mounted() {
    this.getTiposDocumento();
    this.getCiudades();
    this.getDepartamentos();
    this.getPaises();
  },
  computed: {
    ...mapState('Estudiantes', ['estudiante', 'editing']),
    ...mapState('Paises', ['paises']),
    ...mapState('Departamentos', ['departamentos']),
    ...mapState('Ciudades', ['ciudades']),
    ...mapState('TipoDocumento', ['tiposDocumento']),
  },
  methods: {
    cancel() {
      this.$refs.form.reset();
      this.$router.go(-1);
    },
    save() {
      if (this.editing) {
        this.$store
          .dispatch('Estudiantes/editEstudiante', this.estudiante)
          .then((res) => {
            this.$store.commit('Estudiantes/SET_EDITING', false);
            this.$toastr.s(res.message);
            this.$router.replace('/estudiantes');
          })
          .catch((err) => {
            this.$toastr.e(err.message);
          });
      } else {
        this.$store
          .dispatch('Estudiantes/addEstudiante', this.estudiante)
          .then((res) => {
            this.$toastr.s(res.message);
            this.$router.replace('/estudiantes');
          })
          .catch((err) => {
            this.$toastr.e(err.message);
          });
      }
    },
    find(e) {
      if (e.key != 'Enter') {
        return;
      }
      this.$store
        .dispatch(
          'Estudiantes/getEstudianteByDocumento',
          this.estudiante.documento
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },
    async getCiudades() {
      await this.$store.dispatch('Ciudades/getCiudades');
    },
    async getDepartamentos() {
      await this.$store.dispatch('Departamentos/getDepartamentos');
    },
    async getPaises() {
      await this.$store.dispatch('Paises/getPaises');
    },
    async getTiposDocumento() {
      await this.$store.dispatch('TipoDocumento/getTiposDocumento');
    },
  },
};
</script>
