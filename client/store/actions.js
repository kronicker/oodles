import oodletApi from './api/oodlet';
import totalOodletApi from './api/totalOodlet';

function initStore({ commit }, oodler) {
  commit('oodlerSave', oodler);
  commit('storeInitialized', oodler);
}

function clearStore({ commit }) {
  commit('oodlerClear');
  commit('oodletClear');
  commit('totalOodletClear');
  commit('pendingOodletClear');
  commit('storeUninitialized');
}

function thingyTileAdd({ commit, state }, quantifiedThingy) {
  if (!state.oodlet.id) {
    return;
  }

  commit('thingyTileAdd', quantifiedThingy);
  oodletApi.update(state.oodlet).then(oodlet => {
    commit('oodletSet', oodlet);
  });
}

function quantifiedThingyChange({ commit, state }, payload) {
  if (!state.oodlet.id) {
    return;
  }

  if (payload.qty === 0) {
    commit('quantifiedThingyRemove', payload.id);
    return;
  }

  commit('quantifiedThingyUpdate', payload);
  oodletApi.update(state.oodlet).then(oodlet => {
    commit('oodletSet', oodlet);
  });
}

function historyOodletLoad({ commit, state }, historyOodlet) {
  if (!state.oodlet.id) {
    return;
  }

  oodletApi.update({
    id: state.oodlet.id,
    quantifiedThingies: historyOodlet.quantifiedThingies
  }).then(oodlet => {
    commit('oodletSet', oodlet);
  });
}

function oodletLoad({ commit, state }) {
  oodletApi.active(state.oodler.oodler).then(oodlet => commit('oodletSet', oodlet));
}

function oodletReset({ commit, state }) {
  if (!state.oodlet.id) {
    return;
  }

  oodletApi.update({
    id: state.oodlet.id,
    quantifiedThingies: []
  }).then(response => {
    commit('oodletSet', response.body);
  });
}

function totalOodletLoad({ commit, state }) {
  totalOodletApi.active(state.oodler.oodler)
    .then(totalOodlet => commit('totalOodletSet', totalOodlet))
    .then(() => oodletApi.pending())
    .then(pendingOodles => {
      commit('pendingOodletsSet', pendingOodles);
      pendingOodles.forEach(pendingOodlet => commit('oodletAdd', pendingOodlet));
      totalOodletApi.update(state.totalOodlet);
    });
}

function totalOodletFinalize({ commit, state }) {
  totalOodletApi.finalize(state.totalOodlet).then(() => {
    commit('totalOodletClear');
    commit('pendingOodletClear');
    totalOodletLoad({ commit, state });
  });
}

function pendingOodletAdd({ commit, state }, pendingOodlet) {
  commit('oodletAdd', pendingOodlet);
  totalOodletApi.update(state.totalOodlet)
    .then(totalOodlet => commit('totalOodletSet', totalOodlet));
}

function pendingOodletRemove({ commit, state }, pendingOodlet) {
  commit('oodletRemove', pendingOodlet);
  totalOodletApi.update(state.totalOodlet).then(totalOodlet => commit('totalOodletSet', totalOodlet));
}

export {
  initStore,
  clearStore,
  thingyTileAdd,
  quantifiedThingyChange,
  historyOodletLoad,
  oodletLoad,
  oodletReset,
  totalOodletLoad,
  totalOodletFinalize,
  pendingOodletAdd,
  pendingOodletRemove
};
