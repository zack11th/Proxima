<template>
  <div class="fullscreen">
<!--*********************************************************************************************************************    -->
    <div class="left">
<!--      *************** ЯДЕРНЫЙ ДВИГАТЕЛЬ *****************-->
      <div class="engine-block">
        <p>Ядерный двигатель</p>
        <div class="trigger">
          <span>Инжекция темной материи</span>
          <span class="lamp" :class="{lamp_active: navigator.nuclear.darkMater}"></span>
        </div>
        <div class="trigger">
          <span>Топливная заслонка</span>
          <span class="lamp" :class="{lamp_active: navigator.nuclear.button_1}"></span>
        </div>
        <div class="trigger">
          <span>Клапаны тяги</span>
          <span class="lamp" :class="{lamp_active: navigator.nuclear.button_2}"></span>
        </div>
        <div class="arm" :class="{arm_active: navigator.nuclear.button_1 && navigator.nuclear.button_2}">
          <span>Ручное управление</span>
        </div>
      </div>
      <!--*** ТЯГА и СКОРОСТЬ ЯД ***-->
      <div class="speed">
        <div class="speed-label"> Скорость отн. центра системы: </div>
        <div class="speed-value">{{shipSpeed}} м/с</div>
      </div>
      <div class="thrust">
        <div>Тяга ядерного двигателя, % :</div>
        <div class="thrust-area">
          <div class="thrust-value" :style="{width: navigator.nuclear.thrust +'%'}"></div>
        </div>
      </div>
      <!--*** НОИЗ ***-->
      <div class="noise">
        <p class="noise-head">ТОПЛИВО</p>
        <p class="item"><span>Количество:</span><span> {{fuel.quantity}}кг</span></p>
        <p class="item"><span>Давление:</span><span> {{fuel.pressure}}МПа</span></p>
        <p class="item"><span>Температура:</span><span> {{fuel.temperature}}&deg C</span></p>
      </div>
      <div class="noise">
        <p class="noise-head">ОКИСЛИТЕЛЬ</p>
        <p class="item"><span>Количество:</span><span> {{oxygen.quantity}}кг</span></p>
        <p class="item"><span>Давление:</span><span> {{oxygen.pressure}}МПа</span></p>
        <p class="item"><span>Температура:</span><span> {{oxygen.temperature}}&deg C</span></p>
      </div>
      <div class="noise">
        <p class="item"><span>Плотность атмосферы:</span><span> {{Math.floor(navigator.noise.q)}}кПа</span></p>
        <p class="item"><span>Давление наддува Бак 1:</span><span> {{navigator.noise.r}}</span></p>
        <p class="item"><span>Давление наддува Бак 2:</span><span> {{navigator.noise.s}}</span></p>
        <p class="item"><span>Давление наддува Бак 3:</span><span> {{navigator.noise.t}}</span></p>
      </div>
      <div class="height-surface">
        <div class="speed">
          <div class="speed-label"> Высота над поверхностью: </div>
          <div class="speed-value">{{Math.floor(navigator.heightSurface)/1000 || '--'}} км</div>
        </div>
        <div class="speed">
          <div class="speed-label"> Высота над усл. уровнем моря: </div>
          <div class="speed-value">{{Math.floor(navigator.noise.y)/1000 || '--'}} км</div>
        </div>
      </div>
    </div>
