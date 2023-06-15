<script setup>
import { ref, computed } from 'vue';
import Tooltip from '@/components/shared/Inputs/Tooltip/Tooltip.vue';

const props = defineProps({
  prioridade: {
    type: String,
    default: 'Média'
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
  <Tooltip :fit-content="true" :open-to-right="true">
    <template #icon>
      <div class="dot" :style="{ 'background-color': backgroundColor }"/>
    </template>
    <template #default>
      {{ prioridade }}
    </template>
  </Tooltip>
</template>

<style scoped>
.dot {
  width: 8px;
  height: 8px;
  background-color: var(--yellow-1);
  border-radius: var(--border-radius-1);
}
</style>