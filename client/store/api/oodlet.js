import Vue from 'vue';

function active(oodler) {
  return Vue.http.get('/oodlet/active', {
    params: {
      office: oodler.office
    }
  })
  .then(response => response.body);
}

function pending() {
  return Vue.http.get('/oodlet/pending')
    .then(response => response.body);
}

function update(oodlet) {
  return Vue.http.put(`/oodlet/${oodlet.id}`, {
    quantifiedThingies: oodlet.quantifiedThingies
  })
  .then(response => response.body);
}

export default {
  active,
  update,
  pending
};