<!--*********************************************************************************************************************    -->
    <div class="left">
      <!--      ******************* МАНЕВРОВЫЕ ДВИГАТЕЛИ ********************-->
      <div class="engine-block">
        <p>Маневровые двигатели</p>
        <div class="trigger">
          <span>Гидравликой рулей</span>
          <span class="lamp" :class="{lamp_active: navigator.manevr.button_1}"></span>
        </div>
        <div class="trigger">
          <span>Клапаны впрыска</span>
          <span class="lamp" :class="{lamp_active: navigator.manevr.button_2}"></span>
        </div>
        <div class="arm" :class="{arm_active: navigator.manevr.button_1 && navigator.manevr.button_2}">
          <span>Ручное управление</span>
        </div>
      </div>
      <!--      ****************** ОСНОВНЫЕ ПОКЗАТЕЛИ ***********************-->
      <div class="speed" :class="{speed_overload: navigator.alarm.speed_over || navigator.alarm.speed_less}">
        <div class="speed-label"> Скорость отн. поверхности: </div>
        <div class="speed-value">
          {{Math.round(navigator.speedSurface) || '--'}} м/с
          <span class="marker marker__over" v-if="navigator.alarm.speed_over">высокая</span>
          <span class="marker marker__less" v-if="navigator.alarm.speed_less">низкая</span>
        </div>
      </div>
      <div class="speed">
        <div class="speed-label"> Оптимальная скорость посадки: </div>
        <div class="speed-value">{{Math.round(navigator.speedSurfaceOptimal) || '--'}} м/с</div>
      </div>
      <div class="thrust">
        <div>Тяга маневровых двигателей, % :</div>
        <div class="thrust-area">
          <div class="thrust-value" :style="{width: navigator.manevr.thrust +'%'}"></div>
        </div>
      </div>
      <div class="speed">
        <div class="speed-label"> Модуль ускорения: </div>
        <div class="speed-value">{{(Math.round(navigator.acceleration*10))/10 || '--'}} м/с^2</div>
      </div>
      <p class="item"><span>Ускорение продольное:</span><span> {{navigator.noise.u}} g</span></p>
      <p class="item"><span>Ускорение поперечное:</span><span> {{navigator.noise.v}} g</span></p>
      <p class="item"><span>Ускорение вертикальное:</span><span> {{navigator.noise.w}} g</span></p>
    <!--*** НОИЗ ***-->
      <div class="speed" :class="{speed_overload: navigator.alarm.thruster1}">
        <p class="item"><span>Температура сопла 1-2:</span><span><div class="speed-value"> {{Math.floor(navigator.noise.aa)}}&deg C</div></span></p>
      </div>
      <div class="speed" :class="{speed_overload: navigator.alarm.thruster2}">
        <p class="item"><span>Температура сопла 3-4:</span><span><div class="speed-value"> {{Math.floor(navigator.noise.bb)}}&deg C</div></span></p>
      </div>
      <div class="speed" :class="{speed_overload: navigator.alarm.thruster3}">
        <p class="item"><span>Температура сопла 5-6:</span><span><div class="speed-value"> {{Math.floor(navigator.noise.cc)}}&deg C</div></span></p>
      </div>
      <div class="speed" :class="{speed_overload: navigator.alarm.thruster4}">
        <p class="item"><span>Температура сопла 7-8:</span><span><div class="speed-value"> {{Math.floor(navigator.noise.dd)}}&deg C</div></span></p>
      </div>
      <div class="noise">
        <p class="item"><span>Обороты гиродина:</span><span> {{navigator.noise.l}}</span></p>
        <p class="item"><span>Давление в системе точного маневрирования (правый борт):</span><span> {{navigator.noise.j}}МПа</span></p>
        <p class="item"><span>Давление в системе точного маневрирования (левый борт):</span><span> {{navigator.noise.k}}МПа</span></p>
      </div>
      <div class="distance">
        <div class="speed" v-if="navigator.distance !== null">
          <div class="speed-label"> Дистанция до места посадки: </div>
          <div class="speed-value">{{Math.floor(navigator.distance)/1000}} км</div>
        </div>
      </div>
    </div>
<!--*********************************************************************************************************************    -->
    <div class="right">
<!--    ***************** УГОЛ КРЕНА *****************-->
      <div class="wind-area">
        <div class="roll-area">
          <div class="wind"
               v-if="navigator.wind.inProcess"
               :style="{transform: `rotate(-${navigator.wind.deg}deg)`}">
          </div>
          <div class="rolled-ship"
            :style="{transform: `rotate(-${navigator.roll}deg)`, transformOrigin: `center center`}"
          ></div>
          <div class="ground" v-if="navigator.stage === 3"></div>
        </div>
      </div>
