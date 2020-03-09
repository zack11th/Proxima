<template>
  <div>
    <p>Engineer 2</p>
    <alert :header="alertEng.header"
           :message="alertEng.message"
           :button="alertEng.button"
           :parent="'alertEng'"
           v-if="alertEng.header || alertEng.message || alertEng.button"
    ></alert>
  </div>
</template>

<script>
  import Alert from './Other/Alert'

  export default {
    name: "Engineer",
    components: {
      Alert
    },
    data() {
      return {
        genGamepad: null,
        genGpIndex: null,
        genGamepadButtons: []
      }
    },
    computed: {
      alertEng() {
        return this.$store.getters.alertEng
      }
    },
    methods: {},
    mounted() {
      this.$socket.emit('conn', 'ENGINEER_2 connected')

      // подключение ОБЩЕГО геймпада (окно должно быть в фокусе, чтобы геймпад передавался)
      window.addEventListener("gamepadconnected", (e) => {
        this.genGpIndex = e.gamepad.index;
        let interval = setInterval(() => {
          this.genGamepad = navigator.getGamepads()[this.genGpIndex];
          this.genGamepad.buttons.forEach((item, i) => {
            this.genGamepadButtons[i] = item.value
          });
          this.$socket.emit('setGamepad', {axes: this.genGamepad.axes, buttons: this.genGamepadButtons});
        }, 100);
        console.log('gamepad connected');
      });
    }
  }
</script>

<style scoped>

</style>
