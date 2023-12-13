<script setup>
import ButtonLink from '../../Actions/ButtonLink.vue';
import LinkComponent from '../../Actions/Link/LinkComponent.vue';

</script>

<template>
  <div class="lower-bar">
    <slot />
  </div>
</template>

<style scoped>
.lower-bar {
  padding: var(--spacing-small) var(--spacing-large);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: transparent;
  box-shadow: var(--shadow-small);
}

@media (min-width: 768px) {
  .lower-bar {
    justify-content: center;
    gap: var(--spacing-large);
  }
  
}
</style>