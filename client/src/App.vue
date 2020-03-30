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
  @font-face {
    font-family: '17320';
    src: local('17320'), url('./assets/font/17320.woff') format('woff');
  }
  body {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 16px;
    font-family: "17320", sans-serif;
  }
</style>
