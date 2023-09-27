<script setup lang="ts">
import LabelMedium from '../Typography/Label/LabelMedium.vue';

const props = defineProps({
  type: {
    type: String,
    required: false
  },
  canClose: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: 'var(--gray-3)'
  },
  color: {
    type: String,
    default: 'var(--black);'
  }
});

const emit = defineEmits(['close']);

</script>

<template>
  <LabelMedium class="tag" :style="{ backgroundColor, color }">
    <slot>Texto 1</slot>
  </LabelMedium>
</template>

<style scoped>
.tag {
  display: flex;
  min-width: 12px;
  height: 16px;
  padding: var(--spacing-xxxsmall, 2px) var(--spacing-xxsmall, 4px);
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: var(--border-radius-border-radius-mini, 4px);
  background: var(--Purple-1, #8B5CF6);
}
</style>