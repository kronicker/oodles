<template>
  <div id="historyView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">History</h1>
        </div>
        <div class="form-group col-md-offset-5 col-md-2">
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
  import HistoryOodlet from '../../components/user/HistoryOodlet.vue';
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
        oodlets: [],
        fromDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD')
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
        this.$http.get('/oodlet', {
          params: {
            fromDate: moment(this.fromDate).format(),
            toDate: moment(this.toDate).format(),
            office: this.oodler.office
          }})
          .then(response => {
            let oodlets = response.body;
            oodlets.sort((a,b) => (a.dueDate > b.dueDate) ? -1 : 1);
            this.oodlets = oodlets;
          });
      },
      changeFromDate(fromDate) {
        this.fromDate = moment(fromDate).toDate();
      },
      changeToDate(toDate) {
        this.toDate = moment(toDate).toDate();
      }
    },
  
    beforeCreate() {
      if(this.$store.getters.oodler.scope === 'admin') {
        this.$router.replace({ path: '/admin' });
      }
    },

    mounted() {
      if(this.appInitialized) {
        this.load()
      }
    },

    components: {
      HistoryOodlet,
      Flatpickr
    }
  }
</script>

<style lang="sass" scoped>
  #historyView {
    .page-header {
      margin: 0px 0 10px;

      h1, .form-group {
        margin-top: 20px;
        margin-bottom: 10px;
      }
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
