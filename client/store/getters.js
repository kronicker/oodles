import sortBy from 'lodash/sortBy';

export const id = state => state.oodlet.id;

export const dueDate = state => state.oodlet.dueDate;

export const quantifiedThingies = state => state.oodlet.quantifiedThingies;

export const oodler = state => state.oodler.oodler;

export const appInitialized = state => state.app.initialized;

export const pendingOodlets = state => sortBy(state.pendingOodlets.pendingOodlets, 'oodler.office');

export const totalOodlet = state => state.totalOodlet;

export function totalOodletOffices(state) {
  return state.pendingOodlets.pendingOodlets
    .filter(oodlet => state.totalOodlet.oodletIds.includes(oodlet.id))
    .map(oodlet => oodlet.oodler.office)
    .sort();
}
