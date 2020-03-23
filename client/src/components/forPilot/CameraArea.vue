<template>
  <div class="main">
    <div class="wrap" id="video-cont" ref="wrapRef">
      <div class="wrap-cont" ref="wrapContRef">
        <div class="change-cont">
          <video class="video"
                 v-show="!navigator.on_surface"
                 ref="videoRef"
                 muted="muted"
                 src="../../assets/videoplayback-bcam.mp4"
                 :style="{transform: `rotate(${z}deg) translate(${x*Math.cos(degToRad(z)) + y*Math.sin(degToRad(z))}px, ${y*Math.cos(degToRad(z))-x*Math.sin(degToRad(z))}px)`, transformOrigin: `center center`}"
          ></video>
          <video src="../../assets/videoplayback.mp4"
                 class="video"
                 v-show="navigator.on_surface"
                 ref="videoLiftOff"
                 muted="muted"
                 :style="{transform: `rotate(${0}deg) translate(${x*Math.cos(degToRad(0)) + y*Math.sin(degToRad(0))}px, ${y*Math.cos(degToRad(0))-x*Math.sin(degToRad(0))}px)`, transformOrigin: `center center`}"
          ></video>
        </div>
        <div class="change-cont"
             v-if="!navigator.on_surface"
             :style="{transform: `rotate(${z}deg) translate(${x*Math.cos(degToRad(z)) + y*Math.sin(degToRad(z))}px, ${y*Math.cos(degToRad(z))-x*Math.sin(degToRad(z))}px)`, transformOrigin: `center center`}"
        >
          <img class="target" src="../../assets/close.png" alt="">
          <span class="deg">{{Math.round(z)}}</span>
        </div>
      </div>
      <img class="aim" src="../../assets/plus.png" alt="" >
      <img src="../../assets/cameraSpace.jpg" alt="" class="camera-space" v-if="cameraSpace">
    </div>
    <div class="success-landing center" v-if="success">Вероятность успешной посадки: {{success}} %</div>
    <div class="controllers">
      <div class="flex-col">
        <div class="center">Тяга, %</div>
        <div class="flex">
          <div class="ml">
            <p class="center">Я.Д.</p>
            <div class="thrust">
              <div class="thrust-value" :style="{height: navigator.nuclear.thrust +'%'}"></div>
            </div>
          </div>
          <div class="ml">
            <p class="center">М.Д.</p>
            <div class="thrust">
              <div class="thrust-value" :style="{height: navigator.manevr.thrust +'%'}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-col other-col">
        <div class="item big">
          <p class="center">Скорость:</p>
          <p class="center">{{Math.round(navigator.speedSurface) || '--'}} м/с</p>
        </div>
        <div class="item">Отклонение курса: крен {{Math.round(z)}}</div>
        <div class="item">Отклонение курса: тангаж {{y}}</div>
        <div class="item">Отклонение курса: рыскание {{x}}</div>
      </div>
      <div class="flex-col other-col">
        <div class="item">Состояние предкрылков:</div>
        <div class="item">Состояние закрылков:</div>
        <div class="item">Тензодатчик правого крыла:</div>
        <div class="item">Тензодатчик левого крыла:</div>
      </div>
    </div>
  </div>
</template>

