import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import general from './general';
import pilot from './pilot';

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  modules: {
    pilot, general
  }
});
