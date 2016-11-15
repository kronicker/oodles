const state = {
  pendingOodlets: []
};

const mutations = {
  pendingOodletsSet(state, pendingOodlets) {
    state.pendingOodlets = pendingOodlets;
  },
  pendingOodletClear(state) {
    state.pendingOodlets = [];
  }
};

export default {
  state,
  mutations
};
