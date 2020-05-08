import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "todoList": [
      {
        "title": "Действия с заметкой:",
        "todo": [
          {
            "todoItemContent": "сохранить изменения",
            "todoItemComplited": true
          },
          { 
            "todoItemContent": "отменить редактирование (необходимо подтверждение)",
            "todoItemComplited": false 
          },
          { 
            "todoItemContent": "удалить (необходимо подтверждение)",
            "todoItemComplited": false 
          },
          { 
            "todoItemContent": "отменить внесенное изменение",
            "todoItemComplited": false 
          },
          { 
            "todoItemContent": "повторить отмененное изменение",
            "todoItemComplited": false 
          }
        ]
      },
      {
        "title": "Действия с пунктами Todo:",
        "todo": [
          {
            "todoItemContent": "добавить",
            "todoItemComplited": true
          },
          {
            "todoItemContent": "удалить",
            "todoItemComplited": true
          },
          {
            "todoItemContent": "отредактировать текст",
            "todoItemComplited": true
          },
          {
            "todoItemContent": "отметить как выполненный",
            "todoItemComplited": true
          }
        ]
      },
      {
        "title": "Действия на главной:",
        "todo": [
          {
            "todoItemContent": "перейти к созданию новой заметки",
            "todoItemComplited": true
          },
          {
            "todoItemContent": "перейти к изменению",
            "todoItemComplited": true
          },
          {
            "todoItemContent": "удалить (необходимо подтверждение)",
            "todoItemComplited": false
          }
        ]
      },
      {
        "title": "Требования к функционалу:",
        "todo": [
          {
            "todoItemContent": "Все действия на сайте должны происходить без перезагрузки страницы.",
            "todoItemComplited": true 
          },
          {
            "todoItemContent": "Подтверждение действий (удалить заметку) выполняется с помощью диалогового окна.",
            "todoItemComplited": false 
          },
          {
            "todoItemContent": "Интерфейс должен отвечать требованиям usability.",
            "todoItemComplited": true 
          },
          {
            "todoItemContent": "После перезагрузки страницы состояние списка заметок должно сохраняться.",
            "todoItemComplited": true
          },
          {
            "todoItemContent": "Можно пренебречь несоответствием редактирования текста с помощью кнопок отменить/повторить и аналогичным действиям с помощью комбинацияй клавиш (Ctrl+Z, Command+Z, etc.)",
            "todoItemComplited": false
          }
        ]
      },
      {
        "title": "Технические требования:",
        "todo": [
          { 
            "todoItemContent": "Диалоговые окна должны быть реализованы без использования \"alert\", \"prompt\" и \"confirm\".",
            "todoItemComplited": true 
          },
          {
            "todoItemContent": "В качестве языка разработки допускается использовать JavaScript или TypeScript.",
            "todoItemComplited": true },
          {
            "todoItemContent": "В качестве сборщика, если это необходимо, используйте Webpack.",
            "todoItemComplited": true 
          },
          { 
            "todoItemContent": "Верстка должна быть выполнена без использования UI библиотек (например Vuetify).",
            "todoItemComplited": true 
          },
          {
            "todoItemContent": "Адаптивность не обязательна, но приветствуется.", "todoItemComplited": false 
          },
          {
            "todoItemContent": "Логика приложения должна быть разбита на разумное количество самодостаточных Vue-компонентов.",
            "todoItemComplited": true 
          }
        ]
      }
    ]
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
    }
  },
  getters: {
    todoList: state => state.todoList
  },
  modules: {
  }
})
