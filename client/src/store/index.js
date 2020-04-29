import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import alert from './alerts';
import pilot from './pilot';
import gamepad from './gamepad';
import base from './base';
import engineer from './engineer';
import scientist from './scientist';
import medic from './medic';

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  modules: {
    pilot, alert, gamepad, base, engineer, scientist, medic
  }
});
