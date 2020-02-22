export default {
  state: {
    generalGamepad: {}
  },
  mutations: {
    SOCKET_changeGamepad(state, data) {
      state.generalGamepad = data
      // console.log(data)
    }
  },
  actions: {},
  getters: {
    get_gamepad(state) {
      // console.log(state.generalGamepad)
      return state.generalGamepad
    }
  }
}
