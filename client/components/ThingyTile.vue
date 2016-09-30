<template>
  <div class="thingyTile">
    <img :src=thingy.pictureUrl>
    <span>{{ thingy.name }}</span>
    <input v-model.number="qty" type="number">
    <button @click="addThingy">Add</button>
  </div>
</template>

<style lang="sass" scoped>
  .thingyTile{
    margin: 5px 0;

    img { vertical-align: middle; }

    input[type="number"]{ width: 30px; }
  }
</style>

<script>
  export default{
    data(){
      return {
        qty: 1
      }
    },

    props: ['thingy'],

    methods: {
      addThingy: function () {
        this.$emit('thingyTileAdd', this.thingy, this.qty);
      }
    }
  }
</script>
