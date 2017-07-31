<template>
  <div id="historyView">
    <div class="header page-header">
      <div class="row">
        <div class="col-md-3">
          <h1 class="text-info">History</h1>
        </div>
        <div class="form-group col-md-offset-6 col-md-3">
          <div class="input-group">
            <span class="input-group-addon">From: </span>
            <flat-pickr v-model="range" :config="flatpickrOptions"></flat-pickr>
          </div>
        </div>
      </div>
    </div>
    <div class="row" id="historyOodlets">
      <div class="col-md-12">
        <div class="row">
          <ul class="oodlets-list">
            <li class="col-md-2" v-for="oodlet in oodlets" :key="oodlet.id">
              <history-oodlet :oodlet="oodlet"></history-oodlet>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HistoryOodlet from '../../components/user/HistoryOodlet.vue';
  import moment from 'moment';

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
        oodlets: [],
        defaultDates: {
          from: moment().subtract(2, 'months').format('YYYY-MM-DD'),
          to: moment().format('YYYY-MM-DD')
        },
        selectedDates: {},
        range: ''
      };
    },
    computed: {
      oodler() {
        return this.$store.getters.oodler;
      },
      appInitialized() {
        return this.$store.getters.appInitialized;
      }
    },
    watch: {
      appInitialized() {
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
          office: this.oodler.office
        };
        this.$http.get('/oodlet', { params })
          .then(response => {
            this.oodlets = response.body
              .sort((prev, next) => next.dueDate.getTime() - prev.dueDate.getTime());
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
      if (this.$store.getters.oodler.scope === 'admin') {
        this.$router.replace({ path: '/admin' });
      }
    },
    mounted() {
      this.range = `${this.defaultDates.from} to ${this.defaultDates.to}`;
    },
    components: {
      HistoryOodlet
    }
  };
</script>

<style lang="scss" scoped>
  #historyView {
    .page-header {
      margin: 0 0 10px;

      h1,
      .form-group {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }

    ul.oodlets-list {
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
