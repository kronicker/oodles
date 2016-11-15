<template>
  <div class="history-total-oodlet">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Ordered on: </strong>
        <span>{{ orderedOn }}</span>
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
        <strong>Offices: </strong>
        <ul class="list-inline">
          <li v-for="office in offices">{{ office }}</li>
        </ul>
      </div>
    </div>
  
  </div>
</template>

<script>
  import moment from 'moment';
  
  export default {
    data() {
      return {
        offices: []
      }
    },
    
    props: ['totalOodlet'],
    
    computed: {
      orderedOn() {
        return moment(this.totalOodlet.orderedOn).locale('hr').format('LL');
      }
    },
    
    methods: {
      getOffices(){
        for(let oodletId of this.totalOodlet.oodletIds) {
          this.$http.get(`/oodlet/${oodletId}`)
            .then(response => {
              this.offices.push(response.body.oodler.office);
            });
        }
      }
    },
    
    mounted() {
      this.getOffices();
    }
  }
</script>

<style lang="sass" scoped>
  .history-total-oodlet {
    width: 100%;
    .col-md-2 {
      &.right { text-align: right; }
    }
  }
</style>
