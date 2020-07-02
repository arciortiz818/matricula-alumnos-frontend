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
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Nombre del Estudiante"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-select
                            :items="[]"
                            label="Programa"
                            item-text="nombre"
                            item-value="id"
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
                              @click="filtrarSemestre(item)"
                              v-for="item in niveles"
                              :key="item"
                              >Semestre {{ item }}</v-tab
                            >
                          </v-tabs>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-data-table
                            :headers="table_headers"
                            :items="materiasSemestre"
                            item-key="id"
                            class="elevation-1"
                          >
                            <template v-slot:item.matricular="{ item }">
                              <v-simple-checkbox
                                v-model="item.matricular"
                                @click="addMateria(item)"
                              ></v-simple-checkbox> </template
                          ></v-data-table>
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
                    <v-btn text color>Guardar</v-btn>
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
      valid: false,
      colorBtn: 'primary',
      nivelActivo: 0,
      matriculados: [],
      materiasSemestre: [],
    };
  },
  mounted() {
    this.getMaterias('25');
    console.log('bien');
    this.getNivelesPrograma('25');
  },
  computed: {
    ...mapState('Matriculas', ['materias', 'niveles', 'table_headers']),
  },
  methods: {
    ...mapActions('Matriculas', ['getMaterias', 'getNivelesPrograma']),
    addMateria(item) {
      const index = this.matriculados.indexOf(item);
      if (index == -1) {
        this.matriculados.push(item);
      } else {
        this.matriculados.splice(index);
      }
    },
    filtrarSemestre(semestre) {
      this.nivelActivo = semestre;
      this.materiasSemestre = this.materias.filter(
        (item) => item.nivel == semestre
      );
    },
  },
};
</script>
