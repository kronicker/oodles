/**
 * Created by toma on 17.10.16..
 */
const state = {
  oodler: {}
};

const mutations = {
  oodlerSave(state, oodler) {
    state.oodler = oodler;
  },

  oodlerClear(state) {
    state.oodler = {};
  }
};

export default {
  state,
  mutations
};
