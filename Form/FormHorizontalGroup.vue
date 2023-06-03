<script setup lang="ts">
import Text3Component from '../Font/Text/Text3Component.vue';

defineProps({
  label: {
    type: String,
    required: true
  },
  hasPadding: {
    type: Boolean,
    default: true
  },
  hasBackground: {
    type: Boolean,
    default: true,
  }
})
</script>

<template>
  <div class="form-horizontal-group-container" :class="{ hasPadding, hasBackground }">
    <Text3Component class="form-horizontal-group-label">{{ label }}</Text3Component>
    <div class="form-horizontal-group-input">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.form-horizontal-group-container {
  display: flex;
  column-gap: 1rem;
  width: 95%;
  align-items: center;
}

.hasPadding {
  padding: .5rem;
}

.hasBackground {
  background-color: var(--gray-4);
  border-radius: var(--border-radius-1);
}

.form-horizontal-group-label {
  text-align: left;
  color: var(--gray-1);
}

</style>