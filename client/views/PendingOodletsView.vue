<template>
  <div id="pendingOodletsView">
    <div class="page-header">
      <h1 class="text-info">Pending oodlet</h1>
    </div>
    <div class="row">
      <div class="pending-oodlets col-md-9">
        <div class="page-header">
          <h3 class="text-info">Pending oodlets</h3>
        </div>

        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <pending-oodlet v-for="pendingOodlet in pendingOodlets" :pendingOodlet="pendingOodlet"></pending-oodlet>
        </div>
      </div>

      <div class="total-oodlet col-md-3">
        <div class="page-header">
          <h3 class="text-info">Total oodlet</h3>
        </div>
        <total-oodlet></total-oodlet>
      </div>
    </div>
  </div>
</template>

<script>
  import PendingOodlet from '../components/PendingOodlet.vue';
  import TotalOodlet from '../components/TotalOodlet.vue';

  export default {
    computed: {
      pendingOodlets() {
        //return this.$store.getters.pendingOodlets

        //Mock-uped data
        return [{
            createdAt: '31 Oct 2016' ,
            dueDate: '31 Nov 2016' ,
            id:  "7e8cf827-eb9e-42ef-984d-e08b865d227a" ,
            oodler: {
              email: 'toma@extensionengine.com',
              firstName:  "Toma" ,
              id:  "3beb563e-557a-4d0f-916a-de2dd7dbd10c" ,
              lastName:  "Zelic" ,
              office:  "C7" ,
              scope:  "user"
            },
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
            }],
            updatedAt: '31 Oct 2016'
          },
          {
            createdAt: '31 Oct 2016' ,
            dueDate: '31 Nov 2016' ,
            id:  "7e8cf827-eb9e-42ef-984d-e08b865d227a" ,
            oodler: {
              email: 'toma@extensionengine.com',
              firstName:  "Toma" ,
              id:  "3beb563e-557a-4d0f-916a-de2dd7dbd10c" ,
              lastName:  "Zelic" ,
              office:  "C8" ,
              scope:  "user"
            },
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
            }],
            updatedAt: '31 Oct 2016'
          },
          {
            createdAt: '31 Oct 2016' ,
            dueDate: '31 Nov 2016' ,
            id:  "7e8cf827-eb9e-42ef-984d-e08b865d227a" ,
            oodler: {
              email: 'toma@extensionengine.com',
              firstName:  "Toma" ,
              id:  "3beb563e-557a-4d0f-916a-de2dd7dbd10c" ,
              lastName:  "Zelic" ,
              office:  "C9" ,
              scope:  "user"
            },
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
            }],
            updatedAt: '31 Oct 2016'
          },
          {
            createdAt: '31 Oct 2016' ,
            dueDate: '31 Nov 2016' ,
            id:  "7e8cf827-eb9e-42ef-984d-e08b865d227a" ,
            oodler: {
              email: 'toma@extensionengine.com',
              firstName:  "Toma" ,
              id:  "3beb563e-557a-4d0f-916a-de2dd7dbd10c" ,
              lastName:  "Zelic" ,
              office:  "C10" ,
              scope:  "user"
            },
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
            }],
            updatedAt: '31 Oct 2016'
          },
        ];
      }
    },

    components: { PendingOodlet, TotalOodlet }
  }

</script>

<style lang="sass" scoped>
  #pendingOodletsView {
    .page-header { margin: 0px 0 10px; }
  }
</style>
