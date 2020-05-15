<template>
  <div class="todo-card-task">
    <div 
        class="label-check"
        :class="{'checked' : todo.todoItemComplited}">
      </div>
      <div 
        @mouseover.stop="hover = true"
        @mouseleave.stop="hover = false"
        class="todo-item__content">
        
          <span>{{ smallBody(todo.todoItemContent)}}</span>
        <transition name="fade" mode="out-in">  
          <span v-if="!hover && isBig" key="small">...</span>
          <span v-else key="big">{{ restBody(todo.todoItemContent)}}</span>
        </transition>
       
      </div>
  </div>
</template>
<script>
export default {
  props: ['todo', 'index'],
  name: 'TodoCardTask',
  data () {
    return {
      hover: false,
      isBig: false
    }
  },
  methods: {    
    smallBody(string) {
      if(string.length > 40) {
        this.isBig = true
        let newString = string.substring(0, 40)
        return newString
      }
      else return string
    },
    restBody(string) {
      if(string.length > 40) {
        this.isBig = true
        let newString = string.substring(40,)
        return newString
      }
      else return ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .label-check {
      display: block;
      width: 30px;
      min-width: 30px;
      height: 30px;
      border:1px solid #777;
      border-radius: 50%;
      position: relative;
      margin: 0 10px;
  }
  .checked:after {
      position: absolute;
      content:'';
      width: 30px;
      height: 30px;
      background: url('../assets/images/check-accent.svg');
      top: 0;
      left: 0;
    }
  .todo-item__task {
    display: flex;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  .todo-item__content {
    text-align: left;
    line-height: 30px;
    cursor: pointer;
    span {
      word-wrap: anywhere;
    }
  }
  .complited {
    span {
      text-decoration: line-through;
    }
  } 
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
  
</style>
