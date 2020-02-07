<template>
  <div class="wrap">
    <!--<button id="start">start</button>-->
    <div class="main" id="video-cont">
      <div class="video-wrap" v-bind:style="{ left: x + 'px', top: y + 'px'}">
        <video ref="videoRef" muted="muted" src="../../assets/videoplayback.mp4"></video>
        <img class="target" src="../../assets/close.png" alt="">
      </div>
      <img class="aim" src="../../assets/plus.png" alt="">
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
          maxScore: 0
        }
      },
      computed: {
        difficult() {
          return this.$store.getters.difficult;
        },
        success: {
          get() {
            return Math.round(this.score * 100 / this.maxScore);
          },
          set() {console.log('set success')}
        }
      },
      methods: {
        flight() {
          this.gamepad = navigator.getGamepads()[this.gpIndex];
          this.x -= Math.round(this.gamepad.axes[0]*5);
          this.y += Math.round(this.gamepad.axes[1]*5);

          // проверки на крайние положения
          this.x = (this.x > 0) ? 0 : this.x;
          this.x = (this.x < -(this.video.w - this.videoWrap.w)) ? -(this.video.w - this.videoWrap.w) : this.x;
          this.y = (this.y > 0) ? 0 : this.y;
          this.y = (this.y < -(this.video.h - this.videoWrap.h)) ? -(this.video.h - this.videoWrap.h) : this.y;

          this.successLanding()
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
        }
      },
      mounted () {
        this.video.w = 1200; // равно ширине видео (посмотреть computed)
        this.video.h = 675; // равно высоте видео (посмотреть computed)
        this.videoWrap.w = Number(window.getComputedStyle(document.querySelector('#video-cont')).getPropertyValue('width').replace(/\D+/g,""));
        this.videoWrap.h = Number(window.getComputedStyle(document.querySelector('#video-cont')).getPropertyValue('height').replace(/\D+/g,""));

        this.targetX = -(this.video.w - this.videoWrap.w) / 2;
        this.targetY = -(this.video.h - this.videoWrap.h) / 2;

        this.x = this.targetX;
        this.y = this.targetY;

        window.addEventListener("gamepadconnected", (e) => {
          this.gpIndex = e.gamepad.index;
          this.gamepad = navigator.getGamepads()[this.gpIndex];
          console.log('gamepad connected');
          window.setTimeout(() => {
            this.$refs.videoRef.play();
            this.flight();
          }, 1000) // время от принятия управления до старта полета
        });
      }
    }
</script>

<style scoped>
  #start {
    position: absolute;
    top: 50px;
    left: 0;
  }
  /*p {*/
    /*color: #00ac00;*/
  /*}*/
  .wrap {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .main {
    width: 600px;
    height: 450px;
    overflow: hidden;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .video-wrap {
    width: 1200px;
    position: absolute;
    /*top: -115px;*/
    /*left: -300px;*/
  }
  .video-wrap > video {
    width: 100%;
  }
  .target {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    color: #00ac00;
    font-size: 2rem;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
