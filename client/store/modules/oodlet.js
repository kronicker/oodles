import find from 'lodash/find';
import remove from 'lodash/remove';

const state = {
  id: '',
  dueDate: null,
  quantifiedThingies: []
};

const mutations = {
  thingyTileAdd(_state, quantifiedThingy) {
    const thingy = find(_state.quantifiedThingies, ['id', quantifiedThingy.id]);

    if (thingy) {
      thingy.qty = quantifiedThingy.qty;
      return;
    }

    _state.quantifiedThingies.push(quantifiedThingy);
  },

  quantifiedThingyRemove(_state, id) {
    remove(_state.quantifiedThingies, ['id', id]);
  },

  quantifiedThingyUpdate(_state, payload) {
    const thingy = find(_state.quantifiedThingies, ['id', payload.id]);
    thingy.qty = payload.qty;
  },

  oodletSetQuantifiedThingies(_state, quantifiedThingies) {
    _state.quantifiedThingies = quantifiedThingies;
  },

  oodletSet(_state, oodlet) {
    _state.quantifiedThingies = oodlet.quantifiedThingies || [];
    _state.id = oodlet.id;
    _state.dueDate = oodlet.dueDate;
  },

  oodletClear(_state) {
    _state.quantifiedThingies = [];
    _state.id = '';
    _state.dueDate = null;
  }
};

export default {
  state,
  mutations
};
