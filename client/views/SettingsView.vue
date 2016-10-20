<template>
  <div id="settingsView">
    <div class="row">
      <div class="col-md-4 col-md-offset-3 well">
        <ul>
          <li><span class="glyphicon glyphicon-user"></span><span><strong>  {{ oodler.firstName }} {{ oodler.lastName }}</strong></span></li>
          <li><span class="glyphicon glyphicon-envelope"></span><span>  {{ oodler.email }}</span></li>
          <li><span class="glyphicon glyphicon-home"></span><span>  Office {{ oodler.office }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      oodler() {
        return this.$store.getters.oodler;
      }
    }
  }
</script>

<style lang="sass" scoped>
  #settingsView .well {
    margin-top: 200px;
    ul {
      list-style: none;
      padding: 0;
      font-size: x-large;

      li { text-align: center; }
    }
  }
</style>
