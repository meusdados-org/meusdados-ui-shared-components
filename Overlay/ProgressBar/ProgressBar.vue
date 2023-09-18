<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  totalSteps: {
    type: Number,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
});

const progress = computed(() => {
  return (props.currentStep / props.totalSteps) * 100;
});
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: var(--spacing-xxsmall);
  background-color: transparent;
  border-radius: var(--spacing-xxsmall);
  overflow: hidden;
  position: fixed;
  top: 0;
}

.progress-bar__bar {
  height: 100%;
  background-color: var(--purple-1);
  transition: width 0.3s ease-in-out;
}
</style>