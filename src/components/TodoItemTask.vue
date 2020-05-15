<template>
  <div class="todo-item-task">
    <div class="col col-content">
        <input
          type="checkbox" 
          :id="`checkbox-${id}`" 
          v-model="todo.todoItemComplited"
          @change="rememberState">
        <label :for="`checkbox-${id}`" class="label-check"></label>
        <label
          v-if="!showInputTask"
          :for="`checkbox-${id}`"
          class="label-content"
          >{{ todoItemContent}}
        </label>
        <div class="input-wrap" v-else>
          <textarea
            v-focus
            @focus="firstFocus"
            :style="computedStyles"
            name="task"
            v-model="todoItemContent"
            @blur="validateTask"
            @change="rememberState"
            class="input-task"
            ref="inputTask"></textarea>
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
          title="Delete task" 
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
import { mapState, mapActions } from 'vuex'

export default {
  props: ['todo', 'index', 'todoCurrent', 'id'],
  data () {
    return {
      showInputTask: false,
      emptyTask: false,
      todoItemContent: null,
      heightText: '16',
      currentTarget: null
    }
  },
  methods: {
    ...mapActions([
      'addHistoryStep'
    ]),
    removeTodoTask(id) {
      this.todoCurrent.todo.splice(id, 1)
      this.rememberState()
      if (this.todoCurrent.todo.length === 0) {
        // eslint-disable-next-line no-console
        console.log('You want delete task?')
      }
    },
    changeTask() {
      this.showInputTask = true
    },
    saveChangeTask() {
      this.todo.todoItemContent = this.todoItemContent
      this.showInputTask = false
      this.rememberState()
    },
    validateTask () {
      if (!this.todoItemContent) {
        this.emptyTask = true
      }else {
        this.saveChangeTask()
      }
    },
    removeClose () {
      this.emptyTask = false
      this.removeTodoTask(this.id)
    },
    continueClose () {
      this.emptyTask = false
      this.$refs.inputTask.focus()
    },
    firstFocus (e) {
      this.currentTarget = e
      this.resize (e)
    },
    resize (e) {
      this.$nextTick(() => {
        this.heightText = e.target.scrollHeight
      })
      return this
    },
    rememberState () {
      this.$emit('rememberState')
    }
  },
  computed: {
    ...mapState([
      'todoList',
      'historyState'
    ]),
    computedStyles () {
      return {
        height: this.heightText + 'px'
      }
    },
  },
  watch: {
    todoItemContent () {
      if (this.currentTarget) {
        this.resize(this.currentTarget)
      }
    }
  },
  mounted () {
    this.todoItemContent = this.todo.todoItemContent
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
    max-height: 10rem;
    resize: none;
  }
  .btn:hover {
    transform: scale(1.1);
  }
  .btn--save {
    background: url('../assets/images/011-technology.svg') ;
    }
  .btn--undo {
    background: url('../assets/images/005-undo.svg') ;
  }
  .btn--undo-disabled {
      background: url('../assets/images/005-undo-d.svg') ;
    }
   
</style>



