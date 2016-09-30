<template>
  <div id="oodletView">
    <h1>Oodlet View</h1>
    <div id="thingiesDisplay">
      <thingy-finder @thingyFinderUpdate="thingyFinderUpdate"></thingy-finder>
      <ul>
        <li v-for="thingy in filteredThingies">
          <thingy-tile @thingyTileAdd="thingyTileAdd" :thingy="thingy"></thingy-tile>
        </li>
      </ul>
    </div>
    <oodlet @oodletThingyRemoved="oodletThingyRemoved"
            @oodletReset="oodletReset"
            @oodletConfirmed="oodletConfirmed"
            :oodlet="oodlet">
    </oodlet>
  </div>
</template>

<style>
  #oodletView{
    background-color: bisque;
  }
  #thingiesDisplay{
    display: inline-block;
  }
</style>

<script>
  import Oodlet from '../components/Oodlet.vue'
  import ThingyFinder from '../components/ThingyFinder.vue'
  import ThingyTile from '../components/ThingyTile.vue'

  export default{
    data(){
      return {
        searchString: "",
        oodlet: {},
        thingies: [
          {
            id: "9940988f-deaa-401d-a221-c4342282d754",
            name: "Fish",
            pictureUrl: "http://leda.org",
            price: 575,
            unit: "kg"
          },

          {
            id: "4a69eead-d9fa-452a-ba7f-0b97f50d60ea",
            name: "Keyboard",
            pictureUrl: "https://travis.name",
            price: 451,
            unit: "kom"
          },

          {
            id: "cc79927f-af69-4931-8fbd-48538781f1a9",
            name: "Bacon",
            pictureUrl: "https://edythe.biz",
            price: 634,
            unit: "kom"
          },

          {
            id: "940114d0-740c-484e-830d-0b5dcf93428f",
            name: "Tuna",
            pictureUrl: "http://winifred.com",
            price: 565,
            unit: "kg"
          },

          {
            id: "4e28a37b-8828-4b8a-acab-4420cf4a14ec",
            name: "Chips",
            pictureUrl: "https://pink.com",
            price: 198,
            unit: "kom"
          },

          {
            id: "89c2703a-b988-4ab5-ac09-4b97002c1165",
            name: "Hat",
            pictureUrl: "https://blaise.com",
            price: 564,
            unit: "kg"
          },

          {
            id: "fd32cfd5-5675-4674-8672-80dad5ddeeff",
            name: "Sausages",
            pictureUrl: "http://christiana.net",
            price: 668,
            unit: "kg"
          },

          {
            id: "e83adda7-7273-4909-8161-398df25bceb4",
            name: "Pants",
            pictureUrl: "https://hollis.net",
            price: 491,
            unit: "kg"
          },

          {
            id: "90d3eadd-c8a3-4618-b656-e80cb43574f5",
            name: "Hat",
            pictureUrl: "http://laurine.name",
            price: 990,
            unit: "kom"
          },
          {
            id: "ebb99da6-6936-4084-bc60-1047eb44a09e",
            name: "Bike",
            pictureUrl: "http://mazie.net",
            price: 488,
            unit: "kg"
          }
        ]
      }
    },

    computed: {
      filteredThingies() {
        if(this.searchString.length < 1){
          return this.thingies;
        }

        var searchString = this.searchString.toLowerCase();
        return this.thingies.filter(item => {
          return item.name.toLowerCase().indexOf(searchString) !== -1
        });
      }
    },

    methods: {
      thingyTileAdd(thingy, qty) {
        if (this.oodlet[thingy.id]) {
          this.$set(this.oodlet[thingy.id], qty, this.oodlet[thingy.id].qty += qty);
        }
        else {
          this.$set(this.oodlet, thingy.id, {thingy: thingy, qty: qty});
        }
      },
      oodletThingyRemoved(id) {
        this.$delete(this.oodlet, id);
      },
      oodletConfirmed() {
      },
      oodletReset() {
      },
      thingyFinderUpdate(query) {
        this.searchString = query;
      }
    },

    components: {
      'oodlet': Oodlet,
      'thingy-finder': ThingyFinder,
      'thingy-tile': ThingyTile,
    }
  }
</script>
