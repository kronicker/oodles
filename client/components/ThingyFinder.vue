<template>
  <div class="thingyFinder">
    <h1>Thingy Finder</h1>
    <input type="text" v-model="searchString" v-on:keyup="updateQuery" placeholder="Find your thingy"/>
  </div>
</template>

<style>
</style>

<script>
  export default{
    data(){
      return {
        searchString: ''
      }
    },
    methods: {
      updateQuery: function () {
        this.$emit('thingyFinderUpdate', this.searchString.toLowerCase())
      }
    }
  }
</script>

