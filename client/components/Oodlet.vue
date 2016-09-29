<template>
  <div class="oodlet">
    <h1>Oodlet</h1>
    <ol>
      <li v-for="item in oodlet">
        <oodlet-thingy @oodletThingyRemoved="oodletThingyRemoved"
                       :thingy="item.thingy"
                       :qty="item.qty">
        </oodlet-thingy>
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
    props: ['oodlet'],

    methods: {
      confirmOodlet: function () {
        if (confirm('Are you sure you want to confirm this oodlet?')) {
          this.$emit('oodletConfirm');
        }
      },
      resetOodlet: function () {
        if (confirm('Are you sure you want to reset this oodlet?')) {
          this.$emit('oodletReset');
        }
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
