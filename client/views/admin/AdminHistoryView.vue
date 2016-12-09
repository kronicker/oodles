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
            <flatpickr :value="fromDate" :options="flatpickrOptions" @update="changeFromDate"/>
          </div>
        </div>
        <div class="form-group col-md-2">
          <div class="input-group">
            <span class="input-group-addon">To: </span>
            <flatpickr :value="toDate" :options="flatpickrOptions" @update="changeToDate"/>
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
  import Flatpickr from '../../../node_modules/vue-flatpickr/vue-flatpickr-dark.vue';
  import moment from 'moment';
  
  export default{
    data() {
      return {
        flatpickrOptions: {
          maxDate: 'today',
          altInput: true,
          altFormat: "j. n. Y.",
          altInputClass: 'form-control'
        },
        historyOodlets: [],
        fromDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
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
      appInitialized() {
        this.load()
      },
      fromDate() {
        this.load()
      },
      toDate() {
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
            let oodlets = response.body;
            if(this.selectedOffice === 'TOTALS') {
              oodlets.sort((a,b) => (a.orderedAt > b.orderedAt) ? -1 : 1);
            }
            else {
              oodlets.sort((a,b) => (a.dueDate > b.dueDate) ? -1 : 1);
            }
            this.historyOodlets = oodlets;
          });
        
        this.$http.get('/oodler').then(response => {
          for(let oodler of response.body) {
            if(!this.offices.includes(oodler.office)) {
              this.offices.push(oodler.office)
            }
          }
          this.offices.sort();
        })
      },
      changeFromDate(fromDate) {
        this.fromDate = moment(fromDate).toDate();
      },
      changeToDate(toDate) {
        this.toDate = moment(toDate).toDate();
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
    
    components: {
      AdminHistoryOodlet,
      Flatpickr
    }
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

