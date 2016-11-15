<template>
  <div id="totalOodletView">
    <div class="page-header">
      <h1 class="text-info">Total oodlet</h1>
    </div>
    <div class="row">
      <div class="total-oodlet col-md-4">
        <div class="page-header">
          <h3 class="text-info">Total oodlet</h3>
        </div>
        <total-oodlet></total-oodlet>
      </div>
  
      <div class="pending-oodlets col-md-8">
        <div class="page-header">
          <h3 class="text-info">Pending oodlets</h3>
        </div>
        
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="row panel-title">
              <div class="col-md-1">
              </div>
              <div class="col-md-2">
                <h3 class="panel-title">
                  <strong>Office</strong>
                </h3>
              </div>
              <div class="col-md-3">
                <h3 class="panel-title">
                  <strong>Updated at</strong>
                </h3>
              </div>
              <div class="col-md-3">
                <h3 class="panel-title">
                  <strong>Due date</strong>
                </h3>
              </div>
              <div class="col-md-3">
                <h3 class="panel-title">
                  <strong>Submited by</strong>
                </h3>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
              <pending-oodlet v-for="pendingOodlet in pendingOodlets" :pendingOodlet="pendingOodlet"></pending-oodlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PendingOodlet from '../../components/admin/PendingOodlet.vue';
  import TotalOodlet from '../../components/admin/TotalOodlet.vue';

  export default {
    computed: {
      pendingOodlets() {
        return this.$store.getters.pendingOodlets;
      },
      appInitialized() {
        return this.$store.getters.appInitialized;
      }
    },
  
    watch: {
      // Cannot use an arrow fn because 'this' wouldn't be Vue instance
      appInitialized: function() {
        this.load();
      }
    },
    
    methods: {
      load() {
        this.$store.dispatch('totalOodletLoad');
      }
    },
  
    beforeCreate() {
      if(this.$store.getters.oodler.scope === 'user') {
        this.$router.replace({ path: '/' });
      }
    },
  
    mounted() {
      if (this.appInitialized) {
        this.load();
      }
    },
    
    components: { PendingOodlet, TotalOodlet }
  }

</script>

<style lang="sass" scoped>
  #totalOodletView {
    .page-header { margin: 0px 0 10px; }
    .panel-title { text-align: center; }
  }
</style>
