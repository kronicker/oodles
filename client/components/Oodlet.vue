<template>
  <div class="oodlet">
    <h1>Oodlet</h1>
    <ol>
        <li v-for="key in oodleb" >
          <oodlet-thingy v-on:oodletThingyRemoved="oodletThingyRemoved" :thingy="key.thingy" :qty="key.qty"></oodlet-thingy>
        </li>
    </ol>
    <button @click="confirmOodlet">Confirm</button>
    <button @click="resetOodlet">Reset</button>
  </div>
</template>
<style>
</style>
<script>
  import OodletThingy from './OodletThingy.vue'
  export default{
    data(){
      return {
      }
    },
    props:['oodleb'],
    methods:{
      confirmOodlet: function () {
        console.log(this.oodleb);
        this.$emit('oodletConfirm')
      },
      resetOodlet: function () {
        this.$emit('oodletReset')
      },
      oodletThingyRemoved: function (id, qty) {
        this.$emit('oodletThingyRemoved', id, qty);
      }
    },
    components:{
      'oodlet-thingy' : OodletThingy
    }
  }
</script>
