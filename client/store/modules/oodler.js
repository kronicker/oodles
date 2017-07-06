const state = {
  oodler: {}
};

const mutations = {
  oodlerSave(_state, oodler) {
    _state.oodler = oodler;
  },

  oodlerClear(_state) {
    _state.oodler = {};
  }
};

export default {
  state,
  mutations
};
