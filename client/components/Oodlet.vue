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

<style lang="sass" scoped>
  .oodlet{
    width: 400px;
    min-height: 500px;
    display: inline-block;
    background-color: #d2b8ea;
    vertical-align: top;

    h1 { color: #545454; }
  }
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
