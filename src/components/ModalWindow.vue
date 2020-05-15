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
  @import '@/assets/scss/_variables';
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
      background-color: rgba($bgc_theme, 0.5);
    }

    &__window {
      position: absolute;
      max-width: 500px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 5rem;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0px 10px 25px rgba(233, 101, 52, 0.5);
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
      border: none;
      padding: 10px 15px;
      border-radius: 22px;
      min-width: 100px;
      margin: 10px;
      background-color: $accent_color;
      box-shadow: $accent-box-shadow;
      &:hover {
        box-shadow: $accent-box-shadow--hover;
        background-color: $accent_hover;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
</style>


