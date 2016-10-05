<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'

  export default {
    components: { NavBar }
  }
</script>

<style lang="sass">
  body {
    background-color: #35405b;
    font-family: Helvetica, sans-serif;

    h1 {
      color: #f5f5f5;
      text-align: center
    }
  }
</style>
