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
              v-if="cargando"
              :size="70"
              :width="7"
              color="secondary"
              indeterminate
              class="mt-5 mb-5"
            ></v-progress-circular>
            <div v-else>Sin registros</div>
          </template>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">Nuevo Programa</v-btn>
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
                              v-model="programa.plan"
                              label="Plan"
                              :rules="[(v) => !!v || 'Plan es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="programa.nombre"
                              label="Nombre"
                              :rules="[(v) => !!v || 'Nombre es requerido.']"
                              required
                            ></v-text-field>
                            <v-text-field v-model="programa.valor_nivel" label="Valor Semestre"></v-text-field>
                            <v-text-field v-model="programa.numero_niveles" label="Semestres"></v-text-field>
                          </v-form>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
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
import { mapState } from 'vuex';

export default {

  data() {
    return {
      valid: false,
      dialog: false,
      editing: false,
      programas: [],
      programa: {},
      table_headers: [
        // {
        //   text: '#',
        //   align: 'center',
        //   sortable: false,
        //   value: 'index',
        // },
        {
          text: 'Código',
          align: 'left',
          sortable: false,
          value: 'codigo',
        },
        { text: 'Plan', align: 'left', sortable: false, value: 'plan' },
        { text: 'Nombre', align: 'left', sortable: false, value: 'nombre' },
        {
          text: 'Semestres',
          align: 'center',
          sortable: false,
          value: 'numero_niveles',
        },
        {
          text: 'Valor Semestre',
          align: 'right',
          sortable: false,
          value: 'valor_nivel',
        },
        {
          text: 'Acciones',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      cargando: false
    };
  },
  mounted() {
    this.getProgramas();
  },
  computed: {
    formTitle() {
      return this.editing === 'true' ? 'Editar Programa' : 'Nuevo Programa';
    },
  },
  methods: {
    getProgramas() {
      this.cargando = true;
      this.$store
        .dispatch('Programas/getProgramas')
        .then((res) => {
          this.programas = res.data;
          this.cargando = false;
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
          this.programa = res.data;
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
