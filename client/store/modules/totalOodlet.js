/**
 * Created by toma on 09.11.16..
 */
import array from 'lodash/array';
import object from 'lodash/object';

function thingyAdd (state, quantifiedThingy) {
  let index = array.findIndex(state.quantifiedThingies, {id: quantifiedThingy.id});
  if (index > -1) {
    state.quantifiedThingies[index].qty += quantifiedThingy.qty;
  }
  else {
    state.quantifiedThingies.push({} = object.merge({}, quantifiedThingy));
  }
}

function thingyRemove (state, quantifiedThingy) {
  let index = array.findIndex(state.quantifiedThingies, {id: quantifiedThingy.id});
  if (index > -1) {
    state.quantifiedThingies[index].qty -= quantifiedThingy.qty;
    if(state.quantifiedThingies[index].qty <= 0) {
      array.remove(state.quantifiedThingies, {id: quantifiedThingy.id});
    }
  }
}

function pushOodletId(state, pendingOodlet) {
  if (array.indexOf(state.oodletIds, pendingOodlet.id) < 0) {
    state.oodletIds.push(pendingOodlet.id);
    return true;
  }
  return false;
}

function popOodletId(state, pendingOodlet) {
  if (array.indexOf(state.oodletIds, pendingOodlet.id) > -1) {
    array.pull(state.oodletIds, pendingOodlet.id);
    return true;
  }
  else {
    return false;
  }
}

const state = {
  id: '',
  quantifiedThingies: [],
  oodletIds: []
};

const mutations = {
  totalOodletSet(state, totalOodlet) {
    state.id = totalOodlet.id;
    state.quantifiedThingies = (() => totalOodlet.quantifiedThingies ? totalOodlet.quantifiedThingies : [])();
    state.oodletIds = (() => totalOodlet.oodletIds ? totalOodlet.oodletIds : [])();
  },
  
  oodletAdd(state, pendingOodlet) {
    if(pushOodletId(state, pendingOodlet)) {
      for(let quantifiedThingy of pendingOodlet.quantifiedThingies) {
        thingyAdd(state, quantifiedThingy);
      }
    }
  },
  
  oodletRemove(state, pendingOodlet) {
    if(popOodletId(state, pendingOodlet)) {
      for (let quantifiedThingy of pendingOodlet.quantifiedThingies) {
        thingyRemove(state, quantifiedThingy);
      }
    }
  },
  
  totalOodletClear(state) {
    state.quantifiedThingies = [];
    state.oodletIds = [];
    state.id = '';
  }
};

export default {
  state,
  mutations
};
