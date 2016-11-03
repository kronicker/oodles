<template>
  <div id="oodletView">
    <div class="row">
      <div class="filtered-thingies col-md-9">
        <div class="row">
          <thingy-finder class="col-md-12" @thingyFinderUpdate="thingyFinderUpdate"></thingy-finder>
        </div>
        <ul class="row">
            <li v-for="thingy in filteredThingies" class="col-md-2">
              <thingy-tile :thingy="thingy"></thingy-tile>
            </li>
          </ul>
      </div>
      <oodlet class="col-md-3"></oodlet>
    </div>
  </div>
</template>

<script>
  import Oodlet from '../components/Oodlet.vue'
  import ThingyFinder from '../components/ThingyFinder.vue'
  import ThingyTile from '../components/ThingyTile.vue'

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

    created() {
      if(this.appInitialized) {
        this.load();
      }
    },

    components: {
      Oodlet,
      ThingyFinder,
      ThingyTile,
    }
  }
</script>

<style lang="sass" scoped>
  .filtered-thingies ul {
    padding: 0;
    list-style: none;
  }
</style>
