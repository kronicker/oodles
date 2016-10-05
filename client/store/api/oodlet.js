import Vue from 'vue';

function save(oodlet) {
  if(!oodlet.id) {
    return Vue.http.post('/oodlet', {
        quantifiedThingies: oodlet.quantifiedThingies
      });
  }

  return Vue.http.put('/oodlet/' + oodlet.id, {
      quantifiedThingies: oodlet.quantifiedThingies
    });
}

export default {
  save
}

