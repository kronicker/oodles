<template>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" :id="'heading'+pendingOodlet.office">
      <div class="row panel-title">
        <div class="col-md-1">
          <label>
            <input type="checkbox">
          </label>
        </div>
        <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#colllapse'+pendingOodlet.office" aria-expanded="false" :aria-controls="'colllapse'+pendingOodlet.office">
          <div class="col-md-2">
            <h4 class="panel-title">
              {{ pendingOodlet.office }}
            </h4>
          </div>
          <div class="col-md-3">
            <h4 class="panel-title">
              Last updated: {{ updatedAt }}
            </h4>
          </div>
          <div class="col-md-3">
            <h4 class="panel-title">
              Due date: Sutra
            </h4>
          </div>
          <div class="col-md-3">
            <h4 class="panel-title">
              Submited by: Mate
            </h4>
          </div>
        </a>
      </div>
    </div>
    <div :id="'colllapse'+pendingOodlet.office" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'heading'+pendingOodlet.office">
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>Thingy</th>
            <th class="col-md-2">Quantity</th>
            <th class="col-md-2">Unit</th>
          </tr>
          <tr v-for="quantifiedThingy in pendingOodlet.quantifiedThingies">
            <td>{{ quantifiedThingy.name }}</td>
            <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
            <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default{
    props: ['pendingOodlet'],

    computed: {
      updatedAt() {
        return moment(this.pendingOodlet.updatedAt).locale('hr').format('LL');
      },
      dueDate() {
        return moment(this.pendingOodlet.dueDate).locale('hr').format('LL');
      },
    },

    methods: {
      load() {
        this.$store.dispatch('oodletSet', this.oodlet.quantifiedThingies);
      }
    }
  }
</script>

<style>
</style>
