import oodletApi from './api/oodlet';

function thingyTileAdd({ commit, state }, quantifiedThingy) {
  commit('thingyTileAdd', quantifiedThingy);

  oodletApi.save(state.oodlet).then(response => {
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

  oodletApi.save(state.oodlet).then(response => {
    commit('oodletSave', response.body);
  });
}

function oodletReset({ commit, state }) {
  commit('oodletReset');

  oodletApi.save(state.oodlet).then(response => {
    commit('oodletSave', response.body);
  });
}

export {
  thingyTileAdd,
  quantifiedThingyChange,
  oodletReset
};
