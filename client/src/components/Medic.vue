<template>
  <div>
    <p>Medic</p>
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
    computed: {
      alertMedic() {
        return this.$store.getters.alertMedic
      }
    }
  }
</script>

<style scoped>

</style>
