<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 14px;
    font-family: "Microsoft Sans Serif", sans-serif;
  }
</style>
