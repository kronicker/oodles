/**
 * Created by toma on 09.11.16..
 */
/**
 * Created by toma on 09.11.16..
 */

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
