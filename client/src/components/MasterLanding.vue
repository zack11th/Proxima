<template>
  <div class="landing-master">
    <p>Управление апогеем Авроры</p>
    <button @click="landingHard">Принудительная постановка на посадку</button>
    <br>
    <button @click="apogeeChange(-50000)">-</button>
    <button @click="apogeeChange(50000)">+</button>
  </div>
</template>

<script>
    export default {
        name: "MasterLanding",
        mounted() {
          document.title = 'Мастер-Посадка';
        },
        methods: {
          apogeeChange(value) {
            this.$socket.emit('changeNuclearThrustMaster', value)
          },
          landingHard() {
            this.$store.commit('startLanding', {planet: this.$store.getters.get_planet[1], socket: this.$socket})
          }
        }
    }
</script>

<style scoped>
  .landing-master {
    text-align: center;
    font-family: Arial, sans-serif;
  }
  button {
    padding: 10px;
    margin: 10px;
  }
</style>
