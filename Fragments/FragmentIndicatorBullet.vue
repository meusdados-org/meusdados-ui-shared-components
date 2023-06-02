<script setup>
import { ref, onMounted } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';

const props = defineProps({
  prioridade: {
    type: String,
    default: 'Média'
  }
})

const backgroundColor = ref('var(--yellow-1)');

onMounted(() => {
  switch (props.prioridade) {
    case 'Baixa':
      backgroundColor.value = 'var(--green-1)';
      break;
    case 'Alta':
      backgroundColor.value = 'var(--red-1)';
      break;
    default:
      backgroundColor.value = 'var(--yellow-1)';
      break;
  }
})
</script>

<template>
  <Tooltip :open-to-right="true">
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