<script>
  let log = console.log;

    export default {
      name: "CameraArea",
      data() {
        return {
          gamepad: null,
          gpIndex: null,
          x: 0,
          y: 0,
          z: 0,
          video: {
            w: 0,
            h: 0
          },
          videoWrap: {
            w: 0,
            h: 0
          },
          targetX: 0,
          targetY: 0,
          targetSquare: 50, // квадрат правильного курса (размер квадрата, за который начисляются очки успешности посадки)
          score: 0,
          maxScore: 0,
          cameraSpace: true,
          liftOffVideo: true, // флаг для запуска видео взлета
        }
      },
      computed: {
        generalGamepad() {
          return this.$store.getters.get_gamepad;
        },
        navigator() {
          return this.$store.getters.get_navigator;
        },
        difficult() {
          return this.$store.getters.difficult;
        },
        landing_success() { // флаг указывающий на то, что Аврора приземляется
          return this.$store.getters.get_landing;
        },
        centerCameraX() {
          return this.video.w / 2 - this.x + this.targetX
        },
        centerCameraY() {
          return this.video.h / 2 - this.y + this.targetY
        },
        success: { // процент успешности посадки
          get() {
            return Math.round(this.score * 100 / this.maxScore);
          },
          set() {console.log('set success')}
        }
      },
      watch: {
        navigator() {
          if(!this.navigator.nuclear.button_1 && !this.navigator.nuclear.button_2 &&
            this.navigator.manevr.button_1 && this.navigator.manevr.button_2 &&
            this.landing_success) { // включен режим ручного управления тягой маневрогого двигателя в первый раз

            if(this.cameraSpace) {
              this.cameraSpace = false;
              this.$store.commit('clearAlert', {socket: this.$socket, alert: 'alertPilot'});
              let countDown = 10; // обратный отсчет перед запуском ручного режима посадки
              let startCount = setInterval(() => {
                if (countDown < 0) {
                  clearInterval(startCount);
                  this.$store.commit('clearAlert', {socket: this.$socket, alert: 'alertPilot'});
                  this.$refs.videoRef.play();
// ************** УСКОРЕНИЕ тестового ВИДЕО **************** УБРАТЬ одну строку ниже
                  this.$refs.videoRef.playbackRate = 1.5;
                  this.$socket.emit('startVideoLanding');
                  this.flight();
                }
                this.$store.commit('setAlert', {header: String(countDown)});
                countDown--;
              }, 1000);
            }
          }
          if (this.liftOffVideo && this.navigator.liftOff) {
            this.liftOffVideo = false;
            this.$refs.videoLiftOff.play();
          }
        }
      },
      methods: {
        flight() {
          this.gamepad = navigator.getGamepads()[this.gpIndex];
          this.x -= Math.round(this.gamepad.axes[5]*5); // рыскание
          this.y += Math.round(this.gamepad.axes[1]*5); // тангаж
          this.z -= 2 * this.gamepad.axes[0]; // крен
          if (this.z > 360) this.z = 0;
          if (this.z < 0) this.z = 360;
          this.$socket.emit('roll', this.z);

          // проверки на крайние положения
          this.x = (this.x < (this.targetX - this.videoWrap.w / 2)) ? (this.targetX - this.videoWrap.w / 2) : this.x;
          this.x = (this.x > (this.targetX + this.videoWrap.w / 2)) ? (this.targetX + this.videoWrap.w / 2) : this.x;
          this.y = (this.y < (this.targetY - this.videoWrap.h / 2)) ? (this.targetY - this.videoWrap.h / 2) : this.y;
          this.y = (this.y > (this.targetY + this.videoWrap.h / 2)) ? (this.targetY + this.videoWrap.h / 2) : this.y;

          if (this.navigator.stage > 3) {
            this.endLanding();
            return;
          }
          this.successLanding();
          window.requestAnimationFrame(this.resistance)
        },
        resistance() {
          let random = Math.random();
          let directX = (random > 0.6) ? 1 : (random < 0.4) ? -1 : 0;
          random = Math.random();
          let directY = (random > 0.6) ? 1 : (random < 0.4) ? -1 : 0;

          this.x = this.x + directX * this.difficult;
          this.y = this.y + directY * this.difficult;
          window.requestAnimationFrame(this.flight)
        },
        successLanding() {
          this.maxScore++;
          if ((this.x - this.targetSquare < this.targetX) &&
              (this.x + this.targetSquare > this.targetX) &&
              (this.y - this.targetSquare < this.targetY) &&
              (this.y + this.targetSquare > this.targetY)) {
            this.score ++;
          }
        },
        endLanding() {
          this.$refs.videoRef.pause();
          this.$socket.emit('endLanding', {
            success: this.success,
            chassis: this.navigator.chassis,
            roll: this.navigator.roll
          });
        },
        degToRad(z) {
          return z * Math.PI / 180;
        },
        getRandom(min, max) {
          return Math.random() * (max - min) + min;
        }
      },
      mounted () {
        // setInterval(()=>{
        //   log(`difficult: ${this.difficult}`)
        // },1000)

        // размеры wrap-cont
        this.video.w = Number(window.getComputedStyle(this.$refs.wrapContRef).getPropertyValue('width').replace(/\D+/g,""));
        this.video.h = Number(window.getComputedStyle(this.$refs.wrapContRef).getPropertyValue('height').replace(/\D+/g,""));
        this.videoWrap.w = Number(window.getComputedStyle(this.$refs.wrapRef).getPropertyValue('width').replace(/\D+/g,""));
        this.videoWrap.h = Number(window.getComputedStyle(this.$refs.wrapRef).getPropertyValue('height').replace(/\D+/g,""));

        this.targetX = -(this.video.w - this.videoWrap.w) / 2;
        this.targetY = -(this.video.h - this.videoWrap.h) / 2;

        this.x = this.targetX;
        this.y = this.targetY;

        window.addEventListener("gamepadconnected", (e) => {
          this.gpIndex = e.gamepad.index;
          let interval = setInterval(() => {
            this.gamepad = navigator.getGamepads()[this.gpIndex];
          }, 100);
          console.log('gamepad connected');
        });
      }
    }
</script>

<style scoped>
  .main {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .wrap {
    width: 95%;
    height: 550px;
    overflow: hidden;
    position: absolute;
    border-radius: 10px;
    border: 10px solid #ce6e00;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .wrap-cont {
    width: 4000px; /* равно ширине видео (посмотреть computed в браузере) */
    height: 2250px; /* равно высоте видео (посмотреть computed в браузере) ЧИСЛО ДОЛЖНО БЫТЬ ЦЕЛЫМ*/
    position: absolute;
  }
  .change-cont {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .video {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  .target {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .deg {
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% + 20px);
    color: #ce6e00;
    text-shadow: 0 0 1px black;
  }
  .aim {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
  }
  .success-landing {
    color: #ce6e00;
    font-size: 2rem;
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
  }
  .camera-space {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .controllers {
    box-sizing: border-box;
    width: 100%;
    height: 250px;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row-reverse;
    color: #ce6e00;
    padding: 10px 30px 10px 10px;
  }
  .flex {
    display: flex;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .item {
    margin-bottom: 20px;
  }
  .center {
    text-align: center;
  }
  .ml {
    margin-left: 10px;
  }
  .thrust {
    width: 30px;
    height: 150px;
    border: 2px solid #ce6e00;
    position: relative;
  }
  .other-col {
    width: 30%;
    justify-content: flex-end;
  }
  .big {
    font-size: 1.5rem;
  }
  .thrust-value {
    width: 100%;
    background-color: #aa5500;
    position: absolute;
    bottom: 0;
  }
</style>
