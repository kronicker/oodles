<template>
  <div id="historyView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1>History</h1>
        </div>
        <div class="form-group col-md-offset-5 col-md-2">
          <div class="input-group">
            <span class="input-group-addon">From: </span>
            <input type="date" class="form-control" @change="load" v-model="fromDate">
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
          <ul class="oodlets-list">
            <li class="col-md-2" v-for="oodlet in oodlets">
              <history-oodlet :oodlet="oodlet"></history-oodlet>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HistoryOodlet from '../components/HistoryOodlet.vue';
  import moment from 'moment';

  export default{
    data() {
      return{
        oodlets: [],
        fromDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD')
      }
    },

    computed: {
      oodler() {
        return this.$store.getters.oodler;
      },
      appInitialized() {
        return this.$store.getters.appInitialized;
      }
    },

    watch: {
      // Cannot use an arrow fn because 'this' wouldn't be Vue instance
      appInitialized: function() {
        this.load()
      }
    },

    methods: {
      load() {
        this.$http.get('/oodlet', {
          params: {
            fromDate: moment(this.fromDate).format(),
            toDate: moment(this.toDate).format(),
            office: this.oodler.office
          }})
          .then(response => {
            this.oodlets = response.body;
          });
      }
    },

    mounted() {
      if(this.appInitialized) {
        this.load()
      }
    },

    components: { HistoryOodlet }
  }
</script>

<style lang="sass" scoped>
  #historyView {
    .header h1, .header .form-group {
      margin-top: 20px;
      margin-bottom: 10px;
    }

    ul.oodlets-list {
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
