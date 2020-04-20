<template>
    <div class="main">
      <div class="up">
        <rods-reactor></rods-reactor>
      </div>
      <div class="up">
        <table-cell></table-cell>
      </div>
      <div class="down">
        <div class="indicator">
          <span><div class="indicator-header">Выработка энергии:</div></span><span></span><div class="indicator-value">{{Math.round(AuroraPower.PowerProduction/100)/10 || '--'}} кВт</div></span>
          <span><div class="indicator-header">Потребление энергии:</div></span><span></span><div class="indicator-value">{{Math.round(AuroraPower.PowerConsumption/100)/10 || '--'}} кВт</div></span>
          <span><div class="indicator-header">Текущая температура камеры реактора   :</div></span><span></span><div class="indicator-value">{{Math.round(AuroraPower.ReactorTemp) || '--'}} К</div></span>
          <span><div class="indicator-header">Рассчетная температура камеры реактора:</div></span><span></span><div class="indicator-value">{{Math.round(AuroraPower.TargetTemp) || '--'}} К</div></span>
        </div>
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
        let rod0 = (!isNaN(this.$refs.rod0.valueAsNumber)) ? this.$refs.rod0.valueAsNumber : this.AuroraPower.ControlRods.Rod1;
        let rod1 = (!isNaN(this.$refs.rod1.valueAsNumber)) ? this.$refs.rod1.valueAsNumber : this.AuroraPower.ControlRods.Rod2;
        let rod2 = (!isNaN(this.$refs.rod2.valueAsNumber)) ? this.$refs.rod2.valueAsNumber : this.AuroraPower.ControlRods.Rod3;
        let rod3 = (!isNaN(this.$refs.rod3.valueAsNumber)) ? this.$refs.rod3.valueAsNumber : this.AuroraPower.ControlRods.Rod4;
        let rod4 = (!isNaN(this.$refs.rod4.valueAsNumber)) ? this.$refs.rod4.valueAsNumber : this.AuroraPower.ControlRods.Rod5;
        let rod5 = (!isNaN(this.$refs.rod5.valueAsNumber)) ? this.$refs.rod5.valueAsNumber : this.AuroraPower.ControlRods.Rod6;
        console.log(rod0);
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
</style>
