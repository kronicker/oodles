import oodletApi from './api/oodlet';
import historyOodletApi from './api/historyOodlet';

function initStore({ commit }, oodler) {
  commit('oodlerSave', oodler);
  historyOodletApi.load(oodler.office)
    .then(response => {
      commit('historyOodletsLoad', response.body);
    });
}

function clearStore({ commit }) {
  commit('oodlerClear');
  commit('oodletClear');
  commit('historyOodletsClear');
}

function thingyTileAdd({ commit, state }, quantifiedThingy) {
  commit('thingyTileAdd', quantifiedThingy);

  oodletApi.save(state.oodlet, state.oodler).then(response => {
    commit('oodletSave', response.body);
  });
}

function quantifiedThingyChange({ commit, state }, payload) {
  if (payload.qty === 0) {
    commit('quantifiedThingyRemove', payload.id);
  }
  else {
    commit('quantifiedThingyUpdate', payload);
  }

  oodletApi.save(state.oodlet, state.oodler).then(response => {
    commit('oodletSave', response.body);
  });
}

function oodletSet({ commit, state }, quantifiedThingies) {
  commit('oodletSet', quantifiedThingies);

  oodletApi.save(state.oodlet, state.oodler).then(response => {
    commit('oodletSave', response.body);
  });
}

function oodletReset({ commit, state }) {
  commit('oodletReset');

  oodletApi.save(state.oodlet, state.oodler).then(response => {
    commit('oodletSave', response.body);
  });
}

function historyOodletsLoad({commit, state}, payload) {
  historyOodletApi.load(state.oodler.oodler.office, payload.fromDate, payload.toDate)
    .then(response => {
      commit('historyOodletsLoad', response.body);
    });
}

export {
  initStore,
  clearStore,
  thingyTileAdd,
  quantifiedThingyChange,
  oodletSet,
  oodletReset,
  historyOodletsLoad
};
