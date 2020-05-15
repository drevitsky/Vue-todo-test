<template>
  <transition appear name="tosted" >
    <div class="tosted-alarm" v-if="isShow" >
      <div class="tosted__body" :style="customStyle" v-if="isShow">
        <div class="tosted__message">
          {{message}}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: [
    'isShow',
    'message',
    'customStyle'
  ]
}
</script>
<style lang="scss" scoped>
  .tosted-alarm {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .tosted__body {
    display: inline-block;
    font-size: 3rem;
    color: #F9703Eee;
    padding: 15px 30px;
    opacity: .8;
  }
  .tosted__message {
    text-align: center;
  }
  .tosted-enter-active  {
      transition: all 0.5s ease-in;
      opacity: .8;
    }
  .tosted-leave-active {
    transition: all 0.5s ease-out;
  }  
  .tosted-active {
    transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .tosted-enter {
    transform: translateY(30px);
    opacity: 0;
  }
  .tosted-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  } 
</style>


