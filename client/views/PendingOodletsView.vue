<template>
  <div id="pendingOodletsView">
    <div class="page-header">
      <h1 class="text-info">Pending oodlet</h1>
    </div>
    <div class="row">
      <div class="pending-oodlets col-md-9">
        <div class="page-header">
          <h4 class="text-info">Pending oodlets</h4>
        </div>

        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <pending-oodlet v-for="pendingOodlet in pendingOodlets" :pendingOodlet="pendingOodlet"></pending-oodlet>
        </div>
      </div>

      <div class="total-oodlet col-md-3">
        <div class="page-header">
          <h4 class="text-info">Total oodlet</h4>
        </div>
        <total-oodlet></total-oodlet>
      </div>
    </div>
  </div>
</template>

<script>
  import PendingOodlet from '../components/PendingOodlet.vue';
  import TotalOodlet from '../components/TotalOodlet.vue';

  export default {
    data() {
      return {
        totalOodlet: {}
      }
    },

    computed: {
      pendingOodlets() {
        return [{office: 'C2', quantifiedThingies: ['banana', 'banana', 'banana', 'banana', ]},
                {office: 'C3', quantifiedThingies: ['banana', 'banana', 'banana', 'banana', ]},
                {office: 'C4', quantifiedThingies: ['banana', 'banana', 'banana', 'banana', ]},
                {office: 'C5', quantifiedThingies: ['banana', 'banana', 'banana', 'banana', ]},
                {office: 'C6', quantifiedThingies: ['banana', 'banana', 'banana', 'banana', ]},
                {office: 'C7', quantifiedThingies: ['banana', 'banana', 'banana', 'banana', ]},
                {office: 'C8', quantifiedThingies: ['banana', 'banana', 'banana', 'banana', ]},
                ];
      }
    },
    components: { PendingOodlet, TotalOodlet }
  }
</script>

<style lang="sass" scoped>
  #pendingOodletsView {
    .page-header { margin: 0px 0 10px; }
  }
</style>
