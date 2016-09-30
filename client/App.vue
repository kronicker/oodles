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

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
</style>
