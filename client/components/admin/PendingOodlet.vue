<template>
  <div class="panel panel-default pending-oodlet">
    <div class="panel-heading" role="tab" :id="'heading'+pendingOodlet.id">
      <div class="row panel-title" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#colllapse'+pendingOodlet.id"
           aria-expanded="false" :aria-controls="'colllapse'+pendingOodlet.id">
        <div class="col-md-2">
          <button class="btn btn-sm btn-warning" v-show="added" @click.prevent.stop="removePendingOodlet" data-toggle="tooltip" data-placement="right" title="Remove from total order">Remove</button>
          <button class="btn btn-sm btn-success" v-show="!added" @click.prevent.stop="addPendingOodlet" data-toggle="tooltip" data-placement="right" title="Add to total order">Add</button>
          <span data-toggle="modal" :data-target="'#' + pendingOodlet.id + 'delete'">
            <button class="btn btn-sm btn-danger" data-toggle="tooltip" data-placement="right" title="Delete order">Delete</button>
          </span>
        </div>
        <div class="col-md-2">
          <h2 class="panel-title" :class="{ empty: !pendingOodlet.quantifiedThingies.length }">
            {{ pendingOodlet.oodler.office }}
          </h2>
        </div>
        <div class="col-md-3">
          <h2 class="panel-title" :class="{ empty: !pendingOodlet.quantifiedThingies.length }">
            {{ updatedAt }}
          </h2>
        </div>
        <div class="col-md-3">
          <h2 class="panel-title" :class="{ empty: !pendingOodlet.quantifiedThingies.length }">
            {{ dueDate }}
          </h2>
        </div>
        <div class="col-md-2">
          <h2 class="panel-title" :class="{ empty: !pendingOodlet.quantifiedThingies.length }">
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
          <tr v-for="quantifiedThingy in pendingOodlet.quantifiedThingies" :key="quantifiedThingy.id">
            <td>{{ quantifiedThingy.name }}</td>
            <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
            <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" data-backdrop="static" data-keyboard="false" :id="pendingOodlet.id + 'delete'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Do you really want to delete this order?</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <table class="table table-striped table-hover">
                <thead>
                <tr>
                  <th>Item</th>
                  <th class="col-md-2">Quantity</th>
                  <th class="col-md-2">Unit</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="quantifiedThingy in pendingOodlet.quantifiedThingies" :key="quantifiedThingy.id">
                  <td>{{ quantifiedThingy.name }}</td>
                  <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
                  <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <div class="info">
              <span><strong>Office:</strong> {{ pendingOodlet.oodler.office }}&nbsp</span>
              <span><strong>Submitted by:</strong> {{ pendingOodlet.oodler.firstName }} {{ pendingOodlet.oodler.lastName }}</span>
            </div>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteOodlet">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
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
      },
      deleteOodlet() {
        this.$http.delete(`/oodlet/${this.pendingOodlet.id}`)
          .then(() => this.$emit('oodletDeleted'));
      }
    }
  };
</script>

<style lang="scss" scoped>
  .pending-oodlet {
    .panel-title { text-align: center; }

    .empty { color: #c9302c; }

    .modal-footer .info {
      float: left;
    }
  }
</style>
