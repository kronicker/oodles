<template>
  <div class="oodlet">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Due in: </strong>
        <span v-if="dueDate" class="due-in-countdown" :class="dueInClass">{{ dueIn }}</span>
        <span v-else class="due-in-countdown red">NOT SET</span>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <tbody>
            <quantified-thingy v-for="quantifiedThingy in quantifiedThingies" :quantifiedThingy="quantifiedThingy"></quantified-thingy>
          </tbody>
        </table>
      </div>
      <div class="panel-footer" v-show="quantifiedThingies.length > 0">
        <button class="btn btn-danger push-right" data-toggle="modal" data-target="#oodletReset">Reset</button>
      </div>
      <div class="modal fade" data-backdrop="static" data-keyboard="false" id="oodletReset">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title">Are you sure you want to reset this order?</h4>
            </div>
            <div class="modal-body">
              <table class="table table-striped table-hover">
                <tbody>
                <tr v-for="quantifiedThingy in quantifiedThingies">
                  <td>{{ quantifiedThingy.name }}</td>
                  <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
                  <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="reset">Reset</button>
            </div>
          </div>
        </div>
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
          return moment(this.$store.getters.dueDate);
        }
      },
      dueIn() {
        return(
          Math.trunc(this.dueDate.diff(this.now, 'days')) + 'd ' +
          Math.trunc(this.dueDate.diff(this.now, 'hours')%24) + 'h ' +
          Math.trunc(this.dueDate.diff(this.now, 'minutes')%60) + 'm ' +
          Math.trunc(this.dueDate.diff(this.now, 'seconds')%60) + 's'
        );
      },
      dueInClass() {
        let diff = this.dueDate.diff(this.now, 'days');
        if(diff >= 2) {
          return 'green';
        }
        else if(diff < 2 && diff >= 1) {
          return 'orange';
        }
        else {
          return 'red';
        }
      },
      appInitialized() {
        return this.$store.getters.appInitialized;
      }
    },
    watch: {
      // Cannot use an arrow fn because 'this' wouldn't be Vue instance
      appInitialized() {
        this.load()
      },
      now() {
        if(this.now >= this.dueDate){
          this.load()
        }
      }
    },
    methods: {
      load() {
        this.$store.dispatch('oodletLoad');
      },
      reset() {
        this.$store.dispatch('oodletReset');
      }
    },
    mounted() {
      if(this.appInitialized) {
        this.load()
      }
    },
    created() {
      window.setInterval(() => {
        this.now = moment();
      }, 1000);
    },
    components: { QuantifiedThingy }
  }
</script>

<style lang="scss" scoped>
  .oodlet {
    margin-top: 10px;

    .due-in-countdown {
      &.green { color: #5cb85c; }
      &.orange { color: #f0ad4e; }
      &.red { color: #d9534f; }
    }
  }
</style>
