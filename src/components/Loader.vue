<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-dialog v-model="isLoading" persistent width="300">
          <v-card color="primary" dark class="pt-5">
            <v-card-text>Loading...</v-card-text>
            <v-card-text>
              <v-progress-linear indeterminate color="white"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
     watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.$store.commit('SET_LOADING',false)), 4000)
      },
    },
    computed: {
        isLoading(){
            return this.$store.state.loading;
        }
    },
    mounted(){
        
    }
}
</script>