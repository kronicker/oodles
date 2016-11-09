/**
 * Created by toma on 09.11.16..
 */
import array from 'lodash/array';

const state = {
  id: '',
  quantifiedThingies: [],
  oodletIds: []
};

const mutations = {
  // quantifiedThingyRemove(state, id) {
  //   let index = array.findIndex(state.quantifiedThingies, ['id', id]);
  //   state.quantifiedThingies.splice(index, 1);
  // },
  //
  // quantifiedThingySubtract(state, payload) {
  //   let index = array.findIndex(state.quantifiedThingies, ['id', payload.id]);
  //   state.quantifiedThingies.qty -= payload.qty;
  // },
  //
  // quantifiedThingyAdd(state, payload) {
  //   let index = array.findIndex(state.quantifiedThingies, ['id', payload.id]);
  //   state.quantifiedThingies[index].qty += payload.qty;
  // },

  totalOodletSet(state, totalOodlet) {
    state.id = totalOodlet.id;
    state.quantifiedThingies = totalOodlet.quantifiedThingies;
    state.oodletIds = totalOodlet.oodletIds;
  },
  
  pendingOodletAdd(state, pendingOodlet) {
  }
};

export default {
  state,
  mutations
};
