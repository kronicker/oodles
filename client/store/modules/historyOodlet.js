/**
 * Created by toma on 02.11.16..
 */

const state = {
  historyOodlets: []
};

const mutations = {
  historyOodletsLoad(state, historyOodlets) {
    state.historyOodlets = historyOodlets;
  },

  historyOodletsClear(state) {
    state.historyOodlets = [];
  },
};

export default {
  state,
  mutations
};