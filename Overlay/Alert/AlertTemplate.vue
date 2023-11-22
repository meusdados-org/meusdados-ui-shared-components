<script setup>
defineProps({
  show: {
    type: Boolean,
    default: true,
  },
})

</script>

<template>
  <div v-if="show" class="alert">
    <slot />
  </div>
</template>

<style scoped>
.alert {
  position: fixed;
  bottom: var(--spacing-xlarge);
  right: var(--spacing-xlarge);
  z-index: 9999;
  width: 224px;
}

@media (max-width: 768px) {
  .alert {
    bottom: 0;
    left: 0;
    width: 94vw;
  }
  
}
</style>
