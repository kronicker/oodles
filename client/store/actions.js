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

function historyOodletLoad({ commit, state }, oodlet) {
  commit('oodletSetQuantifiedThingies', oodlet.quantifiedThingies);
  
  oodletApi.update(state.oodlet).then(response => {
    commit('oodletSet', response.body);
  });
}

function oodletLoad({ commit, state }) {
  oodletApi.load(state.oodler.oodler).then(response => {
    commit('oodletSet', response.body);
  });
}

function oodletReset({ commit, state }) {
  commit('oodletReset');

  oodletApi.update(state.oodlet).then(response => {
    commit('oodletSet', response.body);
  });
}

function totalOodletLoad({ commit, state }) {
  totalOodletApi.load(state.oodler.oodler).then(response => {
    commit('totalOodletSet', response.body);
    
    oodletApi.pending().then(response => {
      commit('pendingOodletsSet', response.body);
      
      console.log(state.totalOodlet.oodletIds);
      
      for(let pendingOodlet of response.body) {
        console.log('Action '+pendingOodlet.id);
        commit('oodletAdd', pendingOodlet);
      }
      totalOodletApi.update(state.totalOodlet);
    });
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
  pendingOodletAdd,
  pendingOodletRemove
};
