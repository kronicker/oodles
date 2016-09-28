<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <oodlet-view></oodlet-view>
  </div>
</template>

<script>
  import OodletView from './views/OodletView.vue'
  export default {
    data () {
      return {
        msg: 'Hello Vue!'
      }
    },
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
