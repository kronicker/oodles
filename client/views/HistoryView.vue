<template>
  <div id="historyView">
    <h1>History</h1>
    <form>
      <p>
        <span>From: </span>
        <input type="date" @change="load" v-model="fromDate"/>
        <span>To: </span>
        <input type="date" @change="load" v-model="toDate"/>
      </p>
    </form>
    <ul>
      <li v-for="oodlet in oodlets">
        <history-oodlet :oodlet="oodlet"></history-oodlet>
      </li>
    </ul>
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
          .then((response) => {
            this.oodlets = response.body;
          },
          (err)=>console.log('Error!!'));
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
    width: 1200px;
    margin: 10px auto;
    padding-top: 10px;
    background-color: #f1ac2f;

    input { display: inline; }

    h1 { color: #545454; }

    ul {
      list-style: none;
      width: 1200px;
      display: block;
      white-space: nowrap;
      overflow: auto;
      padding: 0;
    }
    li {
      display: inline-block;
    }
  }
</style>
