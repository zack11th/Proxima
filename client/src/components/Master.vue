<template>
    <div class="fullscreen">
      <div class="start center">
        <button @click="startLARP">START</button>
        <!--<button @click="startLARP_socket">START_socket</button>-->
      </div>
      <hr>
      <div class="flex">
        <div class="planet">
          <h1>Planet</h1>
          <div>
            <label for="angle">angle</label>
            <input name="angle" type="text" v-model="angle">
          </div>
          <div>
            <label for="centerX">center x</label>
            <input type="text" name="centerX" v-model="planet.center.x">
          </div>
          <div>
            <label for="centerY">center y</label>
            <input type="text" name="centerY" v-model="planet.center.y">
          </div>
          <div>
            <label for="orbitRadius">orbit Radius</label>
            <input type="text" name="orbitRadius" v-model="planet.orbitRadius">
          </div>
          <div>
            <label for="radius">radius</label>
            <input type="text" name="radius" v-model="planet.radius">
          </div>
          <div>
            <label for="orbitSpeed">orbit Speed</label>
            <input type="text" name="orbitSpeed" v-model="planet.orbitSpeed">
          </div>
          <div class="action">
            <button @click="getPlanet">Получить</button>
            <button @click="setPlanet">Задать</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Master",
      data () {
        return {
          planet: {
            // angle: 0,
            center: {
              x: 0,
              y: 0
            },
            orbitRadius: 0,
            radius: 0,
            orbitSpeed: 0
          }
        }
      },
      computed: {
        angle: {
          get(){
            return this.$store.getters.get_planet.angle;
          },
          set(){
            console.log('setter computed')
          }
        }
      },
      methods: {
        startLARP() {
          console.log('start')
          this.$socket.emit('startLarp');
        },
        getPlanet() {
          this.planet = this.$store.getters.get_planet;
        },
        setPlanet() {
          let planet = this.planet;
          planet.angle = Number(this.angle);
          planet.center.x = Number(planet.center.x);
          planet.center.y = Number(planet.center.y);
          planet.orbitRadius = Number(planet.orbitRadius);
          planet.radius = Number(planet.radius);
          planet.orbitSpeed = Number(planet.orbitSpeed);
          this.$socket.emit('setPlanet', planet);
        }
      },
      mounted() {
        this.$socket.emit('conn', 'MASTER connected')
      }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .fullscreen {
    width: 100%;
    min-height: 100vh;
    background-color: #404040;
    font-family: Arial, sans-serif;
    padding: 10px;
    color: #a3d0b9;
  }
  .center {
    text-align: center;
  }
  .start > button {
    font-size: 2rem;
    color: black;
  }
  .flex {
    display: flex;
  }
  .planet {
    display: flex;
    flex-direction: column;
  }
  .planet > div {
    display: flex;
    justify-content: space-between;
  }
  button {
    cursor: pointer;
  }
  .fullscreen .action {
    justify-content: space-around;
    margin-top: 10px;
  }
</style>
