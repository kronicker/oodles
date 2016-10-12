<template>
  <div class="history-oodlet">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>Created: </strong>
        <span>{{ createdAt }}</span>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <tbody>
            <tr v-for="quantifiedThingy in oodlet.quantifiedThingies">
              <td>{{ quantifiedThingy.name }}</td>
              <td class="col-md-2 right">{{ quantifiedThingy.qty }}</td>
              <td class="col-md-2">{{ quantifiedThingy.unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="panel-footer">
        <router-link to="/"><button class="btn btn-success push-right" @click="load">Load</button></router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment';

  export default{
    props: ['oodlet'],

    computed: {
      createdAt(){
        return moment(this.oodlet.createdAt).locale('hr').format('LL');
      }
    },

    methods: {
      load(){
        this.$store.dispatch('oodletSet', this.oodlet.quantifiedThingies);
      }
    }
  }
</script>

<style lang="sass" scoped>
  .history-oodlet {
    width: 100%;

    .col-md-2 {
      &.right { text-align: right; }
    }

  }
</style>
