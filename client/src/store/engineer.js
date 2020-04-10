import Vue from 'vue'

export default {
  state: {
    warningCell: [], // массив из 1600 элементов. true - вышел из строя, false - работает ячейка
    AuroraPower: {
      PowerProduction: 0,
      PowerConsumption: 0,
      ReactorTemp: 0,
      TargetTemp: 0,
      ControlRods: {
        Rod1: 0,
        Rod2: 0,
        Rod3: 0,
        Rod4: 0,
        Rod5: 0,
        Rod6: 0
      }
    }

  },
  mutations: {
    changeCell(state) {
      // for (let i = 0; i < 1600; i++) { // этот цикл тестирующий, здесь нужно будет получать реальный массив с рабоающими или нет ячейками
      //   // state.warningCell[i] = !!Math.round(Math.random());
      //   Vue.set(state.warningCell, i, !!Math.round(Math.random())); // такая конструкция, так как Vue не видит изменения внутри массива, возможно, когда эти данные будут прилетать с сервера, такое не понадобится
      // }
    },
    SOCKET_EmitPower(state, data) {
      state.AuroraPower.PowerProduction = data.Power.PowerProduction;
      state.AuroraPower.PowerConsumption = data.Power.PowerConsumption;
      state.AuroraPower.ReactorTemp = data.Reactor.Temp;
      state.AuroraPower.TargetTemp = data.Reactor.TargetTemp;

      state.warningCell = data.Power.PowerCells;
      for (let i = 0; i < 1600; i++) { // этот цикл тестирующий, здесь нужно будет получать реальный массив с рабоающими или нет ячейками
        // state.warningCell[i] = !!Math.round(Math.random());
        Vue.set(state.warningCell, i, state.warningCell[i]); // такая конструкция, так как Vue не видит изменения внутри массива, возможно, когда эти данные будут прилетать с сервера, такое не понадобится
        //console.log(data.Power.PowerCells[i]);
      }
      state.AuroraPower.ControlRods.Rod1 = data.Reactor.ControlRods[0].Position;
      state.AuroraPower.ControlRods.Rod2 = data.Reactor.ControlRods[1].Position;
      state.AuroraPower.ControlRods.Rod3 = data.Reactor.ControlRods[2].Position;
      state.AuroraPower.ControlRods.Rod4 = data.Reactor.ControlRods[3].Position;
      state.AuroraPower.ControlRods.Rod5 = data.Reactor.ControlRods[4].Position;
      state.AuroraPower.ControlRods.Rod6 = data.Reactor.ControlRods[5].Position;

      // console.log(state.AuroraPower.ControlRods);
    },
    changeRods(state, data) {
      state.AuroraPower.ControlRods.Rod1 = data.rod0;
      state.AuroraPower.ControlRods.Rod2 = data.rod1;
      state.AuroraPower.ControlRods.Rod3 = data.rod2;
      state.AuroraPower.ControlRods.Rod4 = data.rod3;
      state.AuroraPower.ControlRods.Rod5 = data.rod4;
      state.AuroraPower.ControlRods.Rod6 = data.rod5;

      data.socket.emit('changeRods', state.AuroraPower);
    },
  },
  actions: {},
  getters: {
    get_warningCell(state) {
      return state.warningCell;
    },
    get_AuroraPower(state) {
      return state.AuroraPower;
    }
  }
}
