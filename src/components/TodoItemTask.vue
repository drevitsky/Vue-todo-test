<template>
  <div class="todo-item-task">
    <div class="col col-content">
        <input type="checkbox" :id="`checkbox-${id}`" v-model="todo.todoItemComplited">
        <label :for="`checkbox-${id}`" class="label-check"></label>
        <label
          v-if="!showInputTask"
          :for="`checkbox-${id}`"
          class="label-content"
          >{{ todo.todoItemContent}}
        </label>
        <div class="input-wrap" v-else>
          <input 
            type="text"
            v-focus
            name="task"
            v-model="todo.todoItemContent"
            @blur="validateTask"
            class="input-task"
            ref="inputTask">
            <a
              href="#"
              title="Undo"
              class="btn btn--undo" 
              @click.prevent="undoChange" >
            </a>
            <a
            href="#"
            title="Save"
            class="btn btn--save" 
            @click.stop.prevent="saveChangeTask" >
          </a>
        </div>
        
      </div>
      <div class="col col-change ">
        
        <a
          href="#"
          title="Change"
          v-if="!showInputTask"
          class="btn btn--change" 
          @click.prevent="changeTask" >
        </a>
        <a href="#"
          class="btn btn--close" 
          @click.prevent="removeTodoTask(id)" 
          >
          <span class="span-1"></span>
          <span class="span-2"></span>
        </a>

      </div>
      <div class="alert" v-show="emptyTask">
        <div class="alert__mask">
          <div class="alert__window">
            <div class="alert__text">NO CONTENT !</div>
            <p class="alert__description">
              Please fill in the task content or delete it
            </p>
            <div class="alert__btn_wrap">
              <button class="alert__btn" @click="removeClose">Remove</button>
              <button class="alert__btn" @click="continueClose">Continue</button>

            </div>
          </div>
        </div>
      </div>
          
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: ['todo', 'index', 'todoCurrent', 'id'],
  data () {
    return {
      showInputTask: false,
      emptyTask: false,
      tempContent:''
    }
  },
  methods: {
    removeTodoTask(id) {
      this.todoCurrent.todo.splice(id, 1)
      if (this.todoCurrent.todo.length === 0) {
        console.log('You want delete task?')
      }
    },
    changeTask() {
      this.showInputTask = true
    },
    saveChangeTask() {
      this.tempContent = this.todo.todoItemContent
      this.showInputTask = false
    },
    undoChange() {
      this.todo.todoItemContent = this.tempContent
    },
    validateTask () {
      if (!this.todo.todoItemContent) {
        this.emptyTask = true
      }
    },
    removeClose () {
      this.emptyTask = false
      this.removeTodoTask(this.index)
    },
    continueClose () {
      this.emptyTask = false
      this.$refs.inputTask.focus()
    }
  },
  computed: {    
    ...mapState([
      'todoList'
    ]),
    todo1 () {
      return this.todoList[this.index].todo[this.id]
    }
  },
  // watch: {
  //   todo (oldVal, newVal) {

  //   }
  // }, 
  mounted () {
    console.log('this.todoList[this.index].todo',this.todoList[this.index].todo)
    console.log('this.todoList',this.todoList)
    console.log('this.index',this.index)
    this.tempContent = this.todo.todoItemContent
  }
}
</script>
<style lang="scss" scoped>
  .input-wrap {
    flex-grow: 2;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .input-task {
    flex-grow: 2;
    outline: none;
    border: none;
    margin-left: 15px;
    font-size: 1rem;
  }
  .alert {
    &__mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: #0007;
    }
    &__window {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 5rem;
      border-radius: 10px;
      background-color: #fff;
    }
    &__text {
      font-size: 30px;
      margin-bottom: 30px;
    }
    &__btn_wrap {
      display: flex;
      justify-content: space-between;
    }
    &__btn {
      padding: 10px 15px;
      border-radius: 5px;
      margin: 10px;
    }
  }
  .btn--save {
    background: url('../assets/images/011-technology.svg') ;
    }
  .btn--undo {
    background: url('../assets/images/005-undo.svg') ;
  }  
</style>



