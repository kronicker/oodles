import array from 'lodash/array';

const state = {
  id: '',
  dueDate: undefined,
  quantifiedThingies: []
};

const mutations = {
  thingyTileAdd(state, quantifiedThingy) {
    let index = array.findIndex(state.quantifiedThingies, ['id', quantifiedThingy.id]);

    if (index > -1) {
      state.quantifiedThingies[index].qty = quantifiedThingy.qty;
    }
    else {
      state.quantifiedThingies.push(quantifiedThingy);
    }
  },

  quantifiedThingyRemove(state, id) {
    let index = array.findIndex(state.quantifiedThingies, ['id', id]);
    state.quantifiedThingies.splice(index, 1);
  },

  quantifiedThingyUpdate(state, payload) {
    let index = array.findIndex(state.quantifiedThingies, ['id', payload.id]);
    state.quantifiedThingies[index].qty = payload.qty;
  },
  
  oodletSetQuantifiedThingies(state, quantifiedThingies) {
    state.quantifiedThingies = quantifiedThingies;
  },

  oodletSet(state, oodlet) {
    state.quantifiedThingies = (() => oodlet.quantifiedThingies ? oodlet.quantifiedThingies : [])();
    state.id =  oodlet.id;
    state.dueDate = oodlet.dueDate;
  },

  oodletClear(state) {
    state.quantifiedThingies = [];
    state.id = '';
    state.dueDate = undefined;
  }
};

export default {
  state,
  mutations
};
