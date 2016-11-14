<template>
  <div class="total-oodlet">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Offices: </strong>
        <ul class="list-inline">
          <li v-for="office in totalOodlet.offices">{{ office }}</li>
        </ul>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <tbody>
            <tr v-for="quantifiedThingy in totalOodlet.quantifiedThingies">
              <td>{{ quantifiedThingy.name }}</td>
              <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
              <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="panel-footer">
        <button class="btn btn-success" data-toggle="modal" data-target="#totalOodletReview">Order</button>
      </div>
    </div>

    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="totalOodletReview">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Total oodlet review</h4>
          </div>
          <div class="modal-body">
            <table class="table table-striped table-hover">
              <tbody>
              <tr v-for="quantifiedThingy in totalOodlet.quantifiedThingies">
                <td>{{ quantifiedThingy.name }}</td>
                <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
                <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="order">Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    computed: {
      totalOodlet() {
        //return this.$store.getters.totalOodlet

        //Mock-uped total oodlet
        return {
          offices: ['C7', 'C8', 'D3', 'C18'],
          quantifiedThingies: [
            {
              id: "df997beb-21ee-44e8-8393-2f561f89b45e",
              name: "Sausages",
              pictureUrl: "https://placeimg.com/240/200/any",
              qty: 1,
              unit: "kg"
            },{
              id: "df997beb-21ee-44e8-8393-2f561f89b45e",
              name: "Sausages",
              pictureUrl: "https://placeimg.com/240/200/any",
              qty: 1,
              unit: "kg"
            },{
              id: "df997beb-21ee-44e8-8393-2f561f89b45e",
              name: "Sausages",
              pictureUrl: "https://placeimg.com/240/200/any",
              qty: 1,
              unit: "kg"
            },{
              id: "df997beb-21ee-44e8-8393-2f561f89b45e",
              name: "Sausages",
              pictureUrl: "https://placeimg.com/240/200/any",
              qty: 1,
              unit: "kg"
            }]
        };
      }
    },

    methods: {
      order() {
        //this.$store.dispatch('totalOodletOrder');
      }
    },

    components: {  }
  }

</script>

<style lang="sass" scoped>
</style>
