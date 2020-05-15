import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import initTodoList from "./initial-state"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "todoList": initTodoList,
    "historyState": [],
    "currentCard": null
  },
  plugins: [createPersistedState()],
  mutations: {
    REMOVE_TODO: (state, todoId) => {
      return state.todoList = state.todoList.filter((item, index) => {
        if (index !== todoId) {
          return item
        }        
      })
    },
    ADD_TODO: (state, todoNew) => {
      return state.todoList.push(todoNew)
    },
    UPDATE_TODO: (state, {todoList, index}) => {
      state.todoList[index] = todoList
    },
    ADD_HISTORY_STEP: (state, historyNewStep) => {
      state.historyState.push(historyNewStep)
    },
    REMOVE_HISTORY_STEP: (state) => {
      state.historyState.pop()
    },
    CLEAR_HISTORY: (state) => {
      state.historyState = []
    },
    SET_CURRENT: (state, currentCard) => {
      state.currentCard = currentCard
    }
  },
  actions: {
    removeTodo(store, todoId) {
      store.commit('REMOVE_TODO', todoId)
    },
    addTodo(store,todoNew) {
      store.commit('ADD_TODO',todoNew)
    },
    updateTodo(store, {todoList, index}) {
      store.commit('UPDATE_TODO', {
        todoList,
        index
      })
    },
    addHistoryStep(store, historyNewStep) {
      store.commit('ADD_HISTORY_STEP', historyNewStep)
    },
    removeHistoryStep(store) {
      store.commit('REMOVE_HISTORY_STEP')
    },

    clearHistory(store) {
      store.commit('CLEAR_HISTORY')
    },
    setCurrentCard(store, currentCard) {
      store.commit('SET_CURRENT', currentCard)
    }
  },
  getters: {
    todoList: state => state.todoList,
    historyState: state => state.historyState,
    currentCard: state => state.currentCard
  },
  modules: {
  }
})
