export default {
  state: {
    orbit: {
      landing: false, // флаг начала приземления Авроры
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
          shift: 0, // смещение (считает автоматом)
          K_speed: 1 // коэффициент для корректировки скорости
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
        cys: 1080, // центр орбиты корабля по у
        K_speed: 1, // коэффициент для корректировки скорости
        delta_nuclear: 0 // изменение тяги ядерного двигателя для изменения орбиты корабля
      }
    },
    navigator: {
      difficult: 5,
      nuclear: {
        darkMater: false,
        button_1: false,
        button_2: false,
        thrust: 0
      },
      manevr: {
        button_1: false,
        button_2: false,
        thrust: 0
      },
      alarm: {
        speed: false,
        temperature: false
      },
      speedSurface: 0,
      roll: 0,
      rollOptimal: [0, 180],
      temperature: 0,
      heightSurface: 0,
      brakeSystem: false,
      chassis: false
    }
  },
  mutations: {
    SOCKET_changePlanet(state, data) {
      state.orbit = data.orbit;
      state.navigator = data.navigator;
      // console.log(data.navigator.nuclear)
    },
    startLanding(state, data) {
      state.orbit.ship.a = data.planet.a;
      state.orbit.ship.b = data.planet.b;
      state.orbit.ship.F = data.planet.F;
      state.orbit.ship.P = data.planet.P;
      state.orbit.ship.w = data.planet.w;
      state.orbit.ship.v = data.planet.v;
      state.orbit.ship.cxs = state.orbit.center.cx;
      state.orbit.ship.cys = state.orbit.center.cy;
      state.orbit.ship.delta_nuclear = 0;
      data.socket.emit('setPlanet', state.orbit);
      data.socket.emit('landing');
    }
  },
  actions: {},
  getters: {
    get_orbit (state) {
      return state.orbit
    },
    get_planet (state) {
      return state.orbit.planets;
    },
    get_scale (state) {
      return state.orbit.scale;
    },
    get_ship_orbit (state) {
      return state.orbit.ship
    },
    get_landing (state) {
      return state.orbit.landing;
    },
    get_navigator (state) {
      return state.navigator;
    },
    difficult (state) {
      return state.navigator.difficult;
    }
  }
}
