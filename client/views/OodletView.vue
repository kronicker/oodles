<template>
  <div id="oodletView">
    <thingy-finder @thingyFinderUpdate="thingyFinderUpdate"></thingy-finder>

    <div class="filtered-thingies">
      <h1>Thingies</h1>
      <ul>
        <li v-for="thingy in filteredThingies">
          <thingy-tile :thingy="thingy"></thingy-tile>
        </li>
      </ul>
    </div>
    <oodlet></oodlet>
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
  #oodletView {
    width: 1200px;
    margin: 0 auto;

    .filtered-thingies {
      width: 795px;
      min-height: 500px;
      display: inline-block;
      background-color: bisque;
      vertical-align: top;

      h1 { color: #545454; }

      ul { list-style: none; }
    }
  }
</style>
