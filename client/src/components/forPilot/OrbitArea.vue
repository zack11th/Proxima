<template>
  <div>
    <canvas id="orbit">Надо найти другой браузер</canvas>
    <!--<img src="../../assets/dark-hole.png" alt="">-->
  </div>

</template>

<script>

    export default {
        name: "OrbitArea",
        mounted() {
          let canvas = document.getElementById('orbit');
          let ctx = canvas.getContext('2d');

          // черная дыра
          let img = new Image();
          img.src = require('@/assets/dark-hole.png');
          img.onload = function(){
            ctx.drawImage(img, 50, 30, 50, 50);
          };

        }
    }
</script>

<style scoped>
  p {
    color: #00ac00;
    text-align: center;
  }
  div{
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
