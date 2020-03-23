let log = console.log;

export default {
  state: {
    clients: {
      pilot: false,
      nav: false,
      eng_2: false
    }
  },
  mutations: {
    SOCKET_reboot() {
      window.location.reload();
    },
    SOCKET_alive(state, clients) {
      state.clients = clients;
    }
  },
  actions: {},
  getters: {
    getClients(state) {
      log(state.clients)
      return state.clients;
    }
  }
}
