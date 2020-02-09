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
    </div>
</template>

<script>
    import OrbitArea from './forPilot/OrbitArea'
    import Controllers from './forPilot/Controllers'
    import CameraArea from './forPilot/CameraArea'

    export default {
        name: "Pilot",
        components: {
          OrbitArea,
          Controllers,
          CameraArea
        },
        mounted() {
          this.$socket.emit('conn', 'PILOT connected')
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
      background-color: #1b1b1b;
    }
    .camera-area {
      /*width: calc(100% - 960px);*/
      width: 960px;
      height: 100vh;
      background-color: #000
    }
    .controllers {
      width: 35%;
      height: calc(100% - 800px);
      background-color: #444;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
</style>
