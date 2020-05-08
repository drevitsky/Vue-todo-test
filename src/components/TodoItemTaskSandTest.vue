<template>
  <div class="todo-item-task">
    <div class="col col-content ">
      <div 
        v-if="!showInputTask" 
        class="todo-item__title"
        >{{ todoContent }}
      </div>
        <input
          v-else
          type="text"
          v-focus
          v-model="todoContent"          
          >
          <a href="#"
          class="btn btn--change" 
          @click.prevent="showInputTask = !showInputTask" >
        </a>
    </div>  
  </div>
</template>
<script>

export default {
  props: ['todo', 'index', 'todoCurrent'],
  data () {
    return {
      showInputTask: false,
      // emptyTask: false,
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
    // changeTask() {
    //   this.showInputTask = !this.showInputTask
    // },
    // saveChangeTask() {
    //   this.tempContent = this.todo.todoItemContent
    //   this.showInputTask = false
    // },
    // undoChange() {
    //   this.todo.todoItemContent = this.tempContent
    // },
    // validateTask () {
    //   if (!this.todo.todoItemContent) {
    //     this.emptyTask = true
    //   }
    // },
    // removeClose () {
    //   this.emptyTask = false
    //   this.removeTodoTask(this.index)
    // },
    // continueClose () {
    //   this.emptyTask = false
    //   this.$refs.inputTask.focus()
    // }
  },
  computed: {
    todoContent () {
      return this.todo.todoItemContent
    }
  },
  mounted () {
    // this.tempContent = this.todo.todoItemContent
  }
}
</script>
<style lang="scss" scoped>
.todo-item-task {
  border: 1px dashed red;
}
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



