<template>
  <div class="oodletThingy">
    <span>{{ thingy.name}}  {{ thingy.unit }}  {{ thingy.qty }}</span>
    <button @click="remove">X</button>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<style>
</style>

<script>
  export default{
    props: ['thingy'],

    methods: {
      remove() {
        this.$store.commit('quantifiedThingyRemove', this.thingy.id);
      },
      increment() {
        this.$store.commit('quantifiedThingyIncrement', this.thingy.id);
      },
      decrement() {
        this.$store.commit('quantifiedThingyDecrement', this.thingy.id);
      }
    }
  }
</script>
