<template>
  <div class="oodlet">
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
        <button class="btn btn-success" @click="">Order</button>
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

    components: {  }
  }

</script>

<style lang="sass" scoped>
</style>
