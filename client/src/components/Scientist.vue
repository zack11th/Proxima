<template>
    <p>Scientist</p>
</template>

<script>
    export default {
      name: "Scientist",
      mounted() {
        document.title = 'Ученый';
        this.$socket.emit('conn', 'scient');
      },
    }
</script>

<style scoped>

</style>
