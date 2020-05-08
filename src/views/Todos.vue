<template>
  <div class="todos">
    <h1 class="todo__title">Todos</h1>
    <transition-group class="todo__list" name="list" tag="div">  
      <li class="todo-item"        
        v-for="(item,index) in todoList"
        :key="item.title">
        <todo-card
          :todoList="todoList"
          :item="item"
          :index="index"
          />
      </li>
      </transition-group>
      <a
        href="#"
        class="btn__single" 
        @click.prevent="addNewTodo" >
          Add new task list
      </a>
        
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters, mapActions } from 'vuex'


import TodoCard from '../components/TodoCard'

export default {
  name: 'Todos',
  data () {
    return {
      
    }
  },
  components: {
    TodoCard
  },
  computed: {
    ...mapGetters([
      'todoList'
    ])
  },
  methods: {
    ...mapActions(['addTodo']),
    addNewTodo () {
      const id = this.todoList.length + 1
      this.addTodo({
        title: `new Todo-${id}`,
        todo: []
      })
      const index = this.todoList.length - 1
      this.$router.push({ name: 'Change', params: {id: index}})
      window.scrollTo(0, 0, { behavior: 'smooth' })
    }
  }
}
</script>
<style lang="scss">
  ul, .todo__list {
    list-style-type: none;
    padding: 0;
  }
  .complited {
    text-decoration: line-through;
  }
  .todo__list {
    background-color: #fff;
  }
  .todo-item {
    box-shadow: 1px 1px 5px 2px #0005 ;
    border-radius: 5px;
    margin: 2rem auto;
    width: 500px;
    &__header {
      display: flex;
      justify-content: space-between;
      background-color: #777;
      color: #fff;
      padding: 1rem;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      box-shadow: 0 2px 5px -2px #777 ;
      h2 {
        margin: 0;
      }
    }
    &__body {
      padding: 1rem;
    }
    &__item {
      margin: 0.5rem;
      border-bottom: 1px solid #eee;
    }
    &--add {
      padding: 30px;
      box-sizing: border-box;
      a {
        display: block;
        width: 100%;
      }
    }
  }
  .btn {
    width: 30px;
    height: 30px;
    display: inline-block;
    margin: 0 10px ;
    box-sizing: border-box;
    &--change {
      background: url('../assets/images/001-pencil.svg') ;
    }
    
    &--trash {
      background: url('../assets/images/004-interface.svg') ;
    }
    &__single {
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid #eee;
      display: inline-block;
      padding: 15px 25px;
      text-decoration: none;
      color: #000;
      box-shadow: 1px 1px 2px 1px #0005;
      &:hover {
        box-shadow: 1px 1px 5px 2px #0005;
      }
    }
  }
  .list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-leave-active {
  // position: absolute;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
  transition: all 1s;
}
.list-move {
  transition: transform 1s;
}
  
</style>
