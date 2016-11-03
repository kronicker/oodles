/**
 * Created by toma on 30.09.16.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import app from './modules/app';
import oodlet from './modules/oodlet';
import oodler from './modules/oodler';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    app,
    oodlet,
    oodler
  }
});
