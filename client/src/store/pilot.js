export default {
  state: {
    orbit: {
      scale: 1,
      center: {
        cx: 0,
        cy: 0
      },
      planets: [
        {
          name: 'Proxima A',
          a: 150, // большая полуось
          b: 150, // малая полуось
          F: -20, // наклон
          P: 0,
          w: 180, // угол относительно центра (изменяется по интервалу)
          v: 0, // скорость (считает автоматом)
          W_speed: 0, // угловая скорость  (считает автоматом)
          h: 0, // высота  (считает автоматом)
          shift: 0 // смещение (считает автоматом)
        }
      ],
      ship: {
        name: 'Aurora',
        a: 7300000, // большая полуось
        b: 6000000, // малая полуось
        F: -47, // наклон
        P: 0,
        w: 70, // угол относительно центра (изменяется по интервалу)
        v: 10000, // скорость (устанавливаем)
        W_speed: 0, // угловая скорость  (считает автоматом)
        cxs: 0, // центр орбиты корабля по х
        cys: 1080 // центр орбиты корабля по у
      }
    },
    difficult: 5
  },
  mutations: {
    SOCKET_changePlanet(state, data) {
      state.orbit = data.orbit;
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
      return state.orbit.planets;
    },
    get_scale (state) {
      return state.orbit.scale;
    },
    get_ship_orbit (state) {
      return state.orbit.ship
    },
    difficult (state) {
      return state.difficult;
    }
  }
}
