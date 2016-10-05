/**
 * Created by toma on 05.10.16..
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import OodletView from '../views/OodletView.vue';
import HistoryView from '../views/HistoryView.vue';
import SettingsView from '../views/SettingsView.vue';

const routes = [
  { path: '/oodletview', component: OodletView },
  { path: '/historyview', component: HistoryView },
  { path: '/settingsview', component: SettingsView }
];

export default new VueRouter({
  routes
});