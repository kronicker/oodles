import Vue from 'vue';

function active(oodler) {
  return Vue.http.get('/totalOodlet/active', {
    params: {
      oodlerId: oodler.id
    }
  })
  .then(response => response.body);
}

function update(totalOodlet) {
  return Vue.http.put(`/totalOodlet/${totalOodlet.id}`, {
    quantifiedThingies: totalOodlet.quantifiedThingies,
    oodletIds: totalOodlet.oodletIds
  })
  .then(response => response.body);
}

function finalize(totalOodlet) {
  return Vue.http.post(`/totalOodlet/${totalOodlet.id}`);
}

export default {
  active,
  update,
  finalize
};
