<template>
    <div class="fullscreen">
      <div class="start center">
        <button @click="startLARP">START</button>
        <div class="clock">{{clock.h}} : {{clock.m}} : {{clock.s}}</div>
        <div class="go-home" v-if="orbit.ship.goHome">GO HOME</div>
      </div>
      <hr>
      <!--************** REBUTS *************-->
      <div class="flex">
        <h2>Перезагрузка</h2>
        <button @click="reboot('pilot')" :class="{down: !clients.pilot}">Пилот</button>
        <button @click="reboot('nav')" :class="{down: !clients.nav}">Штурман</button>
        <button @click="">Инженер</button>
        <button @click="reboot('eng_2')" :class="{down: !clients.eng_2}">Инженер_2</button>
        <button @click="">Медики</button>
        <button @click="">Командир</button>
        <button @click="">Общий</button>
      </div>
      <hr>
      <!--************ALERTS***********-->
      <h2>ALERTS</h2>
      <div class="flex no-wrap">
        <!--****** COMMANDER ALERTS ***********-->
        <div class="alert">
          <h2>Commander Alerts</h2>
          <div class="input-block">
            <label>header</label>
            <input type="text" v-model="alertCommand.header">
          </div>
          <div class="input-block">
            <label>message</label>
            <textarea v-model="alertCommand.message"></textarea>
          </div>
          <div class="input-block">
            <label>button</label>
            <input type="checkbox" v-model="alertCommand.button">
          </div>
          <div class="alert-in-process" v-if="alertInProcess_commander">{{alertMessage_commander}}</div>
          <div class="action">
            <button @click="clearAlert(alertCommand, alertEvents.commander)">Clear</button>
            <button @click="clickAlert(alertCommand, alertEvents.commander)">Отправить</button>
          </div>
        </div>
        <!--******PILOT ALERTS ***********-->
        <div class="alert">
          <h2>Pilot Alerts</h2>
          <div class="input-block">
            <label>header</label>
            <input type="text" v-model="alertPilot.header">
          </div>
          <div class="input-block">
            <label>message</label>
            <textarea v-model="alertPilot.message"></textarea>
          </div>
          <div class="input-block">
            <label>button</label>
            <input type="checkbox" v-model="alertPilot.button">
          </div>
          <div class="alert-in-process" v-if="alertInProcess_pilot">{{alertMessage_pilot}}</div>
          <div class="action">
            <button @click="clearAlert(alertPilot, alertEvents.pilot)">Clear</button>
            <button @click="clickAlert(alertPilot, alertEvents.pilot)">Отправить</button>
          </div>
        </div>
        <!--******ENGINEER ALERTS ***********-->
        <div class="alert">
          <h2>Engineer Alerts</h2>
          <div class="input-block">
            <label>header</label>
            <input type="text" v-model="alertEng.header">
          </div>
          <div class="input-block">
            <label>message</label>
            <textarea v-model="alertEng.message"></textarea>
          </div>
          <div class="input-block">
            <label>button</label>
            <input type="checkbox" v-model="alertEng.button">
          </div>
          <div class="alert-in-process" v-if="alertInProcess_engineer">{{alertMessage_engineer}}</div>
          <div class="action">
            <button @click="clearAlert(alertEng, alertEvents.engineer)">Clear</button>
            <button @click="clickAlert(alertEng, alertEvents.engineer)">Отправить</button>
          </div>
        </div>
        <!--******MEDIC ALERTS ***********-->
        <div class="alert">
          <h2>Medic Alerts</h2>
          <div class="input-block">
            <label>header</label>
            <input type="text" v-model="alertMedic.header">
          </div>
          <div class="input-block">
            <label>message</label>
            <textarea v-model="alertMedic.message"></textarea>
          </div>
          <div class="input-block">
            <label>button</label>
            <input type="checkbox" v-model="alertMedic.button">
          </div>
          <div class="alert-in-process" v-if="alertInProcess_medic">{{alertMessage_medic}}</div>
          <div class="action">
            <button @click="clearAlert(alertMedic, alertEvents.medic)">Clear</button>
            <button @click="clickAlert(alertMedic, alertEvents.medic)">Отправить</button>
          </div>
        </div>
        <!--******GENERAL ALERTS ***********-->
        <div class="alert">
          <h2>Общий Alerts</h2>
          <div class="input-block">
            <label>header</label>
            <input type="text" v-model="alertGeneral.header">
          </div>
          <div class="input-block">
            <label>message</label>
            <textarea v-model="alertGeneral.message"></textarea>
          </div>
          <div class="input-block">
            <label>button</label>
            <input type="checkbox" v-model="alertGeneral.button">
          </div>
          <div class="alert-in-process" v-if="alertInProcess_general">{{alertMessage_general}}</div>
          <div class="action">
            <button @click="clearAlert(alertGeneral, alertEvents.general)">Clear</button>
            <button @click="clickAlert(alertGeneral, alertEvents.general)">Отправить</button>
          </div>
        </div>
      </div>
      <!--**********end ALERTS*********-->
      <hr>
      <div class="flex">
        <!--************** PILOT *************-->
        <div class="pilot flex-row">
          <h3>Пилоты</h3>
          <p>Коэффициенты скоростей (v = 1 / k) </p>
          <div class="input-block" v-for="(planet, index) in orbit.planets" :key="planet.name">
            <label>{{planet.name}}:</label>
            <span>{{planet.K_speed}}</span>
            <input type="number" ref="planetProxima">
            <button @click="changeSpeed(index)">ok</button>
          </div>
          <div class="input-block">
            <span>Aurora</span>
            <span>{{orbit.ship.K_speed}}</span>
            <input type="number" ref="auroraSpeed">
            <button @click="changeSpeed(null)">ok</button>
          </div>
          <hr>
          <p>Посадка <span style="text-decoration: underline">Стадия №: {{navigator.stage}}</span></p>
          <div class="action">
            <button @click="toggleWind(true)">Включить ветер</button>
            <span>{{navigator.wind.inProcess}}</span>
            <button @click="toggleWind(false)">Отключить ветер</button>
            <span>{{navigator.wind.deg}}</span>
          </div>
          <div class="flex">
            <div class="">
              <p>Тумблер 1: {{navigator.nuclear.button_1}}</p>
              <p>Тумблер 2: {{navigator.nuclear.button_2}}</p>
            </div>
            <div class="">
              <p>Тумблер 3: {{navigator.manevr.button_1}}</p>
              <p>Тумблер 4: {{navigator.manevr.button_2}}</p>
            </div>
          </div>
          <div class="input-block">
            <span>Скорость</span>
            <span>{{Math.round(navigator.speedSurface)}}</span>
            <input type="number" ref="speedInput">
          </div>
          <div class="input-block">
            <span>Скорость оптимал</span>
            <span>{{Math.round(navigator.speedSurfaceOptimal)}}</span>
            <input type="number" ref="optimalInput">
          </div>
          <div class="input-block">
            <span>Ускорение</span>
            <span>{{Math.round(navigator.acceleration)}}</span>
            <input type="number" ref="accelerInput">
          </div>
          <div class="input-block">
            <span>Высота</span>
            <span>{{Math.round(navigator.heightSurface)}}</span>
            <input type="number" ref="heightInput">
          </div>
          <div class="input-block">
            <span>Дистанция</span>
            <span>{{Math.round(navigator.distance)}}</span>
            <input type="number" ref="distanceInput">
          </div>
          <div class="action">
            <button @click="changeNavigator">Задать значения</button>
          </div>
          <div class="on_surface">
            <p>Успешность: {{onSurface.success}}%</p>
            <p>Шасси: {{onSurface.chassis}}</p>
            <p>Угол: {{Math.round(onSurface.roll)}}&deg</p>
          </div>
          <div>
            <button @click="liftOff">Взлетаем!</button>
            <span>LiftOff: {{navigator.liftOff}}</span>
          </div>
        </div>
        <!--************** end PILOT ************-->
        <div class="scientist flex-row">
          <h3>Ученый</h3>
        </div>
        <div class="commander flex-row">
          <h3>Командир</h3>
        </div>
        <div class="all-chat flex-row">
          <h3>Общий чат</h3>
        </div>
      </div>
      <hr>
    </div>
