/**
 * Created by toma on 05.10.16..
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import OodletView from '../views/user/OodletView.vue';
import HistoryView from '../views/user/HistoryView.vue';
import SettingsView from '../views/common/SettingsView.vue';
import LoginView from '../views/common/LoginView.vue';
import NewPasswordView from '../views/common/NewPasswordView.vue';
import ResetPasswordView from '../views/common/ResetPasswordView.vue';
import TotalOodletView from '../views/admin/TotalOodletView.vue';
import AdminHistoryView from '../views/admin/AdminHistoryView.vue';
import ThingiesView from '../views/admin/ThingiesView.vue';
import OodlersView from '../views/admin/OodlersView.vue';

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
    component: AdminHistoryView
  },
  {
    path: '/admin/history',
    component: AdminHistoryView
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
