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
    data(){
      return {
      }
    },
    props: ['thingy', 'qty'],
    methods:{
      removeOodletThingy: function () {
        this.$emit('oodletThingyRemoved', this.thingy.id);
      }
    }
  }
</script>
