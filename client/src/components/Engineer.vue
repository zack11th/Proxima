<template>
    <div class="main">
      <div class="up">
        <rods-reactor></rods-reactor>
      </div>
      <div class="up">
        <table-cell></table-cell>
      </div>
      <div class="down">
        <button @click="changeCell">Ячейки других цветов</button>
      </div>
    </div>
</template>

<script>
  import TableCell from './forEngineer/TableCell';
  import RodsReactor from './forEngineer/RodsReactor';

  export default {
    name: "Engineer",
    components: {
      TableCell,
      RodsReactor
    },
    mounted() {
      document.title = 'Инженер';
      this.$socket.emit('conn', 'eng');
    },
    computed: {},
    methods: {
      changeCell() {
        this.$store.commit('changeCell'); // для теста наполняет массив warningCell случайными значениями
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    background-color: #333333;
    color: #22c325
  }
  .up {
    width: 50%;
    height: 60%;
    box-sizing: border-box;
    background-color: #000000;
  }
  .down {

  }
</style>
