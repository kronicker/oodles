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
        this.$store.commit('quantifiedThingyRemove', this.quantifiedThingy.id);
      },

      increment() {
        this.$store.commit('quantifiedThingyIncrement', this.quantifiedThingy.id);
      },

      decrement() {
        this.$store.commit('quantifiedThingyDecrement', this.quantifiedThingy.id);
      }
    }
  }
</script>

<style>
</style>
