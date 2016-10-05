<template>
  <div class="thingyTile">
    <img :src=thingy.pictureUrl>
    <span>{{ thingy.name }}</span>
    <input v-model.number="qty" type="number">
    <button @click="addThingy">Add</button>
  </div>
</template>

<script>
  import object from 'lodash/object';

  export default{
    data(){
      return {
        qty: 1
      }
    },

    props: ['thingy'],

    methods: {
      addThingy() {
        // GOTCHA:
        // The object payload gets saved as a reference,
        // so we have to commit a new object, else we
        // mutate the Vuex store directly
        this.$store.commit('thingyTileAdd', object.merge({}, this.thingy, { qty : this.qty }));
      }
    }
  }
</script>

<style lang="sass" scoped>
  .thingyTile{
    margin: 5px 0;
    &:hover{ background-color: #92FF8B; }
    img { vertical-align: middle; }

    input[type="number"]{ width: 30px; }
  }
</style>
