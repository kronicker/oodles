<template>
  <div class="oodlet">
    <h1>Oodlet</h1>
    <ol>
      <li v-for="item in oodlet">
        <oodlet-thingy :thingy="item.thingy"
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
    computed: {
      oodlet(){
        return this.$store.state.oodlet;
      }
    },

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
      }
    },

    components: {
      'oodlet-thingy': OodletThingy
    }
  }
</script>
