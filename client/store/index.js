/**
 * Created by toma on 30.09.16.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import array from 'lodash/array';

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    oodletId: '',
    quantifiedThingies: []
  },

  mutations: {
    thingyTileAdd(state, quantifiedThingy){
      let index = array.findIndex(state.quantifiedThingies, ['id', quantifiedThingy.id]);

      if (index > -1) {
        state.quantifiedThingies[index].qty += quantifiedThingy.qty;
      }
      else {
        state.quantifiedThingies.push(quantifiedThingy);
      }
    },

    quantifiedThingyRemove(state, id) {
      let index = array.findIndex(state.quantifiedThingies, ['id', id]);
      state.quantifiedThingies.splice(index, 1);
    },

    quantifiedThingyIncrement(state, id) {
      let index = array.findIndex(state.quantifiedThingies, ['id', id]);
      state.quantifiedThingies[index].qty++;
    },

    quantifiedThingyDecrement(state, id) {
      let index = array.findIndex(state.quantifiedThingies, ['id', id]);

      if(state.quantifiedThingies[index].qty === 1){
        return state.quantifiedThingies.splice(index, 1);
      }

      state.quantifiedThingies[index].qty--;
    },

    oodletSave(state) {
      if(!state.oodletId) {
        Vue.http.post('/oodlet', {
            quantifiedThingies: state.quantifiedThingies
          })
          .then((response) => {
            console.log(response.body);
            state.oodletId = response.body.id;
        });
      }
      else {
        Vue.http.put('/oodlet/'+state.oodletId,
          {
            quantifiedThingies: state.quantifiedThingies,
            // updatedAt : new Date()
          })
          .then((response)=>{
            console.log(response.body);
        });
      }
    },

    oodletReset(state) {
      state.quantifiedThingies = [];
    }
  }
});
