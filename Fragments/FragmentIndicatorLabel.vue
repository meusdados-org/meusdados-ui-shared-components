<script setup>
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import TitleSmall from '@/components/shared/Typography/Title/TitleSmall.vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  backgroundColor: {
    type: String,
    default: 'transparent'
  }
});

const color = props.backgroundColor === 'transparent' ? 'var(--black)' : 'var(--white)';
</script>

<template>
  <div class="fragment-indicator-number" :style="{ backgroundColor, color }">
    <TitleSmall>{{ number }}</TitleSmall>
    <BodyMedium>{{ label }}</BodyMedium>
  </div>
</template>

<style scoped>
.fragment-indicator-number {
  padding: var(--spacing-xsmall);
  min-width: var(--spacing-xlarge);
  margin: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  border-radius: var(--border-radius-small);
}
</style>