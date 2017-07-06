<template>
  <div class="total-oodlet">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Offices: </strong>
        <ul class="list-inline">
          <li v-for="office in offices" :key="`${_uid}_office_${office}`">{{ office }}</li>
        </ul>
      </div>
      <div class="panel-body">
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
      <div class="panel-footer">
        <span data-toggle="tooltip" data-placement="right" title="Total order review">
          <button class="btn btn-success" data-toggle="modal" data-target="#totalOodletReview">Order</button>
        </span>
      </div>
    </div>
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="totalOodletReview">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Total order review</h4>
          </div>
          <div class="modal-body">
            <table class="table table-striped table-hover">
              <tbody>
              <tr v-for="quantifiedThingy in quantifiedThingies"  :key="quantifiedThingy.id">
                <td class="col-md-1"><input type="checkbox" :value="quantifiedThingy.id" v-model="checkedQuantifiedThingies"></td>
                <td>{{ quantifiedThingy.name }}</td>
                <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
                <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="order($event)" data-toggle="tooltip" data-placement="right" title="Finalize total order">Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkedQuantifiedThingies: []
      };
    },
    computed: {
      quantifiedThingies() {
        return this.$store.getters.totalOodlet.quantifiedThingies;
      },
      offices() {
        return this.$store.getters.totalOodletOffices;
      }
    },
    methods: {
      order(e) {
        if (this.checkedQuantifiedThingies.length !== this.quantifiedThingies.length) {
          e.stopPropagation();
          return;
        }

        this.$store.dispatch('totalOodletFinalize');
      }
    }
  };
</script>
