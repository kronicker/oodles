<template>
  <div class="thingy-tile col-md-2">
    <div class="thumbnail">
      <img :src="thingy.pictureUrl">
      <div class="caption">
        <h3>{{ thingy.name }}</h3>
        <div class="input-group input-group-sm">
          <span class="input-group-addon">{{ thingy.unit }}</span>
          <input v-model.number="qty" type="number" class="form-control">
          <div class="input-group-btn">
            <button class="btn btn-success" @click="addThingy">Order</button>
          </div>
        </div>
      </div>
    </div>
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
        this.$store.dispatch('thingyTileAdd', object.merge({}, this.thingy, { qty : this.qty }));
      }
    }
  }
</script>

<style lang="sass" scoped>
  .thingy-tile {
    .thumbnail {
      .caption {
        h3 {
          margin-top: 0;
          text-align: center;
        }
        .input-group-addon { background-color: #2b3e50; }
      }
    }
  }

</style>
