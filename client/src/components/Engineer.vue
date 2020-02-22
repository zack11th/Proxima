<template>
    <div>
      <p>Engineer</p>
      <alert :header="alertEng.header"
             :message="alertEng.message"
             :button="alertEng.button"
             :parent="'alertEng'"
             v-if="alertEng.header || alertEng.message || alertEng.button"
      ></alert>
    </div>
</template>

<script>
  import Alert from './Other/Alert'

  export default {
    name: "Engineer",
    components: {
      Alert
    },
    computed: {
      alertEng() {
        return this.$store.getters.alertEng
      }
    }
  }
</script>

<style scoped>

</style>
