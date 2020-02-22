<template>
  <div>
    <p>Commander</p>
    <alert :header="alertCommand.header"
           :message="alertCommand.message"
           :button="alertCommand.button"
           :parent="'alertCommand'"
           v-if="alertCommand.header || alertCommand.message || alertCommand.button"
    ></alert>
  </div>
</template>

<script>
  import Alert from './Other/Alert'

  export default {
    name: "Commander",
    components: {
      Alert
    },
    computed: {
      alertCommand() {
        return this.$store.getters.alertCommand
      }
    }
  }
</script>

<style scoped>

</style>
