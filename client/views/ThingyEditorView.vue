<template>
  <div id="oodletView">
    <div class="page-header">
      <h1 class="text-info">Thingy editor</h1>
    </div>
    <div class="row">
      <div class="filtered-thingies col-md-12">
        <div class="row">
          <thingy-finder class="col-md-12" @thingyFinderUpdate="thingyFinderUpdate"></thingy-finder>
        </div>
        <ul class="row">
          <li v-for="thingy in filteredThingies" class="col-md-2">
            <thingy-edit-tile @thingyUpdate="load" :thingy="thingy"></thingy-edit-tile>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import ThingyFinder from '../components/ThingyFinder.vue'
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
      thingyFinderUpdate(query) {
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
      ThingyFinder,
      ThingyEditTile
    }
  }
</script>

<style lang="sass" scoped>
  #oodletView {
    .page-header { margin: 0px 0 10px; }
    
    .filtered-thingies ul {
      padding: 0;
      list-style: none;
    }
  }
</style>
