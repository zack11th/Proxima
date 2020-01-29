import axios from 'axios'
import {url} from './server.config'

export default {
  state: {

  },
  mutations: {

  },
  actions: {
    START_LARP () {
      axios.get(`${url}/api/orbit/start`);
    }
  },
  getters: {

  }
}
