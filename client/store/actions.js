import oodletApi from './api/oodlet';

function initStore({ commit }, oodler) {
  commit('oodlerSave', oodler);
  commit('storeInitialized', oodler);
}

function clearStore({ commit }) {
  commit('oodlerClear');
  commit('oodletClear');
  commit('storeUninitialized');
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

export {
  initStore,
  clearStore,
  thingyTileAdd,
  quantifiedThingyChange,
  oodletSet,
  oodletReset
};
