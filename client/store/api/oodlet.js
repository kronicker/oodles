import Vue from 'vue';

function save(oodlet, oodler) {
  if(!oodlet.id) {
    return Vue.http.post('/oodlet', {
        quantifiedThingies: oodlet.quantifiedThingies,
        oodlerId: oodler.oodler.id
      });
  }

  return Vue.http.put('/oodlet/' + oodlet.id, {
      quantifiedThingies: oodlet.quantifiedThingies
    });
}

export default {
  save
};

