<template>
  <div>
    <h1>Gamepad connected: <span style="color: blue">{{connectGamepad}}</span></h1>
    <input type="text" style="font-size: 24px">
    <h3>axes</h3>
    <table>
      <thead>
        <tr>
          <th>Свойство</th>
          <th>Значение</th>
          <th>Применение</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(elem, index) in gamepad.axes" :key="index">
          <td>{{index}}</td>
          <td>{{elem}}</td>
          <td><input type="text"></td>
        </tr>
      </tbody>
    </table>
    <hr>
    <h3>buttons</h3>
    <table>
      <thead>
      <tr>
        <th>Свойство</th>
        <th>Значение</th>
        <th>Применение</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(elem, index) in gamepad.buttons" :key="index">
        <td>{{index}}</td>
        <td>{{elem.value}}</td>
        <td><input type="text"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      name: "GamepadTest",
      data () {
        return {
          connectGamepad: "false",
          gamepad: null,
          gpIndex: null
        }
      },
      created() {
        window.addEventListener("gamepadconnected", (e) => {
          this.gpIndex = e.gamepad.index;
          setInterval(() => {
            this.gamepad = navigator.getGamepads()[this.gpIndex];
            this.connectGamepad = this.gamepad.connected;
            // console.log(this.gamepad)
          }, 100);
        });
      }
    }
</script>

<style scoped>
  div {
    margin-left: 10px;
  }
  table {
    border-collapse: collapse;
  }
  td, th {
    border: 1px solid black
  }
</style>
