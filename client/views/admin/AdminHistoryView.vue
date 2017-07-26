<template>
  <div id="adminHistoryView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">History</h1>
        </div>
        <div class="form-group col-md-offset-4 col-md-2">
          <div class="input-group">
            <span class="input-group-addon">Office: </span>
            <select class="form-control" @change="load" v-model="selectedOffice">
              <option>TOTALS</option>
              <option v-for="office in offices" :key="`${_uid}_office_${office}`">{{ office }}</option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-3">
          <div class="input-group">
            <span class="input-group-addon">Range: </span>
            <flat-pickr v-model="range" :config="flatpickrOptions"></flat-pickr>
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
          mode: 'range',
          maxDate: new Date(),
          altInput: true,
          altFormat: 'j. n. Y.',
          altInputClass: 'form-control'
        },
        historyOodlets: [],
        defaultDates: {
          from: moment().subtract(2, 'months').format('YYYY-MM-DD'),
          to: moment().format('YYYY-MM-DD')
        },
        selectedDates: {},
        range: '',
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
        debugger;
        this.load();
      },
      range() {
        const range = this.range.split(' to ');
        if (!range[1]) {
          return;
        }

        this.selectedDates = {
          from: moment(range[0]).format(),
          to: moment(range[1]).format()
        };
        this.load();
      }
    },
    methods: {
      load() {
        if (!this.selectedDates.from || !this.selectedDates.to) {
          return;
        }

        const params = {
          fromDate: this.selectedDates.from,
          toDate: this.selectedDates.to,
          office: this.selectedOffice !== 'TOTALS' ? this.selectedOffice : undefined
        };
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
      }
    },
    beforeCreate() {
      if (this.$store.getters.oodler.scope === 'user') {
        this.$router.replace({ path: '/' });
      }
    },
    mounted() {
      this.range = `${this.defaultDates.from} to ${this.defaultDates.to}`;
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

