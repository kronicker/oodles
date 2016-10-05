import oodletApi from './api/oodlet'

function thingyTileAdd({ commit, state }, quantifiedThingy) {
  commit('thingyTileAdd', quantifiedThingy);

  oodletApi.save(state.oodlet).then(response => {
    commit('saved', response.body);
  })
}

export default {
  thingyTileAdd
}
