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
  .oodlet{
    background-color: blueviolet;
    display: inline-block;
  }
</style>

<script>
  import OodletThingy from './OodletThingy.vue'

  export default{
    props: ['oodlet'],

    methods: {
      confirmOodlet() {
        if (confirm('Are you sure you want to confirm this oodlet?')) {
          this.$emit('oodletConfirm');
        }
      },
      resetOodlet() {
        if (confirm('Are you sure you want to reset this oodlet?')) {
          this.$emit('oodletReset');
        }
      },
      oodletThingyRemoved(id) {
        this.$emit('oodletThingyRemoved', id);
      }
    },

    components: {
      'oodlet-thingy': OodletThingy
    }
  }
</script>
