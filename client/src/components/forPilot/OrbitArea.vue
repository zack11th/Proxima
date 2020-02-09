<template>
  <div>
    <canvas id="orbit" width="960" height="960">Надо найти другой браузер</canvas>
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
          planet () {
            return this.$store.getters.get_planet;
          }
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
            let center = this.planet.center;
            let planetRadius = this.planet.orbitRadius; // радицс орбиты планеты
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
            ctx.arc(x, y, this.planet.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.font = "11px Verdana";
            ctx.fillStyle = '#1ad628';
            ctx.fillText("Proxima B", x + 20, y + 11);
          },
          drawMap (ctx) {
            this.BlackHole(ctx);

            window.setInterval(() => {
              // очистка области вокруг черной дыры
              ctx.clearRect(0, 0, 390, this.fullHeight);
              ctx.clearRect(490, 0, 470, this.fullHeight);
              ctx.clearRect(390, 0, 100, 285);
              ctx.clearRect(390, 380, 470, 580);
              // планетв
              this.movePlanet(ctx, this.planet.angle);
            }, 100);


          }
        },
        mounted() {
          this.canvas = document.getElementById('orbit');
          this.ctx = this.canvas.getContext('2d');

          const orbitArea = {
            width: this.canvas.width,
            height: this.canvas.height
          };
          this.$socket.emit('canvas', orbitArea);

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
