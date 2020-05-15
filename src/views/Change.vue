<template>
  <div class="change-todo">
    <h1>You can change this todo</h1>
    <div class="todo-item todo-item--change">
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
          @change="rememberState"
          class="todo-item__input-title"
          >
        <div class="btns-wrapper">
          <a href="#"
            class="btn btn--change-white"
            title="Change title" 
            @click.prevent="changeTitle" >
          </a>
          <a 
            href="#" 
            class="btn btn--trash-white"
            title="Delete card"
            @click.prevent="deleteTodo(index)"
            ></a>
        </div>
      </div>
      <div class="todo-item__body">
        <ul class="todo-item__list">
          <todo-item-task 
            class="todo-item__item"
            v-for="(todo,id) in todoCurrent.todo"
            :key="todo.todoItemContent + '-' + id"
            :class="{'complited' : todo.todoItemComplited}"
            :todo="todo"
            :index="index"
            :id="id"
            :todoCurrent="todoCurrent"
            @rememberState = "rememberState"
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
          @click.prevent="undoStep"
          :disabled="historyState.length < 1" >
          <span class="btn__undo btn__undo-white" :class="{'disabled' : historyState.length < 2 }"></span>
        </a>
        <a
          href="#"
          title="Redo"
          class="btn__single btn__symbol" 
          @click.prevent="redoStep"
          :disabled="redoStates.length < 1"
           >
          <span class="btn__undo btn__undo-white btn__undo--redo" :class="{'disabled' : redoStates.length < 1 }"></span>
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
    <tosted-alarm 
      :message="messageAlarmSaved"
      :isShow="isSaved"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'


import TodoItemTask from '../components/TodoItemTask'
import ModalWindow from '../components/ModalWindow'
import TostedAlarm from '../components/TostedAlarm'

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
      },
      messageAlarmSaved: 'You saved this',
      isSaved: false,
      currentCard: null,
      hisState:[],
      redoStates: []
    }
  },
  components: {
    TodoItemTask,
    ModalWindow,
    TostedAlarm
  },
  computed: {
    ...mapGetters([
      'todoList',
      'historyState'
    ]),
    todoCurrent () {
      return this.currentCard
    } ,
    index() {
      return this.$route.params.id
    } 
  },
  methods: {
    ...mapActions([
      'updateTodo',
      'removeTodo',
      'addHistoryStep',
      'removeHistoryStep',
      'clearHistory',
      'setCurrentCard'
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
      this.isSaved = true
      setTimeout(() => {
        this.isSaved = false
      }, 1000);
      this.clearHistory()
      this.updateTodo({ 
      todoList: this.todoCurrent,
      index: this.index
      })
      this.setCurrentCard(this.index)
      setTimeout(() => {
        this.$router.push({ name: 'Todos'})
      }, 1500);
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
      if (this.isSaved || (this.historyState.length === 1 && this.redoStates.length === 0)) {
        this.setCurrentCard(this.index)
        this.$router.push({ name: 'Todos'})
      } else
      this.modalCancel.isShow = true
    },
    cancelIt () {
      this.currentCard = this.historyState[0]
      this.updateTodo({ 
      todoList: this.todoCurrent,
      index: this.index
      })
      
      this.clearHistory()
      this.redoStates = []
      this.modalCancel.isShow = false
      this.setCurrentCard(this.index)
      this.$router.push({ name: 'Todos'})
    },
    hideModalCancel () {
      this.modalCancel.isShow = false
    },
    rememberState () {
      const newStep = JSON.parse(JSON.stringify(this.currentCard))
      this.addHistoryStep(newStep)
      this.redoStates = []
    },
    undoStep () {
      if (this.historyState.length > 1) {
        const newStep = JSON.parse(JSON.stringify(this.todoCurrent))
        this.redoStates.push(newStep)
        this.removeHistoryStep()        
        this.currentCard = this.historyState[this.historyState.length - 1]
      } else return
    },
    redoStep () {
      if (this.redoStates.length > 0) {
        this.currentCard = this.redoStates.pop()
        const newStep = JSON.parse(JSON.stringify(this.currentCard))
        this.addHistoryStep(newStep)
      }
    }
    
  },
  watch: {
    currentCard () {
      this.updateTodo({ 
          todoList: this.currentCard,
          index: this.index
        })
    }
  },
  created () {
    this.currentCard = this.todoList[this.$route.params.id]
  },
  mounted () {
    window.scrollTo(0, 0, { behavior: 'smooth' })
    if(!(this.historyState.length > 0) ){
      this.rememberState()
    }
  }  
}
</script>
<style lang="scss">
  @import '@/assets/scss/_variables';
  .todo-item__item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
  }
  .todo-item--change {
    margin-bottom: 6rem;
  }
  .todo-item__title {
    word-wrap: anywhere;
  }
  .todo-item__input-title {
    border: none;
    background-color: $bgc_theme;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    outline: none;
    caret-color: $accent-color;
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
    word-wrap: anywhere;
    text-align: left;
    max-height: 9rem;
    overflow: hidden;
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
  .btns-wrapper {
    display: flex;
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
    &-white {
      background: url('../assets/images/005-undo-white.svg') center no-repeat;
    }
    &.disabled {
      background: url('../assets/images/005-undo-d.svg') center no-repeat;
    }
    &--redo {
      transform: rotateY(180deg);
      }
  }
  .dashboard {
    position: fixed;
    bottom: 2rem;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    text-align: center;
    justify-content: center;
    &__wrap {
      width: 470px;
      display: flex;
      justify-content: space-between;
    }
  }
  input[type="checkbox"]:checked + label:after {
    position: absolute;
    content:'';
    width: 30px;
    height: 30px;
    background: url('../assets/images/check-accent.svg');
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
<style lang="scss" scoped>
  .todo-item__header {
    position: sticky;
    top: 0;
    z-index: 20;
  }
</style>


