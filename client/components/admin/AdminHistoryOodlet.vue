<template>
  <div class="admin-history-oodlet">
    <div class="panel panel-default">
      <div class="panel-heading" v-if="selectedOffice == 'TOTALS'">
        <strong>Ordered on: </strong>
        <span>{{ orderedOn }}</span>
      </div>
      <div class="panel-heading" v-else>
        <strong>Due date: </strong>
        <span>{{ dueDate }}</span>
      </div>
      
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <tbody>
          <tr v-for="quantifiedThingy in historyOodlet.quantifiedThingies">
            <td>{{ quantifiedThingy.name }}</td>
            <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
            <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="panel-footer" v-if="selectedOffice == 'TOTALS'">
        <strong>Offices: </strong>
        <ul class="list-inline">
          <li v-for="office in offices">{{ office }}</li>
        </ul>
      </div>
      <div class="panel-footer" v-else>
        <p>
          <strong>Office: </strong>{{ historyOodlet.oodler.office }}
        </p>
        <p>
          <strong>Submitted by: </strong>{{ historyOodlet.oodler.firstName }} {{ historyOodlet.oodler.lastName }}
        </p>
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
    
    props: ['historyOodlet', 'selectedOffice'],
    
    computed: {
      orderedOn() {
        return moment(this.historyOodlet.orderedOn).locale('hr').format('LL');
      },
      dueDate() {
        return moment(this.historyOodlet.dueDate).locale('hr').format('LL');
      }
    },
    
    methods: {
      getOffices() {
        if(this.selectedOffice !== 'TOTALS') { return; }
        for(let oodletId of this.historyOodlet.oodletIds) {
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
  .admin-history-oodlet {
    width: 100%;
    .col-md-2 {
      &.right { text-align: right; }
    }
  }
</style>
