/**
 * Created by toma on 02.11.16..
 */
import Vue from 'vue';

function load(office, fromDate, toDate) {
  return Vue.http.get('/oodlet', {
    params: {
      fromDate: fromDate,
      toDate: toDate,
      office: office
    }});
}

export default {
  load
};
