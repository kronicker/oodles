import Vue from 'vue';

function load(oodler) {
  return Vue.http.get('/oodlet/active', {
    params: {
      oodlerId: oodler.id,
      office: oodler.office
    }
  });
}

function update(oodlet) {
  return Vue.http.put('/oodlet/' + oodlet.id, {
      quantifiedThingies: oodlet.quantifiedThingies
    });
}

export default {
  load,
  update
};

