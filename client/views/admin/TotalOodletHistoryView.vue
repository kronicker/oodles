<template>
  <div id="totalOodletHistoryView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">History</h1>
        </div>
        <div class="form-group col-md-offset-5 col-md-2">
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
            <li class="col-md-2" v-for="totalOodlet in totalOodlets">
              <history-total-oodlet :totalOodlet="totalOodlet"></history-total-oodlet>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HistoryTotalOodlet from '../../components/admin/HistoryTotalOodlet.vue';
  import moment from 'moment';
  
  export default{
    data() {
      return {
        totalOodlets: [],
        fromDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD')
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
        this.$http.get('/totalOodlet', {
              params: {
                fromDate: moment(this.fromDate).format(),
                toDate: moment(this.toDate).format()
              }})
            .then(response => {
              this.totalOodlets = response.body;
            });
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
    
    components: { HistoryTotalOodlet }
  }
</script>

<style lang="sass" scoped>
  #totalOodletHistoryView {
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

