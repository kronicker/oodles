const state = {
  pendingOodlets: []
};

const mutations = {
  pendingOodletsSet(_state, pendingOodlets) {
    _state.pendingOodlets = pendingOodlets;
  },
  pendingOodletClear(_state) {
    _state.pendingOodlets = [];
  }
};

export default {
  state,
  mutations
};
