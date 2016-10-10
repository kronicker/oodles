<template>
  <div class="oodlet">
    <div >
      <h1>Oodlet</h1>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">Due: {{ dueDate }}</div>
      <div class="panel-body">
        <table class="table table-striped table-hover ">
          <tbody>
            <quantified-thingy v-for="quantifiedThingy in quantifiedThingies" :quantifiedThingy="quantifiedThingy"></quantified-thingy>
          </tbody>
        </table>
      </div>
    </div>
    <button v-show="quantifiedThingies.length > 0" class="btn btn-danger" @click="reset">Reset</button>
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
    .affix{
      top: 10px;
    }

  }
</style>
