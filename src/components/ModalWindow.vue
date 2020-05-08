<template>
  <div class="modal" v-show="modalType.isShow">
    <div class="modal__mask">
      <div class="modal__window">
        <div class="modal__text">{{ modalType.modalTitle }}</div>
        <p class="modal__description">
          {{ modalType.modalDescription }}
        </p>
        <div class="modal__btn_wrap">
          <button class="modal__btn" @click="funcAction(index)">{{modalType.btnAction}}</button>
          <button class="modal__btn" @click="funcCancel">{{modalType.btnCancel}}</button>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  name: 'ModalWindow',
  props: [
    'modalType',
    'index'
  ],
  methods: {
    funcAction (index) {
      this.$emit('funcAction' , index)
    },
    funcCancel () {
      this.$emit('funcCancel')
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal {
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
      // filter: blur(2px);
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
</style>


