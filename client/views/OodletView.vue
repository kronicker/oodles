<template>
  <div id="oodletView">
    <div class="row">
      <div class="filtered-thingies col-md-9">
        <ul class="row">
          <thingy-finder class="col-md-12" @thingyFinderUpdate="thingyFinderUpdate"></thingy-finder>
          <li v-for="thingy in filteredThingies">
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
    data(){
      return {
        searchString: '',
        thingies: []
      }
    },

    computed: {
      filteredThingies() {
        if(this.searchString.length < 1){
          return this.thingies;
        }

        let searchString = this.searchString.toLowerCase();
        return this.thingies.filter(item => {
          return item.name.toLowerCase().indexOf(searchString) !== -1
        });
      }
    },

    methods: {
      thingyFinderUpdate(query) {
        this.searchString = query;
      }
    },

    created(){
      this.$http.get('/thingy').then((response) => {
        this.thingies = response.body;
      });
    },

    components: {
      Oodlet,
      ThingyFinder,
      ThingyTile,
    }
  }
</script>

<style lang="sass" scoped>
  .filtered-thingies ul{ list-style: none; }
</style>
