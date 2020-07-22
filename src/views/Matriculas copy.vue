<template>
  <default-layout>
    <v-container class="pt-0">
      <v-row>
        <v-col md="6">
          <v-container>
            <v-row>
              <v-col>
                <v-card elevation="12">
                  <v-toolbar color="primary" dark flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Matricular Estudiante</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            label="Documento Estudiante"
                            v-model="estudiante.documento"
                            @keypress="buscar($event)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Nombre del Estudiante"
                            v-model="nombre_estudiante"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-select
                            v-model="programaMatricular.id"
                            :items="programas"
                            label="Programa"
                            item-text="nombre"
                            item-value="id"
                            @change="cargarGridMaterias($event)"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-tabs
                            background-color="primary"
                            dark
                            next-icon="mdi-arrow-right-bold-box-outline"
                            prev-icon="mdi-arrow-left-bold-box-outline"
                          >
                            <v-tab
                              @click="filtrarMateriasxSemestre(item)"
                              v-for="item in niveles"
                              :key="item"
                              >Semestre {{ item }}</v-tab
                            >
                          </v-tabs>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-center"></th>
                                  <th class="text-left">Nombre</th>
                                  <th class="text-center">Creditos</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="item in materiasSemestre"
                                  :key="item.id"
                                >
                                  <td class="text-left">
                                    <v-checkbox
                                      v-model="item.matricular"
                                      @change="matricularMateria(item)"
                                    ></v-checkbox>
                                  </td>
                                  <td>{{ item.nombre }}</td>
                                  <td class="text-center">
                                    {{ item.creditos }}
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col md="6">
          <v-container>
            <v-row>
              <v-col>
                <v-card elevation="12">
                  <v-toolbar color="primary" dark flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Resumen de Matricula</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-center">Semestre</th>
                            <th class="text-left">Materia</th>
                            <th class="text-center">Creditos</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in matriculados" :key="item.id">
                            <td class="text-center">{{ item.nivel }}</td>
                            <td>{{ item.nombre }}</td>
                            <td class="text-center">{{ item.creditos }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      color
                      @click="!editando ? grabar() : modificar()"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/default-layout';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    DefaultLayout,
  },
  data() {
    return {
      materias: [],
      programas: [],
      niveles: 0,
      nivelActivo: 0,
      matriculados: [],
      materiasSemestre: [],
      estudiante: {},
      programaMatricular: 0,
      editando: false,
      matricula: [],
    };
  },
  mounted() {
    this.getProgramas();
  },
  computed: {
    nombre_estudiante() {
      if (this.estudiante.nombre1 == null) {
        return '';
      }

      return (
        this.estudiante.nombre1 +
        ' ' +
        this.estudiante.nombre2 +
        ' ' +
        this.estudiante.apellido1 +
        ' ' +
        this.estudiante.apellido2
      );
    },
  },
  methods: {
    ...mapActions('Matriculas', ['getNivelesPrograma']),
    ...mapActions('Estudiantes', ['getEstudiante']),
    ...mapActions('Materias', ['getMateriasxPrograma']),
    ...mapActions('Programas', ['getPrograma']),
    matricularMateria(item) {
      const index = this.matriculados.indexOf(item);
      if (index == -1) {
        this.matriculados.push(item);
      } else {
        this.matriculados.splice(index, 1);
      }
    },

    buscar(e) {
      if (e.key == 'Enter') {
        //Buscar Matricula
        this.estudiante.nombre = '';
        this.matriculados = [];
        this.$store
          .dispatch(
            'Matriculas/getMatriculaByDocEstudiante',
            this.estudiante.documento
          )
          .then((res) => {
            console.log('estudi', res.data);
            if (res.data.length == 0) {
              //No tiene matricula, entonces buscamos el estudiante
              this.$store
                .dispatch(
                  'Estudiantes/getEstudianteByDocumento',
                  this.estudiante.documento
                )
                .then((est) => {
                  this.estudiante.nombre =
                    est.data.nombre1 +
                    ' ' +
                    est.data.nombre2 +
                    ' ' +
                    est.data.apellido1 +
                    ' ' +
                    est.data.apellido2;
                  this.estudiante.id = est.data.id;
                })
                .catch((err) => {
                  this.$toastr.e(err.message);
                });
            } else {
              this.editando = true;
              console.log(res.data);
              this.matricula = res.data.matricula;
              this.estudiante = res.data.estudiante;
              this.programaMatricular = res.data.programa;
              // this.estudiante.nombre =
              //   res.data.estudiante.nombre1 +
              //   ' ' +
              //   res.data.estudiante.nombre2 +
              //   ' ' +
              //   res.data.estudiante.apellido1 +
              //   ' ' +
              //   res.data.estudiante.apellido2;
              // this.estudiante.id = res.data.estudiante.id;
              this.detalleMatricula = res.data.detalle;
              // this.idMatricula = res.data.matricula.id;

              this.cargarGridMaterias(this.programaMatricular.id);
            }
          });
      }
    },
    getProgramas() {
      this.$store.dispatch('Programas/getProgramas').then((res) => {
        this.programas = res.data;
      });
    },
    async cargarGridMaterias(idPrograma) {
      const rtaMat = await this.getMateriasxPrograma(idPrograma);
      console.log('rtamat', rtaMat);
      this.materias = rtaMat.data;
      const rtaProg = await this.getNivelesPrograma(idPrograma);
      this.niveles = rtaProg.data.numero_niveles;
      this.filtrarMateriasxSemestre('1');
    },
    filtrarMateriasxSemestre(nivel) {
      this.nivelActivo = nivel;
      if (this.detalleMatricula.length > 0) {
        this.detalleMatricula.forEach((el) => {
          this.materias.map((dato) => {
            if (dato.id == el.idMateria) {
              dato.matricular = true;
            }
            return dato;
          });
        });
        this.materias.forEach((element) => {
          if (element.matricular) {
            this.matriculados.push(element);
          }
        });
      }
      this.materiasSemestre = this.materias.filter(
        (item) => item.nivel == nivel
      );
      this.detalleMatricula = [];
    },
    grabar() {
      const tmpMateriasMatricular = [];
      this.matriculados.forEach((element) => {
        tmpMateriasMatricular.push(element.id);
      });
      const matricula = {
        idEstudiante: this.estudiante.id,
        idPrograma: this.programaMatricular.id,
        detalle: tmpMateriasMatricular,
      };
      this.$store
        .dispatch('Matriculas/matricularEstudiante', matricula)
        .then((res) => {
          this.$toastr.s(res.message);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },
    modificar() {
      const tmpMateriasMatricular = [];
      this.matriculados.forEach((element) => {
        tmpMateriasMatricular.push(element.id);
      });
      const matricula = {
        idMatricula: this.matricula.id,
        detalle: tmpMateriasMatricular,
      };
      this.$store
        .dispatch('Matriculas/modificarMatricula', matricula)
        .then((res) => {
          this.$toastr.s(res.message);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },
  },
};
</script>
