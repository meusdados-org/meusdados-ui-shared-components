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
  },
  size: {
    type: String,
    default: 'var(--spacing-xsmall)'
  },
  radius: {
    type: String,
    default: 'var(--border-radius-small)'
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
      <div :style="{ 'background-color': backgroundColor, width: size, height: size, 'border-radius': radius }"/>
    </template>
    <template #default>
      {{ prioridade }}
    </template>
  </Tooltip>
  <div v-else :style="{ 'background-color': backgroundColor, width: size, height: size, 'border-radius': radius }"/>
</template>
