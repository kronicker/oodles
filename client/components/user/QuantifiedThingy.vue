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
  export default {
    props: ['quantifiedThingy'],
    methods: {
      increment() {
        this.$store.dispatch('quantifiedThingyChange', {
          id: this.quantifiedThingy.id,
          qty: ++this.quantifiedThingy.qty
        });
      },
      decrement() {
        this.$store.dispatch('quantifiedThingyChange', {
          id: this.quantifiedThingy.id,
          qty: --this.quantifiedThingy.qty
        });
      },
      remove() {
        this.$store.dispatch('quantifiedThingyChange', {
          id: this.quantifiedThingy.id,
          qty: 0
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .quantifiedThingy .right { text-align: right; }
</style>
