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
            <input type="date" class="form-control"  @change="load" v-model="fromDate">
          </div>
        </div>

        <div class="form-group col-md-2">
          <div class="input-group">
            <span class="input-group-addon">To: </span>
            <input type="date" class="form-control" @change="load" v-model="toDate">
          </div>
        </div>
      </div>
    </div>

    <div class="row" id="historyOodlets">
      <div class="col-md-12">
        <div class="row">
          <ul class="list">
            <li class="col-md-2 list__item" v-for="oodlet in oodlets">
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
    data(){
      return{
        oodlets: [],
        fromDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD')
      }
    },

    methods: {
      load(){
        this.$http.get('/oodlet', {
          params: {
            fromDate: moment(this.fromDate).format(),
            toDate: moment(this.toDate).format()
          }})
          .then(response => {
            this.oodlets = response.body;
          });
      }
    },

    created(){
      this.load();
    },

    components: { HistoryOodlet }
  }
</script>

<style lang="sass" scoped>
  #historyView {
    ul {
      padding-left: 0;
      list-style: none;
    }

    .header h1, .header .form-group{
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .list
    {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;

      .list__item
      {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
    }
  }
</style>
