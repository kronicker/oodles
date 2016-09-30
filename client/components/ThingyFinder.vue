<template>
  <div class="thingyFinder">
    <h1>Thingy Finder</h1>
    <input @keyup="updateQuery" v-model="searchString" type="text" placeholder="Find your thingy"/>
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
      updateQuery() {
        this.$emit('thingyFinderUpdate', this.searchString)
      }
    }
  }
</script>

