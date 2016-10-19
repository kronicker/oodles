<template>
  <tr class="quantifiedThingy">
    <td>{{ quantifiedThingy.name}}</td>
    <td class="right">{{ quantifiedThingy.qty }}</td>
    <td>{{ quantifiedThingy.unit }}</td>
    <td class="right">
      <button class="btn btn-xs btn-danger" @click="remove"><span class="glyphicon glyphicon-remove"></span></button>
      <button class="btn btn-xs btn-success" @click="increment"><span class="glyphicon glyphicon-plus"></span></button>
      <button class="btn btn-xs btn-warning" @click="decrement"><span class="glyphicon glyphicon-minus"></span></button>
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

<style lang="sass" scoped>
  .quantifiedThingy .right { text-align: right; }
</style>
