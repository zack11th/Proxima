<template>
  <div>
    <canvas id="orbit" width="960" height="655">Надо найти другой браузер</canvas>
    <!--<img src="../../assets/dark-hole.png" alt="">-->
  </div>

</template>

<script>

    export default {
        name: "OrbitArea",
        data() {
          return {
            canvas: null,
            ctx: null,
            fullWidth: 0,
            fullHeight: 0
          }
        },
        computed: {
        },
        methods: {
          BlackHole (ctx) { // отрисовка черной дыры
            let img = new Image();
            img.src = require('@/assets/dark-hole.png');
            img.onload = () => {
              ctx.drawImage(img, this.fullWidth/2 - 100, this.fullHeight/2 - 200, 100, 100);
              ctx.font = "11px Verdana";
              ctx.fillStyle = '#1ad628';
              ctx.fillText("Proxima Centaura", this.fullWidth/2 - 90, this.fullHeight/2 - 100);
            };
          },
          movePlanet (ctx, planetAngle) { // движение планеты
            let center = { // центр орбиты планеты (в центре черной дыры
              x: this.fullWidth/2-50,
              y: this.fullHeight/2-150
            };
            let planetRadius = 170; // радицс орбиты планеты
            ctx.beginPath();
            ctx.setLineDash([3, 8]);
            ctx.strokeStyle = '#8bcd8f';
            ctx.lineWidth = 3;
            ctx.arc(center.x, center.y, planetRadius, planetAngle, planetAngle + Math.PI/2)
            ctx.stroke();
            ctx.beginPath();
            ctx.setLineDash([2, 8]);
            ctx.lineWidth = 2;
            ctx.arc(center.x, center.y, planetRadius, planetAngle + Math.PI/2, planetAngle + Math.PI)
            ctx.stroke();
            ctx.beginPath();
            ctx.setLineDash([1, 8]);
            ctx.lineWidth = 1;
            ctx.arc(center.x, center.y, planetRadius, planetAngle + Math.PI, planetAngle + Math.PI * 2)
            ctx.stroke();
            ctx.beginPath();
            let x = planetRadius * Math.cos(planetAngle) + center.x;
            let y = planetRadius * Math.sin(planetAngle) + center.y;
            ctx.fillStyle = '#005dff';
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.font = "11px Verdana";
            ctx.fillStyle = '#1ad628';
            ctx.fillText("Proxima B", x + 20, y + 11);
          },
          drawMap (ctx) {
            this.BlackHole(ctx);

            let planetAngle = Math.PI / 2.4; // угол планеты относительно системы координат в центре черной дыры
            window.setInterval(() => {
              // очистка области вокруг черной дыры
              ctx.clearRect(0, 0, 390, this.fullHeight);
              ctx.clearRect(490, 0, 410, this.fullHeight);
              ctx.clearRect(390, 0, 100, 130);
              ctx.clearRect(390, 230, 100, 400);
              // планетв
              this.movePlanet(ctx, planetAngle);
              if (planetAngle > 0) {
                planetAngle -= 0.01
              } else {
                planetAngle = Math.PI * 2
              }
            }, 100);

          }
        },
        mounted() {
          this.canvas = document.getElementById('orbit');
          this.ctx = this.canvas.getContext('2d');
          this.fullWidth = this.canvas.width;
          this.fullHeight = this.canvas.height;

          this.drawMap(this.ctx);
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
</style>
