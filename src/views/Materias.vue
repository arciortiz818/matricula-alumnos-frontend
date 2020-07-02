<template>
  <default-layout>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-spacer></v-spacer>
        <v-toolbar-title>Administrar Materias</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="6"> </v-col>
        </v-row>
        <v-data-table
          :headers="table_headers"
          :items="materias"
          :items-per-page="10"
          class="elevation-1"
        >
          <template slot="no-data">
            <v-progress-circular
              :size="50"
              :width="7"
              color="secondary"
              indeterminate
              v-show="programaFilter && materias == null"
            ></v-progress-circular>
            <v-text>Sin registros</v-text>
          </template>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-container class="mt-5">
                    <v-row>
                      <v-col cols="5">
                        <v-select
                          v-model="programaFilter"
                          :items="programas"
                          label="Seleccione un Programa"
                          @change="getMaterias()"
                        >
                          <template v-slot:selection="data"
                            >{{ data.item.codigo }} -
                            {{ data.item.nombre }}</template
                          >
                          <template v-slot:item="data"
                            >{{ data.item.codigo }} -
                            {{ data.item.nombre }}</template
                          >
                        </v-select>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col>
                        <v-btn
                          color="secondary"
                          dark
                          class="mb-2"
                          v-on="on"
                          @click="newItem()"
                          >Nueva Materia</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
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
                            <v-text-field
                              v-model="materia.codigo"
                              label="Código"
                              :rules="[(v) => !!v || 'Código es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="materia.nombre"
                              label="Nombre"
                              :rules="[(v) => !!v || 'Nombre es requerido.']"
                              required
                            ></v-text-field>
                            <v-select
                              v-model="materia.idPrograma"
                              :items="programas"
                              :rules="[(v) => !!v || 'Programa es requerido.']"
                              label="Programa"
                              required
                              item-text="nombre"
                              item-value="id"
                            >
                              <template v-slot:selection="data"
                                >{{ data.item.codigo }} -
                                {{ data.item.nombre }}</template
                              >
                              <template v-slot:item="data"
                                >{{ data.item.codigo }} -
                                {{ data.item.nombre }}</template
                              ></v-select
                            >
                            <v-text-field
                              v-model="materia.nivel"
                              label="Semestre"
                              :rules="[
                                (v) => !!v || 'El semestre es requerido.',
                              ]"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="materia.creditos"
                              label="Créditos"
                              :rules="[
                                (v) => !!v || 'Los créditos son requeridos.',
                              ]"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="materia.valor_credito"
                              label="Valor Crédito"
                            ></v-text-field>
                            <v-text-field
                              v-model="materia.valor_materia"
                              label="Valor Materia"
                            ></v-text-field>
                            <v-text-field
                              v-model="materia.porc_descuento"
                              label="% Descuento"
                            ></v-text-field>
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
          <template v-slot:item.valor_materia="{ item }">
            <span>{{ item.valor_materia | currency }}</span>
          </template>
          <template v-slot:item.valor_credito="{ item }">
            <span>{{ item.valor_credito | currency }}</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/default-layout';
import { mapState } from 'vuex';

export default {
  components: {
    DefaultLayout,
  },
  data() {
    return {
      valid: false,
      dialog: false,
      editing: false,
      programas: [],
      programaFilter: null,
    };
  },
  mounted() {
    this.$store.commit('Materias/SET_MATERIAS', []);
    this.getProgramas();
  },
  computed: {
    ...mapState('Materias', ['materias', 'materia', 'table_headers']),
    formTitle() {
      return this.editing === 'true' ? 'Editar Materia' : 'Nueva Materia';
    },
  },
  methods: {
    getMaterias() {
      if (!this.programaFilter) {
        return;
      }
      this.$store
        .dispatch('Materias/getMateriasxPrograma', this.programaFilter.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },

    editItem(item) {
      this.$store
        .dispatch('Materias/getMateria', item.id)
        .then((res) => {
          this.editing = true;
          this.dialog = true;
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },

    deleteItem(item) {
      this.$store
        .dispatch('Materias/deleteMateria', item.id)
        .then((res) => {
          this.getMaterias();
          this.$toastr.s(res.message);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },
    save() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.editing) {
        this.$store
          .dispatch('Materias/editMateria', this.materia)
          .then((res) => {
            this.getMaterias();
            this.$toastr.s(res.message);
            this.editing = false;
            this.close();
          })
          .catch((err) => {
            this.$toastr.e(err.message);
          });
      } else {
        this.$store
          .dispatch('Materias/addMateria', this.materia)
          .then((res) => {
            this.getMaterias();
            this.$toastr.s(res.message);
            this.close();
          })
          .catch((err) => {
            this.$toastr.e(err.message);
          });
      }
    },
    close() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    newItem() {
      this.$store.commit('SET_MATERIA', {});
    },
    getProgramas() {
      this.$store.dispatch('Programas/getAllProgramas').then((res) => {
        this.programas = res.data;
      });
    },
  },
};
</script>
