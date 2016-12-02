<template>
  <div id="adminHistoryView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">History</h1>
        </div>
        <div class="form-group col-md-offset-3 col-md-2">
          <div class="input-group">
            <span class="input-group-addon">Office: </span>
            <select class="form-control" @change="load" v-model="selectedOffice">
              <option>TOTALS</option>
              <option v-for="office in offices">{{ office }}</option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-2">
          <div class="input-group">
            <span class="input-group-addon">From: </span>
            <input type="date" class="form-control" @change="load" :max="maxDate" v-model="fromDate">
          </div>
        </div>
        <div class="form-group col-md-2">
          <div class="input-group">
            <span class="input-group-addon">To: </span>
            <input type="date" class="form-control" @change="load" :max="maxDate" v-model="toDate">
          </div>
        </div>
      </div>
    </div>
    <div class="row" id="historyOodlets">
      <div class="col-md-12">
        <div class="row">
          <ul class="total-oodlets-list">
            <li class="col-md-2" v-for="historyOodlet in historyOodlets">
              <admin-history-oodlet :selectedOffice="selectedOffice" :historyOodlet="historyOodlet"></admin-history-oodlet>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminHistoryOodlet from '../../components/admin/AdminHistoryOodlet.vue';
  import moment from 'moment';
  
  export default{
    data() {
      return {
        historyOodlets: [],
        fromDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD'),
        offices: [],
        selectedOffice: 'TOTALS'
      }
    },
    
    computed: {
      appInitialized() {
        return this.$store.getters.appInitialized;
      }
    },
    
    watch: {
      // Cannot use an arrow fn because 'this' wouldn't be Vue instance
      appInitialized: function () {
        this.load()
      }
    },
    
    methods: {
      load() {
        let options = (() => {
          if (this.selectedOffice === 'TOTALS') {
            return {
              params: {
                fromDate: moment(this.fromDate).format(),
                toDate: moment(this.toDate).format()
              }
            }
          }
          else {
            return {
              params: {
                fromDate: moment(this.fromDate).format(),
                toDate: moment(this.toDate).format(),
                office: this.selectedOffice
              }
            }
          }
        })();
        let endpoint = this.selectedOffice === 'TOTALS' ? '/totalOodlet' : '/oodlet';
        
        this.$http.get(endpoint, options)
          .then(response => {
            this.historyOodlets = response.body;
          });
        
        this.$http.get('/oodler').then(response => {
          for(let oodler of response.body) {
            if(this.offices.indexOf(oodler.office) < 0) {
              this.offices.push(oodler.office)
            }
          }
          this.offices.sort();
        })
      }
    },
  
    beforeCreate() {
      if(this.$store.getters.oodler.scope === 'user') {
        this.$router.replace({ path: '/' });
      }
    },
    
    mounted() {
      if (this.appInitialized) {
        this.load()
      }
    },
    
    components: { AdminHistoryOodlet }
  }
</script>

<style lang="sass" scoped>
  #adminHistoryView {
    .page-header {
      margin: 0px 0 10px;

      h1, .form-group {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }
    
    ul.total-oodlets-list {
      padding-left: 0;
      list-style: none;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    
      li {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
    }
  }
</style>

