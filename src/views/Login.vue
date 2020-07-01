<template>
  <auth-layout>
    <v-app>
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="3">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-spacer></v-spacer>
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      label="username"
                      v-model="username"
                      prepend-icon="mdi-account"
                      type="text"
                      :rules="[v => !!v || 'Username es requerido.']"
                      required
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      v-model="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      :rules="[v => !!v || 'Password es requerido.']"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </auth-layout>
</template>

<script>
import AuthLayout from "../layouts/auth-layout";
export default {
  components: {
    AuthLayout
  },
  props: {
    source: String
  },
  data() {
    return {
      username: "",
      password: "",
      valid: true
    };
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.replace("home");
    }
  },

  methods: {
    login() {
      if (!this.$refs.form.validate()) {
        console.log("no valido");
        return;
      }
      this.$store
        .dispatch("login", { username: this.username, password: this.password })
        .then(() => {
          this.$router.replace("Home");
        })
        .catch(err => {
          this.$toastr.e(err.error);
        });
    }
  }
};
</script>
