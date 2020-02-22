import axios from 'axios'
import {url} from './server.config'

export default {
  state: {
    alertPilot: {},
    alertEng: {},
    alertMedic: {},
    alertCommand: {},
    alertGeneral: {}
  },
  mutations: {
    SOCKET_alertPilot(state, data) {
      state.alertPilot = data;
    },
    SOCKET_alertEng(state, data) {
      state.alertEng = data;
    },
    SOCKET_alertMedic(state, data) {
      state.alertMedic = data;
    },
    SOCKET_alertCommand(state, data) {
      state.alertCommand = data;
    },
    SOCKET_alertGeneral(state, data) {
      state.alertGeneral = data;
    },
    clearAlert(state, data) {
      state[data.alert] = {};
      data.socket.emit('alert', {event: data.alert, alert: state[data.alert]});
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
    },
    alertEng(state) {
      return state.alertEng
    },
    alertMedic(state) {
      return state.alertMedic
    },
    alertCommand(state) {
      return state.alertCommand
    },
    alertGeneral(state) {
      return state.alertGeneral
    }
  }
}
