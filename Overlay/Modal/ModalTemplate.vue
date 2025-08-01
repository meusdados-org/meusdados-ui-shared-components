<template>
    <div class="modal-wrapper" v-if="open" v-on:click="$emit('closeModalOnClickOutside');">
        <div class="modal" @click.stop="">
            <slot></slot>
        </div>
    </div>
</template>

<script>


export default {
  name: 'ModalTemplate',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    canCloseOnClickOutside: {
      type: Boolean,
      default: true 
    }
  },
  emits: ['close'],
  methods: {
    closeModalOnClickOutside() {
      if (this.canCloseOnClickOutside) {
        this.$emit('close');
      }
    }
  },
};

</script>

<style scoped>
.modal-wrapper {
    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, .75);
}


</style>
