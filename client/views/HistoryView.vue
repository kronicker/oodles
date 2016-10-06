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
  import HistoryOodlet from '../components/HistoryOodlet.vue'

  export default{
    data(){
      return{
        oodlets: [],
        fromDate: '2016-01-01',
        toDate: '2016-10-30'
      }
    },

    methods: {
      load(){
        this.$http.get('/oodlet', {
          params: {
            fromDate: new Date(this.fromDate).toISOString(),
            toDate: new Date(this.toDate).toISOString()
          }})
          .then((response) => {
            console.log('Success!!');
            this.oodlets = response.body;
          },
          (err)=>console.log('Error!!'));
      }
    },

    created(){
      this.load();
    },

//    methods:{
//      shit(){
//        console.log(
//                new Date(this.fromDate).toISOString()
//        );
//        console.log(
//                new Date(this.toDate).toLocaleDateString('hr-HR', {
//                  day : 'numeric',
//                  month : 'short',
//                  year : 'numeric'
//                })
//        );
//      }
//    },

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
