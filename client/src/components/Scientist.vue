<template>
    <div class="main">
      <div class="up">Лингвистическая база: <span>{{glossary}} %</span></div>
      <div class="history">
        {{history}}
      </div>
    </div>
</template>

<script>
  let log = console.log;

    export default {
      name: "Scientist",
      props: ['id'],
      computed: {
        history() {
          return this.$store.getters.get_history;
        },
        glossary() {
          return 10 * this.$store.getters.get_glossary;
        }
      },
      mounted() {
        document.title = 'Ученый';
        this.$socket.emit('conn', 'scient');
      },
      created() {
        this.$socket.emit('setGlossary', null);
        this.$socket.emit('getHistory', this.id);
      }
    }
</script>

<style scoped>
  .main {
    font-family: "Droid Sans Mono",sans-serif;
    width: 100%;
    min-height: 100vh;
    background-color: #070707;
    color: #22c325;
    overflow: hidden;
  }
  .up {
    padding: 10px;
    text-align: center;
  }
  .history {
    width: calc(100% - 10px);
    height: calc(100vh - 100px);
    box-sizing: border-box;
    margin: 5px;
    border: 1px solid #fff;
    border-radius: 8px;
    background-color: #333333;
    overflow: scroll;
    padding: 10px;
    text-align: justify;

  }
</style>
