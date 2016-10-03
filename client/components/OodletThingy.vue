<template>
  <div class="oodletThingy">
    <span>{{ thingy.name}}  {{ thingy.unit }}  {{ qty }}</span>
    <button @click="removeOodletThingy">X</button>
    <button @click="incrementOodletThingy">+</button>
    <button @click="decrementOodletThingy">-</button>
  </div>
</template>

<style>
</style>

<script>
  export default{
    props: ['thingy', 'qty'],

    methods: {
      removeOodletThingy() {
        if (confirm('Are you sure you want to remove this thingy from your oodlet?')) {
          this.$store.commit('oodletThingyRemoved', this.thingy.id);
        }
      },
      incrementOodletThingy() {
        this.$store.commit('incrementOodletThingy', this.thingy.id);
      },
      decrementOodletThingy() {
        if(this.qty == 1){
          this.$store.commit('oodletThingyRemoved', this.thingy.id);
        }
        else {
          this.$store.commit('decrementOodletThingy', this.thingy.id);
        }
      }
    }
  }
</script>
