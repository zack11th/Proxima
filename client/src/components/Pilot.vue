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
        }

    }
</script>

<style scoped>
    .main {
      display: flex;
      flex-wrap: wrap;
      width: 100vw;
      height: 100vh;
    }
    .orbit-area {
      width: 50%;
      height: 70%;
      background-color: #202020;
    }
    .camera-area {
      width: 50%;
      height: 70%;
      background-color: #000
    }
    .controllers {
      width: 100%;
      height: 30%;
      background-color: #444;
    }
</style>
