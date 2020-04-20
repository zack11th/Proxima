<template>
    <div class="main">
      <div class="up">
        <rods-reactor></rods-reactor>
      </div>
      <div class="up">
        <table-cell></table-cell>
      </div>
      <div class="down">
        <table>
          <TR>
            <td width="300">
              <div class="header">
                <h1>Общие параметры</h1>
              </div>
            </td>
            <td colspan="6">
              <div class="header">
                <h1>Параметры работы батарей</h1>
              </div>
            </td>
          </tr>
          <tr>
            <td>
                <div class="indicator"><span>Выработка энергии:</span><span>{{Math.round(AuroraPower.PowerProduction/100)/10 || '--'}} кВт</span></div>
              <div class="indicator"><span>Мощность ТЭГ:</span><span>{{Math.round(AuroraPower.PowerTEG/100)/10 || '--'}} кВт</span></div>
                <div class="indicator"><span>Потребление энергии:</span><span>{{Math.round(AuroraPower.PowerConsumption/100)/10 || '--'}} кВт</span></div>
                <div class="indicator"><span>Текущая температура камеры реактора   :</span><span>{{Math.round(AuroraPower.ReactorTemp) || '--'}} К</span></div>
                <div class="indicator"><span>Рассчетная температура камеры реактора:</span><span>{{Math.round(AuroraPower.TargetTemp) || '--'}} К</span></div>

              <div class="input-block">
                <span>Стержень 1</span>
                <span>{{Math.round(AuroraPower.ControlRods.Rod1)}}</span>
                <input type="number" ref="rod0">
              </div>
              <div class="input-block">
                <span>Стержень 2</span>
                <span>{{Math.round(AuroraPower.ControlRods.Rod2)}}</span>
                <input type="number" ref="rod1">
              </div>
              <div class="input-block">
                <span>Стержень 3</span>
                <span>{{Math.round(AuroraPower.ControlRods.Rod3)}}</span>
                <input type="number" ref="rod2">
              </div>
              <div class="input-block">
                <span>Стержень 4</span>
                <span>{{Math.round(AuroraPower.ControlRods.Rod4)}}</span>
                <input type="number" ref="rod3">
              </div>
              <div class="input-block">
                <span>Стержень 5</span>
                <span>{{Math.round(AuroraPower.ControlRods.Rod5)}}</span>
                <input type="number" ref="rod4">
              </div>
              <div class="input-block">
                <span>Стержень 6</span>
                <span>{{Math.round(AuroraPower.ControlRods.Rod6)}}</span>
                <input type="number" ref="rod5">
              </div>
              <div class="action">
                <button @click="changeRods">Задать значения</button>
              </div>
            </td>
            <td width="200">

              <div class="header">
                <h2>Батарея 1</h2>
              </div>
              <div class="indicator"><span>Состояние: </span><span>{{AuroraPower.Batteries[0].State}}</span></div>
              <div class="indicator"><span>Режим: </span><span>{{AuroraPower.Batteries[0].Mode}}</span></div>
              <div class="indicator"><span>Напряжение: </span><span>{{AuroraPower.Batteries[0].CurrVoltage||"--"}} V</span></div>
              <div class="indicator"><span>Ток: </span><span>{{AuroraPower.Batteries[0].CurrAmperage||"--"}} A</span></div>
              <div class="indicator"><span>Уровень заряда: </span><span>{{AuroraPower.Batteries[0].CurrCapacity}}%</span></div>
              <div class="indicator"><span>{{AuroraPower.Batteries[0].ChargeOnly}}</span></div>
            </td>
            <td width="200">
              <div class="header">
                <h2>Батарея 2</h2>
                <div class="indicator"><span>Состояние: </span><span>{{AuroraPower.Batteries[1].State}}</span></div>
                <div class="indicator"><span>Режим: </span><span>{{AuroraPower.Batteries[1].Mode}}</span></div>
                <div class="indicator"><span>Напряжение: </span><span>{{AuroraPower.Batteries[1].CurrVoltage||"--"}} V</span></div>
                <div class="indicator"><span>Ток: </span><span>{{AuroraPower.Batteries[1].CurrAmperage||"--"}} A</span></div>
                <div class="indicator"><span>Уровень заряда: </span><span>{{AuroraPower.Batteries[1].CurrCapacity}}%</span></div>
                <div class="indicator"><span>{{AuroraPower.Batteries[1].ChargeOnly}}</span></div>
              </div>
            </td>
            <td width="200">
              <div class="header">
                <h2>Батарея 3</h2>
                <div class="indicator"><span>Состояние: </span><span>{{AuroraPower.Batteries[2].State}}</span></div>
                <div class="indicator"><span>Режим: </span><span>{{AuroraPower.Batteries[2].Mode}}</span></div>
                <div class="indicator"><span>Напряжение: </span><span>{{AuroraPower.Batteries[2].CurrVoltage||"--"}} V</span></div>
                <div class="indicator"><span>Ток: </span><span>{{AuroraPower.Batteries[2].CurrAmperage||"--"}} A</span></div>
                <div class="indicator"><span>Уровень заряда: </span><span>{{AuroraPower.Batteries[2].CurrCapacity}}%</span></div>
                <div class="indicator"><span>{{AuroraPower.Batteries[2].ChargeOnly}}</span></div>
              </div>
            </td>
            <td width="200">
              <div class="header">
                <h2>Батарея 4</h2>
                <div class="indicator"><span>Состояние: </span><span>{{AuroraPower.Batteries[3].State}}</span></div>
                <div class="indicator"><span>Режим: </span><span>{{AuroraPower.Batteries[3].Mode}}</span></div>
                <div class="indicator"><span>Напряжение: </span><span>{{AuroraPower.Batteries[3].CurrVoltage||"--"}} V</span></div>
                <div class="indicator"><span>Ток: </span><span>{{AuroraPower.Batteries[3].CurrAmperage||"--"}} A</span></div>
                <div class="indicator"><span>Уровень заряда: </span><span>{{AuroraPower.Batteries[3].CurrCapacity}}%</span></div>
                <div class="indicator"><span>{{AuroraPower.Batteries[3].ChargeOnly}}</span></div>
              </div>
            </td>
            <td width="200">
              <div class="header">
                <h2>Батарея 5</h2>
                <div class="indicator"><span>Состояние: </span><span>{{AuroraPower.Batteries[4].State}}</span></div>
                <div class="indicator"><span>Режим: </span><span>{{AuroraPower.Batteries[4].Mode}}</span></div>
                <div class="indicator"><span>Напряжение: </span><span>{{AuroraPower.Batteries[4].CurrVoltage||"--"}} V</span></div>
                <div class="indicator"><span>Ток: </span><span>{{AuroraPower.Batteries[4].CurrAmperage||"--"}} A</span></div>
                <div class="indicator"><span>Уровень заряда: </span><span>{{AuroraPower.Batteries[4].CurrCapacity}}%</span></div>
                <div class="indicator"><span>{{AuroraPower.Batteries[4].ChargeOnly}}</span></div>
              </div>
            </td>
            <td width="200">
              <div class="header">
                <h2>Батарея 6</h2>
                <div class="indicator"><span>Состояние: </span><span>{{AuroraPower.Batteries[5].State}}</span></div>
                <div class="indicator"><span>Режим: </span><span>{{AuroraPower.Batteries[5].Mode}}</span></div>
                <div class="indicator"><span>Напряжение: </span><span>{{AuroraPower.Batteries[5].CurrVoltage||"--"}} V</span></div>
                <div class="indicator"><span>Ток: </span><span>{{AuroraPower.Batteries[5].CurrAmperage||"--"}} A</span></div>
                <div class="indicator"><span>Уровень заряда: </span><span>{{AuroraPower.Batteries[5].CurrCapacity}}%</span></div>
                <div class="indicator"><span>{{AuroraPower.Batteries[5].ChargeOnly}}</span></div>
              </div>
            </td>
          </TR>
        </table>
      </div>
    </div>
