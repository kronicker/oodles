<template>
  <div class="oodlet">
    <h1>Oodlet</h1>
    <ol>
      <li v-for="key in oodleb">
        <oodlet-thingy v-on:oodletThingyRemoved="oodletThingyRemoved" :thingy="key.thingy"
                       :qty="key.qty"></oodlet-thingy>
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
      return {}
    },
    props: ['oodlet'],
    methods: {
      confirmOodlet: function () {
        if (confirm('Are you sure you want to remove this thingy from your oodlet?'))
          this.$emit('oodletConfirm');
      },
      resetOodlet: function () {
        if (confirm('Are you sure you want to remove this thingy from your oodlet?'))
          this.$emit('oodletReset');
      },
      oodletThingyRemoved: function (id) {
        this.$emit('oodletThingyRemoved', id);
      }
    },
    components: {
      'oodlet-thingy': OodletThingy
    }
  }
</script>
