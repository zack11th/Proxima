<template>
  <div>
    <h1>Start Screen</h1>
    <ul>
      <li><router-link to="/commander">Командир</router-link></li>
      <li><router-link to="/pilot">Пилот</router-link></li>
      <li><router-link to="/pilot2">Пилот-Штурман</router-link></li>
      <li><router-link to="/scientist">Ученый</router-link></li>
      <li><router-link to="/medic">Медик</router-link></li>
      <li><router-link to="/engineer">Инженер</router-link></li>
      <li><router-link to="/engineer2">Инженер 2</router-link></li>
      <li><router-link to="/general">Общий комп</router-link></li>
      <hr>
      <li><router-link to="/master">Мастер</router-link></li>
      <li><router-link to="/master-landing">Мастер Посадки</router-link></li>
      <li><router-link to="/gamepad-test">Геймпад Тест</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "StartLinks"
  }
</script>
