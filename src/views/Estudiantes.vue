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
          class="elevation-1 mt-2 mb-2"
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
              <v-btn color="secondary" dark class="mb-2" @click="newItem()">Nuevo Estudiante</v-btn>
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
import { mapState } from 'vuex';
import axios from 'axios';
export default {

  data() {
    return {
      cargando: false
    };
  },
  mounted() {
    this.getEstudiantes();
  },
  computed: {
    ...mapState('Estudiantes', ['estudiantes', 'editing', 'table_headers']),
  },
  methods: {
    getEstudiantes() {
      this.cargando = true;
      this.$store
        .dispatch('Estudiantes/getAllEstudiantes')
        .then((res) => {
          this.cargando = false;
          console.log(res);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },
    newItem() {
      this.$store.commit('Estudiantes/SET_ESTUDIANTE', {});
      this.$router.push('/ficha-estudiante');
    },
    editItem(item) {
      this.$store.commit('Estudiantes/SET_EDITING', true);
      this.$store
        .dispatch('Estudiantes/getEstudiante', item.id)
        .then((res) => {
          this.$router.push('/ficha-estudiante');
        })
        .catch((error) => {
          console.log('error resposne');
        });
    },

    deleteItem(item) {
      this.$store
        .dispatch('Estudiantes/deleteEstudiante', item.id)
        .then((res) => {
          this.getEstudiantes();
          this.$toastr.s(res.message);
        })
        .catch((err) => {
          this.$toastr.e(err.message);
        });
    },
  },
};
</script>
