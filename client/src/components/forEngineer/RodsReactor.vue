<template>
  <div class="reactor" ref="reactorRef">
    <div class="rods">
      <div class="rod-1" :style="{transform: `translate(${AuroraPower.ControlRods.Rod1}%, -50%)`}"></div>
    </div>
    <div class="rods" :style="{transform: `rotate(60deg)`}">
      <div class="rod-2" :style="{transform: `translate(${AuroraPower.ControlRods.Rod2}%, -50%)`}"></div>
    </div>
    <div class="rods" :style="{transform: `rotate(120deg)`}">
      <div class="rod-3" :style="{transform: `translate(${AuroraPower.ControlRods.Rod3}%, -50%)`}"></div>
    </div>
    <div class="rods" :style="{transform: `rotate(180deg)`}">
      <div class="rod-4" :style="{transform: `translate(${AuroraPower.ControlRods.Rod4}%, -50%)`}"></div>
    </div>
    <div class="rods" :style="{transform: `rotate(240deg)`}">
      <div class="rod-5" :style="{transform: `translate(${AuroraPower.ControlRods.Rod5}%, -50%)`}"></div>
    </div>
    <div class="rods" :style="{transform: `rotate(300deg)`}">
      <div class="rod-6" :style="{transform: `translate(${AuroraPower.ControlRods.Rod6}%, -50%)`}"></div>
    </div>
    <div class="center">
      <div class="temp">
        <p>{{Math.round(AuroraPower.ReactorTemp) || '--'}} К</p>
        <hr>
        <p>{{Math.round(AuroraPower.TargetTemp) || '--'}} К</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "RodsReactor",
      computed: {
        AuroraPower() {
          return this.$store.getters.get_AuroraPower;
        }
      },
      mounted() {
        let R = this.$refs.reactorRef;
        R.style.width = window.getComputedStyle(R).height;
      }
    }
</script>

<style scoped>
  .reactor {
    box-sizing: border-box;
    border: 5px solid #ce6e00;
    height: 60%;
    border-radius: 50%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
  .center {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(255, 0, 0, 0.5);
    z-index: 11;
  }
  .rods {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
  }
  .rod-1,
  .rod-2,
  .rod-3,
  .rod-4,
  .rod-5,
  .rod-6 {
    position: absolute;
    right: 100%;
    top: 50%;
    width: 100px;
    height: 40px;
    background-color: #22c325;
    z-index: 1;
  }
  .temp {
    box-sizing: border-box;
    position: absolute;
    width: 25%;
    height: 25%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(7, 7, 7, 0.5);
    border-radius: 10px;
  }
  .temp > p {
    margin: 0;
  }
  .temp > hr {
    box-sizing: border-box;
    width: 100%;
    height: 0;
    border: 2px solid #22c325;
    border-radius: 2px;
  }
</style>
