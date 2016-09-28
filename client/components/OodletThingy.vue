<template>
  <div>
    <span>{{ thingy.name | capitalize}}  {{ thingy.unit }}  {{ qty }}</span>
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
    props: ['thingy', 'qty']
  }
</script>
