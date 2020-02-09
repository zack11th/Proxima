export default {
  state: {
    planet: {
      angle: Math.PI / 2.4,
      center: {
        x: 0,
        y: 0
      },
      orbitRadius: 170,
      radius: 10,
      orbitSpeed: 0.01
    },
    difficult: 5
  },
  mutations: {
    SOCKET_changePlanet(state, data) {
      state.planet = data.planet;
    }
  },
  actions: {
    // GET_CANVAS ({commit}, data) {
    //   axios.post(`${url}/api/orbit/canvas`, data).then(result => {
    //     commit('set_planet', result);
    //   }, error => {console.error('ОШИБКА!!!', error)});
    // },
    // GET_PLANET ({commit}) {
    //   axios.get(`${url}/api/orbit/planet`).then(result => {
    //     commit('set_planet', result);
    //     // console.log(result)
    //   }, error => {console.error('ОШИБКА!!!', error)});
    // },
    // SET_PLANET ({commit}, planet) {
    //   axios.post(`${url}/api/orbit/planet`, planet).then(result => {
    //     commit('set_planet', result);
    //     // console.log(result)
    //   }, error => {console.error('ОШИБКА!!!', error)});
    // }
  },
  getters: {
    get_planet (state) {
      // console.log(state.planet)
      return state.planet;
    },
    difficult (state) {
      return state.difficult;
    }
  }
}
