<template>
  <div class="reactor" ref="reactorRef">
    <div class="rods">
      <div class="rod-1" :style="{transform: `translate(${AuroraPower.ControlRods.Rod1}%, -50%)`}"></div>
      <div class="text-rod t-rod-1">{{Math.round(AuroraPower.ControlRods.Rod1)}} %</div>
    </div>
    <div class="rods" :style="{transform: `rotate(60deg)`}">
      <div class="rod-2" :style="{transform: `translate(${AuroraPower.ControlRods.Rod2}%, -50%)`}"></div>
      <div class="text-rod t-rod-2" :style="{transform: `rotate(-60deg)`}">{{Math.round(AuroraPower.ControlRods.Rod2)}} %</div>
    </div>
    <div class="rods" :style="{transform: `rotate(120deg)`}">
      <div class="rod-3" :style="{transform: `translate(${AuroraPower.ControlRods.Rod3}%, -50%)`}"></div>
      <div class="text-rod t-rod-3" :style="{transform: `rotate(-120deg)`}">{{Math.round(AuroraPower.ControlRods.Rod3)}} %</div>
    </div>
    <div class="rods" :style="{transform: `rotate(180deg)`}">
      <div class="rod-4" :style="{transform: `translate(${AuroraPower.ControlRods.Rod4}%, -50%)`}"></div>
      <div class="text-rod t-rod-4" :style="{transform: `rotate(-180deg)`}">{{Math.round(AuroraPower.ControlRods.Rod4)}} %</div>
    </div>
    <div class="rods" :style="{transform: `rotate(240deg)`}">
      <div class="rod-5" :style="{transform: `translate(${AuroraPower.ControlRods.Rod5}%, -50%)`}"></div>
      <div class="text-rod t-rod-5" :style="{transform: `rotate(-240deg)`}">{{Math.round(AuroraPower.ControlRods.Rod5)}} %</div>
    </div>
    <div class="rods" :style="{transform: `rotate(300deg)`}">
      <div class="rod-6" :style="{transform: `translate(${AuroraPower.ControlRods.Rod6}%, -50%)`}"></div>
      <div class="text-rod t-rod-6" :style="{transform: `rotate(-300deg)`}">{{Math.round(AuroraPower.ControlRods.Rod6)}} %</div>
    </div>
    <div class="target-rods">
      <div class="targetrod-1" :style="{transform: `translate(${AuroraPower.TargetControlRods.Rod1}%, -50%)`}"></div>
    </div>
    <div class="target-rods" :style="{transform: `rotate(60deg)`}">
      <div class="targetrod-2" :style="{transform: `translate(${AuroraPower.TargetControlRods.Rod2}%, -50%)`}"></div>
    </div>
    <div class="target-rods" :style="{transform: `rotate(120deg)`}">
      <div class="targetrod-3" :style="{transform: `translate(${AuroraPower.TargetControlRods.Rod3}%, -50%)`}"></div>
    </div>
    <div class="target-rods" :style="{transform: `rotate(180deg)`}">
      <div class="targetrod-4" :style="{transform: `translate(${AuroraPower.TargetControlRods.Rod4}%, -50%)`}"></div>
    </div>
    <div class="target-rods" :style="{transform: `rotate(240deg)`}">
      <div class="targetrod-5" :style="{transform: `translate(${AuroraPower.TargetControlRods.Rod5}%, -50%)`}"></div>
    </div>
    <div class="target-rods" :style="{transform: `rotate(300deg)`}">
      <div class="targetrod-6" :style="{transform: `translate(${AuroraPower.TargetControlRods.Rod6}%, -50%)`}"></div>
    </div>
    <div class="center">
      <div class="temp">
        <p><span>Текущая:</span><span>{{Math.round(AuroraPower.ReactorTemp) || '--'}}&deg К</span></p>
        <hr>
        <p><span>Расчетная:</span><span>{{Math.round(AuroraPower.TargetTemp) || '--'}}&deg К</span></p>
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
    z-index: 14;
  }
  .rods {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
    text-align: center;
  }
  .target-rods {
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
     right: 99%;
     top: 50%;
     width: 110px;
     height: 50px;
     background-color: #22FF25;
   }
  .targetrod-1,
  .targetrod-2,
  .targetrod-3,
  .targetrod-4,
  .targetrod-5,
  .targetrod-6 {
    position: absolute;
    right: 99%;
    top: 50%;
    width: 112px;
    height: 56px;
    background-color: #292929;
    z-index: 1;
  }
  .temp {
    box-sizing: border-box;
    position: absolute;
    width: 120px;
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
    padding: 0 5px;
  }
  .temp > p {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .temp > hr {
    box-sizing: border-box;
    width: 100%;
    height: 0;
    border: 2px solid #22c325;
    border-radius: 2px;
  }
  .text-rod {
    position: absolute;
    top: 50%;
    left: -150px;
  }

</style>
