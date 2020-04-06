let log = console.log;

export default {
  state: {
    clients: {
      pilot: false,
      nav: false,
      eng_2: false,
      eng: false,
      scient: false
    },
    time: 0,
    timeMission: 4684
  },
  mutations: {
    SOCKET_reboot() {
      window.location.reload();
    },
    SOCKET_alive(state, clients) {
      state.clients = clients;
    },
    SOCKET_time(state, time) {
      state.time = time.time;
      state.timeMission = time.timeMission;
    }
  },
  actions: {},
  getters: {
    getClients(state) {
      return state.clients;
    },
    getTime(state) {
      let time = {};
      time.s = state.time % 60;
      time.h = Math.floor(state.time / 3600);
      time.m = Math.floor((state.time - time.h * 3600) / 60);
      return time
    },
    getTimeMission(state) {
      let time = {};
      time.s = state.timeMission % 60;
      time.h = Math.floor(state.timeMission / 3600);
      time.m = Math.floor((state.timeMission - time.h * 3600) / 60);
      return time
    }
  }
}
