/**
 * Created by toma on 30.09.16..
 */
import Vue from 'vue';
import Vuex from 'vuex';
import array from 'lodash/array';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oodlet: []
  },
  mutations: {
    thingyTileAdd(state, quantifiedThingy){
      let index = array.findIndex(state.oodlet, ['id', quantifiedThingy.id]);

      if (index > -1) {
        state.oodlet[index].qty += quantifiedThingy.qty;
      }
      else {
        state.oodlet.push(quantifiedThingy);
      }
    },
    quantifiedThingyRemove(state, id) {
      let index = array.findIndex(state.oodlet, ['id', id]);
      state.oodlet.splice(index, 1);
    },
    quantifiedThingyIncrement(state, id) {
      let index = array.findIndex(state.oodlet, ['id', id]);
      state.oodlet[index].qty++;
    },
    quantifiedThingyDecrement(state, id) {
      let index = array.findIndex(state.oodlet, ['id', id]);

      if(state.oodlet[index].qty === 1){
        return state.oodlet.splice(index, 1);
      }

      state.oodlet[index].qty--;
    }
  }
});