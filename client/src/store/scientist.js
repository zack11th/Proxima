export default {
  state: {
    history: '',
    glossary: 0
  },
  mutations: {
    SOCKET_setHistory(state, history) {
      state.history = history;
    },
    SOCKET_getGlossary(state, glossary) {
      state.glossary = glossary;
    }
  },
  actions:{},
  getters: {
    get_history(state) {
      return state.history;
    },
    get_glossary(state) {
      return state.glossary;
    }
  }
}
