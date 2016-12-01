<template>
  <div class="admin-histoy-oodlet">
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
      <div class="panel-footer" v-if="isTotal">
        <strong>Offices: </strong>
        <ul class="list-inline">
          <li v-for="office in offices">{{ office }}</li>
        </ul>
      </div>
      <div class="panel-footer" v-else>
        <p>
          <strong>Office: </strong>{{ totalOodlet.oodler.office }}
        </p>
        <p>
          <strong>Submitted by: </strong>{{ totalOodlet.oodler.firstName }} {{ totalOodlet.oodler.lastName }}
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
    
    props: ['totalOodlet', 'isTotal'],
    
    computed: {
      orderedOn() {
        return moment(this.totalOodlet.orderedOn).locale('hr').format('LL');
      }
    },
    
    methods: {
      getOffices(){
        if(this.isTotal === false) { return; }
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
  .admin-histoy-oodlet {
    width: 100%;
    .col-md-2 {
      &.right { text-align: right; }
    }
  }
</style>
