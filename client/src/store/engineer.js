import Vue from 'vue'

class Batterie {
  constructor() {
    this.State = true;
    this.Capacity = 0;
    this.Mode = 0; //0 - поддержание, 1 - заряд, 2 - разряд
    this.MaxVoltage = 0;
    this.LowVoltage = 0;
    this.MinVoltage = 0;
    this.CurrCapacity = 0;
    this.CurrVoltage = 0;
    this.CurrAmperage = 0;
    this.MaxAmperage = 0;
    this.ChargeOnly = false;
  }
}

export default {
  state: {
    warningCell: [], // массив из 1600 элементов. true - вышел из строя, false - работает ячейка
    AuroraPower: {
      PowerProduction: 0,
      PowerConsumption: 0,
      PowerTEG: 0,
      ReactorTemp: 0,
      TargetTemp: 0,
      ControlRods: {
        Rod1: 0,
        Rod2: 0,
        Rod3: 0,
        Rod4: 0,
        Rod5: 0,
        Rod6: 0
      },
      Batteries:[new Batterie, new Batterie,new Batterie,new Batterie,new Batterie,new Batterie]
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
      state.AuroraPower.PowerTEG = data.Power.PowerTEG;
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

      for (let i=0; i<=5; i++){
        //state.AuroraPower.Batteries[i] = data.Power.Batteries[i];
        if(data.Power.Batteries[i].State){
              state.AuroraPower.Batteries[i].State = "Подключена";
              switch(data.Power.Batteries[i].Mode) {
                case 0:  // if (x === 'value1')
                  state.AuroraPower.Batteries[i].Mode = "Поддержание";
                  break;
                case 1:  // if (x === 'value2')
                  state.AuroraPower.Batteries[i].Mode = "Заряд";
                  break;
                case 2:  // if (x === 'value2')
                  state.AuroraPower.Batteries[i].Mode = "Разряд";
                  break;
                default:
                  state.AuroraPower.Batteries[i].Mode = "Неизвестно";
                  break;
              }
              state.AuroraPower.Batteries[i].CurrCapacity = Math.round(data.Power.Batteries[i].CurrCapacity/data.Power.Batteries[i].Capacity*1000)/10;
              state.AuroraPower.Batteries[i].CurrVoltage = Math.round(data.Power.Batteries[i].CurrVoltage*10)/10;
              state.AuroraPower.Batteries[i].CurrAmperage = Math.round(data.Power.Batteries[i].CurrAmperage*10)/10;
              if(data.Power.Batteries[i].ChargeOnly){state.AuroraPower.Batteries[i].ChargeOnly = "Защита от низкого заряда"}else{state.AuroraPower.Batteries[i].ChargeOnly = ""}
          } else{
              state.AuroraPower.Batteries[i].State = "Неисправность";
              state.AuroraPower.Batteries[i].Mode = "Неисправность";
              state.AuroraPower.Batteries[i].CurrCapacity = 0;
              state.AuroraPower.Batteries[i].CurrVoltage = 0;
              state.AuroraPower.Batteries[i].CurrAmperage = 0;
              state.AuroraPower.Batteries[i].ChargeOnly = "";
          }
      }

       // console.log(state.AuroraPower.Batteries[0]);
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
