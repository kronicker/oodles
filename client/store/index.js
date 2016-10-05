/**
 * Created by toma on 30.09.16.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters'
import oodlet from './modules/oodlet'

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    oodlet
  }
});
