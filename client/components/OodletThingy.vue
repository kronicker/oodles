<template>
  <div class="oodletThingy">
    <span>{{ thingy.name}}  {{ thingy.unit }}  {{ qty }}</span>
    <button @click="removeOodletThingy">X</button>
  </div>
</template>

<style>
</style>

<script>
  export default{
    props: ['thingy', 'qty'],

    methods: {
      removeOodletThingy: function () {
        if (confirm('Are you sure you want to remove this thingy from your oodlet?')) {
          this.$emit('oodletThingyRemoved', this.thingy.id);
        }
      }
    }
  }
</script>
