<template>
  <div id="historyView">
    <h1>History</h1>
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
        oodlets: []
      }
    },

    created(){
      this.$http.get('/oodlet').then((response) => {
        console.log(response.body);
        this.oodlets = response.body;
      });
    },

    components: { HistoryOodlet }
  }
</script>

<style lang="sass" scoped>
  #historyView {
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
    background-color: #f1ac2f;

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