</template>

<script>
  import TableCell from './forEngineer/TableCell';
  import RodsReactor from './forEngineer/RodsReactor';

  export default {
    name: "Engineer",
    components: {
      TableCell,
      RodsReactor
    },
    mounted() {
      document.title = 'Инженер';
      this.$socket.emit('conn', 'eng');
    },
    computed: {
      AuroraPower(){
        return this.$store.getters.get_AuroraPower;
      }
    },
    methods: {
      changeRods() {
        let rod0 = (!isNaN(this.$refs.rod0.valueAsNumber)) ? this.$refs.rod0.valueAsNumber : this.AuroraPower.ControlRods[0];
        let rod1 = (!isNaN(this.$refs.rod1.valueAsNumber)) ? this.$refs.rod1.valueAsNumber : this.AuroraPower.ControlRods[1];
        let rod2 = (!isNaN(this.$refs.rod2.valueAsNumber)) ? this.$refs.rod2.valueAsNumber : this.AuroraPower.ControlRods[2];
        let rod3 = (!isNaN(this.$refs.rod3.valueAsNumber)) ? this.$refs.rod3.valueAsNumber : this.AuroraPower.ControlRods[3];
        let rod4 = (!isNaN(this.$refs.rod4.valueAsNumber)) ? this.$refs.rod4.valueAsNumber : this.AuroraPower.ControlRods[4];
        let rod5 = (!isNaN(this.$refs.rod5.valueAsNumber)) ? this.$refs.rod5.valueAsNumber : this.AuroraPower.ControlRods[5];
        //console.log(rod0);
        this.$store.commit('changeRods', {rod0, rod1, rod2, rod3, rod4, rod5, socket: this.$socket});
       }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    background-color: #333333;
    color: #22c325
  }
  .up {
    width: 50%;
    height: 60%;
    box-sizing: border-box;
    background-color: #000000;
  }
  .down {

  }
  .red_alert {
    animation: speedwarning 1s infinite;
  }
  @keyframes speedwarning {
    0%, 100% {
      background-color: #990000;
      box-shadow: 0 0 10px 0 #990000;
      color: white;
    }
    50% {
      background-color: transparent;
      box-shadow: none;
      color: #ce6e00;
    }
  }
</style>
