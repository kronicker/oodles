// /**
//  * Created by toma on 09.11.16..
//  */
// import array from 'lodash/array';
//
// const state = {
//   id: '',
//   quantifiedThingies: [],
//   oodletIds: []
// };
//
// const mutations = {
//   thingyTileAdd(state, quantifiedThingy) {
//     let index = array.findIndex(state.quantifiedThingies, ['id', quantifiedThingy.id]);
//
//     if (index > -1) {
//       state.quantifiedThingies[index].qty = quantifiedThingy.qty;
//     }
//     else {
//       state.quantifiedThingies.push(quantifiedThingy);
//     }
//   },
//
//   quantifiedThingyRemove(state, id) {
//     let index = array.findIndex(state.quantifiedThingies, ['id', id]);
//     state.quantifiedThingies.splice(index, 1);
//   },
//
//   quantifiedThingyUpdate(state, payload) {
//     let index = array.findIndex(state.quantifiedThingies, ['id', payload.id]);
//     state.quantifiedThingies[index].qty = payload.qty;
//   },
//
//   oodletSave(state, oodlet) {
//     if(!state.id) {
//       state.dueDate = oodlet.dueDate;
//       return state.id = oodlet.id;
//     }
//   },
//
//   oodletSet(state, quantifiedThingies) {
//     state.quantifiedThingies = quantifiedThingies;
//   },
//
//   oodletReset(state) {
//     state.quantifiedThingies = [];
//   },
//
//   oodletClear(state) {
//     state.quantifiedThingies = [];
//     state.id = '';
//     state.dueDate = undefined;
//   }
// };
//
// export default {
//   state,
//   mutations
// };
