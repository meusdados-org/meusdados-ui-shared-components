<script setup>
import Text2Component from '@/components/shared/Typography/Text/Text2Component.vue';

defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button type="button" class="tab-item" :class="{ active }">
    <Text2Component>
      <slot></slot>
    </Text2Component>
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