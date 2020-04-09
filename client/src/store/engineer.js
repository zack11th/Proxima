import Vue from 'vue'

export default {
  state: {
    warningCell: [], // массив из 1600 элементов. true - вышел из строя, false - работает ячейка
    AuroraPower: {
      PowerProduction: 0,
      PowerConsumption: 0,
      ReactorTemp: 0,
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
      state.warningCell = data.Power.PowerCells;
      for (let i = 0; i < 1600; i++) { // этот цикл тестирующий, здесь нужно будет получать реальный массив с рабоающими или нет ячейками
        // state.warningCell[i] = !!Math.round(Math.random());
        Vue.set(state.warningCell, i, state.warningCell[i]); // такая конструкция, так как Vue не видит изменения внутри массива, возможно, когда эти данные будут прилетать с сервера, такое не понадобится
        //console.log(data.Power.PowerCells[i]);
      }
      //console.log(data.Power.PowerCells);
    }
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
