<template>
  <div id="app">
    <oodlet-view></oodlet-view>
  </div>
</template>

<script>
  import OodletView from './views/OodletView.vue'
  export default {
    components: {
      'oodlet-view': OodletView
    }
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
