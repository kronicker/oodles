<template>
  <div class="oodlet">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Due in: </strong>
        <span v-if="dueDate" class="due-in-countdown" :class="timerColor">{{ dueIn }}</span>
        <span v-else class="due-in-countdown red">NOT SET</span>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <tbody>
            <quantified-thingy v-for="quantifiedThingy in quantifiedThingies" :quantifiedThingy="quantifiedThingy" :key="quantifiedThingy.id">
            </quantified-thingy>
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
                <tr v-for="quantifiedThingy in quantifiedThingies" :key="quantifiedThingy.id">
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
  import moment from 'moment';

  import QuantifiedThingy from './QuantifiedThingy.vue';

  export default {
    data() {
      return {
        now: moment()
      };
    },
    computed: {
      quantifiedThingies() {
        return this.$store.getters.quantifiedThingies;
      },
      dueDate() {
        return this.$store.getters.dueDate;
      },
      dueIn() {
        if (!this.dueDate) {
          return '';
        }

        const dueDate = moment(this.dueDate);
        const days = Math.trunc(dueDate.diff(this.now, 'days'));
        const hours = Math.trunc(dueDate.diff(this.now, 'hours') % 24);
        const minutes = Math.trunc(dueDate.diff(this.now, 'minutes') % 60);
        const seconds = Math.trunc(dueDate.diff(this.now, 'seconds') % 60);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      },
      timerColor() {
        const diff = moment(this.dueDate).diff(this.now, 'days');
        if (diff >= 2) {
          return 'green';
        } else if (diff < 2 && diff >= 1) {
          return 'orange';
        }
        return 'red';
      },
      appInitialized() {
        return this.$store.getters.appInitialized;
      }
    },
    watch: {
      appInitialized() {
        this.load();
      },
      now() {
        if (this.now >= this.dueDate) {
          this.load();
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
      if (this.appInitialized) {
        this.load();
      }
    },
    created() {
      setInterval(() => {
        this.now = moment();
      }, 1000);
    },
    components: { QuantifiedThingy }
  };
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
