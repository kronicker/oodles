const state = {
  initialized: false
};

const mutations = {
  storeInitialized(_state) {
    _state.initialized = true;
  },

  storeUninitialized(_state) {
    _state.initialized = false;
  }
};

export default {
  state,
  mutations
};
