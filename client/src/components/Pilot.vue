<template>
    <div class="main">
      <div class="orbit-area">
        <orbit-area></orbit-area>
      </div>
      <div class="camera-area">
        <camera-area></camera-area>
      </div>
      <div class="controllers">
        <controllers></controllers>
      </div>
      <alert :header="alertPilot.header"
             :message="alertPilot.message"
             :button="alertPilot.button"
             :parent="'alertPilot'"
             v-if="alertPilot.header || alertPilot.message || alertPilot.button"
      ></alert>
    </div>
</template>

<script>
    import OrbitArea from './forPilot/OrbitArea'
    import Controllers from './forPilot/Controllers'
    import CameraArea from './forPilot/CameraArea'
    import Alert from './Other/Alert'

    export default {
        name: "Pilot",
        components: {
          OrbitArea,
          Controllers,
          CameraArea,
          Alert
        },
        computed: {
          alertPilot() {
            return this.$store.getters.alertPilot
          }
        },
        mounted() {
          document.title = 'Пилот';
          this.$socket.emit('conn', 'pilot')
        }

    }
</script>

<style scoped>
    .main {
      display: flex;
      flex-wrap: wrap;
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    .orbit-area {
      width: 960px;
      height: 100vh;
      background-color: #070707;
    }
    .camera-area {
      /*width: calc(100% - 960px);*/
      width: 960px;
      height: 100vh;
      background-color: #070707;
    }
    .controllers {
      background-color: transparent;
      position: absolute;
      left: 0;
      top: 0;
    }
</style>
