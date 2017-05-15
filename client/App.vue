<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav-bar v-if="loggedIn" class="col-md-1"></nav-bar>
        <router-view class="col-md-11 col-md-offset-1"></router-view>
      </div>
    </div>
    <div class="logo">
      <img src="assets/ee-labs-logo.png" alt="EE Labs">
    </div>
  </div>
</template>

<script>
  import NavBar from './components/common/NavBar.vue';

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
            let oodler = response.body;
            this.$store.dispatch('initStore', oodler);
            
            if (oodler.scope === 'admin') {
              if(!['/admin', '/admin/history', '/admin/thingies', '/admin/oodlers', '/admin/suggestions', '/settings'].includes(this.$route.path)) {
                this.$router.replace({ path: '/admin' });
              }
            }
            else {
              if(!['/', '/history', '/settings'].includes(this.$route.path)) {
                this.$router.replace({ path: '/' });
              }
            }
          }
        },
        response => {
          this.$router.replace({ path: '/login' });
        });
    },

    components: { NavBar }
  }
</script>

<style lang="scss">
  body {
    .logo {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: -1;
    }

    background: url('assets/background.png') repeat;
  }
</style>
