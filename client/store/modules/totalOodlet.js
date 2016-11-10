/**
 * Created by toma on 09.11.16..
 */
import array from 'lodash/array';

function thingyAdd (state, quantifiedThingy) {
  let index = array.findIndex(state.quantifiedThingies, {id: quantifiedThingy.id});
  console.log('index  ' + index);
  if (index > -1) {
    state.quantifiedThingies[index].qty += quantifiedThingy.qty;
  }
  else {
    state.quantifiedThingies.push(quantifiedThingy);
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

function addOodlet(state, pendingOodlet) {
  if (array.indexOf(state.oodletIds, pendingOodlet.id) < 0) {
    state.oodletIds.push(pendingOodlet.id);
    return true;
  }
  return false;
}

function removeOoodlet(state, pendingOodlet) {
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
    state.quantifiedThingies = (() => { return totalOodlet.quantifiedThingies ? totalOodlet.quantifiedThingies : [];})();
    state.oodletIds = (() => { return totalOodlet.oodletIds ? totalOodlet.oodletIds : [];})();
  },
  
  oodletAdd(state, pendingOodlet) {
    if(addOodlet(state, pendingOodlet)) {
      for(let quantifiedThingy of pendingOodlet.quantifiedThingies) {
        console.log(quantifiedThingy.name + '    ' + quantifiedThingy.qty)
        thingyAdd(state, quantifiedThingy);
      }
    }
  },
  
  oodletRemove(state, pendingOodlet) {
    if(removeOoodlet(state, pendingOodlet)) {
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
