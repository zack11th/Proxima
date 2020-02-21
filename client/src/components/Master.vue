<template>
    <div class="fullscreen">
      <div class="start center">
        <button @click="startLARP">START</button>
      </div>
      <hr>
      <h2>ALERTS</h2>
      <div class="flex">
        <div class="alert">
          <h2>Pilot Alerts</h2>
          <div>
            <label>header</label>
            <input type="text" v-model="alertPilot.header">
          </div>
          <div>
            <label>message</label>
            <textarea v-model="alertPilot.message"></textarea>
          </div>
          <div>
            <label>button</label>
            <input type="checkbox" v-model="alertPilot.button">
          </div>
          <div class="alert-in-process" v-if="alertInProcess_pilot">ALERT</div>
          <div class="action">
            <button @click="clearAlert(alertEvents.pilot)">Clear</button>
            <button @click="clickAlert(alertPilot, alertEvents.pilot)">Отправить</button>
          </div>
        </div>
      </div>
      <hr>
      <div class="flex">
        <div class="pilot flex-row">
          <h3>Пилоты</h3>
        </div>
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
            pilot: 'alertPilot'
          },
          alertPilot: {
            header: '',
            message: 'Примите ручное управление, чтобы начать процедуру посадки',
            button: false,
            inProcess: false
          }
        }
      },
      computed: {
        angle: {
          get(){
            return this.$store.getters.get_planet.angle;
          },
          set(){
            console.log('setter computed')
          }
        },
        alertInProcess_pilot() {
            return this.$store.getters.alertPilot.inProcess
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
          this.$socket.emit(socketEvent, alert)
        },
        clearAlert(socketEvent) {
          this.alertPilot = {
            header: '',
            message: '',
            button: false
          };
          this.clickAlert(this.alertPilot, socketEvent);
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
  .flex-row {
    border-right: 2px solid white;
    width: 25%;
  }
  .flex > div > div {
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
