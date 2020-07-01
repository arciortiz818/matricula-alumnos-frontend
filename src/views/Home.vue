<template>
  <default-layout>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-spacer></v-spacer>
        <v-toolbar-title>Inicio form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Inicio</v-btn>
      </v-card-actions>
    </v-card>
  </default-layout>
</template>

<script>
import DefaultLayout from "../layouts/default-layout";
export default {
  components: {
    DefaultLayout
  }
};
</script>
