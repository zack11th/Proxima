<template>
  <div class="main">
    <div class="wrap" id="video-cont" ref="wrapRef">
      <div class="wrap-cont" ref="wrapContRef">
           <!--:style="{top: targetY+'px', left: targetX+'px'}">-->
        <div class="change-cont">
          <video class="video" ref="videoRef" muted="muted" src="../../assets/videoplayback.mp4"
                 :style="{transform: `rotate(${z}deg) translate(${x*Math.cos(degToRad(z)) + y*Math.sin(degToRad(z))}px, ${y*Math.cos(degToRad(z))-x*Math.sin(degToRad(z))}px)`, transformOrigin: `center center`}"
          ></video>
        </div>
        <div class="change-cont"
             :style="{transform: `rotate(${z}deg) translate(${x*Math.cos(degToRad(z)) + y*Math.sin(degToRad(z))}px, ${y*Math.cos(degToRad(z))-x*Math.sin(degToRad(z))}px)`, transformOrigin: `center center`}"
        >
          <img class="target" src="../../assets/close.png" alt="">
          <span class="deg">{{Math.round(z)}}</span>
        </div>
      </div>
      <img class="aim" src="../../assets/plus.png" alt="" >
      <img src="../../assets/cameraSpace.jpg" alt="" class="camera-space" v-if="cameraSpace">
    </div>
    <div class="success-landing" v-if="success">{{success}} %</div>
  </div>
</template>

<script>
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
          cameraSpace: true
        }
      },
      computed: {
        generalGamepad() {
          return this.$store.getters.get_gamepad;
        },
        difficult() {
          return this.$store.getters.difficult;
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
        generalGamepad() {
          if(!this.generalGamepad.buttons[4] && !this.generalGamepad.buttons[6] &&
           this.generalGamepad.buttons[5] && this.generalGamepad.buttons[7]) { // включен режим ручного управления тягой маневрогого двигателя в первый раз
            this.$store.commit('clearAlert', {socket: this.$socket, alert: 'alertPilot'});
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

          // проверки на крайние положения
          this.x = (this.x < (this.targetX - this.videoWrap.w / 2)) ? (this.targetX - this.videoWrap.w / 2) : this.x;
          this.x = (this.x > (this.targetX + this.videoWrap.w / 2)) ? (this.targetX + this.videoWrap.w / 2) : this.x;
          this.y = (this.y < (this.targetY - this.videoWrap.h / 2)) ? (this.targetY - this.videoWrap.h / 2) : this.y;
          this.y = (this.y > (this.targetY + this.videoWrap.h / 2)) ? (this.targetY + this.videoWrap.h / 2) : this.y;

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
        degToRad(z) {
          return z * Math.PI / 180;
        }
      },
      mounted () {
        // this.video.w = 1500; //4000; // равно ширине видео (посмотреть computed в браузере)
        // this.video.h = 844; // равно высоте видео (посмотреть computed в браузере)
        // this.videoWrap.w = Number(window.getComputedStyle(document.querySelector('#video-cont')).getPropertyValue('width').replace(/\D+/g,""));
        // this.videoWrap.h = Number(window.getComputedStyle(document.querySelector('#video-cont')).getPropertyValue('height').replace(/\D+/g,""));

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
            // console.log(this.gamepad)

            // включение маневровых, отключение ядерного
            console.log(!this.generalGamepad.buttons[4].value, !this.generalGamepad.buttons[6].value, this.generalGamepad.buttons[5].value, this.generalGamepad.buttons[7].value)
            // if(!this.generalGamepad.buttons[4].value &&
            //   !this.generalGamepad.buttons[6].value &&
            //   this.generalGamepad.buttons[5].value &&
            //   this.generalGamepad.buttons[7].value) {
            if(this.gamepad.buttons[3]) {
              console.log('i m here!!!!!!')
              clearInterval(interval);
              this.$store.commit('clearAlert', {socket: this.$socket, alert: 'alertPilot'});
              let countDown = 1; // обратный отсчет перед запуском ручного режима посадки
              let startCount = setInterval(() => {
                if (countDown < 0) {
                  clearInterval(startCount);
                  this.$store.commit('clearAlert', {socket: this.$socket, alert: 'alertPilot'});
                  this.$refs.videoRef.play();
                  this.cameraSpace = false;
                  this.flight();
                }
                this.$store.commit('setAlert', {header: String(countDown)});
                countDown--;
              }, 1000);
            }
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
    top: 10px;
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
</style>
