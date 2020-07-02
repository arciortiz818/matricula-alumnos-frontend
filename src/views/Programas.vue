<template>
  <default-layout>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-spacer></v-spacer>
        <v-toolbar-title>Administrar Programas</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          :headers="table_headers"
          :items="programas"
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
                            <v-text-field
                              v-model="programa.codigo"
                              label="Código"
                              :rules="[(v) => !!v || 'Código es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="programa.nombre"
                              label="Nombre"
                              :rules="[(v) => !!v || 'Nombre es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="programa.valor_nivel"
                              label="Valor Semestre"
                            ></v-text-field>
                            <v-text-field
                              v-model="programa.numero_niveles"
                              label="Semestres"
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
          <template v-slot:item.valor_nivel="{ item }">
            <span>{{ item.valor_nivel | currency }}</span>
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
    };
  },
  mounted() {
    this.getProgramas();
  },
  computed: {
    ...mapState('Programas', ['programas', 'programa', 'table_headers']),
    formTitle() {
      return this.editing === 'true' ? 'Editar Programa' : 'Nuevo Programa';
    },
  },
  methods: {
    getProgramas() {
      this.$store
        .dispatch('Programas/getAllProgramas')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },

    editItem(item) {
      this.editing = true;
      this.$store
        .dispatch('Programas/getPrograma', item.id)
        .then((res) => {
          this.dialog = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteItem(item) {
      this.$store
        .dispatch('Programas/deletePrograma', item.id)
        .then((res) => {
          this.$toastr.s(res.message);
        })
        .catch((err) => {
          console.log('Eliminando Programa', err.message);
          this.$toastr.e(err.message);
        });
    },
    save() {
      if (!this.$refs.form.validate()) {
        console.log('no valido');
        return;
      }
      if (this.editing) {
        this.$store
          .dispatch('Programas/editPrograma', this.programa)
          .then((res) => {
            this.getProgramas();
            this.editing = false;
            this.$toastr.s(res.message);
            this.close();
          })
          .catch((err) => {
            console.log('Editando', err.message);
            this.$toastr.e(err.message);
          });
      } else {
        this.$store
          .dispatch('Programas/addPrograma', this.programa)
          .then((res) => {
            this.getProgramas();
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
  },
};
</script>
