import Vue from 'vue';

function active(oodler) {
  return Vue.http.get('/oodlet/active', {
    params: {
      oodlerId: oodler.id,
      office: oodler.office
    }
  });
}

function pending() {
  return Vue.http.get('/oodlet/pending');
}

function update(oodlet) {
  return Vue.http.put('/oodlet/' + oodlet.id, {
      quantifiedThingies: oodlet.quantifiedThingies
    });
}

export default {
  active,
  update,
  pending
};

