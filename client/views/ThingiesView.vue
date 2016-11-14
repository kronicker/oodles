<template>
  <div id="thingiesView">
    <div>
      <div class="page-header col-md-12">
        <h1 class="text-info">Thingies</h1>
      </div>
    </div>
    <div class="row">
      <search-bar class="col-md-12" subject="thingy" @searchBarUpdate="searchBarUpdate"></search-bar>
    </div>
    <div class="row filtered-thingies">
      <div v-for="thingy in filteredThingies" class="col-md-3">
        <thingy-edit-tile  @thingyUpdate="load" :thingy="thingy"></thingy-edit-tile>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '../components/SearchBar.vue'
  import ThingyEditTile from '../components/ThingyEditTile.vue'
  
  export default{
    data() {
      return {
        searchString: '',
        thingies: []
      }
    },
    
    computed: {
      appInitialized() {
        return this.$store.getters.appInitialized;
      },
      filteredThingies() {
        if(this.searchString.length < 1) {
          return this.thingies;
        }
        
        let searchString = this.searchString.toLowerCase();
        return this.thingies.filter(item => {
          return item.name.toLowerCase().indexOf(searchString) !== -1
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
        this.$http.get('/thingy').then((response) => {
          this.thingies = response.body;
        });
      }
    },
    
    mounted() {
      if(this.appInitialized) {
        this.load();
      }
    },
    
    components: {
      SearchBar,
      ThingyEditTile
    }
  }
</script>

<style lang="sass" scoped>
  #thingiesView {
    .page-header { margin: 0px 0 10px; }
  }
</style>
