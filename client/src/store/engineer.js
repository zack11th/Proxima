import Vue from 'vue'

export default {
  state: {
    warningCell: [] // массив из 1600 элементов. true - вышел из строя, false - работает ячейка
  },
  mutations: {
    changeCell(state) {
      for (let i = 0; i < 1600; i++) { // этот цикл тестирующий, здесь нужно будет получать реальный массив с рабоающими или нет ячейками
        // state.warningCell[i] = !!Math.round(Math.random());
        Vue.set(state.warningCell, i, !!Math.round(Math.random())); // такая конструкция, так как Vue не видит изменения внутри массива, возможно, когда эти данные будут прилетать с сервера, такое не понадобится
      }
    }
  },
  actions:{},
  getters: {
    get_warningCell(state) {
      return state.warningCell;
    }
  }
}
