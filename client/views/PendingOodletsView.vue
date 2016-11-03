<template>
  <div id="pendingOodletsView">
    <div class="page-header">
      <h1 class="text-info">Pending oodlet</h1>
    </div>

    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <pending-oodlet v-for="pendingOodlet in pendingOodlets" :pendingOodlet="pendingOodlet"></pending-oodlet>
    </div>
  </div>
</template>

<script>
  import PendingOodlet from '../components/PendingOodlet.vue';

  export default {
    data() {
      totalOodlet: {}
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
    components: { PendingOodlet }
  }
</script>

<style lang="sass" scoped>
  #pendingOodletsView {
    .page-header { margin: 0px 0 10px; }
  }
</style>
