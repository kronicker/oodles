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

  const routes = {
    public: ['/password/reset', '/password/new'],
    admin: ['/admin', '/admin/history', '/admin/thingies', '/admin/oodlers', '/admin/suggestions', '/settings'],
    user: ['/', '/history', '/settings']
  };

  export default {
    computed: {
      loggedIn() {
        return !!this.$store.getters.oodler.id;
      }
    },
    beforeCreate() {
      if (routes.public.includes(this.$route.path)) {
        return;
      }

      this.$http.get('/session')
        .then(response => {
          if (!response.ok) {
            return;
          }
          const oodler = response.body;
          this.$store.dispatch('initStore', oodler);

          if (oodler.scope === 'admin' && !routes.admin.includes(this.$route.path)) {
            this.$router.replace({ path: '/admin' });
            return;
          }

          if (oodler.scope === 'user' && !routes.user.includes(this.$route.path)) {
            this.$router.replace({ path: '/' });
          }
        }, () => {
          this.$router.replace({ path: '/login' });
        });
    },
    components: { NavBar }
  };
</script>

<style lang="scss">
  body {
    background: url('assets/background.png') repeat;

    .logo {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
  }
</style>
