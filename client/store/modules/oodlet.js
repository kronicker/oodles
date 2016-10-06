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

  quantifiedThingyUpdate(state, payload) {
    let index = array.findIndex(state.quantifiedThingies, ['id', payload.id]);
    state.quantifiedThingies[index].qty = payload.qty;
  },

  oodletSave(state, oodlet) {
    if(!state.id){
      console.log('Oodlet created');
      console.log(oodlet);
      state.dueDate = oodlet.dueDate;
      return state.id = oodlet.id;
    }

    console.log('Oodlet updated');
    console.log(oodlet);
  },

  oodletReset(state) {
    state.quantifiedThingies = [];
  }
};

export default {
  state,
  mutations
};
