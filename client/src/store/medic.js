export default {
  state: {
    personal: [
      {
        id: 1,
        name: 'Джон Доу',
        gamer: 'Василий1',
        profile: 'Командор',
        img: 'command.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      },
      {
        id: 2,
        name: 'Зинаида Петровна',
        gamer: 'Василий2',
        profile: 'Пилот',
        img: 'pilot.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      },
      {
        id: 3,
        name: 'Кристина Банделопа',
        gamer: 'Василий3',
        profile: 'Медик',
        img: 'medic.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      },
      {
        id: 4,
        name: 'Джон Долермонт',
        gamer: 'Василий4',
        profile: 'Медик',
        img: 'medic.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      },
      {
        id: 5,
        name: 'Джон Доу',
        gamer: 'Василий5',
        profile: 'Инженер',
        img: 'engineer.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      },
      {
        id: 6,
        name: 'Джон Доу',
        gamer: 'Василий6',
        profile: 'Инженер',
        img: 'engineer.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      },
      {
        id: 7,
        name: 'Джон Доу',
        gamer: 'Василий',
        profile: 'Ученый',
        img: 'scient.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      },
      {
        id: 8,
        name: 'Джон Доу',
        gamer: 'Василий',
        profile: 'Связист',
        img: 'gps.svg',
        puls: 80,
        preassureU: 120,
        preassureD: 80,
        oxy: 95,
        water: 70,
        nuclear: 100
      }
    ]
  },
  mutations: {
    SOCKET_recalcMedic(state, data) {
      state.personal = data;
    }
  },
  actions:{},
  getters: {
    personal(state) {
      return state.personal;
    }
  }
}
