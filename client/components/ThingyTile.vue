<template>
  <div id="thingyTile">
    <img :src=thingy.pictureUrl>
    <span>{{ thingy.name | capitalize}}</span>
    <input v-model.number="qty" type="number">
    <button @click="addThingy">Add</button>
  </div>
</template>

<style>

</style>

<script>
  export default{
//    props:{thingy},
    data(){
      return {
        qty : 1,
        thingy : {
          id: "9940988f-deaa-401d-a221-c4342282d754",
          name: "Fish",
          pictureUrl: "http://leda.org",
          price: 575,
          unit : "kg"
        }
      }
    }
  }
</script>
