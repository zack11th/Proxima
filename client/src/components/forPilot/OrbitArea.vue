<template>
  <div class="orbit-wrap" ref="orbitwrap">
    <canvas ref="orbit" id="orbit" width="960" height="960">Надо найти другой браузер</canvas>
    <div class="hole"><img src="../../assets/blackHole.jpg" alt=""><p class="p">Proxima Centauri</p></div>
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
              fullHeight: 0,
          }
        },
        computed: {
            cx() {
                return this.fullWidth / 2;
            },
            cy() {
                return this.fullHeight / 2;
            },
            planets() {
                return this.$store.getters.get_planet;
            },
            ship() {
                return this.$store.getters.get_ship_orbit;
            },
            scale() {
                return this.$store.getters.get_scale;
            }
        },
        methods: {
            drawMap() {
                window.setInterval(() => {
                    this.clear(this.ctx);
                    this.orbitPlanet(this.ctx);
                    this.moveShip(this.ctx, this.ship);
                }, 100)
            },
            clear(ctx) {
                ctx.clearRect(0, 0, this.fullWidth, this.fullHeight)
            },
            DegToRad(deg) {
                return deg/180*Math.PI;
            },
            orbitPlanet(ctx) {
                // центр
                ctx.fillStyle = '#fff';
                ctx.fillRect(this.cx, this.cy, 5, 5);

                // пробежим по массиву планет
                this.planets.forEach((item, i, arr) => {
                    // орбита планеты
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#444444";
                    ctx.setLineDash([1,6]);
                    ctx.beginPath();
                    ctx.ellipse(this.cx, this.cy, item.a/this.scale, item.b/this.scale/3, this.DegToRad(item.F), 0, this.DegToRad(360), true);
                    ctx.stroke();

                    // сама планета
                    let a = (item.a/this.scale);
                    let b = (item.b/this.scale/(3-2*Math.sin(this.DegToRad(item.P))));
                    item.x = (a * Math.cos(this.DegToRad(item.w)))*Math.cos(this.DegToRad(item.F))-(b * Math.sin(this.DegToRad(item.w)))*Math.sin(this.DegToRad(item.F))+this.cx;
                    item.y = (a * Math.cos(this.DegToRad(item.w)))*Math.sin(this.DegToRad(item.F))+(b * Math.sin(this.DegToRad(item.w)))*Math.cos(this.DegToRad(item.F))+this.cy;

                    ctx.fillStyle = "#fff";
                    ctx.beginPath();
                    ctx.arc(item.x,  item.y, 2, 0, Math.PI*2, true);
                    ctx.fill();
                    ctx.fillStyle = "#ce6e00"
                    ctx.font = "12px Verdana";
                    ctx.fillText(item.name, item.x-30, item.y - 7);

                    // трэйсы движения
                    ctx.setLineDash([]);
                    ctx.strokeStyle = "#55aaff";
                    ctx.beginPath();
                    ctx.ellipse(this.cx, this.cy, item.a/this.scale, item.b/this.scale/(3-2*Math.sin(this.DegToRad(item.P))), this.DegToRad(item.F), this.DegToRad(item.w), this.DegToRad(item.w+30),false);
                    ctx.stroke();
                    ctx.strokeStyle = "#aaccff";
                    ctx.beginPath();
                    ctx.ellipse(this.cx, this.cy, item.a/this.scale, item.b/this.scale/(3-2*Math.sin(this.DegToRad(item.P))), this.DegToRad(item.F), this.DegToRad(item.w), this.DegToRad(item.w+20),false);
                    ctx.stroke();
                    ctx.strokeStyle = "#cceeff";
                    ctx.beginPath();
                    ctx.ellipse(this.cx, this.cy, item.a/this.scale, item.b/this.scale/(3-2*Math.sin(this.DegToRad(item.P))), this.DegToRad(item.F), this.DegToRad(item.w), this.DegToRad(item.w+10),false);
                    ctx.stroke();
                });
            },
            moveShip(ctx, ship) {
                // орбита корабля
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#626262";
                ctx.setLineDash([1,6]);
                ctx.beginPath();
                ctx.ellipse(ship.cxs, ship.cys, ship.a/this.scale, ship.b/this.scale/3, this.DegToRad(ship.F), 0, this.DegToRad(360), true);
                ctx.stroke();

                // корабль
                let a = (ship.a/this.scale);
                let b = (ship.b/this.scale/(3-2*Math.sin(this.DegToRad(ship.P))));
                ship.x = (a * Math.cos(this.DegToRad(ship.w)))*Math.cos(this.DegToRad(ship.F))-(b * Math.sin(this.DegToRad(ship.w)))*Math.sin(this.DegToRad(ship.F))+ship.cxs;
                ship.y = (a * Math.cos(this.DegToRad(ship.w)))*Math.sin(this.DegToRad(ship.F))+(b * Math.sin(this.DegToRad(ship.w)))*Math.cos(this.DegToRad(ship.F))+ship.cys;

                ctx.fillStyle = "#00ac00";
                ctx.beginPath();
                ctx.arc(ship.x,  ship.y, 3, 0, Math.PI*2, true);
                ctx.fill();
                ctx.fillStyle = "#00ac00"
                ctx.font = "12px Verdana";
                ctx.fillText(ship.name, ship.x-30, ship.y - 7);

                // трэйсы движения
                ctx.setLineDash([]);
                ctx.strokeStyle = "#55aaff";
                ctx.beginPath();
                ctx.ellipse(ship.cxs, ship.cys, ship.a/this.scale, ship.b/this.scale/(3-2*Math.sin(this.DegToRad(ship.P))), this.DegToRad(ship.F), this.DegToRad(ship.w), this.DegToRad(ship.w+10),false);
                ctx.stroke();
                ctx.strokeStyle = "#aaccff";
                ctx.beginPath();
                ctx.ellipse(ship.cxs, ship.cys, ship.a/this.scale, ship.b/this.scale/(3-2*Math.sin(this.DegToRad(ship.P))), this.DegToRad(ship.F), this.DegToRad(ship.w), this.DegToRad(ship.w+5),false);
                ctx.stroke();
                ctx.strokeStyle = "#cceeff";
                ctx.beginPath();
                ctx.ellipse(ship.cxs, ship.cys, ship.a/this.scale, ship.b/this.scale/(3-2*Math.sin(this.DegToRad(ship.P))), this.DegToRad(ship.F), this.DegToRad(ship.w), this.DegToRad(ship.w+2),false);
                ctx.stroke();
            }
        },
        mounted() {
            this.canvas = this.$refs.orbit;
            this.ctx = this.canvas.getContext('2d');
            const orbitArea = {
                width: this.canvas.width,
                height: window.getComputedStyle(this.$refs.orbitwrap).getPropertyValue('height').replace(/\D+/g,"")
            };
            this.$socket.emit('canvas', orbitArea);
            this.fullWidth = orbitArea.width;
            this.fullHeight = orbitArea.height;

            this.drawMap();
        }
    }
</script>

<style scoped>
  .p {
    padding: 0;
    margin: 0;
    position: absolute;
    top: 80%;
    left: -30%;
    width: 100%;
    color: #ce6e00;
    text-align: center;
    font-size: 14px;
    transform: rotate(20deg);
  }
  .orbit-wrap{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .hole {
    width: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-20deg);
  }
  .hole > img {
    max-width: 100%;
  }
</style>
