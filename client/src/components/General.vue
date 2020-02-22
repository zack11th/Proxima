<template>
  <div>
    <p>General</p>
    <alert :header="alertGeneral.header"
           :message="alertGeneral.message"
           :button="alertGeneral.button"
           :parent="'alertGeneral'"
           v-if="alertGeneral.header || alertGeneral.message || alertGeneral.button"
    ></alert>
  </div>
</template>

<script>
  import Alert from './Other/Alert'

  export default {
    name: "General",
    components: {
      Alert
    },
    computed: {
      alertGeneral() {
        return this.$store.getters.alertGeneral
      }
    }
  }
</script>

<style scoped>

</style>
