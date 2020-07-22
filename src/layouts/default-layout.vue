<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped color="primary" dark>
      <!-- <v-list dense> -->
      <!-- <v-list>
        <v-list-item link to="/programas">
          <v-list-item-action>
            <v-icon>mdi-layers</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Programas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/materias">
          <v-list-item-action>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Materias</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/estudiantes">
          <v-list-item-action>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Estudiantes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/matriculas">
          <v-list-item-action>
            <v-icon>mdi-account-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Matriculas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>-->
      <v-list>
        <v-list-group
          v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
          color="info"
        >
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            :to="subItem.link"
            class="pl-9"
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="close"
          >
            <!-- <v-list-item-action class="pr-0">
              <v-icon>{{subItem.icon}}</v-icon>
            </v-list-item-action>-->
            <v-list-item-content class="pl-5">
              <v-list-item-title>{{subItem.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ $store.getters.nombre_usuario }}</v-toolbar-title>
      <v-btn color="secondary" dark @click="logout" class="ml-5">Cerrar Sesión</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="11">
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
    source: String,
  },
  data(){
    return {
    drawer: null,
    items: [
          {
            icon: 'mdi-account-multiple',
            title: 'Estudiantes',
            active: false,
            items: [
              { title: 'Listado de Estudiantes' , link: '/estudiantes' ,icon: 'mdi-account-multiple'},
              { title: 'Ficha del Estudiante' , link: '/ficha-estudiante' ,icon: 'mdi-account-multiple'},
            ],
          },
         {
            icon: 'mdi-book-open-page-variant',
            title: 'Materias',
            active: false,
            items: [
              { title: 'Maestro de Materias' , link: '/materias' ,icon: 'mdi-book-open-page-variant'},
            ],
          },
          {
            icon: 'mdi-layers',
            title: 'Programas',
            active: false,
            items: [
              { title: 'Maestro de Programas' , link: '/programas' ,icon: 'mdi-layers'},
            ],
          },
          {
            icon: 'mdi-account-check',
            title: 'Matriculas',
            active: false,
            items: [
              { title: 'Matricular Estudiante' , link: '/matriculas' ,icon: 'mdi-account-multiple'},
            ],
          },
          {
            icon: 'mdi-account-check',
            title: 'Configuración',
            active: false,
            items: [
              { title: 'Periodos' , link: '' ,icon: 'mdi-account-multiple'},
              { title: 'Datos Empresa' , link: '' ,icon: 'mdi-account-multiple'},
              { title: 'Ciudades' , link: '' ,icon: 'mdi-account-multiple'},
              { title: 'Departamentos' , link: '' ,icon: 'mdi-account-multiple'},
              { title: 'Paises' , link: '' ,icon: 'mdi-account-multiple'},
            ],
          },
        ],
    }
  },

  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.replace('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close () {
      this.items.forEach(item => {
        if (item.active) {
          _.delay(function () {
            item.active = false
          }, 300)
          return false
        }
      })
    }
  },
};
</script>
