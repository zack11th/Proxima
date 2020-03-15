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
        darkMater: true,
        button_1: false,
        button_2: false,
        thrust: 0 // от 0 до 100
      },
      manevr: {
        button_1: false,
        button_2: false,
        thrust: 0 // от 0 до 100
      },
      alarm: { // подсвечивание не оптимальных параметров
        speed: false,
        temperature: false
      },
      speedSurface: 0, // скоросто относительно поверхности
      speedSurfaceOptimal: 0, // оптимальная скорость относительно поверхности
      acceleration: 0, // ускорение при посадке
      accelerationOptimal: [38.1, -44, -61.1, -8.3], // оптимальное ускоренин в зависимости от стадии
      accelerationSystem: [38.1, -66, -90, -12], // системное ускорение, которое будет в случае, если ничего не делать
      roll: 0, // угол крена
      rollOptimal: [0, 180], // оптимальный угол крена
      temperature: -273, // температура обшивки
      heightSurface: '-', // высота
      deltaHeightSurface: [2857, 3556, 389, 83], // скорость изменения высоты в зависимости от стадии посадки в метрах в секунду
      distance: 0, // расстояние до точки посадки в метрах
      brakeSystem: false, // тормозная система
      chassis: false, // выпущенные шасси
      stage: null, // стадия посадки 0 - подлет к планете, 1 - верхние слои атмосферы, 2 - плотные слои атмосферы, 3 - приземление, 4 - сели
      noise: {}
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
