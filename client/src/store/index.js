import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import alert from './alerts';
import pilot from './pilot';
import gamepad from './gamepad';

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  modules: {
    pilot, alert, gamepad
  }
});
