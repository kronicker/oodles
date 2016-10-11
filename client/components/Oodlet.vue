<template>
  <div class="oodlet">
    <div>
      <h1>Oodlet</h1>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Due in: </strong>
        <span v-if="dueDate" class="due-in-countdown" :class=dueInClass>{{ dueIn }}</span>
        <span v-else class="due-in-countdown red">Expired</span>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-hover ">
          <tbody>
            <quantified-thingy v-for="quantifiedThingy in quantifiedThingies" :quantifiedThingy="quantifiedThingy"></quantified-thingy>
          </tbody>
        </table>
      </div>
      <div class="panel-footer" v-show="quantifiedThingies.length > 0">
        <button class="btn btn-danger push-right" @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
  import QuantifiedThingy from './QuantifiedThingy.vue';
  import moment from 'moment';

  export default {
    data() {
      return {
        now : moment()
      }
    },
    computed: {
      quantifiedThingies() {
        return this.$store.getters.quantifiedThingies;
      },
      dueDate() {
        if(this.$store.getters.dueDate) {
          return this.$store.getters.dueDate;
        }
      },
      dueIn() {
        return(
              Math.trunc((moment(this.dueDate).diff(this.now, 'days'))) + 'd ' +
              Math.trunc((moment(this.dueDate).diff(this.now, 'hours')%24)) + 'h ' +
              Math.trunc((moment(this.dueDate).diff(this.now, 'minutes')%60)) + 'm ' +
              Math.trunc((moment(this.dueDate).diff(this.now, 'seconds')%60)) + 's'
        );
      },
      dueInClass() {
        let diff = moment(this.dueDate).diff(this.now, 'days');
        if(diff >= 2) {
          return 'green';
        }
        else if(diff < 2 && diff > 0) {
          return 'orange';
        }
        else {
          return 'red';
        }
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

    created(){
      window.setInterval(() => {
        this.now = moment();
      }, 1000);
    },

    components: { QuantifiedThingy }
  }
</script>

<style lang="sass" scoped>
  .oodlet {

    h1 {
      border-bottom: 1px solid #4E5D6C;
      margin-top: 10px;
      padding-bottom: 7px;
    }

    .due-in-countdown {
      &.green { color: #5cb85c; }
      &.orange { color: #f0ad4e; }
      &.red { color: #d9534f; }
    }

  }
</style>
