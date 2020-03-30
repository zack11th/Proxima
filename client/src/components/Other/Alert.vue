<template>
    <div class="alert">
      <h1 class="head" v-if="header">{{header}}</h1>
      <p class="text" v-if="message">{{message}}</p>
      <div class="button" v-if="button" @click="buttonOk">OK</div>
    </div>
</template>

<script>
    export default {
      name: "Alert",
      props: ['header', 'message', 'button', 'parent'],
      methods: {
        buttonOk() {
          this.$store.commit('clearAlert', {socket: this.$socket, alert: this.parent})
        }
      },
      mounted() {
        console.log()
      }
    }
</script>

<style scoped>
  .alert {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #22c325;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 50%;
    min-height: 30%;
    font-size: 2rem;
    border-radius: 50px;
    animation: miganie 1s ease-in-out 0s infinite;
    font-family: sans-serif;
  }

  .head {
    margin: 0;
    padding: 10px;
    text-transform: uppercase;
    font-size: 2.1rem;
  }

  .text {
    margin: 0;
    padding: 10px;
    text-align: center;
  }

  .button {
    padding: 5px 15px;
    border: 5px solid #22c325;
    margin-top: 10px;
    cursor: pointer;
  }

  @keyframes miganie {
    0%, 100% {
      box-shadow: 0 0 0 10px #22c325, 0 0 10px 20px #990000;
      background-color: #990000;
    }
    50% {
      box-shadow: 0 0 0 10px #22c325;
      background-color: #000000;
    }
  }

</style>
