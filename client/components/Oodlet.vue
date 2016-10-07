<template>
  <div class="oodlet">
    <h1>Oodlet</h1>
    <span class="due-date">Due: </span>{{ dueDate }}
    <ol>
      <li v-for="quantifiedThingy in quantifiedThingies">
        <quantified-thingy :quantifiedThingy="quantifiedThingy"></quantified-thingy>
      </li>
    </ol>
    <button @click="save">Save</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
  import QuantifiedThingy from './QuantifiedThingy.vue';

  export default{
    computed: {
      quantifiedThingies(){
        return this.$store.getters.quantifiedThingies;
      },
      dueDate(){
        return this.$store.getters.dueDate;
      }
    },

    methods: {
      save() {
        if (confirm('Are you sure you want to confirm this oodlet?')) {
          this.$store.commit('oodletSave');
        }
      },

      reset() {
        if (confirm('Are you sure you want to reset this oodlet?')) {
          this.$store.dispatch('oodletReset');
        }
      }
    },

    components: { QuantifiedThingy }
  }
</script>

<style lang="sass" scoped>
  .oodlet {
    width: 360px;
    min-height: 500px;
    display: inline-block;
    background-color: #d2b8ea;
    vertical-align: top;
    padding: 0 20px;

    h1 { color: #545454; }

    .due-date {
      font-weight: bold;
    }
  }
</style>
