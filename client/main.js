import Vue from 'vue';
import App from './App.vue';
import OodletView from './views/OodletView.vue';

new Vue({
  el: '#app',
  render: h => h(App),
  
  components: {
    'oodlet-view': OodletView
  }
});
