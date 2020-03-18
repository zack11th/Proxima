<template>
  <div class="fullscreen">
    <div class="left">
<!--      *************** ЯДЕРНЫЙ ДВИГАТЕЛЬ *****************-->
      <div class="engine-block">
        <p>Ядерный двигатель</p>
        <div class="trigger">
          <span>Инжекция темной материи</span>
          <span class="lamp" :class="{lamp_active: navigator.nuclear.darkMater}"></span>
        </div>
        <div class="trigger">
          <span>Ручное управление топливной заслонкой</span>
          <span class="lamp" :class="{lamp_active: navigator.nuclear.button_1}"></span>
        </div>
        <div class="trigger">
          <span>Ручное управление клапанами тяги</span>
          <span class="lamp" :class="{lamp_active: navigator.nuclear.button_2}"></span>
        </div>
        <div class="arm" :class="{arm_active: navigator.nuclear.button_1 && navigator.nuclear.button_2}">
          <span>Ручной режим активирован</span>
        </div>
      </div>
<!--      ******************* МАНЕВРОВЫЕ ДВИГАТЕЛИ ********************-->
      <div class="engine-block">
        <p>Маневровые двигатели</p>
        <div class="trigger">
          <span>Ручное управление гидравликой рулей</span>
          <span class="lamp" :class="{lamp_active: navigator.manevr.button_1}"></span>
        </div>
        <div class="trigger">
          <span>Ручное управление клапанами впрыска</span>
          <span class="lamp" :class="{lamp_active: navigator.manevr.button_2}"></span>
        </div>
        <div class="arm" :class="{arm_active: navigator.manevr.button_1 && navigator.manevr.button_2}">
          <span>Ручной режим активирован</span>
        </div>
      </div>
<!--      ****************** ОСНОВНЫЕ ПОКЗАТЕЛИ ***********************-->
      <div class="speed" :class="{speed_overload: navigator.alarm.speed_over || navigator.alarm.speed_less}">
        <div class="speed-label"> Скорость относительно поверхности: </div>
        <div class="speed-value">
          {{Math.round(navigator.speedSurface)}} м/с
          <span class="marker marker__over" v-if="navigator.alarm.speed_over">высокая</span>
          <span class="marker marker__less" v-if="navigator.alarm.speed_less">низкая</span>
        </div>
      </div>
      <div class="speed">
        <div class="speed-label"> Оптимальная скорость посадки: </div>
        <div class="speed-value">{{Math.round(navigator.speedSurfaceOptimal)}} м/с</div>
      </div>
      <div class="speed" :class="{speed_overload: navigator.alarm.speed}">
        <div class="speed-label"> Ускорение: </div>
        <div class="speed-value">{{Math.round(navigator.acceleration)}} м/с^2</div>
      </div>
      <div class="thrust">
        <div>Тяга маневровых двигателей, % :</div>
        <div class="thrust-area">
          <div class="thrust-value" :style="{width: navigator.manevr.thrust +'%'}"></div>
        </div>
      </div>
      <div class="speed">
        <div class="speed-label"> Скорость относительно центра системы: </div>
        <div class="speed-value">{{shipSpeed}} м/с</div>
      </div>
      <div class="thrust">
        <div>Тяга ядерного двигателя, % :</div>
        <div class="thrust-area">
          <div class="thrust-value" :style="{width: navigator.nuclear.thrust +'%'}"></div>
        </div>
      </div>
      <!--**************** ВЫСОТА и ТРИГГЕРЫ ********************-->
      <div class="surface">
        <div class="surface-cell">
          <div class="trigger">
            <span>Шасси: </span>
            <span class="lamp" :class="{lamp_active: navigator.chassis}"></span>
          </div>
          <div class="trigger">
            <span>Тормозная система: </span>
            <span class="lamp" :class="{lamp_active: navigator.brakeSystem}"></span>
          </div>
        </div>
        <div class="surface-cell">
          <div class="speed">
            <div class="speed-label"> Высота: </div>
            <div class="speed-value">{{Math.floor(navigator.heightSurface)/1000 || '--'}} км</div>
          </div>
          <div class="speed" v-if="navigator.distance || true">
            <div class="speed-label"> Дистанция до места посадки: </div>
            <div class="speed-value">{{Math.floor(navigator.distance)/1000}} км</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
<!--    ***************** УГОЛ КРЕНА *****************-->
      <div class="wind-area">
        <div class="roll-area">
          <div class="rolled-ship"
            :style="{transform: `rotate(-${navigator.roll}deg)`, transformOrigin: `center center`}"
          ></div>
        </div>
      </div>
<!--      **************** КОНТРОЛЛЕРЫ СНИЗУ ***************-->
      <div class="temperature">
        <div class="speed">
          <div class="speed-label"> Оптимальный уровень крена: </div>
          <div class="speed-value">{{navigator.rollOptimal[0]}}&deg / {{navigator.rollOptimal[1]}}&deg</div>
        </div>
        <div class="speed">
          <div class="speed-label"> Температура обшивки корпуса: </div>
          <div class="speed-value">{{navigator.temperature}}&degC</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let log = console.log;

  export default {
    name: "Pilot2",
    mounted() {
      document.title = 'Штурман';
      this.$socket.emit('conn', 'PILOT_2 connected');
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
    }
  }
</script>

<style scoped>
  .fullscreen {
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #272727;
    color: #ce6e00;
    font-family: "Microsoft Sans Serif", sans-serif;
  }
  .left {
    width: 50%;
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
    display: flex;
    align-items: center;
    padding: 20px 10px 10px 20px;
  }
  .speed-value {
    margin-left: 10px;
    font-size: 1.2rem;
    padding: 5px;
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
      color: #ce6e00;
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
    text-align: center;
  }
  .thrust-area {
    height: 30px;
    width: 300px;
    border: 1px solid #ce6e00;
    margin: 10px auto;
  }
  .thrust-value {
    height: 100%;
    background-color: #aa5500;
  }
  .temperature {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 2px solid #444444;
    padding-bottom: 10px;
  }
  .temperature .speed {
    padding-top: 10px;
  }
  .surface {
    display: flex;
    margin-top: 20px;
    border-top: 2px solid #444444;
    padding-top: 10px;
    justify-content: space-around;
  }
  .surface-cell>.trigger {
    justify-content: center;
  }
  .surface-cell>.speed {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .wind-area {
    position: relative;
  }
  .roll-area {
    background-color: #444;
    width: 450px;
    height: 450px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rolled-ship {
    width: 400px;
    height: 100px;
    background-color: #ce6e00;
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
  }
</style>
