<script setup>
import { computed } from 'vue';
import Text3Component from '../Typography/Text/Text3Component.vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  totalValue: {
    type: Number,
    required: true
  }
})

const widthPercentage = computed(() => {
  return `${props.value/props.totalValue*100}%`;
})

const color = computed(() => {
  if (props.value/props.totalValue < 0.5) {
    return 'var(--green-1)';
  } else if (props.value/props.totalValue < 0.8) {
    return 'var(--yellow-1)';
  } else {
    return 'var(--red-1)';
  }
})
</script>

<template>
<div class="fragment-indicator-bar-container">
  <Text3Component>{{ props.label }}</Text3Component>
  <div class="fragment-indicator-bar">
    <div class="fragment-indicator-bar__indicator" :style="{'background-color': color, width: widthPercentage}"></div>
  </div>
  <Text3Component>{{ props.value }} / {{ props.totalValue }}</Text3Component>
</div>
</template>

<style scoped>
.fragment-indicator-bar-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.fragment-indicator-bar {
  height: 8px;
  flex: 1;
  border-radius: var(--border-radius-1);
  background-color: var(--gray-3);
  overflow: hidden;
}
.fragment-indicator-bar__indicator {
  height: 8px;
}
</style>
