<template>
  <div>
    <div class="todo-item__header">
      <h2 class="todo-item__title">{{ item.title }}</h2>
      <div class="btns-wrapper">
        <router-link 
          class="btn btn--change-white"
          title="Edit this card" 
          :to="{ name: 'Change', params: {id: index }}" >
        </router-link>
        <a 
          href="#" 
          class="btn btn--trash-white"
          @click.prevent="showDialogDelete"
          title="Delete this card"
          ></a>
      </div>
    </div>
    <div class="todo-item__body">
      <ul class="todo-item__list">
        <todo-card-task
          class="todo-item__task"
          v-for="(todo, index) in shortTodolist"
          :key="index"
          :class="{'complited' : todo.todoItemComplited}"
          :todo="todo"
          :index="index"
          />
      </ul>
      <ul class="todo-item__list" v-if="showMore">
          <todo-card-task
            class="todo-item__task"
            v-for="(todo, index) in restTodolist"
            :key="index"
            :class="{'complited' : todo.todoItemComplited}"
            :todo="todo"
            :index="index"
          />
      </ul>
      <button
        v-if="item.todo.length > 4"
        @click="showMore = !showMore"
        class="btn__more"
        :title="titleMore"
        >{{btnMore}}
      </button>
    </div>
    <div class="alert" v-show="isDelete">
      <div class="alert__mask">
        <div class="alert__window">
          <div class="alert__text">You realy want delete this card?</div>
          <p class="alert__description">
            This action cannot be undone!
          </p>
          <div class="alert__btn_wrap">
            <button class="alert__btn" @click="deleteTodo(index)">Delete</button>
            <button class="alert__btn" @click="isDelete = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import TodoCardTask from '../components/TodoCardTask'

export default {
  props: ['todoList', 'item', 'index'],
  components: {TodoCardTask},
  data () {
    return {
      isDelete: false,
      showMore: false
    }
  },
  methods: {
    ...mapActions(['removeTodo']),
    deleteTodo (id) {
      this.isDelete = false
      setTimeout(() => {
        this.removeTodo(id)
      },0)
    },
    showDialogDelete() {
      this.isDelete = true
    }
  },
  computed: {
    shortTodolist () {      
      if (this.item.todo.length > 4) {
        return this.item.todo.slice(0, 4)
      }
      return this.item.todo
    },
    restTodolist () {
      if (this.item.todo.length > 4) {
        return this.item.todo.slice(4, )
      }
      return this.item.todo
    },
    btnMore () {
      if (!this.showMore) {
        return 'More...'
      } else 
      return 'Less...'
    },
    titleMore () {
      if (!this.showMore) {
        return 'See more tasks'
      } else 
      return 'See less tasks'
    }
  }
}
</script>




