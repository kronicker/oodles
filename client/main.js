import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueResource from 'vue-resource';
import FlatPickr from 'vue-flatpickr-component';

import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';

Vue.use(FlatPickr);
Vue.use(VueResource);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  router,
  render: h => h(App)
});
