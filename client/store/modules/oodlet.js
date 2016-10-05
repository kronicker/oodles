import array from 'lodash/array'
import Vue from 'vue';

const state = {
  id: '',
  quantifiedThingies: []
}

const mutations = {
  saved(state, oodlet) {
    if(!state.id){
      console.log('Oodlet created');
      console.log(oodlet);
      return state.id = oodlet.id;
    }

    console.log('Oodlet updated');
    console.log(oodlet);
  },

  thingyTileAdd(state, quantifiedThingy) {

    let index = array.findIndex(state.quantifiedThingies, ['id', quantifiedThingy.id]);

    if (index > -1) {
      state.quantifiedThingies[index].qty += quantifiedThingy.qty;
    }
    else {
      state.quantifiedThingies.push(quantifiedThingy);
    }
  },

  quantifiedThingyRemove(state, id) {
    let index = array.findIndex(state.quantifiedThingies, ['id', id]);
    state.quantifiedThingies.splice(index, 1);
  },

  quantifiedThingyIncrement(state, id) {
    let index = array.findIndex(state.quantifiedThingies, ['id', id]);
    state.quantifiedThingies[index].qty++;
  },

  quantifiedThingyDecrement(state, id) {
    let index = array.findIndex(state.quantifiedThingies, ['id', id]);

    if(state.quantifiedThingies[index].qty === 1){
      return state.quantifiedThingies.splice(index, 1);
    }

    state.quantifiedThingies[index].qty--;
  },

  oodletReset(state) {
    state.quantifiedThingies = [];
  }
}

export default {
  state,
  mutations
}
