import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import orbit from './orbit';

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  modules: {
    orbit
  }
});
