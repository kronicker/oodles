<template>
  <div class="historyOodlet">
    <div class="panel panel-default">
      <div class="panel-heading"><span class="bold">Created:</span> <span>{{ oodlet.createdAt }}</span></div>
      <div class="panel-body">
        <table class="table table-striped table-hover">
          <tbody>
            <tr v-for="quantifiedThingy in oodlet.quantifiedThingies">
              <td>{{ quantifiedThingy.name }}</td>
              <td class="table-col-2">{{ quantifiedThingy.qty }}</td>
              <td class="table-col-3">{{ quantifiedThingy.unit }}</td>
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
  export default{
    props: ['oodlet'],

    methods: {
      load(){
        this.$store.dispatch('oodletSet', this.oodlet.quantifiedThingies);
      }
    }
  }
</script>

<style lang="sass" scoped>
  .historyOodlet {
    span.bold{
      font-weight: bold;
    }

    .created-at {
      font-weight: bold;
    }

    .table-col-2, .table-col-4 {
      text-align: right;
    }
    .table-col-3 {
      text-align: left;
    }
  }
</style>
