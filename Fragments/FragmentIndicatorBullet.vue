<script setup>
import { ref, computed } from 'vue';
import Tooltip from '@/components/shared/Inputs/Tooltip/Tooltip.vue';

const props = defineProps({
  prioridade: {
    type: String,
    default: 'Média'
  },
  withTooltip: {
    type: Boolean,
    default: true
  }
})


const backgroundColor = computed(() => {
  switch (props.prioridade) {
    case 'Baixa':
      return'var(--green-1)';
    case 'Alta':
      return'var(--red-1)';
    default:
      return'var(--yellow-1)';
  }
});


</script>

<template>
  <Tooltip v-if="withTooltip" :fit-content="true" :open-to-right="true">
    <template #icon>
      <div class="dot" :style="{ 'background-color': backgroundColor }"/>
    </template>
    <template #default>
      {{ prioridade }}
    </template>
  </Tooltip>
  <div v-else class="dot" :style="{ 'background-color': backgroundColor }"/>
</template>

<style scoped>
.dot {
  width: var(--spacing-xsmall);
  height: var(--spacing-xsmall);
  background-color: var(--yellow-1);
  border-radius: var(--border-radius-small);
}
</style>