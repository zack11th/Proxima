// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

import {url} from './store/server.config'

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: false,
  connection: url,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
