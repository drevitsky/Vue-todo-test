<template>
  <div class="todos">
    <h1 class="todo__title">Todos</h1>
    <transition-group class="todo__list" name="list" tag="div">  
      <li class="todo-item"        
        v-for="(item,index) in todoList"
        :key="item.title + '-' + index" :data-current="index">
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
    <transition name="scroll">
      <a 
        href="#"
        v-if="windowTop > 500"
        class="btn__scroll"
        @click.prevent="scrollToTop"
        >
      <span></span>
      </a>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TodoCard from '../components/TodoCard'

export default {
  name: 'Todos',
  data () {
    return {
      showBtnScroll: false,
      windowTop: null
    }
  },
  components: {
    TodoCard
  },
  computed: {
    ...mapGetters([
      'todoList',
      'currentCard'
    ]),
  },
  methods: {
    ...mapActions(['addTodo', 'setCurrentCard']),
    addNewTodo () {
      const id = this.todoList.length + 1
      this.addTodo({
        title: `new Todo-${id}`,
        todo: []
      })
      const index = this.todoList.length - 1
      this.$router.push({ name: 'Change', params: {id: index}})
      
    },
    scrollToCurrent () {
      if(this.currentCard !== null) {
        const block = document.querySelectorAll('.todo-item[data-current]')
        let elem = null
        block.forEach(el => {
          if (+el.getAttribute('data-current') === this.currentCard) {
            elem = el
          }
        })
        const coordY = this.getCoords(elem)
        window.scrollTo(0, coordY.top, { behavior: 'smooth' })
      }
    },
    getCoords(elem) {
      const box = elem.getBoundingClientRect()
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      }
    },
    scrollToTop () {
      window.scrollTo({ top: 0,left: 0, behavior: 'smooth' })
    },
    onScroll() {
      this.windowTop = window.top.scrollY
    }
  },
  mounted () {
    this.scrollToCurrent()
    this.setCurrentCard(null)
    window.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)

  }
}
</script>
<style lang="scss">
  @import '@/assets/scss/_variables';
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
    box-shadow: 1px 1px 5px 2px rgba($bgc_theme, 0.5);
    border-radius: 20px;
    margin: 2rem auto;
    width: 500px;
    &__header {
      display: flex;
      justify-content: space-between;
      background-color: $bgc_theme;
      color: #fff;
      padding: 1rem;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      box-shadow: 0 2px 5px -2px $bgc_theme ;
      h2 {
        margin: 0;
      }
    }
    &__body {
      padding: 1rem;
      transition: all 1.5s;
    }
    &__item {
      margin: 0.5rem;
      border-bottom: 2px solid $line-color;
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
    &--change-white {
      background: url('../assets/images/001-pencil-white.svg') ;

    }
    
    &--trash {
      background: url('../assets/images/004-interface.svg') ;
    }
    &--trash-white {
      background: url('../assets/images/004-interface-white.svg') ;
    }
    &__single {
      background-color: $accent_color;
      box-sizing: border-box;
      border-radius: 22px;
      display: inline-block;
      padding: 15px 25px;
      text-decoration: none;
      text-transform: uppercase;
      line-height: 16px;
      color: #fff;
      box-shadow: $accent-box-shadow;
      &:hover {
        box-shadow: $accent-box-shadow--hover;
        background-color: $accent_hover;
      }
      &:active {
        transform: scale(0.95);
      }
    }
    &__more {
      border: none;
      outline: none;
      color: $accent_color;
      text-transform: uppercase;
      background-color: #fff;
      cursor: pointer;
    }
    &__scroll {
      position: fixed;
      display: inline-block;
      width: 60px;
      height: 60px;
      background-color: $accent_color;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      padding: 10px;
      opacity: 0.5;
      &:hover {
        opacity: 0.8;
      }
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-image: url('../assets/images/012-up-arrow.svg');
      }
      
    }
  }
  .btn--change-white,.btn--trash-white {
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.95);
    }
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(-50px);
    transition: all 1s;
  }
  .list-move {
    transition: transform 1s;
  }
  .scroll-enter-active  {
    transition: all 0.5s ease-in;
    opacity: .8;
  }
  .scroll-leave-active {
    transition: all 1s ease-out;
  }  
  .scroll-active {
    transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .scroll-enter {
    transform: translateY(100px);
    opacity: 0;
  }
  .scroll-leave-to {
    transform: translateY(100px);
    opacity: 0;
  }
  
</style>
