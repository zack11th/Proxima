<template>
  <div>
    <div class="main" ref="main">
      <div class="person">
        {{ cnt }}
      </div>
      <div class="person"></div>
      <div class="person"></div>
      <div class="person"></div>
      <div class="person"></div>
      <div class="person"></div>
      <div class="person"></div>
      <div class="person"></div>
    </div>
    <alert :header="alertMedic.header"
           :message="alertMedic.message"
           :button="alertMedic.button"
           :parent="'alertMedic'"
           v-if="alertMedic.header || alertMedic.message || alertMedic.button"
    ></alert>
  </div>
</template>

<script>
  import Alert from './Other/Alert'

  export default {
    name: "Medic",
    components: {
      Alert
    },
    data: () => ({
      cnt: 1
    }),
    computed: {
      alertMedic() {
        return this.$store.getters.alertMedic
      }
    },
    mounted() {
      document.title = 'Медик';
      this.$socket.emit('conn', 'med');
    }
  }
</script>

<style scoped>
  .main {
    display: flex;
    flex-wrap: wrap;
    background-color: #070707;
    min-height: 100vh;
    color: #22c325;
  }
  .person {
    width: 50%;
    box-sizing: border-box;
    border: 2px solid #22c325;
    padding: 10px;
  }
</style>
