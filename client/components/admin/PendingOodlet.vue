<template>
  <div class="panel panel-default pending-oodlet">
    <div class="panel-heading" role="tab" :id="'heading'+pendingOodlet.id">
      <div class="row panel-title" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#colllapse'+pendingOodlet.id"
           aria-expanded="false" :aria-controls="'colllapse'+pendingOodlet.id">
        <div class="col-md-1">
          <button class="btn btn-sm btn-danger" v-show="added" @click.prevent.stop="removePendingOodlet">Remove</button>
          <button class="btn btn-sm btn-success" v-show="!added" @click.prevent.stop="addPendingOodlet">Add</button>
        </div>
        <div class="col-md-2">
          <h2 class="panel-title">
            {{ pendingOodlet.oodler.office }}
          </h2>
        </div>
        <div class="col-md-3">
          <h2 class="panel-title">
            {{ updatedAt }}
          </h2>
        </div>
        <div class="col-md-3">
          <h2 class="panel-title">
            {{ dueDate }}
          </h2>
        </div>
        <div class="col-md-3">
          <h2 class="panel-title">
            {{ pendingOodlet.oodler.firstName }} {{ pendingOodlet.oodler.lastName }}
          </h2>
        </div>
      </div>
    </div>
    <div :id="'colllapse'+pendingOodlet.id" class="panel-collapse collapse" role="tabpanel"
         :aria-labelledby="'heading'+pendingOodlet.id">
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>Item</th>
            <th class="col-md-2">Quantity</th>
            <th class="col-md-2">Unit</th>
          </tr>
          </thead>
          <tbody>
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
      added() {
        return this.$store.getters.totalOodlet.oodletIds.includes(this.pendingOodlet.id);
      },
      updatedAt() {
        return moment(this.pendingOodlet.updatedAt).locale('hr').format('LL');
      },
      dueDate() {
        return moment(this.pendingOodlet.dueDate).locale('hr').format('LL');
      }
    },

    methods: {
      addPendingOodlet() {
        this.$store.dispatch('pendingOodletAdd', this.pendingOodlet);
      },
      removePendingOodlet() {
        this.$store.dispatch('pendingOodletRemove', this.pendingOodlet);
      }
    }
  }

</script>

<style lang="sass" scoped>
  .pending-oodlet {
    .panel-title { text-align: center; }
  }
</style>
