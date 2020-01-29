import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import general from './general';
import orbit from './orbit';

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  modules: {
    orbit, general
  }
});
