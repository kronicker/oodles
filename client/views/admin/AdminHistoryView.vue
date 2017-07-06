<template>
  <div id="adminHistoryView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">History</h1>
        </div>
        <div class="form-group col-md-offset-3 col-md-2">
          <div class="input-group">
            <span class="input-group-addon">Office: </span>
            <select class="form-control" @change="load" v-model="selectedOffice">
              <option>TOTALS</option>
              <option v-for="office in offices" :key="`${_uid}_office_${office}`">{{ office }}</option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-2">
          <div class="input-group">
            <span class="input-group-addon">From: </span>
            <Flatpickr :value="fromDate" :options="flatpickrOptions" @update="changeFromDate"/>
          </div>
        </div>
        <div class="form-group col-md-2">
          <div class="input-group">
            <span class="input-group-addon">To: </span>
            <Flatpickr :value="toDate" :options="flatpickrOptions" @update="changeToDate"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row" id="historyOodlets">
      <div class="col-md-12">
        <div class="row">
          <ul class="total-oodlets-list">
            <li class="col-md-2" v-for="historyOodlet in historyOodlets" :key="historyOodlet.id">
              <admin-history-oodlet :selectedOffice="selectedOffice" :historyOodlet="historyOodlet"></admin-history-oodlet>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  import AdminHistoryOodlet from '../../components/admin/AdminHistoryOodlet.vue';

  export default {
    data() {
      return {
        flatpickrOptions: {
          maxDate: 'today',
          altInput: true,
          altFormat: 'j. n. Y.',
          altInputClass: 'form-control'
        },
        historyOodlets: [],
        fromDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
        toDate: moment().format('YYYY-MM-DD'),
        offices: [],
        selectedOffice: 'TOTALS'
      };
    },
    computed: {
      appInitialized() {
        return this.$store.getters.appInitialized;
      }
    },
    watch: {
      appInitialized() {
        this.load();
      },
      fromDate() {
        this.load();
      },
      toDate() {
        this.load();
      }
    },
    methods: {
      load() {
        const params = {
          fromDate: moment(this.fromDate).format(),
          toDate: moment(this.toDate).format()
        };

        if (this.selectedOffice !== 'TOTALS') {
          params.office = this.selectedOffice;
        }
        const oodletsEndpoint = this.selectedOffice === 'TOTALS' ? '/totalOodlet' : '/oodlet';

        this.$http.get(oodletsEndpoint, { params })
          .then(response => {
            const sortKey = this.selectedOffice === 'TOTALS' ? 'orderedAt' : 'dueDate';
            this.historyOodlets = response.body
              .sort((prev, next) => next[sortKey] - prev[sortKey]);
          });
        this.$http.get('/oodler').then(response => {
          const offices = response.body
            .map(oodler => oodler.office)
            .filter(office => !this.offices.includes(office));
          this.offices = this.offices
            .concat(offices)
            .sort();
        });
      },
      changeFromDate(fromDate) {
        this.fromDate = moment(fromDate).toDate();
      },
      changeToDate(toDate) {
        this.toDate = moment(toDate).toDate();
      }
    },
    beforeCreate() {
      if (this.$store.getters.oodler.scope === 'user') {
        this.$router.replace({ path: '/' });
      }
    },
    mounted() {
      if (this.appInitialized) {
        this.load();
      }
    },
    components: {
      AdminHistoryOodlet
    }
  };
</script>

<style lang="scss" scoped>
  #adminHistoryView {
    .page-header {
      margin: 0 0 10px;

      h1,
      .form-group {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }

    ul.total-oodlets-list {
      padding-left: 0;
      list-style: none;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;

      li {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
    }
  }
</style>

