import axios from 'axios'
import {url} from './server.config'

export default {
  state: {
    planet: {}
  },
  mutations: {
    set_planet (state, payload) {
      state.planet = payload.data.planet;
      // console.warn(payload.data.planet)
    }
  },
  actions: {
    GET_CANVAS ({commit}, data) {
      axios.post(`${url}/api/orbit/canvas`, data).then(result => {
        commit('set_planet', result);
      }, error => {console.error('ОШИБКА!!!', error)});
    },
    GET_PLANET ({commit}) {
      axios.get(`${url}/api/orbit/planet`).then(result => {
        commit('set_planet', result);
        // console.log(result)
      }, error => {console.error('ОШИБКА!!!', error)});
    },
    SET_PLANET ({commit}, planet) {
      axios.post(`${url}/api/orbit/planet`, planet).then(result => {
        commit('set_planet', result);
        // console.log(result)
      }, error => {console.error('ОШИБКА!!!', error)});
    }
  },
  getters: {
    get_planet (state) {
      // console.log(state.planet)
      return state.planet;
    }
  }
}
