<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <nav-bar class="col-md-1"></nav-bar>
      <router-view class="col-md-11"></router-view>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';

  export default {
    components: { NavBar }
  }
</script>

<style lang="sass">
</style>
