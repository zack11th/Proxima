import axios from 'axios'
import {url} from './server.config'

export default {
  state: {

  },
  mutations: {
    SOCKET_startLarpON(state, data) {
      console.log(data);
    },
    SOCKET_return(state, entity) {
      console.log(entity)
    }

  },
  actions: {
    SOCKET_startLarp(ctx, data) {
      console.log('Message received', data);
    },
    START_LARP () {
      axios.get(`${url}/api/orbit/start`);
    }
  },
  getters: {

  }
}