</template>

<script>
  let log = console.log;

    export default {
      name: "Master",
      data () {
        return {
          clock: {
            h: 0,
            m: 0,
            s: 0
          },
          alertEvents: {
            pilot: 'alertPilot',
            engineer: 'alertEng',
            medic: 'alertMedic',
            commander: 'alertCommand',
            general: 'alertGeneral'
          },
          alertEng: {
            header: '',
            message: '',
            button: false,
            inProcess: false
          },
          alertMedic: {
            header: '',
            message: '',
            button: false,
            inProcess: false
          },
          alertCommand: {
            header: '',
            message: '',
            button: false,
            inProcess: false
          },
          alertGeneral: {
            header: '',
            message: '',
            button: false,
            inProcess: false
          },
          alertPilot: {
            header: '',
            message: '',
            button: false,
            inProcess: false
          }
        }
      },
      computed: {
        clients() {
          return this.$store.getters.getClients;
        },
        alertInProcess_pilot() {
          return this.$store.getters.alertPilot.inProcess;
        },
        alertInProcess_engineer() {
          return this.$store.getters.alertEng.inProcess;
        },
        alertInProcess_medic() {
          return this.$store.getters.alertMedic.inProcess;
        },
        alertInProcess_commander() {
          return this.$store.getters.alertCommand.inProcess;
        },
        alertInProcess_general() {
          return this.$store.getters.alertGeneral.inProcess;
        },
        alertMessage_pilot() {
          return this.$store.getters.alertPilot.message;
        },
        alertMessage_engineer() {
          return this.$store.getters.alertEng.message;
        },
        alertMessage_medic() {
          return this.$store.getters.alertMedic.message;
        },
        alertMessage_commander() {
          return this.$store.getters.alertCommand.message;
        },
        alertMessage_general() {
          return this.$store.getters.alertGeneral.message;
        },
        orbit() {
          return this.$store.getters.get_orbit;
        },
        navigator() {
          return this.$store.getters.get_navigator;
        },
        onSurface() {
          return this.$store.getters.get_surface;
        }
      },
      methods: {
        startLARP() {
          this.onClock();
          this.$socket.emit('startLarp');
        },
        reboot(target) {
          this.$socket.emit('rebootThat', target);
        },
        onClock() {
          setInterval(() => {
            this.clock.s++;
            if(this.clock.s >= 60) {
              this.clock.s = 0;
              this.clock.m++;
              if(this.clock.m >= 60) {
                this.clock.m = 0;
                this.clock.h++;
              }
            }
          }, 1000);
        },
        // *** АЛЕРТЫ *************************************
        clickAlert(alert, socketEvent) {
          if (alert.header || alert.message || alert.button){
            alert.inProcess = true;
          }else{
            alert.inProcess = false;
          }
          this.$socket.emit('alert', {event: socketEvent, alert: alert})
        },
        clearAlert(alert, socketEvent) {
          alert = {
            header: '',
            message: '',
            button: false
          };
          this.clickAlert(alert, socketEvent);
        },
        // *** ПИЛОТЫ *********************************
        changeSpeed(index) {
          if(index !== null) {
            this.orbit.planets[index].K_speed = this.$refs.planetProxima[index].valueAsNumber;
          } else {
            this.orbit.ship.K_speed = this.$refs.auroraSpeed.valueAsNumber;
          }
          this.$socket.emit('setPlanet', this.orbit);
        },
        changeNavigator() {
          let speed = (!isNaN(this.$refs.speedInput.valueAsNumber)) ? this.$refs.speedInput.valueAsNumber : this.navigator.speedSurface;
          let speedOptimal = (!isNaN(this.$refs.optimalInput.valueAsNumber)) ? this.$refs.optimalInput.valueAsNumber : this.navigator.speedSurfaceOptimal;
          let acceleration = (!isNaN(this.$refs.accelerInput.valueAsNumber)) ? this.$refs.accelerInput.valueAsNumber : this.navigator.acceleration;
          let height = (!isNaN(this.$refs.heightInput.valueAsNumber)) ? this.$refs.heightInput.valueAsNumber : this.navigator.heightSurface;
          let distance = (!isNaN(this.$refs.distanceInput.valueAsNumber)) ? this.$refs.distanceInput.valueAsNumber : this.navigator.distance;

          this.$store.commit('changeNavigator', {speed, speedOptimal, acceleration, height, distance, socket: this.$socket});
        },
        toggleWind(wind) {
          this.$socket.emit('changeWind', wind);
        },
        liftOff() {
          this.$socket.emit('liftOff');
        }
        // *** УЧЕНЫЙ *****************************
        // *** КОМАНДОР ***************************
        // *** ОБЩИЙ КОМП *************************
      },
      mounted() {
        document.title = 'Мастер';
        this.$socket.emit('conn', 'master')
      }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  p {
    margin: 0
  }
  h2 {
    margin: 5px;
    text-align: center;
  }
  .fullscreen {
    width: 100%;
    min-height: 100vh;
    background-color: #404040;
    font-family: Arial, sans-serif;
    padding: 10px;
    color: #a3d0b9;
  }
  .center {
    text-align: center;
  }
  .start {
    position: relative;
  }
  .start > button {
    font-size: 2rem;
    color: black;
  }
  .clock {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
  }
  .go-home {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background-color: #ce6e00;
    padding: 5px;
    border-radius: 5px;
  }
  .down {
    background: red;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .flex.no-wrap {
    flex-wrap: nowrap;
  }
  .flex-row {
    border-right: 2px solid white;
    width: 25%;
  }
  .input-block {
    display: flex;
    justify-content: space-between;
  }
  button {
    cursor: pointer;
  }
  .fullscreen .action {
    justify-content: space-around;
    margin-top: 10px;
  }
  .flex .alert-in-process {
    justify-content: center;
    animation: miganie 1s ease-in-out 0s infinite;
  }
  @keyframes miganie {
    0%, 100% {
      background-color: darkred;
    }
    50% {
      background-color: transparent;
    }
  }
  .alert {
    margin-left: 10px;
  }
  .on_surface {
    background-color: #008d00;
  }
</style>
