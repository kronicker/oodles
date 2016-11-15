<template>
  <div class="history-oodlet">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Created: </strong>
        <span>{{ createdAt }}</span>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <tbody>
            <tr v-for="quantifiedThingy in oodlet.quantifiedThingies">
              <td>{{ quantifiedThingy.name }}</td>
              <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
              <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="panel-footer">
        <button class="btn btn-success push-right" data-toggle="modal" data-target="#historyOodletLoad">Load</button>
      </div>
    </div>
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="historyOodletLoad">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">You will owerwrite your current oodlet with following</h4>
          </div>
          <div class="modal-body">
            <table class="table table-striped table-hover">
              <tbody>
              <tr v-for="quantifiedThingy in oodlet.quantifiedThingies">
                <td>{{ quantifiedThingy.name }}</td>
                <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
                <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
            <router-link to="/"><button type="button" class="btn btn-danger" data-dismiss="modal" @click="load">Load</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default{
    props: ['oodlet'],

    computed: {
      createdAt() {
        return moment(this.oodlet.createdAt).locale('hr').format('LL');
      }
    },

    methods: {
      load() {
        this.$store.dispatch('historyOodletLoad', this.oodlet);
      }
    }
  }
</script>

<style lang="sass" scoped>
  .history-oodlet {
    width: 100%;

    .col-md-2 {
      &.right { text-align: right; }
    }
  }
</style>
