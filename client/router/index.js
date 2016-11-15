/**
 * Created by toma on 05.10.16..
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import OodletView from '../views/OodletView.vue';
import HistoryView from '../views/HistoryView.vue';
import SettingsView from '../views/SettingsView.vue';
import LoginView from '../views/LoginView.vue';
import NewPasswordView from '../views/NewPasswordView.vue';
import ResetPasswordView from '../views/ResetPasswordView.vue';
import TotalOodletView from '../views/TotalOodletView.vue';
import TotalOodletHistoryView from '../views/TotalOodletHistoryView.vue';
import ThingiesView from '../views/ThingiesView.vue';
import OodlersView from '../views/OodlersView.vue';

const routes = [
  {
    path: '/',
    component: OodletView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/history',
    component: HistoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    component: SettingsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/password/new',
    component: NewPasswordView
  },
  {
    path: '/password/reset',
    component: ResetPasswordView
  },
  {
    path: '/admin/',
    component: TotalOodletView
  },
  {
    path: '/admin/history',
    component: TotalOodletHistoryView
  },
  {
    path: '/admin/thingies',
    component: ThingiesView
  },
  {
    path: '/admin/oodlers',
    component: OodlersView
  }
];

export default new VueRouter({
  routes
});
