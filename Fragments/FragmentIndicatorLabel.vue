<script setup>
import Text3Component from '../Font/Text/Text3Component.vue';
import Title3Component from '../Font/Title/Title3Component.vue';

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
    <Title3Component>{{ number }}</Title3Component>
    <Text3Component>{{ label }}</Text3Component>
  </div>
</template>

<style scoped>
.fragment-indicator-number {
  padding: .5rem;
  width: 64px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-radius: var(--border-radius-1);
}
</style>