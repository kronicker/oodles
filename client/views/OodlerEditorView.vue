<template>
  <div id="oodlerEditorView">
    <div class="page-header">
      <h1 class="text-info">Oodlers editor</h1>
    </div>
    <div class="row">
      <div class="filtered-oodlers col-md-12">
        <div class="row">
          <thingy-finder class="col-md-12" @thingyFinderUpdate="thingyFinderUpdate"></thingy-finder>
        </div>
        <ul class="row">
          <li v-for="oodler in filteredOodlers" class="col-md-2">
            <oodler-edit-tile @oodlerUpdate="load" :oodler="oodler"></oodler-edit-tile>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import ThingyFinder from '../components/ThingyFinder.vue'
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
          return (oodler.firstName+oodler.lastName+oodler.office).toLowerCase().indexOf(searchString) !== -1
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
        this.$http.get('/oodler').then((response) => {
          this.oodlers = response.body;
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
      OodlerEditTile
    }
  }
</script>

<style lang="sass" scoped>
  #oodlerEditorView {
    .page-header { margin: 0px 0 10px; }
    
      .filtered-oodlers ul {
        padding: 0;
        list-style: none;
      }
  }
</style>
