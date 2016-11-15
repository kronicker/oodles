<template>
  <div id="oodlersView">
    <div class="row">
      <div class="page-header col-md-12">
        <h1 class="text-info">Oodlers</h1>
      </div>
    </div>
    <div class="row">
        <search-bar class="col-md-12" subject="oodler by first name, last name or office" @searchBarUpdate="searchBarUpdate"></search-bar>
    </div>
    <div class="row filtered-oodlers">
      <div v-for="oodler in filteredOodlers" class="col-md-3">
        <oodler-edit-tile @oodlerUpdate="load" :oodler="oodler"></oodler-edit-tile>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '../components/SearchBar.vue'
  import OodlerEditTile from '../components/OodlerEditTile.vue'
  
  export default{
    data() {
      return {
        searchString: '',
        oodlers: []
      }
    },
    
    computed: {
      appInitialized() {
        return this.$store.getters.appInitialized;
      },
      filteredOodlers() {
        if(this.searchString.length < 1) {
          return this.oodlers;
        }
        
        let searchString = this.searchString.toLowerCase();
        return this.oodlers.filter(oodler => {
          return (`${oodler.firstName} ${oodler.lastName} ${oodler.office}`).toLowerCase().indexOf(searchString) !== -1
        });
      }
    },
    
    watch: {
      appInitialized: function() { //Cannot be arrow fn cause that way 'this' wouldn't be Vue instance
        this.load()
      }
    },
    
    methods: {
      searchBarUpdate(query) {
        this.searchString = query;
      },
      load() {
        this.$http.get('/oodler').then(response => {
          this.oodlers = response.body;
        });
      }
    },
  
    beforeCreate() {
      if(this.$store.getters.oodler.scope === 'user') {
        this.$router.replace({ path: '/' });
      }
    },
    
    mounted() {
      if(this.appInitialized) {
        this.load();
      }
    },
    
    components: {
      SearchBar,
      OodlerEditTile
    }
  }
</script>

<style lang="sass" scoped>
  #oodlersView {
    .page-header { margin: 0px 0 10px; }
  }
</style>
