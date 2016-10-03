/**
 * Created by toma on 30.09.16..
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oodlet: {}
  },
  mutations:{
    thingyTileAdd(state, oodletThingy){
      if (state.oodlet[oodletThingy.thingy.id]) {
        Vue.set(state.oodlet[oodletThingy.thingy.id], 'qty', state.oodlet[oodletThingy.thingy.id].qty + oodletThingy.qty);
        console.log(state.oodlet[oodletThingy.thingy.id].qty);
       }
       else {
        Vue.set(state.oodlet, oodletThingy.thingy.id, oodletThingy);
       }
    },
    oodletThingyRemoved(state, id) {
      Vue.delete(state.oodlet, id);
    },
    incrementOodletThingy(state, id) {
      Vue.set(state.oodlet[id], 'qty', state.oodlet[id].qty+1);
    },
    decrementOodletThingy(state, id) {
      Vue.set(state.oodlet[id], 'qty', state.oodlet[id].qty-1);
    }
  }
});