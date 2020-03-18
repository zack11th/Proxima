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
      difficult: 1,
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
        speed_less: false,
        speed_over: false,
        temperature: false
      },
      speedSurface: 0, // скорость относительно поверхности
      speedSurfaceOptimal: 0, // оптимальная скорость относительно поверхности
      deltaVmin: 0, // нижний порог отклонения скорости до алерта
      deltaVmax: 0, // верхний порог отклонения скорости до алерта
      acceleration: 38.1, // ускорение при посадке
      accelerationOptimal: [38.1, -44, -61.1, -8.3], // оптимальное ускоренин в зависимости от стадии
      accelerationSystem: [38.1, -60, -110, -10], // системное ускорение, которое будет в случае, если ничего не делать
      roll: 0, // угол крена
      rollOptimal: [0, 180], // оптимальный угол крена
      temperature: -273, // температура обшивки
      heightSurface: '-', // высота
      deltaHeightSurface: [2857, 3556, 389, 83], // скорость изменения высоты в зависимости от стадии посадки в метрах в секунду
      distance: 0, // расстояние до точки посадки в метрах
      brakeSystem: false, // тормозная система
      chassis: false, // выпущенные шасси
      stage: null, // стадия посадки 0 - подлет к планете, 1 - верхние слои атмосферы, 2 - плотные слои атмосферы, 3 - приземление, 4 - сели
      singletoneStage: true, // флаг одноразовых расчетов для стадий
      timeStage: [105, 45, 90, 60], // время каждой стадии в секундах
      noise: {}
    }
  },
  mutations: {
    SOCKET_changePlanet(state, data) {
      state.orbit = data.orbit;
      state.navigator = data.navigator;
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
      if (!state.orbit.landing) data.socket.emit('landing');
    },
    changeNavigator(state, data) {
      state.navigator.speedSurface = data.speed;
      state.navigator.speedSurfaceOptimal = data.speedOptimal;
      state.navigator.acceleration = data.acceleration;
      state.navigator.heightSurface = data.height;
      state.navigator.distance = data.distance;

      data.socket.emit('changeNavigator', state.navigator);
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
