<template>
  <div id="totalOodletView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">Total order</h1>
        </div>
        <div class="add-button col-md-offset-7 col-md-2">
          <button class="btn btn-block btn-success" data-toggle="modal" data-target="#newDueDate"><span class="glyphicon glyphicon-calendar"></span> Set new due date</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="total-oodlet col-md-4">
        <div class="page-header">
          <h3 class="text-info">Total order</h3>
        </div>
        <total-oodlet></total-oodlet>
      </div>
  
      <div class="pending-oodlets col-md-8">
        <div class="page-header">
          <h3 class="text-info">Pending orders</h3>
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
  
    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="newDueDate">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Set new due date</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <form class="form-horizontal col-md-10 col-md-offset-1">
                <div class="form-group col-md-6">
                  <flatpickr :placeholder="message" :options="flatpickrOptions" @update="changeDueDate"/>
                </div>
                <div class="form-group col-md-12">
                  <div class="row">
                  <span class="col-md-6">Select oodlers: </span>
                  <a class="col-md-3 btn btn-xs btn-default" @click="selectAll">Select all</a>
                  <a class="col-md-3 btn btn-xs btn-default" @click="unselectAll">Unselect all</a>
                  </div>
                  <div class="row">
                    <div class="radio col-md-6" v-for="oodler in oodlers">
                      <label>
                        <input type="checkbox" :value="oodler.id" v-model="checkedOodlers">
                        {{oodler.office}} - {{oodler.firstName}} {{oodler.lastName}}
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="setDueDates($event)">Set</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PendingOodlet from '../../components/admin/PendingOodlet.vue';
  import TotalOodlet from '../../components/admin/TotalOodlet.vue';
  import Flatpickr from '../../../node_modules/vue-flatpickr/vue-flatpickr-dark.vue';
  import moment from 'moment';
  import object from 'lodash/object';
  

  export default {
    data() {
      return {
        message: 'Click here to pick a date',
        flatpickrOptions: {
          time_24hr: true,
          enableTime: true,
          minDate: new Date(),
          altInput: true,
          altFormat: "j. n. Y. H:i",
          altInputClass: 'form-control'
        },
        dueDate: '',
        oodlers: [],
        checkedOodlers: []
      }
    },
    
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
      appInitialized() {
        this.load();
      }
    },
    
    methods: {
      load() {
        this.$store.dispatch('totalOodletLoad');
        this.$http.get('/oodler')
          .then(response => {
            this.oodlers = response.body
              .filter(oodler => oodler.scope !== 'admin')
              .sort((a,b) => {
                return a.office < b.office ? -1 : 1;
              });
            this.oodlers.forEach(oodler => this.checkedOodlers.push(oodler.id));
          });
      },
      changeDueDate(newDate) {
        this.dueDate = moment(newDate).toDate();
      },
      selectAll() {
        for(let oodler of this.oodlers) {
          if(this.checkedOodlers.indexOf(oodler.id) < 0) {
            this.checkedOodlers.push(oodler.id)
          }
        }
      },
      unselectAll(){
        this.checkedOodlers = []
      },
      setDueDates(event) {
        if(this.dueDate === '') {
          return event.stopPropagation();
        }
        for(let oodlerId of this.checkedOodlers) {
          this.$http.post('/oodlet/active', {
            id: oodlerId,
            dueDate: this.dueDate
          });
        }
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
    
    components: {
      PendingOodlet,
      TotalOodlet,
      Flatpickr
    }
  }

</script>

<style lang="sass" scoped>
  #totalOodletView {
    .page-header {
      margin: 0px 0 10px;
    
        h1, .add-button {
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }
    .panel-title { text-align: center; }
  }
</style>
