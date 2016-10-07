<template>
  <div class="oodletThingy">
    <span>{{ quantifiedThingy.name}}  {{ quantifiedThingy.unit }}  {{ quantifiedThingy.qty }}</span>
    <button @click="remove">X</button>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
  export default{
    props: ['quantifiedThingy'],

    methods: {
      remove() {
        let payload = {
          id: this.quantifiedThingy.id,
          qty: 0
        };

        this.$store.dispatch('quantifiedThingyChange', payload);
      },

      increment() {
        let payload = {
          id: this.quantifiedThingy.id,
          qty: ++this.quantifiedThingy.qty
        };

        this.$store.dispatch('quantifiedThingyChange', payload);
      },

      decrement() {
        let payload = {
          id: this.quantifiedThingy.id,
          qty: --this.quantifiedThingy.qty
        };

        this.$store.dispatch('quantifiedThingyChange', payload);
      }
    }
  }
</script>

<style>
</style>
