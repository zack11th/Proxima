import axios from 'axios'
import {url} from './server.config'

export default {
  state: {
    alertPilot: {
    }

  },
  mutations: {
    SOCKET_pilotAlert(state, data) {
      state.alertPilot = data;
    },
    clearAlert(state, socket) {
      state.alertPilot = {};
      socket.emit('alertPilot', state.alertPilot);
    },
    setAlert(state, data) {
      state.alertPilot = data
    }

  },
  actions: {
  },
  getters: {
    alertPilot(state) {
      return state.alertPilot
    }
  }
}
