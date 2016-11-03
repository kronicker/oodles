/**
 * Created by toma on 03.11.16..
 */
const state = {
  initialized: false
};

const mutations = {
  storeInitialized(state) {
    state.initialized = true;
  },

  storeUninitialized(state) {
    state.initialized = false;
  }
};

export default {
  state,
  mutations
};
