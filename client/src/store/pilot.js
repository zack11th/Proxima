export default {
  state: {
    orbit: {
      landing: false, // флаг начала приземления Авроры
      scale: 10000,
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
        delta_nuclear: 0, // изменение тяги ядерного двигателя для изменения орбиты корабля
        goHome: false // флаг вылета Авроры с Проксима Б
      }
    },
    navigator: {
      difficult: 1, // сложность посадки
      hardLanding: false, // флаг для принудительного старта посадки
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
      acceleration: 0, // ускорение при посадке
      accelerationOptimal: [38.1, -44, -61.1, -8.3], // оптимальное ускоренин в зависимости от стадии
      accelerationSystem: [38.1, -60, -110, -10], // системное ускорение, которое будет в случае, если ничего не делать
      roll: 0, // угол крена
      rollOptimal: ['--', '--'], // оптимальный угол крена
      temperature: -270, // температура обшивки
      K_temp: 0.00002, // коэффициент изменения температуры
      heightSurface: '-', // высота
      deltaHeightSurface: [2857, 3556, 389, 83], // скорость изменения высоты в зависимости от стадии посадки в метрах в секунду
      distance: null, // расстояние до точки посадки в метрах
      brakeSystem: false, // тормозная система
      chassis: false, // выпущенные шасси
      stage: null, // стадия посадки 0 - подлет к планете, 1 - верхние слои атмосферы, 2 - плотные слои атмосферы, 3 - приземление, 4 - сели
      singletoneStage: true, // флаг одноразовых расчетов для стадий
      timeStage: [105, 45, 90, 60], // время каждой стадии в секундах
      wind: {
        inProcess: false,
        deg: 0
      },
      liftOff: false, // флаг взлета с поверхности
      on_surface: false, // флаг окончания приземления Аврооры
      noise: {
        b: 20,
        c: 9.1,
        d: 63,
        e: 9.3,
        f: 68,
        g: 9.1,
        h: 64,
        i: 'открыто',
        j: 8.1,
        k: 7.9,
        l: 0,
        q: 0,
        r: 10.1,
        s: 12.5,
        t: 11.3,
        u: 0,
        v: 0,
        w: 0,
        y: '--',
        aa: -270,
        bb: -270,
        cc: -270,
        dd: -270
      }
    },
    onSurface: {
      success: '-',
      chassis: '-',
      roll: '-'
    }
  },
  mutations: {
    SOCKET_changePlanet(state, data) {
      state.orbit = data.orbit;
      state.navigator = data.navigator;
    },
    SOCKET_onSurface(state, data) {
      state.onSurface.success = data.success;
      state.onSurface.chassis = data.chassis;
      state.onSurface.roll = data.roll;
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
      state.navigator.temperature = data.temperature;

      data.socket.emit('changeNavigator', state.navigator);
    },
    takeOff(state, data) {
      state.orbit.ship.a = data.coordinates.x * state.orbit.scale;
      state.orbit.ship.b = 7000000;
      state.orbit.ship.F = 0;
      state.orbit.ship.P = 0;
      state.orbit.ship.w = 0;
      state.orbit.ship.v = 5000;
      state.orbit.ship.cxs = 0;
      state.orbit.ship.cys = data.coordinates.y;

      data.socket.emit('setPlanet', state.orbit);
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
    },
    get_surface (state) {
      return state.onSurface;
    }
  }
}
