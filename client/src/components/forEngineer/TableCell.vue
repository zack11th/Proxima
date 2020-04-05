<template>
  <div class="table">
    <h2>Состояние ячеек термоэлектрических генераторов</h2>
    <div class="main">
      <div class="cell"
           v-for="(item, index) in warning"
           :key="index"
           :class="{warning: item}"
      >
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TableCell",
      mounted() {
        // setInterval(() => {
        //   console.log(this.warning[2])
        // }, 1000)
      },
      computed: {
        warning() {
          return this.$store.getters.get_warningCell;
        }
      }
    }
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  .main {
    width: 100%;
    height: calc(100% - 29px);
    background-color: #070707;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }
  .cell {
    width: 13.75px;
    height: 13.75px;
    margin: 0;
    background-color: #22c325;
    color: black;
    box-sizing: border-box;
    border: 1px solid #070707;
  }
  .warning {
    background-color: #990000;
  }
  .cell:nth-child(8n) {
    margin-right: 10px;
  }
  .cell:nth-child(320n) {
    margin-bottom: 40px;
  }
</style>
