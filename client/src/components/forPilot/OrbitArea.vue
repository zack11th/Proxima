<template>
  <div class="orbit-wrap" ref="orbitwrap">
    <canvas ref="orbit" id="orbit" width="960" height="1080">Надо найти другой браузер</canvas>
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
              arm_nuclear_success: 0, // ручное управление тягой ядерного двигателя
              coordinatesPlanet: {x: null, y: null},
              coordinatesAurora: {x: null, y: null}
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
            },
            generalGamepad() {
              return this.$store.getters.get_gamepad;
            },
            nuclearThrust() {
              return this.generalGamepad.axes ? parseInt(this.generalGamepad.axes[1] * 100) : 0 // тяга ядерного двигателя
            },
            landing_success() { // флаг указывающий на то, что Аврора приземляется
              return this.$store.getters.get_landing;
            }
        },
      watch: {
        nuclearThrust(newValue) {
          if(this.generalGamepad.buttons[4] && this.generalGamepad.buttons[6] && !this.landing_success) { // включен режим ручного управления тягой ядерного двигателя
            this.$socket.emit('changeNuclearThrust', newValue)
          }
        },
        generalGamepad() {
          if(this.generalGamepad.buttons[4] && this.generalGamepad.buttons[6] && !this.arm_nuclear_success) { // включен режим ручного управления тягой ядерного двигателя в первый раз
            this.$store.commit('clearAlert', {socket: this.$socket, alert: 'alertPilot'});
            this.arm_nuclear_success = 1;
          }
        }
      },
        methods: {
            drawMap() {
                window.setInterval(() => {
                    this.clear(this.ctx);
                    this.orbitPlanet(this.ctx);
                    this.moveShip(this.ctx, this.ship);
                    if(!this.landing_success) {
                      this.randevuPoint(this.ctx);
                    }
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
                this.planets.forEach((item, index, arr) => {
                    // орбита планеты
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#83684e";
                    ctx.setLineDash([1,6]);
                    ctx.beginPath();
                    ctx.ellipse(this.cx, this.cy, item.a/this.scale, item.b/this.scale/3, this.DegToRad(item.F), 0, this.DegToRad(360), true);
                    ctx.stroke();

                    // сама планета
                    let a = (item.a/this.scale);
                    let b = (item.b/this.scale/(3-2*Math.sin(this.DegToRad(item.P))));
                    item.x = (a * Math.cos(this.DegToRad(item.w)))*Math.cos(this.DegToRad(item.F))-(b * Math.sin(this.DegToRad(item.w)))*Math.sin(this.DegToRad(item.F))+this.cx;
                    item.y = (a * Math.cos(this.DegToRad(item.w)))*Math.sin(this.DegToRad(item.F))+(b * Math.sin(this.DegToRad(item.w)))*Math.cos(this.DegToRad(item.F))+this.cy;

                    if (index === 1) { // вычисление координат Проксима Б
                      this.coordinatesPlanet.x = item.x;
                      this.coordinatesPlanet.y = item.y;
                    }

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

                    // названия планет
                    ctx.fillStyle = "#fff";
                    ctx.beginPath();
                    ctx.arc(item.x,  item.y, 2, 0, Math.PI*2, true);
                    ctx.fill();
                    ctx.fillStyle = "#ce6e00";
                    ctx.font = "12px Verdana";
                    ctx.fillText(item.name, item.x-30, item.y - 7);
                });
            },
            moveShip(ctx, ship) {
                // орбита корабля
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#979797";
                ctx.setLineDash([1,6]);
                ctx.beginPath();
                ctx.ellipse(ship.cxs, ship.cys, ship.a/this.scale, ship.b/this.scale/3, this.DegToRad(ship.F), 0, this.DegToRad(360), true);
                ctx.stroke();

                // корабль
                let a = (ship.a/this.scale);
                let b = (ship.b/this.scale/(3-2*Math.sin(this.DegToRad(ship.P))));
                ship.x = (a * Math.cos(this.DegToRad(ship.w)))*Math.cos(this.DegToRad(ship.F))-(b * Math.sin(this.DegToRad(ship.w)))*Math.sin(this.DegToRad(ship.F))+ship.cxs;
                ship.y = (a * Math.cos(this.DegToRad(ship.w)))*Math.sin(this.DegToRad(ship.F))+(b * Math.sin(this.DegToRad(ship.w)))*Math.cos(this.DegToRad(ship.F))+ship.cys;

                this.coordinatesAurora.x = ship.x;
                this.coordinatesAurora.y = ship.y;

                // если Аврора сблизилась с Проксима Б
                if ((this.coordinatesAurora.x < this.coordinatesPlanet.x + 10 &&
                  this.coordinatesAurora.x > this.coordinatesPlanet.x - 10) &&
                  (this.coordinatesAurora.y < this.coordinatesPlanet.y + 10 &&
                  this.coordinatesAurora.y > this.coordinatesPlanet.y - 10) &&
                  !this.landing_success) {
                    this.$store.commit('startLanding', {planet: this.planets[1], socket: this.$socket});
                }

                ctx.fillStyle = "#00ac00";
                ctx.beginPath();
                ctx.arc(ship.x,  ship.y, 3, 0, Math.PI*2, true);
                ctx.fill();
                ctx.fillStyle = "#00ac00";
                ctx.font = "12px Verdana";
                ctx.fillText(ship.name, ship.x+3, ship.y+12);

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
            },
            randevuPoint(ctx) { // предполагаемая точка рандеву (к сожалению, она захардкожена)
              ctx.setLineDash([2, 2]);
              ctx.strokeStyle = "#d11107";
              ctx.beginPath();
              ctx.arc(598, 598, 20, 0, 2*Math.PI, false);
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
