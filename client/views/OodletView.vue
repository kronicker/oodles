<template>
  <div id="oodletView">
    <h1>Oodles</h1>

    <div class="logo">
      <img src="../assets/ee-labs.png">
    </div>

    <thingy-finder @thingyFinderUpdate="thingyFinderUpdate"></thingy-finder>

    <div class="filtered-thingies">
      <h1>Thingies</h1>
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

<style lang="sass" scoped>
  #oodletView {
    width: 1200px;
    margin: 0 auto;

    .logo {
      position: absolute;
      top: 10px;
      left: 30px;

      img { width: 250px; }
    }

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
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 575,
            unit: "kg"
          },

          {
            id: "4a69eead-d9fa-452a-ba7f-0b97f50d60ea",
            name: "Keyboard",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 451,
            unit: "kom"
          },

          {
            id: "cc79927f-af69-4931-8fbd-48538781f1a9",
            name: "Bacon",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 634,
            unit: "kom"
          },

          {
            id: "940114d0-740c-484e-830d-0b5dcf93428f",
            name: "Tuna",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 565,
            unit: "kg"
          },

          {
            id: "4e28a37b-8828-4b8a-acab-4420cf4a14ec",
            name: "Chips",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 198,
            unit: "kom"
          },

          {
            id: "89c2703a-b988-4ab5-ac09-4b97002c1165",
            name: "Hat",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 564,
            unit: "kg"
          },

          {
            id: "fd32cfd5-5675-4674-8672-80dad5ddeeff",
            name: "Sausages",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 668,
            unit: "kg"
          },

          {
            id: "e83adda7-7273-4909-8161-398df25bceb4",
            name: "Pants",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 491,
            unit: "kg"
          },

          {
            id: "90d3eadd-c8a3-4618-b656-e80cb43574f5",
            name: "Hat",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 990,
            unit: "kom"
          },
          {
            id: "ebb99da6-6936-4084-bc60-1047eb44a09e",
            name: "Bike",
            pictureUrl: "https://unsplash.ita/40/40?random",
            price: 488,
            unit: "kg"
          }
        ]
      }
    },

    computed: {
      filteredThingies: function () {
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
      thingyTileAdd: function (thingy, qty) {
        if (this.oodlet[thingy.id]) {
          this.$set(this.oodlet[thingy.id], qty, this.oodlet[thingy.id].qty += qty);
        }
        else {
          this.$set(this.oodlet, thingy.id, {thingy: thingy, qty: qty});
        }
      },
      oodletThingyRemoved: function (id) {
        this.$delete(this.oodlet, id);
      },
      oodletConfirmed: function () {
      },
      oodletReset: function () {
      },
      thingyFinderUpdate: function (query) {
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
