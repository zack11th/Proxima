<template>
    <div class="fullscreen">
      <div class="start">
        <button>START</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Master"
    }
</script>

<style scoped>
  .fullscreen {
    width: 100%;
    min-height: 100vh;
    background-color: #404040;
    font-family: Arial, sans-serif;
    padding: 10px;
  }
  .start {
    text-align: center;
  }
  .start > button {
    cursor: pointer;
    font-size: 2rem;
  }
</style>
