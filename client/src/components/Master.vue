<template>
    <div class="fullscreen">
      <div class="start center">
        <button @click="startLARP">START</button>
        <div class="clock">{{time.h}} : {{time.m}} : {{time.s}}</div>
        <div class="go-home" v-if="orbit.ship.goHome">GO HOME</div>
      </div>
      <hr>
      <!--************** REBUTS *************-->
      <div class="flex">
        <h2>Перезагрузка</h2>
        <button @click="reboot('pilot')" :class="{down: !clients.pilot}">Пилот</button>
        <button @click="reboot('nav')" :class="{down: !clients.nav}">Штурман</button>
        <button @click="reboot('eng')" :class="{down: !clients.eng}">Инженер</button>
        <button @click="reboot('eng_2')" :class="{down: !clients.eng_2}">Инженер_2</button>
        <button @click="reboot('scient')" :class="{down: !clients.scient}">Ученый</button>
        <button @click="reboot('med')" :class="{down: !clients.med}">Медики</button>
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
          <button @click="hardLanding">Принудительная посадка</button>
          <p>Посадка <span style="text-decoration: underline">Стадия №: {{navigator.stage}}</span></p>
          <div class="action">
            <button @click="toggleWind(true)">Включить ветер</button>
            <span>{{navigator.wind.inProcess}}</span>
            <button @click="toggleWind(false)">Отключить ветер</button>
            <span>{{navigator.wind.deg}}</span>
            <span>|угол: {{navigator.roll}}</span>
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
            <span>Температура</span>
            <span>{{Math.round(navigator.temperature)}}</span>
            <input type="number" ref="temperInput">
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
          <hr>
          <div>
            <button @click="changeStage(500000, 3929)">стадия 0</button>
            <button @click="changeStage(199999, 8000)">стадия 1</button>
            <button @click="changeStage(39999, 6000)">стадия 2</button>
            <button @click="changeStage(4999, 500)">стадия 3</button>
          </div>
        </div>
        <!--************** end PILOT ************-->
        <!--************** УЧЕНЫЙ ***************-->
        <div class="scientist flex-row">
          <h3>Ученый</h3>
          <div class="input-block">
            <span>Словари</span>
            <span>{{glossary}}</span>
            <input type="number" ref="glossary">
            <button @click="changeGlossary">ok</button>
          </div>
          <!--************** end УЧЕНЫЙ ************-->
          <hr>
          <!--*************** МЕДИКИ ***************-->
          <h3>Медик</h3>
          <div  class="pacient"
                v-for="person in personal"
                :key="person.id">
            <div class="gamer">{{ person.gamer }}</div>
            <div class="row">
              <span>{{ person.profile }}:&nbsp </span>
              <input type="radio" :name="`group${person.id}`" value="name" checked>
              <span> {{ person.name }}</span>
              <input type="text" :ref="`medicInput${person.id}`">
              <button @click="medicChange(person.id)">ok</button>
            </div>
            <div class="row">
              <div class="col">
                <input type="radio" :name="`group${person.id}`" value="puls">
                <span>пульс</span>
                <span>{{ person.puls }}</span>
                <button>up</button>
                <button>down</button>
              </div>
              <div class="col">
                <span>
                  <input type="radio" :name="`group${person.id}`" value="preassureU"> /
                  <input type="radio" :name="`group${person.id}`" value="preassureD">
                </span>
                <span>Pa</span>
                <span>{{ person.preassureU }} / {{ person.preassureD }}</span>
                <button>up</button>
                <button>down</button>
              </div>
              <div class="col">
                <input type="radio" :name="`group${person.id}`" value="oxy">
                <span>O<sub>2</sub></span>
                <span>{{ person.oxy }}</span>
                <button>up</button>
                <button>down</button>
              </div>
              <div class="col">
                <input type="radio" :name="`group${person.id}`" value="water">
                <span>H<sub>2</sub>O</span>
                <span>{{ person.water }}</span>
                <button>up</button>
                <button>down</button>
              </div>
              <div class="col">
                <input type="radio" :name="`group${person.id}`" value="nuclear">
                <span>rad</span>
                <span>{{ person.nuclear }}</span>
                <button>up</button>
                <button>down</button>
              </div>
            </div>
            <button class="row">Сделать ПЛОХО</button>
          </div>
          <!--*************** end МЕДИКИ ***************-->
        </div>

        <!--*************** ИНЖЕНЕР ***************-->
        <div class="engineer flex-row">
          <h3>Инженер</h3>
          <div class="power flex">
            <div class="power-cell">
              <div class="cell"
                   v-for="(item, index) in warningCell"
                   :key="index"
                   :class="{warning: !item}"
              ></div>
            </div>
            <div class="kill-cell">
              <input type="number" v-model="percentKillCell">
              <span> %</span>
              <br>
              <button @click="killCell">убить</button>
              <br><br>
              <input type="number" v-model="recoveringCell">
              <span> шт</span>
              <br>
              <button @click="recoverCell">починить</button>
            </div>
          </div>
          <hr>
          <div class="aurora-box">
            <p><b>Проблемы в модулях корабля при посадке</b></p>
            <p>Отсеки экипажа: левый
              <input type="checkbox" v-model="fire.l01"> огонь
              <input type="checkbox" v-model="probit.l01"> дыра
            </p>
            <p>Отсеки экипажа: правый
              <input type="checkbox" v-model="fire.r01"> огонь
              <input type="checkbox" v-model="probit.r01"> дыра
            </p>
            <p>Шлюз:
              <input type="checkbox" v-model="fire.l02"> огонь
              <input type="checkbox" v-model="probit.l02"> дыра
            </p>
            <p>Медпункт:
              <input type="checkbox" v-model="fire.r02"> огонь
              <input type="checkbox" v-model="probit.r02"> дыра
            </p>
            <p>Хранилие 1-1
              <input type="checkbox" v-model="fire.l03"> огонь
              <input type="checkbox" v-model="probit.l03"> дыра
            </p>
            <p>Хранилие 1-2
              <input type="checkbox" v-model="fire.r03"> огонь
              <input type="checkbox" v-model="probit.r03"> дыра
            </p>
            <p>Хранилие 2-1
              <input type="checkbox" v-model="fire.l04"> огонь
              <input type="checkbox" v-model="probit.l04"> дыра
            </p>
            <p>Хранилие 2-2
              <input type="checkbox" v-model="fire.r04"> огонь
              <input type="checkbox" v-model="probit.r04"> дыра
            </p>
            <p>Кислород:
              <input type="checkbox" v-model="fire.oxy"> огонь
              <input type="checkbox" v-model="probit.oxy"> дыра
            </p>
            <p>CH4:
              <input type="checkbox" v-model="fire.ch4"> огонь
              <input type="checkbox" v-model="probit.ch4"> дыра
            </p>
            <button @click="auroraBox">Задать</button>
          </div>
        </div>
        <!--************** end ИНЖЕНЕР ************-->
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
          },
          percentKillCell: 0,
          recoveringCell: 0,
          fire: { // объект для классов подсветки горящих модулей Авроры
            l01: false,
            l02: false,
            l03: false,
            l04: false,
            r01: false,
            r02: false,
            r03: false,
            r04: false,
            oxy: false,
            ch4: false
          },
          probit: { // объект для классов подсветки пробитыых модулей Авроры
            l01: false,
            l02: false,
            l03: false,
            l04: false,
            r01: false,
            r02: false,
            r03: false,
            r04: false,
            oxy: false,
            ch4: false
          }
        }
      },
      computed: {
        time() {
          return this.$store.getters.getTime;
        },
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
        },
        glossary() {
          return this.$store.getters.get_glossary;
        },
        personal() {
          return this.$store.getters.personal;
        },
        warningCell() {
          return this.$store.getters.get_warningCell;
        }
      },
      methods: {
        startLARP() {
          this.$socket.emit('startLarp');
        },
        reboot(target) {
          this.$socket.emit('rebootThat', target);
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
        hardLanding() {
          this.$socket.emit('hardLanding');
        },
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
          let temperature = (!isNaN(this.$refs.temperInput.valueAsNumber)) ? this.$refs.temperInput.valueAsNumber : this.navigator.temperature;

          this.$store.commit('changeNavigator', {speed, speedOptimal, acceleration, height, distance, temperature, socket: this.$socket});
        },
        toggleWind(wind) {
          this.$socket.emit('changeWind', wind);
        },
        liftOff() {
          this.$socket.emit('liftOff');
        },
        changeStage(height, speed) {
          this.$socket.emit('changeStage', {height, speed});
        },
        // *** УЧЕНЫЙ *****************************
        changeGlossary() {
          let glossary = this.$refs.glossary.valueAsNumber;
          this.$socket.emit('setGlossary', glossary);
        },
        // *** МЕДИКИ ***************************
        medicChange(id) {
          let name = null;
          document.getElementsByName(`group${id}`).forEach(item => {
            if (item.checked) name = item.value;
          });
          let value = this.$refs[`medicInput${id}`][0].value;
          this.$socket.emit('medicChangeMaster', {id, name, value});
        },
        // *** ИНЖЕНЕР ***************************
        killCell() {
          this.$socket.emit('breakTEG', this.percentKillCell);
        },
        recoverCell() {
          this.$socket.emit('recoverTEG', this.recoveringCell);
        },
        auroraBox() {
          this.$socket.emit('auroraBoxMaster', {fire: this.fire, probit: this.probit});
        }
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
  body {
    font-family: Arial, sans-serif;
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
  input[type="number"] {
    width: 50px;
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
  .power-cell {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    padding-left: 10px;
  }
  .cell {
    width: 4px;
    height: 4px;
    margin: 0;
    background-color: #22c325;
    box-sizing: border-box;
  }
  .warning {
    background-color: #990000;
  }
  .kill-cell {
    width: 30%;
  }
  .aurora-box > p {
    text-align: right;
  }
  .aurora-box > button {
    position: relative;
    width: 50%;
    left: 50%;
  }
  .pacient {
    margin-bottom: 5px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
  }
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gamer {
    color: black;
    font-weight: bold;
    background-color: darkorange;
    text-align: center;
  }
</style>
