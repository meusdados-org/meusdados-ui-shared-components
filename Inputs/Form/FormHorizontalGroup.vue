<script setup lang="ts">
import BodySmall from '@/components/shared/Typography/Body/BodySmall.vue';

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
    <BodySmall class="form-horizontal-group-label">{{ label }}</BodySmall>
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

.form-horizontal-group-input {
  flex: 1;
}

</style>