<template>
  <div id="navBar">
    <ul class="nav nav-tabs nav-stacked">
      <li>
        <router-link v-show="user" to="/" :exact="user" data-toggle="tooltip" data-placement="right" title="Home">
          <span class="glyphicon glyphicon-shopping-cart"></span>
        </router-link>
      </li>
      <li>
        <router-link v-show="user" to="/history" data-toggle="tooltip" data-placement="right" title="History">
          <span class="glyphicon glyphicon-time"></span>
        </router-link>
      </li>
      <li>
        <router-link v-show="admin" to="/admin" :exact="admin" data-toggle="tooltip" data-placement="right" title="Home">
          <span class="glyphicon glyphicon-shopping-cart"></span>
        </router-link>
      </li>
      <li>
        <router-link v-show="admin" to="/admin/history" data-toggle="tooltip" data-placement="right" title="History">
          <span class="glyphicon glyphicon-time"></span>
        </router-link>
      </li>
      <li>
        <router-link v-show="admin" to="/admin/suggestions" data-toggle="tooltip" data-placement="right" title="Suggestions">
          <span class="glyphicon glyphicon-question-sign"></span>
        </router-link>
      </li>
      <li>
        <router-link v-show="admin" to="/admin/thingies" data-toggle="tooltip" data-placement="right" title="Items">
          <span class="glyphicon glyphicon-glass"></span>
        </router-link>
      </li>
      <li>
        <router-link v-show="admin" to="/admin/oodlers" data-toggle="tooltip" data-placement="right" title="Users">
          <span class="glyphicon glyphicon-user"></span>
        </router-link>
      </li>
      <li>
        <router-link to="/settings" data-toggle="tooltip" data-placement="right" title="Settings">
          <span class="glyphicon glyphicon-cog"></span>
        </router-link>
      </li>
      <li>
        <a @click="logout" data-toggle="tooltip" data-placement="right" title="Home">
          <span class="glyphicon glyphicon-off"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      admin() {
        return this.$store.getters.oodler.scope === 'admin'
      },
      user() {
        return this.$store.getters.oodler.scope === 'user'
      }
    },
    
    methods: {
      logout() {
        this.$http.delete('/session/destroy')
          .then(
            response => {
              this.$store.dispatch('clearStore');
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
    top: 280px;
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
