<script setup>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';

defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button type="button" class="tab-item" :class="{ active }">
    <BodyMedium>
      <slot></slot>
    </BodyMedium>
  </button>
</template>

<style scoped>
.tab-item {
  color: var(--blue-1);
  background-color: transparent;
  border: none
}

.tab-item:hover {
  color: var(--purple-1);
  cursor: pointer;
}

.tab-item.active {
  border-bottom: 1px solid var(--purple-1);
  color: var(--purple-1);
  padding: .6rem 0;
  margin: -.6rem 0;
}
</style>