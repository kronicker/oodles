import find from 'lodash/find';
import pull from 'lodash/pull';
import remove from 'lodash/remove';

function addThingy(state, quantifiedThingy) {
  const thingy = find(state.quantifiedThingies, ['id', quantifiedThingy.id]);
  if (thingy) {
    thingy.qty += quantifiedThingy.qty;
    return;
  }
  state.quantifiedThingies.push(Object.assign({}, quantifiedThingy));
}

function removeThingy(state, quantifiedThingy) {
  const thingy = find(state.quantifiedThingies, ['id', quantifiedThingy.id]);
  if (thingy) {
    thingy.qty -= quantifiedThingy.qty;
    return;
  }
  remove(state.quantifiedThingies, ['id', quantifiedThingy.id]);
}

const state = {
  id: '',
  quantifiedThingies: [],
  oodletIds: []
};

const mutations = {
  totalOodletSet(_state, totalOodlet) {
    _state.id = totalOodlet.id;
    _state.quantifiedThingies = totalOodlet.quantifiedThingies || [];
    _state.oodletIds = totalOodlet.oodletIds || [];
  },

  oodletAdd(_state, pendingOodlet) {
    if (_state.oodletIds.includes(pendingOodlet.id)) {
      return;
    }

    _state.oodletIds.push(pendingOodlet.id);
    if (pendingOodlet.quantifiedThingies) {
      pendingOodlet.quantifiedThingies.forEach(thingy => addThingy(_state, thingy));
    }
  },

  oodletRemove(_state, pendingOodlet) {
    if (!_state.oodletIds.includes(pendingOodlet.id)) {
      return;
    }

    pull(_state.oodletIds, pendingOodlet.id);
    if (pendingOodlet.quantifiedThingies) {
      pendingOodlet.quantifiedThingies.forEach(thingy => removeThingy(_state, thingy));
    }
  },

  totalOodletClear(_state) {
    _state.quantifiedThingies = [];
    _state.oodletIds = [];
    _state.id = '';
  }
};

export default {
  state,
  mutations
};
