<template>
  <tr class="oodletThingy">
    <td>{{ quantifiedThingy.name}}</td>
    <td>{{ quantifiedThingy.qty }}</td>
    <td>{{ quantifiedThingy.unit }}</td>
    <td>
      <button class="btn btn-xs btn-danger" @click="remove">X</button>
      <button class="btn btn-xs btn-success" @click="increment">+</button>
      <button class="btn btn-xs btn-warning" @click="decrement">-</button>
    </td>
  </tr>
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
