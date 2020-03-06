<template>
  <div>
    <div class="buttons">
      <span>крен</span>
      <button @click="kren(-10)">-</button>
      <button @click="kren(10)">+</button>
      <br>/
      <span>рыскание</span>
      <button @click="ryskan(-10)">-</button>
      <button @click="ryskan(10)">+</button>
      <span>тангаж</span>
      <button @click="tangaz(-10)">-</button>
      <button @click="tangaz(10)">+</button>
    </div>
    <div class="template">
      <div class="wrap">
        <div class="wrap-cont" :style="{top: y0+'px', left: x0+'px'}">
          <div class="change-cont">
            <div class="video" :style="{transform: `rotate(${deg}deg) translate(${x*Math.cos(degToRad(deg)) + y*Math.sin(degToRad(deg))}px, ${y*Math.cos(degToRad(deg))-x*Math.sin(degToRad(deg))}px)`, transformOrigin: `center center`}">
              <div class="circle c2"></div>
              <div class="circle c3"></div>
            </div>
          </div>
          <div class="change-cont">
            <div class="target" :style="{transform: `rotate(${deg}deg) translate(${x*Math.cos(degToRad(deg)) + y*Math.sin(degToRad(deg))}px, ${y*Math.cos(degToRad(deg))-x*Math.sin(degToRad(deg))}px)`}"></div>
          </div>
        </div>
        <div class="aim"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Rotate",
    data() {
      return {
        x0: 0,
        y0: 0,
        x: 0,
        y: 0,
        deg: 0,
        wrapWidth: 200,
        wrapHeight: 100,
        wrapContWidth: 800,
        wrapContHeight: 400
      }
    },
    computed: {
      // centerX(){
      //   return this.wrapContWidth / 2 - (this.x*Math.cos(this.degToRad(this.deg)) + this.y*Math.sin(this.degToRad(this.deg)));
      // },
      // centerY(){
      //   return this.wrapContHeight / 2 - (this.y*Math.cos(this.degToRad(this.deg)) - this.x*Math.sin(this.degToRad(this.deg)));
      // }
    },
    mounted() {
      this.x0 = -(this.wrapContWidth - this.wrapWidth) /2;
      this.y0 = -(this.wrapContHeight - this.wrapHeight) / 2;
    },
    methods: {
      kren(d) {
        this.deg += d;
      },
      ryskan(d) {
        this.x += d;
        console.log(`x: ${this.x} y: ${this.y} deg: ${this.deg}`)
      },
      tangaz(d) {
        this.y += d;
        console.log(`x: ${this.x} y: ${this.y} deg: ${this.deg}`)
      },
      degToRad(d) {
        return Math.floor(d * Math.PI / 180 *100) /100;
      }
    }
  }
</script>

<style scoped>
  .template {
    width: 1000px;
    height: 600px;
    background-color: #000;
    position: relative;
  }
  .wrap {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: 2px solid #ce6e00;
  }
  .wrap-cont {
    box-sizing: border-box;
    width: 800px;
    height: 400px;
    position: absolute;
    background-color: rgba(255,255,255,0.5);
    outline: 2px solid green;
  }
  .change-cont {
    box-sizing: border-box;
    outline: 2px solid red;
    background-color: rgba(130, 0, 130, 0.3);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .video {
    position: absolute;
    background: linear-gradient(to bottom, rgba(41,137,216,0.5) 0%,rgba(32,124,202,0.52) 47%,rgba(0,0,0,0.54) 99%,rgba(0,0,0,0.54) 100%);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .target {
    position: absolute;
    top: 50%;
    left: 50%;
    outline: blue 2px solid;
  }
  .aim {
    outline: 2px solid green;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }
  .c2 {
    background-color: deepskyblue;
    top: 150px;
    left: 300px;
  }
  .c3 {
    background-color: greenyellow;
    top: 100px;
    left: 20px;
  }
</style>
