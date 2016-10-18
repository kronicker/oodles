<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <nav-bar v-if="loggedIn" class="col-md-1"></nav-bar>
      <router-view class="col-md-11"></router-view>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';

  export default {
    computed: {
      loggedIn(){
        return this.$store.getters.oodler.id ? true : false;
      }
    },

    beforeCreate(){
      console.log('called');
      this.$http.get('/session')
      .then(
        response => {
          if (response.ok) {
            this.$store.commit('oodlerSave', response.body);
          }
        },
        response => {
          this.$router.replace({ path: '/login' });
        });
    },

    components: { NavBar }
  }
</script>

<style lang="sass">
  body {
    background: url('./assets/background.png') repeat;
  }
</style>
