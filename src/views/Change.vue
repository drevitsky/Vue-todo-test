<template>
  <div class="change-todo">
    <h1>You can change this todo</h1>
    <div class="todo-item">
      <div class="todo-item__header">
        <h2 v-if="!showInputTitle" class="todo-item__title">{{ todoCurrent.title }}</h2>
        <input
          v-else
          type="text"
          name="title"
          v-focus
          @focus="isBlur=false"
          v-model="todoCurrent.title"
          @blur="blurCloseInputTitle"
          >
        <div class="btns-wrapper">
          <a href="#"
            class="btn btn--change" 
            @click.prevent="changeTitle" >
          </a>
          <a 
            href="#" 
            class="btn btn--trash"
            @click.prevent="deleteTodo(index)"
            ></a>
        </div>
      </div>
      <div class="todo-item__body">
        <ul class="todo-item__list">
          <todo-item-task 
            class="todo-item__item"
            v-for="(todo,id) in todoCurrent.todo"
            :key="todo"
            :class="{'complited' : todo.todoItemComplited}"
            :todo="todo"
            :index="index"
            :id="id"
            :todoCurrent="todoCurrent"
            ref="childComponent" />
          <li class="todo-item__add">
            <a href="#"
                class="btn btn--add" 
                @click.prevent="addNewTodoTask" >
              <span class="span-1"></span>
              <span class="span-2"></span>
            </a>
            <div class="todo-item__content "> Add task</div> 
          </li>
        </ul>
      </div>
    </div>
    <div class="dashboard">
      <div class="dashboard__wrap">
        <a
          href="#"
          class="btn__single" 
          @click.prevent="saveTodo" >
            Save
        </a>
        <a
          href="#"
          class="btn__single" 
          @click.prevent="cancelTodo" >
            Cancel
        </a>
        <a
          href="#"
          title="Undo"
          class="btn__single btn__symbol" 
          @click.prevent="undoStep" >
          <span class="btn__undo"></span>
        </a>
        <a
          href="#"
          title="Redo"
          class="btn__single btn__symbol" 
          @click.prevent="redoStep" >
          <span class="btn__undo btn__undo--redo"></span>
        </a>
      </div>
    </div>
    <modal-window
      :modalType = "modalDelete"
      @funcAction = "removeIt"
      @funcCancel = "hideModalDelete"
      :index = "index"
    />
    <modal-window 
      :modalType = "modalCancel"
      @funcAction = "cancelIt"
      @funcCancel = "hideModalCancel"
      :index = "index"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'


import TodoItemTask from '../components/TodoItemTask'
import ModalWindow from '../components/ModalWindow'

export default {
  name: 'Change',
  data () {
    return {
      showInputTitle: false,
      isFocusTitle: false,
      isBlur: false,
      modalDelete: {
        isShow: false,
        modalTitle: 'You realy want delete this card?' ,
        modalDescription: 'This action cannot be undone!',
        btnAction: 'Delete',
        btnCancel: 'Cancel'
      },
      modalCancel: {
        isShow: false,
        modalTitle: 'Are you sure you want to exit without saving?' ,
        modalDescription: 'This action cannot be undone!',
        btnAction: 'Yes',
        btnCancel: 'No'
      }
      
    }
  },
  components: {
    TodoItemTask,
    ModalWindow
  },
  computed: {
    ...mapGetters([
      'todoList'
    ]),
    todoCurrent () {
      return this.todoList[this.$route.params.id]
    } ,
    index() {
      return this.$route.params.id
    } 
  },
  methods: {
    ...mapActions([
      'updateTodo',
      'removeTodo'
    ]),
    changeTitle () {
      if (this.isBlur) {
        this.isBlur = false
        return
      }
      this.showInputTitle = !this.showInputTitle
    },
    blurCloseInputTitle () {
        this.showInputTitle = false
        this.isBlur = true
         setTimeout(()=>{
        this.isBlur = false
        },500)
    },
    addNewTodoTask () {
      this.todoCurrent.todo.push({
        todoItemContent: '',
        todoItemComplited: false
      })
      this.updateTodo({ 
        todoList: this.todoCurrent,
        index: this.index
        })
      setTimeout(() => {
        const id = this.todoCurrent.todo.length - 1
        this.$refs.childComponent[id].changeTask(id)
      }, 0)
      
    },
    saveTodo () {
      this.updateTodo({ 
      todoList: this.todoCurrent,
      index: this.index
      })
      this.$router.push({ name: 'Todos'})

    },
    deleteTodo () {
      this.modalDelete.isShow = true
    },
    removeIt (id) {
      
      this.modalDelete.isShow = false
      this.$router.push({ name: 'Todos'})
      this.removeTodo(id)
    },
    hideModalDelete () {
      this.modalDelete.isShow = false
    },
    cancelTodo () {
      this.modalCancel.isShow = true
    },
    cancelIt () {
      this.modalCancel.isShow = false
      this.$router.push({ name: 'Todos'})
    },
    hideModalCancel () {
      this.modalCancel.isShow = false
    }
  },
  mounted () {
    // window.scrollTo(0, 0, { behavior: 'smooth' })
  }
  
}
</script>
<style lang="scss">
  .todo-item__item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
  }
  .col-change, {
    display: flex;
  }
  .col-content {
    display: flex;
    line-height: 30px;
    flex-grow: 1;
  }
  .label-content {
    margin-left: 15px;
  }
  .label-check {
    margin: 0 10px;
  }
  input[type="checkbox"] {
    display: none;
    & + label {
      display: block;
      width: 30px;
      min-width: 30px;
      height: 30px;
      border:1px solid #777;
      border-radius: 50%;
      position: relative;

    }
  }
  .btn--close {
    position: relative;
      span {
        display: inline-block;
        border-bottom: 1px solid #777;
        width: 30px;
        position: absolute;
        top: 50%;
        left: 0;
      }
      .span-1 {
        transform:rotateZ(45deg);
      }
      .span-2 {
        transform:rotateZ(135deg);
      }
    }
  .btn--add {
    position: relative;
      span {
        display: inline-block;
        border-bottom: 1px solid #777;
        width: 30px;
        position: absolute;
        top: 50%;
        left: 0;
      }
      .span-1 {
        transform:rotateZ(90deg);
      }
  }
  .btn__symbol {
    padding: 5px 10px;
  }
  .btn__undo {
    display: block;
    color: transparent;
    width: 30px;
    height: 30px;
    background: url('../assets/images/005-undo.svg') center no-repeat;
    &--redo {
      transform: rotateY(180deg);
      }
  }
  .dashboard {
    display: flex;
    text-align: center;
    justify-content: center;
    &__wrap {
      width: 500px;
      display: flex;
      justify-content: space-between;
    }
  }
  input[type="checkbox"]:checked + label:after {
      position: absolute;
      content:'';
      width: 30px;
      height: 30px;
      background: url('../assets/images/check.svg');
      top: 0;
      left: 0;
    }
    label {
      cursor: pointer;
    }
    .todo-item__add {
      display: flex;
      margin: 0.5rem;
      padding: 0.5rem;
    }
    .todo-item__content {
      margin-left: 15px;
      line-height: 30px;
      
    } 
</style>

