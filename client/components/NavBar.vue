<template>
  <div id="navBar">
    <ul class="nav nav-tabs nav-stacked">
      <li><router-link to="/" exact><span class="glyphicon glyphicon-shopping-cart"></span></router-link></li>
      <li><router-link to="/history"><span class="glyphicon glyphicon-time"></span></router-link></li>
      <li><router-link to="/settings"><span class="glyphicon glyphicon-cog"></span></router-link></li>
      <li><a @click="logout"><span class="glyphicon glyphicon-off"></span></a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
      logout(){
        this.$http.delete('/session/destroy')
          .then(
            response => {
              this.$store.commit('oodlerSave', {});
              this.$router.replace({ path: '/login' });
            },
            response => {
              //TODO: Add flash message
            });
      }
    }

  }
</script>

<style lang="sass">
  #navBar {
    position: absolute;
    top: 300px;
    width: 100px;

    ul li a {
      text-align: center;
      cursor: pointer;

      span { font-size: xx-large; }
    }

    .router-link-active {
      background-color: #5bc0de;
      color: #2b3e50;
    }
  }

</style>
