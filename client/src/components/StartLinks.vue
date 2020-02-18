<template>
  <div>
    <h1>Start Screen</h1>
    <ul>
      <li><router-link to="/commander">Командир</router-link></li>
      <li><router-link to="/pilot">Пилот</router-link></li>
      <li><router-link to="/scientist">Ученый</router-link></li>
      <li><router-link to="/medic">Медик</router-link></li>
      <hr>
      <li><router-link to="/master">Мастер</router-link></li>
      <li><router-link to="/gamepad-test">Геймпад Тест</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "StartLinks"
  }
</script>
