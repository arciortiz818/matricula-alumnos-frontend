<template>
  <default-layout>
    <v-container class="pt-0 mt-0">
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
                            v-model="docEstudiante"
                            @keypress="buscar($event)"
                          ></v-text-field>
                        </v-col>
                        <v-col v-if="nombre_estudiante != ''">
                          <v-btn
                            class="mt-3"
                            color="secondary"
                            dark
                            @click="irFichaEstudiante()"
                          >Ficha del Estudiante</v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field label="Nombre del Estudiante" v-model="nombre_estudiante"></v-text-field>
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
                        <v-spacer></v-spacer>
                        <v-btn color="secondary" dark @click="!editando ? grabar() : modificar()">
                          {{
                          !editando ? 'Grabar Matricula' : 'Grabar Cambios'
                          }}
                        </v-btn>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
                <br />
                <v-card>
                  <v-toolbar color="primary" dark>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Listado de Materias</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-container v-if="materias.length == 0">
                      <v-row>
                        <v-spacer></v-spacer>
                        <div>Seleccione un Programa</div>
                        <v-spacer></v-spacer>
                      </v-row>
                    </v-container>
                    <v-row>
                      <v-expansion-panels accordion color="primary">
                        <v-expansion-panel v-for="item in materias" :key="item.semestre">
                          <v-expansion-panel-header>
                            <template v-slot:default="{ open }">
                              <v-toolbar-title>
                                Semestre
                                {{ item.semestre }}
                              </v-toolbar-title>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content
                            v-for="matNivel in item.materiasNivel"
                            :key="matNivel.id"
                          >
                            <table>
                              <thead>
                                <tr>
                                  <td style="width: 10%;"></td>
                                  <td style="width: 80%;">Materia</td>
                                  <td style="width: 10%;">Créditos</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <v-checkbox
                                      v-model="matNivel.matricular"
                                      @change="matricularMateria(matNivel)"
                                    ></v-checkbox>
                                  </td>
                                  <td>{{ matNivel.nombre }}</td>
                                  <td>{{ matNivel.creditos }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
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
                <v-card elevation="20">
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
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <loader></loader>
  </default-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  data() {
    return {
      materias: [],
      programas: [],
      niveles: 0,
      nivelActivo: 0,
      matriculados: [],
      materiasSemestre: [],
      estudiante: {},
      docEstudiante: '',
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
    ...mapActions('Materias', ['getMateriasxProgramaSemestre']),
    ...mapActions('Programas', ['getPrograma']),
    matricularMateria(item) {
      const index = this.matriculados.indexOf(item);
      if (index == -1) {
        this.matriculados.push(item);
      } else {
        this.matriculados.splice(index, 1);
      }
    },
    nuevo() {
      this.materias = [];
      // this.programas = []
      this.niveles = 0;
      this.nivelActivo = 0;
      this.matriculados = [];
      this.materiasSemestre = [];
      this.estudiante = {};
      // this.docEstudiante = ''
      this.programaMatricular = 0;
      this.editando = false;
      this.matricula = [];
      this.$store.commit('Estudiantes/SET_ESTUDIANTE', {});
    },
    buscar(e) {
      if (e.key == 'Enter') {
        //Buscar Matricula
        this.$store.commit('SET_LOADING',true);
        
        this.nuevo();
        
        this.$store
          .dispatch(
            'Matriculas/getMatriculaByDocEstudiante',
            this.docEstudiante
          )
          .then((res) => {
            if (res.data.length == 0) {
              //No tiene matricula, entonces buscamos el estudiante
              this.editando = false;
              this.$store
                .dispatch(
                  'Estudiantes/getEstudianteByDocumento',
                  this.docEstudiante
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
                  this.estudiante = est.data;
                  
                })
                .catch((err) => {
                  this.loading = false;
                  this.$toastr.e('Estudiante no existe.');
                });
            } else {
              this.editando = true;
              this.matricula = res.data.matricula;
              this.estudiante = res.data.estudiante;
              this.programaMatricular = res.data.programa;
              this.detalleMatricula = res.data.detalle;
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
      const rtaProg = await this.getNivelesPrograma(idPrograma);
      this.niveles = rtaProg.data.numero_niveles;

      this.getMateriasxProgramaSemestre(idPrograma).then(res => {
        let tmpMaterias = res.data;
        if (this.detalleMatricula.length > 0) {
          this.detalleMatricula.forEach((el) => {
            tmpMaterias.forEach((item) => {
              item.materiasNivel.map((dato) => {
                if (dato.id == el.idMateria) {
                  dato.matricular = true;
                }
                return dato;
              });
            });
          });
          tmpMaterias.forEach((element) => {
            element.materiasNivel.forEach((materia) => {
              if (materia.matricular) {
                this.matriculados.push(materia);
              }
            });
          });
        }
        this.materias = tmpMaterias;
        this.$store.commit('SET_LOADING',false);
      }).catch(err => {
        this.$toastr.e(err.message)
      })
      
      
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
      console.log('matricula', matricula);
      this.$store
        .dispatch('Matriculas/modificarMatricula', matricula)
        .then((res) => {
          this.$toastr.s(res.message);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },
    irFichaEstudiante() {
      this.$store.commit('Estudiantes/SET_ESTUDIANTE', this.estudiante);
      this.$router.push('/ficha-estudiante');
    },
  },
};
</script>
