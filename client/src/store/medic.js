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
        profile: 'медик',
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
        profile: 'инженер',
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
        profile: 'инженер',
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
        profile: 'ученый',
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
        profile: 'связист',
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
  },
  actions:{},
  getters: {
    personal(state) {
      return state.personal;
    }
  }
}
