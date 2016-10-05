<template>
  <div class="thingyFinder">
    <input @keyup="updateQuery" v-model="searchString" type="text" placeholder="Find your thingy"/>
  </div>
</template>

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

<style lang="sass" scoped>
  input {
    width: 1170px;
    height: 50px;
    padding: 0 15px;
    font-size: 18px;
    color: #54508a;
    border: 0px;
    margin: 10px 0;
  }
</style>