<!--      **************** КОНТРОЛЛЕРЫ СНИЗУ ***************-->
      <div class="bottom">
        <div class="flex flex-center">
          <div class="speed">
            <div class="speed-label"> Оптимальный уровень крена: </div>
            <div class="speed-value">{{navigator.rollOptimal[0]}}&deg / {{navigator.rollOptimal[1]}}&deg</div>
          </div>
            <div class="speed">
              <div class="speed-label"> Угол крена: </div>
              <div class="speed-value">{{Math.round(navigator.roll)}}&deg</div>
          </div>
        </div>
        <div class="flex">
          <div class="flex-col">
            <div class="speed" :class="{speed_overload: navigator.alarm.temperature}">
              <div class="speed-label"> Температура внешней обшивки: </div>
              <div class="speed-value">{{Math.round(navigator.temperature)}}&deg C</div>
            </div>
            <div class="speed" :class="{speed_overload: navigator.alarm.innerHullTemp}">
              <div class="speed-label"> Температура внутреннего корпуса: </div>
              <div class="speed-value">{{Math.floor(navigator.noise.b)}}&deg C</div>
            </div>
          </div>
          <div class="flex-col">
            <div class="trigger">
              <span :class="{active: !navigator.chassis && navigator.heightSurface < 2000}">Шасси: </span>
              <span class="lamp" :class="{lamp_active: navigator.chassis}"></span>
            </div>
            <div class="trigger">
              <span :class="{active: !navigator.brakeSystem && navigator.stage === 3}">Тормозная система: </span>
              <span class="lamp" :class="{lamp_active: navigator.brakeSystem}"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let log = console.log;

  export default {
    name: "Pilot2",
    data() {
      return {
        fuel: {
          quantity: 0,
          temperature: 0,
          pressure: 0
        },
        oxygen: {
          quantity: 0,
          temperature: 0,
          pressure: 0
        }
      };
    },
    mounted() {
      // setInterval(()=>{
      //   console.log(`a: ${this.navigator.acceleration}, K: ${((Math.random()+Math.random()+Math.random()+Math.random()+Math.random())*4/5-2)*this.navigator.acceleration/100}`)
      //   console.log(`sum: ${Math.floor(this.navigator.acceleration*10)/10}`)
      // }, 1000);
      document.title = 'Штурман';
      this.$socket.emit('conn', 'nav');
    },
    computed: {
      generalGamepad() {
        return this.$store.getters.get_gamepad;
      },
      navigator() {
        return this.$store.getters.get_navigator;
      },
      shipSpeed() {
        return parseInt(this.$store.getters.get_ship_orbit.a); // белый шум
      }
    },
    watch: {
      generalGamepad() {
        this.$socket.emit('changeGeneralGamepad', this.generalGamepad);
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .fullscreen {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    background-color: #070707;
    color: #22c325;
  }
  .left {
    width: 25%;
    box-sizing: border-box;
    border-right: 2px solid #444444;
  }
  .right {
    width: 50%;
    height: 100vh;
    position: relative;
  }
  .engine-block {
    box-sizing: border-box;
    border-bottom: 2px solid #444444;
    padding-left: 20px;
  }
  .engine-block>p {
    text-align: center;
    text-transform: uppercase;
  }
  .trigger {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
  }
  .trigger>.active {
    animation: speedwarning 1s infinite;
  }
  .lamp {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #990000;
    box-shadow: 0 0 10px 0 #990000;
    border-radius: 50%;
    margin-left: 20px;
  }
  .lamp_active {
    background-color: #00ac00;
    box-shadow: 0 0 10px 0 #00ac00;
  }
  .arm {
    opacity: 0;
    transition: opacity 1s ease-in-out;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 15px 0;
    color: white;
  }
  .arm>span {
    background-color: #00ac00;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .arm_active {
    opacity: 1;
  }
  .speed {
    padding: 5px 10px;
    text-align: center;
  }
  .speed-value {
    /*margin-left: 5px;*/
    font-size: 1rem;
    border-radius: 10px;
  }
  .speed_overload .speed-value {
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
      color: #22c325;
    }
  }
  .marker {
    color: #bebebe;
    margin-left: 5px;
    border-radius: 5px;
    padding: 0 5px 2px;
    font-size: 1rem;
  }
  .marker__over {
    background-color: #990000;
  }
  .marker__less {
    background-color: #00ac00;
  }
  .thrust {
    margin-top: 10px;
    text-align: center;
  }
  .thrust-area {
    height: 30px;
    width: 220px;
    border: 1px solid #22c325;
    margin: 10px auto;
  }
  .thrust-value {
    height: 100%;
    background-color: #22c325;
  }
  .distance {
    border-top: 2px solid #444444;
    display: flex;
    justify-content: center;
  }
  .height-surface {
    border-top: 2px solid #444444;
    text-align: center;
  }
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    border-top: 2px solid #444444;
    padding-bottom: 10px;
  }
  .flex {
    display: flex;
  }
  .flex-center {
    justify-content: center;
  }
  .flex-col {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .wind-area {
    position: relative;
  }
  .roll-area {
    background-color: #070707;
    width: 400px;
    height: 400px;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rolled-ship {
    width: 360px;
    height: 100px;
    background-color: #22c325;
  }
  .wind {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform-origin: center center;
  }
  .wind::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    right: -50px;
    transform: translateY(-50%);
    border: 20px solid transparent;
    border-right: 40px solid #990000;
    animation: windwarning 1s infinite;
  }
  @keyframes windwarning {
    0%, 100% {
      border-right-color: #990000;
    }
    50% {
      border-right-color: #ce6e00;
    }
  }
  .ground {
    position: absolute;
    width: 350px;
    height: 20px;
    bottom: 130px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    animation: speedwarning 1s infinite;
  }
  .noise {
    border-top: 2px solid #444444;
    padding-top: 10px;
  }
  .noise-head {
    text-align: center;
    text-transform: uppercase;
    margin-top: 0;
  }
  .item {
    margin-top: 0;
    margin-bottom: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
    align-items: center;
  }
  .flex-col>.trigger {
    width: 100%;
    box-sizing: border-box;
    padding-left: 50px;
  }
</style>
