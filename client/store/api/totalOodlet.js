/**
 * Created by toma on 09.11.16..
 */
import Vue from 'vue';

function active(oodler) {
  return Vue.http.get('/totalOodlet/active', {
    params: {
      oodlerId: oodler.id
    }
  });
}

function update(totalOodlet) {
  return Vue.http.put('/totalOodlet/' + totalOodlet.id, {
    quantifiedThingies: totalOodlet.quantifiedThingies,
    oodletIds: totalOodlet.oodletIds
  });
}

function finalize(totalOodlet) {
  return Vue.http.post('/totalOodlet/' + totalOodlet.id);
}

export default {
  active,
  update,
  finalize
};
