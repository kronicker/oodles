<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand"></router-link>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav-bar v-if="loggedIn" class="col-md-1"></nav-bar>
        <router-view class="col-md-11 col-md-offset-1"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';

  export default {
    computed: {
      loggedIn() {
        return this.$store.getters.oodler.id ? true : false;
      }
    },

    beforeCreate() {
      if(['/password/reset', '/password/new'].indexOf(this.$route.path) > -1) {
        return;
      }

      this.$http.get('/session')
      .then(
        response => {
          if (response.ok) {
            this.$store.dispatch('initStore', response.body);
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
    .navbar {
      margin-bottom: 0;

      .navbar-brand {
        background: url('./assets/ee-labs_bar-logo.png') center / contain no-repeat;
        width: 140px;
      }
    }
    background: url('./assets/background.png') repeat;
  }
</style>
