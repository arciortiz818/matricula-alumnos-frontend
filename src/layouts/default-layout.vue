<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <!-- <v-list dense> -->
      <v-list>
        <v-list-item link to="/programas">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Programas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/materias">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Materias</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/estudiantes">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Estudiantes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ $store.getters.nombre_usuario }}</v-toolbar-title>
      <v-btn text @click="logout">Cerrar Sesión</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),

  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
