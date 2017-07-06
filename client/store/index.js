import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import app from './modules/app';
import oodlet from './modules/oodlet';
import oodler from './modules/oodler';
import pendingOodlets from './modules/pendingOodlets';
import totalOodlet from './modules/totalOodlet';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    app,
    oodlet,
    oodler,
    pendingOodlets,
    totalOodlet
  }
});
