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
  commit('thingyTileAdd', quantifiedThingy);

  oodletApi.update(state.oodlet).then(response => {
    commit('oodletSet', response.body);
  });
}

function quantifiedThingyChange({ commit, state }, payload) {
  if (payload.qty === 0) {
    commit('quantifiedThingyRemove', payload.id);
  }
  else {
    commit('quantifiedThingyUpdate', payload);
  }

  oodletApi.update(state.oodlet).then(response => {
    commit('oodletSet', response.body);
  });
}

function historyOodletLoad({ commit, state }, historyOodlet) {
  oodletApi.update({
      id: state.oodlet.id,
      quantifiedThingies: historyOodlet.quantifiedThingies
    })
    .then(response => {
      commit('oodletSet', response.body);
    });
}

function oodletLoad({ commit, state }) {
  oodletApi.active(state.oodler.oodler).then(response => {
    commit('oodletSet', response.body);
  });
}

function oodletReset({ commit, state }) {
  oodletApi.update({
      id: state.oodlet.id,
      quantifiedThingies: []
    })
    .then(response => {
      commit('oodletSet', response.body);
    });
}

function totalOodletLoad({ commit, state }) {
  totalOodletApi.active(state.oodler.oodler).then(response => {
    commit('totalOodletSet', response.body);
    
    oodletApi.pending().then(response => {
      commit('pendingOodletsSet', response.body);
      
      for(let pendingOodlet of response.body) {
        commit('oodletAdd', pendingOodlet);
      }
      totalOodletApi.update(state.totalOodlet);
    });
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
  totalOodletApi.update(state.totalOodlet).then(response => {
    commit('totalOodletSet', response.body)
  });
}

function pendingOodletRemove({ commit, state }, pendingOodlet) {
  commit('oodletRemove', pendingOodlet);
  totalOodletApi.update(state.totalOodlet).then(response => {
    commit('totalOodletSet', response.body)
  });
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
