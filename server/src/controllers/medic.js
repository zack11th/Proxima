let personal = [
  {
    id: 1,
    name: 'Джон Доу',
    gamer: 'Василий1',
    profile: 'Командор',
    img: 'command.svg',
    puls: 190,
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
];

function medic(io, socket, Aurora) {
  socket.on('medicChangeMaster', (data) => {
    if (data.name !== 'name') data.value = Number(data.value);
    personal.find(person => person.id === data.id)[data.name] = data.value;
    console.log(typeof data.value)
  })
}

function medic_recalc(io) {
  io.emit('recalcMedic', personal)
}

module.exports.medic = medic;
module.exports.medic_recalc = medic_recalc;