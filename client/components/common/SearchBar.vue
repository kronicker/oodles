<template>
  <div class="search-bar">
    <input @keyup="updateQuery" v-model="searchString" type="text" :placeholder="'Find '+subject"/>
  </div>
</template>

<script>
  export default{
    props: ['subject'],
    data() {
      return {
        searchString: ''
      }
    },
    methods: {
      updateQuery() {
        this.$emit('searchBarUpdate', this.searchString);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-bar input {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    font-size: 18px;
    color: #54508a;
    border: 0px;
    margin: 10px 0;
  }
</style>
