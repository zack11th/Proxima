<template>
  <div>
    <div class="fullscreen">
      <div class="col">
        <div class="aurora">
          <img src="../assets/Аврора.png" alt="" ref="aurorapng">
          <div class="box" ref="boxref">
            <div class="subbox">
              <div class="l01" :class="{fire: fire.l01, probit: probit.l01}"></div>
              <div class="l02 shluz" :class="{fire: fire.l02, probit: probit.l02}"></div>
              <div class="l03" :class="{fire: fire.l03, probit: probit.l03}"></div>
              <div class="l04" :class="{fire: fire.l04, probit: probit.l04}"></div>
              <div class="c02"></div>
              <div class="c03"></div>
              <div class="r01" :class="{fire: fire.r01, probit: probit.r01}"></div>
              <div class="r02 med" :class="{fire: fire.r02, probit: probit.r02}"></div>
              <div class="r03" :class="{fire: fire.r03, probit: probit.r03}"></div>
              <div class="r04" :class="{fire: fire.r04, probit: probit.r04}"></div>
              <div class="oxy" :class="{fire: fire.oxy, probit: probit.oxy}"></div>
              <div class="ch4" :class="{fire: fire.ch4, probit: probit.ch4}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col right"></div>
    </div>
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
        genGamepadButtons: [],
        wAurora: '0px'
      }
    },
    computed: {
      alertEng() {
        return this.$store.getters.alertEng
      },
      fire() {
        return this.$store.getters.get_fire;
      },
      probit() {
        return this.$store.getters.get_probit;
      }
    },
    methods: {},
    mounted() {
      document.title = 'Инженер_2';
      this.$socket.emit('conn', 'eng_2');

      // подключение ОБЩЕГО геймпада (окно должно быть в фокусе, чтобы геймпад передавался)
      window.addEventListener("gamepadconnected", (e) => {
        this.genGpIndex = e.gamepad.index;
        let interval = setInterval(() => {
          this.genGamepad = navigator.getGamepads ? navigator.getGamepads()[this.genGpIndex] : (navigator.webkitGetGamepads[this.genGpIndex] ? navigator.webkitGetGamepads[this.genGpIndex] : []);
          this.genGamepad.buttons.forEach((item, i) => {
            this.genGamepadButtons[i] = item.value
          });
          this.$socket.emit('setGamepad', {axes: this.genGamepad.axes, buttons: this.genGamepadButtons});
        }, 100);
        console.log('gamepad connected');
      });

      // расчет величины изображения Авроры
      let A = this.$refs.aurorapng;
      setTimeout(() => {
        this.$refs.boxref.style.width = window.getComputedStyle(A).width;
        this.$refs.boxref.style.height = window.getComputedStyle(A).height;
      }, 2000);

    }
  }
</script>

<style scoped>
  .fullscreen {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .col {
    width: 50%;
    background-color: #777777;
  }
  .right {
    background-color: #040404;
  }
  .aurora {
    height: 100vh;
  }
  .aurora > img {
    max-height: 100%;
    max-width: 100%;
    position: relative;
  }
  .box {
    position: absolute;
    top: 0;
    left: 0;
  }
  .subbox {
    /*background-color: rgba(200,100,100,0.5);*/
    width: 35%;
    height: 35%;
    position: absolute;
    top: 27.5%;
    left: 33%;
    display: grid;
    grid-template-areas:  "l01 c02 r01"
                          "l02 c02 r02"
                          "l03 c03 r03"
                          "l04 c03 r04";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
  .l01 {
    grid-area: l01;
    position: relative;
  }
  .l02 {
    grid-area: l02;
    position: relative;
  }
  .l03 {
    grid-area: l03;
    position: relative;
  }
  .l04 {
    grid-area: l04;
    position: relative;
  }
  .c02 {
    grid-area: c02;
    position: relative;
  }
  .c03 {
    grid-area: c03;
    position: relative;
  }
  .r01 {
    grid-area: r01;
    position: relative;
  }
  .r02 {
    grid-area: r02;
    position: relative;
  }
  .r03 {
    grid-area: r03;
    position: relative;
  }
  .r04 {
    grid-area: r04;
    position: relative;
  }
  .oxy {
    position: absolute;
    bottom: 0;
    right: 100%;
    width: 20%;
    height: 40%;
    /*background-color: rgba(200,100,100,0.5);*/
  }
  .ch4 {
    position: absolute;
    bottom: 0;
    left: 100%;
    width: 20%;
    height: 40%;
    /*background-color: rgba(200,100,100,0.5);*/
  }
  .fire, .probit {
    background-color: rgba(200,100,100,0.7);
    animation: warning 1s ease-in-out infinite;
  }
  .fire:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
    height: 40px;
    background-image: url("../assets/fire.png");
    background-size: contain;
  }
  .probit:before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 50px;
    height: 50px;
    background-image: url("../assets/proboina.png");
    background-size: contain;
  }
  @keyframes warning {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
