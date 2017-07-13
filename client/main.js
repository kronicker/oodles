import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueResource from 'vue-resource';
import VueFlatpickr from 'vue-flatpickr';
import 'vue-flatpickr/theme/dark.css';

Vue.use(VueResource);
Vue.use(VueFlatpickr);

module.exports = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
