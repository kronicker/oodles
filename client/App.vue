<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/ee-labs.png">
    </div>
    <nav-bar></nav-bar>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';

  export default {
    components: { NavBar }
  }
</script>

<style lang="sass">
  body {
    background-color: #35405b;
    font-family: Helvetica, sans-serif;

    .logo {
    position: absolute;
    top: 10px;
    left: 30px;

    img { width: 250px; }
    }

    h1 {
      color: #f5f5f5;
      text-align: center
    }

    .slide-fade-enter-active {
    transition: all .1s ease;
    }
    .slide-fade-leave-active {
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
      opacity: 0;
    }
  }
</style>
