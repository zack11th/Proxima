<template>
    <div class="fullscreen">
      <div class="start center">
        <button @click="startLARP">START</button>
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
          <p>Коэффициенты скоростей</p>
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
          }
        }
      },
      computed: {
        alertInProcess_pilot() {
            return this.$store.getters.alertPilot.inProcess
        },
        alertInProcess_engineer() {
          return this.$store.getters.alertEng.inProcess
        },
        alertInProcess_medic() {
          return this.$store.getters.alertMedic.inProcess
        },
        alertInProcess_commander() {
          return this.$store.getters.alertCommand.inProcess
        },
        alertInProcess_general() {
          return this.$store.getters.alertGeneral.inProcess
        },
        alertMessage_pilot() {
          return this.$store.getters.alertPilot.message
        },
        alertMessage_engineer() {
          return this.$store.getters.alertEng.message
        },
        alertMessage_medic() {
          return this.$store.getters.alertMedic.message
        },
        alertMessage_commander() {
          return this.$store.getters.alertCommand.message
        },
        alertMessage_general() {
          return this.$store.getters.alertGeneral.message
        },
        orbit() {
          return this.$store.getters.get_orbit
        }
      },
      methods: {
        startLARP() {
          this.$socket.emit('startLarp');
        },
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
        changeSpeed(index) {
          if(index !== null) {
            this.orbit.planets[index].K_speed = this.$refs.planetProxima[index].valueAsNumber;
            console.log(this.orbit.planets[index].K_speed)
          } else {
            this.orbit.ship.K_speed = this.$refs.auroraSpeed.valueAsNumber;
          }
          this.$socket.emit('setPlanet', this.orbit);
        }
      },
      mounted() {
        this.$socket.emit('conn', 'MASTER connected')
      }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
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
  .start > button {
    font-size: 2rem;
    color: black;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
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
</style>
